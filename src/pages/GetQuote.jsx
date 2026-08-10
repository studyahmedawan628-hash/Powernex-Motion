import { useEffect, useReducer, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, BatteryCharging, Check, CheckCircle2, ChevronDown, CircleHelp, Edit3, Home, Mail, MapPin, MessageCircle, Phone, RotateCcw, ShieldCheck, Sparkles, SunMedium, ThumbsDown, ThumbsUp } from "lucide-react";
import SiteLayout from "../components/layout/SiteLayout";
import Reveal from "../components/ui/Reveal";
import { contactChannels } from "../data/contact";
import {
    backupLoads, backupOptions, billRanges, existingSolarOptions, initialQuote, installationTypes,
    priorities, projectTypes, propertyTypes, quoteFaqs, quoteNextSteps, quotePrefill, quoteSteps,
    responseMethods, solutionInterests, storagePurposes, timelines, usagePatterns,
} from "../data/quote";
import { trackEvent } from "../utils/analytics";
import "../quote-page.css";

const contactIcons = { phone: Phone, whatsapp: MessageCircle, email: Mail, location: MapPin };

function quoteReducer(state, action) {
    if (action.type === "field") return { ...state, [action.field]: action.value };
    if (action.type === "toggle") {
        const values = state[action.field];
        return { ...state, [action.field]: values.includes(action.value) ? values.filter((value) => value !== action.value) : [...values, action.value] };
    }
    if (action.type === "reset") return { ...initialQuote, ...action.value };
    return state;
}

function ChoiceGroup({ legend, name, options, value, onChange, multiple = false, columns = "compact", help, error, why }) {
    return (
        <fieldset className={`quote-choice-group quote-choice-group--${columns}`} aria-describedby={error ? `${name}-error` : undefined}>
            <legend>{legend}</legend>
            {help && <p className="quote-question-help">{help}</p>}
            {why && <details className="quote-why"><summary><CircleHelp /> Why we ask</summary><p>{why}</p></details>}
            <div className="quote-choice-list">
                {options.map((option) => {
                    const item = typeof option === "string" ? { value: option } : option;
                    const selected = multiple ? value.includes(item.value) : value === item.value;
                    const Icon = item.icon;
                    return (
                        <label key={item.value} className={selected ? "selected" : ""}>
                            <input type={multiple ? "checkbox" : "radio"} name={name} value={item.value} checked={selected} onChange={() => onChange(item.value)} />
                            {Icon && <Icon aria-hidden="true" />}
                            <span><strong>{item.value}</strong>{item.description && <small>{item.description}</small>}</span>
                            <i aria-hidden="true">{selected && <Check />}</i>
                        </label>
                    );
                })}
            </div>
            {error && <p id={`${name}-error`} className="quote-field-error" role="alert">{error}</p>}
        </fieldset>
    );
}

function SelectField({ id, label, value, onChange, options, error, optional = false, help }) {
    return (
        <label className={`quote-input-field ${error ? "invalid" : ""}`} htmlFor={id}>
            <span>{label} <em>{optional ? "Optional" : "Required"}</em></span>
            <select id={id} value={value} onChange={(event) => onChange(event.target.value)} aria-invalid={Boolean(error)} aria-describedby={[help && `${id}-help`, error && `${id}-error`].filter(Boolean).join(" ") || undefined}>
                <option value="">Choose an option</option>
                {options.map((option) => <option key={option}>{option}</option>)}
            </select>
            {help && <small id={`${id}-help`}>{help}</small>}
            {error && <small id={`${id}-error`} className="quote-field-error">{error}</small>}
        </label>
    );
}

function TextField({ id, label, value, onChange, error, optional = false, type = "text", autoComplete, maxLength = 100, placeholder }) {
    return (
        <label className={`quote-input-field ${error ? "invalid" : ""}`} htmlFor={id}>
            <span>{label} <em>{optional ? "Optional" : "Required"}</em></span>
            <input id={id} type={type} value={value} onChange={(event) => onChange(event.target.value)} autoComplete={autoComplete} maxLength={maxLength} placeholder={placeholder} inputMode={type === "tel" ? "tel" : type === "email" ? "email" : undefined} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} />
            {error && <small id={`${id}-error`} className="quote-field-error">{error}</small>}
        </label>
    );
}

