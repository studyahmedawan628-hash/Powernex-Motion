import { Building2, CircleHelp, Headphones, PackageSearch, PanelsTopLeft, UsersRound } from "lucide-react";
import { CONTACT } from "../config/contact";

export const enquiryTypes = [
    "General Enquiry",
    "Solar Consultation",
    "Product Enquiry",
    "Project Enquiry",
    "Existing System Support",
    "Business / Partnership",
    "Other",
];

export const contactIntents = [
    { id: "solar", number: "01", title: "Solar Consultation", description: "Discuss a residential, commercial, or industrial solar requirement.", icon: PanelsTopLeft, quoteRoute: true },
    { id: "product", number: "02", title: "Product Enquiry", description: "Ask about a product or solution category shown on this website.", icon: PackageSearch },
    { id: "project", number: "03", title: "Project Enquiry", description: "Start a conversation about documented PowerNex project work.", icon: Building2 },
    { id: "support", number: "04", title: "Existing System Support", description: "Describe an existing system or maintenance question.", icon: Headphones },
    { id: "partnership", number: "05", title: "Business / Partnership", description: "Share a relevant partnership or business enquiry.", icon: UsersRound },
    { id: "general", number: "06", title: "General Enquiry", description: "Ask a question that does not fit another route.", icon: CircleHelp },
];

export const intentHelp = {
    "General Enquiry": "Tell us briefly what you would like to discuss.",
    "Solar Consultation": "For detailed property and energy requirements, the guided Get Quote experience is the better route.",
    "Product Enquiry": "Mention the product or product category you are interested in.",
    "Project Enquiry": "Mention the project or site reference if you know it.",
    "Existing System Support": "Describe the existing system and the help you need without including passwords or sensitive access details.",
    "Business / Partnership": "Summarize the organization and the proposed area of collaboration.",
    Other: "Tell us briefly how PowerNex can help.",
};

export const contactChannels = [
    CONTACT.phone && { id: "phone", title: "Call", value: CONTACT.phone, href: `tel:${CONTACT.phoneHref}`, copyValue: CONTACT.phoneHref, action: "Start a call" },
    CONTACT.whatsappHref && { id: "whatsapp", title: "WhatsApp", value: CONTACT.phone, href: CONTACT.whatsappHref, action: "Start a conversation", external: true },
    CONTACT.email && { id: "email", title: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}`, copyValue: CONTACT.email, action: "Write to PowerNex" },
    CONTACT.location && { id: "location", title: "Location", value: CONTACT.location, href: CONTACT.mapHref, action: CONTACT.mapHref ? "Get directions" : "Location information", external: Boolean(CONTACT.mapHref) },
].filter(Boolean);

export const contactFaqs = [
    { question: "Should I use Contact or Get Quote?", answer: "Use Contact for a short question. Use Get Quote when you want to describe a property, energy need, or planned system in more detail." },
    { question: "How do I ask about a specific product?", answer: "Choose Product Enquiry and include the product or category name in your message. Product pages can also pass that context into this form." },
    { question: "How do I discuss an existing solar system?", answer: "Choose Existing System Support and briefly describe the system and the help you need. Do not include passwords or sensitive access details." },
    { question: "Where can I view PowerNex project work?", answer: "The Projects page groups the supplied field photography by its original project folders and provides a gallery for each documented group." },
];

export const nextSteps = [
    ["01", "Prepare your enquiry", "Complete the short form with the context you already know."],
    ["02", "Connect delivery", "A PowerNex submission service must be connected before the form can send anything."],
    ["03", "Request review", "Once connected, the appropriate PowerNex team can review the enquiry."],
    ["04", "Continue if needed", "A detailed project can move to the guided quotation process."],
];
