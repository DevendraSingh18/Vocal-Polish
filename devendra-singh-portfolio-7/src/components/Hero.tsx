import React from "react";
import { motion, useScroll, useTransform } from "motion/react";

// The CartoonLetter component renders chunky individual letters with bold colors matching the reference exactly.
const CartoonLetter = ({ 
  children, 
  className, 
  delay = 0, 
  rotate = "0deg",
  highlightColor = "#ff3ea5"
}: { 
  children: React.ReactNode; 
  className: string; 
  delay?: number; 
  rotate?: string;
  highlightColor?: string;
}) => {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.3, y: 80, rotate: "-40deg" }}
      whileInView={{ opacity: 1, scale: 1, y: 0, rotate }}
      viewport={{ once: true }}
      transition={{ 
        type: "spring", 
        stiffness: 160, 
        damping: 10, 
        delay 
      }}
      whileHover={{ 
        scale: 1.1, 
        rotate: "0deg", 
        y: -10, 
        transition: { type: "spring", stiffness: 350, damping: 10 } 
      }}
      className={`font-display font-black leading-none cursor-pointer inline-flex items-center justify-center relative select-none ${className}`}
      style={{
        color: highlightColor,
      }}
    >
      {children}
    </motion.span>
  );
};

// Two crossed cartoon pencils (Yellow and Grey/Silver) forming an 'X'
// with sharp lead tips at the top and cute dark erasers at the bottom.
const CrossedPencils = ({ delay }: { delay: number }) => {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.3, y: 80, rotate: "-45deg" }}
      whileInView={{ opacity: 1, scale: 1, y: 0, rotate: "0deg" }}
      viewport={{ once: true }}
      transition={{ 
        type: "spring", 
        stiffness: 160, 
        damping: 10, 
        delay 
      }}
      whileHover={{ 
        scale: 1.2, 
        rotate: "12deg", 
        y: -14, 
        transition: { type: "spring", stiffness: 350, damping: 10 } 
      }}
      className="inline-flex items-center justify-center relative mx-1 md:mx-2 cursor-pointer filter drop-shadow-[5px_5px_0px_rgba(0,0,0,1)]"
    >
      <svg width="90" height="95" viewBox="0 0 100 100" className="block overflow-visible w-[clamp(2.8rem,7.5vw,5.5rem)] md:w-[90px]">
        {/* Draw Pencil 1: Yellow (Rotated -25 deg, pointing up-left, eraser at bottom-right) */}
        <g transform="translate(50, 50) rotate(-28) translate(-50, -50)">
          {/* Shaft outline background for thick line styling */}
          <rect x="44" y="15" width="12" height="70" rx="2" fill="#f5c400" stroke="#000" strokeWidth="4" strokeLinejoin="round" />
          
          {/* Subtle stripes inside yellow pencil */}
          <line x1="48" y1="15" x2="48" y2="85" stroke="#d9a300" strokeWidth="1.5" />
          <line x1="52" y1="15" x2="52" y2="85" stroke="#d9a300" strokeWidth="1.5" />

          {/* Wooden shaved tip at top */}
          <polygon points="44,15 56,15 50,0" fill="#fde047" stroke="#000" strokeWidth="4" strokeLinejoin="miter" />
          {/* Lead graphite dark tip */}
          <polygon points="48,7 52,7 50,0" fill="#1e293b" />

          {/* Silver/Eraser at the bottom */}
          {/* Silver ferrule metal cap */}
          <rect x="44" y="85" width="12" height="8" fill="#e2e8f0" stroke="#000" strokeWidth="4" strokeLinejoin="round" />
          {/* Cute pinkish-orange cartoon eraser cap */}
          <path d="M44,93 C44,99 56,99 56,93 Z" fill="#ff7a5d" stroke="#000" strokeWidth="4" strokeLinejoin="round" />
        </g>

        {/* Draw Pencil 2: Silver/Grey (Rotated 25 deg, pointing up-right, eraser at bottom-left) */}
        <g transform="translate(50, 50) rotate(28) translate(-50, -50)">
          {/* Shaft outline background */}
          <rect x="44" y="15" width="12" height="70" rx="2" fill="#cbd5e1" stroke="#000" strokeWidth="4" strokeLinejoin="round" />
          
          {/* Subtle stripes inside silver pencil */}
          <line x1="48" y1="15" x2="48" y2="85" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="52" y1="15" x2="52" y2="85" stroke="#94a3b8" strokeWidth="1.5" />

          {/* Wooden shaved tip at top */}
          <polygon points="44,15 56,15 50,0" fill="#facc15" stroke="#000" strokeWidth="4" strokeLinejoin="miter" />
          {/* Lead graphite dark tip */}
          <polygon points="48,7 52,7 50,0" fill="#334155" />

          {/* Silver ferrule metal cap */}
          <rect x="44" y="85" width="12" height="8" fill="#94a3b8" stroke="#000" strokeWidth="4" strokeLinejoin="round" />
          {/* Cute dark grey cartoon eraser cap */}
          <path d="M44,93 C44,99 56,99 56,93 Z" fill="#475569" stroke="#000" strokeWidth="4" strokeLinejoin="round" />
        </g>
      </svg>
    </motion.span>
  );
};

