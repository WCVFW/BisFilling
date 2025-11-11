import React, { useState, useEffect } from "react";
import logo from "../assets1/img/logo.png";
import headerShape from "../assets1/img/header-shape.svg";

export default function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Scroll detection effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down → hide header
        setShowHeader(false);
      } else {
        // Scrolling up → show header
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`cs_site_header cs_style_1 cs_sticky_header cs_heading_font position-relative transition-all duration-500 ease-in-out ${
        showHeader ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 50,
        backgroundColor: "white",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <div className="cs_main_header">
        <div className="container">
          <div className="cs_main_header_in position-relative">

            {/* Decorative Header Shape */}
            <div className="cs_header_shape position-absolute">
              <img src={headerShape} alt="Header shape" />
            </div>

            {/* Logo */}
            <div className="cs_main_header_left position-relative z-1">
              <a className="cs_site_branding" href="/" aria-label="Home page link">
                <img src={logo} alt="BisFilling Logo" className="w-24 h-auto" />
              </a>
            </div>

            {/* Navigation Menu */}
            <div className="cs_main_header_center">
              <div className="cs_nav">
                <ul className="cs_nav_list">
                  {/* Consult an Expert */}
                  <li className="menu-item-has-children">
                    <a href="/ConsultanExpert/talkToLawyer">Consult an Expert</a>
                    <ul>
                      <li><a href="/ConsultanExpert/talkToLawyer">Talk to a Lawyer</a></li>
                      <li><a href="/ConsultanExpert/talkToCA">Talk to a Chartered Accountant</a></li>
                      <li><a href="/ConsultanExpert/talkToCS">Talk to a Company Secretary</a></li>
                      <li><a href="/ConsultanExpert/talkToIP">Talk to an IP/Trademark Lawyer</a></li>
                    </ul>
                  </li>

                  {/* Business Setup */}
                  <li className="menu-item-has-children">
                    <a href="/BusinessSetup/plc">Business Setup</a>
                    <ul>
                      <li><a href="/BusinessSetup/plc">Private Limited Company</a></li>
                      <li><a href="/BusinessSetup/llp">Limited Liability Partnership</a></li>
                      <li><a href="/BusinessSetup/opc">One Person Company</a></li>
                      <li><a href="/BusinessSetup/sp">Sole Proprietorship</a></li>
                      <li><a href="/BusinessSetup/nidhi">Nidhi Company</a></li>
                      <li><a href="/BusinessSetup/producer">Producer Company</a></li>
                      <li><a href="/BusinessSetup/partnership">Partnership Firm</a></li>
                      <li><a href="/BusinessSetup/startup">Startup India Registration</a></li>
                      <li><a href="/International/us">US Incorporation</a></li>
                      <li><a href="/International/singapore">Singapore Incorporation</a></li>
                      <li><a href="/International/uk">UK Incorporation</a></li>
                      <li><a href="/International/international-trademark">International TM Registration</a></li>
                    </ul>
                  </li>

                  {/* Fundraising */}
                  <li className="menu-item-has-children">
                    <a href="/Fundraising">Fundraising</a>
                    <ul>
                      <li><a href="/Fundraising/pitch-deck">Pitch Deck</a></li>
                      <li><a href="/Fundraising/business-loan">Business Loan</a></li>
                      <li><a href="/Fundraising/dpr">DPR Service</a></li>
                    </ul>
                  </li>

                  {/* NGO */}
                  <li className="menu-item-has-children">
                    <a href="/NGO">NGO</a>
                    <ul>
                      <li><a href="/NGO/section-8">Section 8 Company</a></li>
                      <li><a href="/NGO/trust">Trust Registration</a></li>
                      <li><a href="/NGO/compliance">NGO Compliance</a></li>
                      <li><a href="/NGO/csr1">CSR-1 Filing</a></li>
                      <li><a href="/NGO/80g-12a">Sec.80G & 12A</a></li>
                      <li><a href="/NGO/fcra">FCRA Registration</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            {/* Login / Signup Buttons */}
            <div className="cs_main_header_right flex items-center space-x-3">
              <a
                href="/login"
                className="cs_btn text-sm px-4 cs_bold uppercase transition duration-300"
                style={{ color: "black" }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "radial-gradient(circle at center, #1A7F7D 0%, #23938D 100%)";
                  e.currentTarget.style.WebkitBackgroundClip = "text";
                  e.currentTarget.style.WebkitTextFillColor = "transparent";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "none";
                  e.currentTarget.style.WebkitBackgroundClip = "unset";
                  e.currentTarget.style.WebkitTextFillColor = "black";
                }}
              >
                Login
              </a>

              <a
                href="/signup"
                className="cs_btn cs_style_1 text-sm px-3 py-1.5 cs_bold cs_white_color uppercase transition-all duration-300"
                style={{
                  background: "radial-gradient(circle at center, #1A7F7D 0%, #23938D 100%)"
                }}
              >
                <span>Sign Up</span>
                <span className="cs_btn_icon">
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
