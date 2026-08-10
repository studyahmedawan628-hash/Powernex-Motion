import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, CheckCircle2, Clipboard, ExternalLink, Mail, MapPin, MessageCircle, Phone, ShieldCheck, ThumbsDown, ThumbsUp } from "lucide-react";
import SiteLayout from "../components/layout/SiteLayout";
import Reveal from "../components/ui/Reveal";
import { CONTACT } from "../config/contact";
import { contactChannels, contactFaqs, contactIntents, enquiryTypes, intentHelp, nextSteps } from "../data/contact";
import { trackEvent } from "../utils/analytics";
import "../contact-page.css";

const channelIcons = { phone: Phone, whatsapp: MessageCircle, email: Mail, location: MapPin };

function NetworkGraphic() {
    return (
        <svg className="contact-network" viewBox="0 0 720 500" aria-hidden="true">
            <defs><linearGradient id="contact-line" x1="0" x2="1"><stop stopColor="#38bdf8" stopOpacity=".12" /><stop offset=".55" stopColor="#4ade80" stopOpacity=".65" /><stop offset="1" stopColor="#4ade80" stopOpacity=".08" /></linearGradient></defs>
            <path d="M86 252 C210 76 345 86 410 205 S565 430 654 253" />
            <path d="M86 252 C224 410 346 409 410 294 S560 72 654 253" />
            <path d="M86 252 C245 252 330 252 654 253" />
            <circle cx="86" cy="252" r="6" /><circle cx="410" cy="205" r="6" /><circle cx="410" cy="294" r="6" /><circle cx="654" cy="253" r="9" />
            <circle className="contact-network__signal contact-network__signal--one" cx="86" cy="252" r="4" />
            <circle className="contact-network__signal contact-network__signal--two" cx="410" cy="294" r="4" />
            <text x="48" y="285">CUSTOMER</text><text x="364" y="178">POWERNEX</text><text x="355" y="333">ENGINEERING</text><text x="618" y="288">SOLUTION</text>
        </svg>
    );
}

