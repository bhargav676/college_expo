import { motion } from "framer-motion";
import { useState } from "react";
import {
  HiEnvelope,
  HiPhone,
  HiMapPin,
  HiCursorArrowRays,
} from "react-icons/hi2";
import PageLayout from "../components/PageLayout";

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const emailAddress = "iete@gvpce.ac.in";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleContactClick = () => {
    const subject = encodeURIComponent("Inquiry regarding Expo 2K26");
    const body = encodeURIComponent("Hello Organizing Committee,\n\nI would like to know more about...");
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  };

  return (
    <PageLayout>
      <div className="relative min-h-screen bg-black overflow-hidden">
        {/* Background Decorative Gradients */}
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

        {/* Reduced max-width from 7xl to 5xl for a more compact look */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-12 pb-20">
          
          {/* HEADER */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-[10px] font-mono mb-4 tracking-[0.2em]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              EXPO 2K26 SUPPORT
            </motion.div>
            <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-4xl md:text-6xl font-sans font-extrabold text-white tracking-tight"
            >
              Get in <span className="font-serif italic text-cyan-400">Touch</span>
            </motion.h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            
            {/* LEFT BOX: CONTACT DETAILS */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col justify-between"
            >
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <span className="w-6 h-1 bg-cyan-500 rounded-full" />
                  Quick Connect
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4 group cursor-pointer" onClick={copyToClipboard}>
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-pink-400 group-hover:bg-pink-500 group-hover:text-white transition-all">
                      <HiEnvelope size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Email Address</p>
                      <p className="text-white text-sm font-medium">{emailAddress}</p>
                      {copied && <span className="text-[10px] text-green-400 font-mono animate-pulse uppercase">Copied</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all">
                      <HiPhone size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Helpline</p>
                      <p className="text-white text-sm font-medium">+91 98765 43210</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                      <HiMapPin size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Venue</p>
                      <p className="text-white text-sm font-medium">GVPCE, Visakhapatnam</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CONTACT BUTTON - REDIRECTS TO MAIL */}
              <button 
                onClick={handleContactClick}
                className="mt-10 w-full group relative px-6 py-4 bg-white text-black font-black rounded-xl overflow-hidden transition-all active:scale-95 shadow-lg shadow-white/5"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 text-sm tracking-widest">
                  CONTACT US <HiCursorArrowRays className="text-lg animate-bounce" />
                </span>
                <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </motion.div>

            {/* RIGHT BOX: MAP CARD */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <a 
                href="https://www.google.com/maps/search/Gayatri+Vidya+Parishad+College+of+Engineering" 
                target="_blank" 
                rel="noreferrer"
                className="relative block h-full min-h-[320px] rounded-3xl overflow-hidden border border-white/10 group group shadow-2xl shadow-cyan-500/5"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20 z-0" />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500" />
                
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6 backdrop-blur-[1px]">
                   <div className="mb-4 bg-white/10 p-4 rounded-full border border-white/20 group-hover:scale-110 transition-transform duration-500">
                     <HiMapPin className="text-4xl text-white" />
                   </div>
                   
                   <h3 className="text-white text-xl font-bold mb-2">Locate Us</h3>
                   <p className="text-white/60 max-w-[200px] text-xs font-light mb-6 leading-relaxed">
                     Madhurawada, Visakhapatnam, AP 530048
                   </p>

                   <div className="px-6 py-2 rounded-full border border-white/30 bg-white/10 text-white font-mono text-[10px] tracking-[0.2em] group-hover:bg-white group-hover:text-black transition-all">
                     OPEN MAPS
                   </div>
                </div>

                <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />
              </a>
            </motion.div>

          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Contact;