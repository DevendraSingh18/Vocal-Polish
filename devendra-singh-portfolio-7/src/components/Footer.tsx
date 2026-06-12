import React from "react";
import { motion } from "motion/react";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

interface FooterProps {
  setActivePage?: React.Dispatch<React.SetStateAction<"home" | "photos">>;
}

export default function Footer({ setActivePage }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFooterLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (setActivePage) {
      e.preventDefault();
      setActivePage("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        const element = document.querySelector(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <footer id="contact" className="pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto bg-white rounded-[40px] p-12 md:p-24 text-center shadow-sm relative overflow-hidden">
        {/* Background Sparkles */}
        <div className="absolute top-10 left-10 text-accent-pink/20 animate-float">✨</div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-7xl font-display font-extrabold mb-6">
            Thanks for <span className="text-accent-pink">stopping by!</span>
          </h2>
          <p className="text-xl md:text-2xl text-black/60 mb-12 max-w-2xl mx-auto">
            Curious to collaborate? Let’s make something amazing happen together.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
            <a 
              href="mailto:dev1459c@gmail.com"
              className="px-8 py-4 bg-accent-blue text-white rounded-2xl font-bold flex items-center gap-3 hover:scale-105 transition-transform shadow-lg shadow-accent-blue/20"
            >
              <Mail size={20} />
              Email Me
            </a>
            <div className="flex gap-4">
              <a href="#" className="w-14 h-14 bg-bg-main rounded-2xl flex items-center justify-center hover:bg-black hover:text-white transition-all">
                <Github size={24} />
              </a>
              <a href="#" className="w-14 h-14 bg-bg-main rounded-2xl flex items-center justify-center hover:bg-[#0077b5] hover:text-white transition-all">
                <Linkedin size={24} />
              </a>
              <a href="#" className="w-14 h-14 bg-bg-main rounded-2xl flex items-center justify-center hover:bg-black hover:text-white transition-all">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[22px] h-[22px] fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 px-6 py-2.5 bg-white border-2 border-black rounded-full text-black hover:bg-black hover:text-white transition-all duration-300 font-extrabold tracking-wide mx-auto mb-16 shadow-[0_4px_14px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)] active:scale-95 cursor-pointer"
          >
            <ArrowUp size={18} className="stroke-[3]" />
            <span className="text-sm md:text-base font-black select-none">Back To Top</span>
          </button>
          
          <div className="pt-8 border-t border-black/5 flex flex-col items-center justify-center gap-6">
            <div className="flex gap-8 uppercase text-[11px] tracking-[0.25em] font-bold text-black/40">
              <a href="#home" onClick={(e) => handleFooterLinkClick(e, "#home")} className="hover:text-black transition-colors">Home</a>
              <a href="#projects" onClick={(e) => handleFooterLinkClick(e, "#projects")} className="hover:text-black transition-colors">Projects</a>
              <a href="#about" onClick={(e) => handleFooterLinkClick(e, "#about")} className="hover:text-black transition-colors">About</a>
            </div>
            
            <p className="text-xl font-medium text-slate-900 flex items-center justify-center flex-wrap select-none tracking-tight gap-y-2">
              <span>Made with</span>
              
              {/* Hand-drawn style pink heart with 7 radiating beams */}
              <svg width="40" height="34" viewBox="0 0 40 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block ml-2 mr-0.5 align-middle select-none">
                <line x1="10" y1="20" x2="6" y2="19" stroke="#b0b0b8" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="11" y1="13" x2="7" y2="9" stroke="#b0b0b8" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="16" y1="8" x2="14" y2="3" stroke="#b0b0b8" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="22" y1="6" x2="22" y2="1" stroke="#b0b0b8" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="28" y1="8" x2="30" y2="3" stroke="#b0b0b8" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="33" y1="13" x2="37" y2="9" stroke="#b0b0b8" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="34" y1="20" x2="38" y2="19" stroke="#b0b0b8" strokeWidth="1.8" strokeLinecap="round" />
                <path 
                  d="M12 8.5C12 6.01472 14.0147 4 16.5 4C18.9853 4 21 6.01472 21 8.5C21 6.01472 23.0147 4 25.5 4C27.9853 4 30 6.01472 30 8.5C30 13.5 21 19 21 19C21 19 12 13.5 12 8.5Z" 
                  fill="#ff116b" 
                  transform="rotate(-8 21 12) translate(-2, 2.5)"
                />
              </svg>

              {/* Hand-drawn style yellow single note + blue double eighth note */}
              <svg width="42" height="34" viewBox="0 0 42 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block mx-0.5 align-middle select-none">
                <g id="yellow-note" transform="translate(1, 0)">
                  <ellipse cx="11" cy="24" rx="4.5" ry="3.2" transform="rotate(-20 11 24)" fill="#fbc531" />
                  <path d="M15 23.5V10" stroke="#fbc531" strokeWidth="2.8" strokeLinecap="round" />
                  <path d="M15 10C18.5 10.5 20.5 12.5 21.5 14.5" stroke="#fbc531" strokeWidth="2.8" strokeLinecap="round" />
                </g>
                <g id="blue-note" transform="translate(13, 0)">
                  <ellipse cx="12" cy="24" rx="4.2" ry="2.8" transform="rotate(-20 12 24)" fill="#3498db" />
                  <ellipse cx="22" cy="21.5" rx="4.2" ry="2.8" transform="rotate(-20 22 21.5)" fill="#3498db" />
                  <path d="M15.2 23.5V11" stroke="#3498db" strokeWidth="2.4" strokeLinecap="round" />
                  <path d="M25.2 21V8" stroke="#3498db" strokeWidth="2.4" strokeLinecap="round" />
                  <path d="M15.2 11.5L25.2 8.5" stroke="#3498db" strokeWidth="4" strokeLinecap="round" />
                </g>
              </svg>

              {/* Hand-drawn style tapered green drink cup with custom red label and straw */}
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block ml-0.5 mr-2 align-middle select-none">
                <path d="M17.5 12.5V4C17.5 3 18.5 2 20 2H26.5" stroke="#eb4d4b" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10.5 11 L12.5 27.5 C12.5 28.8 13.5 29.8 15 29.8 L21 29.8 C22.5 29.8 23.5 28.8 23.5 27.5 L25.5 11 Z" fill="#2eb872" />
                <rect x="9.5" y="9.5" width="17" height="3" rx="1.5" fill="#209a5f" />
                <rect x="13.5" y="15.5" width="9" height="9.5" rx="2" fill="#ff4757" />
              </svg>

              <span>by Devendra Singh © 2025</span>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