function ContactChannels() {
    const [copied, setCopied] = useState("");

    const copyValue = async (channel) => {
        try {
            if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(channel.copyValue);
            else {
                const temporary = document.createElement("textarea");
                temporary.value = channel.copyValue;
                temporary.style.position = "fixed";
                temporary.style.opacity = "0";
                document.body.appendChild(temporary);
                temporary.select();
                document.execCommand("copy");
                temporary.remove();
            }
            setCopied(channel.id);
            trackEvent("contact_copy_value", { method: channel.id });
            window.setTimeout(() => setCopied(""), 1500);
        } catch {
            setCopied("");
        }
    };

    if (!contactChannels.length) return null;

    return (
        <section className="contact-channels section-pad" aria-labelledby="channels-title">
            <div className="site-container">
                <Reveal className="contact-section-heading"><p className="section-eyebrow"><span />Direct contact</p><h2 id="channels-title">Choose the channel<br />that works for you.</h2></Reveal>
                <div className="contact-channel-list">
                    {contactChannels.map((channel, index) => {
                        const Icon = channelIcons[channel.id];
                        return (
                            <Reveal as="article" key={channel.id} delay={index * .06} className="contact-channel">
                                <span className="contact-channel__number">{String(index + 1).padStart(2, "0")}</span>
                                <Icon aria-hidden="true" />
                                <div><small>{channel.title}</small><strong>{channel.value}</strong></div>
                                <a href={channel.href || undefined} target={channel.external ? "_blank" : undefined} rel={channel.external ? "noreferrer" : undefined} onClick={() => trackEvent("contact_channel_click", { method: channel.id })}>{channel.action}<ArrowRight /></a>
                                {channel.copyValue && <button type="button" onClick={() => copyValue(channel)} aria-label={`Copy ${channel.title.toLowerCase()}`}><Clipboard /> <span aria-live="polite">{copied === channel.id ? "Copied" : "Copy"}</span></button>}
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

const initialForm = { fullName: "", phone: "", email: "", type: "General Enquiry", message: "" };

function validateForm(form) {
    const errors = {};
    const name = form.fullName.trim();
    const phone = form.phone.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name) errors.fullName = "Please enter your full name.";
    else if (name.length < 2) errors.fullName = "Enter at least two characters for your name.";
    else if (name.length > 80) errors.fullName = "Keep your name within 80 characters.";
    if (phone) {
        const digitCount = phone.replace(/\D/g, "").length;
        if (!/^[+()\-\s\d]+$/.test(phone) || digitCount < 7 || digitCount > 15) errors.phone = "Enter a phone number using 7 to 15 digits.";
    }
    if (!email) errors.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter an email in the format name@example.com.";
    else if (email.length > 120) errors.email = "Keep your email within 120 characters.";
    if (!form.type) errors.type = "Choose the enquiry type that fits best.";
    if (!message) errors.message = "Please tell us briefly how we can help.";
    else if (message.length < 20) errors.message = "Add a little more detail—at least 20 characters.";
    else if (message.length > 1000) errors.message = "Keep your message within 1,000 characters.";
    return errors;
}

function ContactForm({ requestedType, contextItem }) {
    const [form, setForm] = useState(() => ({ ...initialForm, type: requestedType || initialForm.type }));
    const [errors, setErrors] = useState({});
    const [ready, setReady] = useState(false);
    const started = useRef(false);

    const updateField = (field, value) => {
        setForm((current) => ({ ...current, [field]: value }));
        if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
        setReady(false);
    };

    const startForm = () => {
        if (started.current) return;
        started.current = true;
        trackEvent("contact_form_start", { section: "contact_form" });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        trackEvent("contact_form_attempt", { intent: form.type });
        const nextErrors = validateForm(form);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length) {
            trackEvent("contact_form_validation_error", { fields: Object.keys(nextErrors) });
            requestAnimationFrame(() => document.getElementById(`contact-${Object.keys(nextErrors)[0]}`)?.focus());
            return;
        }
        setReady(true);
        trackEvent("contact_form_ready", { intent: form.type });
    };

    const errorCount = Object.keys(errors).filter((key) => errors[key]).length;
    const summaryRows = [
        ["Type", form.type || "Not selected"],
        ["Contact", form.email ? (form.phone ? "Email or phone" : "Email") : "Not ready"],
        ["Message", form.message.trim().length >= 20 ? "Ready for review" : "Needs more detail"],
    ];

    return (
        <section id="contact-form" className="contact-form-section section-pad" aria-labelledby="form-title">
            <div className="site-container contact-form-shell">
                <Reveal className="contact-form-heading">
                    <p className="section-eyebrow"><span />Short enquiry</p>
                    <h2 id="form-title">Tell us how<br />we can help.</h2>
                    <p>Fields marked “Required” must be completed. Detailed system requirements belong in the guided quote experience.</p>
                    {contextItem && <div className="contact-context"><span>Regarding</span><strong>{contextItem}</strong></div>}
                </Reveal>

                <Reveal className="contact-form-panel">
                    {!ready ? (
                        <form onSubmit={handleSubmit} onFocus={startForm} noValidate>
                            {errorCount > 0 && (
                                <div className="contact-error-summary" role="alert" aria-labelledby="contact-error-title">
                                    <strong id="contact-error-title">Please check {errorCount} field{errorCount === 1 ? "" : "s"}</strong>
                                    <ul>{Object.entries(errors).filter(([, error]) => error).map(([field, error]) => <li key={field}><a href={`#contact-${field}`} onClick={() => document.getElementById(`contact-${field}`)?.focus()}>{error}</a></li>)}</ul>
                                </div>
                            )}

                            <div className="contact-fields">
                                <label className={errors.fullName ? "invalid" : ""} htmlFor="contact-fullName"><span>Full name <em>Required</em></span><input id="contact-fullName" name="fullName" value={form.fullName} onChange={(event) => updateField("fullName", event.target.value)} autoComplete="name" maxLength="80" aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? "contact-fullName-error" : undefined} />{errors.fullName && <small id="contact-fullName-error">{errors.fullName}</small>}</label>
                                <label className={errors.phone ? "invalid" : ""} htmlFor="contact-phone"><span>Phone / WhatsApp <em>Optional</em></span><input id="contact-phone" name="phone" type="tel" inputMode="tel" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} autoComplete="tel" maxLength="30" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "contact-phone-error" : undefined} />{errors.phone && <small id="contact-phone-error">{errors.phone}</small>}</label>
                                <label className={errors.email ? "invalid" : ""} htmlFor="contact-email"><span>Email address <em>Required</em></span><input id="contact-email" name="email" type="email" inputMode="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} autoComplete="email" maxLength="120" placeholder="name@example.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} />{errors.email && <small id="contact-email-error">{errors.email}</small>}</label>
                                <label className={errors.type ? "invalid" : ""} htmlFor="contact-type"><span>Enquiry type <em>Required</em></span><select id="contact-type" name="type" value={form.type} onChange={(event) => { updateField("type", event.target.value); trackEvent("contact_intent_select", { intent: event.target.value, source: "form" }); }} aria-invalid={Boolean(errors.type)} aria-describedby={`contact-type-help${errors.type ? " contact-type-error" : ""}`}>{enquiryTypes.map((type) => <option key={type}>{type}</option>)}</select><small id="contact-type-help" className="contact-field-help">{intentHelp[form.type]}</small>{errors.type && <small id="contact-type-error">{errors.type}</small>}</label>
                                <label className={`contact-message-field ${errors.message ? "invalid" : ""}`} htmlFor="contact-message"><span>Message <em>Required</em></span><textarea id="contact-message" name="message" rows="7" value={form.message} onChange={(event) => updateField("message", event.target.value)} maxLength="1000" aria-invalid={Boolean(errors.message)} aria-describedby={`contact-message-help${errors.message ? " contact-message-error" : ""}`} /><span className="contact-message-meta"><small id="contact-message-help">Tell us briefly what you need help with.</small><output aria-live="polite">{form.message.length} / 1000</output></span>{errors.message && <small id="contact-message-error">{errors.message}</small>}</label>
                            </div>

                            <div className="contact-privacy"><ShieldCheck aria-hidden="true" /><p><strong>Privacy note</strong>Your entries remain in this browser session. The form is not connected to a submission service and stores nothing in local storage.</p></div>
                            <button type="submit" className="button button--primary contact-submit">Validate enquiry <ArrowRight /></button>
                        </form>
                    ) : (
                        <div className="contact-ready" role="status">
                            <CheckCircle2 aria-hidden="true" />
                            <p className="section-eyebrow"><span />Form validated</p>
                            <h3>Contact form<br />ready for connection.</h3>
                            <p>Your details passed the interface validation. Nothing was delivered because a PowerNex submission backend has not been connected.</p>
                            <button type="button" className="button button--outline" onClick={() => setReady(false)}>Review enquiry</button>
                        </div>
                    )}
                </Reveal>

                <Reveal as="aside" className="contact-summary" aria-labelledby="summary-title">
                    <p className="section-eyebrow"><span />Live summary</p><h3 id="summary-title">Your enquiry</h3>
                    <dl>{summaryRows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
                    <p>No personal values are repeated in this summary.</p>
                </Reveal>
            </div>
        </section>
    );
}

function Feedback() {
    const [answer, setAnswer] = useState("");
    const [reason, setReason] = useState("");

    const choose = (value) => {
        setAnswer(value);
        if (value === "yes") setReason("");
        trackEvent("contact_page_feedback", { helpful: value });
    };

    return (
        <div className="contact-feedback">
            <p>Was this page helpful?</p>
            {!answer ? <div><button type="button" onClick={() => choose("yes")}><ThumbsUp /> Yes</button><button type="button" onClick={() => choose("no")}><ThumbsDown /> Not really</button></div> : <p className="contact-feedback__thanks" role="status"><Check /> Thank you for the feedback.</p>}
            {answer === "no" && <fieldset><legend>What was missing?</legend>{["Contact information", "Form clarity", "Navigation", "Other"].map((item) => <label key={item}><input type="radio" name="feedback-reason" value={item} checked={reason === item} onChange={() => { setReason(item); trackEvent("contact_page_feedback", { helpful: "no", reason: item.toLowerCase().replaceAll(" ", "_") }); }} /><span>{item}</span></label>)}</fieldset>}
        </div>
    );
}

export default function Contact() {
    const [searchParams] = useSearchParams();
    const reduceMotion = useReducedMotion();
    const queryType = searchParams.get("type")?.toLowerCase();
    const contextItem = useMemo(() => (searchParams.get("item") || "").replace(/[<>]/g, "").slice(0, 100), [searchParams]);
    const preselectedType = useMemo(() => ({ product: "Product Enquiry", project: "Project Enquiry", support: "Existing System Support", solar: "Solar Consultation", service: "Solar Consultation", partnership: "Business / Partnership" }[queryType] || ""), [queryType]);
    const [selectedIntent, setSelectedIntent] = useState(() => contactIntents.find((intent) => intent.title === preselectedType)?.id || "");
    const requestedType = contactIntents.find((intent) => intent.id === selectedIntent)?.title || preselectedType;

    useEffect(() => { trackEvent("contact_page_view", { page: "contact" }); }, []);

    const selectIntent = (intent) => {
        setSelectedIntent(intent.id);
        trackEvent("contact_intent_select", { intent: intent.title, source: "router" });
        window.setTimeout(() => document.getElementById("contact-form")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" }), reduceMotion ? 0 : 120);
    };

    return (
        <SiteLayout>
            <section className="contact-hero" aria-labelledby="contact-title">
                <div className="contact-hero__grid" aria-hidden="true" />
                <NetworkGraphic />
                <div className="site-container contact-hero__content">
                    <motion.p initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }} className="section-eyebrow"><span />Contact PowerNex</motion.p>
                    <div className="contact-hero__mask"><motion.h1 id="contact-title" initial={reduceMotion ? false : { y: "105%" }} animate={{ y: 0 }} transition={{ duration: .8, ease: [0.16, 1, 0.3, 1] }}>Let's talk<br /><em>energy.</em></motion.h1></div>
                    <motion.p initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .6, delay: .18 }}>Questions about solar, products, projects, or support? Choose the clearest route for your enquiry.</motion.p>
                    <motion.div initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .28 }} className="contact-hero__actions"><a href="#intent-router" className="button button--primary">Choose a route <ArrowRight /></a><Link to="/get-quote" className="button button--outline" onClick={() => trackEvent("contact_get_quote_click", { source: "hero" })}>Start a quote</Link></motion.div>
                </div>
                <div className="contact-hero__status"><span>Simple enquiry</span><i /><span>Guided quote</span><i /><span>Direct channels when verified</span></div>
            </section>

            <section id="intent-router" className="contact-intents section-pad" aria-labelledby="intent-title">
                <div className="site-container">
                    <Reveal className="contact-intents__heading"><div><p className="section-eyebrow"><span />Start here</p><h2 id="intent-title">How can<br />we help?</h2></div><p>Choose the closest match. It will prepare the short form with the right enquiry type—nothing is submitted automatically.</p></Reveal>
                    <div className="contact-intent-grid">
                        {contactIntents.map((intent, index) => {
                            const Icon = intent.icon;
                            const active = selectedIntent === intent.id;
                            return <Reveal key={intent.id} delay={(index % 3) * .055} className={`contact-intent ${active ? "active" : ""}`}><button type="button" onClick={() => selectIntent(intent)} aria-pressed={active}><span>{intent.number}</span><Icon aria-hidden="true" /><strong>{intent.title}</strong><small>{intent.description}</small><ArrowRight aria-hidden="true" /></button>{intent.quoteRoute && <Link to="/get-quote" onClick={() => trackEvent("contact_get_quote_click", { source: "intent_router" })}>Detailed request <ExternalLink /></Link>}</Reveal>;
                        })}
                    </div>
                </div>
            </section>

            <ContactChannels />
            <ContactForm key={requestedType || "general"} requestedType={requestedType} contextItem={contextItem} />

            {CONTACT.location && (
                <section className="contact-location section-pad" aria-labelledby="location-title"><div className="site-container contact-location__grid"><Reveal><p className="section-eyebrow"><span />PowerNex location</p><h2 id="location-title">{CONTACT.location}</h2>{CONTACT.address && <p>{CONTACT.address}</p>}{CONTACT.businessHours && <p>{CONTACT.businessHours}</p>}{CONTACT.mapHref && <a href={CONTACT.mapHref} target="_blank" rel="noreferrer" className="button button--outline">Get directions <ExternalLink /></a>}</Reveal><Reveal className="contact-location__visual"><MapPin /><span>Verified office information</span></Reveal></div></section>
            )}

            <section className="contact-next section-pad" aria-labelledby="next-title">
                <div className="site-container">
                    <Reveal className="contact-section-heading"><p className="section-eyebrow"><span />Clear expectations</p><h2 id="next-title">What happens<br />next?</h2></Reveal>
                    <Reveal className="contact-next__timeline">{nextSteps.map(([number, title, copy]) => <article key={number}><span>{number}</span><i /><h3>{title}</h3><p>{copy}</p></article>)}</Reveal>
                </div>
            </section>

            <section className="contact-help section-pad" aria-labelledby="help-title">
                <div className="site-container contact-help__grid">
                    <Reveal><p className="section-eyebrow"><span />Quick help</p><h2 id="help-title">The right route,<br />without the guesswork.</h2><Feedback /></Reveal>
                    <Reveal className="contact-faqs">{contactFaqs.map((faq) => <details key={faq.question} onToggle={(event) => event.currentTarget.open && trackEvent("contact_faq_expand", { question: faq.question })}><summary>{faq.question}<span>+</span></summary><p>{faq.answer}</p></details>)}</Reveal>
                </div>
            </section>

            <section className="contact-quote-cta section-pad">
                <div className="contact-quote-cta__grid" aria-hidden="true" />
                <div className="site-container contact-quote-cta__content"><Reveal><p className="section-eyebrow"><span />Ready to plan your system?</p><h2>Need more than<br />a quick message?</h2></Reveal><Reveal className="contact-quote-cta__actions"><p>Use the guided PowerNex quote experience to describe your property, energy needs, and solution interests.</p><div><Link to="/get-quote" className="button button--primary" onClick={() => trackEvent("contact_get_quote_click", { source: "closing_cta" })}>Start your quote <ArrowRight /></Link><Link to="/services" className="button button--outline">Explore services</Link></div></Reveal></div>
            </section>
        </SiteLayout>
    );
}
