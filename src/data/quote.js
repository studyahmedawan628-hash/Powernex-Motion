import { BatteryCharging, Building2, CarFront, CircleHelp, Factory, Home, RefreshCw, Settings2, SunMedium } from "lucide-react";
import { CONTACT } from "../config/contact";

export const quoteSteps = ["Project", "Energy", "Preferences", "Review"];

export const projectTypes = [
    { value: "Residential Solar", description: "Solar planning for a home or residential property.", icon: Home },
    { value: "Commercial Solar", description: "A solar project for an office or commercial facility.", icon: Building2 },
    { value: "Industrial Solar", description: "Energy planning for a factory or industrial facility.", icon: Factory },
    { value: "Energy Storage", description: "Explore storage for backup or solar integration.", icon: BatteryCharging },
    { value: "EV Charging", description: "Plan charging as part of an energy solution.", icon: CarFront },
    { value: "Solar Upgrade / Existing System", description: "Discuss an upgrade, expansion, or existing installation.", icon: RefreshCw },
    { value: "System Consultation", description: "Start with guidance before choosing a system.", icon: Settings2 },
    { value: "Not Sure", description: "Begin with what you know and discuss the rest later.", icon: CircleHelp },
];

export const propertyTypes = ["Home", "Office", "Commercial Building", "Factory", "Warehouse", "School / Institution", "Other", "Not Sure"];
export const installationTypes = ["Rooftop", "Ground Mounted", "Carport", "Existing Solar Site", "Not Sure"];
export const storagePurposes = ["Backup Power", "Solar Integration", "Existing System", "Not Sure"];
export const billRanges = ["Below PKR 15,000", "PKR 15,000 - 30,000", "PKR 30,000 - 60,000", "PKR 60,000 - 100,000", "PKR 100,000+", "Not Sure"];
export const usagePatterns = ["Mostly Daytime", "Mostly Evening / Night", "Throughout the Day", "Varies", "Not Sure"];
export const backupOptions = ["Yes", "No", "Not Sure"];
export const backupLoads = ["Essential Loads Only", "Most of the Property", "Not Sure"];
export const existingSolarOptions = ["No", "Yes", "Partially Installed", "Not Sure"];
export const priorities = ["Lower Electricity Cost", "Backup Power", "Maximize Solar Use", "Energy Independence", "Business Energy Management", "EV Charging", "Upgrade Existing System", "Not Sure"];
export const solutionInterests = ["Solar Panels", "On-Grid Inverter", "Hybrid Inverter", "Battery Storage", "EV Charging", "Monitoring", "Net Metering Guidance", "Maintenance / Support", "Consultation", "Recommend for Me"];
export const timelines = ["As Soon As Practical", "Within 1-3 Months", "Within 3-6 Months", "Researching Options", "Not Sure"];

export const responseMethods = [
    CONTACT.whatsappHref && "WhatsApp",
    CONTACT.phone && "Phone",
    CONTACT.email && "Email",
    "No Preference",
].filter(Boolean);

export const quotePrefill = {
    "residential-solar": { projectType: "Residential Solar", solutionInterests: ["Solar Panels"] },
    "commercial-industrial": { projectType: "Commercial Solar", solutionInterests: ["Solar Panels"] },
    installation: { projectType: "System Consultation", solutionInterests: ["Consultation"] },
    storage: { projectType: "Energy Storage", solutionInterests: ["Battery Storage"] },
    consultation: { projectType: "System Consultation", solutionInterests: ["Consultation"] },
    "after-sales": { projectType: "Solar Upgrade / Existing System", solutionInterests: ["Maintenance / Support"] },
    "ev-charging": { projectType: "EV Charging", solutionInterests: ["EV Charging"] },
};

export const quoteFaqs = [
    ["Do I need to know the system size?", "No. Choose Not Sure where needed. This brief does not calculate or require a system capacity."],
    ["Can I start while I am still researching?", "Yes. Choose Researching Options for the timeline and Recommend for Me for solution interests."],
    ["What if I already have solar?", "Choose Solar Upgrade / Existing System or identify the existing system during the Energy step. Technical details remain optional."],
    ["Should I use Get Quote or Contact?", "Use Get Quote for a structured project brief. Use Contact for a short general, product, project, or support question."],
    ["Can the brief include battery storage with solar?", "Yes. Battery Storage can be selected with solar interests. No battery capacity is calculated by this interface."],
];

export const quoteNextSteps = [
    ["01", "Project brief", "Your selections form a structured request."],
    ["02", "PowerNex review", "A connected submission service would make the brief available for review."],
    ["03", "Consultation", "The project context can be clarified through a direct conversation."],
    ["04", "Assessment if needed", "Site or system assessment may be discussed where appropriate."],
    ["05", "Quotation", "A quotation can follow the relevant technical review."],
];

export const initialQuote = {
    projectType: "",
    city: "",
    propertyType: "",
    installationType: "",
    storagePurpose: "",
    currentSizeKnown: "",
    currentSystemSize: "",
    billRange: "",
    usagePattern: "",
    backupNeed: "",
    backupLoads: "",
    existingSolar: "",
    existingSystemDetails: "",
    priorities: [],
    solutionInterests: [],
    timeline: "",
    fullName: "",
    phone: "",
    email: "",
    responseMethod: "No Preference",
    contactTime: "No Preference",
};

export const summaryDiagramIcons = { solar: SunMedium, storage: BatteryCharging, ev: CarFront, site: Home };
