import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, Package, ShoppingBag, ExternalLink, ShieldCheck } from 'lucide-react';
import Navbar from '../components/Navbar';

const Inventory = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); 
  }, []);

  const myLoot = [
    { id: 1, name: "Cypher Hoodie", creator: "NeonWear", date: "2026-03-12", type: "PHYSICAL", image: "https://api.placeholder.com/400/400?text=Hoodie" },
    { id: 2, name: "Arcade Badge #042", creator: "Vendora", date: "2026-03-14", type: "DIGITAL", image: "https://api.placeholder.com/400/400?text=Badge" },
    { id: 3, name: "Glitch Saber", creator: "PixelMage", date: "2026-03-15", type: "DIGITAL", image: "https://api.placeholder.com/400/400?text=Saber" },
  ];

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0E0E0E]">
      <div className="font-retro text-orange-500 animate-pulse tracking-widest uppercase">SCANNING_INVENTORY...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0E0E0E]">
      <Navbar />
      
      <main className="container pt-32 pb-20">
        <div className="flex flex-col md:flex-row items-baseline gap-6 mb-12">
            <h1 className="text-5xl font-black text-white">YOUR <span className="text-orange-500">LOOT</span></h1>
            <div className="font-retro text-[10px] text-muted tracking-tight">TOTAL_ITEMS: {myLoot.length} | ACCOUNT_LEVEL: 12</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {myLoot.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="arcade-panel overflow-hidden bg-[#1A1A1A] group" >
              <div className="aspect-square relative overflow-hidden bg-black">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute top-3 left-3 bg-black/80 px-2 py-1 rounded-sm border border-white/10 font-retro text-[7px] text-white">
                    {item.type}
                </div>
              </div>

              <div className="p-5">
                 <div className="flex justify-between items-start mb-4">
                    <div>
                       <h3 className="font-orbitron font-black text-white text-base mb-1 group-hover:text-amber-400 transition-colors">{item.name}</h3>
                       <div className="font-exo text-[10px] text-muted font-bold tracking-tighter uppercase">BY @{item.creator}</div>
                    </div>
                    <div className="p-2 bg-orange-500/10 border border-orange-500/20 text-orange-500">
                       <ShieldCheck size={14} />
                    </div>
                 </div>

                 <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 font-retro text-[7px] text-zinc-500">
                       <Clock size={10} /> {item.date}
                    </div>
                    <button className="text-[8px] font-retro text-white hover:text-orange-500 transition-colors uppercase">VIEW_DETAILS</button>
                 </div>
              </div>
            </motion.div>
          ))}

          <div className="arcade-panel border-dashed border-[#2A2A2A] bg-transparent flex flex-col items-center justify-center p-8 text-center opacity-40 hover:opacity-100 cursor-pointer transition-arcade">
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-[#444] flex items-center justify-center mb-4 text-[#444]">
                 <Package size={20} />
              </div>
              <div className="font-retro text-[8px] tracking-tight text-muted">SECURE_NEW_DROP<br/>TO_FILL_SLOT</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Inventory;
