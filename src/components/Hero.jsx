// src/components/Hero.jsx
import { motion } from "motion/react";
import { Zap, ArrowRight } from "lucide-react";

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
    <section className="relative h-screen w-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 h-full w-full object-cover"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6 pt-24">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-4 py-1.5 rounded-full mb-8"
        >
          <span className="h-2 w-2 rounded-full bg-[#22c55e] animate-pulse" />
          <span className="text-xs md:text-sm tracking-widest text-white/90 font-medium">
            PAKISTAN'S TRUSTED SOLAR PARTNER
          </span>
        </motion.div>

        <AnimatedLine
          text="SMART ENERGY."
          startDelay={0.4}
          className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight"
        />

        <AnimatedLine
          text="BRIGHTER FUTURE."
          startDelay={1.15}
          className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-[#16a34a] via-[#22c55e] to-[#4ade80] bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradientMove_3s_ease_infinite]"
        />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.0 }}
          className="mt-8 text-lg md:text-xl text-white/85 max-w-2xl mx-auto"
        >
          PowerNex Pakistan delivers premium solar installations, energy
          storage systems, and EV charging solutions for residential and
          commercial clients across Punjab and beyond.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.3 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-[#16a34a] to-[#22c55e] shadow-lg shadow-green-500/30"
          >
            <motion.span
              className="absolute inset-0 bg-white/25 skew-x-[-20deg]"
              initial={{ x: "-150%" }}
              animate={{ x: "250%" }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                repeatDelay: 1.5,
                ease: "easeInOut",
              }}
            />
            <Zap size={18} className="relative z-10" fill="white" />
            <span className="relative z-10">Get Free Quote</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white border border-white/40 backdrop-blur-md transition-colors"
          >
            Explore Services
            <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </div>

      {/* Satisfaction badge - bottom right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.6 }}
        className="absolute bottom-8 right-8 z-10 flex items-center gap-3 bg-slate-950/70 backdrop-blur-md border border-[#22c55e]/40 rounded-2xl px-5 py-3 shadow-lg shadow-green-500/20"
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