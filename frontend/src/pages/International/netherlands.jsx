import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Star,
  CheckCircle,
  FileText,
  Scale,
  Globe,
  DollarSign,
  Zap,
  Users,
  Briefcase
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from '@/assets1/img/hero-bg-1.svg';

// --- NETHERLANDS REGISTRATION STATIC DATA ---

const nlRegTabs = [
  { id: 'nl-overview-content', label: 'Overview' },
  { id: 'nl-advantages-content', label: 'Why Netherlands?' },
  { id: 'nl-types-content', label: 'Types' },
  { id: 'nl-process-content', label: 'Process' },
  { id: 'nl-documents-content', label: 'Documents' },
  { id: 'nl-tax-content', label: 'Tax & Compliance' },
  { id: 'nl-why-vakilsearch', label: 'Why Vakilsearch' },
  { id: 'nl-faqs-content', label: 'FAQs' },
];

const nlAdvantages = [
  {
    title: "Strategic European Hub",
    description: "Access to 500 million consumers within 24 hours. The Port of Rotterdam and Schiphol Airport provide unmatched logistics.",
    icon: Globe
  },
  {
    title: "Favorable Tax Climate",
    description: "Competitive corporate income tax rates, R&D incentives (WBSO), and an extensive network of tax treaties to prevent double taxation.",
    icon: DollarSign
  },
  {
    title: "Highly Educated Workforce",
    description: "Access a multilingual, tech-savvy, and highly skilled talent pool. English is widely spoken in the business community.",
    icon: Users
  },
  {
    title: "Innovation Ecosystem",
    description: "A world-class environment for tech startups and scale-ups, with strong government support for innovation and R&D.",
    icon: Zap
  },
  {
    title: "Simple Incorporation",
    description: "The Dutch BV (private limited company) can be set up remotely through a civil-law notary, making the process efficient for foreign entrepreneurs.",
    icon: CheckCircle
  }
];

const entityTypesDataNL = [
  {
    type: "Private Limited Company (BV)",
    description: "The most common legal form for foreign investors. It offers limited liability, flexibility, and can be set up with a minimum share capital of just €0.01.",
    key_points: ["Limited liability", "Flexible structure", "Ideal for most businesses"],
  },
  {
    type: "Public Limited Company (NV)",
    description: "Suitable for large corporations that wish to raise capital on the stock exchange. Requires a minimum share capital of €45,000.",
    key_points: ["Can be publicly traded", "Higher capital requirement", "Stricter regulations"],
  },
  {
    type: "Branch Office",
    description: "An extension of a foreign parent company, not a separate legal entity. The parent company remains fully liable for the branch's activities.",
    key_points: ["No separate legal entity", "Parent company is liable", "Simpler setup"],
  },
];

const nlProcessSteps = [
  "Choose a Business Structure: Decide between a BV, NV, or other forms. Our experts help you choose the best fit.",
  "Select and Verify Company Name: We check if your desired company name is available and complies with Dutch regulations.",
  "Prepare Incorporation Documents: This includes the deed of incorporation and articles of association, prepared by a civil-law notary.",
  "Register with the Chamber of Commerce (KVK): The notary files the deed, officially registering your company in the Dutch Commercial Register.",
  "Register with Tax Authorities: Your company is automatically registered with the Dutch Tax and Customs Administration (Belastingdienst) for VAT and corporate tax.",
  "Open a Dutch Bank Account: A corporate bank account is essential for business operations. We provide guidance on this step.",
];

const requiredDocumentsNL = [
  "Valid Passport or National ID of all founders/directors.",
  "Proof of Residential Address (e.g., recent utility bill).",
  "A detailed business plan may be required.",
  "The company's proposed name and business activities.",
  "For corporate shareholders, legalized corporate documents are needed.",
];

const nlTaxCompliance = [
  {
    title: "Corporate Income Tax (CIT)",
    details: "A progressive rate applies. The first bracket has a lower rate, making it attractive for SMEs. As of 2024, the standard rate is 25.8%.",
    icon: DollarSign
  },
  {
    title: "Value Added Tax (VAT/BTW)",
    details: "The standard VAT rate is 21%. Companies must file periodic VAT returns. A lower rate applies to certain goods and services.",
    icon: Scale
  },
  {
    title: "Annual Accounts Filing",
    details: "All BVs must prepare and file annual financial statements with the Chamber of Commerce (KVK).",
    icon: FileText
  }
];