function ProjectStep({ quote, update, errors }) {
    const upgrade = quote.projectType === "Solar Upgrade / Existing System";
    const storage = quote.projectType === "Energy Storage";
    return (
        <>
            <div className="quote-step-heading"><p>01 / Project</p><h2 id="quote-step-title" tabIndex="-1">Tell us about<br />the site.</h2><span>Not sure about a detail? Choose “Not Sure” and continue.</span></div>
            <ChoiceGroup legend="What are you planning?" name="projectType" options={projectTypes} value={quote.projectType} onChange={(value) => update("projectType", value)} columns="project" error={errors.projectType} />
            <div className="quote-field-grid">
                <TextField id="quote-city" label="City / Area" value={quote.city} onChange={(value) => update("city", value)} error={errors.city} maxLength={80} />
                <SelectField id="quote-propertyType" label="Property type" value={quote.propertyType} onChange={(value) => update("propertyType", value)} options={propertyTypes} error={errors.propertyType} />
                <SelectField id="quote-installationType" label="Installation type" value={quote.installationType} onChange={(value) => update("installationType", value)} options={installationTypes} error={errors.installationType} />
                {storage && <SelectField id="quote-storagePurpose" label="Storage purpose" value={quote.storagePurpose} onChange={(value) => update("storagePurpose", value)} options={storagePurposes} error={errors.storagePurpose} />}
            </div>
            {upgrade && <ChoiceGroup legend="Do you know the current system size?" name="currentSizeKnown" options={["Yes", "No", "Not Sure"]} value={quote.currentSizeKnown} onChange={(value) => update("currentSizeKnown", value)} error={errors.currentSizeKnown} />}
            {upgrade && quote.currentSizeKnown === "Yes" && <TextField id="quote-currentSystemSize" label="Current system size/details" value={quote.currentSystemSize} onChange={(value) => update("currentSystemSize", value)} optional maxLength={120} placeholder="Enter only if known" />}
        </>
    );
}

function EnergyStep({ quote, update, errors }) {
    return (
        <>
            <div className="quote-step-heading"><p>02 / Energy</p><h2 id="quote-step-title" tabIndex="-1">Help us understand<br />your energy needs.</h2><span>These selections describe context only. They do not calculate a system size or price.</span></div>
            <ChoiceGroup legend="Approximate monthly electricity bill" name="billRange" options={billRanges} value={quote.billRange} onChange={(value) => update("billRange", value)} error={errors.billRange} why="A bill range helps describe the scale of current electricity use. It does not produce an automated system recommendation." />
            <ChoiceGroup legend="When do you use most of your electricity?" name="usagePattern" options={usagePatterns} value={quote.usagePattern} onChange={(value) => update("usagePattern", value)} error={errors.usagePattern} />
            <ChoiceGroup legend="Is backup power important?" name="backupNeed" options={backupOptions} value={quote.backupNeed} onChange={(value) => update("backupNeed", value)} error={errors.backupNeed} />
            {quote.backupNeed === "Yes" && <ChoiceGroup legend="How much should backup cover?" name="backupLoads" options={backupLoads} value={quote.backupLoads} onChange={(value) => update("backupLoads", value)} error={errors.backupLoads} />}
            <ChoiceGroup legend="Do you already have solar?" name="existingSolar" options={existingSolarOptions} value={quote.existingSolar} onChange={(value) => update("existingSolar", value)} error={errors.existingSolar} />
            {(quote.existingSolar === "Yes" || quote.existingSolar === "Partially Installed") && <TextField id="quote-existingSystemDetails" label="Current system details" value={quote.existingSystemDetails} onChange={(value) => update("existingSystemDetails", value)} optional maxLength={300} placeholder="Share only what you already know" />}
        </>
    );
}

