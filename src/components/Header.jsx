import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import { Search, X } from "lucide-react";
import logo from "../assets/powernex-logo.png";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Products", to: "/products" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <motion.header
      initial={false}
      style={{ top: 40 }}
      animate={{ y: scrolled ? -40 : 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`fixed left-0 w-full z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-slate-950 shadow-lg shadow-green-500/10 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="flex items-center justify-between px-6 md:px-12 max-w-7xl mx-auto">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-10 md:h-12 w-auto" />
        </Link>

        <ul className="hidden md:flex items-center gap-10 font-medium text-white transition-colors duration-500">
          {navLinks.map((link) => (
            <li key={link.to} className="relative group">
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `cursor-pointer transition-colors ${
                    isActive ? "text-[#4ade80]" : "text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-300 group-hover:w-full" />
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div className="relative flex items-center">
            <AnimatePresence>
              {searchOpen && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 180, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  type="text"
                  placeholder="Search..."
                  className="mr-2 px-3 py-1.5 rounded-full text-sm outline-none border bg-white/10 border-white/30 text-white placeholder-white/60"
                />
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSearchOpen((prev) => !prev)}
              className="p-2 rounded-full text-white hover:bg-white/10 transition-colors"
            >
              {searchOpen ? <X size={20} /> : <Search size={20} />}
            </motion.button>
          </div>

          <Link to="/contact">
            <motion.button
              className="relative overflow-hidden px-6 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/30"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0 bg-white/30 skew-x-[-20deg]"
                initial={{ x: "-150%" }}
                animate={{ x: "250%" }}
                transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
              />
              <span className="relative z-10">Get Quote</span>
            </motion.button>
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
