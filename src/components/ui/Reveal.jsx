import { motion, useReducedMotion } from "motion/react";

export default function Reveal({ children, className = "", delay = 0, direction = "up", as = "div" }) {
    const reduceMotion = useReducedMotion();
    const Component = motion[as] || motion.div;
    const offset = direction === "left" ? { x: -28 } : direction === "right" ? { x: 28 } : { y: 28 };

    return (
        <Component
            initial={reduceMotion ? false : { opacity: 0, ...offset }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: reduceMotion ? 0 : 0.75, delay: reduceMotion ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
            className={className}
        >
            {children}
        </Component>
    );
}
