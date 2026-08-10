import { motion, useReducedMotion } from "motion/react";

export default function InnerHero({ eyebrow, title, accent, description, variant, image, children }) {
    const reduceMotion = useReducedMotion();

    return (
        <section className={`inner-hero inner-hero--${variant || "default"}`}>
            {image && <img src={image} alt="" aria-hidden="true" className="inner-hero__image" />}
            <div className="inner-hero__wash" />
            <div className="technical-grid" aria-hidden="true" />
            <div className="inner-hero__orb" aria-hidden="true" />
            <div className="site-container inner-hero__content">
                <motion.p initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="section-eyebrow">
                    <span />{eyebrow}
                </motion.p>
                <div className="inner-hero__title-wrap">
                    <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 45 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}>
                        {title}<br /><span>{accent}</span>
                    </motion.h1>
                </div>
                <motion.p initial={reduceMotion ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }} className="inner-hero__description">
                    {description}
                </motion.p>
                {children}
            </div>
            <div className="inner-hero__baseline" aria-hidden="true"><span /></div>
        </section>
    );
}
