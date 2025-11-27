import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  MapPin,
  Briefcase,
  ArrowRight,
  UserCheck,
  CheckCircle,
  FileText,
  Scale,
  Calculator,
  Download,
  Zap,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
// You can replace this with your actual image path or keep the import if valid
import BackgroundImageSrc from "@/assets1/img/hero-bg-1.svg"; 

// --- Static Data Definitions ---

const expertiseList = [
  "Legal Notices", "Employment Issues", "Property Succession", "Property Registration", "Property Verification",
  "Cheque Bounce Cases", "Money Recovery Issues", "Mutual Divorce", "Divorce & Matrimonial Consultation",
  "File a Consumer Case", "Will Drafting and Registration", "File a Criminal Complaint",
  "Debt Recovery Tribunal", "National Green Tribunal Cases", "Motor Accident Claims",
  "Setting up of a Business", "Fundraising for Businesses",
];

const tabs = [
  { id: 'expertise-content', label: 'Areas Of Expertise' },
  { id: 'services-content', label: 'Services' },
  { id: 'process-content', label: 'Process' },
  { id: 'benefits-content', label: 'Benefits' },
  { id: 'faqs-content', label: 'FAQs' },
];

const faqs = [
  { q: "What is online lawyer consultation?", a: "It is a convenient way to connect with qualified lawyers via video or phone call, without visiting in person." },
  { q: "Do I need to visit the lawyer in person for consultation?", a: "No. All consultations happen 100% online at your convenience." },
  { q: "Are vakilsearch lawyers qualified?", a: "Yes, all our lawyers are verified, licensed, and experts in their fields." },
  { q: "Can I get help with property law issues through an online consultation?", a: "Yes, we have senior lawyers specializing in property succession, registration, and disputes." },
  { q: "How are fees structured for online lawyer consultations?", a: "Fees are structured affordably, typically ₹399 for a 30-minute consultation, with transparent, budget-friendly pricing." },
  { q: "Can I resolve business disputes through online lawyer consultations?", a: "Yes, our experts provide strategic advice on corporate, business law, and dispute resolution." },
  { q: "What are the benefits of choosing Vakilsearch for legal advice?", a: "Benefits include trusted legal advice, strong advocacy, risk reduction, cost savings, and access to a broad legal network." },
  { q: "How can I book a lawyer consultation with Vakilsearch?", a: "The process involves 8 quick steps: visiting the site, entering details, selecting language/problem, consulting, OTP verification, picking a slot, and payment." },
  { q: "Is online lawyer consultation safe & secure on Vakilsearch?", a: "Yes, your information stays private with end-to-end encryption and secure digital processes." },
  { q: "If I call again, can I consult with the same lawyer?", a: "We strive to maintain continuity; you can often request to consult with the same lawyer based on availability." },
  { q: "Is a video call available for lawyer consultations?", a: "Yes, our lawyers will contact you through your chosen mode of communication, either video or audio call, at your selected time." },
  { q: "What if I missed my booked consultation slot?", a: "Vakilsearch provides support for rescheduling or assisting clients who missed their booked time slots. Please contact customer support." },
  { q: "Can I consult with a lawyer in my native language?", a: "Yes, you can choose your preferred language during the booking process." },
];

