import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ChevronRight, ChevronsUp, Mail, MapPin, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { BRAND } from "../config/brand";
import { CONTACT } from "../config/contact";

const companyLinks = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Projects", to: "/projects" },
    { label: "Contact", to: "/contact" },
];
const exploreLinks = [
    { label: "Services", to: "/services" },
    { label: "Products", to: "/products" },
    { label: "Get Quote", to: "/get-quote" },
];

function FooterColumn({ title, links, delay }) {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.5, delay }}>
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-2">{title}</h4>
            <span className="block h-[2px] w-8 bg-[#22c55e] mb-4" />
            <ul className="space-y-2.5">
                {links.map((link) => <li key={link.to}><Link to={link.to} className="group flex items-center gap-1.5 text-white/60 text-sm hover:text-[#4ade80] transition-colors"><ChevronRight size={13} className="text-[#22c55e] group-hover:translate-x-1 transition-transform" />{link.label}</Link></li>)}
            </ul>
        </motion.div>
    );
}

function ScrollToTop() {
    const [visible, setVisible] = useState(false);
    const { scrollY } = useScroll();
    useMotionValueEvent(scrollY, "change", (latest) => setVisible(latest > 400));
    return <AnimatePresence>{visible && <motion.button initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} whileHover={{ y: -3 }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Scroll to top" className="scroll-top fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full bg-gradient-to-br from-[#16a34a] to-[#22c55e] shadow-lg shadow-green-500/30 border border-[#4ade80]/50 flex items-center justify-center"><ChevronsUp size={21} className="text-white" /></motion.button>}</AnimatePresence>;
}

export default function Footer() {
    const whatsapp = CONTACT.whatsappHref;
    const hasContactDetails = Boolean(CONTACT.location || CONTACT.phone || CONTACT.email);
    return (
        <>
            <footer className="relative w-full overflow-hidden bg-[#0a1826]">
                <div className="absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r from-[#0ea5e9] via-[#22c55e] to-[#0ea5e9] overflow-hidden"><motion.div className="absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent" animate={{ x: ["-100%", "400%"] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} /></div>
                <div className="absolute -top-20 left-1/4 w-96 h-96 bg-[#22c55e]/10 rounded-full blur-[120px]" />
                <div className="site-container relative z-10 py-16">
                    <div className="footer-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1.3fr_1fr_1fr_1.2fr] gap-12">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }}>
                            <img src={BRAND.logo.onDark} alt={BRAND.name} className="mb-5 h-auto w-[clamp(10rem,16vw,13rem)] object-contain" />
                            <p className="text-white/60 text-sm leading-relaxed max-w-xs">Smart Energy. Brighter Future. Engineering solar, storage, and energy solutions for homes, businesses, and institutions.</p>
                            {whatsapp && <motion.a href={whatsapp} target="_blank" rel="noreferrer" aria-label="PowerNex Solutions on WhatsApp" whileHover={{ scale: 1.1 }} className="mt-6 h-10 w-10 flex items-center justify-center rounded-full bg-white/10 border border-white/15 text-white/80"><FaWhatsapp size={16} /></motion.a>}
                        </motion.div>
                        <FooterColumn title="Company" links={companyLinks} delay={0.08} />
                        <FooterColumn title="Explore" links={exploreLinks} delay={0.16} />
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ delay: 0.24 }}>
                            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-2">Contact Info</h4><span className="block h-[2px] w-8 bg-[#22c55e] mb-4" />
                            {hasContactDetails ? <ul className="space-y-4 text-sm">
                                {CONTACT.location && <li className="flex items-start gap-2.5"><MapPin size={16} className="text-[#4ade80] mt-0.5 shrink-0" /><div><p className="text-white/40 text-[10px] tracking-widest uppercase">Location</p><p className="text-white/70">{CONTACT.location}</p></div></li>}
                                {CONTACT.phone && <li className="flex items-start gap-2.5"><Phone size={16} className="text-[#4ade80] mt-0.5 shrink-0" /><div><p className="text-white/40 text-[10px] tracking-widest uppercase">Phone</p><a href={`tel:${CONTACT.phoneHref}`} className="text-white/70 hover:text-[#4ade80]">{CONTACT.phone}</a></div></li>}
                                {CONTACT.email && <li className="flex items-start gap-2.5"><Mail size={16} className="text-[#4ade80] mt-0.5 shrink-0" /><div><p className="text-white/40 text-[10px] tracking-widest uppercase">Email</p><a href={`mailto:${CONTACT.email}`} className="text-white/70 hover:text-[#4ade80]">{CONTACT.email}</a></div></li>}
                            </ul> : <div className="text-sm"><p className="mb-4 text-white/55 leading-relaxed">Verified direct contact details have not yet been published.</p><Link to="/contact" className="group inline-flex min-h-11 items-center gap-1.5 text-[#4ade80]">Open contact hub <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" /></Link></div>}
                        </motion.div>
                    </div>
                    <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs"><p className="text-white/40">© 2026 {BRAND.name}. All rights reserved.</p><p className="text-[#4ade80] font-semibold">Powering Today — Sustaining Tomorrow</p></div>
                </div>
            </footer>
            <ScrollToTop />
        </>
    );
}