function PreferencesStep({ quote, toggle, update, errors }) {
    return (
        <>
            <div className="quote-step-heading"><p>03 / Preferences</p><h2 id="quote-step-title" tabIndex="-1">What matters<br />most to you?</h2><span>Select the direction that fits. “Recommend for Me” keeps technical choices optional.</span></div>
            <ChoiceGroup legend="Project priorities" name="priorities" options={priorities} value={quote.priorities} onChange={(value) => toggle("priorities", value)} multiple error={errors.priorities} help="Choose up to three priorities." />
            <ChoiceGroup legend="Solution interests" name="solutionInterests" options={solutionInterests} value={quote.solutionInterests} onChange={(value) => toggle("solutionInterests", value)} multiple error={errors.solutionInterests} help="Choose any relevant areas, or select Recommend for Me." />
            <ChoiceGroup legend="When are you considering the project?" name="timeline" options={timelines} value={quote.timeline} onChange={(value) => update("timeline", value)} error={errors.timeline} />
        </>
    );
}

function ReviewRow({ title, step, onEdit, children }) {
    return <section className="quote-review-row"><div><span>{String(step + 1).padStart(2, "0")}</span><h3>{title}</h3><button type="button" onClick={() => onEdit(step)}><Edit3 /> Edit</button></div>{children}</section>;
}

function ReviewStep({ quote, update, errors, onEdit, onSubmit }) {
    const showPreference = responseMethods.length > 1;
    return (
        <>
            <div className="quote-step-heading"><p>04 / Review & contact</p><h2 id="quote-step-title" tabIndex="-1">Review your<br />project brief.</h2><span>Contact information comes last. Personal values are not repeated in the project summary.</span></div>
            <div className="quote-review-list">
                <ReviewRow title="Project" step={0} onEdit={onEdit}><p>{[quote.projectType, quote.city, quote.propertyType, quote.installationType].filter(Boolean).join(" · ")}</p></ReviewRow>
                <ReviewRow title="Energy" step={1} onEdit={onEdit}><p>{[quote.billRange, quote.usagePattern, quote.backupNeed && `Backup: ${quote.backupNeed}`, quote.existingSolar && `Existing solar: ${quote.existingSolar}`].filter(Boolean).join(" · ")}</p></ReviewRow>
                <ReviewRow title="Preferences" step={2} onEdit={onEdit}><p>{[quote.priorities.join(", "), quote.solutionInterests.join(", "), quote.timeline].filter(Boolean).join(" · ")}</p></ReviewRow>
            </div>
            <fieldset className="quote-contact-fields">
                <legend>Where should we reach you?</legend>
                <p>A phone number or email address is required. No information leaves this browser in the current frontend-only experience.</p>
                <div className="quote-field-grid">
                    <TextField id="quote-fullName" label="Full name" value={quote.fullName} onChange={(value) => update("fullName", value)} error={errors.fullName} autoComplete="name" maxLength={80} />
                    <TextField id="quote-phone" label="Phone / WhatsApp" value={quote.phone} onChange={(value) => update("phone", value)} error={errors.phone} type="tel" autoComplete="tel" maxLength={30} optional={Boolean(quote.email)} />
                    <TextField id="quote-email" label="Email address" value={quote.email} onChange={(value) => update("email", value)} error={errors.email} type="email" autoComplete="email" maxLength={120} placeholder="name@example.com" optional={Boolean(quote.phone)} />
                    {showPreference && <SelectField id="quote-responseMethod" label="Preferred contact method" value={quote.responseMethod} onChange={(value) => update("responseMethod", value)} options={responseMethods} error={errors.responseMethod} />}
                    <SelectField id="quote-contactTime" label="Best contact time" value={quote.contactTime} onChange={(value) => update("contactTime", value)} options={["Morning", "Afternoon", "Evening", "No Preference"]} optional />
                </div>
            </fieldset>
            <div className="quote-privacy-note"><ShieldCheck /><p><strong>Your information</strong>We only ask for information needed to understand and respond to a project request once submission is connected. Frontend validation is for usability, not backend security.</p></div>
            <button type="button" className="button button--primary quote-request-button" onClick={onSubmit}>Prepare project brief <ArrowRight /></button>
        </>
    );
}

