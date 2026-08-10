// src/components/Hero.jsx
import { motion } from "motion/react";
import { Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { BRAND } from "../config/brand";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.045,
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function AnimatedLine({ text, className, startDelay }) {
  return (
    <motion.h1
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
      transition={{ delayChildren: startDelay }}
    >
      {text.split("").map((char, i) => (
        <motion.span key={i} variants={letter} className="inline-block">
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export default function Hero() {
  return (
    <section className="home-hero relative w-full overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="home-hero__video absolute inset-0 z-0 h-full w-full object-cover object-center pointer-events-none"
      >
        <source src="/videos/powernex-hero.mp4" type="video/mp4" />
      </video>

      <div className="home-hero__overlay absolute inset-0 z-[1] pointer-events-none" />

      <div className="home-hero__content site-container relative z-10 flex min-h-[inherit] flex-col items-center justify-center text-center pt-28 pb-24">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hero-kicker flex items-center gap-2 bg-slate-950/45 border border-white/20 px-4 py-1.5 rounded-full mb-6 md:mb-8"
        >
          <span className="h-2 w-2 rounded-full bg-[#22c55e] animate-pulse" />
          <span className="text-xs md:text-sm tracking-widest text-white/90 font-medium">
            PAKISTAN'S TRUSTED SOLAR PARTNER
          </span>
        </motion.div>

        <AnimatedLine
          text="SMART ENERGY."
          startDelay={0.4}
          className="hero-title font-extrabold text-white leading-tight tracking-tight"
        />

        <AnimatedLine
          text="BRIGHTER FUTURE."
          startDelay={1.15}
          className="hero-title hero-title--accent font-extrabold leading-tight tracking-tight bg-gradient-to-r from-[#16a34a] via-[#22c55e] to-[#4ade80] bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradientMove_3s_ease_infinite]"
        />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.0 }}
          className="hero-copy mt-6 md:mt-8 text-white/85 max-w-2xl mx-auto"
        >
          {BRAND.name} delivers premium solar installations, energy
          storage systems, and EV charging solutions for residential and
          commercial clients across Punjab and beyond.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.3 }}
          className="hero-actions mt-8 md:mt-10 flex flex-wrap justify-center gap-3 md:gap-4"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Link to="/get-quote" className="tap-target relative overflow-hidden flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-[#16a34a] to-[#22c55e] shadow-lg shadow-green-500/30">
              <Zap size={18} fill="white" />
              <span>Get Free Quote</span>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full"
          >
            <Link to="/services" className="tap-target flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white border border-white/50 bg-slate-950/25 transition-colors">Explore Services <ArrowRight size={18} /></Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Satisfaction badge - bottom right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.6 }}
        className="hero-satisfaction absolute bottom-8 right-8 z-10 flex items-center gap-3 bg-slate-950/80 border border-[#22c55e]/40 rounded-2xl px-5 py-3 shadow-lg shadow-green-500/20"
      >
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="text-3xl font-extrabold text-[#4ade80]"
        >
          98%
        </motion.span>
        <span className="text-white/90 text-xs md:text-sm leading-tight text-left">
          Client<br />Satisfaction
        </span>
      </motion.div>
    </section>
  );
}
