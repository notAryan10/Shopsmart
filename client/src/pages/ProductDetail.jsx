import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, ShieldCheck, Clock, Share2, Rocket, ArrowLeft, Zap, AlertCircle } from 'lucide-react';
import LayoutContainer from '../components/LayoutContainer';
import { getProductById } from '../api';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timer, setTimer] = useState('00:00:00');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await getProductById(id);
                setProduct(response.data);
                setError(null);
                
                if (response.data.dropExpires) {
                    updateTimer(new Date(response.data.dropExpires));
                }
            } catch (err) {
                console.error('Error fetching product:', err);
                setError('Failed to load product protocol.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    useEffect(() => {
        if (!product?.dropExpires) return;

        const interval = setInterval(() => {
            updateTimer(new Date(product.dropExpires));
        }, 1000);

        return () => clearInterval(interval);
    }, [product]);

    const updateTimer = (expireDate) => {
        const now = new Date();
        const diff = expireDate - now;

        if (diff <= 0) {
            setTimer('EXPIRED');
            return;
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimer(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
    };

    if (loading) {
        return (
            <div className="bg-bg-deep min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Rocket size={40} className="text-primary-accent animate-bounce" />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text-muted">Fetching Allocation Data...</p>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="bg-bg-deep min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-6 glass-panel p-10 border-red-500/20">
                    <AlertCircle size={40} className="text-red-500" />
                    <p className="text-sm font-black uppercase tracking-[0.2em] text-white">{error || 'Allocation not found in registry.'}</p>
                    <Link to="/drops" className="px-6 py-3 bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all">
                        Return to Registry
                    </Link>
                </div>
            </div>
        );
    }

    const rarity = product.stock <= 5 ? 'Legendary' : product.stock <= 20 ? 'Verified' : 'Common';
    const specs = [
        { label: 'Rarity', value: rarity, color: product.stock <= 5 ? 'var(--primary-accent)' : 'var(--secondary-accent)' },
        { label: 'Authentication', value: 'Verified Grid-Signed' },
        { label: 'Asset Type', value: product.type },
        { label: 'Protocol ID', value: product.id.slice(0, 8) },
    ];

    return (
        <div className="bg-bg-deep min-h-screen pb-32">
            <div className="border-b border-white/5 bg-white/[0.02] backdrop-blur-xl sticky top-20 z-40 h-16 flex items-center">
                <LayoutContainer>
                    <div className="flex items-center gap-6">
                        <Link to="/drops" className="text-text-muted hover:text-white transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                            <ArrowLeft size={16} />
                            Registry
                        </Link>
                        <div className="w-[1px] h-4 bg-white/10" />
                        <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Protocol // {product.id.slice(0, 8)}</span>
                    </div>
                </LayoutContainer>
            </div>

            <LayoutContainer>
                <div className="grid lg:grid-cols-2 gap-20 py-20 items-start">
                    {/* Visual Interface */}
                    <div className="flex flex-col gap-8">
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="glass-panel aspect-square rounded-sm overflow-hidden border border-white/10 relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-accent/10 via-transparent to-secondary-accent/10 opacity-30" />
                            <div className="flex items-center justify-center h-full text-white/5">
                                <Rocket size={200} className="transform -rotate-12 animate-pulse" />
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="glass-panel aspect-square rounded-sm border border-white/5 hover:border-primary-accent transition-all cursor-pointer opacity-40 hover:opacity-100 p-4">
                                   <div className="w-full h-full bg-white/5 rounded-sm" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3 px-3 py-1 bg-primary-accent/10 border border-primary-accent/20 w-fit rounded-sm">
                                <Zap size={14} className="text-primary-accent" />
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary-accent">{rarity} Tier Allocation</span>
                            </div>
                            <h1 className="text-6xl font-black text-white tracking-widest uppercase">{product.name}</h1>
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-text-muted">Originator:</span>
                                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white underline decoration-primary-accent underline-offset-4 cursor-pointer hover:text-primary-accent transition-colors">
                                    {product.creator?.email?.split('@')[0] || 'Unknown'}
                                </span>
                            </div>
                        </div>

                        <p className="text-text-secondary text-lg leading-relaxed">{product.description || 'No additional specifications provided for this asset protocol.'}</p>

                        <div className="grid grid-cols-2 gap-4">
                           {specs.map(spec => (
                             <div key={spec.label} className="p-4 bg-white/5 border border-white/10 rounded-sm">
                                <p className="text-[10px] text-text-muted uppercase tracking-widest mb-1">{spec.label}</p>
                                <p className="text-sm font-bold text-white uppercase" style={{ color: spec.color }}>{spec.value}</p>
                             </div>
                           ))}
                        </div>

                        <div className="flex items-end gap-6 border-b border-white/5 pb-10">
                            <span className="text-5xl font-[900] text-white tracking-tighter">${product.price}.00</span>
                        </div>

                        <div className="flex flex-col gap-5">
                            <button className="riot-button w-full h-20 flex items-center justify-center gap-4 group/buy">
                                <ShoppingBag size={24} className="group-hover/buy:scale-110 transition-transform" />
                                <span className="text-sm font-black uppercase tracking-[0.4em]">Initialize Acquisition</span>
                            </button>
                            <div className="flex items-center justify-center gap-3 mt-2">
                               <Clock size={16} className="text-primary-accent" />
                               <span className="text-xs text-text-muted uppercase font-bold tracking-widest">Drop Terminates in: <span className="text-white">{timer}</span></span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8 pt-10 border-t border-white/5">
                            <div className="flex flex-col gap-3 text-white">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck size={18} className="text-secondary-accent" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Auth Guaranteed</span>
                                </div>
                                <p className="text-text-muted text-[10px] leading-relaxed uppercase font-bold tracking-widest">Full cryptographic verification on every physical unit.</p>
                            </div>
                            <div className="flex items-center gap-4 ml-auto">
                                <button className="w-12 h-12 rounded-sm border border-white/10 flex items-center justify-center hover:border-primary-accent transition-colors"><Heart size={20} className="text-white" /></button>
                                <button className="w-12 h-12 rounded-sm border border-white/10 flex items-center justify-center hover:border-secondary-accent transition-colors"><Share2 size={20} className="text-white" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutContainer>
        </div>
    );
};

export default ProductDetail;
