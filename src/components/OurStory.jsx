// src/components/OurStory.jsx
import { motion } from "motion/react";
import { Lightbulb, TrendingUp, Users, Rocket, ChevronDown } from "lucide-react";

const storyItems = [
  {
    number: "01",
    icon: Lightbulb,
    title: "The Beginning",
    desc: "Started with a vision to make reliable and sustainable solar energy more accessible.",
  },
  {
    number: "02",
    icon: TrendingUp,
    title: "Growing Expertise",
    desc: "Expanded our capabilities across solar design, installation, and energy solutions.",
  },
  {
    number: "03",
    icon: Users,
    title: "Building Impact",
    desc: "Delivered solar solutions designed to help homes and businesses reduce energy costs and improve energy independence.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "The Future",
    desc: "Continuing to innovate and build smarter, cleaner, more sustainable energy solutions.",
  },
];

const headingContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03 } },
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

export default function OurStory() {
  return (
    <section className="relative w-full overflow-hidden bg-slate-50 py-24">
      {/* Moving bluish grid background - same pattern as other sections */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(59,130,246,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.25) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
          animate={{ backgroundPosition: ["0px 0px", "44px 44px"] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.15, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-1/4 w-[26rem] h-[26rem] bg-blue-400/20 rounded-full blur-[110px]"
        />
        <motion.div
          animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.15, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-10 right-1/4 w-[26rem] h-[26rem] bg-[#14532d]/15 rounded-full blur-[110px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,#f8fafc_92%)]" />
      </div>

      <div className="site-container content-narrow relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 md:mb-24"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-[2px] w-8 bg-[#22c55e]" />
            <span className="text-[#16a34a] text-xs md:text-sm font-bold tracking-[0.25em]">
              OUR STORY
            </span>
            <span className="h-[2px] w-8 bg-[#22c55e]" />
          </div>

          <h2 className="text-3xl md:text-4.5xl font-extrabold leading-[1.25] uppercase">
  <AnimatedHeadingLine
    text="From Vision to a Brighter Future"
    startDelay={0.1}
    className="text-[#061633]"
  />
</h2>
        </motion.div>

        {/* Vertical timeline */}
        <div className="relative">
          {/* Center line - dark green gradient with a soft glow, grows downward */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top" }}
            className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 w-[3px] rounded-full bg-gradient-to-b from-[#14532d] via-[#16a34a] to-[#22c55e] shadow-[0_0_10px_rgba(20,83,45,0.5)]"
          />

          <div className="space-y-14 md:space-y-6">
            {storyItems.map((item, i) => {
              const Icon = item.icon;
              const isEven = i % 2 === 0;

              return (
                <div key={item.number}>
                  <div className="relative flex md:items-center gap-6 md:gap-10">
                    {/* Marker - glassy dark-green orb */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.15 + i * 0.3,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 h-6 w-6 rounded-full bg-gradient-to-br from-[#22c55e] to-[#14532d] p-[2px] shadow-[0_0_16px_rgba(20,83,45,0.7)]"
                    >
                      <div className="h-full w-full rounded-full bg-white/90 backdrop-blur-sm" />
                    </motion.div>

                    {/* Card */}
                    <div
                      className={`w-full pl-16 md:pl-0 flex ${
                        isEven ? "md:justify-end" : "md:justify-start md:order-2"
                      }`}
                    >
                      <motion.div
                        initial={{ opacity: 0, x: isEven ? -24 : 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        whileHover={{ y: -4 }}
                        transition={{
                          duration: 0.6,
                          delay: 0.25 + i * 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`relative w-full md:w-[calc(100%-2.5rem)] text-left bg-white rounded-2xl shadow-lg shadow-slate-300/50 border border-[#22c55e]/15 p-6 overflow-hidden ${
                          isEven ? "md:mr-10" : "md:ml-10"
                        }`}
                      >
                        {/* Top accent line */}
                        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#14532d] via-[#22c55e] to-[#4ade80]" />
                        {/* Corner glow */}
                        <div className="absolute -top-4 -right-4 h-20 w-20 bg-[#22c55e]/15 rounded-full blur-2xl pointer-events-none" />

                        <div className="relative flex items-center gap-3 mb-3">
                          <span className="flex items-center justify-center h-11 w-11 rounded-xl bg-gradient-to-br from-[#16a34a] to-[#14532d] shrink-0 shadow-md shadow-green-900/30">
                            <Icon size={19} className="text-white" />
                          </span>
                          <span className="text-2xl font-extrabold text-[#22c55e]/70">
                            {item.number}
                          </span>
                        </div>
                        <h3 className="relative text-base md:text-lg font-bold text-[#0f172a] mb-1.5 text-left">
                          {item.title}
                        </h3>
                        <p className="relative text-sm text-slate-500 leading-relaxed text-left">
                          {item.desc}
                        </p>
                      </motion.div>
                    </div>

                    <div className="hidden md:block w-full" />
                  </div>

                  {/* Down arrow - glassy dark-green circular button, between markers */}
                  {i < storyItems.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.55 + i * 0.3,
                        ease: "easeOut",
                      }}
                      className="relative z-10 flex justify-center my-1"
                    >
                      <motion.span
                        animate={{
                          boxShadow: [
                            "0 0 0px rgba(20,83,45,0)",
                            "0 0 16px rgba(20,83,45,0.55)",
                            "0 0 0px rgba(20,83,45,0)",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-br from-[#16a34a] to-[#14532d] border border-white/30 backdrop-blur-sm"
                      >
                        <motion.span
                          animate={{ y: [0, 3, 0] }}
                          transition={{
                            duration: 1.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <ChevronDown size={15} className="text-white" />
                        </motion.span>
                      </motion.span>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
