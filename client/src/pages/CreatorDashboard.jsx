import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  PlusSquare, 
  Activity, 
  Settings, 
  BarChart3, 
  Eye, 
  Info,
  Clock,
  DollarSign,
  Package
} from 'lucide-react';
import DropCard from '../components/DropCard';

const CreatorDashboard = () => {
  const [activeTab, setActiveTab] = useState('Create Drop');
  const [formData, setFormData] = useState({
    name: 'New Legendary Item',
    price: 99,
    stock: 25,
    timer: '24:00:00',
    creator: 'Neon Samurai',
    description: ''
  });

  const sidebarLinks = [
    { name: 'Overview', icon: <LayoutDashboard size={18} /> },
    { name: 'Create Drop', icon: <PlusSquare size={18} /> },
    { name: 'Active Drops', icon: <Activity size={18} /> },
    { name: 'Analytics', icon: <BarChart3 size={18} /> },
    { name: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <div className="bg-bg-deep min-h-screen flex animate-fade-in">
      {/* Sidebar */}
      <aside className="w-72 bg-bg-panel/40 backdrop-blur-xl border-r border-white/5 pt-12 hidden lg:flex flex-col shrink-0 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary-accent via-transparent to-transparent opacity-50" />
        
        <div className="px-10 mb-12 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary-accent shadow-[0_0_8px_var(--primary-accent)]" />
          <p className="text-[10px] font-black text-white uppercase tracking-[0.4em] opacity-80">Command Center</p>
        </div>

        <nav className="flex flex-col gap-1">
          {sidebarLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => setActiveTab(link.name)}
              className={`w-full flex items-center gap-5 px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative group ${
                activeTab === link.name 
                  ? 'text-white bg-white/5' 
                  : 'text-text-muted hover:text-white hover:bg-white/5'
              }`}
            >
              {activeTab === link.name && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-[3px] bg-primary-accent shadow-[0_0_15px_var(--primary-accent)]" />
              )}
              <span className={`${activeTab === link.name ? 'text-primary-accent' : 'opacity-40 group-hover:opacity-100'} transition-all`}>
                {link.icon}
              </span>
              {link.name}
            </button>
          ))}
        </nav>

        <div className="mt-auto p-10 pt-4 border-t border-white/5 bg-black/40">
           <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-sm bg-bg-elevated border border-primary-accent/30 flex items-center justify-center text-sm font-black text-primary-accent shadow-inner relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10">N</span>
              </div>
              <div className="flex flex-col">
                 <span className="text-[10px] text-white font-black uppercase tracking-tight">Neon Samurai</span>
                 <span className="text-[8px] text-primary-accent font-black uppercase tracking-widest">Auth_Level: 01</span>
              </div>
           </div>
           <button className="w-full py-3 border border-white/10 hover:border-white/30 text-[9px] text-text-muted hover:text-white uppercase font-black tracking-[0.3em] transition-all rounded-sm">
             Term_Session.sys
           </button>
        </div>
      </aside>


      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="container py-12">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="flex flex-col gap-2">
              <h1 className="heading-display text-3xl text-white tracking-widest uppercase">{activeTab}</h1>
              <p className="text-text-muted text-[10px] uppercase font-bold tracking-[0.3em]">Authorized Access / {activeTab}</p>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-primary-accent/5 border border-primary-accent/20 rounded-sm">
               <div className="w-1.5 h-1.5 rounded-full bg-primary-accent animate-pulse shadow-[0_0_10px_var(--primary-accent)]" />
               <span className="text-[9px] font-black text-white uppercase tracking-widest">Neural Link Active</span>
            </div>
          </header>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Form Section */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <div className="glass-panel p-10 rounded-sm border border-white/5 flex flex-col gap-8">
                <div className="grid gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Drop Designation</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-sm px-5 py-4 text-white focus:outline-none focus:border-primary-accent/50 transition-all font-bold text-sm"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Market Value (USD)</label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                        <input 
                          type="number" 
                          value={formData.price}
                          onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
                          className="w-full bg-black/40 border border-white/10 rounded-sm pl-12 pr-5 py-4 text-white focus:outline-none focus:border-primary-accent/50 transition-all font-bold text-sm"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Unit Allocation</label>
                      <div className="relative">
                        <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                        <input 
                          type="number" 
                          value={formData.stock}
                          onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value)})}
                          className="w-full bg-black/40 border border-white/10 rounded-sm pl-12 pr-5 py-4 text-white focus:outline-none focus:border-primary-accent/50 transition-all font-bold text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Drop Window (Duration)</label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                      <input 
                        type="text" 
                        value={formData.timer}
                        onChange={(e) => setFormData({...formData, timer: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-sm pl-12 pr-5 py-4 text-white focus:outline-none focus:border-primary-accent/50 transition-all font-mono text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Encrypted Dossier (Description)</label>
                    <textarea 
                      rows="4"
                      className="w-full bg-black/40 border border-white/10 rounded-sm px-5 py-4 text-white focus:outline-none focus:border-primary-accent/50 transition-all text-sm leading-relaxed"
                      placeholder="Specify the attributes and lore of this acquisition..."
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    ></textarea>
                  </div>
                </div>

                <div className="p-5 bg-primary-accent/5 border border-primary-accent/10 rounded-sm flex gap-4">
                   <Info className="text-primary-accent shrink-0" size={20} />
                   <p className="text-[10px] text-text-secondary leading-normal font-bold uppercase tracking-wider">
                     <span className="text-primary-accent">Warning:</span> Drops are finalized upon initiation. 
                     Sequence verification is mandatory. Protocol 7-B applies to all high-value digital asset transfers.
                   </p>
                </div>

                <button className="riot-button w-full h-16 text-xs flex items-center justify-center gap-4 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
                  INITIATE DROP SEQUENCE
                </button>
              </div>
            </div>

            {/* Preview Section */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                 <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                    <Eye size={18} className="text-primary-accent" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Grid Preview</span>
                 </div>
                 
                 <div className="max-w-[340px] mx-auto lg:mx-0">
                    <DropCard 
                      id="preview"
                      name={formData.name}
                      creator={formData.creator}
                      price={formData.price}
                      stock={formData.stock}
                      timer={formData.timer}
                    />
                 </div>
              </div>

              <div className="glass-panel p-8 rounded-sm border border-white/5 flex flex-col gap-6">
                 <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em] border-b border-white/5 pb-4">Operation Metrics</h4>
                 <div className="flex flex-col gap-1">
                    {[
                      { label: 'Market Reach', value: '12.4K collectors' },
                      { label: 'Neural Conversion', value: '8.2%', color: 'var(--secondary-accent)' },
                      { label: 'Global Ranking', value: '#42', color: 'var(--gold-accent)' },
                    ].map((stat, i) => (
                      <div key={i} className="flex justify-between items-center py-4 border-b border-white/5 last:border-0">
                        <span className="text-[10px] text-text-muted uppercase font-bold tracking-widest">{stat.label}</span>
                        <span className="text-sm font-black text-white uppercase tracking-tight" style={stat.color ? { color: stat.color } : {}}>{stat.value}</span>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreatorDashboard;

