import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { ArrowRight, Menu, Search, X } from "lucide-react";
import { BRAND } from "../config/brand";
import { CONTACT } from "../config/contact";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Products", to: "/products" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef(null);
  const drawerRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1280px)");
    const handleDesktopChange = (event) => {
      if (event.matches) setMenuOpen(false);
    };
    desktopQuery.addEventListener("change", handleDesktopChange);
    return () => desktopQuery.removeEventListener("change", handleDesktopChange);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    document.body.classList.add("menu-open");
    const toggleButton = toggleRef.current;
    const focusFrame = requestAnimationFrame(() => {
      drawerRef.current?.querySelector("[data-drawer-close]")?.focus();
    });

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab" || !drawerRef.current) return;
      const focusable = [...drawerRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )].filter((element) => element.getClientRects().length > 0);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("menu-open");
      requestAnimationFrame(() => toggleButton?.focus());
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const drawerTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.4, ease: [0.16, 1, 0.3, 1] };

  const mobileNavigation = createPortal(
    <AnimatePresence>
      {menuOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close navigation overlay"
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
            onClick={closeMenu}
            className="mobile-navigation-overlay xl:hidden"
          />

          <motion.aside
            ref={drawerRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-navigation-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={drawerTransition}
            className="mobile-navigation xl:hidden"
          >
            <div className="mobile-navigation__header">
              <Link to="/" onClick={closeMenu} aria-label={`${BRAND.name} home`}>
                <img
                  src={BRAND.logo.onDark}
                  alt={BRAND.name}
                  className="h-auto w-[7.5rem] object-contain"
                />
              </Link>
              <button
                type="button"
                data-drawer-close
                onClick={closeMenu}
                className="mobile-navigation__close tap-target"
                aria-label="Close navigation"
              >
                <X size={23} />
              </button>
            </div>

            <div className="mobile-navigation__body">
              <h2 id="mobile-navigation-title" className="sr-only">Mobile navigation</h2>

              <label className="mobile-navigation__search">
                <span className="sr-only">Search PowerNex</span>
                <Search size={18} aria-hidden="true" />
                <input type="search" placeholder="Search PowerNex" />
              </label>

              <nav aria-label="Mobile navigation">
                <ul className="flex flex-col">
                  {navLinks.map((link) => (
                    <li key={link.to}>
                      <NavLink
                        to={link.to}
                        end={link.to === "/"}
                        onClick={closeMenu}
                        className="mobile-navigation__link"
                      >
                        <span>{link.label}</span>
                        <ArrowRight size={17} aria-hidden="true" />
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>

              <Link
                to="/get-quote"
                onClick={closeMenu}
                className="mobile-navigation__cta"
              >
                Get Quote
                <ArrowRight size={18} aria-hidden="true" />
              </Link>

              <div className="mobile-navigation__contact">
                <p>PowerNex Solutions</p>
                {CONTACT.phone && <a href={`tel:${CONTACT.phoneHref}`}>{CONTACT.phone}</a>}
                {CONTACT.email && <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );

  return (
    <>
      <motion.header
        initial={false}
        style={{ top: "var(--topbar-height)" }}
        animate={{ y: scrolled ? "calc(-1 * var(--topbar-height))" : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`site-header fixed left-0 w-full z-[100] transition-colors duration-500 ${
          scrolled
            ? "bg-slate-950 shadow-lg shadow-green-500/10 py-3"
            : "bg-transparent py-6"
        }`}
      >
        <nav className="site-container flex items-center justify-between gap-4" aria-label="Primary navigation">
          <Link to="/" className="flex shrink-0 items-center" aria-label={`${BRAND.name} home`}>
            <img
              src={BRAND.logo.onDark}
              alt={BRAND.name}
              className="h-auto w-[6.5rem] object-contain sm:w-[7.5rem] lg:w-[clamp(9rem,13vw,11rem)]"
            />
          </Link>

          <ul className="hidden xl:flex items-center gap-6 2xl:gap-9 font-medium text-white transition-colors duration-500">
            {navLinks.map((link) => (
              <li key={link.to} className="relative group">
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `cursor-pointer transition-colors ${isActive ? "text-[#4ade80]" : "text-white"}`
                  }
                >
                  {link.label}
                </NavLink>
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-300 group-hover:w-full" />
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <div className="relative hidden xl:flex items-center">
              <AnimatePresence>
                {searchOpen && (
                  <motion.input
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 180, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    type="search"
                    placeholder="Search..."
                    aria-label="Search PowerNex"
                    className="mr-2 px-3 py-1.5 rounded-full text-sm outline-none border bg-white/10 border-white/30 text-white placeholder-white/60"
                  />
                )}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSearchOpen((previous) => !previous)}
                className="tap-target p-2 rounded-full text-white hover:bg-white/10 transition-colors"
                aria-label={searchOpen ? "Close search" : "Open search"}
              >
                {searchOpen ? <X size={20} /> : <Search size={20} />}
              </motion.button>
            </div>

            <NavLink to="/get-quote" className={({ isActive }) => `hidden xl:block rounded-full ${isActive ? "ring-2 ring-[#4ade80] ring-offset-2 ring-offset-slate-950" : ""}`} aria-label="Get a quote">
              <motion.span
                className="tap-target relative flex items-center overflow-hidden px-6 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/30"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Get Quote</span>
              </motion.span>
            </NavLink>

            <button
              ref={toggleRef}
              type="button"
              className="navigation-toggle tap-target xl:hidden flex items-center justify-center rounded-full border border-white/30 bg-slate-950/45 text-white"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? "close" : "menu"}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: reduceMotion ? 0 : 0.15 }}
                  aria-hidden="true"
                >
                  {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>
      {mobileNavigation}
    </>
  );
}
