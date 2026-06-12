import React from "react";
import { motion } from "motion/react";

interface NavbarProps {
  activePage: "home" | "photos";
  setActivePage: React.Dispatch<React.SetStateAction<"home" | "photos">>;
}

export default function Navbar({ activePage, setActivePage }: NavbarProps) {
  const [currentHash, setCurrentHash] = React.useState(window.location.hash || "#projects");

  React.useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || "#projects");
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Dynamic scroll spy using IntersectionObserver to detect currently active sections
  React.useEffect(() => {
    if (activePage !== "home") return;

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // focus observer trigger around upper-middle of viewport
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === "projects") {
            setCurrentHash("#projects");
          } else if (id === "about") {
            setCurrentHash("#about");
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const sections = ["projects", "about"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Back-to-top handler: default back to Work if at top of page (scrollY < 300)
    const handleScroll = () => {
      if (window.scrollY < 300) {
        setCurrentHash("#projects");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activePage]);

  const navItems = [
    { name: "Work", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Photos", href: "#photos" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: { name: string; href: string }) => {
    e.preventDefault();
    if (item.name === "Photos") {
      setActivePage("photos");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setActivePage("home");
      window.location.hash = item.href;
      setCurrentHash(item.href);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        const element = document.querySelector(item.href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActivePage("home");
    window.location.hash = "#projects";
    setCurrentHash("#projects");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTalkClick = () => {
    setActivePage("home");
    window.location.hash = "#contact";
    setCurrentHash("#contact");
    setTimeout(() => {
      const element = document.querySelector("#contact");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="fixed top-4 sm:top-8 left-0 w-full z-50 px-3 sm:px-6 md:px-12">
      <nav className="w-full flex justify-between items-center bg-white/60 backdrop-blur-xl px-4 sm:px-8 py-3 sm:py-4 rounded-full border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.05)] max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={handleLogoClick}
          className="text-2xl font-display font-black tracking-custom cursor-pointer"
        >
          D<span className="text-blue-600">/.</span>
        </motion.div>
        
        <div className="hidden md:flex gap-12 items-center">
          {navItems.map((item, index) => {
            let isActive = false;
            let itemClasses = "";
            let underlineClasses = "";

            if (item.name === "Photos") {
              isActive = activePage === "photos";
              itemClasses = `bg-gradient-to-r from-pink-500 via-indigo-500 to-cyan-500 bg-clip-text text-transparent font-black tracking-[0.2em] transition-all duration-300 ${
                isActive ? "scale-110 opacity-100" : "opacity-75 hover:opacity-100"
              }`;
              underlineClasses = "bg-gradient-to-r from-pink-500 via-indigo-500 to-cyan-500";
            } else if (item.name === "Work") {
              isActive = activePage === "home" && currentHash !== "#about";
              itemClasses = `transition-all duration-300 ${
                isActive ? "text-blue-500 font-extrabold" : "text-black/60 hover:text-blue-500"
              }`;
              underlineClasses = "bg-blue-500";
            } else if (item.name === "About") {
              isActive = activePage === "home" && currentHash === "#about";
              itemClasses = `transition-all duration-300 ${
                isActive ? "text-pink-500 font-extrabold" : "text-black/60 hover:text-pink-500"
              }`;
              underlineClasses = "bg-pink-500";
            }

            return (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`font-medium text-xs uppercase tracking-[0.2em] relative group cursor-pointer ${itemClasses}`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-[2px] transition-all duration-300 ${underlineClasses} ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </motion.a>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <button 
            onClick={handleTalkClick}
            className="bg-black text-white px-4 sm:px-8 py-2 sm:py-2.5 rounded-full text-[10px] font-bold hover:scale-105 transition-all uppercase tracking-widest hover:shadow-lg hover:shadow-black/10"
          >
            Let's Talk
          </button>
        </motion.div>
      </nav>
    </div>
  );
}
