export function trackEvent(name, metadata = {}) {
    if (typeof window === "undefined") return;

    // Non-PII event hook. A future analytics adapter may listen for this event.
    window.dispatchEvent(new CustomEvent("powernex:analytics", {
        detail: { name, metadata },
    }));
}
