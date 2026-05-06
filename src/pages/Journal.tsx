/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { storeService } from "../services/storeService";
import { JournalPost } from "../types";
import { Loader2 } from "lucide-react";

export default function Journal() {
  const [posts, setPosts] = useState<JournalPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await storeService.getPosts();
      setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="pt-32 pb-24 h-screen flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 text-rose animate-spin" />
        <p className="text-xs uppercase tracking-widest text-[#999]">Scribing our thoughts...</p>
      </div>
    );
  }
  return (
    <div className="pt-32 pb-24">
      <header className="max-w-7xl mx-auto px-6 md:px-12 mb-24 text-center space-y-6">
        <h4 className="text-xs uppercase tracking-[4px] text-rose font-bold">Numina Chronicles</h4>
        <h1 className="text-5xl md:text-7xl font-serif italic">The Journal</h1>
        <p className="text-xl text-[#666] max-w-2xl mx-auto italic font-light italic">
          Essays on alchemy, botany, and the unseen spirit of fragrance.
        </p>
      </header>

      {/* Featured Post */}
      {posts.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
           <div className="relative group cursor-pointer overflow-hidden bg-amethyst aspect-[16/7]">
              <img 
                src={posts[0].coverImage} 
                alt={posts[0].title}
                className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amethyst via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-12 left-12 right-12 text-white space-y-6">
                 <span className="text-[10px] uppercase tracking-widest bg-rose px-3 py-1">{posts[0].tags?.[0] || 'Atelier'}</span>
                 <h2 className="text-4xl md:text-5xl font-serif max-w-2xl italic leading-tight">{posts[0].title}</h2>
                 <p className="text-lg text-ivory/80 max-w-xl font-light">{posts[0].excerpt}</p>
                 <button className="text-xs uppercase tracking-widest font-bold border-b border-white pb-1 hover:text-rose hover:border-rose transition-all">Read Story</button>
              </div>
           </div>
        </div>
      )}

      {/* List */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-24">
         {posts.slice(1).map((post, i) => (
           <motion.div 
             key={post.id}
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="space-y-8 group"
           >
              <div className="aspect-[4/3] bg-parchment overflow-hidden">
                 <img 
                   src={post.coverImage} 
                   alt={post.title}
                   className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                   referrerPolicy="no-referrer"
                 />
              </div>
              <div className="space-y-4">
                 <div className="flex items-center space-x-4 text-[10px] uppercase tracking-widest text-[#999] font-medium">
                    <span>{post.author}</span>
                    <div className="w-1 h-1 rounded-full bg-[#999]" />
                    <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                 </div>
                 <h3 className="text-3xl font-serif italic group-hover:text-rose transition-colors">{post.title}</h3>
                 <p className="text-[#666] leading-relaxed line-clamp-3">{post.excerpt}</p>
                 <button className="text-xs uppercase tracking-widest font-bold border-b border-amethyst pb-1">Continue Reading</button>
              </div>
           </motion.div>
         ))}
      </div>
      {posts.length === 0 && (
         <div className="py-24 text-center text-[#999] italic">
            The journal is being drafted at our atelier. Please check back soon.
         </div>
      )}
    </div>
  );
}
