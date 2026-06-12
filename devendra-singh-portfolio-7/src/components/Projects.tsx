import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: "verifact",
    title: "VeriFact",
    description: "AI misinformation and fake news detection platform using intelligent analysis.",
    color: "bg-accent-blue",
    icon: "🔍",
    theme: "blue"
  },
  {
    id: "ai-quiz",
    title: "Quiz AI",
    description: "Smart generation of quizzes from any topic using LLMs for educators.",
    color: "bg-accent-purple",
    icon: "💡",
    theme: "purple"
  },
  {
    id: "yojana",
    title: "Yojana",
    description: "Discovering government schemes made super simple for all citizens.",
    color: "bg-accent-green",
    icon: "🏛️",
    theme: "green"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center md:text-left">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-display font-black mb-4"
          >
            Selected <span className="text-accent-pink">Projects</span>
          </motion.h2>
          <p className="text-black/40 text-lg max-w-2xl font-bold uppercase tracking-widest text-xs">
            Showcase of digital craftsmanship
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                y: -12, 
                scale: 1.03,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.25), 0 10px 10px -5px rgba(0, 0, 0, 0.25)" 
              }}
              className={`p-8 rounded-[32px] text-white flex flex-col justify-between min-h-[320px] group cursor-pointer shadow-lg ${project.color}`}
            >
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-3xl mb-6">
                {project.icon}
              </div>
              
              <div>
                <h4 className="text-3xl font-display font-black mb-3">{project.title}</h4>
                <p className="text-white/80 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div className="pt-6 border-t border-white/20 text-xs font-bold uppercase tracking-widest flex items-center justify-between">
                <span>View Project</span>
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
