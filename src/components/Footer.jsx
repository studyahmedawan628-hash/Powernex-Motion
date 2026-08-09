// src/components/Footer.jsx
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  ChevronRight,
  ChevronsUp,
} from "lucide-react";
import { FaLinkedinIn, FaYoutube, FaWhatsapp } from "react-icons/fa";
import logo from "../assets/powernex-logo.png";

const companyLinks = ["Home", "About Us", "Our Team", "Contact"];
const exploreLinks = ["Services", "Our Projects", "Products", "EV Charging", "Get Quote"];
const socials = [
  { icon: FaLinkedinIn, label: "LinkedIn" },
  { icon: FaYoutube, label: "YouTube" },
  { icon: FaWhatsapp, label: "WhatsApp" },
];

function FooterColumn({ title, links, startDelay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay: startDelay }}
    >
      <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-2">
        {title}
      </h4>
      <span className="block h-[2px] w-8 bg-[#22c55e] mb-4" />
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="group flex items-center gap-1.5 text-white/60 text-sm hover:text-[#4ade80] transition-colors"
            >
              <ChevronRight
                size={13}
                className="text-[#22c55e] group-hover:translate-x-1 transition-transform"
              />
              {link}
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 400);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 right-8 z-50 h-12 w-12 md:h-14 md:w-14 rounded-full bg-gradient-to-br from-[#16a34a] to-[#22c55e] shadow-lg shadow-green-500/40 border border-[#4ade80]/50 flex items-center justify-center overflow-hidden"
        >
          <motion.span
            className="absolute inset-0 bg-white/25 skew-x-[-20deg]"
            initial={{ x: "-150%" }}
            animate={{ x: "250%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1.2,
              ease: "easeInOut",
            }}
          />
          <motion.span
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            <ChevronsUp size={22} className="text-white" />
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function Footer() {
  return (
    <>
      <footer className="relative w-full overflow-hidden bg-[#0a1826]">
        <div className="absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r from-[#0ea5e9] via-[#22c55e] to-[#0ea5e9] overflow-hidden">
          <motion.div
            className="absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent"
            animate={{ x: ["-100%", "400%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="absolute -top-20 left-1/4 w-96 h-96 bg-[#22c55e]/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-[#0ea5e9]/10 rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr_1.2fr] gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
            >
              <img src={logo} alt="PowerNex" className="h-11 w-auto mb-5" />
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                Smart Energy. Brighter Future. Pakistan's trusted solar
                partner delivering clean energy solutions for homes,
                businesses, and industries since 2018.
              </p>
              <div className="flex items-center gap-3 mt-6">
                {socials.map(({ icon: Icon, label }) => (
                  <motion.a
                    key={label}
                    href="#"
                    whileHover={{
                      scale: 1.12,
                      backgroundColor: "rgba(34,197,94,0.25)",
                      boxShadow: "0 0 14px rgba(34,197,94,0.6)",
                    }}
                    className="h-9 w-9 flex items-center justify-center rounded-full bg-white/10 border border-white/15 text-white/80 transition-colors"
                  >
                    <Icon size={15} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <FooterColumn title="Company" links={companyLinks} startDelay={0.1} />
            <FooterColumn title="Explore" links={exploreLinks} startDelay={0.2} />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-2">
                Contact Info
              </h4>
              <span className="block h-[2px] w-8 bg-[#22c55e] mb-4" />

              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-[#4ade80] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-white/40 text-[10px] tracking-widest uppercase">
                      Office Address
                    </p>
                    <p className="text-white/70">
                      Office #123, Solar Street, Green Avenue, Lahore,
                      Punjab, Pakistan
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <Phone size={16} className="text-[#4ade80] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-white/40 text-[10px] tracking-widest uppercase">
                      Phone / WhatsApp
                    </p>
                    <p className="text-white/70">+92 300 1234567</p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail size={16} className="text-[#4ade80] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-white/40 text-[10px] tracking-widest uppercase">
                      Email
                    </p>
                    <p className="text-white/70">info@powernex.pk</p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <Globe size={16} className="text-[#4ade80] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-white/40 text-[10px] tracking-widest uppercase">
                      Website
                    </p>
                    <p className="text-white/70">www.powernex.pk</p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock size={16} className="text-[#4ade80] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-white/40 text-[10px] tracking-widest uppercase">
                      Working Hours
                    </p>
                    <p className="text-white/70">
                      Mon – Sat: 9:00 AM – 6:00 PM, Sunday: By Appointment
                    </p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>

          <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
            <p className="text-white/40">
              © 2026 Power Nex (Pvt.) Ltd. All rights reserved.
            </p>
            <p className="text-[#4ade80] font-semibold">
              Powering Today — Sustaining Tomorrow
            </p>
          </div>
        </div>
      </footer>

      <ScrollToTop />
    </>
  );
}
