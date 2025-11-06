import React from "react";
import { motion } from "framer-motion";
import ComplianceSection from "../pages/ComplianceSection";
import WhyChooseSection from "../pages/WhyChooseSection"

export default function Home() {
  return (
    <>
      <div className="cs_preloader cs_white_bg">
        <div className="cs_preloader_in position-relative">
          <span></span>
        </div>
      </div>
      <header className="cs_site_header cs_style_1 cs_type_1 cs_sticky_header cs_heading_color cs_heading_font position-relative">
        <div className="cs_main_header position-relative z-1">
          <div className="container">
            <div className="cs_main_header_in position-relative">
              <div className="cs_header_shape position-absolute">
                <img src="assets1/img/header-shape-2.svg" alt="Header shape" />
              </div>
              <div className="cs_main_header_left position-relative z-1">
                <a className="cs_site_branding" href="index.html" aria-label="Home page link">
                  <img src="assets1/img/logo.svg" alt="Logo" />
                </a>
              </div>
              <div className="cs_main_header_center">
                <div className="cs_nav">
                  <ul className="cs_nav_list">
                    <li className="menu-item-has-children">
                      <a href="#home" aria-label="Menu link">Home</a>
                      <ul>
                        <li><a href="index.html" aria-label="Menu link">Home Main</a></li>
                        <li><a href="home-v2.html" aria-label="Menu link">Home V2</a></li>
                        <li><a href="home-v3.html" aria-label="Menu link">Home V3</a></li>
                      </ul>
                    </li>
                    <li><a href="about-us.html" aria-label="Menu link">About Us</a></li>
                    <li className="menu-item-has-children">
                      <a href="" aria-label="Menu link">Services</a>
                      <ul>
                        <li><a href="services.html" aria-label="Menu link">Services</a></li>
                        <li><a href="service-details.html" aria-label="Menu link">Service Details</a></li>
                      </ul>
                    </li>
                    <li className="menu-item-has-children">
                      <a href="" aria-label="Menu link">Pages</a>
                      <ul>
                        <li><a href="team.html" aria-label="Menu link">Our Team</a></li>
                        <li><a href="team-details.html" aria-label="Menu link">Team Details</a></li>
                        <li><a href="projects.html" aria-label="Menu link">Our Projects</a></li>
                        <li><a href="project-details.html" aria-label="Menu link">Project Details</a></li>
                        <li><a href="pricing.html" aria-label="Menu link">Our Pricing</a></li>
                        <li><a href="integrations.html" aria-label="Menu link">Integrations</a></li>
                        <li><a href="faqs.html" aria-label="Menu link">FAQ & Answer</a></li>
                        <li><a href="error.html" aria-label="Menu link">Error</a></li>
                      </ul>
                    </li>
                    <li className="menu-item-has-children">
                      <a href="" aria-label="Menu link">Blog</a>
                      <ul>
                        <li><a href="blog.html" aria-label="Menu link">Blog</a></li>
                        <li><a href="blog-standard.html" aria-label="Menu link">Blog Standard</a></li>
                        <li><a href="blog-details.html" aria-label="Menu link">Blog Details</a></li>
                      </ul>
                    </li>
                    <li><a href="contact.html" aria-label="Menu link">Contact Us</a></li>
                  </ul>
                </div>
              </div>
              <div className="cs_main_header_right">
                <a href="contact.html" aria-label="Get started button" className="cs_btn cs_style_1 cs_bg_1 cs_fs_14 cs_bold cs_white_color text-uppercase">
                  <span>Get Started</span>
                  <span className="cs_btn_icon"><i className="fa-solid fa-arrow-right"></i></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="cs_hero cs_style_2 cs_bg_filed position-relative" data-src="assets1/img/hero-bg-2.jpg">
        <div className="container">
          <div className="text-center cs_hero_text position-relative">
            <p className="text-center cs_hero_subtitle cs_heading_color cs_heading_font cs_mb_18">
              <span className="cs_theme_color_4">
                <img src="assets1/img/icons/star-1.svg" alt="Star icon" />
              </span>
              <span>Welcome To Saaso</span>
              <span className="cs_theme_color_4">
                <img src="assets1/img/icons/star-1.svg" alt="Star icon" />
              </span>
            </p>
            <h1 className="cs_hero_title cs_fs_64 cs_mb_20 wow fadeInDown">Our SaaS Solution to Simplify <br /> Your Operations</h1>
            <p className="cs_hero_desc cs_mb_26">All the generators on the Internet tend to repeat predefined chunks as necessary, making <br /> this the first true generator on the Internet.All the generators on the Internet</p>
            <div className="cs_btns_group">
              <a href="contact.html" aria-label="Get started button" className="cs_btn cs_style_1 cs_bg_1 cs_fs_14 cs_bold cs_white_color text-uppercase">
                <span>Get Started</span>
                <span className="cs_btn_icon"><i className="fa-solid fa-arrow-right"></i></span>
              </a>
              <a href="about-us.html" aria-label="About page link" className="cs_btn cs_style_1 cs_outline cs_ cs_fs_14 cs_bold cs_heading_color text-uppercase">
                <span>Learn More</span>
                <span className="cs_btn_icon"><i className="fa-solid fa-arrow-right"></i></span>
              </a>
            </div>
            <div className="cs_hero_shape_1 position-absolute">
              <img src="assets1/img/hero-shape-1.svg" alt="Shape" />
            </div>
          </div>
          <div className="cs_hero_shape_2 position-absolute">
            <img src="assets1/img/hero-shape-2.svg" alt="Shape" />
          </div>
        </div>
      </section>
      <div className="cs_banner cs_style_1 position-relative">
        <div className="container">
          <div className="cs_banner_thumbnail_wrapper">
            <div className="cs_banner_thumbnail">
              <img src="assets1/img/banner-img-1.png" alt="Banner image" />
            </div>
            <div className="cs_banner_thumbnail">
              <img src="assets1/img/phone-img-1.png" alt="Phone image" />
            </div>
          </div>
        </div>
      </div>
      <section>
        <div className="cs_height_120 cs_height_lg_80"></div>
        <div className="container">
          <div className="cs_mb_31">
            <h2 className="mb-0 cs_fs_20 cs_normal">Trusted by 100,000+ teams globally at innovative companies</h2>
          </div>
          <div className="cs_horizontal_slider_wrapper">
            <div className="cs_slider_in">
              <div className="cs_brands_list">
                <div className="cs_center">
                  <img src="assets1/img/brand-6.svg" alt="Brand logo" />
                </div>
                <div className="cs_center">
                  <img src="assets1/img/brand-7.svg" alt="Brand logo" />
                </div>
                <div className="cs_center">
                  <img src="assets1/img/brand-8.svg" alt="Brand logo" />
                </div>
                <div className="cs_center">
                  <img src="assets1/img/brand-9.svg" alt="Brand logo" />
                </div>
                <div className="cs_center">
                  <img src="assets1/img/brand-10.svg" alt="Brand logo" />
                </div>
                <div className="cs_center">
                  <img src="assets1/img/brand-1.svg" alt="Brand logo" />
                </div>
              </div>
              <div className="cs_brands_list">
                <div className="cs_center">
                  <img src="assets1/img/brand-6.svg" alt="Brand logo" />
                </div>
                <div className="cs_center">
                  <img src="assets1/img/brand-7.svg" alt="Brand logo" />
                </div>
                <div className="cs_center">
                  <img src="assets1/img/brand-8.svg" alt="Brand logo" />
                </div>
                <div className="cs_center">
                  <img src="assets1/img/brand-9.svg" alt="Brand logo" />
                </div>
                <div className="cs_center">
                  <img src="assets1/img/brand-10.svg" alt="Brand logo" />
                </div>
                <div className="cs_center">
                  <img src="assets1/img/brand-1.svg" alt="Brand logo" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="position-relative">
        <div className="cs_height_120 cs_height_lg_80"></div>
        <div className="container">
          <div className="text-center cs_section_heading cs_style_1 cs_mb_47 cs_center_column position-relative z-1">
            <div className="cs_section_subtitle cs_fs_18 cs_heading_color cs_mb_22">
              <img src="assets1/img/icons/star-1.svg" alt="Star icon" />
              <span>Awesome Feature</span>
              <img src="assets1/img/icons/star-1.svg" alt="Star icon" />
            </div>
            <h2 className="mb-0 cs_section_title cs_fs_48 cs_semibold wow fadeInUp">Powerful Features to Elevate <br /> Your Workflow</h2>
            <div className="cs_features_items_wrapper position-relative z-1">
              <div className="cs_feature_item cs_radius_20 cs_bg_filed" data-src="assets1/img/feature-item-bg.svg">
                <h3 className="cs_fs_36 cs_semibold cs_white_color cs_mb_40">See more and get visibility <br /> for your business</h3>
                <a href="contact.html" aria-label="Get started button" className="cs_btn cs_style_1 cs_fs_14 cs_bold cs_white_color text-uppercase">
                  <span>Get Started</span>
                  <span className="cs_btn_icon"><i className="fa-solid fa-arrow-right"></i></span>
                </a>
              </div>
              <div className="cs_feature_item cs_white_bg cs_radius_20">
                <span className="cs_feature_icon cs_center cs_radius_12 cs_mb_15">
                  <img src="assets1/img/icons/code-icon.svg" alt="Coding icon" />
                </span>
                <h3 className="cs_fs_24 cs_semibold cs_mb_6">
                  <a href="service-details.html" aria-label="Service details link">Software Development</a>
                </h3>
                <ul className="cs_features_list cs_mp_0">
                  <li>
                    <img src="assets1/img/icons/caret-icon.svg" alt="Caret icon" />
                    <span>Security</span>
                  </li>
                  <li>
                    <img src="assets1/img/icons/caret-icon.svg" alt="Caret icon" />
                    <span>Agile Methodologies</span>
                  </li>
                  <li>
                    <img src="assets1/img/icons/caret-icon.svg" alt="Caret icon" />
                    <span>Clear Requirements</span>
                  </li>
                  <li>
                    <img src="assets1/img/icons/caret-icon.svg" alt="Caret icon" />
                    <span>Feedback &  Improvement</span>
                  </li>
                </ul>
                <a href="service-details.html" aria-label="Service details link" className="cs_text_btn cs_fs_14 cs_bold text-uppercase">
                  <span>Read More</span>
                  <span className="cs_btn_icon"><i className="fa-solid fa-arrow-right"></i></span>
                </a>
              </div>
              <div className="cs_feature_item cs_white_bg cs_radius_20">
                <span className="cs_feature_icon cs_center cs_bg_1 cs_radius_12 cs_mb_15">
                  <img src="assets1/img/icons/cloud-computing.svg" alt="Cloud computing icon" />
                </span>
                <h3 className="cs_fs_24 cs_semibold cs_mb_6">
                  <a href="service-details.html" aria-label="Service details link">Cloud Computing Solutions</a>
                </h3>
                <ul className="cs_features_list cs_mp_0">
                  <li>
                    <img src="assets1/img/icons/caret-icon.svg" alt="Caret icon" />
                    <span>Security</span>
                  </li>
                  <li>
                    <img src="assets1/img/icons/caret-icon.svg" alt="Caret icon" />
                    <span>Agile Methodologies</span>
                  </li>
                  <li>
                    <img src="assets1/img/icons/caret-icon.svg" alt="Caret icon" />
                    <span>Clear Requirements</span>
                  </li>
                  <li>
                    <img src="assets1/img/icons/caret-icon.svg" alt="Caret icon" />
                    <span>Feedback &  Improvement</span>
                  </li>
                </ul>
                <a href="service-details.html" aria-label="Service details link" className="cs_text_btn cs_fs_14 cs_bold text-uppercase">
                  <span>Read More</span>
                  <span className="cs_btn_icon"><i className="fa-solid fa-arrow-right"></i></span>
                </a>
              </div>
              <div className="cs_feature_item cs_white_bg cs_radius_20">
                <span className="cs_feature_icon cs_bg_2 cs_center cs_radius_12 cs_mb_15">
                  <img src="assets1/img/icons/quality-assurance.svg" alt="Quality assurance icon" />
                </span>
                <h3 className="cs_fs_24 cs_semibold cs_mb_6">
                  <a href="service-details.html" aria-label="Service details link">Quality Assurance</a>
                </h3>
                <ul className="cs_features_list cs_mp_0">
                  <li>
                    <img src="assets1/img/icons/caret-icon.svg" alt="Caret icon" />
                    <span>Security</span>
                  </li>
                  <li>
                    <img src="assets1/img/icons/caret-icon.svg" alt="Caret icon" />
                    <span>Agile Methodologies</span>
                  </li>
                  <li>
                    <img src="assets1/img/icons/caret-icon.svg" alt="Caret icon" />
                    <span>Clear Requirements</span>
                  </li>
                  <li>
                    <img src="assets1/img/icons/caret-icon.svg" alt="Caret icon" />
                    <span>Feedback &  Improvement</span>
                  </li>
                </ul>
                <a href="service-details.html" aria-label="Service details link" className="cs_text_btn cs_fs_14 cs_bold text-uppercase">
                  <span>Read More</span>
                  <span className="cs_btn_icon"><i className="fa-solid fa-arrow-right"></i></span>
                </a>
              </div>
              <div className="cs_feature_item cs_white_bg cs_radius_20">
                <span className="cs_feature_icon cs_bg_3 cs_center cs_radius_12 cs_mb_15">
                  <img src="assets1/img/icons/security.svg" alt="Cybersecurity security icon" />
                </span>
                <h3 className="cs_fs_24 cs_semibold cs_mb_6">
                  <a href="service-details.html" aria-label="Service details link">Cybersecurity Services</a>
                </h3>
                <ul className="cs_features_list cs_mp_0">
                  <li>
                    <img src="assets1/img/icons/caret-icon.svg" alt="Caret icon" />
                    <span>Security</span>
                  </li>
                  <li>
                    <img src="assets1/img/icons/caret-icon.svg" alt="Caret icon" />
                    <span>Agile Methodologies</span>
                  </li>
                  <li>
                    <img src="assets1/img/icons/caret-icon.svg" alt="Caret icon" />
                    <span>Clear Requirements</span>
                  </li>
                  <li>
                    <img src="assets1/img/icons/caret-icon.svg" alt="Caret icon" />
                    <span>Feedback &  Improvement</span>
                  </li>
                </ul>
                <a href="service-details.html" aria-label="Service details link" className="cs_text_btn cs_fs_14 cs_bold text-uppercase">
                  <span>Read More</span>
                  <span className="cs_btn_icon"><i className="fa-solid fa-arrow-right"></i></span>
                </a>
              </div>
            </div>
          </div>
          <div className="cs_feature_shape_1 position-absolute">
            <img src="assets1/img/3d-shape.png" alt="Vector shape" />
          </div>
          <div className="cs_feature_shape_2 position-absolute">
            <img src="assets1/img/spring-shape.png" alt="Spring shape" />
          </div>
          <div className="cs_height_120 cs_height_lg_80"></div>
        </div>
      </section>
      <section className="cs_gray_bg_2 position-relative">
        <div className="cs_height_120 cs_height_lg_80"></div>
        <div className="container">
          <div className="row cs_gap_y_40 position-relative z-1">
            <div className="col-lg-6 order-lg-2">
              <div className="cs_workink_process_heading cs_center_column position-relative">
                <div className="cs_section_heading cs_style_1 cs_mb_11 z-1">
                  <div className="cs_section_subtitle cs_fs_18 cs_heading_color cs_mb_22">
                    <img src="assets1/img/icons/star-1.svg" alt="Star icon" />
                    <span>How It work</span>
                    <img src="assets1/img/icons/star-1.svg" alt="Star icon" />
                  </div>
                  <h2 className="cs_section_title cs_fs_48 cs_semibold wow fadeInUp">Let's Utilize Optimum In Three Easy Actions.</h2>
                  <p className="cs_card_desc cs_mb_22">All the generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.</p>
                </div>
                <div className="cs_process_thumbnail z-1">
                  <img src="assets1/img/human-1.png" alt="Human image" />
                </div>
                <div className="bottom-0 cs_vector_shape position-absolute start-0">
                  <img src="assets1/img/vector-7.svg" alt="Vector shape" />
                </div>
              </div>
            </div>
            <div className="col-lg-6 order-lg-1">
              <div className="cs_iconbox_wrapper_2">
                <div className="cs_iconbox cs_style_2">
                  <span className="cs_iconbox_icon cs_center cs_accent_bg cs_mb_18">
                    <img src="assets1/img/icons/home.svg" alt="Browser icon" />
                  </span>
                  <h3 className="cs_fs_24 cs_semibold cs_mb_4">Create your account</h3>
                  <p className="mb-0">All the generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.</p>
                </div>
                <div className="cs_iconbox cs_style_2">
                  <span className="cs_iconbox_icon cs_bg_1 cs_center cs_mb_18">
                    <img src="assets1/img/icons/products.svg" alt="Product stack icon" />
                  </span>
                  <h3 className="cs_fs_24 cs_semibold cs_mb_4">Connect your product</h3>
                  <p className="mb-0">All the generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.</p>
                </div>
                <div className="cs_iconbox cs_style_2">
                  <span className="cs_iconbox_icon cs_bg_2 cs_center cs_mb_18">
                    <img src="assets1/img/icons/analytics.svg" alt="Analytics icon" />
                  </span>
                  <h3 className="cs_fs_24 cs_semibold cs_mb_4">Track Analytics your account</h3>
                  <p className="mb-0">All the generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cs_star_shape_4 position-absolute">
          <img src="assets1/img/star-shape.svg" alt="Star shape" />
        </div>
        <div className="cs_height_0 cs_height_lg_80"></div>
      </section>
      <section className="position-relative">
        <div className="cs_height_120 cs_height_lg_80"></div>
        <div className="container">
          <div className="cs_card cs_style_1 cs_type_3">
            <div className="row cs_gap_y_50 position-relative z-1">
              <div className="col-lg-6">
                <div className="cs_card_thumbnail position-relative">
                  <img src="assets1/img/dashboard.png" alt="Dashboard image" />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="cs_card_content">
                  <div className="cs_section_heading cs_style_1 cs_mb_27">
                    <div className="cs_section_subtitle cs_fs_18 cs_heading_color cs_mb_22">
                      <img src="assets1/img/icons/star-1.svg" alt="Star icon" />
                      <span>Customizations & Analysis</span>
                      <img src="assets1/img/icons/star-1.svg" alt="Star icon" />
                    </div>
                    <h2 className="cs_section_title cs_fs_48 cs_semibold wow fadeInLeft">We Make It Easy To Track All User Analytics</h2>
                    <p className="mb-0 cs_card_desc">All the generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.</p>
                  </div>
                  <div className="cs_iconbox_wrapper_1">
                    <div className="cs_iconbox cs_style_1 cs_type_1">
                      <span className="cs_iconbox_icon cs_center cs_accent_bg">
                        <img src="assets1/img/icons/advanced-tracking.svg" alt="Advanced tracking icon" />
                      </span>
                      <div className="cs_iconbox_info">
                        <h3 className="cs_fs_20 cs_semibold cs_mb_1">Advanced tracking</h3>
                        <p className="mb-0">All the generators on the Internet tend to repeat predefined chunks as</p>
                      </div>
                    </div>
                    <div className="cs_iconbox cs_style_1 cs_type_1">
                      <span className="cs_iconbox_icon cs_center cs_bg_1">
                        <img src="assets1/img/icons/in-depth.svg" alt="In-depth monitoring icon" />
                      </span>
                      <div className="cs_iconbox_info">
                        <h3 className="cs_fs_20 cs_semibold cs_mb_1">In-depth monitoring</h3>
                        <p className="mb-0">All the generators on the Internet tend to repeat predefined chunks as</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="cs_star_shape_5 position-absolute">
              <img src="assets1/img/3d-shape-2.png" alt="Vector shape" />
            </div>
          </div>
          <div className="cs_height_120 cs_height_lg_80"></div>
        </div>
      </section>
      <section className="cs_bg_filed position-relative" data-src="assets1/img/whychoose-bg-1.svg">
        <div className="cs_height_120 cs_height_lg_80"></div>
        <div className="container">
          <div className="cs_card cs_style_1 cs_type_4">
            <div className="row cs_gap_y_50 position-relative z-1">
              <div className="col-lg-6 order-lg-2">
                <div className="cs_card_thumbnail">
                  <img src="assets1/img/phone-img-2.png" alt="Phone image" />
                </div>
              </div>
              <div className="col-lg-6 order-lg-1">
                <div className="cs_card_content">
                  <div className="cs_section_heading cs_style_1 cs_mb_27">
                    <div className="cs_section_subtitle cs_fs_18 cs_white_color cs_mb_22">
                      <img src="assets1/img/icons/star-1.svg" alt="Star icon" />
                      <span>Why Choose us</span>
                      <img src="assets1/img/icons/star-1.svg" alt="Star icon" />
                    </div>
                    <h2 className="cs_section_title cs_fs_48 cs_semibold cs_white_color wow fadeInDown">Trusted Partner In Digital Growth & Innovation</h2>
                    <p className="mb-0 cs_card_desc cs_white_color">With over 10 years of experience, a diverse team of experts, and a proven track record, Relatix is your trusted partner in achieving digital excellence.</p>
                  </div>
                  <ul className="cs_list cs_style_2 cs_white_color cs_semibold cs_mp_0">
                    <li>
                      <span className="cs_list_icon cs_theme_color_4"><i className="fa-solid fa-circle-check"></i></span>
                      <span>Proven track record of success</span>
                    </li>
                    <li>
                      <span className="cs_list_icon cs_theme_color_4"><i className="fa-solid fa-circle-check"></i></span>
                      <span>Creative and user-centric designs</span>
                    </li>
                    <li>
                      <span className="cs_list_icon cs_theme_color_4"><i className="fa-solid fa-circle-check"></i></span>
                      <span>Tailored digital solutions</span>
                    </li>
                    <li>
                      <span className="cs_list_icon cs_theme_color_4"><i className="fa-solid fa-circle-check"></i></span>
                      <span>24/7 dedicated support team</span>
                    </li>
                  </ul>
                  <a href="about-us.html" aria-label="About us page link" className="cs_btn cs_style_1 cs_theme_bg_4 cs_fs_14 cs_heading_color cs_bold text-uppercase">
                    <span>Explore Now</span>
                    <span className="cs_btn_icon"><i className="fa-solid fa-arrow-right"></i></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="cs_height_0 cs_height_lg_80"></div>
        </div>
      </section>
      <section className="overflow-hidden position-relative">
        <div className="cs_height_120 cs_height_lg_80"></div>
        <div className="container">
          <div className="text-center cs_section_heading cs_style_1 cs_center_column cs_mb_60 position-relative z-1">
            <div className="cs_section_subtitle cs_fs_18 cs_heading_color cs_mb_22">
              <img src="assets1/img/icons/star-1.svg" alt="Star icon" />
              <span>Our Pricing</span>
              <img src="assets1/img/icons/star-1.svg" alt="Star icon" />
            </div>
            <h2 className="cs_section_title cs_fs_48 cs_semibold cs_mb_20 text-capitalize wow fadeInUp">Choose A Plan for more <br /> advanced business</h2>
            <div className="cs_center">
              <ul className="cs_pricing_control cs_center cs_mp_0 cs_fs_14 cs_bold text-uppercase position-relative">
                <li className="active"><a href="monthly" aria-label="Pricing toggle button">Monthly</a></li>
                <li>
                  <a href="yearly" aria-label="Pricing toggle button">Yearly</a>
                  <div className="cs_offer_info cs_fs_20 cs_heading_color cs_heading_font cs_normal position-absolute">
                    <span>Save 20%</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="row cs_row_gap_30 cs_gap_y_30 position-relative z-1">
            <div className="col-lg-6">
              <div className="cs_pricing_table cs_style_2 cs_white_bg cs_radius_20">
                <div className="cs_pricing_table_heading cs_mb_18">
                  <div>
                    <h2 className="cs_plan_title cs_fs_24 cs_semibold cs_mb_7">Starter Plan</h2>
                    <p className="mb-0">Advanced features & reporting</p>
                  </div>
                  <div className="cs_price cs_fs_74 cs_semibold cs_heading_color cs_heading_font">$<span className="monthlyPrice">49</span><span className="yearlyPrice">89</span></div>
                </div>
                <div className="cs_separator cs_mb_24"></div>
                <div className="cs_feature_list_wrapper cs_mb_28">
                  <div>
                    <h3 className="cs_feature_title cs_fs_24 cs_normal cs_mb_16">Account & Support</h3>
                    <ul className="cs_pricing_feature_list cs_mp_0">
                      <li>
                        <span className="cs_feature_icon"><i className="fa-solid fa-circle-check"></i></span>
                        <span>Unlimited users</span>
                      </li>
                      <li>
                        <span className="cs_feature_icon"><i className="fa-solid fa-circle-check"></i></span>
                        <span>Unlimited connectors</span>
                      </li>
                      <li>
                        <span className="cs_feature_icon"><i className="fa-solid fa-circle-check"></i></span>
                        <span>CRM onboarding session</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="cs_feature_title cs_fs_24 cs_normal cs_mb_16">Platform Access</h3>
                    <ul className="cs_pricing_feature_list cs_mp_0">
                      <li>
                        <span className="cs_feature_icon"><i className="fa-solid fa-circle-check"></i></span>
                        <span>Accountant access</span>
                      </li>
                      <li>
                        <span className="cs_feature_icon"><i className="fa-solid fa-circle-check"></i></span>
                        <span>Limited invoicing</span>
                      </li>
                      <li>
                        <span className="cs_feature_icon"><i className="fa-solid fa-circle-check"></i></span>
                        <span>Custom number of users</span>
                      </li>
                      <li>
                        <span className="cs_feature_icon"><i className="fa-solid fa-circle-check"></i></span>
                        <span>Up to 5 projects collaborations</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <a href="contact.html" aria-label="Buy service button" className="text-center cs_btn cs_style_1 cs_center cs_fs_14 cs_bold cs_heading_color text-uppercase">
                  <span>GET STARTED NOW</span>
                  <span className="cs_btn_icon"><i className="fa-solid fa-arrow-right"></i></span>
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="cs_pricing_table cs_style_2 cs_white_bg cs_radius_20 position-relative active">
                <div className="cs_pricing_table_heading cs_mb_18 position-relative z-1">
                  <div>
                    <h2 className="cs_plan_title cs_fs_24 cs_semibold cs_mb_7">Standard Plan</h2>
                    <p className="mb-0">Advanced features & reporting</p>
                  </div>
                  <div className="cs_price cs_fs_74 cs_semibold cs_heading_color cs_heading_font">$<span className="monthlyPrice">149</span><span className="yearlyPrice">189</span></div>
                </div>
                <div className="text-center cs_pricing_badge cs_heading_color cs_medium cs_theme_bg_4">Most Popular</div>
                <div className="cs_separator cs_mb_24"></div>
                <div className="cs_feature_list_wrapper cs_mb_28">
                  <div>
                    <h3 className="cs_feature_title cs_fs_24 cs_normal cs_mb_16">Account & Support</h3>
                    <ul className="cs_pricing_feature_list cs_mp_0">
                      <li>
                        <span className="cs_feature_icon"><i className="fa-solid fa-circle-check"></i></span>
                        <span>Unlimited users</span>
                      </li>
                      <li>
                        <span className="cs_feature_icon"><i className="fa-solid fa-circle-check"></i></span>
                        <span>Unlimited connectors</span>
                      </li>
                      <li>
                        <span className="cs_feature_icon"><i className="fa-solid fa-circle-check"></i></span>
                        <span>CRM onboarding session</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="cs_feature_title cs_fs_24 cs_normal cs_mb_16">Platform Access</h3>
                    <ul className="cs_pricing_feature_list cs_mp_0">
                      <li>
                        <span className="cs_feature_icon"><i className="fa-solid fa-circle-check"></i></span>
                        <span>Accountant access</span>
                      </li>
                      <li>
                        <span className="cs_feature_icon"><i className="fa-solid fa-circle-check"></i></span>
                        <span>Limited invoicing</span>
                      </li>
                      <li>
                        <span className="cs_feature_icon"><i className="fa-solid fa-circle-check"></i></span>
                        <span>Custom number of users</span>
                      </li>
                      <li>
                        <span className="cs_feature_icon"><i className="fa-solid fa-circle-check"></i></span>
                        <span>Up to 5 projects collaborations</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <a href="contact.html" aria-label="Buy service button" className="text-center cs_btn cs_style_1 cs_center cs_fs_14 cs_bold cs_heading_color text-uppercase">
                  <span>GET STARTED NOW</span>
                  <span className="cs_btn_icon"><i className="fa-solid fa-arrow-right"></i></span>
                </a>
              </div>
            </div>
          </div>
          <div className="cs_pricing_shape_3 position-absolute">
            <img src="assets1/img/trash-group-2.svg" alt="Vector image" />
          </div>
          <div className="cs_pricing_shape_4 position-absolute">
            <img src="assets1/img/vector-8.svg" alt="Vector image" />
          </div>
          <div className="cs_pricing_shape_5 position-absolute">
            <img src="assets1/img/vector-9.svg" alt="Vector image" />
          </div>
        </div>
        <div className="cs_height_120 cs_height_lg_80"></div>
      </section>
      <div className="cs_counter cs_style_1 cs_type_1 cs_accent_bg" data-src="assets1/img/counter-bg-2.svg">
        <div className="container">
          <div className="row cs_gap_y_30">
            <div className="col-lg-3 col-sm-6">
              <div className="text-center cs_numberbox cs_center_column">
                <div className="cs_counter_number cs_fs_48 cs_semibold cs_white_color cs_mb_10">
                  <span className="odometer" data-count-to="16"></span>K+
                </div>
                <p className="mb-0 cs_fs_24 cs_white_color">Completed Our <br /> Projects</p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="text-center cs_numberbox cs_center_column">
                <div className="cs_counter_number cs_fs_48 cs_semibold cs_white_color cs_mb_10">
                  <span className="odometer" data-count-to="180"></span>+
                </div>
                <p className="mb-0 cs_fs_24 cs_white_color">Our Expert Support <br /> Team Members</p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="text-center cs_numberbox cs_center_column">
                <div className="cs_counter_number cs_fs_48 cs_semibold cs_white_color cs_mb_10">
                  <span className="odometer" data-count-to="6"></span>K+
                </div>
                <p className="mb-0 cs_fs_24 cs_white_color">Our Worldwide <br /> Clients</p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="text-center cs_numberbox cs_center_column">
                <div className="cs_counter_number cs_fs_48 cs_semibold cs_white_color cs_mb_10">
                  <span className="odometer" data-count-to="35"></span>+
                </div>
                <p className="mb-0 cs_fs_24 cs_white_color">We are Winning <br /> Awards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section>
        <div className="cs_height_120 cs_height_lg_80"></div>
        <div className="container">
          <div className="cs_card cs_style_1 cs_type_5">
            <div className="row cs_gap_y_30">
              <div className="col-lg-5 order-lg-2">
                <a href="https://www.youtube.com/embed/HC-tgFdIcB0" aria-label="Click to play video" className="cs_video cs_style_1 cs_center cs_video_open cs_bg_filed cs_radius_15 position-relative" data-src="assets1/img/video-bg-1.jpg">
                  <span className="cs_player_btn cs_style_1 cs_center cs_radius_100 cs_theme_bg_3 cs_white_color position-relative"><i className="fa-solid fa-play"></i></span>
                  <div className="cs_vector_shape_5 position-absolute">
                    <img src="assets1/img/vector-10.svg" alt="Vector shape" />
                  </div>
                </a>
              </div>
              <div className="col-lg-7 order-lg-1">
                <div className="cs_card_content">
                  <div className="cs_section_heading cs_style_1 cs_mb_20">
                    <div className="cs_section_subtitle cs_fs_18 cs_heading_color cs_mb_22">
                      <img src="assets1/img/icons/star-1.svg" alt="Star icon" />
                      <span>Costumer Story</span>
                      <img src="assets1/img/icons/star-1.svg" alt="Star icon" />
                    </div>
                    <h2 className="mb-0 cs_section_title cs_fs_48 cs_semibold text-capitalize wow fadeInDown">How a certain consumer used a product successfully</h2>
                  </div>
                  <p className="cs_card_desc cs_mb_51">CRM management is comprehensive contact management, allowing businesses to centralize and organize customer information for easy access.</p>
                  <div className="cs_btns_group">
                    <a href="#" aria-label="Get started button" className="cs_btn cs_style_1 cs_bg_1 cs_fs_14 cs_bold cs_white_color text-uppercase">
                      <span>read costumer story </span>
                      <span className="cs_btn_icon"><i className="fa-solid fa-arrow-right"></i></span>
                    </a>
                    <div className="cs_client_info_wrapper">
                      <img src="assets1/img/customers-group-2.png" alt="Customers image" />
                      <div>
                        <h3 className="mb-0 cs_fs_18 cs_normal">Happy Costumer</h3>
                        <p className="mb-0"><span className="cs_theme_color_5"><i className="fa-solid fa-star"></i></span> 3.5(10k Review)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="cs_slider cs_style_1 cs_slider_gap_30 position-relative">
        <div className="cs_height_120 cs_height_lg_80"></div>
        <div className="container">
          <div className="cs_testimonial_slider_wrapper cs_radius_20 position-relative">
            <div className="cs_section_heading cs_style_1 cs_mb_10">
              <h2 className="mb-0 cs_section_title cs_fs_24 cs_normal">Clients Feedback</h2>
            </div>
            <div className="cs_slider_container" data-autoplay="0" data-loop="1" data-speed="600" data-center="0" data-variable-width="0" data-slides-per-view="responsive" data-xs-slides="1" data-sm-slides="1" data-md-slides="1" data-lg-slides="1" data-add-slides="1">
              <div className="cs_slider_wrapper">
                <div className="cs_slide">
                  <div className="cs_testimonial cs_style_2">
                    <div className="cs_testimonial_heading cs_mb_10">
                      <span className="cs_quote_icon cs_center cs_white_bg cs_radius_100">
                        <img src="assets1/img/icons/qote.svg" alt="Quote icon" />
                      </span>
                      <div className="cs_rating" data-rating="5">
                        <div className="cs_rating_percentage"></div>
                      </div>
                    </div>
                    <blockquote>This is why having reviews and client testimonials is so important for your business. So, in this article,  go over some client testimonial examples you should be aware of and how you can go about gathering those testimonials for yourself. This is why having reviews and client testimonials is so important for your business. So, in this article, we'll go over some client testimonial</blockquote>
                    <div className="cs_avatar cs_style_1">
                      <span className="cs_avatar_icon cs_center cs_radius_100">
                        <img src="assets1/img/avatar-5.jpg" alt="Avatar" />
                      </span>
                      <div className="cs_avatar_info">
                        <h3 className="mb-0 cs_fs_20 cs_semibold">Juliana Rose</h3>
                        <p className="mb-0 cs_fs_14">Marketing Manager</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cs_slide">
                  <div className="cs_testimonial cs_style_2">
                    <div className="cs_testimonial_heading cs_mb_10">
                      <span className="cs_quote_icon cs_center cs_white_bg cs_radius_100">
                        <img src="assets1/img/icons/qote.svg" alt="Quote icon" />
                      </span>
                      <div className="cs_rating" data-rating="5">
                        <div className="cs_rating_percentage"></div>
                      </div>
                    </div>
                    <blockquote>This is why having reviews and client testimonials is so important for your business. So, in this article,  go over some client testimonial examples you should be aware of and how you can go about gathering those testimonials for yourself. This is why having reviews and client testimonials is so important for your business. So, in this article, we'll go over some client testimonial</blockquote>
                    <div className="cs_avatar cs_style_1">
                      <span className="cs_avatar_icon cs_center cs_radius_100">
                        <img src="assets1/img/avatar-6.jpg" alt="Avatar" />
                      </span>
                      <div className="cs_avatar_info">
                        <h3 className="mb-0 cs_fs_20 cs_semibold">Anjelina Rose</h3>
                        <p className="mb-0 cs_fs_14">UI/UX Designer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cs_slider_arrows cs_style_1">
                <div className="cs_right_arrow rounded-circle cs_center cs_white_bg cs_theme_color_2 slick-arrow">
                  <i className="fa-solid fa-chevron-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cs_height_120 cs_height_lg_80"></div>
      </section>

      <section className="cs_gray_bg_2">
        <div className="cs_height_120 cs_height_lg_80"></div>
        <div className="container">
          <div className="cs_toolset_content cs_center_column position-relative">
            <div className="cs_toolset_logos">
              <div className="text-center cs_iconbox cs_style_3 cs_center_column cs_white_bg cs_radius_16">
                <span className="cs_iconbox_icon cs_mb_14">
                  <img src="assets1/img/icons/slack.svg" alt="Slack icon" />
                </span>
                <p className="mb-0 cs_medium">Slack</p>
              </div>
              <div className="text-center cs_iconbox cs_style_3 cs_center_column cs_white_bg cs_radius_16">
                <span className="cs_iconbox_icon cs_mb_14">
                  <img src="assets1/img/icons/dropbox.svg" alt="Dropbox icon" />
                </span>
                <p className="mb-0 cs_medium">Dropbox</p>
              </div>
              <div className="text-center cs_iconbox cs_style_3 cs_center_column cs_white_bg cs_radius_16">
                <span className="cs_iconbox_icon cs_mb_14">
                  <img src="assets1/img/icons/linkedin.svg" alt="LinkedIn icon" />
                </span>
                <p className="mb-0 cs_medium">LinkedIn</p>
              </div>
              <div className="text-center cs_iconbox cs_style_3 cs_center_column cs_white_bg cs_radius_16">
                <span className="cs_iconbox_icon cs_mb_14">
                  <img src="assets1/img/icons/hubspot.svg" alt="Hubspot icon" />
                </span>
                <p className="mb-0 cs_medium">Hubspot</p>
              </div>
              <div className="text-center cs_iconbox cs_style_3 cs_center_column cs_white_bg cs_radius_16">
                <span className="cs_iconbox_icon cs_mb_14">
                  <img src="assets1/img/icons/whatsapp.svg" alt="Whatsapp icon" />
                </span>
                <p className="mb-0 cs_medium">Whatsapp</p>
              </div>
              <div className="text-center cs_iconbox cs_style_3 cs_center_column cs_white_bg cs_radius_16">
                <span className="cs_iconbox_icon cs_mb_14">
                  <img src="assets1/img/icons/discord.svg" alt="Discord icon" />
                </span>
                <p className="mb-0 cs_medium">Discord</p>
              </div>
              <div className="text-center cs_iconbox cs_style_3 cs_center_column cs_white_bg cs_radius_16">
                <span className="cs_iconbox_icon cs_mb_14">
                  <img src="assets1/img/icons/zoom.svg" alt="Zoom icon" />
                </span>
                <p className="mb-0 cs_medium">Zoom</p>
              </div>
              <div className="text-center cs_iconbox cs_style_3 cs_center_column cs_white_bg cs_radius_16">
                <span className="cs_iconbox_icon cs_mb_14">
                  <img src="assets1/img/icons/github.svg" alt="Github icon" />
                </span>
                <p className="mb-0 cs_medium">Github</p>
              </div>
              <div className="text-center cs_iconbox cs_style_3 cs_center_column cs_white_bg cs_radius_16">
                <span className="cs_iconbox_icon cs_mb_14">
                  <img src="assets1/img/icons/mailchip.svg" alt="Mailchimp icon" />
                </span>
                <p className="mb-0 cs_medium">Mailchimp</p>
              </div>
              <div className="text-center cs_iconbox cs_style_3 cs_center_column cs_white_bg cs_radius_16">
                <span className="cs_iconbox_icon cs_mb_14">
                  <img src="assets1/img/icons/shopify.svg" alt="Shopify icon" />
                </span>
                <p className="mb-0 cs_medium">Shopify</p>
              </div>
              <div className="text-center cs_iconbox cs_style_3 cs_center_column cs_white_bg cs_radius_16">
                <span className="cs_iconbox_icon cs_mb_14">
                  <img src="assets1/img/icons/googledrive.svg" alt="Google Drive icon" />
                </span>
                <p className="mb-0 cs_medium">Google Drive</p>
              </div>
              <div className="text-center cs_iconbox cs_style_3 cs_center_column cs_white_bg cs_radius_16">
                <span className="cs_iconbox_icon cs_mb_14">
                  <img src="assets1/img/icons/notion.svg" alt="Notion icon" />
                </span>
                <p className="mb-0 cs_medium">Notion</p>
              </div>
            </div>
            <div className="text-center cs_toolset_text">
              <div className="cs_section_heading cs_style_1 cs_mb_20">
                <div className="cs_section_subtitle cs_fs_18 cs_heading_color cs_mb_22">
                  <img src="assets1/img/icons/star-1.svg" alt="Star icon" />
                  <span>Our Toolset</span>
                  <img src="assets1/img/icons/star-1.svg" alt="Star icon" />
                </div>
                <h2 className="mb-0 cs_section_title cs_fs_48 cs_semibold text-capitalize wow fadeInUp">Technologies Behind Our Solutions.</h2>
              </div>
              <p className="cs_card_desc cs_mb_51">All the generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.</p>
              <a href="integrations.html" aria-label="Integrations page link" className="cs_btn cs_style_1 cs_bg_1 cs_fs_14 cs_bold cs_white_color text-uppercase">
                <span>See all integrations</span>
                <span className="cs_btn_icon"><i className="fa-solid fa-arrow-right"></i></span>
              </a>
            </div>
          </div>
          <div className="cs_height_120 cs_height_lg_80"></div>
        </div>
      </section>
      <section className="cs_slider cs_style_1 cs_slider_gap_30 position-relative">
        <div className="cs_height_120 cs_height_lg_80"></div>
        <div className="container">
          <div className="cs_section_heading cs_style_1 cs_type_1 cs_mb_60">
            <div className="cs_section_heading_left">
              <div className="cs_section_subtitle cs_fs_18 cs_heading_color cs_mb_22">
                <img src="assets1/img/icons/star-1.svg" alt="Star icon" />
                <span>Blog & Articles</span>
                <img src="assets1/img/icons/star-1.svg" alt="Star icon" />
              </div>
              <h2 className="mb-0 cs_section_title cs_fs_48 cs_semibold wow fadeInDown">News & Blog Insight Insights</h2>
            </div>
            <div className="cs_section_heading_right">
              <div className="cs_slider_arrows cs_style_1 cs_type_1">
                <div className="cs_left_arrow rounded-circle cs_center cs_white_bg cs_heading_color slick-arrow">
                  <i className="fa-solid fa-arrow-left"></i>
                </div>
                <div className="cs_right_arrow rounded-circle cs_center cs_white_bg cs_heading_color slick-arrow">
                  <i className="fa-solid fa-arrow-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="cs_slider_container" data-autoplay="0" data-loop="1" data-speed="600" data-center="0" data-variable-width="0" data-slides-per-view="responsive" data-xs-slides="1" data-sm-slides="2" data-md-slides="2" data-lg-slides="3" data-add-slides="3">
            <div className="cs_slider_wrapper">
              <div className="cs_slide">
                <article className="cs_post cs_style_1 cs_type_1 cs_radius_20">
                  <a href="blog-details.html" aria-label="Reading details post link" className="overflow-hidden cs_post_thumbnail cs_mb_15 position-relative">
                    <img src="assets1/img/post-img-4.jpg" alt="Post image" />
                    <span className="cs_post_category cs_heading_bg cs_fs_14 cs_medium cs_white_color position-absolute">Development</span>
                  </a>
                  <div className="cs_post_content">
                    <div className="cs_post_meta_wrapper cs_mb_12">
                      <div className="cs_post_meta">
                        <span><i className="fa-regular fa-user"></i></span>
                        <span>Adam Smith</span>
                      </div>
                      <div className="cs_post_meta">
                        <span><i className="fa-solid fa-calendar-days"></i></span>
                        <span>11 Jan, 2025</span>
                      </div>
                    </div>
                    <h3 className="cs_post_title cs_fs_24 cs_semibold cs_mb_13"><a href="blog-details.html" aria-label="Reading details post link">How to Comprehensive at SaaS Developments.</a></h3>
                    <a href="blog-details.html" aria-label="Reading details post link" className="cs_post_btn cs_heading_color">
                      <span>Learn More</span>
                      <span><i className="fa-solid fa-arrow-right"></i></span>
                    </a>
                  </div>
                </article>
              </div>
              <div className="cs_slide">
                <article className="cs_post cs_style_1 cs_type_1 cs_radius_20">
                  <a href="blog-details.html" aria-label="Reading details post link" className="overflow-hidden cs_post_thumbnail cs_mb_15 position-relative">
                    <img src="assets1/img/post-img-5.jpg" alt="Post image" />
                    <span className="cs_post_category cs_fs_14 cs_medium cs_heading_bg cs_white_color position-absolute">Technology</span>
                  </a>
                  <div className="cs_post_content">
                    <div className="cs_post_meta_wrapper cs_mb_12">
                      <div className="cs_post_meta">
                        <span><i className="fa-regular fa-user"></i></span>
                        <span>Adam Smith</span>
                      </div>
                      <div className="cs_post_meta">
                        <span><i className="fa-solid fa-calendar-days"></i></span>
                        <span>11 Jan, 2025</span>
                      </div>
                    </div>
                    <h3 className="cs_post_title cs_fs_24 cs_semibold cs_mb_13"><a href="blog-details.html" aria-label="Reading details post link">6 Essential Tips for Big Commerce Stores</a></h3>
                    <a href="blog-details.html" aria-label="Reading details post link" className="cs_post_btn cs_heading_color">
                      <span>Learn More</span>
                      <span><i className="fa-solid fa-arrow-right"></i></span>
                    </a>
                  </div>
                </article>
              </div>
              <div className="cs_slide">
                <article className="cs_post cs_style_1 cs_type_1 cs_radius_20">
                  <a href="blog-details.html" aria-label="Reading details post link" className="overflow-hidden cs_post_thumbnail cs_mb_15 position-relative">
                    <img src="assets1/img/post-img-6.jpg" alt="Post image" />
                    <span className="cs_post_category cs_heading_bg cs_fs_14 cs_medium cs_white_color position-absolute">Marketing</span>
                  </a>
                  <div className="cs_post_content">
                    <div className="cs_post_meta_wrapper cs_mb_12">
                      <div className="cs_post_meta">
                        <span><i className="fa-regular fa-user"></i></span>
                        <span>Adam Smith</span>
                      </div>
                      <div className="cs_post_meta">
                        <span><i className="fa-solid fa-calendar-days"></i></span>
                        <span>11 Jan, 2025</span>
                      </div>
                    </div>
                    <h3 className="cs_post_title cs_fs_24 cs_semibold cs_mb_13"><a href="blog-details.html" aria-label="Reading details post link">Empowering Startups & Small Businesses</a></h3>
                    <a href="blog-details.html" aria-label="Reading details post link" className="cs_post_btn cs_heading_color">
                      <span>Learn More</span>
                      <span><i className="fa-solid fa-arrow-right"></i></span>
                    </a>
                  </div>
                </article>
              </div>
              <div className="cs_slide">
                <article className="cs_post cs_style_1 cs_type_1 cs_radius_20">
                  <a href="blog-details.html" aria-label="Reading details post link" className="overflow-hidden cs_post_thumbnail cs_mb_15 position-relative">
                    <img src="assets1/img/post-img-1.jpg" alt="Post image" />
                    <span className="cs_post_category cs_heading_bg cs_fs_14 cs_medium cs_white_color position-absolute">Development</span>
                  </a>
                  <div className="cs_post_content">
                    <div className="cs_post_meta_wrapper cs_mb_12">
                      <div className="cs_post_meta">
                        <span><i className="fa-regular fa-user"></i></span>
                        <span>Adam Smith</span>
                      </div>
                      <div className="cs_post_meta">
                        <span><i className="fa-solid fa-calendar-days"></i></span>
                        <span>11 Jan, 2025</span>
                      </div>
                    </div>
                    <h3 className="cs_post_title cs_fs_24 cs_semibold cs_mb_13"><a href="blog-details.html" aria-label="Reading details post link">How to Comprehensive at SaaS Developments.</a></h3>
                    <a href="blog-details.html" aria-label="Reading details post link" className="cs_post_btn cs_heading_color">
                      <span>Learn More</span>
                      <span><i className="fa-solid fa-arrow-right"></i></span>
                    </a>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
        <div className="cs_height_120 cs_height_lg_80"></div>
      </section>
      <footer className="cs_footer cs_style_1 cs_type_1 cs_accent_bg cs_bg_filed cs_white_color" data-src="assets1/img/footer-bg-2.svg">
        <div className="cs_height_130 cs_height_lg_80"></div>
        <div className="container">
          <div className="cs_footer_top position-relative">
            <ul className="cs_location_list cs_mp_0">
              <li>
                <span className="cs_location_icon cs_center cs_theme_color_4 cs_radius_100">
                  <i className="fa-solid fa-phone-volume"></i></span>
                <a href="tel:01233337689" aria-label="Make a call link">0123-333-7689</a>
              </li>
              <li>
                <span className="cs_location_icon cs_center cs_theme_color_4 cs_radius_100">
                  <i className="fa-solid fa-envelope"></i></span>
                <a href="mailto:info@example.com" aria-label="Send mail link">info@example.com</a>
              </li>
              <li>
                <span className="cs_location_icon cs_center cs_theme_color_4 cs_radius_100">
                  <i className="fa-solid fa-location-dot"></i></span>
                <p className="mb-0">5919 Trussville Crossings Pkwy, United States.</p>
              </li>
            </ul>
          </div>
          <div className="cs_footer_main">
            <div className="cs_footer_widget_wrapper">
              <div className="cs_footer_widget cs_text_widget">
                <div className="cs_brand cs_mb_32">
                  <img src="assets1/img/logo-2.svg" alt="Logo" />
                </div>
                <p className="cs_mb_32">It involves the use of CRM software and strategies to effectively manage customer relationships, improve customer satisfaction, and drive business growth.</p>
                <div className="cs_social_links cs_style_1 cs_heading_color">
                  <a href="#" aria-label="Social link"><i className="fa-brands fa-facebook-f"></i></a>
                  <a href="#" aria-label="Social link"><i className="fa-brands fa-linkedin-in"></i></a>
                  <a href="#" aria-label="Social link"><i className="fa-brands fa-instagram"></i></a>
                  <a href="#" aria-label="Social link"><i className="fa-brands fa-x-twitter"></i></a>
                  <a href="#" aria-label="Social link"><i className="fa-brands fa-youtube"></i></a>
                </div>
              </div>
              <div className="cs_footer_widget cs_links_widget">
                <h3 className="cs_footer_widget_title cs_fs_24 cs_semibold cs_white_color cs_mb_29">Our Product</h3>
                <ul className="cs_footer_menu cs_mp_0">
                  <li><a href="project-details.html" aria-label="Project details page link">Product Overview</a></li>
                  <li><a href="pricing.html" aria-label="Pricing page link">Pricing</a></li>
                  <li><a href="services.html" aria-label="Services page link">Services</a></li>
                  <li><a href="integrations.html" aria-label="Integrations page link">Integrations</a></li>
                  <li><a href="#" aria-label="Security page link">Security</a></li>
                </ul>
              </div>
              <div className="cs_footer_widget cs_help_widget">
                <h3 className="cs_footer_widget_title cs_fs_24 cs_semibold cs_white_color cs_mb_29">Our Company</h3>
                <ul className="cs_footer_menu cs_mp_0">
                  <li><a href="about-us.html" aria-label="About page link">About Us</a></li>
                  <li><a href="team.html" aria-label="Team page link">Leadership Team</a></li>
                  <li><a href="contact.html" aria-label="Contact page link">Careers</a></li>
                  <li><a href="blog.html" aria-label="Blog page link">Press</a></li>
                </ul>
              </div>
              <div className="cs_footer_widget cs_contact_widget">
                <h3 className="cs_footer_widget_title cs_fs_24 cs_semibold cs_white_color cs_mb_29">Resources</h3>
                <ul className="cs_footer_menu cs_mp_0">
                  <li><a href="blog.html" aria-label="Blog page link">Blog</a></li>
                  <li><a href="#" aria-label="Events page link">Events</a></li>
                  <li><a href="#" aria-label="Support page link">Support Center</a></li>
                  <li><a href="#" aria-label="Demo page link">Get Demo</a></li>
                  <li><a href="#" aria-label="Forum page link">Community Forums</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="cs_footer_bottom position-relative">
          <div className="container">
            <div className="text-center cs_footer_text cs_white_color">Copyright &copy; <span className="cs_getting_year"></span> Saaso theme by Themeservices</div>
          </div>
        </div>
      </footer>
      <button type="button" aria-label="Scroll to top button" className="cs_scrollup cs_purple_bg cs_white_color cs_radius_100">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 10L1.7625 11.7625L8.75 4.7875V20H11.25V4.7875L18.225 11.775L20 10L10 0L0 10Z" fill="currentColor" />
        </svg>
      </button>
    </>
  );
}