function ProjectDiagram({ quote }) {
    const storage = quote.solutionInterests.includes("Battery Storage") || quote.projectType === "Energy Storage";
    const ev = quote.solutionInterests.includes("EV Charging") || quote.projectType === "EV Charging";
    return <div className="quote-system-diagram" aria-label="Illustrative energy flow, not an engineering calculation"><span><SunMedium />Solar</span><i /><span><Home />Site</span>{storage && <><i /><span><BatteryCharging />Storage</span></>}{ev && <><i /><span><Sparkles />EV</span></>}</div>;
}

function ProjectSummary({ quote, step, onEdit, mobile = false }) {
    const completion = step >= 3 ? 75 : step * 25;
    const rows = [
        ["Project", quote.projectType, 0],
        ["Location", quote.city, 0],
        ["Property", [quote.propertyType, quote.installationType].filter(Boolean).join(" / "), 0],
        ["Energy", quote.billRange, 1],
        ["Priority", quote.priorities.join(", "), 2],
        ["System interest", quote.solutionInterests.join(", "), 2],
    ].filter(([, value]) => value);
    const content = <><div className="quote-summary-heading"><div><p>Project brief</p><strong>{completion}% complete</strong></div><div><span style={{ width: `${completion}%` }} /></div></div><ProjectDiagram quote={quote} /><dl>{rows.map(([label, value, editStep]) => <div key={label}><dt>{label}</dt><dd>{value}</dd>{editStep < step && <button type="button" onClick={() => onEdit(editStep)}>Edit</button>}</div>)}</dl><p className="quote-summary-disclaimer">Illustrative summary only. No price, capacity, savings, or engineering result is calculated.</p></>;

    if (mobile) return <details className="quote-mobile-summary"><summary>Your project <ChevronDown /></summary>{content}</details>;
    return <aside className="quote-project-summary" aria-label="Your project summary">{content}</aside>;
}

function DirectContact() {
    if (!contactChannels.length) return null;
    return (
        <section id="quote-contact-options" className="quote-direct section-pad"><div className="site-container quote-direct__grid"><Reveal><p className="section-eyebrow"><span />Another route</p><h2>Prefer to talk<br />to someone?</h2></Reveal><div className="quote-direct__links">{contactChannels.filter((channel) => channel.id !== "location").map((channel) => { const Icon = contactIcons[channel.id]; return <a key={channel.id} href={channel.href} target={channel.external ? "_blank" : undefined} rel={channel.external ? "noreferrer" : undefined} onClick={() => trackEvent("quote_direct_contact_click", { method: channel.id })}><Icon /><span><small>{channel.title}</small><strong>{channel.value}</strong></span><ArrowRight /></a>; })}</div></div></section>
    );
}

function QuoteFeedback() {
    const [answer, setAnswer] = useState("");
    const [reason, setReason] = useState("");
    const choose = (value) => { setAnswer(value); trackEvent("quote_feedback", { easy: value }); };
    return <div className="quote-feedback"><p>Was this quote experience easy to use?</p>{!answer ? <div><button type="button" onClick={() => choose("yes")}><ThumbsUp /> Yes</button><button type="button" onClick={() => choose("no")}><ThumbsDown /> Not really</button></div> : <p className="quote-feedback__thanks" role="status"><Check /> Thank you—your feedback helps improve the experience.</p>}{answer === "no" && <fieldset><legend>What made it difficult?</legend>{["Too many questions", "Questions were unclear", "Couldn't find my project type", "Technical terminology", "Other"].map((item) => <label key={item}><input type="radio" name="quote-feedback" checked={reason === item} onChange={() => { setReason(item); trackEvent("quote_feedback", { easy: "no", reason: item.toLowerCase().replaceAll(" ", "_") }); }} /><span>{item}</span></label>)}</fieldset>}</div>;
}

