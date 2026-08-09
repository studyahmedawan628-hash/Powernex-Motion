// src/components/AboutIntro.jsx
import { motion } from "motion/react";
import { ShieldCheck, Link2, FileText, Leaf, Zap, Globe } from "lucide-react";

const highlights = [
  {
    icon: ShieldCheck,
    title: "Certified Experts",
    desc: "Experienced & certified solar professionals",
  },
  {
    icon: Link2,
    title: "End-to-End Solutions",
    desc: "Complete solar solutions from start to finish",
  },
  {
    icon: FileText,
    title: "Transparent Pricing",
    desc: "Clear, honest & competitive pricing",
  },
  {
    icon: Leaf,
    title: "Green Commitment",
    desc: "Committed to a cleaner, greener Pakistan",
  },
];

export default function AboutIntro() {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="relative grid md:grid-cols-2 min-h-[760px] md:min-h-[840px]">
        {/* ============ LEFT SIDE ============ */}
        <div className="relative z-10 flex flex-col justify-center px-6 sm:px-10 md:px-12 lg:px-16 py-16 order-2 md:order-1">
          {/* Dot pattern - top left */}
          <div
            className="absolute top-6 left-6 w-24 h-24 opacity-50 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(#94a3b8 1.4px, transparent 1.4px)",
              backgroundSize: "11px 11px",
            }}
          />
          {/* Dot pattern - bottom left */}
          <div
            className="absolute bottom-6 left-6 w-20 h-20 opacity-50 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(#94a3b8 1.4px, transparent 1.4px)",
              backgroundSize: "11px 11px",
            }}
          />
          {/* Subtle grey diagonal shape - top left corner */}
          <div className="absolute -top-16 -left-20 w-64 h-64 bg-slate-100 rotate-45 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="h-[2px] w-10 bg-[#16a34a]" />
              <span className="text-[#0f172a] text-sm md:text-base font-bold tracking-[0.2em] uppercase">
                About Powernex
              </span>
              <span className="px-3.5 py-1 rounded-full bg-[#16a34a] text-white text-xs font-bold">
                Since 2018
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-[3.2rem] lg:text-[3.4rem] font-extrabold uppercase leading-[1.08] text-[#0f172a] tracking-tight">
              Powering Pakistan's
              <br />
              <span className="text-[#16a34a]">Clean Energy</span>
              <br />
              Revolution
            </h2>

            <span className="block h-[3px] w-14 bg-[#16a34a] mt-6 mb-6" />

            <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-md">
              PowerNex Pakistan is a leading solar energy company
              headquartered in Lahore. We specialize in designing,
              supplying, installing, and commissioning solar power systems
              for homes, commercial buildings, and industrial facilities
              across Pakistan.
            </p>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-md mt-4">
              From consultation to commissioning, our certified engineers
              ensure every project delivers maximum performance,
              reliability, and return on investment — backed by
              comprehensive after-sales support.
            </p>

            {/* Feature bars */}
            <div className="mt-8 flex flex-col gap-2.5 max-w-lg">
              {highlights.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.15 + i * 0.1, ease: "easeOut" }}
                  whileHover={{ x: 4 }}
                  className="relative flex items-stretch rounded-r-2xl overflow-hidden shadow-md shadow-slate-300/40"
                >
                  <div className="flex items-center justify-center w-14 shrink-0 bg-[#16a34a]">
                    <Icon size={20} className="text-white" />
                  </div>
                  <div className="flex-1 flex items-center gap-4 bg-[#101a2b] pl-5 pr-6 py-3.5">
                    <span className="text-white font-bold text-sm md:text-[15px] w-28 md:w-32 shrink-0 leading-snug">
                      {title}
                    </span>
                    <span className="w-px h-8 bg-white/20 shrink-0" />
                    <span className="text-white/65 text-xs md:text-sm leading-snug">
                      {desc}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ============ RIGHT SIDE - dark diagonal panel ============ */}
        <div className="relative overflow-hidden bg-[#0a1220] order-1 md:order-2 min-h-[380px] md:min-h-full flex items-center justify-center">
          {/* Diagonal green stripe bands */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -left-32 -top-20 w-[70%] h-[55%] bg-[#16a34a] rotate-45 origin-top-left" />
            <div className="absolute -right-24 -bottom-24 w-[65%] h-[50%] bg-[#16a34a] rotate-45 origin-bottom-right opacity-95" />
            <div className="absolute -right-10 -bottom-10 w-[45%] h-[35%] bg-[#0a1220] rotate-45 origin-bottom-right" />
          </div>

          {/* Dot pattern - top right */}
          <div
            className="absolute top-8 right-8 w-28 h-28 opacity-40 pointer-events-none z-10"
            style={{
              backgroundImage:
                "radial-gradient(#22c55e 1.4px, transparent 1.4px)",
              backgroundSize: "13px 13px",
            }}
          />

          {/* Rotated photo card - diamond style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: 8 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 18 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-[62%] max-w-[420px] aspect-square"
          >
            <div className="w-full h-full bg-white p-2 md:p-2.5 rounded-md shadow-2xl shadow-black/50">
              <img
                src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1000&q=85&auto=format"
                alt="Solar panels at sunset"
                className="w-full h-full object-cover rounded-sm"
              />
            </div>
          </motion.div>

          {/* Logo badge - bottom right */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute bottom-8 right-6 md:right-10 z-10 text-right"
          >
            <div className="flex items-center justify-end gap-2.5">
              <div className="leading-tight">
                <p className="text-white font-extrabold text-sm tracking-wide">
                  POWERNEX
                </p>
                <p className="text-white/55 text-[9px] tracking-wide">
                  ENERGIZING A BETTER TOMORROW
                </p>
              </div>
              <span className="h-9 w-9 rounded-lg bg-[#16a34a] flex items-center justify-center shrink-0">
                <Zap size={17} className="text-white" fill="white" />
              </span>
            </div>
            <div className="flex items-center justify-end gap-1.5 text-white/45 text-[10px] mt-2">
              www.powernexpakistan.com
              <Globe size={10} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
