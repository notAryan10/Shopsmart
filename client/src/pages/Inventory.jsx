import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Package, Database, LayoutGrid, List, ShieldCheck, Clock, ExternalLink } from 'lucide-react';
import LayoutContainer from '../components/LayoutContainer';

const Inventory = () => {
  const [filter, setFilter] = useState('All');
  const [view, setView] = useState('grid');

  const categories = ['All', 'Digital', 'Physical', 'Skins', 'Bundles'];

  const inventoryItems = [
    { id: 1, name: 'Cyber Katana', creator: 'Neon Samurai', type: 'Digital', date: '2 days ago', rarity: 'Legendary', serial: '#042/100' },
    { id: 2, name: 'Neon Hoodie', creator: 'StreetWear', type: 'Physical', date: '5 days ago', rarity: 'Rare', serial: '#155/200' },
    { id: 3, name: 'Void Runner Skins', creator: 'VoidWalker', type: 'Skins', date: '1 week ago', rarity: 'Epic', serial: '#088/150' },
  ];

  const filteredItems = filter === 'All' 
    ? inventoryItems 
    : inventoryItems.filter(item => item.type === filter);

  const getRarityColor = (rarity) => {
    switch(rarity) {
      case 'Legendary': return 'var(--primary-accent)';
      case 'Epic': return 'var(--secondary-accent)';
      case 'Rare': return 'var(--gold-accent)';
      default: return '#6C7280';
    }
  };

  return (
    <div className="bg-bg-deep min-h-screen pt-12 pb-32">
      <LayoutContainer>
        <header className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-1 h-10 bg-gold-accent shadow-[0_0_15px_var(--gold-accent)]" />
              <div>
                <h1 className="text-5xl font-black text-white tracking-widest uppercase">Personal Vault</h1>
                <p className="text-[10px] text-text-muted uppercase font-bold tracking-[0.4em] mt-1">Authenticated Asset Inventory</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="relative group w-full md:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-hover:text-gold-accent transition-colors" size={16} />
                <input 
                  type="text" 
                  placeholder="Search Vault..."
                  className="w-full h-12 bg-white/5 border border-white/10 rounded-sm pl-12 pr-6 text-[10px] text-white uppercase font-black tracking-widest focus:outline-none focus:border-gold-accent transition-all"
                />
              </div>
              <div className="flex p-1 bg-black/40 border border-white/5 rounded-sm">
                <button onClick={() => setView('grid')} className={`p-2 transition-colors ${view === 'grid' ? 'text-gold-accent' : 'text-text-muted'}`}><LayoutGrid size={18} /></button>
                <button onClick={() => setView('list')} className={`p-2 transition-colors ${view === 'list' ? 'text-gold-accent' : 'text-text-muted'}`}><List size={18} /></button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 p-1 bg-black/20 border border-white/5 rounded-sm w-fit">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all ${
                  filter === cat ? 'bg-gold-accent text-black' : 'text-text-muted hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        {/* Grid/List View */}
        <div className={`grid gap-8 ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className={`glass-panel border border-white/5 hover:border-gold-accent/40 transition-all rounded-sm group relative overflow-hidden ${view === 'list' ? 'flex items-center p-6' : 'p-8'}`}
              >
                <div className={`${view === 'list' ? 'w-24 h-24' : 'aspect-square mb-8'} bg-bg-panel border border-white/10 flex items-center justify-center relative rounded-sm group-hover:border-gold-accent transition-colors`}>
                   {item.type === 'Digital' ? <Database size={40} className="text-white/10" /> : <Package size={40} className="text-white/10" />}
                   <div className="absolute top-2 left-2 px-2 py-0.5 border rounded-sm text-[7px] font-black uppercase tracking-widest" style={{ borderColor: getRarityColor(item.rarity), color: getRarityColor(item.rarity) }}>{item.rarity}</div>
                </div>

                <div className={`${view === 'list' ? 'ml-8 flex-1' : ''}`}>
                   <p className="text-[9px] font-black text-text-muted uppercase tracking-widest mb-1">Originator: {item.creator}</p>
                   <h3 className="text-xl font-black text-white uppercase tracking-tight mb-4 group-hover:text-gold-accent transition-all">{item.name}</h3>
                   <div className="flex items-center justify-between border-t border-white/5 pt-4">
                      <div className="flex flex-col">
                         <span className="text-[8px] text-text-muted uppercase font-black">Serial ID</span>
                         <span className="text-[10px] text-gold-accent font-mono">{item.serial}</span>
                      </div>
                      <div className="flex items-center gap-4">
                         <div className="flex flex-col items-end">
                            <span className="text-[8px] text-text-muted uppercase font-black">Acquired</span>
                            <span className="text-[10px] text-white uppercase font-bold">{item.date}</span>
                         </div>
                         <button className="p-2 bg-white/5 border border-white/10 rounded-sm hover:bg-gold-accent hover:text-black transition-all">
                            <ExternalLink size={14} />
                         </button>
                      </div>
                   </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </LayoutContainer>
    </div>
  );
};

export default Inventory;
