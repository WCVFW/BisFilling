import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X, Menu, ChevronDown, ArrowRight } from "lucide-react"; // Using Lucide icons for reliability, or replace with your font-awesome/svgs
// Ensure these paths are correct for your project
import logo from "../assets1/img/logo.png";
import headerShape from "../assets1/img/header-shape.svg";

// --- Navigation Data ---
const navLinks = [
  {
    id: 'consult',
    label: 'Consult an Expert',
    href: '/ConsultanExpert/talkToLawyer',
    dropdown: [
      { label: 'Talk to a Lawyer', href: '/ConsultanExpert/talkToLawyer' },
      { label: 'Talk to a Chartered Accountant', href: '/ConsultanExpert/talkToCA' },
      { label: 'Talk to a Company Secretary', href: '/ConsultanExpert/talkToCS' },
      { label: 'Talk to an IP/Trademark Lawyer', href: '/ConsultanExpert/talkToIP' },
    ],
    dropdownWidth: 250,
  },
  {
    id: 'business',
    label: 'Business Setup',
    href: '/BusinessSetup/plc',
    isMegaMenu: true,
    dropdown: {
      'Company Registration': [
        { label: 'Private Limited Company', href: '/BusinessSetup/plc' },
        { label: 'Limited Liability Partnership', href: '/BusinessSetup/llp' },
        { label: 'One Person Company', href: '/BusinessSetup/opc' },
        { label: 'Sole Proprietorship', href: '/BusinessSetup/sp' },
        { label: 'Nidhi Company', href: '/BusinessSetup/nidhi' },
        { label: 'Producer Company', href: '/BusinessSetup/producer' },
        { label: 'Partnership Firm', href: '/BusinessSetup/partnership' },
        { label: 'Startup India Registration', href: '/BusinessSetup/startup' },
      ],
      'International Setup': [
        { label: 'US Incorporation', href: '/International/us' },
        { label: 'Singapore', href: '/International/singapore' },
        { label: 'UK Company', href: '/International/uk' },
        { label: 'Netherlands Incorporation', href: '/International/netherlands' },
        { label: 'Hong Kong Company', href: '/International/hong-kong' },
        { label: 'Dubai Company', href: '/International/dubai' },
        { label: 'International TM Registration', href: '/International/international-trademark' },
      ],
      'Licenses & Registrations': [
        { label: 'Digital Signature Certificate', href: '/Licenses/dsc' },
        { label: 'Udyam Registration', href: '/Licenses/udyam' },
        { label: 'MSME Registration', href: '/Licenses/msme' },
        { label: 'ISO Certification', href: '/Licenses/iso' },
        { label: 'FSSAI [Food License]', href: '/Licenses/fssai' },
        { label: 'IEC [Import/Export Code]', href: '/Licenses/iec' },
        { label: 'Apeda RCMC', href: '/Licenses/apeda-rcmc' },
        { label: 'Spice Board Registration', href: '/Licenses/spice-board' },
        { label: 'FIEO Registration', href: '/Licenses/fieo' },
        { label: 'Legal Metrology', href: '/Licenses/legal-metrology' },
        { label: 'Hallmark Registration', href: '/Licenses/hallmark' },
        { label: 'BIS Registration', href: '/Licenses/bis' },
        { label: 'Liquor License', href: '/Licenses/liquor' },
        { label: 'CLRA Registration & Licensing', href: '/Licenses/clra' },
        { label: 'AD Code Registration', href: '/Licenses/adcode' },
        { label: 'IRDAI Registration', href: '/Licenses/irdai' },
        { label: 'Drug & Cosmetic License', href: '/Licenses/drug-cosmetic' },
        { label: 'Customs Clearance', href: '/Licenses/customs-clearance' },
      ],
    },
    dropdownWidth: 750,
  },
  {
    id: 'fundraising',
    label: 'Fundraising',
    href: '/Fundraising',
    dropdown: [
      { label: 'Fundraising', href: '/Fundraising' },
      { label: 'Pitch Deck', href: '/Fundraising/pitch-deck' },
      { label: 'Business Loan', href: '/Fundraising/business-loan' },
      { label: 'DPR Service', href: '/Fundraising/dpr' },
    ],
    dropdownWidth: 200,
  },
  {
    id: 'ngo',
    label: 'NGO',
    href: '/NGO',
    isMegaMenu: true,
    dropdown: {
      'NGO Registration': [
        { label: 'NGO', href: '/NGO' },
        { label: 'Section 8 Company', href: '/NGO/section-8' },
        { label: 'Trust Registration', href: '/NGO/trust' },
      ],
      'NGO Compliance': [
        { label: 'NGO Compliance', href: '/NGO/compliance' },
        { label: 'Section 8 Compliance', href: '/NGO/section8' },
        { label: 'CSR-1 Filing', href: '/NGO/csr1' },
        { label: 'Sec.80G & Sec.12A', href: '/NGO/80g-12a' },
        { label: 'Darpan Registration', href: '/NGO/darpan' },
        { label: 'FCRA Registration', href: '/NGO/fcra' },
      ],
    },
    dropdownWidth: 500,
  },
];

