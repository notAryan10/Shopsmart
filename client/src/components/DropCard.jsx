import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Package, User } from 'lucide-react';

const DropCard = ({ id, name, creator, price, stock, timer, dropExpires }) => {
  const expiryDate = dropExpires ? new Date(dropExpires).toLocaleDateString() : (timer || '24h');
  const creatorName = typeof creator === 'object' ? (creator?.name || creator?.email) : creator;

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#121214] border border-[#1f1f23] rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:border-[#333333] hover:scale-[1.01] transition-all duration-300 flex flex-col" >
      <div className="h-40 bg-[#1a1a1e] relative border-b border-[#1f1f23] flex items-center justify-center p-6">
        <div className="absolute top-3 left-3 bg-black/60 shadow-sm backdrop-blur-md border border-white/10 rounded-md px-2.5 py-1 flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-[#ff4655] animate-pulse" />
           <span className="text-[10px] font-medium text-white uppercase tracking-wide">Live</span>
        </div>

        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/50 shadow-inner rotate-3 hover:rotate-6 transition-transform" />
      </div>

      <div className="p-5 flex flex-col flex-1">
        
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white leading-tight mb-1">{name}</h3>
          <div className="flex items-center text-xs text-zinc-400 gap-1.5">
            <User size={14} />
            <span>{creatorName}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5 mt-auto">
          <div className="bg-[#0b0b0c] rounded-lg p-3 border border-[#1f1f23]">
              <span className="text-xs text-zinc-500 font-medium block mb-1">Allocation</span>
              <span className="text-sm text-white font-semibold flex items-center gap-1.5">
                <Package size={14} className="text-zinc-400" /> {stock}
              </span>
          </div>
          <div className="bg-[#0b0b0c] rounded-lg p-3 border border-[#1f1f23]">
              <span className="text-xs text-zinc-500 font-medium block mb-1">Ends In</span>
              <span className="text-sm text-white font-semibold flex items-center gap-1.5">
                <Clock size={14} className="text-zinc-400" /> {expiryDate}
              </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-white">${price}</span>
          <Link to={`/product/${id}`} className="no-underline">
            <button className="px-4 py-2 bg-[#1f1f23] text-zinc-300 border border-[#2a2a2a] text-sm font-medium rounded-md hover:bg-[#2a2a2a] hover:text-white transition-colors shadow-sm">
              View Drop
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default DropCard;
