/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ShoppingBag, Heart, Share2, Info, ChevronRight, Check, Loader2 } from "lucide-react";
import { Product } from "../types";
import { storeService } from "../services/storeService";

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      const data = await storeService.getProduct(id);
      setProduct(data);
      if (data && data.variants.length > 0) {
        setSelectedSize(data.variants[data.variants.length - 1].id);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 pb-24 px-6 md:px-12 h-screen flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-rose animate-spin" />
        <p className="text-xs uppercase tracking-widest text-[#999]">Distilling Essence...</p>
      </div>
    );
  }

  if (!product) return (
     <div className="pt-48 pb-24 text-center space-y-4">
        <h2 className="text-3xl font-serif">Scent Not Found</h2>
        <Link to="/shop" className="btn-secondary">Return to Collections</Link>
     </div>
  );

  const currentVariant = product.variants.find(v => v.id === selectedSize);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Gallery */}
        <div className="flex-1 space-y-6">
          <div className="aspect-[4/5] bg-parchment overflow-hidden">
             <img 
               src={product.images[0]} 
               alt={product.name} 
               className="w-full h-full object-cover"
               referrerPolicy="no-referrer"
             />
          </div>
          <div className="grid grid-cols-4 gap-4">
             {product.images.map((img, i) => (
                <div key={i} className="aspect-square bg-parchment cursor-pointer hover:opacity-80 transition-opacity">
                   <img 
                     src={img} 
                     alt={`${product.name} ${i+1}`} 
                     className="w-full h-full object-cover"
                     referrerPolicy="no-referrer"
                   />
                </div>
             ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 space-y-10">
          <header className="space-y-4">
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[2px] text-[#999]">
              <Link to="/shop" className="hover:text-amethyst">Collections</Link>
              <ChevronRight size={10} />
              <span className="text-gold">{product.category}</span>
            </div>
            <h1 className="text-5xl font-serif italic">{product.name}</h1>
            <p className="text-xl text-[#666] font-light">{product.subtitle}</p>
            <div className="text-2xl font-medium mt-6">${currentVariant?.price || product.price}</div>
          </header>

          <p className="text-lg leading-relaxed text-[#4D4D4D]">
            {product.description}
          </p>

          {/* Scent Pyramid Tabs (Simplified) */}
          <div className="border-y border-parchment py-8 grid grid-cols-3 gap-8">
             <div className="space-y-2">
                <h4 className="text-[10px] uppercase tracking-widest text-[#999]">Top Notes</h4>
                <p className="text-sm font-medium">{product.pyramidNotes.top.join(", ")}</p>
             </div>
             <div className="space-y-2">
                <h4 className="text-[10px] uppercase tracking-widest text-[#999]">Heart Notes</h4>
                <p className="text-sm font-medium">{product.pyramidNotes.mid.join(", ")}</p>
             </div>
             <div className="space-y-2">
                <h4 className="text-[10px] uppercase tracking-widest text-[#999]">Base Notes</h4>
                <p className="text-sm font-medium">{product.pyramidNotes.base.join(", ")}</p>
             </div>
          </div>

          {/* Selections */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-widest font-bold">Select Size</h4>
              <div className="flex space-x-4">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedSize(v.id)}
                    className={cn(
                      "flex-1 py-4 border text-xs uppercase tracking-widest font-bold transition-all",
                      selectedSize === v.id 
                        ? "border-amethyst bg-amethyst text-white" 
                        : "border-parchment hover:border-amethyst"
                    )}
                  >
                    {v.size}
                  </button>
                ))}
              </div>
            </div>

            {product.subscriptionEnabled && (
              <div className="bg-parchment p-6 space-y-4 border border-amethyst/5">
                <div className="flex items-center justify-between">
                   <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 rounded-full border border-amethyst flex items-center justify-center">
                         <div className="w-3 h-3 bg-rose rounded-full" />
                      </div>
                      <span className="text-sm font-semibold uppercase tracking-widest">Subscribe & Save 15%</span>
                   </div>
                   <span className="text-xs text-[#999]">Every 3 months</span>
                </div>
                <p className="text-xs text-[#666]">Unlock complimentary engraving and priority shipping on all refills.</p>
              </div>
            )}

            <div className="flex gap-4">
              <button className="flex-[3] btn-primary py-5 flex items-center justify-center space-x-3">
                <ShoppingBag size={20} />
                <span>Add to Ritual</span>
              </button>
              <button className="flex-1 border border-parchment flex items-center justify-center hover:bg-parchment transition-colors">
                <Heart size={20} className="text-amethyst" />
              </button>
            </div>
          </div>

          {/* Trust Elements */}
          <div className="grid grid-cols-2 gap-6 pt-8">
             <div className="flex items-center space-x-3 text-xs uppercase tracking-widest font-medium text-[#666]">
                <Check size={16} className="text-verdigris" />
                <span>Complimentary Delivery</span>
             </div>
             <div className="flex items-center space-x-3 text-xs uppercase tracking-widest font-medium text-[#666]">
                <Check size={16} className="text-verdigris" />
                <span>Signature Packaging</span>
             </div>
             <div className="flex items-center space-x-3 text-xs uppercase tracking-widest font-medium text-[#666]">
                <Check size={16} className="text-verdigris" />
                <span>3 Sample Discovery Set</span>
             </div>
             <div className="flex items-center space-x-3 text-xs uppercase tracking-widest font-medium text-[#666]">
                <Check size={16} className="text-verdigris" />
                <span>Refillable & Sustainable</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
