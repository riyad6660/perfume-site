/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { storeService } from "../services/storeService";
import { Product } from "../types";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await storeService.getProducts();
      setFeaturedProducts(data.slice(0, 3));
      setLoading(false);
    };
    fetchProducts();
  }, []);
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-amethyst">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/numinahero/1920/1080" 
            alt="Numina Atelier" 
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-amethyst/30 via-transparent to-ivory" />
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-ivory text-xs uppercase tracking-[4px] mb-6"
          >
            Breath of the Unseen
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl text-white font-serif mb-12 italic"
          >
            Numina
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Link to="/shop" className="btn-primary w-full sm:w-auto">Explore Collection</Link>
            <Link to="/oracle" className="flex items-center space-x-2 text-ivory hover:text-rose transition-colors uppercase text-xs tracking-widest font-medium">
              <span>Find your Scent</span>
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-4 md:space-y-0">
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-[#999]">Featured Selection</h4>
            <h2 className="text-4xl md:text-5xl">The Signature Icons</h2>
          </div>
          <Link to="/shop" className="group flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold border-b border-rose pb-1 hover:border-amethyst transition-all">
            <span>Shop All</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
             <div className="col-span-full py-12 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-rose animate-spin" />
             </div>
          ) : featuredProducts.map((product, i) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer bento-card overflow-hidden hover:shadow-xl transition-shadow border-none"
            >
              <Link to={`/product/${product.id}`}>
                <div className="aspect-[1/1] overflow-hidden bg-parchment -m-6 mb-6 relative">
                  <img 
                    src={product.images[0] || "https://picsum.photos/seed/numina/800/800"} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {product.tags.includes("bestseller") && (
                    <span className="absolute top-4 left-4 bg-gold text-white text-[10px] uppercase tracking-widest px-3 py-1">Bestseller</span>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-rose uppercase tracking-widest font-bold">{product.category}</p>
                  <h3 className="text-xl font-serif">{product.name}</h3>
                  <div className="flex items-center justify-between mt-4">
                     <p className="text-sm font-medium">from ${product.price}</p>
                     <span className="text-[10px] uppercase tracking-widest font-bold border-b border-rose">Discover</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
          {!loading && featuredProducts.length === 0 && (
             <div className="col-span-full text-center py-12 text-[#999] italic">
                Our latest collection is arriving soon.
             </div>
          )}
        </div>
      </section>

      {/* Branding Reveal */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="bento-card bg-ivory border-parchment flex flex-col md:flex-row items-center gap-12 p-12">
            <div className="flex-grow text-center md:text-left space-y-6">
              <h2 className="text-3xl md:text-4xl italic leading-tight">
                An olfactory bridge between the <span className="text-rose">tangible</span> and the <span className="text-verdigris">ethereal</span>.
              </h2>
              <p className="text-base text-[#666] max-w-xl leading-relaxed">
                Numina exists at the intersection of classical perfume tradition and modern artistic expression. Each bottle is a divine presence, waiting to be released.
              </p>
            </div>
            <Link to="/about" className="btn-secondary whitespace-nowrap">Our Philosophy</Link>
        </div>
      </section>

      {/* Scent Oracle Teaser */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto bento-card-dark overflow-hidden flex flex-col md:flex-row items-center p-0 gap-0">
          <div className="flex-1 p-12 lg:p-20 order-2 md:order-1">
            <div className="space-y-8">
              <h4 className="text-[11px] uppercase tracking-[3px] text-gold font-bold">Personal Experience</h4>
              <h2 className="text-4xl md:text-5xl font-serif leading-tight">Numina Scent Oracle</h2>
              <p className="text-lg text-ivory/70 leading-relaxed max-w-md">
                Finding a soul-signature scent shouldn't be guesswork. Our Oracle uses advanced olfactory logic to map your personality to its perfect fragrance counterpart.
              </p>
              <Link to="/oracle" className="bg-white text-amethyst px-8 py-4 rounded-md text-xs font-bold uppercase tracking-widest inline-block hover:bg-rose hover:text-white transition-all">Consult the Oracle</Link>
            </div>
          </div>
          <div className="flex-1 order-1 md:order-2 w-full self-stretch">
            <div className="h-full min-h-[400px] relative">
               <img 
                 src="https://picsum.photos/seed/oracle/1000/1000" 
                 alt="Scent Oracle" 
                 className="absolute inset-0 w-full h-full object-cover opacity-60"
                 referrerPolicy="no-referrer"
               />
               <div className="absolute inset-0 bg-gradient-to-r from-amethyst via-transparent to-transparent hidden md:block" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