function validateStep(step, quote) {
    const errors = {};
    if (step === 0) {
        if (!quote.projectType) errors.projectType = "Choose a project type or select Not Sure.";
        if (!quote.city.trim()) errors.city = "Enter the city or area for the project.";
        if (!quote.propertyType) errors.propertyType = "Choose a property type or select Not Sure.";
        if (!quote.installationType) errors.installationType = "Choose an installation type or select Not Sure.";
        if (quote.projectType === "Energy Storage" && !quote.storagePurpose) errors.storagePurpose = "Choose the storage purpose or select Not Sure.";
        if (quote.projectType === "Solar Upgrade / Existing System" && !quote.currentSizeKnown) errors.currentSizeKnown = "Choose an answer or select Not Sure.";
    }
    if (step === 1) {
        if (!quote.billRange) errors.billRange = "Choose a bill range or select Not Sure.";
        if (!quote.usagePattern) errors.usagePattern = "Choose an energy-use pattern or select Not Sure.";
        if (!quote.backupNeed) errors.backupNeed = "Choose whether backup is important or select Not Sure.";
        if (quote.backupNeed === "Yes" && !quote.backupLoads) errors.backupLoads = "Choose the backup coverage or select Not Sure.";
        if (!quote.existingSolar) errors.existingSolar = "Choose an existing-solar answer or select Not Sure.";
    }
    if (step === 2) {
        if (!quote.priorities.length) errors.priorities = "Choose at least one priority, including Not Sure if needed.";
        if (quote.priorities.length > 3) errors.priorities = "Choose no more than three priorities.";
        if (!quote.solutionInterests.length) errors.solutionInterests = "Choose at least one solution or Recommend for Me.";
        if (!quote.timeline) errors.timeline = "Choose a project timeline or select Not Sure.";
    }
    if (step === 3) {
        const name = quote.fullName.trim();
        const phone = quote.phone.trim();
        const email = quote.email.trim();
        if (!name) errors.fullName = "Please enter your full name.";
        else if (name.length < 2) errors.fullName = "Enter at least two characters for your name.";
        if (!phone && !email) { errors.phone = "Enter a phone number or email address."; errors.email = "Enter an email address or phone number."; }
        if (phone) { const digits = phone.replace(/\D/g, "").length; if (!/^[+()\-\s\d]+$/.test(phone) || digits < 7 || digits > 15) errors.phone = "Enter a phone number using 7 to 15 digits."; }
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter an email in the format name@example.com.";
        if (quote.responseMethod === "Email" && !email) errors.email = "Enter an email address for your preferred response method.";
        if ((quote.responseMethod === "Phone" || quote.responseMethod === "WhatsApp") && !phone) errors.phone = "Enter a phone number for your preferred response method.";
    }
    return errors;
}

