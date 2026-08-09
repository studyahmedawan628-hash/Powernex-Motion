// src/components/EngineeringPhilosophy.jsx
import { motion } from "motion/react";
import { Sun, PanelsTopLeft, BatteryCharging, Home } from "lucide-react";
import EngineeringDiagram from "./EngineeringDiagram";

const steps = [
  { icon: Sun, title: "Sun", desc: "Generate" },
  { icon: PanelsTopLeft, title: "Solar Array", desc: "Capture" },
  { icon: BatteryCharging, title: "Storage", desc: "Preserve" },
  { icon: Home, title: "Home / Business", desc: "Power" },
];

export default function EngineeringPhilosophy() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-24">
      {/* Greenish glow - top left */}
      <motion.div
        animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 -left-24 w-[26rem] h-[26rem] bg-[#22c55e]/20 rounded-full blur-[120px]"
      />
      {/* Greenish glow - bottom right */}
      <motion.div
        animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute -bottom-24 -right-24 w-[26rem] h-[26rem] bg-[#22c55e]/20 rounded-full blur-[120px]"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 md:gap-14 items-center">
        {/* Left - heading + stepper */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[2px] w-8 bg-[#22c55e]" />
              <span className="text-[#16a34a] text-xs md:text-sm font-bold tracking-[0.25em] uppercase">
                Our Engineering Philosophy
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.2] text-[#0f172a] uppercase">
              Smart Energy.
              <br />
              <span className="text-[#22c55e]">Engineered Better.</span>
            </h2>

            <p className="text-slate-600 text-sm md:text-base mt-5 leading-relaxed max-w-md">
              A considered energy system connects every source, storage
              point and destination as one coordinated whole.
            </p>
          </motion.div>

          {/* Stepper - stylish flowing process */}
          <div className="flex items-start mt-14">
            {steps.map((step, i) => (
              <div key={step.title} className="flex items-center flex-1 last:flex-none">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: 0.5 + i * 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative z-10 flex flex-col items-center text-center shrink-0"
                >
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(34,197,94,0)",
                        "0 0 22px rgba(34,197,94,0.4)",
                        "0 0 0px rgba(34,197,94,0)",
                      ],
                    }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3,
                    }}
                    whileHover={{ scale: 1.08 }}
                    className="relative h-16 w-16 md:h-[4.5rem] md:w-[4.5rem] rounded-full p-[2.5px] bg-gradient-to-br from-[#22c55e] to-[#16a34a]"
                  >
                    <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                      <step.icon size={22} className="text-[#16a34a] md:w-6 md:h-6" />
                    </div>
                  </motion.div>
                  <span className="mt-3 text-[11px] md:text-xs font-bold text-[#0f172a] whitespace-nowrap">
                    {step.title}
                  </span>
                  <span className="text-[10px] text-slate-500">{step.desc}</span>
                </motion.div>

                {i < steps.length - 1 && (
                  <div className="relative z-0 flex-1 h-[2px] -ml-8 -mr-8 md:-ml-9 md:-mr-9 mt-8 md:mt-9">
                    <motion.span
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: 0.75 + i * 0.35,
                        ease: "easeOut",
                      }}
                      style={{ transformOrigin: "left" }}
                      className="absolute inset-0 h-[2px] rounded-full bg-gradient-to-r from-[#22c55e] to-[#4ade80]"
                    />
                    <motion.span
                      animate={{ left: ["0%", "100%"] }}
                      transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 1.1 + i * 0.35,
                      }}
                      className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 -translate-x-1/2 rounded-full bg-[#16a34a] shadow-[0_0_10px_rgba(34,197,94,0.85)]"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right - energy flow diagram, slides in right to left */}
        <motion.div
          initial={{ opacity: 0, x: 70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <EngineeringDiagram />
        </motion.div>
      </div>
    </section>
  );
}