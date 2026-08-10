// src/components/Achievements.jsx
import { useState, useRef, useEffect } from "react";
import { motion, animate, useInView } from "motion/react";
import { ClipboardCheck, Sun, Star, Award } from "lucide-react";
import achievementImage from "../assets/solar-acheivement.png";

const stats = [
  {
    icon: ClipboardCheck,
    target: 200,
    suffix: "+",
    label: "Projects Done",
    height: "h-64 md:h-72",
  },
  {
    icon: Sun,
    target: 5,
    suffix: "MW+",
    label: "Installed",
    height: "h-56 md:h-64",
  },
  {
    icon: Star,
    target: 98,
    suffix: "%",
    label: "Satisfaction",
    height: "h-48 md:h-56",
  },
  {
    icon: Award,
    target: 10,
    suffix: "+",
    label: "Years Exp",
    height: "h-44 md:h-48",
  },
];

const headingContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03 } },
};

const headingLetter = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

function AnimatedHeadingLine({ text, className }) {
  return (
    <motion.span
      className={`${className} block`}
      variants={headingContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {text.split("").map((char, i) => (
        <motion.span key={i} variants={headingLetter} className="inline-block">
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Counts 0 -> target once the element scrolls into view, with a delay
// so bars count up one after another instead of all at once.
function Counter({ target, suffix, duration = 0.9, delay = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, target, duration, delay]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Achievements() {
  return (
    <section className="relative w-full overflow-hidden py-24 md:py-32">
      {/* Background image - sharper, no blur */}
      <div className="absolute inset-0">
        <img
          src={achievementImage}
          alt="Solar panel field"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/55 to-slate-950/90" />
      </div>

      <div className="site-container relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-[2px] w-8 bg-[#22c55e]" />
            <span className="text-[#26ca62] text-xs md:text-sm font-bold tracking-[0.25em]">
              OUR ACHIEVEMENTS
            </span>
            <span className="h-[2px] w-8 bg-[#22c55e]" />
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold leading-[1.2]">
            <AnimatedHeadingLine text="Powering Progress" className="text-white" />
            <AnimatedHeadingLine
              text="Delivering Results"
              className="bg-gradient-to-r from-[#16a34a] via-[#22c55e] to-[#4ade80] bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradientMove_3s_ease_infinite]"
            />
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/70 mt-5 text-sm md:text-base max-w-xl mx-auto"
          >
            Numbers that reflect our commitment to quality, trust, and a sustainable future.
          </motion.p>
        </motion.div>

        {/* Bars sitting on a reflective plate */}
        <div className="achievement-bars relative flex items-end justify-center gap-4 md:gap-8 pb-6">
          {/* Platform / plate under the bars */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[92%] md:w-[85%] h-4 md:h-5 rounded-[100%] bg-gradient-to-r from-transparent via-white/25 to-transparent blur-[3px]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-8 rounded-full bg-[#22c55e]/20 blur-2xl" />

          {stats.map((stat, i) => {
            const riseDelay = 0.3 + i * 1.15;
            const countDelay = riseDelay + 0.35;
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{ scaleY: 0, opacity: 0 }}
                whileInView={{ scaleY: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.65,
                  delay: riseDelay,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ transformOrigin: "bottom" }}
                className={`achievement-bar relative z-10 ${stat.height} w-24 md:w-40 flex flex-col items-center justify-start gap-4 pt-7 md:pt-8 px-3 rounded-t-2xl rounded-b-sm overflow-hidden bg-gradient-to-b from-[#16324a] to-[#0a1826] border border-white/10 border-t-2 border-t-[#22c55e]/80 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.6)]`}
              >
                {/* Left highlight edge for glass/3D feel (static, no animation) */}
                <div className="absolute top-0 left-0 h-full w-2 bg-white/10" />
                <div className="absolute top-0 right-0 h-full w-3 bg-black/20" />

                {/* Soft top glow */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 h-16 w-16 bg-[#22c55e]/25 rounded-full blur-2xl pointer-events-none" />

                {/* Icon circle */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: riseDelay + 0.3,
                    ease: "easeOut",
                  }}
                  className="relative h-11 w-11 md:h-14 md:w-14 rounded-full bg-white/5 border-2 border-[#22c55e]/60 flex items-center justify-center shadow-md shadow-green-500/20"
                >
                  <Icon size={20} className="text-[#4ade80] md:w-6 md:h-6" />
                </motion.div>

                {/* Count-up value */}
                <span className="relative text-xl md:text-3xl font-extrabold text-[#4ade80] text-center tabular-nums">
                  <Counter
                    target={stat.target}
                    suffix={stat.suffix}
                    duration={0.9}
                    delay={countDelay}
                  />
                </span>

                {/* Label */}
                <span className="relative text-[10px] md:text-xs text-white/80 font-medium text-center leading-tight">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