// Mild light blue cartoon floating cloud without outline
const LightBlueCloud = ({ className, delay = -1, scale = 1 }: { className?: string; delay?: number; scale?: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: [0.5, 1, 1, 0.5], 
      x: [-15, 15, -15],
      scale: scale 
    }}
    transition={{ 
      duration: 8, 
      repeat: Infinity, 
      ease: "easeInOut",
      delay 
    }}
    className={`absolute pointer-events-none select-none z-0 ${className}`}
  >
    <svg viewBox="0 0 100 60" fill="none" className="overflow-visible w-20 sm:w-28 md:w-[220px] h-auto">
      {/* Cartoon Cloud with soft baby blue fill, no outline */}
      <path 
        d="M 20,45 
           A 12,12 0 0,1 26,25 
           A 16,16 0 0,1 54,18 
           A 18,18 0 0,1 80,28 
           A 12,12 0 0,1 88,45 
           Z" 
        fill="#bae6fd" 
        opacity="0.8"
      />
    </svg>
  </motion.div>
);

// Floating coding bracket icon without outline
const CodingBracketIcon = ({ className, delay = 0, color = "#60a5fa" }: { className?: string, delay?: number, color?: string }) => (
  <motion.div
    animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
    className={`absolute pointer-events-none z-0 opacity-40 mix-blend-multiply ${className}`}
  >
    <svg width="60" height="60" viewBox="0 0 100 100" fill="none" className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] overflow-visible">
      {/* no outline, flat solid color */}
      <path d="M 35,28 L 22,50 L 35,72 M 65,28 L 78,50 L 65,72" stroke={color} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="45" y1="75" x2="55" y2="25" stroke={color} strokeWidth="10" strokeLinecap="round" />
    </svg>
  </motion.div>
);

// Curly Braces icon without outline
const CurlyBracesIcon = ({ className, delay = 0, color = "#a78bfa" }: { className?: string, delay?: number, color?: string }) => (
  <motion.div
    animate={{ y: [0, 8, 0], rotate: [5, -5, 5] }}
    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay }}
    className={`absolute pointer-events-none z-0 opacity-40 mix-blend-multiply ${className}`}
  >
    <svg width="60" height="60" viewBox="0 0 100 100" fill="none" className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] overflow-visible">
      {/* Left brace */}
      <path d="M 40,20 C 30,20 30,40 20,50 C 30,60 30,80 40,80" stroke={color} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Right brace */}
      <path d="M 60,20 C 70,20 70,40 80,50 C 70,60 70,80 60,80" stroke={color} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  </motion.div>
);

