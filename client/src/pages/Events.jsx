import { motion } from "framer-motion";
import { 
  HiWrench, 
  HiDocumentText, 
  HiCog, 
  HiCommandLine, 
  HiPuzzlePiece, 
  HiSparkles,
  HiChevronRight
} from "react-icons/hi2";
import PageLayout from "../components/PageLayout";


const EventCard = ({ title, description, icon: Icon, category, index, type }) => {
  const isTech = type === "technical";
  const accentColor = isTech ? "group-hover:shadow-cyan-500/20" : "group-hover:shadow-purple-500/20";
  const borderColor = isTech ? "group-hover:border-cyan-500/50" : "group-hover:border-purple-500/50";
  const iconBg = isTech ? "bg-cyan-500/10 text-cyan-400" : "bg-purple-500/10 text-purple-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className={`group relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-300 ${borderColor} ${accentColor} hover:bg-white/[0.08]`}
    >
      <div className={`absolute top-0 right-0 w-24 h-24 blur-3xl rounded-full opacity-0 group-hover:opacity-20 transition-opacity ${isTech ? 'bg-cyan-500' : 'bg-purple-500'}`} />

      <div className={`w-14 h-14 ${iconBg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="text-3xl" />
      </div>

      <span className={`text-xs font-mono tracking-widest uppercase mb-3 block ${isTech ? 'text-cyan-500' : 'text-purple-400'}`}>
        {category}
      </span>

      <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
        {title}
      </h3>

      <p className="text-gray-400 text-sm leading-relaxed mb-6">
        {description}
      </p>

      <div className="flex items-center gap-2 text-white font-semibold text-sm group-hover:gap-3 transition-all cursor-pointer">
        Learn More <HiChevronRight className={isTech ? 'text-cyan-500' : 'text-purple-500'} />
      </div>
    </motion.div>
  );
};

const Events = () => {
  const technicalEvents = [
    { title: "Hardware Expo", description: "Showcase innovative hardware projects, IoT devices, and robotics prototypes.", icon: HiWrench, category: "Hardware & IoT" },
    { title: "Paper Presentation", description: "Present research papers and technical findings to expert panels.", icon: HiDocumentText, category: "Research" },
    { title: "Robo Wars", description: "Battle custom-built robots in an epic combat arena for the championship.", icon: HiCog, category: "Robotics" },
  ];

  const nonTechnicalEvents = [
    { title: "Digital Hackathon", description: "24-hour coding sprint to build solutions for real-world problems.", icon: HiCommandLine, category: "Software" },
    { title: "Fun Events", description: "Exciting activities, gaming zones, and tech-entertainment mix.", icon: HiPuzzlePiece, category: "Social" },
    { title: "Cultural Night", description: "An evening of spectacular music, dance, and creative performances.", icon: HiSparkles, category: "Arts" },
  ];

  return (
  
      <div className="relative min-h-screen bg-black overflow-hidden">
        {/* Background Decorative Gradients */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          
          {/* RE-DESIGNED HEADER: Adjusted for better size and balance */}
          <div className="text-center mb-16">
            <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-4xl md:text-7xl font-sans font-extrabold text-white tracking-tight"
            >
              Explore <span className="font-serif italic text-cyan-400">Events</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed mt-6"
            >
              Discover a diverse range of competitions designed to challenge 
              your intellect and celebrate your creativity.
            </motion.p>
          </div>

          {/* Technical Events Section */}
          <section className="mb-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Technical Core</h2>
                <div className="h-1 w-16 bg-cyan-500 rounded-full" />
              </div>
              <p className="text-gray-500 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em]">Innovation // Engineering</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {technicalEvents.map((event, i) => (
                <EventCard key={i} {...event} index={i} type="technical" />
              ))}
            </div>
          </section>

          {/* Non-Technical Events Section */}
          <section className="mb-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Beyond Tech</h2>
                <div className="h-1 w-16 bg-purple-500 rounded-full" />
              </div>
              <p className="text-gray-500 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em]">Creativity // Culture</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nonTechnicalEvents.map((event, i) => (
                <EventCard key={i} {...event} index={i} type="non-technical" />
              ))}
            </div>
          </section>

          {/* Register CTA */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-0.5 rounded-3xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 overflow-hidden"
          >
            <div className="bg-[#0a0a0a] rounded-[22px] px-8 py-12 md:py-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3lhbiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />
              
              <h3 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter italic">
                THE FUTURE IS CALLING
              </h3>
              <p className="text-gray-400 mb-8 md:mb-10 max-w-xl mx-auto text-base md:text-lg font-light">
                Don't just watch history happen—be the one who creates it. 
                Registrations for 2K26 are now open.
              </p>
              
              <button className="relative group overflow-hidden px-8 md:px-10 py-3 md:py-4 bg-white text-black font-bold rounded-xl transition-all duration-300 hover:tracking-widest">
                <span className="relative z-10 text-sm md:text-base">REGISTER NOW →</span>
                <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
  );
};

export default Events;