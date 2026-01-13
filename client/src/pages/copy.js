import { useState, useEffect, useRef } from "react";
import PageLayout from "../components/PageLayout";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import {
  HiRocketLaunch,
  HiLightBulb,
  HiTrophy,
  HiUsers,
  HiChevronDown,
  HiCpuChip,
  HiDocumentText,
  HiFire,
  HiSparkles,
  HiPlay,
  HiCalendarDays,
} from "react-icons/hi2";

// ============ PARTICLE SYSTEM ============
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

// ============ 3D FLOATING EVENT CARD ============
const FloatingEventCard = ({ event, index, side }) => {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  
  const springConfig = { stiffness: 300, damping: 30 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const IconComponent = event.icon;

  // Different vertical positions for cards
  const verticalPositions = ["10%", "35%", "60%"];
  const topPosition = verticalPositions[index % 3];

  return (
    <motion.div
      ref={cardRef}
      className={`fixed hidden xl:block ${side === 'left' ? 'left-8 2xl:left-16' : 'right-8 2xl:right-16'} pointer-events-auto z-20`}
      style={{
        top: topPosition,
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      initial={{ opacity: 0, x: side === 'left' ? -100 : 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: index * 0.15 + 0.5,
        duration: 0.6,
        type: "spring",
        stiffness: 100,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.08 }}
    >
      <motion.div
        className={`w-32 h-40 2xl:w-36 2xl:h-44 rounded-2xl ${event.gradient} p-px cursor-pointer`}
        animate={{
          y: [0, -15, 0, 10, 0],
          x: [0, side === 'left' ? 5 : -5, 0, side === 'left' ? -3 : 3, 0],
          rotate: [0, side === 'left' ? 2 : -2, 0, side === 'left' ? -1 : 1, 0],
        }}
        transition={{
          duration: 6 + index * 0.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-full h-full bg-gray-900/95 backdrop-blur-xl rounded-2xl p-3 2xl:p-4 flex flex-col items-center justify-center gap-2">
          <motion.div
            className={`p-2.5 2xl:p-3 rounded-xl ${event.iconBg}`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <IconComponent className="text-xl 2xl:text-2xl text-white" />
          </motion.div>
          <h3 className="text-white text-xs 2xl:text-sm font-bold text-center leading-tight">
            {event.name}
          </h3>
          <span className={`text-[10px] 2xl:text-xs ${event.textColor} font-semibold`}>
            {event.tag}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ============ GLOWING ORB ============
const GlowingOrb = ({ color, size, position, delay }) => (
  <motion.div
    className={`absolute ${size} ${color} rounded-full blur-3xl`}
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

// ============ TYPEWRITER TEXT ============
const TypewriterText = ({ texts, className }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = texts[currentTextIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentFullText.length) {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTextIndex, texts]);

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="inline-block w-1 h-8 bg-cyan-500 ml-1"
      />
    </span>
  );
};

// ============ ANIMATED COUNTER ============
const AnimatedCounter = ({ target, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target);
    const incrementTime = (duration * 1000) / end;
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count}{suffix}</span>;
};

// ============ COUNTDOWN TIMER ============
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set event date (adjust as needed)
    const eventDate = new Date("2026-02-15T09:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-2 sm:gap-4 justify-center">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 + index * 0.1 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
          <div className="relative bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-2 sm:p-4 min-w-[60px] sm:min-w-[80px]">
            <motion.span
              key={unit.value}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-2xl sm:text-4xl font-bold text-white block text-center"
            >
              {String(unit.value).padStart(2, "0")}
            </motion.span>
            <span className="text-[10px] sm:text-xs text-cyan-500 uppercase tracking-wider block text-center">
              {unit.label}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// ============ INTERACTIVE 3D FEATURE CARD ============
const FeatureCard3D = ({ feature, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  
  const springConfig = { stiffness: 400, damping: 30 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const IconComponent = feature.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative group cursor-pointer"
    >
      {/* Glow effect */}
      <motion.div
        className={`absolute inset-0 ${feature.glowColor} rounded-2xl blur-xl`}
        animate={{ opacity: isHovered ? 0.4 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 h-full overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, ${feature.dotColor} 1px, transparent 0)`,
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "100%" : "-100%" }}
          transition={{ duration: 0.6 }}
        />

        <motion.div
          className={`relative z-10 w-16 h-16 ${feature.iconBg} rounded-2xl flex items-center justify-center mb-6`}
          style={{ transform: "translateZ(40px)" }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <IconComponent className="text-3xl text-white" />
        </motion.div>

        <motion.h3
          className="relative z-10 text-2xl font-bold text-white mb-4"
          style={{ transform: "translateZ(30px)" }}
        >
          {feature.title}
        </motion.h3>

        <motion.p
          className="relative z-10 text-gray-400 leading-relaxed"
          style={{ transform: "translateZ(20px)" }}
        >
          {feature.description}
        </motion.p>

        {/* Bottom gradient line */}
        <motion.div
          className={`absolute bottom-0 left-0 right-0 h-1 ${feature.gradientLine}`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + index * 0.2, duration: 0.8 }}
        />
      </div>
    </motion.div>
  );
};

// ============ STATS SECTION ============
const StatsSection = () => {
  const stats = [
    { value: "5", suffix: "+", label: "Events" },
    { value: "500", suffix: "+", label: "Participants" },
    { value: "50", suffix: "K", label: "Prize Pool" },
    { value: "10", suffix: "+", label: "Sponsors" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, type: "spring" }}
          whileHover={{ scale: 1.05 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur group-hover:blur-md transition-all" />
          <div className="relative bg-gray-900/50 backdrop-blur border border-gray-800 rounded-xl p-4 text-center">
            <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            </span>
            <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

// ============ MAIN COMPONENT ============
const Home = () => {
  const events = [
    {
      name: "Hardware Expo",
      icon: HiCpuChip,
      gradient: "bg-gradient-to-br from-cyan-500 to-blue-600",
      iconBg: "bg-cyan-500",
      textColor: "text-cyan-400",
      tag: "Technical",
    },
    {
      name: "Paper Presentation",
      icon: HiDocumentText,
      gradient: "bg-gradient-to-br from-purple-500 to-pink-600",
      iconBg: "bg-purple-500",
      textColor: "text-purple-400",
      tag: "Academic",
    },
    {
      name: "Robo Wars",
      icon: HiFire,
      gradient: "bg-gradient-to-br from-orange-500 to-red-600",
      iconBg: "bg-orange-500",
      textColor: "text-orange-400",
      tag: "Battle",
    },
    {
      name: "Hackathon",
      icon: HiRocketLaunch,
      gradient: "bg-gradient-to-br from-green-500 to-emerald-600",
      iconBg: "bg-green-500",
      textColor: "text-green-400",
      tag: "Coding",
    },
    {
      name: "Fun Events",
      icon: HiSparkles,
      gradient: "bg-gradient-to-br from-pink-500 to-rose-600",
      iconBg: "bg-pink-500",
      textColor: "text-pink-400",
      tag: "Entertainment",
    },
  ];

  const features = [
    {
      icon: HiLightBulb,
      title: "Innovation",
      description: "Showcase your innovative ideas and groundbreaking projects to industry experts and win exciting prizes.",
      iconBg: "bg-gradient-to-br from-yellow-500 to-orange-600",
      glowColor: "bg-yellow-500",
      dotColor: "yellow",
      gradientLine: "bg-gradient-to-r from-yellow-500 to-orange-500",
    },
    {
      icon: HiTrophy,
      title: "Compete & Win",
      description: "Participate in thrilling competitions across 5+ categories and win amazing prizes worth lakhs.",
      iconBg: "bg-gradient-to-br from-cyan-500 to-blue-600",
      glowColor: "bg-cyan-500",
      dotColor: "cyan",
      gradientLine: "bg-gradient-to-r from-cyan-500 to-blue-500",
    },
    {
      icon: HiUsers,
      title: "Network",
      description: "Connect with like-minded individuals, industry mentors, and potential collaborators for future ventures.",
      iconBg: "bg-gradient-to-br from-purple-500 to-pink-600",
      glowColor: "bg-purple-500",
      dotColor: "purple",
      gradientLine: "bg-gradient-to-r from-purple-500 to-pink-500",
    },
  ];

  const typewriterTexts = [
    "Innovation",
    "Technology",
    "Competition",
    "Excellence",
    "Future",
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <div className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-8 md:pt-0">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <GlowingOrb
            color="bg-cyan-500/20"
            size="w-[500px] h-[500px]"
            position={{ top: "10%", left: "10%" }}
            delay={0}
          />
          <GlowingOrb
            color="bg-purple-500/20"
            size="w-[600px] h-[600px]"
            position={{ bottom: "10%", right: "5%" }}
            delay={1}
          />
          <GlowingOrb
            color="bg-pink-500/15"
            size="w-[400px] h-[400px]"
            position={{ top: "40%", right: "20%" }}
            delay={2}
          />
        </div>

        {/* Particle Effect */}
        <ParticleField />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3lhbiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />



        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-cyan-500/10 border border-cyan-500/30 rounded-full"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <HiSparkles className="text-cyan-500 text-lg" />
            </motion.div>
            <span className="text-cyan-500 font-semibold text-sm">
              Registration Open Now
            </span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-green-500"
            />
          </motion.div>

          {/* Main Title with Gradient Animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                College Event Expo
              </span>
            </h1>
            <motion.div
              className="text-3xl sm:text-4xl md:text-5xl text-white font-bold mb-6"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            >
              2026
            </motion.div>
          </motion.div>

          {/* Typewriter Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mb-4"
          >
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-light">
              Where{" "}
              <TypewriterText
                texts={typewriterTexts}
                className="text-cyan-400 font-semibold"
              />{" "}
              <span className="hidden sm:inline">Meets Imagination</span>
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-gray-400 text-base sm:text-lg mb-8 max-w-2xl mx-auto"
          >
            Join the biggest tech expo of the year. Experience cutting-edge
            technology, compete in thrilling events, and connect with innovators.
          </motion.p>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mb-10"
          >
            <p className="text-gray-500 text-sm mb-3 flex items-center justify-center gap-2">
              <HiCalendarDays className="text-cyan-500" />
              Event Starts In
            </p>
            <CountdownTimer />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/events">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="relative px-8 py-4 text-lg font-semibold text-white bg-cyan-800 rounded-xl flex items-center gap-2 hover:bg-cyan-700 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40">
                  <HiRocketLaunch className="text-xl" />
                  Register Now
                </button>
              </motion.div>
            </Link>
            <Link to="/events">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button className="px-8 py-4 text-lg font-semibold text-white border-2 border-gray-600 rounded-xl flex items-center gap-2 hover:border-cyan-500 hover:text-cyan-400 transition-all duration-300 bg-gray-900/50 backdrop-blur">
                  <HiPlay className="text-xl" />
                  Explore Events
                </button>
              </motion.div>
            </Link>
          </motion.div>
        </div>

      </div>

    </PageLayout>
  );
};

export default Home;
