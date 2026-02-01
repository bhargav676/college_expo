import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Events from "./Events";
import Footer from "../components/Footer";
import About from "./About";
import Contact from "./Contact";
import {
  HiCalendarDays,
} from "react-icons/hi2";
import PageLayout from "../components/PageLayout";

// ============ 1. VIVID PARTICLE SYSTEM (Your Original) ============
const Particle = ({ index }) => {
  const randomX = Math.random() * 100;
  const randomDelay = Math.random() * 5;
  const randomDuration = 15 + Math.random() * 20;
  const size = Math.random() * 4 + 1;

  return (
    <motion.div
      className="absolute rounded-full bg-cyan-500/30"
      style={{
        width: size,
        height: size,
        left: `${randomX}%`,
        bottom: "-10px",
      }}
      animate={{
        y: [0, -window.innerHeight - 100],
        x: [0, (Math.random() - 0.5) * 200],
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0],
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

const ParticleField = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(50)].map((_, i) => (
      <Particle key={i} index={i} />
    ))}
  </div>
);

// ============ 2. TRIPLE GLOWING ORBS (Your Original) ============
const GlowingOrb = ({ color, size, position, delay }) => (
  <motion.div
    className={`absolute ${size} ${color} rounded-full blur-3xl pointer-events-none`}
    style={position}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.6, 0.3],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// ============ 3. TYPEWRITER EFFECT ============
const TypewriterText = ({ texts }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = texts[currentTextIndex];
    const speed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentFullText.length) {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTextIndex, texts]);

  return (
    <span className="text-cyan-400 font-bold">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="inline-block w-[2px] h-6 bg-cyan-500 ml-1 translate-y-1"
      />
    </span>
  );
};

// ============ MAIN HOME COMPONENT ============
const Home = () => {
  // Your Original Canvas Connection Logic
  useEffect(() => {
    const canvas = document.getElementById("particles-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = [];
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 30 : 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
        color: `hsla(${Math.random() * 60 + 180}, 100%, 70%, ${
          isMobile ? Math.random() * 0.15 + 0.05 : Math.random() * 0.3 + 0.1
        })`,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        particles.forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = particle.color
              .replace("hsla", "hsla")
              .replace(/,[^,]+\)$/, ",0.05)");
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });
      requestAnimationFrame(animate);
    }
    animate();
  }, []);

  return (
    <PageLayout>
      <Navbar/>
      
      <div className="relative min-h-[85vh] md:min-h-screen w-full flex items-center justify-center overflow-hidden pt-32 md:pt-0 md:pb-0">
        
        {/* BACKGROUND LAYER 1: Triple Orbs (Restored) */}
        <div className="absolute inset-0 z-0">
          <GlowingOrb color="bg-cyan-500/20" size="w-[500px] h-[500px]" position={{ top: "10%", left: "10%" }} delay={0} />
          <GlowingOrb color="bg-purple-500/20" size="w-[600px] h-[600px]" position={{ bottom: "10%", right: "5%" }} delay={1} />
          <GlowingOrb color="bg-pink-500/15" size="w-[400px] h-[400px]" position={{ top: "40%", right: "20%" }} delay={2} />
        </div>

        {/* BACKGROUND LAYER 2: Particles (Restored) */}
        <ParticleField />
        <canvas id="particles-canvas" className="absolute inset-0 z-0 pointer-events-none" />

        {/* BACKGROUND LAYER 3: Original High-Visibility Grid (Restored) */}
        <div className="absolute inset-0 z-0 opacity-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3lhbiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />

        {/* CONTENT AREA */}
        <div className="relative z-10 text-center px-4 w-full max-w-5xl mx-auto">
          
          {/* Responsive Title Section */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* FIXED RESPONSIVENESS: Uses vw for fluid sizing on mobile */}
            <h1 className="text-[12.5vw] sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white mb-2 italic uppercase leading-none">
              TECHNO<span className="text-transparent stroke-text">VERSE</span>
            </h1>
            
            <div className="flex items-center justify-center gap-2 md:gap-4 mb-10">
              <div className="h-[1px] flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-cyan-500" />
              <span className="text-xl md:text-5xl font-light text-cyan-500 tracking-[0.2em] md:tracking-[0.4em] font-mono">2K26</span>
              <div className="h-[1px] flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-cyan-500" />
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-3xl text-gray-300 font-light mb-8 h-8"
          >
            Experience the Future of{" "}
            <TypewriterText texts={["Innovation", "Robotics", "Technology", "Excellence"]} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          >
            Join thousands of innovators and tech enthusiasts for the most 
            anticipated college event of the year. 
          </motion.p>

          {/* Buttons */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 px-6 sm:px-0"
          >
            <Link to="/events" className="group relative w-full sm:w-auto">
              <div className="absolute -inset-1 bg-cyan-500 rounded-xl blur opacity-25"></div>
              <button className="relative w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 bg-cyan-600 rounded-xl text-white font-bold text-base sm:text-lg flex items-center justify-center shadow-2xl shadow-cyan-500/20">
                Register now
              </button>
            </Link>

            <Link to="/events" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 border border-white/20 bg-white/5 backdrop-blur-md rounded-xl text-white font-bold text-base sm:text-lg hover:bg-white/10 transition-all">
                View Schedule
              </button>
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 flex items-center justify-center gap-3 text-gray-500"
          >
            <HiCalendarDays className="text-cyan-500 text-xl" />
            <span className="text-sm font-mono tracking-[0.3em] uppercase">February 15-17, 2026</span>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
        }
        @media (min-width: 768px) {
          .stroke-text {
            -webkit-text-stroke: 2px rgba(255, 255, 255, 0.4);
          }
        }
      `}</style>
      
      <Events/>
      <About/>
      <Contact/>
      <Footer/>
     
    </PageLayout>
  );
};

export default Home;