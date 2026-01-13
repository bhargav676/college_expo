import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { HiHome, HiCalendarDays, HiInformationCircle, HiPhone, HiUser, HiXMark, HiBars3 } from 'react-icons/hi2';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Our Events', path: '/events' },
    { name: 'Contact', path: '/contact' },
    { name: 'Profile', path: '/profile' },
  ];

  const mobileNavLinks = [
    { name: 'Home', path: '/', icon: HiHome },
    { name: 'Events', path: '/events', icon: HiCalendarDays },
    { name: 'About', path: '/about', icon: HiInformationCircle },
    { name: 'Contact', path: '/contact', icon: HiPhone },
    { name: 'Profile', path: '/profile', icon: HiUser },
  ];

  const isActive = (path) => location.pathname === path;

  // Close sidebar when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Clean Navbar */}
      <nav className="md:sticky md:top-0 z-40 bg-black h-20 md:h-24 flex items-center px-4 md:px-6">
        {/* Hamburger Button - Left (Hidden on mobile) */}
        <button
          onClick={() => setIsOpen(true)}
          className="hidden md:flex group w-12 h-12 flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-white/5 transition-all duration-300"
          aria-label="Open menu"
        >
          <span className="w-6 h-0.5 bg-cyan-400 rounded-full transition-all group-hover:w-5 group-hover:translate-x-1"></span>
          <span className="w-6 h-0.5 bg-cyan-400 rounded-full transition-all"></span>
          <span className="w-6 h-0.5 bg-cyan-400 rounded-full transition-all group-hover:w-5 group-hover:-translate-x-1"></span>
        </button>

        {/* Banner - Centered */}
        <div className="flex-1 flex justify-center py-2">
          <img 
            src="https://iete-studentforum.vercel.app/assets/banner-iXDOt3CN.webp" 
            alt="College Banner" 
            className="h-14 md:h-16 object-contain"
          />
        </div>

        {/* Empty spacer for balance (Hidden on mobile) */}
        <div className="hidden md:block w-12 h-12"></div>
      </nav>

      {/* Overlay with blur */}
      <div 
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Left Sidebar - Glassmorphism style */}
      <aside 
        className={`fixed top-0 left-0 h-full w-[320px] md:w-[380px] z-50 transform transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar inner with glass effect */}
        <div className="h-full bg-black/95 backdrop-blur-2xl border-r border-cyan-500/20">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-5 border-b border-white/5">
            {/* Logo */}
            <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500/30 blur-lg group-hover:bg-cyan-500/50 transition-all"></div>
                <img 
                  src="https://iete-studentforum.vercel.app/assets/logo-CfJBDEX0.jpg" 
                  alt="GVPCE Logo" 
                  className="relative w-14 h-14 object-cover border border-cyan-500/30"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg tracking-wide">GVPCE</span>
                <span className="text-cyan-400/70 text-sm">Tech Expo 2026</span>
              </div>
            </Link>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-xl transition-all hover:rotate-90 duration-300"
              aria-label="Close menu"
            >
              <HiXMark className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-5">
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <li key={link.path} style={{ animationDelay: `${index * 50}ms` }} className={`${isOpen ? 'animate-slide-in' : ''}`}>
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`group relative block px-5 py-4 rounded-xl text-lg font-medium transition-all duration-300 overflow-hidden ${
                      isActive(link.path)
                        ? 'text-cyan-400'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {/* Active/Hover background */}
                    <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                      isActive(link.path) 
                        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/10 border-l-2 border-cyan-400' 
                        : 'bg-transparent group-hover:bg-white/5'
                    }`}></div>
                    
                    {/* Link text */}
                    <span className="relative z-10 flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full transition-all ${isActive(link.path) ? 'bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.8)]' : 'bg-gray-600 group-hover:bg-cyan-400'}`}></span>
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-white/5">
            <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
              <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
              <span>© 2026 GVPCE Tech Expo</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Bottom Navigation Bar - Clean */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-black border-t border-white/10">
        <div className="flex items-center justify-around h-20 px-2">
          {mobileNavLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex flex-col items-center justify-center flex-1 h-14 rounded-xl mx-1 transition-all duration-300 ${
                  isActive(link.path)
                    ? 'text-cyan-400'
                    : 'text-gray-500 hover:text-cyan-400'
                }`}
              >
                <IconComponent className={`text-xl mb-0.5 transition-transform ${isActive(link.path) ? 'scale-110' : ''}`} />
                <span className="text-[10px] font-medium">{link.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom spacer for mobile */}
      {/* <div className="md:hidden h-16"></div> */}

      {/* Custom animation styles */}
      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease forwards;
        }
      `}</style>
    </>
  );
};

export default Navbar;
