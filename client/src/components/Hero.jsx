import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Clock, ShieldCheck } from 'lucide-react';
import LayoutContainer from './LayoutContainer';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-accent/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary-accent/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <LayoutContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-8"
          >
            <div className="flex items-center gap-3 px-4 py-1.5 rounded-sm bg-white/5 border border-white/10 w-fit backdrop-blur-md">
              <div className="w-1.5 h-1.5 rounded-full bg-primary-accent shadow-[0_0_8px_var(--primary-accent)]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">Registry Status: <span className="text-primary-accent">Verified</span></span>
            </div>
            
            <h1 className="text-white font-[900] leading-[0.95] tracking-tighter" style={{ fontSize: 'min(5.5rem, 10vw)' }}>
              VENDORA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-accent via-white to-secondary-accent">
                MARKETPLACE
              </span>
            </h1>
            
            <p className="text-text-secondary text-base lg:text-lg max-w-lg leading-relaxed font-medium">
              Standardized infrastructure for high-stakes creator drops. 
              Authenticate and claim legendary assets before the window terminates.
            </p>
            
            <div className="flex flex-wrap gap-5 pt-4">
              <button 
                onClick={() => navigate("/dashboard/create")}
                className="riot-button flex items-center gap-4 group/enter h-16 px-10"
              >
                <span className="text-[11px] font-black uppercase tracking-[0.4em]">Initialize Marketplace</span>
                <ArrowRight size={20} className="group-hover/enter:translate-x-2 transition-transform" />
              </button>
              <button 
                onClick={() => navigate("/drops")}
                className="px-10 h-16 border border-white/10 hover:border-secondary-accent text-white hover:text-secondary-accent text-[11px] font-black uppercase tracking-[0.4em] transition-all bg-white/5 hover:bg-secondary-accent/5 backdrop-blur-sm"
              >
                Browse Registry
              </button>
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-accent to-secondary-accent rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="glass-panel relative rounded-lg overflow-hidden border border-white/10 group-hover:border-primary-accent/40 transition-all duration-700 shadow-2xl">
              {/* Tag */}
              <div className="absolute top-4 left-4 z-20">
                <div className="px-3 py-1 bg-black/80 backdrop-blur-md rounded-sm border border-secondary-accent/40 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary-accent animate-pulse" />
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Live Operation</span>
                </div>
              </div>

              {/* Image Placeholder */}
              <div className="relative aspect-square bg-bg-panel overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-primary-accent/10 via-transparent to-secondary-accent/10 opacity-50" />
                 <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-bg-panel via-bg-panel/40 to-transparent z-10" />
                 
                 <div className="flex items-center justify-center h-full relative z-0">
                    <div className="text-center p-8">
                      <motion.div 
                        animate={{ 
                          rotate: [45, 55, 45],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="w-48 h-48 mx-auto mb-10 bg-gradient-to-br from-primary-accent to-gold-accent rounded-2xl shadow-[0_0_50px_rgba(255,70,85,0.3)] relative"
                      >
                         <div className="absolute inset-2 border-2 border-white/20 rounded-xl" />
                      </motion.div>
                      <h3 className="heading-display text-3xl text-white tracking-widest mb-1">CYBER KATANA</h3>
                      <p className="text-[10px] uppercase font-black tracking-[0.4em] text-gold-accent">Limited Protocol #001</p>
                    </div>
                 </div>
              </div>

              {/* Card Content */}
              <div className="p-10 flex flex-col gap-8 bg-bg-panel/80 backdrop-blur-xl">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-text-muted text-[9px] uppercase tracking-[0.3em] font-black mb-1">Originator</p>
                    <p className="font-black text-white text-lg tracking-tight">NEON SAMURAI</p>
                  </div>
                  <div className="text-right">
                    <p className="text-text-muted text-[9px] uppercase tracking-[0.3em] font-black mb-1">Current Value</p>
                    <p className="text-2xl font-black text-white">$89.00</p>
                  </div>
                </div>

                {/* Countdown */}
                <div className="bg-black/60 rounded-sm p-5 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock size={16} className="text-primary-accent" />
                    <span className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">Ends In</span>
                  </div>
                  <div className="flex gap-6">
                    {[
                      { val: '02', label: 'Hrs' },
                      { val: '14', label: 'Min' },
                      { val: '22', label: 'Sec' }
                    ].map(unit => (
                      <div key={unit.label} className="text-center">
                        <p className="text-xl font-black text-white leading-none mb-1">{unit.val}</p>
                        <p className="text-[8px] text-text-muted uppercase font-bold tracking-widest">{unit.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full py-5 bg-primary-accent hover:bg-white text-white hover:text-black font-black uppercase tracking-[0.3em] text-[10px] transition-all relative group/btn overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
                  Access Core Data
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      </LayoutContainer>
    </section>
  );
};

export default Hero;