// Music note icon
const MusicNoteIcon = ({ className, delay = 0, color = "#f472b6" }: { className?: string, delay?: number, color?: string }) => (
  <motion.div
    animate={{ y: [0, -10, 0], rotate: [-5, 10, -5] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
    className={`absolute pointer-events-none z-20 ${className}`}
  >
    <svg width="60" height="60" viewBox="0 0 100 100" fill="none" className="w-[40px] h-[40px] md:w-[80px] md:h-[80px] overflow-visible drop-shadow-md">
      {/* Musical Note */}
      <path d="M 35,65 L 35,25 L 75,15 L 75,55" stroke={color} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="25" cy="65" r="16" fill={color} />
      <circle cx="65" cy="55" r="16" fill={color} />
    </svg>
  </motion.div>
);

// Cold Drink icon without outline
const ColdDrinkIcon = ({ className, delay = 0 }: { className?: string, delay?: number }) => (
  <motion.div
    animate={{ y: [0, -6, 0], rotate: [-4, 4, -4] }}
    transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay }}
    className={`absolute pointer-events-none z-20 drop-shadow-md ${className}`}
  >
    <svg width="60" height="80" viewBox="0 0 100 130" fill="none" className="w-[50px] h-[70px] md:w-[70px] md:h-[90px] overflow-visible">
      {/* Straw (Orange) */}
      <path d="M 50,45 L 50,20 Q 50,10 60,10 L 80,10" fill="none" stroke="#f97316" strokeWidth="10" strokeLinecap="round" />
      
      {/* Cup Lid (Dark Blue) */}
      <path d="M 20,45 L 80,45" fill="none" stroke="#2563eb" strokeWidth="12" strokeLinecap="round" />
      
      {/* Cup Body (Blue) */}
      <path d="M 25,50 L 32,115 C 33,122 38,126 50,126 C 62,126 67,122 68,115 L 75,50 Z" fill="#3b82f6" />
      
      {/* Cup Label (Purple) */}
      <rect x="35" y="70" width="30" height="35" rx="6" fill="#a855f7" />
    </svg>
  </motion.div>
);

// Custom SVG Purple Flower with green stem
const PurpleFlowerAndStem = () => (
  <motion.div
    animate={{ rotate: [-5, 5, -5] }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    className="absolute -top-16 right-0 md:-top-24 md:-right-8 z-20 pointer-events-none origin-bottom"
  >
    <svg width="80" height="120" viewBox="0 0 100 150" fill="none" className="w-[60px] h-[90px] md:w-[80px] md:h-[120px] overflow-visible">
      {/* Green Stem */}
      <path d="M 50,70 Q 60,110 40,150" fill="none" stroke="#22c55e" strokeWidth="6" strokeLinecap="round" />
      {/* Little green leaf */}
      <path d="M 53,100 Q 80,95 75,115 Q 55,110 53,100 Z" fill="#4ade80" />

      {/* Flower petals and center */}
      <g transform="translate(50, 40) scale(0.65) translate(-50, -50)">
        <ellipse cx="50" cy="20" rx="10" ry="22" fill="#a855f7" />
        <ellipse cx="50" cy="80" rx="10" ry="22" fill="#a855f7" />
        <ellipse cx="20" cy="50" rx="22" ry="10" fill="#a855f7" />
        <ellipse cx="80" cy="50" rx="22" ry="10" fill="#a855f7" />
        
        <g transform="rotate(45, 50, 50)">
          <ellipse cx="50" cy="20" rx="10" ry="22" fill="#c084fc" />
          <ellipse cx="50" cy="80" rx="10" ry="22" fill="#c084fc" />
          <ellipse cx="20" cy="50" rx="22" ry="10" fill="#c084fc" />
          <ellipse cx="80" cy="50" rx="22" ry="10" fill="#c084fc" />
        </g>
        
        <circle cx="50" cy="50" r="16" fill="#fde047" />
        <ellipse cx="43" cy="45" rx="3" ry="5" fill="#000" />
        <ellipse cx="57" cy="45" rx="3" ry="5" fill="#000" />
        <path d="M 44,55 Q 50,60 56,55" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  </motion.div>
);

// High-fidelity speech bubble designed after the "Hi! My name is..." yellow bubble in the reference image
const SpeechBubble = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5, y: -20, rotate: -10 }}
    animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 200, damping: 10 }}
    className="absolute -top-16 -left-6 sm:-top-20 sm:-left-12 md:-top-28 md:-left-16 z-30 pointer-events-auto cursor-pointer drop-shadow-md"
  >
    <div className="relative w-[140px] h-[100px] md:w-[220px] md:h-[160px]">
      <svg className="w-full h-full" viewBox="0 0 160 120" fill="none">
        <g fill="#f5cc00">
           {/* Oval Body */}
           <ellipse cx="75" cy="55" rx="70" ry="45" />
           {/* Curved Tail pointing down-right */}
           <path d="M 100,85 Q 140,110 145,115 Q 135,85 130,50 Z" />
        </g>
      </svg>
      <div className="absolute inset-0 flex flex-col items-start justify-center pl-[28px] md:pl-[44px] pb-[12px] md:pb-[20px]">
        <div className="text-[17px] md:text-[28px] leading-[1.1] font-medium text-black font-sans tracking-tight">
          Hi! My<br />name is...
        </div>
      </div>
    </div>
  </motion.div>
);

