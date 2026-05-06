/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, User, Search, Menu, X, LogIn, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useAuth } from "../../hooks/useAuth";
import { signInWithGoogle, auth } from "../../lib/firebase";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAdmin } = useAuth();
  const location = useLocation();
  const isAtelier = location.pathname.startsWith("/admin");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isAtelier) return null;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-4 md:px-12",
        scrolled ? "bg-ivory/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-amethyst"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-10">
          <Link to="/shop" className="text-xs uppercase tracking-[2px] font-medium hover:text-rose transition-colors">Shop</Link>
          <Link to="/oracle" className="text-xs uppercase tracking-[2px] font-medium hover:text-rose transition-colors">Scent Oracle</Link>
          <Link to="/journal" className="text-xs uppercase tracking-[2px] font-medium hover:text-rose transition-colors">Journal</Link>
        </div>

        {/* Brand Logo */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 text-3xl font-serif font-bold text-amethyst tracking-tight">
          NUMINA
        </Link>

        {/* Right Actions */}
        <div className="flex items-center space-x-6">
          <button className="text-amethyst hover:text-rose transition-colors hidden sm:block">
            <Search size={20} />
          </button>
          
          {user ? (
            <div className="flex items-center space-x-6">
               <Link to="/loyalty" className="text-amethyst hover:text-rose transition-colors flex items-center space-x-2">
                 <User size={20} />
                 <span className="hidden lg:inline text-[10px] uppercase font-bold tracking-widest">{user.displayName?.split(' ')[0]}</span>
               </Link>
               {isAdmin && (
                 <Link to="/admin" className="text-gold hover:text-amethyst transition-colors hidden lg:block">
                    <LogIn size={20} />
                 </Link>
               )}
               <button onClick={() => auth.signOut()} className="text-amethyst hover:text-error transition-colors hidden lg:block">
                  <LogOut size={18} />
               </button>
            </div>
          ) : (
            <button onClick={signInWithGoogle} className="text-amethyst hover:text-rose transition-colors flex items-center space-x-2">
              <User size={20} />
              <span className="hidden lg:inline text-[10px] uppercase font-bold tracking-widest">Sign In</span>
            </button>
          )}

          <button className="text-amethyst hover:text-rose transition-colors relative">
            <ShoppingBag size={20} />
            <span className="absolute -top-1 -right-1 bg-rose text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-ivory shadow-xl py-8 flex flex-col items-center space-y-6 md:hidden"
          >
            <Link to="/shop" onClick={() => setIsOpen(false)} className="text-lg font-serif">Shop All</Link>
            <Link to="/oracle" onClick={() => setIsOpen(false)} className="text-lg font-serif">Scent Oracle</Link>
            <Link to="/journal" onClick={() => setIsOpen(false)} className="text-lg font-serif">Journal</Link>
            <Link to="/loyalty" onClick={() => setIsOpen(false)} className="text-lg font-serif">Loyalty Circle</Link>
            <Link to="/admin" onClick={() => setIsOpen(false)} className="text-xs uppercase tracking-widest text-gold">Atelier Access</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
