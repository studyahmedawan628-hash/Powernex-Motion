// src/components/AboutHero.jsx
import { motion } from "motion/react";
import { BRAND } from "../config/brand";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03 } },
};

const letter = {
  hidden: { opacity: 0, y: 25, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

function AnimatedLine({ text, className, startDelay = 0 }) {
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

export default function AboutHero() {
  return (
    <section className="about-hero relative w-full overflow-hidden">
      {/* Original About hero video - solar panel installation footage */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 z-0 h-full w-full object-cover object-center pointer-events-none"
      >
        <source src="https://videos.pexels.com/video-files/8370212/8370212-hd_1920_1080_30fps.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for readability, matching site tone */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/70 to-slate-950/90" />

      {/* Content - top padding leaves space for fixed TopBar + Header */}
      <div className="site-container relative z-10 flex min-h-[inherit] flex-col items-center justify-center text-center pt-28 pb-16 md:pt-32">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[#38bdf8] text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-5"
        >
          About {BRAND.name}
        </motion.span>

        <AnimatedLine
          text="ENGINEERING PAKISTAN'S"
          startDelay={0.35}
          className="about-hero__title font-extrabold uppercase leading-[1.15] tracking-tight text-slate-300"
        />
        <AnimatedLine
          text="SOLAR FUTURE"
          startDelay={1.05}
          className="about-hero__title font-extrabold uppercase leading-[1.15] tracking-tight text-slate-300"
        />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.7 }}
          className="mt-6 text-sm md:text-base text-white/75 max-w-3xl mx-auto leading-relaxed"
        >
          From rooftop to rooftop, we're turning sunlight into savings — meet the team powering a cleaner tomorrow.
        </motion.p>
      </div>

      {/* Bottom gradient line - same style used across the site */}
      <div className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-[#0ea5e9] via-[#22c55e] to-[#0ea5e9] overflow-hidden z-20">
        <motion.div
          className="absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent"
          animate={{ x: ["-100%", "400%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </section>
  );
}
