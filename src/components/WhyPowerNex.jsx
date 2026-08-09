import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const reasons = [
  {
    title: "CERTIFIED TEAM",
    desc: "Licensed engineers only",
    img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=200&q=80",
  },
  {
    title: "25-YR WARRANTY",
    desc: "Long-term protection",
    img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=200&q=80",
  },
  {
    title: "PREMIUM GEAR",
    desc: "Tier-1 equipment",
    img: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=200&q=80",
  },
  {
    title: "FAIR PRICING",
    desc: "No hidden costs",
    img: "https://images.unsplash.com/photo-1509233725247-49e657c54213?w=200&q=80",
  },
  {
    title: "24/7 SUPPORT",
    desc: "Always reachable",
    img: "https://images.unsplash.com/photo-1494548162494-384bba4ab999?w=200&q=80",
  },
];

// Har box/arrow ka apna start time — heading ke baad, aur ek doosre se saaf gap ke sath
const HEADING_DURATION = 0.7;
const CARD_STEP = 0.5; // har card/arrow pair ke beech gap

export default function WhyPowerNex() {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-white to-slate-50 w-full overflow-hidden py-24">
      {/* Corner glow effects */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#22c55e]/25 rounded-full blur-[110px]" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#22c55e]/20 rounded-full blur-[110px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: HEADING_DURATION, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-[2px] w-8 bg-[#22c55e]" />
            <span className="text-[#16a34a] text-sm font-bold tracking-[0.2em]">
              WHY POWERNEX
            </span>
            <span className="h-[2px] w-8 bg-[#22c55e]" />
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4.5xl font-extrabold text-[#0f172a] leading-[1.2] whitespace-nowrap">
            POWERED BY TRUST,{" "}
            <span className="text-[#22c55e]">BACKED BY</span>
            <br />
            <span className="text-[#22c55e]">RESULTS</span>
          </h2>

          <p className="text-slate-500 mt-5 text-sm md:text-base whitespace-nowrap">
            Five reasons homes and businesses across Pakistan choose PowerNex, every single time.
          </p>
        </motion.div>

        {/* Cards with arrow connectors */}
        <div className="flex items-stretch justify-center gap-3 md:gap-4">
          {reasons.map((item, i) => {
            const cardDelay = HEADING_DURATION + 0.3 + i * CARD_STEP;
            const arrowDelay = cardDelay + CARD_STEP * 0.6;

            return (
              <div key={i} className="flex items-center gap-3 md:gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: cardDelay, ease: "easeOut" }}
                  whileHover={{ y: -6, boxShadow: "0 0 25px rgba(34,197,94,0.35)" }}
                  className="relative w-36 md:w-40 bg-white border-t-4 border-[#29854b] rounded-b-2xl rounded-t-md px-4 pt-7 pb-6 flex flex-col items-center text-center shadow-sm overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-12 h-12 bg-[#22c55e]/20 rounded-bl-full blur-md" />

                  {/* Glassy shine sweep - sequential */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.7) 48%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.7) 52%, transparent 70%)",
                    }}
                    initial={{ x: "-150%" }}
                    animate={{ x: "150%" }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      repeatDelay: reasons.length * 0.8,
                      delay: cardDelay + 0.5 + i * 0.8,
                      ease: "easeInOut",
                    }}
                  />

                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="relative h-16 w-16 rounded-full border-[3px] border-dashed border-[#14532d] p-1.5 mb-4"
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </motion.div>

                  <h3 className="relative text-xs font-extrabold text-[#0f172a] tracking-wide mb-1">
                    {item.title}
                  </h3>
                  <p className="relative text-[11px] text-slate-500">{item.desc}</p>
                </motion.div>

                {i < reasons.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: arrowDelay, ease: "easeOut" }}
                    className="hidden md:flex shrink-0"
                  >
                    <motion.div
                      animate={{ opacity: [1, 0.35, 1] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                      className="h-7 w-7 rounded-full bg-[#29854b] flex items-center justify-center shadow-md shadow-green-500/40"
                    >
                      <ArrowRight size={14} className="text-white" />
                    </motion.div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}