// --- Desktop Components ---
const NavItem = ({ item, onMouseEnter, onMouseLeave }) => {
  const navItemRef = useRef(null);

  const handleMouseEnter = () => {
    if (navItemRef.current) {
      const rect = navItemRef.current.getBoundingClientRect();
      onMouseEnter(item.id, rect, item.dropdown, item.dropdownWidth, item.isMegaMenu);
    }
  };

  return (
    <li
      ref={navItemRef}
      className="relative mx-1 xl:mx-2 h-full flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <a href={item.href} className="font-medium hover:text-[#1A7F7D] transition p-2 whitespace-nowrap text-gray-800 text-sm xl:text-base">
        {item.label}
      </a>
    </li>
  );
};

const DropdownPortal = ({ content, position, width, isMegaMenu, onMouseEnter, onMouseLeave }) => {
  if (!content) return null;

  const renderContent = () => {
    if (isMegaMenu) {
      const columns = Object.keys(content);
      const gridCols = `repeat(${columns.length}, 1fr)`;
      return (
        <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: "24px" }}>
          {columns.map(title => (
            <div key={title}>
              <h4 className="font-bold text-xs text-gray-900 uppercase tracking-wider mb-3 border-b border-gray-100 pb-2">{title}</h4>
              <ul className="space-y-2">
                {content[title].map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="block text-sm text-gray-600 hover:text-[#1A7F7D] hover:translate-x-1 transition-all duration-200">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    }

    return (
      <ul className="space-y-1">
        {content.map(link => (
          <li key={link.label}>
            <a href={link.href} className="block text-sm text-gray-600 hover:text-[#1A7F7D] hover:bg-gray-50 px-3 py-2 rounded transition-colors">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    );
  };

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: `${position.top}px`, // Removed extra margin for tighter feel
        left: `${position.left}px`,
        width: `${width}px`,
        minWidth: `${width}px`,
        backgroundColor: 'white',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        borderRadius: '0 0 12px 12px',
        padding: '24px',
        zIndex: 9999,
        borderTop: '2px solid #1A7F7D',
        opacity: 1,
        animation: 'fadeIn 0.2s ease-out'
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      {renderContent()}
    </div>,
    document.body
  );
};

// --- Mobile Components ---
const MobileSubMenu = ({ dropdown, isMegaMenu }) => {
  if (!dropdown) return null;

  const renderLinks = (links) => (
    <ul className="pl-4 space-y-3 mt-2 border-l-2 border-gray-100 ml-2">
      {links.map((link) => (
        <li key={link.label}>
          <a href={link.href} className="block text-sm text-gray-600 hover:text-[#1A7F7D]">
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );

  if (isMegaMenu) {
    return (
      <div className="mt-2 space-y-4 pl-2">
        {Object.keys(dropdown).map((category) => (
          <div key={category}>
            <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{category}</h5>
            {renderLinks(dropdown[category])}
          </div>
        ))}
      </div>
    );
  }

  return renderLinks(dropdown);
};

export default function Header() {
  const [showHeader, setShowHeader] = useState(true);
  
  // Desktop State
  const [activeMenu, setActiveMenu] = useState(null);
  const [menuConfig, setMenuConfig] = useState({
    content: null,
    position: { top: 0, left: 0 },
    width: 0,
    isMegaMenu: false,
  });
  
  // Mobile State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState(null);

  const lastScrollYRef = useRef(0);
  let leaveTimeout = useRef(null);

  // --- 1. Body Scroll Lock for Mobile ---
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  // --- 2. Scroll Detection ---
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      lastScrollYRef.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- Desktop Handlers ---
  const handleMenuEnter = (menuId, rect, content, width, isMegaMenu) => {
    clearTimeout(leaveTimeout.current);
    const margin = 16;
    const rawLeft = isMegaMenu ? rect.left - 20 : rect.left;
    const maxLeft = Math.max(margin, window.innerWidth - width - margin);
    const left = Math.min(Math.max(margin, rawLeft), maxLeft);

    setMenuConfig({
      content,
      position: { top: rect.bottom, left },
      width,
      isMegaMenu,
    });
    setActiveMenu(menuId);
  };

  const handleMenuLeave = () => {
    leaveTimeout.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  const handleDropdownEnter = () => {
    clearTimeout(leaveTimeout.current);
  };

  // --- Mobile Handlers ---
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleMobileSubmenu = (id) => {
    setExpandedMobileItem(expandedMobileItem === id ? null : id);
  };

  return (
    <>
      {/* Header Container */}
      <header
        className={`cs_site_header bg-white transition-all duration-500 ease-in-out
          ${showHeader ? "translate-y-0" : "-translate-y-full"}
          ${isMobileMenuOpen ? "translate-y-0" : ""} 
        `}
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 9000,
          boxShadow: showHeader ? "0 4px 12px rgba(0,0,0,0.08)" : "none",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="relative flex items-center justify-between h-20">

            {/* Shape (Desktop Only) */}
            <div className="absolute top-0 left-0 hidden lg:block pointer-events-none">
              <img src={headerShape} alt="Header shape" className="h-full" />
            </div>

            {/* 1. Logo */}
            <div className="relative z-10 flex-shrink-0">
              <a href="/" aria-label="Home">
                <img src={logo} alt="BisFilling Logo" className="w-20 md:w-24 h-auto object-contain" />
              </a>
            </div>

            {/* 2. Desktop Nav (Hidden on Mobile/Tablet < 1024px) */}
            <div className="hidden lg:flex flex-grow justify-center h-full">
              <ul className="flex gap-2 xl:gap-6 items-center m-0 p-0 list-none h-full">
                {navLinks.map(item => (
                  <NavItem
                    key={item.id}
                    item={item}
                    onMouseEnter={handleMenuEnter}
                    onMouseLeave={handleMenuLeave}
                  />
                ))}
              </ul>
            </div>

            {/* 3. Right Actions */}
            <div className="flex items-center gap-3 md:gap-4 z-10">
              
              {/* Auth Buttons (Hidden on Mobile < 1024px to save space, shown in drawer) */}
              <div className="hidden lg:flex items-center gap-3">
                <a
                  href="/login"
                  className="text-sm font-bold uppercase transition duration-300 hover:text-[#1A7F7D]"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="text-sm px-5 py-2.5 font-bold text-white uppercase rounded-full transition-all duration-300 hover:shadow-lg flex items-center gap-2"
                  style={{
                    background: "radial-gradient(circle at center, #1A7F7D 0%, #23938D 100%)"
                  }}
                >
                  <span>Sign Up</span>
                  <ArrowRight size={16} />
                </a>
              </div>

              {/* Mobile Toggle (Visible < 1024px) */}
              <button 
                className="lg:hidden p-2 text-gray-800 focus:outline-none z-50"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>

            </div>
          </div>
        </div>
      </header>

      {/* --- Desktop Dropdown (Portal) --- */}
      {activeMenu && !isMobileMenuOpen && (
        <DropdownPortal
          content={menuConfig.content}
          position={menuConfig.position}
          width={menuConfig.width}
          isMegaMenu={menuConfig.isMegaMenu}
          onMouseEnter={handleDropdownEnter}
          onMouseLeave={handleMenuLeave}
        />
      )}

      {/* --- Mobile Navigation Drawer --- */}
      <div 
        className={`fixed inset-0 bg-white z-[8999] overflow-y-auto transition-transform duration-300 lg:hidden
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ paddingTop: "80px" }} // Add padding to clear the fixed header
      >
        <div className="container mx-auto px-4 pb-12">
          <div className="flex flex-col space-y-1">
            {navLinks.map((item) => (
              <div key={item.id} className="border-b border-gray-50 last:border-0">
                <button 
                  onClick={() => toggleMobileSubmenu(item.id)}
                  className="w-full flex items-center justify-between py-4 text-left font-semibold text-gray-800"
                >
                  <span className="text-lg">{item.label}</span>
                  <span className={`transform transition-transform duration-200 ${expandedMobileItem === item.id ? 'rotate-180 text-[#1A7F7D]' : 'text-gray-400'}`}>
                    <ChevronDown size={20} />
                  </span>
                </button>

                {/* Accordion Body */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out 
                  ${expandedMobileItem === item.id ? 'max-h-[1500px] opacity-100 mb-4' : 'max-h-0 opacity-0'}`}
                >
                   <MobileSubMenu dropdown={item.dropdown} isMegaMenu={item.isMegaMenu} />
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Auth Buttons (Shown here on small screens) */}
          <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
             <a
                href="/login"
                className="flex items-center justify-center py-3 font-bold uppercase border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Login
              </a>
              <a
                href="/signup"
                className="flex items-center justify-center py-3 font-bold text-white uppercase rounded-lg shadow-md"
                style={{
                  background: "radial-gradient(circle at center, #1A7F7D 0%, #23938D 100%)"
                }}
              >
                Sign Up
              </a>
          </div>
        </div>
      </div>
      
      {/* Overlay for background dimming (Optional, adds polish) */}
      {isMobileMenuOpen && (
         <div className="fixed inset-0 bg-black/20 z-[8000] lg:hidden" onClick={toggleMobileMenu} aria-hidden="true" />
      )}
    </>
  );
}