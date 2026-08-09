// src/components/FeedbackSection.jsx
import { useState, useRef, useEffect } from "react";
import { motion, animate, useInView } from "motion/react";
import { Star } from "lucide-react";

// Counts 0 -> target once the element scrolls into view
function Counter({ target, suffix = "", duration = 1.4, delay = 0 }) {
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

function StarRating() {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);

  return (
    <div>
      <div className="flex items-center gap-1.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="transition-transform hover:scale-110"
          >
            <Star
              size={26}
              className={
                star <= (hovered || rating)
                  ? "fill-amber-400 text-amber-400"
                  : "text-slate-300"
              }
            />
          </button>
        ))}
      </div>
      <p className="text-xs text-slate-400 mt-1.5">
        {rating > 0 ? `You rated ${rating} / 5` : "Select a rating"}
      </p>
    </div>
  );
}

export default function FeedbackSection() {
  return (
    <section className="relative w-full overflow-hidden bg-slate-50 py-24">
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-14 md:gap-10 items-center">
          {/* Left - overlapping stat circles */}
          <div className="relative h-[420px] md:h-[500px] flex items-center justify-center md:justify-start">
            {/* Big circle - 10k+ Happy Customers */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-0 left-1/2 md:left-4 -translate-x-1/2 md:translate-x-0 h-[340px] w-[340px] md:h-[380px] md:w-[380px] rounded-full bg-gradient-to-br from-white to-[#eefbf1] shadow-xl shadow-green-900/5 border border-green-100 flex flex-col items-center justify-center text-center px-10"
            >
              <span className="text-4xl md:text-5xl font-extrabold text-[#16a34a]">
                <Counter target={10} suffix="k+" duration={1.3} delay={0.3} />
              </span>
              <span className="mt-2 text-sm md:text-base font-bold text-[#0f172a] tracking-wide">
                HAPPY CUSTOMERS
              </span>
              <p className="mt-3 text-xs md:text-sm text-slate-500 leading-relaxed max-w-[220px]">
                Trust our reliable solar installations and great service for
                long term savings.
              </p>
            </motion.div>

            {/* Small circle - 200+ Solar Solution */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.8,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute top-0 right-1/2 md:right-4 translate-x-1/2 md:translate-x-0 h-[220px] w-[220px] md:h-[250px] md:w-[250px] rounded-full bg-gradient-to-br from-white to-[#eefbf1] shadow-xl shadow-green-900/5 border border-green-100 flex flex-col items-center justify-center text-center px-6"
            >
              <span className="text-2xl md:text-3xl font-extrabold text-[#16a34a]">
                <Counter target={200} suffix="+" duration={1.1} delay={0.9} />
              </span>
              <span className="mt-1.5 text-xs md:text-sm font-bold text-[#0f172a] tracking-wide">
                SOLAR SOLUTION
              </span>
              <p className="mt-2 text-[11px] md:text-xs text-slate-500 leading-relaxed max-w-[170px]">
                We've installed solar systems for many clients, solving their
                energy challenges efficiently.
              </p>
            </motion.div>
          </div>

          {/* Right - feedback form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-3xl shadow-xl shadow-slate-300/40 border border-slate-100 p-8 md:p-10"
          >
            <h3 className="text-xl md:text-2xl font-extrabold text-[#0f172a]">
              WE VALUE YOUR FEEDBACK
            </h3>
            <p className="text-sm text-slate-500 mt-2 mb-7">
              Your experience helps us serve you better — share it with us.
            </p>

            <form className="space-y-5">
              <div>
                <label className="block text-xs font-bold tracking-wide text-slate-600 mb-2">
                  FULL NAME
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold tracking-wide text-slate-600 mb-2">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold tracking-wide text-slate-600 mb-2">
                  RATE YOUR EXPERIENCE
                </label>
                <StarRating />
              </div>

              <div>
                <label className="block text-xs font-bold tracking-wide text-slate-600 mb-2">
                  YOUR FEEDBACK
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your experience with PowerNex..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/20 transition-all resize-none"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className="relative overflow-hidden px-7 py-3 rounded-xl font-bold text-white text-sm bg-gradient-to-r from-[#16a34a] to-[#22c55e] shadow-lg shadow-green-500/30"
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
                <span className="relative z-10">Submit Feedback</span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}