import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import DropCard from '../components/DropCard';
import { TrendingUp, Users, ShoppingCart, Zap } from 'lucide-react';
import LayoutContainer from '../components/LayoutContainer';
import { getProducts } from '../api';

const Home = () => {
  const [featuredDrops, setFeaturedDrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setFeaturedDrops(response.data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const stats = [
    { label: 'Live Drops', value: '24', icon: <Zap size={18} />, color: 'var(--primary-accent)' },
    { label: 'Collectors', value: '1.2K', icon: <Users size={18} />, color: 'var(--secondary-accent)' },
    { label: 'Total Claims', value: '8.5K', icon: <ShoppingCart size={18} />, color: 'var(--gold-accent)' },
    { label: 'Market Volume', value: '$450K', icon: <TrendingUp size={18} />, color: '#10b981' },
  ];

  return (
    <div className="bg-bg-deep min-h-screen">
      <Hero />
      
      <LayoutContainer>
        <main className="pb-32 -mt-16 relative z-20">
          {/* Stats Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32 animate-fade-in">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-panel p-8 flex items-center justify-between rounded-sm border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary-accent/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition before:pointer-events-none"
              >
                <div className="flex flex-col gap-1 relative z-10">
                  <p className="text-text-muted text-[10px] uppercase tracking-[0.3em] font-black">{stat.label}</p>
                  <p className="text-3xl font-[900] text-white tracking-tighter">{stat.value}</p>
                </div>
                <div 
                  className="w-12 h-12 rounded-sm flex items-center justify-center border border-white/5 transition-transform group-hover:scale-110 relative z-10"
                  style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                >
                  {stat.icon}
                </div>
              </motion.div>
            ))}
          </section>

          {/* Featured Drops Grid */}
          <section className="mb-32">
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-4">
                <div className="w-1 h-8 bg-primary-accent shadow-[0_0_15px_var(--primary-accent)]"></div>
                <div>
                  <h2 className="text-2xl font-black text-white tracking-widest uppercase mb-1">
                    FEATURED DROPS
                  </h2>
                  <p className="text-[10px] text-text-muted uppercase font-bold tracking-[0.3em]">Priority Access Sequence</p>
                </div>
              </div>

              <a href="/drops" className="flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white hover:text-black text-white text-[10px] font-black uppercase tracking-[0.3em] transition-all border border-white/10">
                EXPLORE REGISTRY
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {loading ? (
                <div className="col-span-full text-center text-text-muted">Loading...</div>
              ) : (
                featuredDrops.map((drop, index) => (
                  <DropCard key={drop.id} {...drop} index={index} />
                ))
              )}
            </div>
          </section>


          {/* Global Activity Section */}
          <section className="glass-panel p-12 rounded-sm animate-fade-in overflow-hidden relative">
             <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-accent/5 blur-[120px] pointer-events-none" />
             
             <div className="grid lg:grid-cols-12 gap-16 items-center relative z-10">
                <div className="lg:col-span-4 border-r border-white/10 pr-12 hidden lg:block">
                   <div className="flex items-center gap-4 mb-6">
                      <div className="w-3 h-3 rounded-full bg-secondary-accent animate-pulse shadow-[0_0_10px_var(--secondary-accent)]" />
                      <h3 className="heading-display text-2xl text-white tracking-widest uppercase">Live Activity</h3>
                   </div>
                   <p className="text-text-muted text-[11px] leading-relaxed font-bold uppercase tracking-[0.3em]">
                     Encrypted real-time data stream from the Vendora marketplace grid. 
                     Tracking legendary acquisitions and protocol updates in the 24h cycle.
                   </p>
                   <div className="mt-8 pt-8 border-t border-white/5">
                     <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
                        <span className="text-white/50">Grid Status</span>
                        <span className="text-green-500">Synchronized</span>
                     </div>
                   </div>
                </div>
                
                <div className="lg:col-span-8 flex flex-col gap-4">
                   {[1, 2, 3].map((i) => (
                     <div key={i} className="flex items-center gap-8 p-5 bg-white/5 border border-white/5 rounded-sm group hover:bg-white/[0.07] hover:border-secondary-accent/40 transition-all cursor-crosshair">
                        <div className="text-[10px] font-mono text-white/30">0{i}</div>
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary-accent/40 group-hover:bg-secondary-accent transition-all" />
                        <p className="text-text-secondary text-[11px] font-bold uppercase tracking-wide">
                          <span className="text-white">@Client_Node_{742 + i}</span> achieved claim for 
                          <span className="text-white"> [LEGENDARY_PROTO_00{i}] </span> 
                          origin <span className="text-primary-accent">GRID_AUTH</span>
                        </p>
                        <span className="text-white/20 ml-auto font-mono text-[9px] uppercase tracking-widest">0{i}M_AGO</span>
                     </div>
                   ))}
                </div>
             </div>
          </section>
        </main>
      </LayoutContainer>
    </div>
  );
};

export default Home;

