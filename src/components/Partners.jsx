// src/components/Partners.jsx
import { motion } from "motion/react";
import { BRAND } from "../config/brand";
import partnersBackground from "../assets/slide-6.jpg";

const partners = [
  "Partner 1",
  "Partner 2",
  "Partner 3",
  "Partner 4",
  "Partner 5",
  "Partner 6",
];

// Duplicate the list so the marquee loops seamlessly
const marqueeItems = [...partners, ...partners];

export default function Partners() {
  return (
    <section className="relative w-full overflow-hidden py-20">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={partnersBackground}
          alt="Solar panel field"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/60 to-slate-950/85" />
      </div>

      {/* Top gradient line - green/blue mix */}
      <div className="absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r from-[#0ea5e9] via-[#22c55e] to-[#0ea5e9] overflow-hidden">
        <motion.div
          className="absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent"
          animate={{ x: ["-100%", "400%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Bottom gradient line - green/blue mix */}
      <div className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-[#0ea5e9] via-[#22c55e] to-[#0ea5e9] overflow-hidden">
        <motion.div
          className="absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent"
          animate={{ x: ["400%", "-100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center mb-5">
            {/* Pill - rounded on left only, straight/flat on right so "Partners" sits flush against it */}
            <span className="pl-5 pr-4 py-1.5 rounded-l-full font-bold text-sm text-white bg-gradient-to-r from-[#16a34a] to-[#22c55e] shadow-md shadow-green-500/30">
              {BRAND.name}
            </span>
            <span className="pl-3 pr-4 py-1.5 text-[#4ade80] font-bold text-sm tracking-wide">
              Partners
            </span>
          </div>

          {/* Plain white text, no black outline */}
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-white tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
            Our Trusted Partners
          </h2>
        </motion.div>
      </div>

      {/* Infinite auto-sliding logo marquee */}
      <div className="relative z-10 w-full overflow-hidden">
        {/* Edge fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-slate-950 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-slate-950 to-transparent z-10" />

        <motion.div
          className="flex items-center gap-5 md:gap-7 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {marqueeItems.map((name, i) => (
            <div
              key={i}
              className="flex items-center justify-center h-16 md:h-20 w-40 md:w-48 rounded-xl bg-white/10 backdrop-blur-xl border border-white/25 shrink-0 shadow-md shadow-black/20 hover:border-[#22c55e]/60 hover:scale-105 transition-all duration-300"
            >
              {/* Placeholder text — replace with <img src="..." className="h-8 md:h-10 object-contain" /> when real logos are ready */}
              <span className="text-white font-bold text-sm md:text-base px-3 text-center">
                {name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
