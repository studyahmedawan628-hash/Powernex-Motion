import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
    Activity,
    ArrowRight,
    BatteryCharging,
    Building2,
    Cable,
    Check,
    Compass,
    Headphones,
    Home,
    House,
    PanelsTopLeft,
    PenTool,
    Radio,
    ShieldCheck,
    Sun,
    Wrench,
    Zap,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import SiteLayout from "../components/layout/SiteLayout";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import { serviceProcess, services } from "../data/services";
import "../services-page.css";

const iconMap = { Home, Building2, Wrench, BatteryCharging, Compass, ShieldCheck };

const energyNodes = [
    { label: "Sun", detail: "Energy source", icon: Sun },
    { label: "Solar Generation", detail: "PV production", icon: PanelsTopLeft },
    { label: "Inverter / Control", detail: "Power conversion", icon: Cable },
    { label: "Energy Storage", detail: "Flexible reserve", icon: BatteryCharging },
    { label: "Home / Business", detail: "Usable energy", icon: House },
    { label: "Monitoring / Support", detail: "Ongoing visibility", icon: Activity },
];

const needs = [
    { label: "My Home", serviceIds: ["residential-solar", "storage", "consultation"] },
    { label: "My Business", serviceIds: ["commercial-industrial", "installation", "storage", "consultation"] },
    { label: "Energy Backup", serviceIds: ["storage", "consultation"] },
    { label: "Solar System Installation", serviceIds: ["installation", "consultation"] },
    { label: "System Planning", serviceIds: ["consultation", "residential-solar", "commercial-industrial"] },
    { label: "System Maintenance", serviceIds: ["after-sales"] },
];

const processDescriptions = [
    "Understand the property, priorities, and operating context.",
    "Shape a coordinated technical approach around the requirement.",
    "Present the proposed scope clearly for informed review.",
    "Coordinate mechanical, electrical, and commissioning work.",
    "Explain the system, complete handover, and support its operation.",
];

const proofRows = [
    { title: "Engineered around your needs", copy: "The service journey starts with the property and energy requirement—not a pre-selected package." },
    { title: "Complete system thinking", copy: "Generation, conversion, storage, protection, monitoring, and support are considered as connected parts." },
    { title: "Professional installation", copy: "Field execution is approached as an engineering discipline from structure through commissioning." },
    { title: "Long-term support", copy: "Handover is not the end of the relationship; inspection, maintenance, and guidance remain available." },
];

const lifecycle = [
    { title: "Assess", copy: "Begin with the site, energy priorities, and the practical constraints that shape the brief." },
    { title: "Design", copy: "Coordinate the system architecture so each selected component serves a clear purpose." },
    { title: "Install", copy: "Translate the approved approach into careful mechanical and electrical field work." },
    { title: "Monitor", copy: "Create a clear path for observing the system and understanding its operating state." },
    { title: "Support", copy: "Maintain continuity through inspection, troubleshooting, and after-sales coordination." },
];

const faqs = [
    { question: "Which PowerNex service is right for me?", answer: "Start with your property type and immediate energy goal. The service navigator and need-based guide can narrow the relevant options, while a consultation can clarify the final direction." },
    { question: "Can I request a consultation before choosing a system?", answer: "Yes. System Consultation exists specifically for requirements that need discovery, technical direction, or an implementation roadmap before equipment is selected." },
    { question: "Does PowerNex support residential and commercial requirements?", answer: "Yes. The current service system includes Residential Solar Systems and Commercial & Industrial Solar, supported by installation, storage, consultation, and after-sales services." },
    { question: "Can an existing solar system be assessed for support?", answer: "AMC & After-Sales Support includes inspection, maintenance support, and troubleshooting. The existing system would need to be reviewed before an appropriate support path is confirmed." },
];