// Beautiful hot-pink pushing thumb pin inspired by the "Erica" bottom-right decoration
const PushPinForA = () => (
  <motion.div
    animate={{ rotate: [-4, 4, -4], y: [0, -3, 0] }}
    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
    whileHover={{ scale: 1.25, rotate: 15 }}
    className="absolute -bottom-8 -right-6 md:-bottom-12 md:-right-10 z-30 pointer-events-auto cursor-pointer"
  >
    <svg width="70" height="70" viewBox="0 0 100 100" fill="none" className="block overflow-visible w-14 h-14 md:w-[70px] md:h-[70px]">
      {/* Draw pushpin tilted about 45 degrees, needle pointing down-left into the letter A */}
      <g transform="translate(50,50) rotate(15) translate(-50,-50)">
        {/* Shadow */}
        <ellipse cx="25" cy="75" rx="14" ry="4" fill="#000" opacity="0.15" />
        
        {/* Steel needle pin */}
        <line x1="45" y1="55" x2="20" y2="80" stroke="#94a3b8" strokeWidth="7" strokeLinecap="round" />
        <line x1="45" y1="55" x2="20" y2="80" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Push pin collar / flange */}
        <path d="M 33,52 L 67,34 C 69,38 66,45 56,51 C 46,57 37,56 33,52 Z" fill="#ff2d88" stroke="#000" strokeWidth="5" strokeLinejoin="round" />
        
        {/* Pin body cylinder handle with grooves */}
        <path d="M 46,24 L 72,10 L 80,24 L 54,38 Z" fill="#ff3ea5" stroke="#000" strokeWidth="5" strokeLinejoin="round" />
        <path d="M 39,37 L 65,22 M 45,47 L 71,32" stroke="#000" strokeWidth="4" />
        <path d="M 52,20 Q 64,13 70,20 Q 64,28 52,20 Z" fill="#ff7fca" />
      </g>
    </svg>
  </motion.div>
);



