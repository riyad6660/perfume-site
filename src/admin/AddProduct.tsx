/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { storeService } from "../services/storeService";
import { Product } from "../types";
import { Plus, X, Upload, Save } from "lucide-react";

export default function AddProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Partial<Product>>({
    name: "",
    subtitle: "",
    description: "",
    price: 0,
    category: "Woody",
    sku: "",
    stock: 50,
    images: ["https://picsum.photos/seed/numina-new/800/800"],
    variants: [
      { id: "v1", size: "30ml", price: 85, stock: 20, sku: "" },
      { id: "v2", size: "50ml", price: 125, stock: 15, sku: "" },
      { id: "v3", size: "100ml", price: 185, stock: 15, sku: "" },
    ],
    scentFamily: [],
    pyramidNotes: {
      top: [],
      mid: [],
      base: [],
    },
    subscriptionEnabled: true,
    engravingEnabled: true,
    tags: ["new"],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // In a real app, we'd use a service method to 'add' a document
      // Let's use the storeService or direct Firestore for this admin tool
      const { collection, addDoc } = await import("firebase/firestore");
      const { db } = await import("../lib/firebase");
      
      await addDoc(collection(db, "products"), {
        ...product,
        createdAt: new Date().toISOString(),
        status: "active"
      });
      
      navigate("/admin");
    } catch (error) {
      console.error(error);
      alert("Failed to add product. Ensure you have Admin permissions in Firestore.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <header className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-3xl font-serif italic text-amethyst">New Formulation</h1>
          <p className="text-sm text-gray-500">Capture the essence of a new Numina scent.</p>
        </div>
        <button onClick={() => navigate("/admin")} className="text-xs uppercase tracking-widest font-bold text-gray-400 hover:text-amethyst flex items-center space-x-2">
          <X size={16} />
          <span>Cancel</span>
        </button>
      </header>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-8">
          <div className="bento-card space-y-6">
             <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Product Name</label>
                   <input 
                     required
                     className="w-full bg-ivory border-none rounded-sm p-3 text-sm focus:ring-1 focus:ring-rose"
                     value={product.name}
                     onChange={e => setProduct({...product, name: e.target.value})}
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Subtitle</label>
                   <input 
                     className="w-full bg-ivory border-none rounded-sm p-3 text-sm focus:ring-1 focus:ring-rose"
                     value={product.subtitle}
                     onChange={e => setProduct({...product, subtitle: e.target.value})}
                   />
                </div>
             </div>

             <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Description</label>
                <textarea 
                  rows={4}
                  className="w-full bg-ivory border-none rounded-sm p-3 text-sm focus:ring-1 focus:ring-rose"
                  value={product.description}
                  onChange={e => setProduct({...product, description: e.target.value})}
                />
             </div>

             <div className="grid grid-cols-3 gap-6">
                <div className="space-y-2">
                   <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Base Price</label>
                   <input 
                     type="number"
                     className="w-full bg-ivory border-none rounded-sm p-3 text-sm focus:ring-1 focus:ring-rose"
                     value={product.price}
                     onChange={e => setProduct({...product, price: Number(e.target.value)})}
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">SKU</label>
                   <input 
                     className="w-full bg-ivory border-none rounded-sm p-3 text-sm focus:ring-1 focus:ring-rose"
                     value={product.sku}
                     onChange={e => setProduct({...product, sku: e.target.value})}
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Category</label>
                   <select 
                     className="w-full bg-ivory border-none rounded-sm p-3 text-sm focus:ring-1 focus:ring-rose"
                     value={product.category}
                     onChange={e => setProduct({...product, category: e.target.value})}
                   >
                     <option>Woody</option>
                     <option>Floral</option>
                     <option>Fresh</option>
                     <option>Oriental</option>
                   </select>
                </div>
             </div>
          </div>

          <div className="bento-card">
             <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Olfactory Pyramid</h3>
             <div className="grid grid-cols-3 gap-6">
                <div className="space-y-2">
                   <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Top Notes</label>
                   <input 
                     placeholder="Comma separated"
                     className="w-full bg-ivory border-none rounded-sm p-3 text-xs"
                     onChange={e => setProduct({...product, pyramidNotes: {...product.pyramidNotes!, top: e.target.value.split(',')}})}
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Mid Notes</label>
                   <input 
                     placeholder="Comma separated"
                     className="w-full bg-ivory border-none rounded-sm p-3 text-xs"
                     onChange={e => setProduct({...product, pyramidNotes: {...product.pyramidNotes!, mid: e.target.value.split(',')}})}
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Base Notes</label>
                   <input 
                     placeholder="Comma separated"
                     className="w-full bg-ivory border-none rounded-sm p-3 text-xs"
                     onChange={e => setProduct({...product, pyramidNotes: {...product.pyramidNotes!, base: e.target.value.split(',')}})}
                   />
                </div>
             </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="bento-card space-y-6">
              <div className="aspect-square bg-ivory rounded-lg border-2 border-dashed border-parchment flex flex-col items-center justify-center text-gray-400 space-y-2 overflow-hidden">
                 {product.images?.[0] ? (
                   <img src={product.images[0]} className="w-full h-full object-cover" />
                 ) : (
                   <>
                     <Upload size={24} />
                     <span className="text-[10px] uppercase font-bold tracking-widest">Upload Key Visual</span>
                   </>
                 )}
              </div>
              <input 
                 placeholder="Image URL"
                 className="w-full text-[10px] bg-ivory p-2 rounded-sm"
                 value={product.images?.[0]}
                 onChange={e => setProduct({...product, images: [e.target.value]})}
              />
           </div>

           <button 
             type="submit"
             disabled={loading}
             className="w-full btn-primary py-4 flex items-center justify-center space-x-3 active:scale-95"
           >
             <Save size={18} />
             <span>{loading ? "Distilling..." : "Reveal to Public"}</span>
           </button>
        </div>
      </form>
    </div>
  );
}
