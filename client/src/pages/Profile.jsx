import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "../components/PageLayout";
import {
  HiMagnifyingGlass,
  HiCheckCircle,
  HiXCircle,
  HiArrowPath,
  HiUser,
  HiCpuChip,
  HiRocketLaunch,
  HiFire,
  HiTrophy,
  HiIdentification,
  HiSparkles,
  HiExclamationTriangle
} from "react-icons/hi2";

const Profile = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [isSavedUser, setIsSavedUser] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);

  const allEvents = [
    { name: "Hardware Expo", category: "Technical", icon: HiCpuChip, color: "cyan" },
    { name: "Paper Presentation", category: "Technical", icon: HiIdentification, color: "blue" },
    { name: "Robo Wars", category: "Technical", icon: HiRocketLaunch, color: "purple" },
    { name: "Digital Hackathon", category: "Non-Technical", icon: HiFire, color: "orange" },
    { name: "Fun Events", category: "Non-Technical", icon: HiTrophy, color: "pink" },
  ];

  // SESSION DURATION: 5 DAYS
  const SESSION_DURATION = 5 * 24 * 60 * 60 * 1000;

  useEffect(() => {
    const savedData = localStorage.getItem("expoUser");
    if (savedData) {
      const { value, expiry } = JSON.parse(savedData);
      if (new Date().getTime() < expiry) {
        setSearchValue(value);
        setIsSavedUser(true);
        setInitialLoading(true);
        setTimeout(() => autoSearch(value), 1500);
      } else {
        localStorage.removeItem("expoUser");
      }
    }
  }, []);

  const autoSearch = async (value) => {
    try {
      const response = await fetch("http://localhost:4000/check-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchValue: value.trim() }),
      });
      const data = await response.json();
      if (response.ok) {
        setRegisteredEvents(data.registeredEvents || []);
        setSearched(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchValue.trim()) {
      setError("Entry required (Email/Phone)");
      return;
    }
    setLoading(true);
    setError("");
    const startTime = Date.now();

    try {
      const response = await fetch("http://localhost:4000/check-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchValue: searchValue.trim() }),
      });
      const data = await response.json();
      const elapsed = Date.now() - startTime;
      await new Promise(r => setTimeout(r, Math.max(0, 1500 - elapsed)));

      if (response.ok) {
        setRegisteredEvents(data.registeredEvents || []);
        setSearched(true);
        if (rememberMe) {
          const expiry = new Date().getTime() + SESSION_DURATION; // SAVED FOR 5 DAYS
          localStorage.setItem("expoUser", JSON.stringify({ value: searchValue.trim(), expiry }));
          setIsSavedUser(true);
        }
      } else {
        setError(data.error || "No record found");
      }
    } catch (err) {
      setError("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  const clearSavedUser = () => {
    localStorage.removeItem("expoUser");
    setSearchValue("");
    setSearched(false);
    setRegisteredEvents([]);
    setIsSavedUser(false);
  };

  return (
    <PageLayout>
      <div className="relative min-h-screen bg-black overflow-hidden font-sans">
        {/* Background Decorative Gradients */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-10 pb-20">
          
          {/* HEADER SECTION */}
          <div className="text-center mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6"
            >
              <HiSparkles className="text-cyan-400" />
              <span className="text-white/60 text-xs font-mono uppercase tracking-widest">Attendee Portal</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-4xl md:text-7xl font-extrabold text-white tracking-tight"
            >
              Event <span className="font-serif italic text-cyan-400">Dashboard</span>
            </motion.h1>
          </div>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {(initialLoading || loading) ? (
                /* LOADING STATE */
                <motion.div 
                  key="loader"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-20"
                >
                  <div className="relative w-24 h-24 mb-8">
                    {/* Glass Finish Loader */}
                    <div className="absolute inset-0 bg-white/5 border border-white/20 rounded-full backdrop-blur-xl shadow-[0_0_40px_rgba(34,211,238,0.1)]"></div>
                    <div className="absolute inset-0 border-t-4 border-cyan-400 rounded-full animate-spin"></div>
                    <HiUser className="absolute inset-0 m-auto text-3xl text-cyan-400" />
                  </div>
                  <h2 className="text-white font-mono tracking-widest animate-pulse uppercase">Accessing Mainframe...</h2>
                </motion.div>
              ) : !searched ? (
                /* SEARCH FORM */
                <motion.div 
                  key="search"
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl"
                >
                  <form onSubmit={handleSearch} className="space-y-8">
                    <div className="space-y-4">
                      <label className="text-sm font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <HiMagnifyingGlass className="text-cyan-400" /> Identify Your Account
                      </label>
                      <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Email address or mobile number"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-gray-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all text-lg"
                      />
                    </div>

                    {error && (
                      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-4 rounded-xl border border-red-400/20">
                        <HiXCircle /> {error}
                      </motion.div>
                    )}

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="hidden" />
                        <div className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all ${rememberMe ? 'bg-cyan-500 border-cyan-500' : 'border-white/20 bg-white/5'}`}>
                          {rememberMe && <HiCheckCircle className="text-white" />}
                        </div>
                        <span className="text-gray-400 text-sm">Keep session active (5 Days)</span>
                      </label>

                      <button type="submit" className="w-full md:w-auto group relative overflow-hidden px-10 py-4 bg-white text-black font-bold rounded-xl transition-all">
                        <span className="relative z-10 flex items-center justify-center gap-2 group-hover:tracking-widest transition-all uppercase">
                          Search Status <HiMagnifyingGlass />
                        </span>
                        <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                /* RESULTS STATE */
                <motion.div 
                  key="results"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="space-y-8"
                >
                  {/* GLASS FINISH USER INFO CARD */}
                  <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                    <div className="flex items-center gap-5">
                      {/* GLASS PROFILE ICON */}
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative w-16 h-16 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-2xl flex items-center justify-center shadow-2xl">
                          <HiUser className="text-3xl text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs font-mono uppercase tracking-tighter">Verified Profile</p>
                        <h3 className="text-white font-bold text-xl">{searchValue}</h3>
                        <p className="text-cyan-400/60 text-[10px] font-mono mt-1 uppercase tracking-widest">Valid for 5 days</p>
                      </div>
                    </div>
                    <button onClick={clearSavedUser} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-mono bg-white/5 px-4 py-2 rounded-lg border border-white/5 hover:border-white/20">
                      <HiArrowPath /> DISCONNECT
                    </button>
                  </div>

                  {/* EVENTS GRID */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {allEvents.map((event, i) => {
                      const isRegistered = registeredEvents.some(e => e.name === event.name);
                      return (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                          key={i} 
                          className={`p-6 rounded-3xl border backdrop-blur-md transition-all duration-500 ${
                            isRegistered 
                              ? 'bg-cyan-500/10 border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.05)]' 
                              : 'bg-red-500/5 border-red-500/20'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-4">
                            <event.icon className={`text-3xl ${isRegistered ? 'text-cyan-400' : 'text-red-400/60'}`} />
                            
                            {/* STATUS BADGE */}
                            <span className={`text-[10px] font-mono font-bold px-3 py-1.5 rounded-lg border backdrop-blur-md ${
                              isRegistered 
                                ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400' 
                                : 'bg-red-500/20 border-red-500/50 text-red-400'
                            }`}>
                              {isRegistered ? "SUCCESS: REGISTERED" : "ACTION: NOT REGISTERED"}
                            </span>
                          </div>

                          <h4 className={`text-lg font-bold ${isRegistered ? 'text-white' : 'text-white/80'}`}>{event.name}</h4>
                          <p className="text-gray-500 text-[10px] mb-4 uppercase tracking-[0.2em]">{event.category}</p>
                          
                          <div className="flex items-center gap-3">
                             <div className={`flex-1 h-1 rounded-full transition-all duration-1000 ${isRegistered ? 'bg-cyan-500' : 'bg-red-500/20'}`} />
                             {isRegistered ? (
                               <HiCheckCircle className="text-cyan-400 text-xl" />
                             ) : (
                               <HiExclamationTriangle className="text-red-400 text-xl animate-pulse" />
                             )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* CTA SECTION */}
                  {registeredEvents.length < allEvents.length && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-10 rounded-3xl bg-gradient-to-br from-red-500/10 via-black to-cyan-500/10 border border-white/5 text-center">
                      <h3 className="text-white font-bold text-2xl mb-2">Complete Your Roster</h3>
                      <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto leading-relaxed">
                        Secure your participation in all events to unlock the full 2K26 experience.
                      </p>
                      <a href="/events" className="inline-block bg-white text-black font-bold px-10 py-4 rounded-xl hover:tracking-[0.2em] transition-all duration-300 uppercase text-sm">
                        Complete Registration
                      </a>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Add CSS animations */}
        <style jsx>{`
          @keyframes gradient {
            0%,
            100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 3s ease infinite;
          }
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-slideUp {
            animation: slideUp 0.6s ease forwards;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease forwards;
          }
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-slideDown {
            animation: slideDown 0.3s ease forwards;
          }
        `}</style>
      </div>
    </PageLayout>
  );
};

export default Profile;