const resourceLinks = [
  { title: "Trademark", icon: Briefcase, items: ["Trademark Search", "Trademark Registration", "Trademark Objection", "Trademark Infringement", "Well Known Trademark", "International Trademark Registration", "Trademark Class List"] },
  { title: "GST", icon: Scale, items: ["HSN Code Finder", "Online GST Registration", "GST Return Filing", "GST Cancellation", "GST Revocation"] },
  { title: "Company Registration", icon: Briefcase, items: ["Company Name Search", "Company Registration", "PVT LTD Company Registration", "LLP Registration", "Sole Proprietorship Registration", "OPC Registration", "Partnership Firm Registration", "Startup India Registration"] },
  { title: "ITR, Patent & BNS", icon: FileText, items: ["IT Return Filing", "Patent Search", "Patent Registration", "Provisional Patent Application", "Patent Infringement", "BNS Sections"] },
  { title: "Copyright & Experts", icon: UserCheck, items: ["Copyright Registration", "Copyright Music Protection", "Copyright Infringement", "Online Lawyer Consultation", "Online CA Consultation", "Company Secretary Services", "Consumer Complaints", "Lawyer Services", "Intellectual Property Lawyers"] },
  { title: "Calculators", icon: Calculator, items: ["GST Calculator", "TDS Calculator", "HRA Calculator", "Gratuity Calculator", "SIP Calculator", "NPS Calculator", "EPF Calculator", "Business Setup Calculator", "PPF Calculator", "Income Tax Calculator", "Simple Compound Interest Calculator", "Salary Calculator", "Retirement Planning Calculator", "RD Calculator", "Mutual Fund Calculator", "FD Calculator", "Home Loan EMI Calculator", "EMI Calculator", "Lumpsum Calculator"] },
  { title: "Downloads", icon: Download, items: ["Rental Agreement Format", "GST Invoice Format", "Income Certificate Format", "Power of Attorney Format", "Affidavit Format", "Salary Slip Sample", "Appointment Letter Format", "Relieving Letter Format", "Legal Heir Certificate Format", "Generate Free Rent Receipt", "Commercial Rental Agreement", "Consent Letter for GST Registration Format", "No Objection Certificate (NOC) Format", "Partnership Deed Format", "Experience Letter Format", "Resignation Letter Format", "Offer Letter Format", "Bonafide Certificate Format", "Delivery Challan Format", "Authorised Signatory in GST"] },
  { title: "Find Lawyers By City", icon: MapPin, items: ["Top Lawyers in Chennai", "Top Lawyers in Bangalore", "Top Lawyers in Mumbai", "Top Lawyers in Delhi", "Top Lawyers in Kolkata", "Top Lawyers in Gurgaon", "Search Lawyers in Other Cities"] },
];

// --- Reusable Components ---

const ServiceItem = ({ title, description }) => (
  <div className="relative p-6 h-full transition bg-white shadow-lg rounded-2xl hover:shadow-xl flex flex-col border border-gray-100">
    <h3 className="mb-3 text-xl font-semibold text-gray-900">
      <a href="#" aria-label="Service details">{title}</a>
    </h3>
    <p className="mb-6 text-gray-600 flex-grow text-sm md:text-base">{description}</p>
    <a href="#" className="flex items-center font-bold text-gray-800 uppercase text-sm hover:text-indigo-600 mt-auto">
      <span>READ MORE</span>
      <ArrowRight className="w-4 h-4 ml-2" />
    </a>
  </div>
);

const ProcessStep = ({ stepNumber, step, isLast }) => (
  <div className="relative flex items-start w-full">
    <div className="flex flex-col items-center flex-shrink-0 mr-4">
      <div className="flex items-center justify-center w-10 h-10 font-bold text-white bg-indigo-600 rounded-full z-10 text-sm">
        {stepNumber}
      </div>
      {!isLast && <div className="w-0.5 h-full min-h-[40px] bg-indigo-200 absolute top-10 left-5 transform -translate-x-1/2"></div>}
    </div>
    <div className="pt-2 pb-8">
      <p className="text-base text-gray-700 leading-relaxed">{step}</p>
    </div>
  </div>
);

