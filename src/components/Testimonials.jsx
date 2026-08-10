// src/components/Testimonials.jsx
import { motion } from "motion/react";
import { Star, Building2, ShieldCheck, Trophy, Zap } from "lucide-react";
import { BRAND } from "../config/brand";

const testimonials = [
  {
    name: "Hina Tariq",
    location: "Multan",
    rating: "4.9",
    avatar: "https://i.pravatar.cc/150?img=32",
    quote:
      `I was hesitant at first but ${BRAND.name} made the whole process seamless. Their team is knowledgeable and the installation is top-notch.`,
  },
  {
    name: "Ali Hassan",
    location: "Lahore",
    rating: "4.9",
    avatar: "https://i.pravatar.cc/150?img=12",
    quote:
      "Very professional team of engineers and civil work. One-stop solution for your solar needs. I really appreciate their after-sale service.",
  },
  {
    name: "Fatima Khan",
    location: "Islamabad",
    rating: "4.9",
    avatar: "https://i.pravatar.cc/150?img=45",
    quote:
      `${BRAND.name} transformed our home with a solar solution. The installation was quick and very professional throughout the process.`,
  },
  {
    name: "Bilal Ahmed",
    location: "Karachi",
    rating: "5.0",
    avatar: "https://i.pravatar.cc/150?img=15",
    quote:
      "From site survey to commissioning, everything was on schedule. Great communication and fair pricing throughout the project.",
  },
  {
    name: "Ayesha Noor",
    location: "Faisalabad",
    rating: "4.8",
    avatar: "https://i.pravatar.cc/150?img=47",
    quote:
      "Our electricity bills dropped drastically within the first month. The monitoring app makes it so easy to track savings.",
  },
];

const marqueeCards = [...testimonials, ...testimonials];

const badges = [
  { icon: Building2, text: "200+ Projects" },
  { icon: ShieldCheck, text: "Certified Team" },
  { icon: Trophy, text: "98% Satisfaction" },
  { icon: Zap, text: "10+ Years" },
  { icon: Star, text: "4.9 / 5" },
];
const marqueeBadges = [...badges, ...badges, ...badges];

const headingContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035 } },
};

const headingLetter = {
  hidden: { opacity: 0, y: -28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

function AnimatedHeadingLine({ text, className, startDelay = 0 }) {
  return (
    <motion.span
      className={`${className} inline-block`}
      variants={headingContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delayChildren: startDelay }}
    >
      {text.split("").map((char, i) => (
        <motion.span key={i} variants={headingLetter} className="inline-block">
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

function Stars() {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#eefbf1] via-[#f3fbf5] to-[#eefbf1] py-24">
      <div className="site-container relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-[#1f492e] text-[#ffffff] text-xs font-bold tracking-[0.2em] mb-6">
            REAL STORIES • REAL SATISFACTION
          </span>

          <h2 className="text-3xl md:text-4.5xl font-extrabold leading-[1.2] text-[#0f172a]">
            <AnimatedHeadingLine text="WHAT OUR HAPPY " startDelay={0.1} />
            <AnimatedHeadingLine text="CUSTOMERS SAY" startDelay={0.85} />
          </h2>
        </motion.div>
      </div>

      {/* Testimonial cards - continuous right-to-left marquee */}
      <div className="relative z-10 w-full overflow-hidden py-2">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#eefbf1] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#eefbf1] to-transparent z-10" />

        <motion.div
          className="flex items-stretch gap-5 md:gap-6 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {marqueeCards.map((t, i) => (
            <div
              key={i}
              className="relative w-72 md:w-80 shrink-0 rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg shadow-green-900/5 px-6 pt-6 pb-6 overflow-hidden"
            >
              {/* Green top accent line with corner glow */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#16a34a] via-[#22c55e] to-[#4ade80]" />
              <div className="absolute -top-3 -right-3 h-14 w-14 bg-[#22c55e]/25 rounded-full blur-xl" />

              {/* Avatar + name on the left, stars on the right - same row */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-11 w-11 rounded-full object-cover border-2 border-[#22c55e]/50"
                  />
                  <div>
                    <p className="text-sm font-bold text-[#0f172a]">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.location}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-0.5">
                  <Stars />
                  <span className="text-[11px] font-semibold text-slate-500">
                    {t.rating} / 5
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                "{t.quote}"
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* CTA row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative z-10 flex flex-wrap items-center justify-center gap-4 mt-14 px-6"
      >
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="tap-target responsive-cta relative overflow-hidden px-8 py-3.5 rounded-full font-bold text-white text-sm md:text-base bg-gradient-to-r from-[#16a34a] to-[#22c55e] shadow-xl shadow-green-500/40"
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
          <span className="relative z-10">Give Feedback</span>
        </motion.button>

        <div className="flex items-center gap-3 bg-white border border-green-200 rounded-full pl-2 pr-5 py-1.5 shadow-md shadow-green-900/5">
          <div className="flex items-center -space-x-3">
            {[8, 22, 5].map((imgId) => (
              <img
                key={imgId}
                src={`https://i.pravatar.cc/150?img=${imgId}`}
                alt="Customer"
                className="h-8 w-8 rounded-full object-cover border-2 border-white"
              />
            ))}
            <span className="h-8 w-8 rounded-full bg-[#22c55e] border-2 border-white flex items-center justify-center text-[10px] font-bold text-white">
              200
            </span>
          </div>
          <span className="text-sm font-semibold text-[#0f172a]">
            Join 200+ happy customers
          </span>
        </div>
      </motion.div>

      {/* Bottom stat pill marquee - right to left, same direction as top row */}
      <div className="relative z-10 w-full overflow-hidden mt-14">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#eefbf1] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#eefbf1] to-transparent z-10" />

        <motion.div
          className="flex items-center gap-3 md:gap-4 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        >
          {marqueeBadges.map((b, i) => {
            const Icon = b.icon;
            return (
              <span
                key={i}
                className="flex items-center gap-1.5 shrink-0 px-4 py-2 rounded-full bg-[#dcfce7]/70 border border-[#22c55e]/40 text-[#166534] text-xs md:text-sm font-semibold whitespace-nowrap"
              >
                <Icon size={13} className="text-[#16a34a]" />
                {b.text}
              </span>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