export default function Hero() {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 0.2], ["0%", "100%"]);

  // Set unified letter size so the bubble letters remain large, bold, and evenly spaced, scales down beautifully on mobile devices
  const letterSizeClass = "text-[clamp(2.5rem,11.5vw,8rem)] md:text-[clamp(6rem,11.5vw,14rem)] mb-2 px-0 md:px-[2px]";

  return (
    <>
      <motion.div 
        id="progress-bar" 
        style={{ width, position: 'fixed', top: 0, left: 0, height: '4px', backgroundColor: '#ff3ea5', zIndex: 200 }} 
      />
      
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-36 md:pt-44 pb-16 px-4 bg-white overflow-hidden">
        
        {/* Responsive Name Grid Area */}
        <div className="flex flex-col items-center justify-center max-w-7xl w-full relative z-10 my-auto mt-6 md:mt-10">
          
          {/* Handcrafted Playful Name Container */}
          <div className="relative flex flex-row flex-nowrap items-center justify-center px-4 md:px-14 py-8 select-none">
            
            {/* ABSOLUTE DOODLE ELEMENTS */}
            
            {/* Background Clouds */}
            <LightBlueCloud className="-top-12 left-10 md:-top-16 md:left-24" delay={0.5} scale={1.2} />
            <LightBlueCloud className="bottom-12 right-12 md:bottom-20 md:right-32" delay={2} scale={0.8} />

            {/* Coding Icons */}
            <CodingBracketIcon className="-top-8 right-16 md:-top-12 md:right-56" delay={1} color="#fcd34d" />
            <CurlyBracesIcon className="bottom-4 left-24 md:-bottom-8 md:left-64" delay={3} color="#93c5fd" />
            <MusicNoteIcon className="-bottom-8 -left-6 md:-bottom-12 md:-left-8" delay={1.5} color="#f472b6" />
            <ColdDrinkIcon className="-bottom-6 right-2 md:-bottom-12 md:right-24" delay={2.5} />

            {/* Speech Bubble "Hi! My name is..." at Top-Left pointing to letter 'D' */}
            <SpeechBubble />

            {/* High-fidelity pushpin sticking in the last letter 'a' */}
            <PushPinForA />

            {/* Purple Flower with green stem - Top-Right */}
            <PurpleFlowerAndStem />

            {/* ACTUAL LETTER GLYPHS - Match Erica colors exactly */}
            <div className="flex flex-row flex-nowrap items-center justify-center gap-0.5 relative z-10 whitespace-nowrap">
              
              <CartoonLetter className={`${letterSizeClass}`} rotate="-7deg" delay={0.05} highlightColor="#e80b6e">
                D
              </CartoonLetter>

              <CartoonLetter className={`${letterSizeClass}`} rotate="4deg" delay={0.11} highlightColor="#ff7f00">
                e
              </CartoonLetter>

              <CartoonLetter className={`${letterSizeClass}`} rotate="-3deg" delay={0.17} highlightColor="#00b050">
                v
              </CartoonLetter>

              <CartoonLetter className={`${letterSizeClass}`} rotate="5deg" delay={0.23} highlightColor="#0070c0">
                e
              </CartoonLetter>

              <CartoonLetter className={`${letterSizeClass}`} rotate="-4deg" delay={0.29} highlightColor="#e80b6e">
                n
              </CartoonLetter>

              <CartoonLetter className={`${letterSizeClass}`} rotate="3deg" delay={0.35} highlightColor="#ff7f00">
                d
              </CartoonLetter>

              <CartoonLetter className={`${letterSizeClass}`} rotate="-8deg" delay={0.41} highlightColor="#e80b6e">
                r
              </CartoonLetter>

              <CartoonLetter className={`${letterSizeClass}`} rotate="-5deg" delay={0.47} highlightColor="#00b050">
                a
              </CartoonLetter>

            </div>
          </div>

        </div>

        {/* Dynamic Tagline Paragraph */}
        <motion.p 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-[clamp(1.2rem,2.5vw,1.45rem)] font-bold text-center max-w-[800px] leading-[1.6] text-neutral-800 mt-14 md:mt-20 relative z-10 px-4"
        >
          Creative Developer <span className="highlight-orange">reimagining</span> complex challenges into{" "}
          <span className="highlight-green">playful,</span> <span className="highlight-purple">immersive,</span>{" "}
          human-centered experiences @{" "}
          <a href="https://github.com/devendra-singh" target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-4 hover:text-accent-pink transition-colors">GitHub</a>,{" "}
          <a href="#projects" className="font-bold underline underline-offset-4 hover:text-accent-blue transition-colors">Open Source</a> &{" "}
          <a href="#about" className="font-bold underline underline-offset-4 hover:text-accent-purple transition-colors">beyond.</a>
        </motion.p>
        
        {/* Scroll helper */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.0 }}
          className="mt-12 flex flex-col items-center gap-2 opacity-40 text-[10px] md:text-xs tracking-[0.15em] uppercase pointer-events-none select-none"
        >
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-black"
          />
          <span className="font-sans font-bold">scroll down</span>
        </motion.div>

      </section>
    </>
  );
}
