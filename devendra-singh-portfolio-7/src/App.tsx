/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Skills from "./components/Skills";
import Photos from "./components/Photos";
import Footer from "./components/Footer";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";

export default function App() {
  const [activePage, setActivePage] = useState<"home" | "photos">("home");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Check URL hash on load to see if direct routing to #photos is requested
  useEffect(() => {
    if (window.location.hash === "#photos") {
      setActivePage("photos");
    }
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-between">
      {/* Scroll Progress Bar (Only visible/active on home page for continuous scrolling) */}
      {activePage === "home" && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-accent-pink z-[60] origin-left"
          style={{ scaleX }}
        />
      )}
      
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      
      <main className="flex-grow pt-24">
        <AnimatePresence mode="wait">
          {activePage === "home" ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Hero />
              <Projects />
              <About />
              <Skills />
            </motion.div>
          ) : (
            <motion.div
              key="photos"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Photos />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <Footer setActivePage={setActivePage} />
      
      {/* Global Background Elements */}
      <div className="fixed inset-0 pointer-events-none -z-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-accent-blue/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-accent-pink/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      </div>
    </div>
  );
}

