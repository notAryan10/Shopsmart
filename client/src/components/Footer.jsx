import { Link } from 'react-router-dom';
import { Rocket, Twitter, Instagram, Github, Youtube } from 'lucide-react';
import LayoutContainer from './LayoutContainer';

const Footer = () => {
  return (
    <footer className="bg-bg-panel pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <LayoutContainer>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          {/* Brand Col */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-8 group">
              <div className="w-10 h-10 bg-primary-accent rounded-sm flex items-center justify-center transform group-hover:rotate-90 transition-transform duration-500">
                <Rocket size={22} className="text-white transform rotate-45" />
              </div>
              <span className="heading-display text-2xl tracking-[0.15em] text-white">VENDORA</span>
            </Link>
            <p className="text-text-muted text-[11px] font-bold uppercase tracking-widest leading-relaxed mb-8 opacity-60">
              Forging the future of creator commerce through high-stakes visual drops and authenticated physical protocols.
            </p>
            <div className="flex gap-4">
              {[Twitter, Instagram, Github, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center text-text-muted hover:text-primary-accent hover:bg-white/10 transition-all border border-white/5">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-8 border-l-2 border-primary-accent pl-4">Marketplace</h4>
            <ul className="flex flex-col gap-4 text-[10px] font-bold uppercase tracking-widest">
              <li><Link to="/drops" className="text-text-muted hover:text-white transition-colors">Registry</Link></li>
              <li><Link to="/drops" className="text-text-muted hover:text-white transition-colors">Drops</Link></li>
              <li><Link to="/creators" className="text-text-muted hover:text-white transition-colors">Creators</Link></li>
              <li><Link to="/inventory" className="text-text-muted hover:text-white transition-colors">Vault</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-8 border-l-2 border-secondary-accent pl-4">Support</h4>
            <ul className="flex flex-col gap-4 text-[10px] font-bold uppercase tracking-widest">
              <li><a href="#" className="text-text-muted hover:text-white transition-colors">Protocols</a></li>
              <li><a href="#" className="text-text-muted hover:text-white transition-colors">Auth Terminal</a></li>
              <li><a href="#" className="text-text-muted hover:text-white transition-colors">Security</a></li>
              <li><a href="#" className="text-text-muted hover:text-white transition-colors">Terms</a></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-8 border-l-2 border-gold-accent pl-4">Registry Status</h4>
            <div className="bg-black/40 p-5 border border-white/5 rounded-sm">
               <div className="flex items-center gap-3 mb-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                 <span className="text-[9px] font-black text-white uppercase tracking-widest">Grid Online</span>
               </div>
               <p className="text-[8px] text-text-muted uppercase font-bold tracking-[0.2em]">Operational since 20XX. Protocol Version 4.2.0 Active.</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest">
            © 2026 VENDORA PROTOCOL. ALL ASSETS GRID-VERIFIED.
          </p>
          <div className="flex items-center gap-6 text-[9px] font-black uppercase tracking-widest text-text-muted">
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              SYSTEMS OPERATIONAL
            </span>
            <span className="text-white/20">|</span>
            <span>VER. 0.8.4_ALPHA</span>
          </div>
        </div>
      </LayoutContainer>
    </footer>
  );
};

export default Footer;
