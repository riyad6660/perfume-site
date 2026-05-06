/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore";
import { db, auth } from "../lib/firebase";
import { MOCK_PRODUCTS } from "../constants";

export default function SeedData() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const makeAdmin = async () => {
    if (!auth.currentUser) {
      setMessage("Please sign in first");
      return;
    }
    setLoading(true);
    try {
      await setDoc(doc(db, "admins", auth.currentUser.uid), {
        email: auth.currentUser.email,
        role: "owner",
        createdAt: new Date().toISOString()
      });
      setMessage("You are now an Admin! Refresh to see the dashboard.");
    } catch (error) {
      setMessage("Error: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const seed = async () => {
    setLoading(true);
    setMessage("Seeding...");
    try {
      for (const product of MOCK_PRODUCTS) {
        await addDoc(collection(db, "products"), {
          ...product,
          status: "active",
          createdAt: new Date().toISOString()
        });
      }
      setMessage("Seeding complete!");
    } catch (error) {
      setMessage("Error seeding: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const clear = async () => {
    setLoading(true);
    setMessage("Clearing...");
    try {
      const snapshot = await getDocs(collection(db, "products"));
      for (const d of snapshot.docs) {
        await deleteDoc(doc(db, "products", d.id));
      }
      setMessage("Products cleared!");
    } catch (error) {
      setMessage("Error clearing: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 bg-white border border-parchment space-y-6">
      <h3 className="text-xl font-serif">Atelier Seed Utility</h3>
      <p className="text-sm text-[#666]">Use this to populate the atelier with initial scents.</p>
      <div className="flex space-x-4">
        <button 
          onClick={seed} 
          disabled={loading}
          className="btn-primary py-2 px-8 text-xs disabled:opacity-50"
        >
          {loading ? "Seeding..." : "Seed Products"}
        </button>
        <button 
          onClick={makeAdmin} 
          disabled={loading}
          className="bg-gold text-white py-2 px-8 text-xs font-bold disabled:opacity-50 transition-all active:scale-95"
        >
          {loading ? "Processing..." : "Make Me Admin"}
        </button>
        <button 
          onClick={clear} 
          disabled={loading}
          className="btn-secondary py-2 px-8 text-xs disabled:opacity-50"
        >
          {loading ? "Clearing..." : "Clear Products"}
        </button>
      </div>
      {message && <p className="text-sm font-medium text-rose">{message}</p>}
    </div>
  );
}
