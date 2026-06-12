import React from "react";
import { motion } from "motion/react";

const skills = [
  { 
    name: "React", 
    emoji: "⚛️",
    textColor: "#0284C7",
    borderColor: "#61DAFB",
    bgColor: "rgba(97, 218, 251, 0.15)",
    glowColor: "rgba(97, 218, 251, 0.4)"
  },
  { 
    name: "Next.js", 
    emoji: "▲",
    textColor: "#000000",
    borderColor: "#000000",
    bgColor: "rgba(0, 0, 0, 0.15)",
    glowColor: "rgba(0, 0, 0, 0.25)"
  },
  { 
    name: "Node.js", 
    emoji: "🟢",
    textColor: "#2e7d32",
    borderColor: "#68A063",
    bgColor: "rgba(104, 160, 99, 0.15)",
    glowColor: "rgba(104, 160, 99, 0.4)"
  },
  { 
    name: "MongoDB", 
    emoji: "🍃",
    textColor: "#1b5e20",
    borderColor: "#47A248",
    bgColor: "rgba(71, 162, 72, 0.15)",
    glowColor: "rgba(71, 162, 72, 0.4)"
  },
  { 
    name: "Tailwind CSS", 
    emoji: "🎨",
    textColor: "#0369a1",
    borderColor: "#38BDF8",
    bgColor: "rgba(56, 189, 248, 0.15)",
    glowColor: "rgba(56, 189, 248, 0.4)"
  },
  { 
    name: "Python", 
    emoji: "🐍",
    textColor: "#1e3a8a",
    borderColor: "#3776AB",
    bgColor: "rgba(55, 118, 171, 0.15)",
    glowColor: "rgba(55, 118, 171, 0.4)"
  },
  { 
    name: "AI / ML", 
    emoji: "🤖",
    textColor: "#7e22ce",
    borderColor: "#a855f7",
    bgColor: "rgba(168, 85, 247, 0.15)",
    glowColor: "rgba(168, 85, 247, 0.4)"
  },
  { 
    name: "Firebase", 
    emoji: "🔥",
    textColor: "#b45309",
    borderColor: "#FFCA28",
    bgColor: "rgba(255, 202, 40, 0.15)",
    glowColor: "rgba(255, 202, 40, 0.5)"
  },
  { 
    name: "GitHub", 
    emoji: "🐙",
    textColor: "#24292e",
    borderColor: "#333333",
    bgColor: "rgba(51, 51, 51, 0.12)",
    glowColor: "rgba(51, 51, 51, 0.25)"
  },
  { 
    name: "Docker", 
    emoji: "🐳",
    textColor: "#1d4ed8",
    borderColor: "#2496ED",
    bgColor: "rgba(36, 150, 237, 0.15)",
    glowColor: "rgba(36, 150, 237, 0.4)"
  },
  { 
    name: "TypeScript", 
    emoji: "🔷",
    textColor: "#1e40af",
    borderColor: "#3178C6",
    bgColor: "rgba(49, 120, 198, 0.15)",
    glowColor: "rgba(49, 120, 198, 0.4)"
  }
];

export default function Skills() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto card-vibrant p-12 overflow-hidden relative">
        <div className="flex justify-between items-center mb-12">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
          </div>
          <h4 className="font-black uppercase tracking-widest text-xs text-black/30">Technical Stack</h4>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-5xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              style={{
                "--hover-text": skill.textColor,
                "--hover-border": skill.borderColor,
                "--hover-bg": skill.bgColor,
                "--hover-shadow": `0 10px 25px -5px ${skill.glowColor}, 0 0 15px ${skill.glowColor}`,
              } as React.CSSProperties}
              className="flex items-center gap-3 px-8 py-4 bg-white rounded-full text-sm md:text-base font-bold text-black border border-black/[0.03] shadow-[0_8px_30px_rgba(0,0,0,0.04)] cursor-default transition-all duration-[250ms] ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:bg-[var(--hover-bg)] hover:border-[var(--hover-border)] hover:text-[var(--hover-text)] hover:shadow-[var(--hover-shadow)] hover:-translate-y-[5px] hover:scale-[1.04]"
            >
              <span className="text-xl md:text-2xl flex items-center justify-center select-none">
                {skill.emoji}
              </span>
              <span>{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