const vakilsearchNLServices = [
  "End-to-End Incorporation Support: We manage the entire process, from choosing a name to coordinating with the civil-law notary and registering with the KVK.",
  "Remote Setup: Complete your Netherlands company registration from anywhere in the world. No travel required.",
  "Expert Tax & Legal Guidance: Our network of experts provides advice on the Dutch tax system, compliance, and legal obligations.",
  "Bank Account Assistance: We guide you through the process of opening a Dutch corporate bank account.",
];

const nlFAQs = [
  { q: "Can a foreigner start a business in the Netherlands?", a: "Yes, foreigners can easily set up a business in the Netherlands. The Dutch BV is a popular choice and allows for 100% foreign ownership." },
  { q: "Do I need to be in the Netherlands to register a company?", a: "No, the entire process of setting up a Dutch BV can be handled remotely with the help of a civil-law notary and a service provider like Vakilsearch." },
  { q: "What is a Dutch BV?", a: "A 'Besloten Vennootschap' (BV) is a private limited liability company. It's the most common business structure for entrepreneurs in the Netherlands due to its flexibility and liability protection." },
  { q: "How long does it take to set up a company in the Netherlands?", a: "With all documents in order, the incorporation process typically takes 1-2 weeks." },
  { q: "What is the minimum share capital for a Dutch BV?", a: "The minimum share capital required is only €0.01, making it very accessible for startups." },
  { q: "Do I need a local director?", a: "While not a strict legal requirement for incorporation, having a director resident in the EU/EEA is often necessary for tax substance and practical reasons, like opening a bank account." },
  { q: "What are the main taxes for a company in the Netherlands?", a: "The main taxes are Corporate Income Tax (CIT) on profits and Value Added Tax (VAT/BTW) on goods and services." },
];


// --- REUSABLE COMPONENTS ---

const ProcessStep = ({ stepNumber, step }) => (
  <li className="flex items-start gap-4">
    <div className="bg-[#022B50] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
      {stepNumber}
    </div>
    <span className="text-gray-700 text-lg">{step}</span>
  </li>
);

