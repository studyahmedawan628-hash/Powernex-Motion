// src/components/Services.jsx
import { useState } from "react";
import { motion } from "motion/react";
import { Home, Building2, Wrench, ArrowRight } from "lucide-react";

const services = [
  {
    image:
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=85&auto=format",
    icon: Home,
    label: "Residential Solar",
    description:
      "Custom-designed rooftop solar solutions for homes of all sizes. Maximize self-consumption and eliminate electricity bills.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=85&auto=format",
    icon: Building2,
    label: "Commercial & Industrial",
    description:
      "Large-scale solar plants for factories, offices, warehouses, and commercial buildings. ROI-focused engineering.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=85&auto=format",
    icon: Wrench,
    label: "Installation & Commissioning",
    description:
      "Professional mounting, wiring, inverter setup, and full commissioning by our certified field engineering teams.",
  },
];

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

function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: 0.2 + index * 0.18,
        ease: [0.22, 1, 0.36, 1],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6 }}
      className="relative rounded-2xl overflow-hidden shadow-lg shadow-slate-300/50"
    >
      <div className="relative h-64 md:h-72 w-full overflow-hidden">
        <motion.img
          src={service.image}
          alt={service.label}
          className="h-full w-full object-cover"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Expanding overlay - anchored bottom, grows upward over the image on hover */}
        <motion.div
          initial={false}
          animate={{ height: hovered ? "78%" : 64 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 left-0 w-full bg-slate-950/90 backdrop-blur-sm px-5 pt-4 pb-4 flex flex-col overflow-hidden"
        >
          {/* Heading row - always visible, pinned at the TOP of the overlay */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="flex items-center justify-center h-9 w-9 rounded-full bg-[#22c55e]/20 border border-[#22c55e]/50 shrink-0">
              <Icon size={16} className="text-[#4ade80]" />
            </span>
            <span className="text-white font-bold text-xs md:text-sm tracking-wide uppercase">
              {service.label}
            </span>
          </div>

          {/* Description - revealed below the heading on hover */}
          <motion.p
            initial={false}
            animate={{
              opacity: hovered ? 1 : 0,
              y: hovered ? 0 : 12,
            }}
            transition={{
              duration: 0.35,
              delay: hovered ? 0.15 : 0,
              ease: "easeOut",
            }}
            className="text-white/85 text-xs md:text-sm leading-relaxed mt-3"
          >
            {service.description}
          </motion.p>

          {/* Read more link */}
          <motion.a
            href="#"
            initial={false}
            animate={{
              opacity: hovered ? 1 : 0,
              y: hovered ? 0 : 12,
            }}
            transition={{
              duration: 0.35,
              delay: hovered ? 0.25 : 0,
              ease: "easeOut",
            }}
            className="mt-auto pt-3 flex items-center gap-1.5 text-[#4ade80] text-xs md:text-sm font-bold tracking-wide"
          >
            Read More
            <ArrowRight size={14} />
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section className="relative w-full overflow-hidden bg-slate-50 py-24">
      {/* Moving bluish glowing grid background */}
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
          className="absolute top-10 left-1/4 w-[26rem] h-[26rem] bg-blue-400/25 rounded-full blur-[110px]"
        />
        <motion.div
          animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.15, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-10 right-1/4 w-[26rem] h-[26rem] bg-[#22c55e]/20 rounded-full blur-[110px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,#f8fafc_92%)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-[2px] w-8 bg-[#22c55e]" />
            <span className="text-[#16a34a] text-xs md:text-sm font-bold tracking-[0.25em]">
              OUR SERVICES
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold leading-[1.2] text-[#0f172a]">
            <AnimatedHeadingLine text="COMPREHENSIVE " startDelay={0.1} />
            <AnimatedHeadingLine
              text="SOLAR SOLUTIONS"
              startDelay={0.75}
              className="text-[#16a34a]"
            />
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="text-slate-500 mt-5 text-sm md:text-base"
          >
            From residential to industrial, we've got you covered.
          </motion.p>
        </motion.div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
          {services.map((service, i) => (
            <ServiceCard key={service.label} service={service} index={i} />
          ))}
        </div>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex justify-center mt-14"
        >
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden flex items-center gap-2 px-9 py-4 rounded-full font-bold text-white text-sm md:text-base bg-gradient-to-r from-[#16a34a] to-[#22c55e] shadow-xl shadow-green-500/40"
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
            <span className="relative z-10 tracking-wide uppercase">
              Explore More Services
            </span>
            <ArrowRight size={18} className="relative z-10" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}