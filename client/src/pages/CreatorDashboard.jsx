import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Rocket, Package, DollarSign, Calendar, Type, Info, CheckCircle2, ChevronRight, LayoutGrid, BarChart3, Settings, ClipboardList } from 'lucide-react';
import Navbar from '../components/Navbar';
import DropCard from '../components/DropCard';

const CreatorDashboard = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    type: 'PHYSICAL',
    dropExpires: '',
    creatorId: '67c7e52a9202359be26bebfd' 
  });

  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await axios.post('http://localhost:5001/api/products', {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      });
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Error creating drop:', error);
      setStatus('error');
    }
  };

  const inputClass = "w-full bg-black/40 border-2 border-[#2A2A2A] text-white px-4 py-3 font-orbitron text-sm focus:border-orange-500 outline-none transition-arcade placeholder:text-zinc-700";
  const labelClass = "font-retro text-[8px] text-muted mb-2 flex items-center gap-2 uppercase tracking-tight";

  return (
    <div className="min-h-screen bg-[#0E0E0E] flex flex-col">
      <Navbar />
      
      <main className="flex-1 container pt-32 pb-20 flex gap-12" style={{ display: 'flex' }}>
        <aside className="w-64 hidden lg:flex flex-col gap-4">
           <SidebarItem icon={<LayoutGrid size={18} />} text="TERMINAL" active />
           <SidebarItem icon={<Rocket size={18} />} text="CREATE DROP" />
           <SidebarItem icon={<ClipboardList size={18} />} text="ACTIVE DROPS" />
           <SidebarItem icon={<BarChart3 size={18} />} text="ANALYTICS" />
           <SidebarItem icon={<Settings size={18} />} text="PROTOCOLS" />
           
           <div className="mt-auto arcade-panel p-6 bg-orange-500/5 border-orange-500/10">
              <div className="font-retro text-[8px] text-orange-500 mb-2">SHOPKEEPER_LVL</div>
              <div className="text-3xl font-orbitron font-black text-white">12</div>
              <div className="mt-4 h-1 bg-white/10 w-full overflow-hidden">
                 <div className="h-full bg-orange-500 w-[65%]" />
              </div>
           </div>
        </aside>

        <div className="flex-1 flex flex-col lg:flex-row gap-12">
            
            <div className="flex-1">
              <div className="mb-10">
                <h1 className="text-4xl font-black text-white mb-2 tracking-tight">SHOPKEEPER <span className="text-orange-500">TERMINAL</span></h1>
                <p className="font-retro text-[10px] text-muted tracking-tight">INITIATING NEW PRODUCT BROADCAST...</p>
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="arcade-panel p-8" >
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}><Type size={12} /> PRODUCT_NAME</label>
                      <input type="text" required placeholder="ITEM IDENTIFIER" className={inputClass} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div>
                      <label className={labelClass}><Package size={12} /> STOCK_CAPACITY</label>
                      <input type="number" required placeholder="UNITS" className={inputClass} value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}><Info size={12} /> CORE_SPECIFICATIONS</label>
                    <textarea required placeholder="DESCRIBE ITEM DATA..." className={`${inputClass} h-32 resize-none`} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}><DollarSign size={12} /> CREDIT_COST</label>
                      <input type="number" step="0.01" required placeholder="0.00" className={inputClass} value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                    </div>
                    <div>
                      <label className={labelClass}><Calendar size={12} /> EXPIRATION_STAMP</label>
                      <input type="datetime-local" required className={inputClass} value={formData.dropExpires} onChange={(e) => setFormData({...formData, dropExpires: e.target.value})} />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>CARGO_TYPE</label>
                    <div className="flex gap-4">
                      <button type="button" onClick={() => setFormData({...formData, type: 'PHYSICAL'})} className={`flex-1 p-3 font-orbitron font-bold text-xs border-2 transition-arcade ${formData.type === 'PHYSICAL' ? 'border-orange-500 bg-orange-500/10 text-white shadow-[0_0_10px_rgba(255,122,0,0.3)]' : 'border-[#2A2A2A] text-muted'}`}>
                        PHYSICAL
                      </button>
                      <button type="button" onClick={() => setFormData({...formData, type: 'DIGITAL'})} className={`flex-1 p-3 font-orbitron font-bold text-xs border-2 transition-arcade ${formData.type === 'DIGITAL' ? 'border-orange-500 bg-orange-500/10 text-white shadow-[0_0_10px_rgba(255,122,0,0.3)]' : 'border-[#2A2A2A] text-muted'}`}>
                        DIGITAL
                      </button>
                    </div>
                  </div>

                  <button type="submit" disabled={status === 'loading'} className="btn-arcade py-5 text-xl justify-center mt-4 w-full">
                    {status === 'loading' ? 'PROCESSING...' : status === 'success' ? <span className="flex items-center gap-2 font-retro text-xs"><CheckCircle2 size={16} /> BROADCAST_LIVE</span> : <span className="flex items-center gap-2"><Rocket size={20} /> PUBLISH DROP</span>}
                  </button>
                </form>
              </motion.div>
            </div>

            <div className="w-full lg:w-80">
               <div className="mb-6">
                  <h3 className="font-retro text-xs text-white mb-1">LIVE PREVIEW</h3>
                  <div className="h-0.5 w-12 bg-orange-500" />
               </div>
               
               <div className="relative pointer-events-none scale-95 origin-top opacity-80 border-2 border-dashed border-white/10 p-2">
                  <DropCard 
                    product={{
                      ...formData,
                      id: "preview",
                      price: formData.price || "0.00",
                      createdAt: new Date().toISOString(),
                      creator: { email: "shopkeeper@vendora.arcade" }
                    }}
                  />
               </div>
               
               <div className="mt-8 arcade-panel p-6 bg-black/40">
                  <h4 className="font-retro text-[8px] text-muted mb-4">TERMINAL_LOGS</h4>
                  <div className="flex flex-col gap-2 font-exo text-[10px] text-zinc-600">
                     <div>&gt; READY_FOR_UPLOADING...</div>
                     <div>&gt; ASSETS_OPTIMIZED</div>
                     <div className="text-orange-500/50">&gt; WAITING_FOR_OPERATOR...</div>
                  </div>
               </div>
            </div>

        </div>
      </main>
    </div>
  );
};

const SidebarItem = ({ icon, text, active }) => (
  <button className={`flex items-center gap-4 px-6 py-4 border-2 transition-arcade ${active ? 'border-orange-500 bg-orange-500/10 text-white shadow-[0_0_10px_rgba(255,122,0,0.2)]' : 'border-transparent text-muted hover:border-[#2A2A2A] hover:bg-white/5'}`}>
     <div className={active ? 'text-orange-500' : 'text-zinc-500'}>{icon}</div>
     <span className="font-retro text-[9px] tracking-widest">{text}</span>
  </button>
);

export default CreatorDashboard;