const DetailItem = ({ title, description, icon: Icon }) => (
  <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md border-l-4 border-[#022B50]">
    <Icon className="w-5 h-5 text-[#022B50] mt-1 flex-shrink-0" />
    <div>
      <h4 className="font-semibold text-lg text-gray-800 mb-1">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </div>
);

const NLEntityTypeCard = ({ data }) => (
  <div className="p-5 bg-white rounded-xl shadow-lg border border-gray-200">
    <h4 className="font-bold text-xl text-[#022B50] mb-3">{data.type}</h4>
    <p className="text-gray-700 text-sm mb-4">{data.description}</p>
    <ul className="space-y-1">
      {data.key_points.map((point, i) => (
        <li key={i} className="flex items-center text-green-700 text-xs font-medium">
          <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
          {point}
        </li>
      ))}
    </ul>
  </div>
);


// --- TAB CONTENT COMPONENTS ---

const NLOverviewContent = () => (
  <section id="nl-overview-content" className="py-12 scroll-mt-24">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">Company Registration in the Netherlands</h2>
    <p className="text-lg text-gray-700 mb-4 max-w-4xl">
      Setting up a company in the Netherlands offers a gateway to Europe's largest economies. Known for its pro-business climate, strategic location, and innovative ecosystem, it's a top choice for international entrepreneurs.
    </p>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      The process is streamlined and can be done remotely, making it highly accessible for founders from India and around the world. Vakilsearch simplifies this journey, ensuring a compliant and efficient setup.
    </p>
  </section>
);

const NLAdvantagesContent = () => (
  <section id="nl-advantages-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-8 text-gray-800">Why Choose the Netherlands?</h3>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {nlAdvantages.map((advantage, i) => (
        <DetailItem
          key={i}
          title={advantage.title}
          description={advantage.description}
          icon={advantage.icon}
        />
      ))}
    </div>
  </section>
);

const NLTypesContent = () => (
  <section id="nl-types-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Types of Companies in the Netherlands</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Choosing the right legal structure is a critical first step. The Netherlands offers several options for foreign investors:
    </p>
    <div className="grid md:grid-cols-3 gap-6">
      {entityTypesDataNL.map((data, i) => (
        <NLEntityTypeCard key={i} data={data} />
      ))}
    </div>
  </section>
);

const NLProcessContent = () => (
  <section id="nl-process-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Step-by-Step Incorporation Process</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Our streamlined process makes Dutch company formation straightforward and efficient.
    </p>
    <ol className="space-y-5 list-none border-l-2 border-[#022B50] pl-4">
      {nlProcessSteps.map((step, i) => (
        <ProcessStep key={i} stepNumber={i + 1} step={step} />
      ))}
    </ol>
  </section>
);

const NLDocumentsContent = () => (
  <section id="nl-documents-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Documents Required</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      To ensure a smooth incorporation, you will need to provide the following documents, which may need to be notarized or apostilled.
    </p>
    <div className="bg-gray-50 p-6 rounded-lg border">
        <ul className="space-y-3 text-gray-700">
          {requiredDocumentsNL.map((doc, i) => (
            <li key={i} className="flex items-start gap-2">
              <FileText className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
              <span>{doc}</span>
            </li>
          ))}
        </ul>
    </div>
  </section>
);

const NLTaxContent = () => (
  <section id="nl-tax-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Tax & Compliance</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Understanding the Dutch tax and compliance landscape is key to running a successful business.
    </p>
    <div className="grid md:grid-cols-3 gap-6">
      {nlTaxCompliance.map((item, i) => (
        <div key={i} className="p-5 bg-white rounded-xl shadow-lg border border-gray-200">
          <item.icon className="w-8 h-8 text-yellow-600 mb-3" />
          <h4 className="font-bold text-lg text-gray-800 mb-2">{item.title}</h4>
          <p className="text-sm text-gray-600">{item.details}</p>
        </div>
      ))}
    </div>
  </section>
);

const NLWhyVakilsearch = () => (
  <section id="nl-why-vakilsearch" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Why Choose Vakilsearch?</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      We make your expansion into the Netherlands seamless, handling the complexities so you can focus on your business.
    </p>
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
      {vakilsearchNLServices.map((service, i) => (
        <div key={i} className="p-5 bg-indigo-50 rounded-xl shadow-sm border border-indigo-200">
          <h4 className="font-bold text-xl text-gray-800 mb-2">{service.split(':')[0].trim()}</h4>
          <p className="text-sm text-gray-600">{service.split(':')[1].trim()}</p>
        </div>
      ))}
    </div>
  </section>
);

const NLFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => {
  return (
    <section id="nl-faqs-content" className="py-12 max-w-5xl mx-auto scroll-mt-24">
      <h3 className="text-3xl font-bold mb-8 text-black text-center">
        Frequently Asked Questions
      </h3>
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = faqOpen === index;
          return (
            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <button
                className={`w-full flex justify-between items-center p-5 text-left transition-colors duration-300 ${isOpen ? "bg-[#E6F0F6] text-[#022B50]" : "bg-white hover:bg-gray-50 text-black"}`}
                onClick={() => setFaqOpen(isOpen ? null : index)}
              >
                <span className="font-semibold text-lg">{faq.q}</span>
                <ChevronDown
                  className={`w-6 h-6 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#022B50]" : "text-gray-500"}`}
                />
              </button>
              <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: "hidden" }}
              >
                <p className="px-5 py-4 text-black bg-white">{faq.a}</p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
};


// --- MAIN COMPONENT ---
export default function NetherlandsInc() {
  const [activeTab, setActiveTab] = useState(nlRegTabs[0].id);
  const [faqOpen, setFaqOpen] = useState(null);

  const SCROLL_OFFSET = 120;

  useEffect(() => {
    const sectionIds = nlRegTabs.map(tab => tab.id);
    const handleScroll = () => {
      let currentActiveTab = sectionIds[0];
      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= SCROLL_OFFSET) {
            currentActiveTab = sectionId;
          }
        }
      }
      setActiveTab(currentActiveTab);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div className="bg-white min-h-screen font-[Inter]">
      {/* === HERO SECTION === */}
      <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6] mt-[10%]">
        <div className="relative px-4 pt-12 mx-auto max-w-7xl md:px-8">

          <div
            className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden"
          >
            <img
              src={BackgroundImageSrc}
              alt="Diagonal background graphic"
              className="absolute top-0 left-0 object-cover w-full h-full"
            />
          </div>

          <div className="relative z-20 flex flex-col items-start pt-10 pb-12 lg:flex-row lg:pb-0">

            <div className="relative z-20 w-full p-4 pb-20 text-white lg:w-3/5 md:p-6">

              <p className="flex items-center justify-center gap-2 mb-4 font-semibold text-white lg:justify-start">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>#1 Netherlands Company Formation Service</span>
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              </p>

              <h1 className="text-[#fff] mb-4 text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl font-sans">
                Company Registration in Netherlands
              </h1>

              <p className="text-[#fff] text-lg max-w-lg mb-6">
                Launch your business in Europe's most connected economy. Benefit from a pro-business environment, favorable tax system, and a strategic gateway to the EU market.
              </p>

              <div className="mb-8 space-y-1">
                <p className="flex items-center gap-2 text-[#fff] text-sm"><span className="block w-2 h-2 bg-green-500"></span> 100% remote setup for your Dutch BV (Private Limited Company).</p>
                <p className="flex items-center gap-2 text-[#fff] text-sm"><span className="block w-2 h-2 bg-indigo-500"></span> Expert guidance on tax, compliance, and opening a bank account.</p>
              </div>
            </div>

            <div className="w-full lg:w-[400px] relative z-30 lg:mt-0 lg:ml-auto mt-[-20px] sm:mt-[-20px] mb-12 lg:mr-4">
              <div
                className="w-full p-6 bg-white shadow-xl md:p-8 rounded-2xl"
                style={{ borderRadius: '24px', border: '1px solid #E0E0E0' }}
              >
                <h2 className="mb-4 text-xl font-semibold text-gray-800 font-sans">Start Your Dutch Company</h2>
                <form className="space-y-3">
                  <input className="w-full px-4 py-2 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg text-sm text-gray-500 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="Your Name" />
                  <input className="w-full px-4 py-2 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg text-sm text-gray-500 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="Email" />
                  <input className="w-full px-4 py-2 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg text-sm text-gray-500 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="Mobile Number" />
                  <input className="w-full px-4 py-2 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg text-sm text-gray-500 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="City/Pincode" />

                  <div className="flex items-center justify-between text-gray-600">
                    <p className="text-xs font-medium text-gray-700 md:text-sm">Get Easy Updates Through Whatsapp</p>
                    <div className="w-10 h-5 bg-gray-300 rounded-full relative cursor-pointer flex items-center p-0.5 transition-colors">
                      <div className="w-4 h-4 transition-transform transform translate-x-0 bg-white rounded-full shadow-md"></div>
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-[#113C6D] text-white py-2.5 font-semibold rounded-lg transition-colors hover:bg-indigo-900 text-base shadow-md mt-2">
                    Talk to an Expert
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === Main Content Tabs Navigation (Sticky) === */}
      <section className="py-4 md:py-6 px-4 md:px-8 bg-white border-b border-gray-200 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center bg-white rounded-xl w-full text-xs md:text-sm lg:text-base overflow-x-auto border border-gray-200">
            {nlRegTabs.map((tab) => (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                className={`flex flex-col flex-shrink-0 min-w-[100px] md:min-w-[120px] py-3 md:py-4 px-2 text-center font-bold cursor-pointer transition-all ${activeTab === tab.id ? 'bg-[#E6F0F6] border-b-4 border-[#022B50] text-[#022B50]' : 'text-gray-700 hover:bg-gray-50'}`}
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

      {/* === All Tab Content Sections === */}
      <div className="py-2 md:py-4 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <NLOverviewContent />
          <NLAdvantagesContent />
          <NLTypesContent />
          <NLProcessContent />
          <NLDocumentsContent />
          <NLTaxContent />
          <NLWhyVakilsearch />
          <NLFAQsContent faqs={nlFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
        </div>
      </div>

    </div>
  );
}