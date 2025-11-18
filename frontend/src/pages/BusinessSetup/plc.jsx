import React, { useState, useEffect } from "react";
import {
    ChevronDown,
    Zap,
    Briefcase,
    ArrowRight,
    CheckCircle,
    Star,
    Layers, // Icon for Compliance/Process
    FileText, // Icon for Documents/Requirements
    Trello, // Icon for Package/Plan
    Home, // Icon for Hero/Home
    Users,
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from "@/assets1/img/hero-bg-1.svg"

// NOTE: BackgroundImageSrc is imported from a relative path, ensure it exists in your project.
// import BackgroundImageSrc from "@/assets/business.png" 
// Since I cannot access your file system, I'll use a placeholder string.



// --- STATIC DATA DEFINITIONS (Pvt Ltd Company Registration Content) ---

const pvtLtdTabs = [
    { id: 'pvt-overview-content', label: 'Overview' },
    { id: 'pvt-requirements-content', label: 'Requirements' },
    { id: 'pvt-process-content', label: 'Pvt Process' },
    { id: 'pvt-compliance-content', label: 'Compliance' },
    { id: 'pvt-faqs-content', label: 'FAQs' },
];

const pvtLtdPlans = [
    {
        title: "Starter",
        price: "₹999",
        originalPrice: "₹1,499",
        discountText: "₹500 off",
        description: "Perfect for submitting your company application with expert assistance in 14 days.",
        features: [
            "Expert assisted process",
            "Name filed in 2 - 4 days",
            "DSC in 4 - 7 days",
            "SPICe+ filing in 14 days*",
            "Incorporation Certificate in 28 - 35 days",
            "Company PAN+TAN",
            "DIN for directors"
        ],
        isRecommended: false,
        isPremium: false,
        govtFeeNote: "+ Govt. Fee",
        cashbackText: "Unlock partner benefits worth Rs 4 lakhs",
    },
    {
        title: "Standard",
        price: "₹1,499",
        originalPrice: "₹2,999",
        discountText: "50% off",
        description: "Faster application submission with expert assistance in just 7 days.",
        features: [
            "Expert assisted process",
            "Name filed in 1 - 2 days*",
            "DSC in 3 - 4 days",
            "SPICe+ filing in 7 days*",
            "Incorporation Certificate in 14 - 21 days",
            "Company PAN+TAN",
            "DIN for directors",
            "Digital welcome kit"
        ],
        isRecommended: true,
        isPremium: false,
        govtFeeNote: "+ Govt. Fee",
        cashbackText: "Get ₹1000 cashback* on opening a current account.",
    },
    {
        title: "Pro",
        price: "₹3,499",
        originalPrice: "₹4,999",
        discountText: "30% off",
        description: "Includes fast application submission and trademark filing in 7 days.",
        features: [
            "Includes all Standard features",
            "MSME registration Free 🎉",
            "Expedited Trademark application filing",
            "Incorporation Certificate in 14 - 21 days",
            "Company PAN+TAN",
            "DIN for directors",
        ],
        isRecommended: false,
        isPremium: false,
        govtFeeNote: "+ Govt. Fee",
        cashbackText: "Get ₹1000 cashback* on opening a current account. (EMI available)",
    },
    {
        title: " Premium",
        price: "Starting from ₹50,000",
        originalPrice: "",
        discountText: null,
        description: "For new or existing businesses planning to expand. Offers fast and efficient incorporation.",
        features: [
            "Application submission completed within 2 days.",
            "Company incorporation completed in just 5 days.",
            "Includes first-year compliance (auditor appointment, annual filing).",
            "Retention/suggestion of business name."
        ],
        isRecommended: false,
        isPremium: true,
        govtFeeNote: null,
        cashbackText: "Talk to Incorporation Expert",
    },
];

const pvtLtdRequirements = [
    { icon: Users, title: "Minimum Two Directors", description: "At least one director must be a resident of India (stayed ≥ 182 days in the financial year)." },
    { icon: FileText, title: "Minimum Two Shareholders", description: "Directors and shareholders can be the same individuals; corporate entities are eligible." },
    { icon: Home, title: "Registered Office Address", description: "A valid Indian address with proof and a No Objection Certificate (NOC) from the property owner." },
    { icon: Layers, title: "Digital Signature Certificate (DSC)", description: "Mandatory for all proposed directors to sign electronic documents." },
    { icon: Briefcase, title: "Director Identification Number (DIN)", description: "A unique identification number issued by the MCA required for each director." },
    { icon: Trello, title: "Unique Company Name", description: "The name must be unique and not identical or similar to existing companies or trademarks." },
];

const pvtLtdProcess = [
    "Step 1: Obtain Digital Signature Certificate (DSC)",
    "Step 2: Apply for Director Identification Number (DIN)",
    "Step 3: Name Approval through SPICe+ Part A",
    "Step 4: Prepare Incorporation Documents (ID, Address, Office Proof)",
    "Step 5: Filing SPICe+ Part B, AGILE-PRO, eMOA, eAOA",
    "Step 6: PAN, TAN & GST Application",
    "Step 7: Verification by RoC and Certificate of Incorporation (CIN)",
    "Step 8: Post Registration Compliance (Bank account, shares, etc.)",
];

const pvtLtdFAQs = [
    { q: "What Is Private Limited Company Registration in India?", a: "It is registering a separate legal entity under the Companies Act, 2013, which provides limited liability protection to its shareholders. It restricts share transfers and cannot invite the public to subscribe to its securities." },
    { q: "What Are the Minimum Requirements for Private Limited Company Registration?", a: "Minimum two directors, minimum two shareholders, a registered office address in India, DIN for all directors, and DSC for all directors." },
    { q: "How Much Does It Cost to Register a Private Limited Company in India?", a: "The service fees start at ₹999 + Govt. Fees, with final government fees varying based on the state and authorized capital." },
    { q: "Is a Digital Signature Certificate (DSC) Mandatory?", a: "Yes, DSC is mandatory for all proposed directors to digitally sign the electronic incorporation forms." },
    { q: "What Is the SPICe+ Form?", a: "The SPICe+ (Simplified Proforma for Incorporating Company Electronically Plus) form is a combined application for name reservation, incorporation, PAN, TAN, and sometimes GST registration." },
    { q: "What Are the Annual Compliance Requirements?", a: "Mandatory compliance includes Annual Return Filing (Form MGT-7), Financial Statements Filing (Form AOC-4), conducting quarterly Board Meetings, and annual Statutory Audit." },
    { q: "How Does Limited Liability Work?", a: "Shareholders are only financially responsible for the company's debts up to the amount of capital they invested or guaranteed; their personal assets are protected." },
];

const resourceLinks = [
    { title: "Trademark", icon: Briefcase, items: ["Trademark Search", "Trademark Registration", "Trademark Objection", "Trademark Infringement", "Well Known Trademark", "International Trademark Registration", "Trademark Class List"] },
    { title: "GST", icon: Layers, items: ["HSN Code Finder", "Online GST Registration", "GST Return Filing", "GST Cancellation", "GST Revocation"] },
    { title: "Company Registration", icon: Briefcase, items: ["Company Name Search", "Company Registration", "PVT LTD Company Registration", "LLP Registration", "Sole Proprietorship Registration", "OPC Registration", "Partnership Firm Registration", "Startup India Registration"] },
    { title: "ITR, Patent & BNS", icon: FileText, items: ["IT Return Filing", "Patent Search", "Patent Registration", "Provisional Patent Application", "Patent Infringement", "BNS Sections"] },
    { title: "Copyright & Experts", icon: Users, items: ["Copyright Registration", "Copyright Music Protection", "Copyright Infringement", "Online Lawyer Consultation", "Online CA Consultation", "Company Secretary Services", "Consumer Complaints", "Lawyer Services", "Intellectual Property Lawyers"] },
    { title: "Calculators", icon: Trello, items: ["GST Calculator", "TDS Calculator", "HRA Calculator", "Gratuity Calculator", "SIP Calculator", "NPS Calculator", "EPF Calculator", "Business Setup Calculator", "PPF Calculator", "Income Tax Calculator", "Simple Compound Interest Calculator", "Salary Calculator", "Retirement Planning Calculator", "RD Calculator", "Mutual Fund Calculator", "FD Calculator", "Home Loan EMI Calculator", "EMI Calculator", "Lumpsum Calculator"] },
    { title: "Downloads", icon: Trello, items: ["Rental Agreement Format", "GST Invoice Format", "Income Certificate Format", "Power of Attorney Format", "Affidavit Format", "Salary Slip Sample", "Appointment Letter Format", "Relieving Letter Format", "Legal Heir Certificate Format", "Generate Free Rent Receipt", "Commercial Rental Agreement", "Consent Letter for GST Registration Format", "No Objection Certificate (NOC) Format", "Partnership Deed Format", "Experience Letter Format", "Resignation Letter Format", "Offer Letter Format", "Bonafide Certificate Format", "Delivery Challan Format", "Authorised Signatory in GST"] },
    { title: "Find Lawyers By City", icon: Home, items: ["Top Lawyers in Chennai", "Top Lawyers in Bangalore", "Top Lawyers in Mumbai", "Top Lawyers in Delhi", "Top Lawyers in Kolkata", "Top Lawyers in Gurgaon", "Search Lawyers in Other Cities"] },
];


// --- REUSABLE COMPONENTS ---

const StatPill = ({ count, label }) => (
    <div className="bg-white/10 p-2 md:p-3 rounded-lg flex items-center gap-2 border border-white/30 cursor-pointer">
        <span className="text-white text-sm font-medium tracking-normal">
            <span className="font-bold mr-1">{count}</span>{label}
        </span>
    </div>
);

const ProcessStep = ({ stepNumber, step }) => (
    <li className="flex items-start gap-4">
        <div className="bg-[#2E96FF] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
            {stepNumber}
        </div>
        <span className="text-gray-700 text-base sm:text-lg">{step}</span>
    </li>
);

const RequirementItem = ({ icon: Icon, title, description }) => (
    <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 transition hover:shadow-md">
        <Icon className="w-5 h-5 text-[#2E96FF] mt-1 flex-shrink-0" />
        <div>
            <h4 className="font-semibold text-base sm:text-lg text-gray-800 mb-1">{title}</h4>
            <p className="text-gray-600 text-sm">{description}</p>
        </div>
    </div>
);

// --- PVT LTD Plan Card (Updated) ---
const PvtLtdPlanCard = ({ plan, hoveredPlanId, setHoveredPlanId, selectedPlanId, setSelectedPlanId }) => {

    const isSelected = plan.title === selectedPlanId;
    const isHovered = plan.title === hoveredPlanId;

    // The plan is 'prominent' if it's explicitly selected OR currently hovered OR it's the 
    // default recommended plan and nothing has been selected or hovered yet.
    const isProminent = isSelected || isHovered || (plan.isRecommended && !selectedPlanId && !hoveredPlanId);
    const isPremiumPlan = plan.isPremium;

    const baseClasses = `relative p-4 sm:p-6 rounded-xl shadow-lg flex flex-col justify-between h-full transition-all duration-300 cursor-pointer ${isPremiumPlan ? 'bg-gray-100 border-2 border-gray-300' : ''}`;

    const activeClasses = isProminent && !isPremiumPlan
        ? 'bg-[#E6F2FF] border-2 border-[#2E96FF] scale-[1.03] shadow-2xl'
        : isProminent && isPremiumPlan
            ? 'bg-gray-200 border-2 border-gray-400 scale-[1.03] shadow-2xl'
            : 'bg-white border border-gray-200 hover:shadow-xl hover:scale-[1.02]';

    const handleClick = (e) => {
        // Only allow selection for the three standard packages
        if (!isPremiumPlan) {
            setSelectedPlanId(plan.title);
        }
    }

    // Determine the badge text
    let badgeText = '';
    if (isSelected) {
        badgeText = 'Selected Plan';
    } else if (plan.isRecommended && !selectedPlanId) {
        badgeText = 'Recommended Plan';
    }

    return (
        <div
            className={`${baseClasses} ${activeClasses}`}
            onMouseEnter={() => setHoveredPlanId(plan.title)}
            onMouseLeave={() => setHoveredPlanId(null)}
            onClick={handleClick}
        >
            {(isProminent || isSelected) && badgeText && (
                <div className="absolute top-0 right-0 bg-[#2E96FF] text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">
                    {badgeText}
                </div>
            )}

            <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-1">{plan.title}</h3>
                <p className={`text-sm mb-4 ${isPremiumPlan ? 'text-gray-700 font-semibold' : 'text-gray-500'}`}>{plan.description}</p>

                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 mb-4">
                    <span className="text-xl sm:text-3xl font-extrabold text-[#2E96FF]">{plan.price}</span>
                    <span className="text-sm line-through text-gray-400">{plan.originalPrice}</span>
                    <span className="text-sm text-green-600 font-bold">{plan.discountText}</span>
                    {plan.govtFeeNote && <span className="text-xs text-gray-500">{plan.govtFeeNote}</span>}
                </div>

                <div className={`text-sm font-semibold mb-4 ${isPremiumPlan ? 'text-blue-700' : 'text-green-700'}`}>
                    {plan.cashbackText}
                </div>


                <button
                    className={`w-full py-2.5 sm:py-3 font-semibold rounded-lg transition-colors shadow-md ${isPremiumPlan
                        ? 'bg-blue-900 text-white hover:bg-blue-800'
                        : isProminent
                            ? 'bg-[#2E96FF] text-white hover:bg-[#0069D1]'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (!isPremiumPlan) {
                            setSelectedPlanId(plan.title);
                        }
                    }}
                >
                    {isPremiumPlan ? "Talk to Incorporation Expert" : "Get Started"}
                </button>

                <h4 className="font-bold text-gray-800 mt-4 sm:mt-6 mb-3 border-t pt-3">What you'll get:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                    {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const ResourceLinkGroup = ({ title, items, icon: Icon }) => (
    <div className="p-4 bg-white shadow-lg rounded-xl">
        <h4 className="flex items-center gap-2 mb-3 text-xl font-bold text-gray-900">
            {Icon && <Icon className="w-5 h-5 text-[#2E96FF]" />} {title}
        </h4>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {items.slice(0, 7).map((item, i) => (
                <a key={i} href="#" className="text-sm text-gray-600 hover:text-[#2E96FF] transition truncate" title={item}>
                    {item}
                </a>
            ))}
        </div>
        {items.length > 7 && (
            <a href="#" className="text-sm text-[#2E96FF] font-semibold mt-2 block hover:underline">
                View all ({items.length - 7} more)
            </a>
        )}
    </div>
);


// --- SECTION COMPONENTS ---

const PvtOverviewContent = () => (
    <section id="pvt-overview-content" className="py-8 sm:py-12 scroll-mt-24">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">Overview & Benefits</h2>
        <p className="text-base sm:text-lg text-gray-700 mb-6 max-w-4xl">
            Private limited company registration in India provides **limited liability**, legal independence, and access to tax benefits. Governed by the Companies Act, 2013, it is the ideal structure for startups and SMEs seeking credibility and funding.
        </p>

        <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-[#2E96FF] shadow-inner">
            <h3 className="text-xl font-bold text-[#113C6D] mb-3">Key Advantages</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />**Limited Liability:** Personal assets are protected.</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />**Separate Legal Entity:** Can own property and contracts independently.</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />**Easier Access to Capital:** Attracts venture capital and loans more easily.</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />**Perpetual Existence:** Business continuity regardless of owner/director changes.</li>
            </ul>
        </div>
    </section>
);

const PvtRequirementsContent = () => (
    <section id="pvt-requirements-content" className="py-8 sm:py-12 scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Minimum Requirements</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-4xl">
            For private limited company registration in India, certain legal and procedural requirements must be fulfilled under the Companies Act, 2013.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {pvtLtdRequirements.map((req, i) => (
                <RequirementItem key={i} {...req} />
            ))}
        </div>
    </section>
);

const PvtProcessContent = () => (
    <section id="pvt-process-content" className="py-8 sm:py-12 scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">8 Quick Steps to Register a Pvt Ltd Company</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-4xl">
            The registration process is regulated by the Ministry of Corporate Affairs (MCA) and ensures limited liability and separate legal entity status.
        </p>

        <div className="flex justify-center">
            <div className="flex flex-col">
                {pvtLtdProcess.map((step, i) => (
                    <ProcessStep key={i} stepNumber={i + 1} step={step.replace(/Step \d+: /, '')} isLast={i === pvtLtdProcess.length - 1} />
                ))}
            </div>
        </div>
        <p className="mt-12 text-center text-xl font-bold text-indigo-700 bg-indigo-50 p-4 rounded-lg">
            **Note:** The registration process for a Private Limited Company typically takes 7 to 10 days for application filing, with final COI issuance taking 14-35 days depending on package and MCA review.
        </p>
    </section>
);

const PvtComplianceContent = () => (
    <section id="pvt-compliance-content" className="py-8 sm:py-12 scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Mandatory MCA Compliance</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-4xl">
            Private Limited Companies in India are required to follow a set of compliance obligations laid out by the Ministry of Corporate Affairs (MCA) to ensure transparency and legal standing.
        </p>

        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aspect</th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance Requirement</th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                    <tr>
                        <td className="px-3 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Annual Return Filing</td>
                        <td className="px-3 sm:px-6 py-4 text-gray-700">File Form MGT-7 with details of shareholders and directors</td>
                        <td className="px-3 sm:px-6 py-4 text-gray-700 whitespace-nowrap">Annually (within 60 days of AGM)</td>
                    </tr>
                    <tr>
                        <td className="px-3 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Financial Statements</td>
                        <td className="px-3 sm:px-6 py-4 text-gray-700">File Form AOC-4 for balance sheet, P&L, and audit report</td>
                        <td className="px-3 sm:px-6 py-4 text-gray-700 whitespace-nowrap">Annually (within 30 days of AGM)</td>
                    </tr>
                    <tr>
                        <td className="px-3 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Board Meetings</td>
                        <td className="px-3 sm:px-6 py-4 text-gray-700">Conduct minimum 4 meetings per year</td>
                        <td className="px-3 sm:px-6 py-4 text-gray-700 whitespace-nowrap">Quarterly</td>
                    </tr>
                    <tr>
                        <td className="px-3 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Statutory Audit</td>
                        <td className="px-3 sm:px-6 py-4 text-gray-700">Get accounts audited by a Chartered Accountant</td>
                        <td className="px-3 sm:px-6 py-4 text-gray-700 whitespace-nowrap">Annually</td>
                    </tr>
                    <tr>
                        <td className="px-3 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Income Tax Filing</td>
                        <td className="px-3 sm:px-6 py-4 text-gray-700">File Form ITR-6</td>
                        <td className="px-3 sm:px-6 py-4 text-gray-700 whitespace-nowrap">Annually</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
);

// FAQ component logic is solid, using motion for animation
const PvtFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
    <section id="pvt-faqs-content" className="py-20 bg-white scroll-mt-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
                <div className="flex items-center gap-2 mb-4 font-semibold text-indigo-600">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span>FAQ’s</span>
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                </div>
                <h2 className="mb-4 text-4xl font-bold text-gray-900">FAQs on Company Registration</h2>
                <p className="mb-8 text-gray-600">
                    Find answers to common questions about Private Limited Company registration, compliance, and processes.
                </p>
                <a href="#" aria-label="FAQ page link" className="inline-flex items-center justify-center px-6 py-3 font-bold text-white uppercase transition-colors bg-indigo-700 rounded-lg text-sm hover:bg-indigo-800">
                    <span>Check More Faq</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                </a>
            </div>

            <div className="space-y-4 lg:col-span-7">
                {faqs.map((f, i) => (
                    <div key={i} className="overflow-hidden bg-gray-100 rounded-lg">
                        <button className="flex items-center justify-between w-full p-5 text-left" onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                            <h3 className="text-lg font-semibold text-gray-800">{f.q}</h3>
                            <span className={`flex items-center justify-center w-8 h-8 rounded-full transition-transform ${faqOpen === i ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'}`}>
                                <ChevronDown className={`w-5 h-5 transition-transform ${faqOpen === i ? 'rotate-180' : ''}`} />
                            </span>
                        </button>
                        <motion.div initial={false} animate={{ height: faqOpen === i ? "auto" : 0, opacity: faqOpen === i ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                            <p className="px-5 pb-5 text-gray-600">{f.a}</p>
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);


// --- MAIN COMPONENT ---
export default function LandingPageDesign() {
    const [activeTab, setActiveTab] = useState(pvtLtdTabs[0].id);
    const [faqOpen, setFaqOpen] = useState(null);
    const [hoveredPlanId, setHoveredPlanId] = useState(null);

    // Default selected plan is 'Standard'
    const [selectedPlanId, setSelectedPlanId] = useState(pvtLtdPlans.find(p => p.isRecommended)?.title || null);

    const SCROLL_OFFSET = 120;

    // --- SCROLLSPY IMPLEMENTATION ---
    useEffect(() => {
        const sectionIds = pvtLtdTabs.map(tab => tab.id);

        const handleScroll = () => {
            let currentActiveTab = sectionIds[0];

            for (let i = 0; i < sectionIds.length; i++) {
                const sectionId = sectionIds[i];
                const section = document.getElementById(sectionId);

                if (section) {
                    const rect = section.getBoundingClientRect();
                    // Check if the section top is above the offset but not too far up (still visible in the scrollable area)
                    if (rect.top <= SCROLL_OFFSET) {
                        currentActiveTab = sectionId;
                    }
                }
            }

            // Update state only if it actually changes to prevent unnecessary re-renders
            setActiveTab(prevActiveTab => {
                if (prevActiveTab !== currentActiveTab) {
                    return currentActiveTab;
                }
                return prevActiveTab;
            });
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check in case the user loads the page already scrolled
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
        // CORRECTION: pvtLtdTabs is a static constant, so we use an empty dependency array.
    }, []);

    // Function to handle smooth scrolling when a tab is clicked
    const handleTabClick = (id) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - SCROLL_OFFSET,
                behavior: 'smooth'
            });
            setActiveTab(id);
        }
    };

    return (
        <div className="bg-white min-h-screen font-['DM_Sans',_sans-serif]">
            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
            {/* === HERO SECTION (New Design) === */}
            <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6] mt-[10%]">
                <div className="relative px-4 pt-12 mx-auto max-w-7xl md:px-8">

                    {/* Background Image */}
                    <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
                        <img
                            src={BackgroundImageSrc}
                            alt="Diagonal background graphic"
                            className="absolute top-0 left-0 object-cover w-full h-full"
                        />
                    </div>

                    {/* Content and Form Wrapper */}
                    <div className="relative z-20 flex flex-col items-start pt-10 pb-12 lg:flex-row lg:pb-0">

                        {/* LEFT COLUMN - CONTENT */}
                        <div className="relative z-20 w-full p-4 pb-20 text-white lg:w-3/5 md:p-6">

                            {/* Badge */}
                            <p className="flex items-center justify-center gap-2 mb-4 font-semibold text-white lg:justify-start">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <span>#1 Legal Service Provider In India</span>
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            </p>

                            {/* Heading */}
                            <h1 className="text-[#fff] mb-4 text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl font-sans">
                                Pvt Ltd Company Registration
                            </h1>

                            {/* Description */}
                            <p className="text-[#fff] text-lg max-w-lg mb-6">
                                Register your Private Limited Company with expert assistance. Enjoy limited liability, legal recognition, and easier access to funding.
                            </p>

                            {/* Bullet Points */}
                            <div className="mb-8 space-y-1">
                                <p className="flex items-center gap-2 text-[#fff] text-sm"><span className="block w-2 h-2 bg-green-500"></span> Expert assistance and filing in just 2 days.</p>
                                <p className="flex items-center gap-2 text-[#fff] text-sm"><span className="block w-2 h-2 bg-indigo-500"></span> Complete compliance handling & post-incorporation support.</p>
                            </div>
                        </div>

                        {/* RIGHT COLUMN - FORM */}
                        <div className="w-full lg:w-[400px] relative z-30 lg:mt-0 lg:ml-auto mt-[-20px] sm:mt-[-20px] mb-12 lg:mr-4">
                            <div
                                className="w-full p-6 bg-white shadow-xl md:p-8 rounded-2xl"
                                style={{ borderRadius: '24px', border: '1px solid #E0E0E0' }}
                            >
                                <h2 className="mb-4 text-xl font-semibold text-gray-800 font-sans">Register Your Pvt Ltd Company</h2>
                                <form className="space-y-3">
                                    <input
                                        className="w-full px-4 py-2 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg text-sm text-gray-500 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                        placeholder="Email"
                                        type="email" // Added type for semantic correctness
                                    />
                                    <input
                                        className="w-full px-4 py-2 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg text-sm text-gray-500 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                        placeholder="Mobile Number"
                                        type="tel" // Added type for semantic correctness
                                    />
                                    <input
                                        className="w-full px-4 py-2 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg text-sm text-gray-500 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                        placeholder="City / Pincode"
                                        type="text" // Added type for semantic correctness
                                    />

                                    <button
                                        type="submit"
                                        className="w-full bg-[#113C6D] text-white py-2.5 font-semibold rounded-lg transition-colors hover:bg-indigo-900 text-base shadow-md mt-2"
                                    >
                                        Get Started Now
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Pricing Section --- */}
            <section className="py-8 sm:py-16 px-4 md:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">
                        Right Plan for Your Business
                    </h2>
                    <p className="text-sm sm:text-lg text-gray-600 mb-8 sm:mb-10 text-center">
                        Vakilsearch's incorporation experts register over 1500+ companies every month.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 items-stretch">
                        {pvtLtdPlans.map((plan, i) => (
                            <PvtLtdPlanCard
                                key={i}
                                plan={plan}
                                hoveredPlanId={hoveredPlanId}
                                setHoveredPlanId={setHoveredPlanId}
                                selectedPlanId={selectedPlanId}
                                setSelectedPlanId={setSelectedPlanId}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* === Main Content Tabs Navigation === */}
            <section className="sticky top-0 z-30 px-4 py-6 border-b border-gray-200 shadow-sm md:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center w-full gap-x-2 overflow-x-auto text-sm md:text-base no-scrollbar">
                        {pvtLtdTabs.map((tab) => (
                            <a
                                href={`#${tab.id}`} // Use href for better accessibility and deep linking
                                key={tab.id}
                                className={`
                                    flex-shrink-0 py-3 px-5 min-w-[150px] text-center font-bold cursor-pointer transition-all rounded-full
                                    ${activeTab === tab.id
                                        ? 'bg-[#0069D1] text-white shadow-lg'
                                        : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                                    }
                                `}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleTabClick(tab.id);
                                }}
                            >
                                <span>{tab.label}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* === All Tab Content Sections Rendered Sequentially === */}
            <div className="py-2 md:py-4 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <PvtOverviewContent />
                    <PvtRequirementsContent />
                    <PvtProcessContent />
                    <PvtComplianceContent />
                    <PvtFAQsContent faqs={pvtLtdFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
                </div>
            </div>

            {/* --- Resources & Links Footer Section --- */}
            <section className="px-4 py-16 bg-[#F4F7FA] md:px-8">
                <div className="mx-auto max-w-7xl">
                    <h2 className="mb-12 text-3xl font-bold text-center text-gray-900 md:text-4xl font-sans">
                        Explore Our Resources
                    </h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {resourceLinks.map((group, i) => (
                            <ResourceLinkGroup key={i} title={group.title} items={group.items} icon={group.icon} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}