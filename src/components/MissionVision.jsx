// src/components/MissionVision.jsx
import { motion } from "motion/react";
import { Sun, Eye, Shield, Users, Leaf, Zap, Globe } from "lucide-react";

const missionStats = [
    {
        icon: Shield,
        title: "Reliable Solutions",
        desc: "Engineering systems built for performance and durability.",
    },
    {
        icon: Users,
        title: "Customer Focused",
        desc: "Solutions tailored to meet real energy needs.",
    },
    {
        icon: Leaf,
        title: "Sustainable Impact",
        desc: "Reducing carbon footprint and building a cleaner future.",
    },
];

const visionStats = [
    {
        icon: Sun,
        title: "Clean Energy",
        desc: "Promoting renewable energy for a healthier planet.",
    },
    {
        icon: Zap,
        title: "Smart Solutions",
        desc: "Innovative technology driving efficiency and reliability.",
    },
    {
        icon: Globe,
        title: "Sustainable Future",
        desc: "Building a world where clean energy empowers all.",
    },
];

// Cards slide in horizontally from opposite sides
const slideFromLeft = {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const slideFromRight = {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function MissionVision() {
    return (
        <section className="relative w-full overflow-hidden bg-slate-50 py-24">
            <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
                {/* === HEADING — sirf fade, koi top-se-neeche slide nahi === */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="h-[2px] w-8 bg-[#22c55e]" />
                        <span className="text-[#16a34a] text-xs md:text-sm font-bold tracking-[0.25em]">
                            OUR PURPOSE
                        </span>
                        <span className="h-[2px] w-8 bg-[#22c55e]" />
                    </div>
                    <h2 className="text-4xl md:text-4.5xl font-extrabold uppercase text-[#0f172a] tracking-tight">
                        Mission &amp; Vision
                    </h2>
                    <p className="text-slate-400 text-base md:text-lg max-w-1xl mx-auto mt-4">
                        Guided by purpose. Driven by innovation. Committed to a sustainable future.
                    </p>
                </motion.div>

                {/* === CARDS === */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* ===== MISSION CARD (light) — slides in from LEFT ===== */}
                    <motion.div
                        variants={slideFromLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="rounded-2xl overflow-hidden shadow-xl bg-white flex flex-col"
                    >
                        <div
                            className="relative h-[420px] flex flex-col justify-end p-8"
                            style={{
                                backgroundImage:
                                    "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?w=900&q=80')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            {/* readability overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/10" />

                            {/* icon + text grouped together, tight gap */}
                            <div className="relative z-10">
                                <div className="h-14 w-14 rounded-full bg-white shadow-md flex items-center justify-center mb-4">
                                    <Sun className="h-6 w-6 text-[#22c55e]" strokeWidth={2} />
                                </div>

                                <span className="text-[#16a34a] text-xs font-bold tracking-[0.2em]">
                                    OUR MISSION
                                </span>
                                <h3 className="text-2xl md:text-3xl font-extrabold text-[#0f172a] mt-2 leading-tight">
                                    Powering Today for a Better Tomorrow
                                </h3>
                                <div className="w-10 h-[3px] bg-[#22c55e] mt-3 mb-4 rounded-full" />
                                <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-md">
                                    To deliver reliable, efficient, and affordable solar energy
                                    solutions that empower homes and businesses while creating
                                    long-term value for our communities and the planet.
                                </p>
                            </div>
                        </div>

                        {/* stats bar */}
                        <div className="bg-[#0b1324] grid grid-cols-3 divide-x divide-white/10 px-4 py-8">
                            {missionStats.map((stat) => {
                                const Icon = stat.icon;
                                return (
                                    <div key={stat.title} className="flex flex-col items-center text-center px-3">
                                        <Icon className="h-6 w-6 text-[#22c55e] mb-3" strokeWidth={2} />
                                        <h4 className="text-white text-sm font-bold mb-1">{stat.title}</h4>
                                        <p className="text-slate-400 text-xs leading-relaxed">{stat.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* ===== VISION CARD (dark) — slides in from RIGHT ===== */}
                    <motion.div
                        variants={slideFromRight}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="rounded-2xl overflow-hidden shadow-xl bg-[#0b1324] flex flex-col"
                    >
                        <div
                            className="relative h-[420px] flex flex-col justify-end p-8"
                            style={{
                                backgroundImage:
                                    "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=80')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            {/* readability overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0b1324] via-[#0b1324]/85 to-[#0b1324]/10" />

                            {/* icon + text grouped together, tight gap */}
                            <div className="relative z-10">
                                <div className="h-14 w-14 rounded-full bg-[#0b1324]/80 border border-[#22c55e]/40 shadow-md flex items-center justify-center mb-4">
                                    <Eye className="h-6 w-6 text-[#22c55e]" strokeWidth={2} />
                                </div>

                                <span className="text-[#4ade80] text-xs font-bold tracking-[0.2em]">
                                    OUR VISION
                                </span>
                                <h3 className="text-2xl md:text-3xl font-extrabold text-white mt-2 leading-tight">
                                    A Future Powered by Clean Energy
                                </h3>
                                <div className="w-10 h-[3px] bg-[#22c55e] mt-3 mb-4 rounded-full" />
                                <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-md">
                                    To be a leading force in the global transition to clean
                                    energy — creating smarter, greener, and more resilient
                                    communities for generations to come.
                                </p>
                            </div>
                        </div>

                        {/* stats bar */}
                        <div className="bg-[#0b1324] grid grid-cols-3 divide-x divide-white/10 px-4 py-8 border-t border-white/5">
                            {visionStats.map((stat) => {
                                const Icon = stat.icon;
                                return (
                                    <div key={stat.title} className="flex flex-col items-center text-center px-3">
                                        <Icon className="h-6 w-6 text-[#22c55e] mb-3" strokeWidth={2} />
                                        <h4 className="text-white text-sm font-bold mb-1">{stat.title}</h4>
                                        <p className="text-slate-400 text-xs leading-relaxed">{stat.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
