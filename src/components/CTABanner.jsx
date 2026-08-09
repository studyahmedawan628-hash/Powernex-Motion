// src/components/CTABanner.jsx
import { motion } from "motion/react";

export default function CTABanner() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r from-[#0ea5e9] via-[#135e2e] to-[#0ea5e9] overflow-hidden z-20">
        <motion.div
          className="absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent"
          animate={{ x: ["-100%", "400%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=2400&q=90&fm=jpg&fit=crop&auto=format"
          alt="Solar panels"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/50" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-9 md:py-11 flex flex-col md:flex-row items-center md:items-center justify-between gap-6 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-wide uppercase">
            Ready to Go Solar?
          </h3>
          <p className="text-white/75 text-sm mt-1.5">
            Get a free site assessment and detailed quotation from our
            engineers within 24 hours.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              backgroundColor: "#22c55e",
              borderColor: "#22c55e",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-7 py-3 rounded-lg font-bold text-white text-xs md:text-sm tracking-wider uppercase border-2 border-white/70 transition-colors"
          >
            Get Free Quote
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}