function ServicesHero() {
    const heroRef = useRef(null);
    const reduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const contentY = useTransform(scrollYProgress, [0, 1], [0, -58]);
    const contentOpacity = useTransform(scrollYProgress, [0, .74, 1], [1, .9, .18]);
    const visualY = useTransform(scrollYProgress, [0, 1], [0, 34]);

    return (
        <section ref={heroRef} className="services-hero">
            <motion.img style={reduceMotion ? undefined : { y: visualY }} src="/projects/field-work-and-system-integration/image-02.jpeg" alt="PowerNex solar installation field work" className="services-hero__image" />
            <div className="services-hero__wash" />
            <div className="services-hero__grid" aria-hidden="true" />
            <svg className="services-hero__paths" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
                <path d="M560 70 C680 160 610 250 760 315 S890 420 970 540" />
                <path d="M680 0 C740 140 805 175 790 300 S855 455 1000 480" />
                <circle cx="760" cy="315" r="5" />
            </svg>
            <motion.div style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }} className="site-container services-hero__content">
                <motion.p initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }} className="section-eyebrow"><span />Our Services</motion.p>
                <div className="services-hero__heading-mask">
                    <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 58 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .08, ease: [0.16, 1, 0.3, 1] }}>
                        <span>Energy solutions</span><br />engineered for<br />the real world.
                    </motion.h1>
                </div>
                <motion.p initial={reduceMotion ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .72, delay: .24 }} className="services-hero__copy">
                    Residential, commercial, storage, installation, consultation, and long-term support—connected through one PowerNex service ecosystem.
                </motion.p>
                <motion.div initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .38 }} className="services-hero__actions">
                    <a href="#service-navigator" className="button button--primary">Explore solutions <ArrowRight size={17} /></a>
                    <Link to="/get-quote" className="button button--outline">Get free quote <Zap size={16} /></Link>
                </motion.div>
                <motion.div initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .8, delay: .55 }} className="services-hero__indicators" aria-label="Services overview">
                    <p><strong>06</strong><span>Connected services</span></p>
                    <p><strong>05</strong><span>Delivery stages</span></p>
                    <p><strong>01</strong><span>Coordinated approach</span></p>
                </motion.div>
            </motion.div>
            <div className="services-hero__fade" aria-hidden="true" />
        </section>
    );
}

