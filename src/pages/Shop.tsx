/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Filter, ChevronDown, PackageSearch } from "lucide-react";
import { useState, useEffect } from "react";
import { storeService } from "../services/storeService";
import { Product } from "../types";

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await storeService.getProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="pt-32 pb-24 px-6 md:px-12 h-screen flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-t-2 border-rose rounded-full animate-spin"></div>
        <p className="text-xs uppercase tracking-widest text-[#999]">Waking the Scent...</p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-16 space-y-4">
        <h1 className="text-5xl italic">The Collections</h1>
        <p className="text-lg text-[#666] max-w-xl">
          Curated olfactory experiences, from the deep woods of the East to the sun-drenched gardens of the South.
        </p>
      </header>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center border-y border-parchment py-6 mb-12 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-8">
          <button className="flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-amethyst">
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <div className="hidden md:flex items-center space-x-6 text-[11px] uppercase tracking-widest text-[#999] font-medium">
            <span className="text-rose cursor-pointer">All</span>
            <span className="hover:text-amethyst cursor-pointer">Woody</span>
            <span className="hover:text-amethyst cursor-pointer">Floral</span>
            <span className="hover:text-amethyst cursor-pointer">Fresh</span>
            <span className="hover:text-amethyst cursor-pointer">Oriental</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-[#999]">
          <span>{products.length} SCENTS</span>
        </div>
        <div className="flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold">
          <span className="text-[#999]">Sort By:</span>
          <button className="flex items-center space-x-1">
            <span>Newest</span>
            <ChevronDown size={14} />
          </button>
        </div>
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <div className="py-24 text-center space-y-6">
           <PackageSearch size={48} className="mx-auto text-parchment" />
           <p className="text-lg text-[#999] italic">The atelier is currently preparing a new collection.</p>
           <Link to="/" className="btn-secondary inline-block">Return Home</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group bento-card border-none hover:shadow-xl transition-shadow flex flex-col p-0 overflow-hidden"
            >
              <Link to={`/product/${product.id}`} className="flex flex-col h-full">
                <div className="aspect-[1/1] bg-parchment overflow-hidden relative">
                  <img 
                    src={product.images[0] || "https://picsum.photos/seed/numina/800/800"} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                   <p className="text-[10px] text-rose uppercase tracking-widest font-bold mb-1">{product.subtitle}</p>
                   <h3 className="text-xl font-serif text-amethyst">{product.name}</h3>
                   <div className="mt-auto pt-6 flex items-center justify-between border-t border-ivory font-medium">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">${product.price}</span>
                        {product.compareAtPrice && (
                          <span className="text-xs text-[#999] line-through">${product.compareAtPrice}</span>
                        )}
                      </div>
                      <span className="text-[10px] uppercase tracking-widest font-bold text-amethyst">Details</span>
                   </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
