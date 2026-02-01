import { HiEnvelope, HiPhone, HiMapPin } from "react-icons/hi2";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Profile", path: "/profile" },
  ];

  const events = [
    "Hardware Expo",
    "Paper Presentation",
    "Robo Wars",
    "Digital Hackathon",
    "Fun Events",
  ];

  return (
    <footer className="bg-black text-gray-400 pb-20 md:pb-0">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Grid: 2 columns on mobile, 4 columns on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section - Full width on mobile (col-span-2) */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="https://iete-studentforum.vercel.app/assets/logo-CfJBDEX0.jpg"
                alt="GVPCE Logo"
                className="w-12 h-12 object-cover shadow-lg shadow-cyan-500/20"
              />
              <div>
                <h3 className="text-white font-bold text-xl">GVPCE</h3>
                <p className="text-cyan-400 text-sm">Tech Expo 2026</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Where Innovation Meets Imagination. Join us for the biggest tech
              expo featuring cutting-edge technology and unforgettable
              experiences.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/iete-student-forum-gvpce-1851b4378/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                className="w-10 h-10 bg-white/5 hover:bg-cyan-500 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              <a
                href="https://www.instagram.com/ietegvp?igsh=MXIwanI0cDd4MWVobA%3D%3D"
                className="w-10 h-10 bg-white/5 hover:bg-cyan-500 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links - Visible on both */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold text-lg mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-500 hover:text-cyan-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Events - Visible on both */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold text-lg mb-5">
              Our Events
            </h4>
            <ul className="space-y-3">
              {events.map((event) => (
                <li key={event}>
                  <Link
                    to="/events"
                    className="text-gray-500 hover:text-cyan-400 transition-colors duration-300 text-sm"
                  >
                    {event}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - HIDDEN ON MOBILE (hidden md:block) */}
          <div className="hidden md:block lg:col-span-1">
            <h4 className="text-white font-semibold text-lg mb-5">
              Contact Us
            </h4>
            <div className="space-y-4">
              <a
                href="mailto:events@gvpce.edu"
                className="flex items-center gap-3 text-gray-500 hover:text-cyan-400 transition-colors duration-300 group"
              >
                <div className="w-10 h-10 bg-white/5 group-hover:bg-cyan-500/10 rounded-lg flex items-center justify-center transition-colors">
                  <HiEnvelope className="text-cyan-400 text-lg" />
                </div>
                <span className="text-sm">isf_ece@gvpce.ac.in</span>
              </a>
              <a
                href="tel:+917901538371"
                className="flex items-center gap-3 text-gray-500 hover:text-cyan-400 transition-colors duration-300 group"
              >
                <div className="w-10 h-10 bg-white/5 group-hover:bg-cyan-500/10 rounded-lg flex items-center justify-center transition-colors">
                  <HiPhone className="text-cyan-400 text-lg" />
                </div>
                <span className="text-sm">+91 7901538371</span>
              </a>
              <div className="flex items-start gap-3 text-gray-500 group">
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                  <HiMapPin className="text-cyan-400 text-lg" />
                </div>
                <span className="text-sm leading-relaxed">
                  GVPCE (A), Madhurawada,
                  <br />
                  Visakhapatnam, AP 530048
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-gray-600 text-sm">
              © {currentYear} GVPCE (A) Technoverse. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-gray-600 hover:text-cyan-400 text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-cyan-400 text-sm transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