function ServiceNavigator() {
    const [activeId, setActiveId] = useState(services[0].id);
    const activeService = services.find((service) => service.id === activeId) || services[0];
    const ActiveIcon = iconMap[activeService.icon];

    const chooseService = (id) => setActiveId(id);

    return (
        <section id="service-navigator" className="service-navigator section-pad">
            <div className="site-container">
                <Reveal><SectionHeading eyebrow="Service Navigator" title="Explore one connected system of expertise." light description="Choose a discipline to understand its role, who it supports, and how it connects to the wider PowerNex journey." /></Reveal>

                <div className="service-navigator__desktop">
                    <nav aria-label="PowerNex service selector" className="service-navigator__list">
                        {services.map((service) => (
                            <button
                                type="button"
                                key={service.id}
                                className={activeId === service.id ? "active" : ""}
                                aria-pressed={activeId === service.id}
                                onClick={() => chooseService(service.id)}
                                onMouseEnter={() => chooseService(service.id)}
                                onFocus={() => chooseService(service.id)}
                            >
                                <span>{service.number}</span>
                                <strong>{service.navTitle}</strong>
                                <ArrowRight size={17} />
                            </button>
                        ))}
                    </nav>

                    <div className="service-navigator__stage" aria-live="polite">
                        <AnimatePresence mode="wait">
                            <motion.article key={activeService.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .4, ease: [0.16, 1, 0.3, 1] }}>
                                <div className="service-navigator__visual">
                                    <img src={activeService.image} alt={`${activeService.title} service context`} />
                                    <span>{activeService.number} / 06</span>
                                </div>
                                <div className="service-navigator__detail">
                                    <div className="service-navigator__icon"><ActiveIcon size={26} aria-hidden="true" /></div>
                                    <p className="service-navigator__audience">For {activeService.audience}</p>
                                    <h3>{activeService.title}</h3>
                                    <p>{activeService.description}</p>
                                    <ul>{activeService.features.map((feature) => <li key={feature}><Check size={14} />{feature}</li>)}</ul>
                                    <Link to="/contact" className="text-link">Explore this service <ArrowRight size={15} /></Link>
                                </div>
                            </motion.article>
                        </AnimatePresence>
                    </div>
                </div>

                <div className="service-navigator__mobile">
                    {services.map((service) => {
                        const Icon = iconMap[service.icon];
                        const expanded = activeId === service.id;
                        return (
                            <article key={service.id} className={expanded ? "active" : ""}>
                                <button type="button" aria-expanded={expanded} aria-controls={`service-panel-${service.id}`} onClick={() => chooseService(expanded ? "" : service.id)}>
                                    <span>{service.number}</span><strong>{service.navTitle}</strong><ArrowRight size={17} />
                                </button>
                                {expanded && <div id={`service-panel-${service.id}`} className="service-navigator__mobile-panel"><img src={service.image} alt={`${service.title} service context`} /><div><Icon size={22} aria-hidden="true" /><p className="service-navigator__audience">For {service.audience}</p><h3>{service.title}</h3><p>{service.description}</p><ul>{service.features.map((feature) => <li key={feature}><Check size={14} />{feature}</li>)}</ul><Link to="/contact" className="text-link">Explore service <ArrowRight size={15} /></Link></div></div>}
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function ServiceShowcase() {
    return (
        <section className="service-showcase section-pad">
            <div className="site-container">
                <Reveal><SectionHeading eyebrow="Complete Capability" title="Six disciplines. One energy journey." description="Browse the complete service system at a glance, with each discipline designed to connect into the next." /></Reveal>
                <div className="service-showcase__grid">
                    {services.map((service, index) => {
                        const Icon = iconMap[service.icon];
                        return (
                            <Reveal key={service.id} delay={(index % 3) * .06} className={`service-showcase__card ${index === 0 ? "service-showcase__card--featured" : ""}`}>
                                {index === 0 && <img src={service.image} alt="Residential solar installation field work" />}
                                <div className="service-showcase__pattern" aria-hidden="true" />
                                <header><span>{service.number}</span><Icon size={23} aria-hidden="true" /></header>
                                <div className="service-showcase__body"><p>{service.audience}</p><h3>{service.title}</h3><div className="service-showcase__copy"><p>{service.description}</p><ul>{service.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div><Link to="/contact" aria-label={`Discuss ${service.title}`}><ArrowRight size={19} /></Link></div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function EnergyEcosystem() {
    return (
        <section className="energy-ecosystem section-pad">
            <div className="site-container">
                <Reveal><SectionHeading eyebrow="Connected Energy Ecosystem" title="From sunlight to supported energy." light description="PowerNex services connect generation, control, storage, use, monitoring, and long-term care into a coordinated energy path." /></Reveal>
                <Reveal delay={.1} className="energy-ecosystem__diagram">
                    <div className="energy-ecosystem__track" aria-hidden="true"><span className="energy-ecosystem__progress" /><span className="energy-ecosystem__dot" /></div>
                    {energyNodes.map(({ label, detail, icon: Icon }, index) => <div className="energy-ecosystem__node" key={label} style={{ "--node-delay": `${index * .72}s` }}><span className="energy-ecosystem__number">{String(index + 1).padStart(2, "0")}</span><div><Icon size={24} aria-hidden="true" /></div><h3>{label}</h3><p>{detail}</p></div>)}
                </Reveal>
                <p className="energy-ecosystem__note">System architecture is defined around the actual requirement. This visualization explains relationships, not a fixed equipment configuration.</p>
            </div>
        </section>
    );
}

function NeedsGuide() {
    const [activeNeed, setActiveNeed] = useState(needs[0]);
    return (
        <section className="needs-guide section-pad">
            <div className="site-container needs-guide__layout">
                <Reveal className="needs-guide__heading"><p className="section-eyebrow"><span />Choose your direction</p><h2>What do you<br />need energy for?</h2><p>Select a starting point. This is navigation guidance only—not an automated technical recommendation.</p></Reveal>
                <Reveal delay={.08} className="needs-guide__interaction">
                    <div className="needs-guide__choices" role="list" aria-label="Energy needs">{needs.map((need) => <button type="button" role="listitem" key={need.label} className={activeNeed.label === need.label ? "active" : ""} onClick={() => setActiveNeed(need)}><span>{need.label}</span><ArrowRight size={16} /></button>)}</div>
                    <div className="needs-guide__result" aria-live="polite"><p>Relevant PowerNex services may include</p><AnimatePresence mode="wait"><motion.div key={activeNeed.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .32 }}>{activeNeed.serviceIds.map((id) => { const service = services.find((item) => item.id === id); const Icon = iconMap[service.icon]; return <span key={id}><Icon size={15} />{service.navTitle}</span>; })}</motion.div></AnimatePresence><Link to="/get-quote" className="text-link">Build a guided request <ArrowRight size={15} /></Link></div>
                </Reveal>
            </div>
        </section>
    );
}

function DeliveryProcess() {
    return (
        <section className="delivery-process section-pad">
            <div className="site-container">
                <Reveal><SectionHeading eyebrow="PowerNex Delivery Process" title="A disciplined route from need to handover." /></Reveal>
                <Reveal className="delivery-process__journey">
                    <div className="delivery-process__line" aria-hidden="true"><span className="delivery-process__progress" /><span className="delivery-process__traveler" /></div>
                    {serviceProcess.map((step, index) => <article key={step} style={{ "--process-delay": `${index * .62}s` }}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{step}</h3><p>{processDescriptions[index]}</p></div></article>)}
                </Reveal>
            </div>
        </section>
    );
}

function WhyPowerNexServices() {
    return (
        <section className="services-proof section-pad">
            <div className="site-container services-proof__layout">
                <Reveal className="services-proof__intro"><p className="section-eyebrow"><span />Why PowerNex</p><h2>System thinking at every stage.</h2><p>Value comes from how the complete service journey is coordinated—not from treating each discipline in isolation.</p></Reveal>
                <div className="services-proof__rows">{proofRows.map((item, index) => <Reveal key={item.title} delay={index * .05} as="article"><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.copy}</p></div><i /></Reveal>)}</div>
            </div>
        </section>
    );
}

function LifecycleStory() {
    return (
        <section className="lifecycle-story section-pad">
            <div className="site-container lifecycle-story__layout">
                <div className="lifecycle-story__visual"><img loading="lazy" src="/projects/fg-12-15kw/image-01.jpeg" alt="PowerNex mechanical structure installation work" /><div><p>One connected lifecycle</p><strong>Assess → Support</strong></div></div>
                <div className="lifecycle-story__chapters"><Reveal><p className="section-eyebrow"><span />Service deep dive</p><h2>From site context to long-term care.</h2></Reveal>{lifecycle.map((chapter, index) => <Reveal key={chapter.title} as="article"><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{chapter.title}</h3><p>{chapter.copy}</p></div></Reveal>)}</div>
            </div>
        </section>
    );
}

function ServiceFaq() {
    return (
        <section className="service-faq section-pad">
            <div className="site-container service-faq__layout">
                <Reveal><p className="section-eyebrow"><span />Service guidance</p><h2>Good decisions begin with clear questions.</h2></Reveal>
                <Reveal delay={.08} className="service-faq__list">{faqs.map((faq, index) => <details key={faq.question}><summary><span>{String(index + 1).padStart(2, "0")}</span><strong>{faq.question}</strong><i /></summary><p>{faq.answer}</p></details>)}</Reveal>
            </div>
        </section>
    );
}

function ServicesCta() {
    return (
        <section className="services-final-cta">
            <div className="services-final-cta__grid" aria-hidden="true" />
            <div className="services-final-cta__path" aria-hidden="true"><span /></div>
            <div className="site-container services-final-cta__content"><Reveal><p className="section-eyebrow"><span />Your next step</p><h2>Ready to build<br />your energy<br /><em>solution?</em></h2><p>Speak with PowerNex Solutions about residential, commercial, storage, installation, consultation, or support requirements.</p><div><Link to="/get-quote" className="button button--primary">Start your quote <ArrowRight size={17} /></Link><Link to="/contact" className="button button--outline">Contact PowerNex <Headphones size={16} /></Link></div></Reveal></div>
        </section>
    );
}

export default function Services() {
    return (
        <SiteLayout>
            <ServicesHero />
            <section className="services-positioning section-pad"><div className="site-container services-positioning__layout"><Reveal><p className="section-eyebrow"><span />Complete energy support</p><h2>From first<br />assessment to<br /><em>long-term support.</em></h2></Reveal><Reveal delay={.1} className="services-positioning__copy"><p>PowerNex Solutions brings planning, engineering, installation, energy storage, and after-sales care into one connected service ecosystem.</p><div><PenTool size={20} /><span>Understand the requirement</span></div><div><Radio size={20} /><span>Connect every system stage</span></div></Reveal></div></section>
            <ServiceNavigator />
            <ServiceShowcase />
            <EnergyEcosystem />
            <NeedsGuide />
            <DeliveryProcess />
            <WhyPowerNexServices />
            <LifecycleStory />
            <ServiceFaq />
            <ServicesCta />
        </SiteLayout>
    );
}
