// src/components/TopBar.jsx
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";

export default function TopBar() {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setHidden(latest > 50);
  });

  const socials = [FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube];

  return (
    <motion.div
      animate={{ y: hidden ? "-100%" : "0%", opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full z-[60] bg-slate-950 overflow-hidden"
    >
      {/* Top glow line */}
      <div className="relative h-[2px] w-full bg-slate-800/60 overflow-hidden">
        <motion.div
          className="absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-[#4ade80] to-transparent"
          animate={{ x: ["-100%", "400%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-2.5 text-xs md:text-sm text-white/90">
        {/* Left - contact info */}
        <div className="flex items-center gap-5">
          <motion.a
            href="tel:+923001234567"
            whileHover={{ x: 2 }}
            className="flex items-center gap-1.5 hover:text-[#22c55e] transition-colors"
          >
            <span className="flex items-center justify-center h-6 w-6 rounded-full bg-[#22c55e]/15 border border-[#22c55e]/30">
              <Phone size={11} className="text-[#22c55e]" />
            </span>
            <span className="hidden sm:inline">+92 300 1234567</span>
          </motion.a>
          <motion.a
            href="mailto:info@powernex.com"
            whileHover={{ x: 2 }}
            className="flex items-center gap-1.5 hover:text-[#22c55e] transition-colors"
          >
            <span className="flex items-center justify-center h-6 w-6 rounded-full bg-[#22c55e]/15 border border-[#22c55e]/30">
              <Mail size={11} className="text-[#22c55e]" />
            </span>
            <span className="hidden sm:inline">info@powernex.com</span>
          </motion.a>
          <span className="hidden md:flex items-center gap-1.5">
            <span className="flex items-center justify-center h-6 w-6 rounded-full bg-[#22c55e]/15 border border-[#22c55e]/30">
              <MapPin size={11} className="text-[#22c55e]" />
            </span>
            Islamabad, Pakistan
          </span>
        </div>

        {/* Right - social icons */}
        <div className="flex items-center gap-2">
          {socials.map((Icon, i) => (
            <motion.a
              key={i}
              href="#"
              whileHover={{
                scale: 1.15,
                backgroundColor: "rgba(34,197,94,0.25)",
                boxShadow: "0 0 12px rgba(34,197,94,0.6)",
              }}
              className="h-7 w-7 flex items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors"
            >
              <Icon size={12} />
            </motion.a>
          ))}
        </div>
      </div>

      {/* Bottom glow line */}
      <div className="relative h-[2px] w-full bg-slate-800/60 overflow-hidden">
        <motion.div
          className="absolute top-0 h-full w-1/4 bg-gradient-to-r from-transparent via-[#22c55e] to-transparent"
          animate={{ x: ["400%", "-100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}