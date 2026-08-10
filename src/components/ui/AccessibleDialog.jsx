import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export default function AccessibleDialog({ open, onClose, title, label, children, className = "", onKeyDown }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        if (!open) return undefined;
        const previousFocus = document.activeElement;
        document.body.classList.add("dialog-open");
        const focusFrame = requestAnimationFrame(() => dialogRef.current?.focus());

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                event.preventDefault();
                onClose();
                return;
            }
            onKeyDown?.(event);
            if (event.key !== "Tab" || !dialogRef.current) return;
            const focusable = [...dialogRef.current.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')];
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
            document.body.classList.remove("dialog-open");
            previousFocus?.focus?.();
        };
    }, [open, onClose, onKeyDown]);

    if (!open) return null;

    return createPortal(
        <div className="dialog-layer" role="presentation">
            <button type="button" className="dialog-backdrop" aria-label="Close dialog" onClick={onClose} />
            <section ref={dialogRef} role="dialog" aria-modal="true" aria-label={label || title} tabIndex={-1} className={`dialog-panel ${className}`}>
                <div className="dialog-panel__bar">
                    <p>{title}</p>
                    <button type="button" className="icon-button" onClick={onClose} aria-label="Close dialog"><X size={20} /></button>
                </div>
                {children}
            </section>
        </div>,
        document.body,
    );
}
