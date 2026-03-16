import { motion } from 'framer-motion';
import { Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const DropCard = ({ id, name, creator, price, stock, timer, image, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group transition transform hover:-translate-y-1 hover:shadow-xl"
    >
      <Link to={`/product/${id}`}>
        <div className="bg-bg-panel rounded-sm overflow-hidden border border-white/5 group-hover:border-primary-accent/40 transition-all duration-500 flex flex-col h-full ring-1 ring-white/5 shadow-lg group-hover:shadow-2xl relative">
          {/* Card Image Area */}
          <div className="relative overflow-hidden bg-[#1D2129] aspect-[4/3]">
            {/* Tag */}
            <div className="absolute top-3 left-3 z-20">
              <div className="px-2 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded-sm flex items-center gap-2">
                <Tag size={10} className="text-secondary-accent" />
                <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">Verified Drop</span>
              </div>
            </div>

            {/* Price Tag Overlay */}
            <div className="absolute bottom-3 right-3 z-20">
               <div className="px-4 py-1.5 bg-primary-accent text-white font-black text-xs uppercase tracking-[0.2em] rounded-sm shadow-xl border border-white/10">
                  ${price}
               </div>
            </div>

            <div className="w-full h-full flex items-center justify-center p-12 relative">
               <motion.div 
                 whileHover={{ scale: 1.15 }}
                 transition={{ duration: 0.8, ease: "easeOut" }}
                 className="w-full h-full flex items-center justify-center relative"
               >
                  <div className="w-40 h-40 bg-primary-accent/10 rounded-full blur-[40px] absolute animate-pulse" />
                  <div className="w-24 h-32 bg-gradient-to-tr from-white/20 to-transparent rounded-lg transform rotate-12 border border-white/20 shadow-2xl backdrop-blur-sm" />
               </motion.div>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-bg-panel via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500 z-10" />
          </div>

          <div className="p-6 flex flex-col gap-6 flex-1 relative z-20">
            <div className="flex flex-col gap-1">
              <span className="text-text-muted text-[10px] font-black uppercase tracking-[0.3em] font-mono opacity-50">{creator}</span>
              <h3 className="text-white text-lg font-black uppercase tracking-tight group-hover:text-primary-accent transition-colors leading-[1.1]">{name}</h3>
            </div>

            {/* Footer: Timer & Stock */}
            <div className="mt-auto pt-6 border-t border-white/10">
              <div className="flex justify-between items-end">
                <div className="flex flex-col gap-1">
                  <p className="text-[9px] uppercase tracking-[0.3em] font-black text-text-muted">Ends In</p>
                  <div className="flex items-center gap-2 text-white">
                    <Clock size={12} className="text-primary-accent" />
                    <p className="font-black tracking-tighter text-sm font-mono">{timer}</p>
                  </div>
                </div>

                <div className="text-right flex flex-col gap-1">
                  <p className="text-[9px] uppercase tracking-[0.3em] font-black text-text-muted">Remaining</p>
                  <p className="text-primary-accent font-black text-lg leading-none tracking-tighter">{stock}</p>
                </div>
              </div>

              {/* Stock Bar */}
              <div className="w-full h-1.5 bg-white/5 rounded-full mt-4 overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-primary-accent shadow-primary" 
                  style={{ width: `${Math.min((stock / 50) * 100, 100)}%` }} 
                />
              </div>
            </div>
          </div>
          
          {/* Accent Line */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary-accent transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500" />
        </div>

      </Link>
    </motion.div>
  );
};

export default DropCard;
