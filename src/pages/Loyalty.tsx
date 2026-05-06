/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Award, Gift, Sparkles, Zap, Star, ShieldCheck } from "lucide-react";

export default function Loyalty() {
  return (
    <div className="pt-32 pb-24">
      {/* Hero */}
      <header className="max-w-7xl mx-auto px-6 md:px-12 mb-24 text-center space-y-8">
        <div className="flex justify-center">
           <div className="w-16 h-16 bg-gold/10 text-gold rounded-full flex items-center justify-center animate-pulse">
              <Award size={32} />
           </div>
        </div>
        <div className="space-y-4">
           <h4 className="text-xs uppercase tracking-[4px] text-rose font-bold">The Numina Circle</h4>
           <h1 className="text-5xl md:text-7xl font-serif italic">Ascend into the Unseen</h1>
           <p className="text-xl text-[#666] max-w-2xl mx-auto italic font-light leading-relaxed">
             A gateway to exclusive rewards, priority olfactory releases, and a deeper connection to the Numina Atelier.
           </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
           <button className="btn-primary w-full sm:w-auto">Join the Circle</button>
           <button className="btn-secondary w-full sm:w-auto">Member Login</button>
        </div>
      </header>

      {/* Tiers */}
      <section className="bg-amethyst py-24 text-ivory">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
           <h2 className="text-4xl md:text-5xl font-serif italic text-white mb-16 text-center">The Tiers of Devotion</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <TierCard 
                name="Silver" 
                requirement="Upon Joining" 
                benefits={["5 points per $1 spent", "Birthday gift", "Exclusive news"]}
                icon={<Star size={24} />}
              />
              <TierCard 
                name="Gold" 
                requirement="Spend $500+" 
                benefits={["7 points per $1 spent", "Complimentary engraving", "Early access to new scents", "Priority shipping"]}
                featured
                icon={<Sparkles size={24} />}
              />
              <TierCard 
                name="Platinum" 
                requirement="Spend $1500+" 
                benefits={["10 points per $1 spent", "Personalized scent consultation", "Bespoke refill privileges", "VIP Event Invitations"]}
                icon={<ShieldCheck size={24} />}
              />
           </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto">
         <h2 className="text-4xl font-serif text-center mb-16">Earning Your Influence</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            <ProcessItem 
              icon={<Zap size={20} />} 
              title="Acquire" 
              desc="Earn points on every bottle and refill added to your ritual collection." 
            />
            <ProcessItem 
              icon={<PenTool size={20} />} 
              title="Review" 
              desc="Share your olfactory journey. 50 points for every verified review." 
            />
            <ProcessItem 
              icon={<Gift size={20} />} 
              title="Refer" 
              desc="Invite a seeker to the Oracle. You both receive $20 towards your next scent." 
            />
            <ProcessItem 
              icon={<Sparkles size={20} />} 
              title="Subscription" 
              desc="Double points on all automatic refill subscriptions." 
            />
         </div>
      </section>
    </div>
  );
}

function TierCard({ name, requirement, benefits, icon, featured }: { name: string, requirement: string, benefits: string[], icon: React.ReactNode, featured?: boolean }) {
  return (
    <div className={cn(
      "p-10 border transition-all duration-500",
      featured ? "bg-white/10 border-gold scale-105 shadow-2xl shadow-gold/10" : "bg-white/5 border-white/10"
    )}>
       <div className={cn("inline-flex p-3 rounded-full mb-8", featured ? "bg-gold text-white" : "bg-white/10 text-ivory")}>
          {icon}
       </div>
       <h3 className="text-2xl font-serif mb-2 italic">{name}</h3>
       <p className="text-xs uppercase tracking-widest text-[#999] mb-8">{requirement}</p>
       <ul className="space-y-4">
          {benefits.map((b, i) => (
             <li key={i} className="flex items-start space-x-3 text-sm text-ivory/70 italic">
                <span className="text-rose mt-1">•</span>
                <span>{b}</span>
             </li>
          ))}
       </ul>
    </div>
  );
}

function ProcessItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-start space-x-6">
       <div className="w-12 h-12 rounded-full border border-rose/30 flex items-center justify-center text-rose shrink-0">
          {icon}
       </div>
       <div className="space-y-2">
          <h4 className="text-sm uppercase tracking-widest font-bold text-amethyst">{title}</h4>
          <p className="text-sm text-[#666] leading-relaxed">{desc}</p>
       </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}

import { PenTool } from "lucide-react";
