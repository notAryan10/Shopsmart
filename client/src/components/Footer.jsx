import { Link } from 'react-router-dom';
import { Twitter, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0b0b0c] border-t border-[#1f1f23] py-16 mt-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2 flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-2 no-underline">
              <div className="w-8 h-8 bg-gradient-to-tr from-[#ff4655] to-[#ff5a67] flex items-center justify-center rounded-md shadow-sm">
                 <span className="text-white font-bold text-lg leading-none">S</span>
              </div>
              <span className="font-outfit font-bold text-lg text-white">ShopSmart</span>
            </Link>
            <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">
              The premier marketplace for digital assets and creator drops. 
              Secure your place in the digital economy with ShopSmart.
            </p>
            <div className="flex gap-4">
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-md border border-[#1f1f23] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#121214] transition-colors">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <h4 className="text-sm font-semibold text-white">Registry</h4>
            <ul className="flex flex-col gap-3 list-none">
              {['All Drops', 'Active Registry', 'Creator List', 'Inventory'].map(link => (
                <li key={link}>
                  <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors no-underline">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-5">
            <h4 className="text-sm font-semibold text-white">Protocols</h4>
            <ul className="flex flex-col gap-3 list-none">
              {['Security', 'Authentication', 'Terms of Service', 'Privacy Policy'].map(link => (
                <li key={link}>
                  <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors no-underline">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#1f1f23] flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-zinc-500 font-medium">
            © 2026 ShopSmart Digital Infrastructure. All rights reserved.
          </p>
          <div className="flex items-center gap-2 bg-[#121214] border border-[#1f1f23] px-3 py-1.5 rounded-full shadow-sm">
             <div className="w-2 h-2 rounded-full bg-[#00f2ff] animate-pulse shadow-[0_0_8px_rgba(0,242,255,0.4)]" />
             <span className="text-xs text-zinc-300 font-medium tracking-wide">System Status: Nominal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
