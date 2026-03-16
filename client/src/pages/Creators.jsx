import { motion } from 'framer-motion';
import { Users, Rocket, ChevronRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import LayoutContainer from '../components/LayoutContainer';

const Creators = () => {
  const creators = [
    { 
      id: 1, 
      name: 'Neon Samurai', 
      level: 42, 
      category: 'Digital Art',
      totalDrops: 12, 
      followers: '85K',
      status: 'Verified',
      bio: 'Master of plasma-forged digital assets and cybernetic aesthetics.',
      activeDrops: [
        { id: 1, name: 'Cyber Katana', price: 89, stock: 12, timer: '02:14:22' },
        { id: 3, name: 'Neon Shades', price: 25, stock: 100, timer: '48:00:00' },
      ]
    },
    { 
      id: 2, 
      name: 'VoidWalker', 
      level: 38,
      category: '3D Assets',
      totalDrops: 8,
      followers: '42K',
      status: 'Elite',
      bio: 'Exploring the intersection of dark matter and technical apparel.',
      activeDrops: [
        { id: 2, name: 'Void Runner Helmet', price: 120, stock: 5, timer: '05:42:10' },
      ]
    },
    { id: 3, name: 'Astra', bio: 'Creating ethereal artifacts for the next generation of space explorers.', drops: 15, followers: '8.2K', status: 'Verified', level: 45, category: 'Space Gear', totalDrops: 15, activeDrops: [] },
    { id: 4, name: 'Err0r', bio: 'Glitch-art pioneer turned physical asset architect.', drops: 5, followers: '1.2K', status: 'New', level: 12, category: 'Glitch Art', totalDrops: 5, activeDrops: [] },
  ];

  return (
    <div className="bg-bg-deep min-h-screen pt-12 pb-32">
      <LayoutContainer>
        {/* Header */}
        <header className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1 h-10 bg-secondary-accent shadow-[0_0_15px_var(--secondary-accent)]" />
            <div>
              <h1 className="text-5xl font-black text-white tracking-widest uppercase">Verified Creators</h1>
              <p className="text-[10px] text-text-muted uppercase font-bold tracking-[0.4em] mt-1">Authorized Protocol Originators</p>
            </div>
          </div>
        </header>

        {/* Creators Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {creators.map((creator, index) => (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-10 rounded-sm border border-white/5 hover:border-secondary-accent/40 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 relative z-10">
                <div className="md:col-span-5 flex flex-col gap-6">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-bg-panel rounded-sm border-2 border-primary-accent flex items-center justify-center relative overflow-hidden group-hover:border-secondary-accent transition-colors">
                       <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                       <span className="text-4xl font-black text-white">{creator.name[0]}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-2xl font-black text-white uppercase tracking-tighter">{creator.name}</h2>
                      <span className="text-secondary-accent text-[10px] font-black uppercase tracking-[0.2em]">{creator.status} ARCHITECT</span>
                    </div>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed">{creator.bio}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/40 p-4 rounded-sm border border-white/10">
                       <p className="text-[9px] text-text-muted uppercase font-bold tracking-widest mb-1">Total Drops</p>
                       <p className="text-xl font-black text-white">{creator.totalDrops || creator.drops}</p>
                    </div>
                    <div className="bg-black/40 p-4 rounded-sm border border-white/10">
                       <p className="text-[9px] text-text-muted uppercase font-bold tracking-widest mb-1">Unit Squad</p>
                       <p className="text-xl font-black text-white">{creator.followers}</p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-7 flex flex-col gap-6 border-l border-white/5 pl-10">
                   <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white border-b border-white/5 pb-4">Live Operations</h3>
                   <div className="flex flex-col gap-4">
                      {(creator.activeDrops || []).length > 0 ? creator.activeDrops.map(drop => (
                        <Link key={drop.id} to={`/product/${drop.id}`} className="p-4 bg-white/5 border border-white/10 hover:border-primary-accent/40 rounded-sm transition-all group/item">
                           <div className="flex justify-between items-center">
                              <span className="text-white font-black uppercase text-xs tracking-tight">{drop.name}</span>
                              <ChevronRight size={14} className="text-text-muted group-hover/item:text-primary-accent transition-colors" />
                           </div>
                        </Link>
                      )) : (
                        <div className="p-8 border border-dashed border-white/10 rounded-sm flex flex-col items-center justify-center gap-2 opacity-40">
                           <Rocket size={24} className="text-text-muted" />
                           <span className="text-[9px] font-black uppercase tracking-widest">No Active Drops</span>
                        </div>
                      )}
                   </div>
                   <button className="riot-button w-full h-11 text-[9px] mt-auto">ACCESS DOSSIER</button>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none select-none">
                 <h1 className="text-9xl font-black uppercase leading-none transform translate-y-1/3 translate-x-1/4"> {creator.name[0]} </h1>
              </div>
            </motion.div>
          ))}
        </div>
      </LayoutContainer>
    </div>
  );
};

export default Creators;
