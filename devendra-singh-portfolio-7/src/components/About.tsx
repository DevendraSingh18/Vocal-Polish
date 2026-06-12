import { motion } from "motion/react";
import { User, Heart, Coffee, MapPin } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-square bg-white rounded-[40px] border border-black/5 p-4 shadow-xl">
            <div className="w-full h-full bg-accent-pink rounded-[32px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" 
                alt="Devendra Singh"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <motion.div 
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -bottom-6 -right-6 w-32 h-32 bg-white rounded-3xl shadow-xl flex items-center justify-center border border-black/5 p-4"
          >
            <div className="text-center">
              <span className="text-3xl block mb-1">✨</span>
              <span className="text-xs font-bold uppercase tracking-tight text-black/50">Human-AI Bridge</span>
            </div>
          </motion.div>
        </motion.div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent-pink/10 text-accent-pink rounded-full font-bold text-sm mb-6"
          >
            <User size={16} />
            About Me
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-black mb-8 leading-tight"
          >
            Turning ideas into <span className="text-accent-blue underline decoration-4 underline-offset-8">digital reality</span> with a playful touch.
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6 text-lg text-black/60 leading-relaxed"
          >
            <p>
              I'm <span className="highlight-pink">Devendra Singh</span>, a Full Stack Developer based in India. I specialize in building human-centered applications that are not just functional, but delightful.
            </p>
            <p>
              With a strong focus on <span className="highlight-purple">AI integration</span> and modern frameworks, I bridge the gap between complex logic and polished interfaces.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
