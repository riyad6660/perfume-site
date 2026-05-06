/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-amethyst text-ivory py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <h2 className="text-3xl font-serif text-ivory">NUMINA</h2>
          <p className="text-ivory/60 text-sm leading-relaxed max-w-xs">
            "Breath of the unseen" — conveying the spirit and essence that a divine fragrance embodies.
          </p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[2px] font-semibold mb-6">Collections</h4>
          <ul className="space-y-4 text-sm text-ivory/70">
            <li><Link to="/shop" className="hover:text-rose transition-colors">The Signature Line</Link></li>
            <li><Link to="/shop" className="hover:text-rose transition-colors">Limited Editions</Link></li>
            <li><Link to="/shop" className="hover:text-rose transition-colors">Discovery Sets</Link></li>
            <li><Link to="/shop" className="hover:text-rose transition-colors">Refill Program</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[2px] font-semibold mb-6">Atelier</h4>
          <ul className="space-y-4 text-sm text-ivory/70">
            <li><Link to="/journal" className="hover:text-rose transition-colors">The Journal</Link></li>
            <li><Link to="/loyalty" className="hover:text-rose transition-colors">Numina Circle</Link></li>
            <li><Link to="/oracle" className="hover:text-rose transition-colors">Scent Oracle</Link></li>
            <li><Link to="/about" className="hover:text-rose transition-colors">Our Story</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[2px] font-semibold mb-6">Connect</h4>
          <div className="space-y-4">
            <p className="text-sm text-ivory/70">Join our inner circle for exclusive previews.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-transparent border-b border-ivory/30 py-2 text-sm focus:outline-none focus:border-rose transition-colors w-full"
              />
              <button className="ml-4 text-xs uppercase tracking-widest font-semibold hover:text-rose transition-colors">Join</button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-ivory/10 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-ivory/40">
        <p>© 2024 Numina Fragrance Atelier. All Rights Reserved.</p>
        <div className="flex space-x-8 mt-4 md:mt-0">
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/shipping">Shipping</Link>
          <Link to="/admin" className="text-gold">Atelier Access</Link>
        </div>
      </div>
    </footer>
  );
}
