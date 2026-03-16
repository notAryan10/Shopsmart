import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Wallet, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

const PurchaseModal = ({ isOpen, onClose, product }) => {
  const [step, setStep] = useState('confirm'); // confirm, processing, success

  if (!isOpen) return null;

  const handlePurchase = () => {
    setStep('processing');
    setTimeout(() => setStep('success'), 2000);
  };

  return (
    <AnimatePresence>
      <div className="modal-overlay">
        {/* Backdrop overlay handled by modal-overlay class if needed, but we use framer-motion here */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="glass-panel w-full max-w-lg overflow-hidden border border-white/10 relative z-10"
        >
          {/* Top Scanline/Accent */}
          <div className="h-1 bg-gradient-to-r from-primary-accent via-secondary-accent to-primary-accent shadow-[0_0_20px_var(--primary-accent)]" />
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-text-muted hover:text-white transition-colors z-20"
          >
            <X size={20} />
          </button>

          <div className="p-10">
            {step === 'confirm' && (
              <div className="flex flex-col gap-8">
                <div className="text-center flex flex-col gap-2">
                   <h2 className="heading-display text-2xl text-white tracking-widest uppercase">Acquisition Protocol</h2>
                   <p className="text-text-muted text-[10px] uppercase tracking-[0.3em] font-black">Authorized Personnel Only</p>
                </div>

                {/* Item Briefing */}
                <div className="bg-bg-panel/50 border border-white/5 p-6 rounded-sm flex items-center gap-6 relative group">
                   <div className="absolute inset-0 bg-primary-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                   <div className="w-20 h-20 bg-bg-deep border border-white/10 rounded-sm flex items-center justify-center shrink-0 relative overflow-hidden">
                      <div className="w-12 h-12 bg-white/5 rounded-full blur-xl animate-pulse" />
                      <div className="absolute inset-0 border border-primary-accent/30" />
                   </div>
                   <div className="flex flex-col gap-1 relative z-10 flex-1">
                      <p className="text-[9px] text-text-muted uppercase tracking-[0.2em] font-bold">Targeted Asset</p>
                      <h3 className="font-black text-white uppercase tracking-tight text-lg leading-tight">{product?.name || 'Cyber Katana'}</h3>
                      <p className="text-secondary-accent text-xs font-black uppercase tracking-widest">{product?.price || 89} USD</p>
                   </div>
                </div>

                <div className="flex flex-col gap-3 pb-4">
                   <div className="flex justify-between items-center py-3 border-b border-white/5">
                      <span className="text-[10px] text-text-muted uppercase tracking-[0.2em] font-bold">Base Valuation</span>
                      <span className="text-sm font-black text-white">${product?.price || 89}.00</span>
                   </div>
                   <div className="flex justify-between items-center py-3 border-b border-white/5">
                      <span className="text-[10px] text-text-muted uppercase tracking-[0.2em] font-bold">Protocol Surcharge</span>
                      <span className="text-sm font-black text-white">$2.50</span>
                   </div>
                   <div className="flex justify-between items-center pt-4">
                      <span className="text-xs text-white font-black uppercase tracking-[0.3em]">Total Expenditure</span>
                      <span className="text-2xl font-black text-primary-accent tracking-tighter shadow-glow-red">${(product?.price || 89) + 2.5}.00</span>
                   </div>
                </div>

                <div className="flex flex-col gap-4">
                  <button 
                    onClick={handlePurchase}
                    className="riot-button w-full h-16 text-[11px] flex items-center justify-center gap-4 group"
                  >
                    <Wallet size={18} className="group-hover:rotate-12 transition-transform" />
                    APPROVE TRANSACTION
                  </button>
                  <p className="text-[8px] text-center text-text-muted uppercase tracking-[0.4em] flex items-center justify-center gap-3 font-bold">
                    <ShieldCheck size={14} className="text-secondary-accent" /> ENCRYPTED TRANS-HUB VERIFIED
                  </p>
                </div>
              </div>
            )}

            {step === 'processing' && (
              <div className="py-20 flex flex-col items-center justify-center gap-8">
                 <div className="relative">
                    <div className="w-20 h-20 border-2 border-primary-accent/10 border-t-primary-accent rounded-full animate-spin" />
                    <div className="absolute inset-0 border-2 border-secondary-accent/10 border-b-secondary-accent rounded-full animate-spin-reverse" />
                 </div>
                 <div className="text-center flex flex-col gap-3">
                    <h3 className="heading-display text-white text-xl tracking-[0.3em] uppercase animate-pulse">Synchronizing Grid...</h3>
                    <p className="text-text-muted text-[9px] uppercase tracking-[0.4em] font-black">Executing smart-contract sequence</p>
                 </div>
              </div>
            )}

            {step === 'success' && (
              <div className="py-12 flex flex-col gap-10">
                 <div className="flex justify-center">
                    <div className="w-24 h-24 bg-secondary-accent/5 border-2 border-secondary-accent/30 rounded-full flex items-center justify-center relative">
                       <div className="absolute inset-0 border-2 border-secondary-accent animate-ping rounded-full opacity-20" />
                       <CheckCircle2 size={48} className="text-secondary-accent" />
                    </div>
                 </div>
                 <div className="text-center flex flex-col gap-3">
                    <h3 className="heading-display text-white text-3xl tracking-[0.2em] uppercase">Transfer Complete</h3>
                    <p className="text-text-secondary text-[11px] font-bold uppercase tracking-[0.1em] leading-relaxed">
                      Item successfully decoupled from marketplace grid. 
                      Relocated to <span className="text-primary-accent">USER_INVENTORY_VAULT</span>.
                    </p>
                 </div>
                 <div className="flex flex-col gap-4">
                   <button 
                    onClick={onClose}
                    className="w-full py-5 bg-white/5 border border-white/10 hover:bg-white hover:text-black hover:border-white text-white text-[10px] font-black uppercase tracking-[0.3em] transition-all"
                   >
                     DISMISS INTERFACE
                   </button>
                 </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PurchaseModal;