const BenefitItem = ({ title, description }) => (
  <div className="p-5 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-lg hover:border-indigo-500 transition-all h-full">
    <div className="flex items-center gap-3 mb-3">
      <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-green-100 rounded-full">
        <CheckCircle className="w-5 h-5 text-green-600" />
      </div>
      <h4 className="text-lg font-bold text-gray-800 leading-tight">{title}</h4>
    </div>
    <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const ExpertiseCard = ({ title }) => (
  <div className="p-5 bg-white shadow-md rounded-xl hover:shadow-lg transition-shadow border-b-4 border-indigo-500 h-full flex flex-col justify-between">
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        <a href="#">{title}</a>
      </h3>
      <p className="text-sm text-gray-600 mb-4">Expert legal support for {title.toLowerCase()}.</p>
    </div>
    <a href="#" className="flex items-center text-xs font-bold text-gray-800 uppercase hover:text-indigo-600">
      <span>READ MORE</span>
      <ArrowRight className="w-3 h-3 ml-1" />
    </a>
  </div>
);

const ResourceLinkGroup = ({ title, items, icon: Icon }) => (
  <div className="p-5 bg-white shadow-md rounded-xl h-full border border-gray-100">
    <h4 className="flex items-center gap-2 mb-4 text-lg font-bold text-gray-900">
      {Icon && <Icon className="w-5 h-5 text-[#2E96FF]" />} {title}
    </h4>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {items.slice(0, 7).map((item, i) => (
        <a key={i} href="#" className="text-sm text-gray-600 hover:text-[#2E96FF] transition truncate block" title={item}>
          {item}
        </a>
      ))}
    </div>
    {items.length > 7 && (
      <a href="#" className="text-sm text-[#2E96FF] font-semibold mt-3 block hover:underline">
        View all ({items.length - 7} more)
      </a>
    )}
  </div>
);

// --- Tab Content Components ---

const ExpertiseContent = () => (
  <section id="expertise-content" className="py-8 md:py-10 scroll-mt-32">
    <h3 className="mb-4 text-2xl md:text-3xl font-bold text-gray-800 font-sans">Online Lawyer Consultation</h3>
    <p className="w-full mb-8 text-base text-gray-700 leading-relaxed">Getting reliable legal help is now easier and more accessible with online consultation services. Whether you’re dealing with property disputes, corporate law, family law, or criminal matters, our platform enables you to connect with experienced lawyers via video or phone calls. With Vakilsearch, you can choose from legal experts specializing in various fields, including cybercrime, intellectual property, domestic violence, and more.</p>

    <h4 className="mb-4 text-lg md:text-xl font-bold text-gray-800">Core Services for Legal Notices:</h4>
    <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <div className="p-6 text-center bg-white border border-gray-200 shadow-md rounded-2xl">
        <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 text-indigo-600 bg-indigo-100 rounded-full">
          <FileText className="w-7 h-7" />
        </div>
        <h4 className="mb-2 text-lg font-bold text-gray-900">Clear & Concise Drafting</h4>
        <p className="text-sm text-gray-600">Our lawyers assist in drafting and sending legal notices to resolve disputes.</p>
      </div>
      <div className="p-6 text-center bg-white border border-gray-200 shadow-md rounded-2xl">
        <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 text-green-600 bg-green-100 rounded-full">
          <Zap className="w-7 h-7" />
        </div>
        <h4 className="mb-2 text-lg font-bold text-gray-900">Tailor-Made & Quick Filing</h4>
        <p className="text-sm text-gray-600">Each notice is customized to your specific needs, guaranteeing quick filing.</p>
      </div>
      <div className="p-6 text-center bg-white border border-gray-200 shadow-md rounded-2xl">
        <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 text-blue-600 bg-blue-100 rounded-full">
          <UserCheck className="w-7 h-7" />
        </div>
        <h4 className="mb-2 text-lg font-bold text-gray-900">Top Lawyer Support</h4>
        <p className="text-sm text-gray-600">Receive strategic guidance from top-tier legal experts throughout the process.</p>
      </div>
    </div>
  </section>
);

const ServicesContent = () => (
  <section id="services-content" className="py-8 md:py-10 scroll-mt-32">
    <h3 className="mb-4 text-2xl md:text-3xl font-bold text-gray-800 font-sans">What Are Lawyer Services?</h3>
    <p className="w-full mb-8 text-base text-gray-700 leading-relaxed">Our Online lawyer consultation services offer a range of legal consultation services that cater to different needs, from business contracts to family matters.</p>

    <div className="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <ServiceItem title="Legal Consultation" description="Get expert legal advice tailored to your situation. Our lawyers analyze your case and guide you toward the best course of action" />
      <ServiceItem title="Drafting Documents" description="Ensure the legality and enforceability of your documents, including contracts, agreements, wills, Succession Certificates, and NDAs." />
      <ServiceItem title="Litigation Representation" description="Our lawyers represent clients in civil and criminal cases, ensuring strong legal advocacy and presenting compelling arguments." />
      <ServiceItem title="Corporate Law" description="Navigate the complexities of business law with confidence, offering strategic advice on formation, contracts, and compliance." />
      <ServiceItem title="Family Law Services" description="Address family-related legal matters with sensitivity, assisting with divorce, child custody, adoption, and other issues." />
    </div>
  </section>
);

const ProcessContent = () => (
  <section id="process-content" className="py-8 md:py-10 scroll-mt-32">
    <h3 className="mb-4 text-2xl md:text-3xl font-bold text-gray-800 font-sans">How Consultations Work</h3>
    <p className="w-full mb-8 text-base text-gray-700">Vakilsearch makes it easy to connect with expert lawyers online through a quick and secure process.</p>

    <div className="flex justify-center">
      <div className="flex flex-col w-full">
        <ProcessStep stepNumber={1} step="Visit our website for legal support at vakilsearch.com" />
        <ProcessStep stepNumber={2} step="Enter your email ID, phone number, and pincode." />
        <ProcessStep stepNumber={3} step="Choose your preferred language." />
        <ProcessStep stepNumber={4} step="Select from property issues, family matters, business disputes, and more." />
        <ProcessStep stepNumber={5} step="Click on ‘Consult Now’." />
        <ProcessStep stepNumber={6} step="Enter the OTP sent to your mobile." />
        <ProcessStep stepNumber={7} step="Pick your preferred slot and make the payment." />
        <ProcessStep stepNumber={8} step="Our lawyers will contact you through your chosen mode." isLast={true} />
      </div>
    </div>
    <p className="mt-8 text-center text-base md:text-lg font-bold text-indigo-700 bg-indigo-50 p-4 rounded-lg border border-indigo-100">With Vakilsearch, instant advocate support is just a few clicks away.</p>
  </section>
);

const BenefitsContent = () => (
  <section id="benefits-content" className="py-8 md:py-10 scroll-mt-32">
    <h3 className="mb-4 text-2xl md:text-3xl font-bold text-gray-800 font-sans">Benefits of Online Consultation</h3>
    <p className="w-full mb-8 text-base text-gray-700">Online attorney consultation offers you clarity, confidence, and expert support from the comfort of your house.</p>

    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
      <BenefitItem title="Trusted Legal Advice" description="Vakilsearch has a team of verified lawyers who break down complex laws, evaluate your case, and help you choose the best course of action." />
      <BenefitItem title="Advocacy & Representation" description="Our lawyers provide the best legal services online protecting your rights, drafting legal documents, and supporting you through legal procedures." />
      <BenefitItem title="Risk Reduction" description="Avoid costly legal mistakes with the help of our legal experts. Timely advice minimises risks and can save you both time and money." />
      <BenefitItem title="Access to Resources" description="You benefit from a broader legal ecosystem access to legal document support, consultants, and specialists, all coordinated through Vakilsearch." />
      <BenefitItem title="Negotiation Support" description="Our attorneys are skilled negotiators who can help you handle legal discussions confidently and effectively." />
    </div>
  </section>
);

const FAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
  <section id="faqs-content" className="py-8 md:py-10 bg-white scroll-mt-32">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      {/* Left Column */}
      <div className="lg:col-span-5">
        <div className="flex items-center gap-2 mb-3 font-semibold text-indigo-600">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <span>FAQ’s</span>
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
        </div>
        <h2 className="mb-4 text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
        <p className="mb-6 text-gray-600">
          Find answers to common questions about our online lawyer consultation services, fees, and processes.
        </p>
        <button className="inline-flex items-center justify-center px-6 py-3 font-bold text-white uppercase transition-colors bg-indigo-700 rounded-lg text-sm hover:bg-indigo-800 shadow-md w-full sm:w-auto">
          <span>Check More Faq</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>

      {/* Right Column (Accordion) */}
      <div className="space-y-3 lg:col-span-7">
        {faqs.map((f, i) => (
          <div key={i} className="overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm">
            <button
              className="flex items-center justify-between w-full p-4 text-left"
              onClick={() => setFaqOpen(faqOpen === i ? null : i)}
            >
              <h3 className="pr-4 text-sm font-semibold text-gray-800">{f.q}</h3>
              <span className={`flex items-center justify-center w-6 h-6 rounded-full shrink-0 transition-transform ${faqOpen === i ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                <ChevronDown className={`w-4 h-4 transition-transform ${faqOpen === i ? 'rotate-180' : ''}`} />
              </span>
            </button>
            <motion.div
              initial={false}
              animate={{ height: faqOpen === i ? "auto" : 0, opacity: faqOpen === i ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="px-4 pb-4 text-sm text-gray-600 bg-gray-50">{f.a}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- Main Component ---
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('expertise-content');
  const [faqOpen, setFaqOpen] = useState(null);

  const SCROLL_OFFSET = 160; // Adjusted for mobile header + tabs

  useEffect(() => {
    const sectionIds = tabs.map(tab => tab.id);
    const handleScroll = () => {
      let currentActiveTab = sectionIds[0];
      for (let i = 0; i < sectionIds.length; i++) {
        const sectionId = sectionIds[i];
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= SCROLL_OFFSET) {
            currentActiveTab = sectionId;
          }
        }
      }
      setActiveTab(prev => (prev !== currentActiveTab ? currentActiveTab : prev));
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tabs]);

  const handleTabClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - SCROLL_OFFSET + 20,
        behavior: 'smooth'
      });
      setActiveTab(id);
    }
  };

  return (
    <div className="bg-white min-h-screen font-['DM_Sans',_sans-serif] w-full overflow-x-hidden">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* === HERO SECTION === */}
      <section className="relative w-full bg-[#E6F0F6] mt-16 md:mt-24 pb-10">
        {/* Full width background image wrapper */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src={BackgroundImageSrc}
            alt="Background"
            className="w-full h-full object-cover opacity-60 lg:opacity-100"
          />
        </div>

        <div className="relative z-10 px-4 md:px-8 pt-8 md:pt-12 w-full">
          <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12">
            
            {/* Left Column (Content) */}
            <div className="w-full lg:w-3/5 text-center lg:text-left pt-4 lg:pt-10">
              <div className="inline-flex items-center justify-center lg:justify-start gap-2 mb-4 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-semibold text-gray-800 lg:text-white">Legal Services In India</span>
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              </div>

              <h1 className="text-gray-900 lg:text-white mb-4 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
                Online Lawyer Consultation
              </h1>

              <p className="text-gray-700 lg:text-gray-100 text-base md:text-lg mb-6 max-w-2xl mx-auto lg:mx-0">
                Reliable legal advice from the comfort of your home. Connect with verified experts instantly.
              </p>

              <div className="hidden md:flex flex-col items-center lg:items-start gap-2">
                 <p className="flex items-center gap-2 text-gray-700 lg:text-white text-sm"><span className="block w-2 h-2 bg-green-500 rounded-full"></span> Verified Legal Experts</p>
                 <p className="flex items-center gap-2 text-gray-700 lg:text-white text-sm"><span className="block w-2 h-2 bg-indigo-500 rounded-full"></span> 100% Private & Secure</p>
              </div>
            </div>

            {/* Right Column (Form) */}
            <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto lg:w-[400px]">
              <div className="bg-white p-5 md:p-6 rounded-2xl shadow-xl border border-gray-200">
                <h2 className="mb-4 text-lg md:text-xl font-bold text-gray-800 text-center">Get Expert Consultation</h2>
                <form className="space-y-3">
                  <input className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:border-indigo-500 outline-none" placeholder="Email Address" />
                  <input className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:border-indigo-500 outline-none" placeholder="Mobile Number" />
                  <div className="grid grid-cols-2 gap-2">
                    <input className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:border-indigo-500 outline-none" placeholder="City" />
                    <input className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:border-indigo-500 outline-none" placeholder="Language" />
                  </div>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-500 outline-none">
                    <option>Select Problem Type</option>
                    <option>Property</option>
                    <option>Family</option>
                    <option>Business</option>
                  </select>

                  <div className="flex items-center justify-between py-2">
                    <span className="text-xs font-medium text-gray-600">Get WhatsApp Updates</span>
                    <div className="w-9 h-5 bg-green-500 rounded-full relative flex items-center px-1">
                      <div className="w-3.5 h-3.5 bg-white rounded-full shadow-sm translate-x-4"></div>
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-[#113C6D] text-white py-3 font-bold rounded-lg hover:bg-indigo-900 transition shadow-lg text-sm md:text-base">
                    Talk to Lawyer Now
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* === Sticky Navigation === */}
      <section className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="w-full px-2 py-3">
          <div className="flex items-center w-full gap-2 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <a
                key={tab.id}
                className={`
                  flex-shrink-0 py-2 px-4 rounded-full text-sm font-bold whitespace-nowrap transition-all
                  ${activeTab === tab.id ? 'bg-[#0069D1] text-white shadow-md' : 'text-gray-600 bg-gray-100'}
                `}
                onClick={(e) => { e.preventDefault(); handleTabClick(tab.id); }}
              >
                {tab.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* === Main Content (Full Width / No Container) === */}
      <div className="w-full px-4 md:px-8 lg:px-12">
        <ExpertiseContent />
        <hr className="border-gray-100" />
        <ServicesContent />
        <hr className="border-gray-100" />
        <ProcessContent />
        <hr className="border-gray-100" />
        <BenefitsContent />
        <hr className="border-gray-100" />
        <FAQsContent faqs={faqs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
      </div>

      {/* === Expertise Grid Section === */}
      <section className="w-full py-12 bg-gray-50 px-4 md:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900">Areas of Expertise</h2>
          <p className="mt-2 text-sm md:text-base text-gray-600">Experienced professionals delivering legal excellence.</p>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full">
          {expertiseList.map((item, i) => (
            <ExpertiseCard key={i} title={item} />
          ))}
        </div>
      </section>

      {/* === Footer Resources === */}
      <section className="w-full py-12 bg-[#F4F7FA] px-4 md:px-8">
        <h2 className="mb-8 text-2xl md:text-3xl font-bold text-center text-gray-900">Explore Resources</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {resourceLinks.map((group, i) => (
            <ResourceLinkGroup key={i} title={group.title} items={group.items} icon={group.icon} />
          ))}
        </div>
      </section>
    </div>
  );
}