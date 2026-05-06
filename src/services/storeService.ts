/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy,
  limit,
  Timestamp,
  setDoc
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { Product, Order, Customer, JournalPost, QuizResult } from '../types';

export const storeService = {
  // --- Products ---
  async getProducts(): Promise<Product[]> {
    const path = 'products';
    try {
      const q = query(collection(db, path), where('status', '==', 'active'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
      return [];
    }
  },

  async getProduct(id: string): Promise<Product | null> {
    const path = `products/${id}`;
    try {
      const docRef = doc(db, 'products', id);
      const snapshot = await getDoc(docRef);
      if (!snapshot.exists()) return null;
      return { id: snapshot.id, ...snapshot.data() } as Product;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
      return null;
    }
  },

  // --- Quiz Results ---
  async saveQuizResult(result: Partial<QuizResult>): Promise<string> {
    const path = 'quizResults';
    try {
      const docRef = await addDoc(collection(db, path), {
        ...result,
        createdAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
      return "";
    }
  },

  // --- Orders ---
  async createOrder(order: Partial<Order>): Promise<string> {
    const path = 'orders';
    try {
      const docRef = await addDoc(collection(db, path), {
        ...order,
        status: 'pending',
        createdAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
      return "";
    }
  },

  // --- Journal ---
  async getPosts(): Promise<JournalPost[]> {
    const path = 'journal';
    try {
      const q = query(collection(db, path), where('status', '==', 'published'), orderBy('publishDate', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as JournalPost));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
      return [];
    }
  }
};
