// src/components/HowWeWork.jsx
import { motion } from "motion/react";

const steps = [
    {
        title: "Consultation",
        desc: "Free site visit and energy audit to understand your needs and electricity bills.",
        img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=200&q=80",
    },
    {
        title: "System Design",
        desc: "Our engineers design the optimal system layout, size, and equipment selection.",
        img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=200&q=80",
    },
    {
        title: "Quotation",
        desc: "Detailed transparent quotation with ROI calculations and payment terms.",
        img: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=200&q=80",
    },
    {
        title: "Installation",
        desc: "Professional installation by our certified teams within agreed timelines.",
        img: "https://images.unsplash.com/photo-1509233725247-49e657c54213?w=200&q=80",
    },
    {
        title: "Handover & Support",
        desc: "Full commissioning, net metering support, and ongoing AMC services.",
        img: "https://images.unsplash.com/photo-1494548162494-384bba4ab999?w=200&q=80",
    },
];

// ===== SEQUENCE TIMING =====
const CIRCLE_DURATION = 0.55;
const PAUSE_AFTER_TEXT = 0.35;
const LINE_DURATION = 0.6;
const STEP_INTERVAL = CIRCLE_DURATION + PAUSE_AFTER_TEXT + LINE_DURATION; // ~1.5s per step

const circleDelay = (i) => i * STEP_INTERVAL;
const titleDelay = (i) => circleDelay(i) + 0.25;
const descDelay = (i) => circleDelay(i) + 0.35;
const lineDelay = (i) => circleDelay(i) + CIRCLE_DURATION + PAUSE_AFTER_TEXT;
// jab line ka reveal (draw-in) khatam ho, usi waqt se continuous flow shuru hoga
const lineRevealEnd = (i) => lineDelay(i) + LINE_DURATION;

const rowVariants = { hidden: {}, visible: {} };

const circleVariants = {
    hidden: { scale: 0.4, opacity: 0 },
    visible: (i) => ({
        scale: 1,
        opacity: 1,
        transition: { delay: circleDelay(i), duration: CIRCLE_DURATION, ease: [0.34, 1.56, 0.64, 1] },
    }),
};

const titleVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: titleDelay(i), duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    }),
};

const descVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: descDelay(i), duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    }),
};

// Reveal mask: 0 -> full width (ek hi baar draw hota hai)
const lineRevealVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: (i) => ({
        scaleX: 1,
        opacity: 1,
        transition: { delay: lineDelay(i), duration: LINE_DURATION, ease: [0.22, 1, 0.36, 1] },
    }),
};

export default function HowWeWork() {
    const n = steps.length;
    const segmentWidthPct = 100 / (n - 1);

    return (
        <section className="relative w-full overflow-hidden bg-slate-50 py-24">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-[#22c55e]/25 to-blue-400/20 rounded-full blur-[120px]" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-tl from-[#22c55e]/25 to-blue-400/20 rounded-full blur-[120px]" />

            <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="h-[2px] w-8 bg-[#22c55e]" />
                        <span className="text-[#16a34a] text-xs md:text-sm font-bold tracking-[0.25em]">
                            HOW WE WORK
                        </span>
                        <span className="h-[2px] w-8 bg-[#22c55e]" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-[#0f172a] tracking-tight">
                        OUR PROCESS
                    </h2>
                </motion.div>

                <motion.div
                    variants={rowVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="relative flex justify-between items-start w-full"
                >
                    {/* Line segments: reveal mask (once) + continuously flowing dashes inside */}
                    {steps.slice(0, -1).map((step, i) => (
                        <motion.div
                            key={`line-${step.title}`}
                            custom={i}
                            variants={lineRevealVariants}
                            style={{
                                left: `${segmentWidthPct * i}%`,
                                width: `${segmentWidthPct}%`,
                            }}
                            className="absolute z-0 hidden md:block top-[34px] md:top-[40px] h-[2px] overflow-hidden origin-left"
                        >
                            {/* Flowing dashes — reveal khatam hote hi non-stop left-to-right chalta rehta hai */}
                            <motion.div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage:
                                        "repeating-linear-gradient(to right, #22c55e 0px, #22c55e 8px, transparent 8px, transparent 16px)",
                                    backgroundSize: "16px 2px",
                                }}
                                initial={{ backgroundPositionX: "0px" }}
                                animate={{ backgroundPositionX: "16px" }}
                                transition={{
                                    delay: lineRevealEnd(i),
                                    duration: 0.7,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />
                        </motion.div>
                    ))}

                    {steps.map((step, i) => (
                        <div
                            key={step.title}
                            className="flex flex-col items-center flex-1 max-w-[125px] sm:max-w-[150px] md:max-w-[195px]"
                        >
                            <motion.div
                                custom={i}
                                variants={circleVariants}
                                className="relative z-10 h-16 w-16 md:h-20 md:w-20 rounded-full p-1.5 bg-slate-50 shadow-[0_0_14px_rgba(34,197,94,0.35)]"
                            >
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 rounded-full border-2 border-dashed border-[#22c55e]"
                                />
                                <div className="w-full h-full rounded-full overflow-hidden bg-slate-200">
                                    <img
                                        src={step.img}
                                        alt={step.title}
                                        loading="eager"
                                        width={200}
                                        height={200}
                                        className="w-full h-full object-cover rounded-full"
                                        onError={(e) => {
                                            e.currentTarget.style.display = "none";
                                        }}
                                    />
                                </div>
                            </motion.div>

                            <motion.span
                                custom={i}
                                variants={titleVariants}
                                className="mt-3 text-[11px] md:text-xs font-extrabold text-[#0f172a] uppercase tracking-wide text-center whitespace-nowrap"
                            >
                                {step.title}
                            </motion.span>

                            {/* Description — fixed width + line-clamp-2 so it always settles into exactly 2 lines, never overlaps */}
                            <motion.p
                                custom={i}
                                variants={descVariants}
                                className="text-[10px] md:text-[11.5px] text-slate-500 text-center leading-[1.5] mt-1.5 w-full px-1 line-clamp-2 min-h-[30px] md:min-h-[34px]"
                            >
                                {step.desc}
                            </motion.p>
                        </div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{
                        delay: circleDelay(n - 1) + CIRCLE_DURATION + 0.3,
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="w-32 h-[2px] bg-[#22c55e]/30 mx-auto mt-16 rounded-full origin-center"
                />
            </div>
        </section>
    );
}
