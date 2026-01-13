import { motion } from "framer-motion";
import { 
  HiRocketLaunch, 
  HiAcademicCap, 
  HiBriefcase, 
  HiCommandLine, 
  HiPaintBrush, 
  HiUserGroup,
  HiTicket,
  HiBolt,
  HiComputerDesktop,
  HiTrophy
} from "react-icons/hi2";
import PageLayout from "../components/PageLayout";

// ============ SUB-COMPONENT: ABOUT CARD (Matches Event Card Style) ============
const AboutCard = ({ title, description, icon: Icon, delay, colorClass }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className={`group relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-300 hover:border-${colorClass}-500/50 hover:bg-white/[0.08]`}
  >
    <div className={`w-14 h-14 bg-${colorClass}-500/10 text-${colorClass}-400 rounded-xl flex items-center justify-center mb-6`}>
      <Icon className="text-3xl" />
    </div>
    <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

const About = () => {
  const team = [
    { name: "Dr. Rajesh Kumar", role: "Faculty Coordinator", icon: HiAcademicCap, color: "cyan" },
    { name: "Priya Sharma", role: "Student President", icon: HiBriefcase, color: "purple" },
    { name: "Arjun Patel", role: "Tech Lead", icon: HiCommandLine, color: "cyan" },
  ];

  const timeline = [
    { time: "09:00 AM", event: "Inauguration", icon: HiTicket },
    { time: "10:00 AM", event: "Technical Events", icon: HiBolt },
    { time: "12:00 PM", event: "Hackathon Kickoff", icon: HiComputerDesktop },
    { time: "07:00 PM", event: "Prize Ceremony", icon: HiTrophy },
  ];

  return (
    <PageLayout>
      <div className="relative min-h-screen bg-black overflow-hidden">
        {/* Background Decorative Gradients */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-4 md:pt-20 pb-20">
          
          {/* HEADER: Matches "Explore Events" Style */}
          <div className="text-center mb-16">
            <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-4xl md:text-7xl font-sans font-extrabold text-white tracking-tight"
            >
              About <span className="font-serif italic text-cyan-400">Us</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed mt-6"
            >
              Bridging the gap between academic theory and industry innovation 
              through a high-octane technical experience.
            </motion.p>
          </div>

          {/* MISSION & VISION SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
            <AboutCard 
              title="Our Mission" 
              colorClass="cyan"
              icon={HiRocketLaunch}
              delay={0.1}
              description="To create a premier platform that nurtures innovation, fosters collaboration, and showcases the incredible technical talent of the next generation."
            />
            <AboutCard 
              title="Our Vision" 
              colorClass="purple"
              icon={HiBolt}
              delay={0.2}
              description="To become the most anticipated tech expo in the region, inspiring students to transform their ideas into reality and solve tomorrow's challenges."
            />
          </div>

          {/* TEAM SECTION: Modern & Sleek */}
          <section className="mb-24">
            <div className="flex items-end justify-between mb-10 border-b border-white/10 pb-4">
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                The <span className="text-purple-500 italic font-serif">Leadership</span>
              </h2>
              <p className="text-gray-500 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em]">Core Team // 2K26</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {team.map((member, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-5 transition-all hover:border-purple-500/30"
                >
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
                    <member.icon className="text-2xl" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{member.name}</h4>
                    <p className="text-gray-500 text-xs uppercase tracking-wider">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* TIMELINE: Futuristic List Style */}
          <section>
            <div className="flex items-end justify-between mb-10 border-b border-white/10 pb-4">
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Event <span className="text-cyan-400 italic font-serif">Journey</span>
              </h2>
              <p className="text-gray-500 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em]">Schedule // Roadmap</p>
            </div>

            <div className="space-y-4">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all"
                >
                  <div className="flex items-center gap-6 mb-2 md:mb-0">
                    <span className="text-cyan-500 font-mono font-bold text-lg w-20">{item.time}</span>
                    <div className="h-8 w-[1px] bg-white/10 hidden md:block" />
                    <h4 className="text-white text-xl font-semibold tracking-tight group-hover:text-cyan-400 transition-colors">
                      {item.event}
                    </h4>
                  </div>
                  <item.icon className="text-gray-600 text-2xl group-hover:text-cyan-500 transition-colors" />
                </motion.div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </PageLayout>
  );
};

export default About;