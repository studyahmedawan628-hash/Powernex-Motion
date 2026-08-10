// src/components/TopBar.jsx
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { CONTACT } from "../config/contact";

export default function TopBar() {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setHidden(latest > 50);
  });

  return (
    <motion.div
      animate={{ y: hidden ? "-100%" : "0%", opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="top-bar fixed top-0 left-0 w-full z-[110] bg-slate-950 overflow-hidden"
    >
      {/* Top glow line */}
      <div className="relative h-[2px] w-full bg-slate-800/60 overflow-hidden">
        <motion.div
          className="absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-[#4ade80] to-transparent"
          animate={{ x: ["-100%", "400%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="site-container top-bar__inner flex items-center justify-between gap-3 py-2 text-xs md:text-sm text-white/90">
        {/* Left - contact info */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-5">
          {CONTACT.phone && <motion.a
            href={`tel:${CONTACT.phoneHref}`}
            aria-label={`Call ${CONTACT.phone}`}
            whileHover={{ x: 2 }}
            className="top-bar__phone flex items-center gap-1.5 hover:text-[#22c55e] transition-colors"
          >
            <span className="flex items-center justify-center h-6 w-6 rounded-full bg-[#22c55e]/15 border border-[#22c55e]/30">
              <Phone size={11} className="text-[#22c55e]" />
            </span>
            <span className="hidden min-[390px]:inline">{CONTACT.phone}</span>
          </motion.a>}
          {CONTACT.email && <motion.a
            href={`mailto:${CONTACT.email}`}
            aria-label={`Email ${CONTACT.email}`}
            whileHover={{ x: 2 }}
            className="top-bar__email flex items-center gap-1.5 hover:text-[#22c55e] transition-colors"
          >
            <span className="flex items-center justify-center h-6 w-6 rounded-full bg-[#22c55e]/15 border border-[#22c55e]/30">
              <Mail size={11} className="text-[#22c55e]" />
            </span>
            <span className="hidden sm:inline">{CONTACT.email}</span>
          </motion.a>}
          {CONTACT.location && <span className="hidden md:flex items-center gap-1.5">
            <span className="flex items-center justify-center h-6 w-6 rounded-full bg-[#22c55e]/15 border border-[#22c55e]/30">
              <MapPin size={11} className="text-[#22c55e]" />
            </span>
            {CONTACT.location}
          </span>}
          {!CONTACT.phone && !CONTACT.email && !CONTACT.location && <span className="text-[10px] font-semibold tracking-[.14em] uppercase text-white/55">PowerNex Solutions</span>}
        </div>

        <p className="top-bar__socials hidden min-[344px]:block text-[10px] sm:text-xs font-semibold tracking-[0.12em] uppercase text-white/55">Smart energy · brighter future</p>
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