export default function GetQuote() {
    const [searchParams] = useSearchParams();
    const reduceMotion = useReducedMotion();
    const prefillKey = (searchParams.get("service") || searchParams.get("product") || "").toLowerCase();
    const prefill = quotePrefill[prefillKey] || {};
    const [quote, dispatch] = useReducer(quoteReducer, undefined, () => ({ ...initialQuote, ...prefill, solutionInterests: [...(prefill.solutionInterests || [])] }));
    const [step, setStep] = useState(0);
    const [errors, setErrors] = useState({});
    const [ready, setReady] = useState(false);
    const [started, setStarted] = useState(false);
    const stepRef = useRef(null);

    useEffect(() => { trackEvent("quote_page_view", { page: "get_quote" }); }, []);
    useEffect(() => { trackEvent("quote_step_view", { step: step + 1 }); }, [step]);

    const update = (field, value) => {
        dispatch({ type: "field", field, value });
        setErrors((current) => ({ ...current, [field]: undefined }));
        if (value === "Not Sure") trackEvent("quote_not_sure_select", { step: quoteSteps[step].toLowerCase(), field });
        if (field === "projectType") trackEvent("quote_project_type_select", { project_type: value });
    };
    const toggle = (field, value) => {
        if (field === "priorities" && !quote.priorities.includes(value) && quote.priorities.length >= 3) { setErrors((current) => ({ ...current, priorities: "Choose no more than three priorities." })); return; }
        dispatch({ type: "toggle", field, value });
        setErrors((current) => ({ ...current, [field]: undefined }));
        if (value === "Not Sure" || value === "Recommend for Me") trackEvent("quote_not_sure_select", { step: quoteSteps[step].toLowerCase(), field });
    };
    const focusStep = () => requestAnimationFrame(() => document.getElementById("quote-step-title")?.focus({ preventScroll: true }));
    const next = () => {
        const nextErrors = validateStep(step, quote);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length) {
            trackEvent("quote_validation_error", { step: quoteSteps[step].toLowerCase(), fields: Object.keys(nextErrors) });
            requestAnimationFrame(() => stepRef.current?.querySelector('[aria-invalid="true"], input, select')?.focus());
            return;
        }
        trackEvent("quote_step_complete", { step: quoteSteps[step].toLowerCase() });
        setStep((current) => Math.min(3, current + 1));
        focusStep();
    };
    const back = () => { trackEvent("quote_step_back", { step: quoteSteps[step].toLowerCase() }); setErrors({}); setStep((current) => Math.max(0, current - 1)); focusStep(); };
    const edit = (target) => { setReady(false); setErrors({}); setStep(target); trackEvent("quote_review_edit", { step: quoteSteps[target].toLowerCase() }); focusStep(); };
    const submit = () => {
        trackEvent("quote_submit_attempt", { project_type: quote.projectType });
        const nextErrors = validateStep(3, quote);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length) { trackEvent("quote_validation_error", { step: "review", fields: Object.keys(nextErrors) }); requestAnimationFrame(() => document.getElementById(`quote-${Object.keys(nextErrors)[0]}`)?.focus()); return; }
        setReady(true);
        trackEvent("quote_brief_ready", { project_type: quote.projectType });
    };
    const startOver = () => {
        if (!window.confirm("Clear this project brief and start over?")) return;
        dispatch({ type: "reset", value: prefill }); setStep(0); setErrors({}); setReady(false); setStarted(false); focusStep();
    };
    const selectIntent = (value) => {
        update("projectType", value); setStarted(true); trackEvent("quote_start", { source: "intent", project_type: value });
        window.setTimeout(() => document.getElementById("quote-builder")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" }), reduceMotion ? 0 : 100);
    };

    return (
        <SiteLayout>
            <section className="quote-hero" aria-labelledby="quote-title">
                <div className="quote-hero__grid" /><svg className="quote-hero__diagram" viewBox="0 0 700 400" aria-hidden="true"><path d="M55 200H645" /><circle cx="55" cy="200" r="10" /><circle cx="250" cy="200" r="10" /><circle cx="450" cy="200" r="10" /><circle cx="645" cy="200" r="10" /><circle className="quote-hero__signal" cx="55" cy="200" r="5" /><text x="20" y="240">YOUR SITE</text><text x="195" y="240">ENERGY NEEDS</text><text x="420" y="240">SYSTEM</text><text x="555" y="240">POWERNEX REVIEW</text></svg>
                <div className="site-container quote-hero__content"><motion.p initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="section-eyebrow"><span />Start your project</motion.p><div className="quote-hero__mask"><motion.h1 id="quote-title" initial={reduceMotion ? false : { y: "105%" }} animate={{ y: 0 }} transition={{ duration: .8, ease: [0.16,1,.3,1] }}>Let's design<br />your <em>energy<br />solution.</em></motion.h1></div><p>Tell us what you know about your property and energy needs. If you are unsure, choose “Not Sure” and continue.</p><div className="quote-hero__actions"><a href="#quote-intent" className="button button--primary">Start your quote <ArrowRight /></a><Link to="/contact" className="button button--outline">Talk to PowerNex</Link></div></div>
            </section>

            <section id="quote-intent" className="quote-intent section-pad" aria-labelledby="quote-intent-title"><div className="site-container"><Reveal className="quote-intent__heading"><p className="section-eyebrow"><span />Project direction</p><h2 id="quote-intent-title">What are you<br />planning?</h2><p>Choose the closest match. You can change it inside the brief.</p></Reveal>{prefill.projectType && <div className="quote-prefill"><span>Starting with</span><strong>{prefill.projectType}</strong><button type="button" onClick={() => { dispatch({ type: "reset", value: {} }); setStarted(false); }}>Change</button></div>}<div className="quote-intent-list">{projectTypes.map(({ value, description, icon: Icon }) => <label key={value} className={quote.projectType === value ? "selected" : ""}><input type="radio" name="quote-intent" value={value} checked={quote.projectType === value} onChange={() => selectIntent(value)} /><Icon /><span><strong>{value}</strong><small>{description}</small></span><i>{quote.projectType === value && <Check />}</i></label>)}</div></div></section>

            <section id="quote-builder" className="quote-builder section-pad" aria-labelledby="builder-title"><div className="site-container"><div className="quote-progress" aria-label="Quote progress"><p id="builder-title" className="sr-only">Guided project brief</p>{quoteSteps.map((label, index) => <button type="button" key={label} className={`${index === step ? "active" : ""} ${index < step ? "complete" : ""}`} disabled={index > step} onClick={() => index < step && edit(index)} aria-current={index === step ? "step" : undefined}><span>{index < step ? <Check /> : String(index + 1).padStart(2, "0")}</span><small>{label}</small></button>)}</div><div className="quote-mobile-progress" aria-live="polite"><p>Step {step + 1} of 4 <strong>{quoteSteps[step]}</strong></p><div><span style={{ width: `${((step + 1) / 4) * 100}%` }} /></div></div>
                {ready ? <div className="quote-complete" role="status"><CheckCircle2 /><p className="section-eyebrow"><span />Frontend validated</p><h2>Your project brief<br />is ready.</h2><p>The quote experience is ready to connect to the PowerNex submission system. Nothing was delivered from this frontend-only interface.</p><div><button type="button" className="button button--outline" onClick={() => setReady(false)}>Edit request</button><Link to="/contact" className="button button--outline">Contact PowerNex</Link><Link to="/" className="button button--primary">Return home</Link></div></div> : <div className="quote-builder__layout"><main className="quote-wizard" ref={stepRef} onFocus={() => { if (!started) { setStarted(true); trackEvent("quote_start", { source: "wizard" }); } }}><AnimatePresence mode="wait"><motion.div key={step} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? {} : { opacity: 0, y: -8 }} transition={{ duration: reduceMotion ? 0 : .25 }}>{step === 0 && <ProjectStep quote={quote} update={update} errors={errors} />}{step === 1 && <EnergyStep quote={quote} update={update} errors={errors} />}{step === 2 && <PreferencesStep quote={quote} toggle={toggle} update={update} errors={errors} />}{step === 3 && <ReviewStep quote={quote} update={update} errors={errors} onEdit={edit} onSubmit={submit} />}</motion.div></AnimatePresence><div className="quote-wizard__actions">{step > 0 ? <button type="button" className="button button--outline" onClick={back}><ArrowLeft /> Back</button> : <span />}{step < 3 && <button type="button" className="button button--primary" onClick={next}>Continue <ArrowRight /></button>}</div><button type="button" className="quote-start-over" onClick={startOver}><RotateCcw /> Start over</button><ProjectSummary quote={quote} step={step} onEdit={edit} mobile /></main><ProjectSummary quote={quote} step={step} onEdit={edit} /></div>}
            </div></section>

            <DirectContact />

            <section className="quote-after section-pad" aria-labelledby="quote-after-title"><div className="site-container"><Reveal className="quote-after__heading"><p className="section-eyebrow"><span />After the brief</p><h2 id="quote-after-title">What happens<br />after this?</h2></Reveal><Reveal className="quote-after__timeline">{quoteNextSteps.map(([number, title, copy]) => <article key={number}><span>{number}</span><i /><h3>{title}</h3><p>{copy}</p></article>)}</Reveal><Reveal className="quote-prepare"><strong>For a future consultation, it may help to have:</strong><span>Recent electricity bill</span><span>Basic property or site information</span><span>Existing system details, if applicable</span></Reveal></div></section>

            <section className="quote-help section-pad" aria-labelledby="quote-help-title"><div className="site-container quote-help__grid"><Reveal><p className="section-eyebrow"><span />Quick help</p><h2 id="quote-help-title">Start with<br />what you know.</h2><QuoteFeedback /></Reveal><Reveal className="quote-faqs">{quoteFaqs.map(([question, answer]) => <details key={question} onToggle={(event) => event.currentTarget.open && trackEvent("quote_faq_open", { question })}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</Reveal></div></section>
        </SiteLayout>
    );
}
