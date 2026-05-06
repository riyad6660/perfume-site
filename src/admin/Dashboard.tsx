/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Users, 
  PenTool, 
  Settings, 
  LogOut,
  Bell,
  Search,
  ExternalLink,
  Database
} from "lucide-react";
import SeedData from "./SeedData";

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}

export default function AdminDashboard() {
  const location = useLocation();
  
  const navItems = [
    { label: "Overview", icon: BarChart3, path: "/admin" },
    { label: "Orders", icon: ShoppingCart, path: "/admin/orders" },
    { label: "Products", icon: Package, path: "/admin/products" },
    { label: "Customers", icon: Users, path: "/admin/customers" },
    { label: "Content", icon: PenTool, path: "/admin/content" },
    { label: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  return (
    <div className="flex h-screen bg-[#FBF7F4] overflow-hidden font-sans text-[#4D4D4D]">
      {/* Sidebar */}
      <aside className="w-[240px] bg-[#2A1B38] text-ivory flex flex-col p-6">
        <div className="mb-12">
          <h1 className="font-serif text-[#FBF7F4] text-[28px] font-bold leading-none tracking-tight">Numina</h1>
          <p className="text-[#C2948A] text-[10px] uppercase tracking-[2px] mt-1">Atelier Dashboard</p>
        </div>

        <nav className="flex-grow flex flex-col gap-2">
          {navItems.map((item) => (
            <Link 
              key={item.label}
              to={item.path}
              className={cn(
                "px-4 py-3 rounded-lg text-sm font-medium transition-all",
                location.pathname === item.path 
                  ? "bg-[#C2948A]/10 text-[#C2948A]" 
                  : "text-[#FBF7F4]/60 hover:text-[#FBF7F4] hover:bg-white/5"
              )}
            >
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto">
          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <p className="text-[#C9A96E] text-[11px] font-semibold uppercase mb-1">Gold Tier Sync</p>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
               <div className="w-3/4 h-full bg-[#C9A96E]" />
            </div>
            <p className="text-[#FBF7F4]/50 text-[10px] mt-2">8 new VIP members today</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-grow flex flex-col overflow-hidden">
         {/* Top Bar */}
         <header className="h-20 border-b border-[#F2E9E1] flex items-center justify-between px-10">
            <div>
               <h2 className="font-serif text-2xl font-bold text-[#2A1B38]">Welcome back, Curator</h2>
               <p className="text-[13px] text-gray-500">Here is what's happening with the unseen today.</p>
            </div>
            <div className="flex items-center space-x-4">
               <button className="bg-[#C2948A] text-white px-5 py-2.5 rounded-md text-[12px] font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity">
                  New Formulation
               </button>
               <div className="w-10 h-10 rounded-full bg-[#2A1B38] flex items-center justify-center text-white font-bold">E</div>
            </div>
         </header>

         {/* Dashboard Content - Bento Grid */}
         <div className="flex-grow overflow-y-auto p-8 grid grid-cols-4 grid-rows-3 gap-5">
            {/* Row 1 */}
            <div className="bento-card flex flex-col justify-between">
               <span className="text-[11px] font-semibold uppercase text-gray-400 tracking-wider">Daily Revenue</span>
               <div className="font-serif text-3xl text-amethyst font-bold">$12,482</div>
               <div className="text-success text-[12px] font-semibold">+14.2% vs yesterday</div>
            </div>

            <div className="bento-card flex flex-col justify-between">
               <span className="text-[11px] font-semibold uppercase text-gray-400 tracking-wider">Active Orders</span>
               <div className="font-serif text-3xl text-amethyst font-bold">84</div>
               <div className="text-rose text-[12px] font-semibold">12 pending engraving</div>
            </div>

            <div className="bento-card-dark col-span-2">
               <div className="relative z-10">
                  <span className="text-[11px] font-semibold uppercase opacity-60 tracking-wider">Scent Oracle Performance</span>
                  <div className="font-serif text-[28px] my-2 leading-tight">342 Discoveries</div>
                  <p className="text-[13px] opacity-80 max-w-[200px]">48% of quiz completions led to a full bottle purchase this week.</p>
               </div>
               <div className="absolute right-[-20px] bottom-[-10px] opacity-10 font-serif text-[120px] italic">N</div>
            </div>

            {/* Row 2 & 3 */}
            <div className="bento-card col-span-2 row-span-2">
               <div className="flex justify-between items-center mb-5">
                  <h3 className="font-serif text-[18px] font-bold text-amethyst">Recent Sales Ticker</h3>
                  <span className="text-[#C2948A] text-[12px] font-medium cursor-pointer hover:underline">View all orders</span>
               </div>
               <div className="flex flex-col gap-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center justify-between border-b border-ivory pb-3 last:border-none">
                       <div>
                          <p className="font-semibold text-sm">#ORD-992{i} — {['Elena Rossi', 'Marcus Thorne', 'Sophia Chen'][i-1]}</p>
                          <p className="text-[12px] text-gray-500">{['Midnight Amethyst (50ml)', 'Sample Discovery Kit', 'Verdigris Essence'][i-1]}</p>
                       </div>
                       <div className="text-right">
                          <p className="font-semibold text-sm">${[210, 45, 340][i-1]}.00</p>
                          <span className={cn(
                            "text-[10px] px-2 py-0.5 rounded-full font-medium",
                            i === 1 ? "bg-parchment font-bold" : "bg-success/10 text-success font-bold"
                          )}>
                            {i === 1 ? "Processing" : "Shipped"}
                          </span>
                       </div>
                    </div>
                  ))}
                  <div className="mt-4 pt-4 border-t border-parchment">
                     <SeedData />
                  </div>
               </div>
            </div>

            <div className="bento-card flex flex-col justify-between">
               <div>
                  <span className="text-[11px] font-semibold uppercase text-gray-400 tracking-wider">Inventory Alerts</span>
                  <div className="mt-4 flex flex-col gap-2">
                     <div className="p-2 bg-error/5 border-l-2 border-error text-[11px] text-error">
                        <b>Low Stock:</b> Burnished Gold Cap (Variant B)
                     </div>
                     <div className="p-2 bg-ivory border-l-2 border-rose text-[11px]">
                        <b>Restock:</b> Glass Vials (10ml) arriving today
                     </div>
                  </div>
               </div>
               <button className="w-full py-2 bg-white border border-parchment rounded-lg text-[11px] font-bold text-amethyst hover:bg-ivory transition-colors">
                  Manage Stock
               </button>
            </div>

            <div className="bg-[#4B7F7A] p-6 rounded-[20px] text-white flex flex-col justify-center items-center text-center">
               <div className="text-4xl mb-2">🍃</div>
               <h4 className="font-serif text-[16px] mb-1">Sustainability Pulse</h4>
               <p className="text-[11px] opacity-90">92% plastic-free shipping achieved this quarter.</p>
            </div>

            <div className="bento-card col-span-1">
               <span className="text-[11px] font-semibold uppercase text-gray-400 tracking-wider">Customer Loyalty</span>
               <div className="mt-4 flex items-end space-x-2">
                  <div className="text-2xl font-serif text-amethyst font-bold">1,240</div>
                  <span className="text-[10px] text-gold font-bold mb-1">↑ 8.4%</span>
               </div>
               <p className="text-[10px] text-gray-500 mt-1">Total active members</p>
            </div>
            
            <div className="bento-card bg-gold/10 border-gold/20">
               <span className="text-[11px] font-semibold uppercase text-gold tracking-wider">Oracle Insights</span>
               <p className="text-[12px] mt-2 italic font-serif">"Amber scents are trending in Northern markets."</p>
               <button className="mt-auto text-[10px] font-bold uppercase tracking-widest text-amethyst">Full Report</button>
            </div>
         </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, trend }: { label: string, value: string, trend?: string }) {
  return (
    <div className="bg-white p-6 rounded-sm border border-parchment shadow-sm flex flex-col justify-between">
       <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-4">{label}</p>
       <div className="flex items-end justify-between">
          <p className="text-2xl font-serif text-amethyst">{value}</p>
          {trend && (
             <span className="text-[10px] font-bold text-success flex items-center bg-success/5 px-2 py-0.5 rounded-full">{trend}</span>
          )}
       </div>
    </div>
  );
}
