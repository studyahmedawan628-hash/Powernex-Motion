import { motion } from "motion/react";
import { BRAND } from "../config/brand";
import trustImage from "../assets/solar-panel-field.jpg";

const letterContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.025 } },
};

const letterVariant = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

function AnimatedLine({ text, className }) {
  return (
    <motion.span
      className={`${className} block`}
      variants={letterContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      {text.split("").map((char, i) => (
        <motion.span key={i} variants={letterVariant} className="inline-block">
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function TrustSection() {
  return (
    <section className="trust-section relative bg-gradient-to-br from-slate-50 via-blue-50/50 to-slate-50 w-full overflow-hidden py-24 flex items-center">
      {/* Enhanced glowing grid background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(59,130,246,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.35) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          animate={{ backgroundPosition: ["0px 0px", "48px 48px"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute top-0 left-1/4 w-[28rem] h-[28rem] bg-blue-400/25 rounded-full blur-[110px]" />
        <div className="absolute bottom-0 right-1/4 w-[28rem] h-[28rem] bg-[#22c55e]/25 rounded-full blur-[110px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,white_92%)]" />
      </div>

      <div className="site-container relative z-10 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Left - text */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-5"
          >
            <span className="h-[2px] w-10 bg-gradient-to-r from-[#22c55e] to-transparent" />
            <span className="text-[#16a34a] text-sm font-bold tracking-[0.2em]">
              SMART ENERGY
            </span>
          </motion.div>

          <h2 className="text-2xl md:text-4xl font-extrabold leading-[1.2] mb-6 text-[#253252]">
            <AnimatedLine text="PAKISTAN'S TRUSTED" />
            <AnimatedLine text="SOLAR PARTNER" />
          </h2>

          <motion.p
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-slate-600 text-base leading-relaxed mb-8 max-w-prose"
          >
            {BRAND.name} delivers premium solar installations, energy
            storage systems, and EV charging solutions for residential and
            commercial clients across Punjab and beyond.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="tap-target relative overflow-hidden px-7 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-[#16a34a] to-[#22c55e] shadow-lg shadow-green-500/40"
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
              <span className="relative z-10">Learn More About Us</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Right - image */}
        <motion.div
          initial={{ opacity: 0, x: 120 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-md mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden border-2 border-[#22c55e]/40 shadow-2xl shadow-blue-500/20">
            <img
              src={trustImage}
              alt="Solar panel field at sunset"
              className="trust-image w-full object-cover object-center"
            />
          </div>

          {/* Badge - moved further left/inward */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute bottom-6 left-2 md:-left-6 flex items-center gap-3 bg-slate-950/60 backdrop-blur-md border border-[#22c55e]/40 rounded-2xl px-5 py-3 shadow-lg shadow-green-500/20"
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="text-2xl md:text-3xl font-extrabold text-[#46bb71]"
            >
              10+
            </motion.span>
            <span className="text-white/90 text-xs md:text-sm leading-tight text-left">
              Years<br />Experience
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
