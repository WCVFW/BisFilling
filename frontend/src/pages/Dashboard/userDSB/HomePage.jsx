import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  MegaphoneIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { getAuth } from "../../../lib/auth";
import "./HomePage.css";

export default function LandingPageContent() {
  const authData = getAuth();
  const user = authData?.user;

  const userName =
    user?.firstName ||
    user?.fullName ||
    user?.name ||
    user?.email?.split("@")[0] ||
    "User";

  return (
    <div className="lp-wrapper">
      <div className="lp-card">

        {/* Greeting */}
        <h1 className="lp-title">
          Hello, <span className="lp-highlight">{userName}</span> 👋
        </h1>
        <p className="lp-subtitle">Your One-Stop Hub for Business Compliance</p>

        {/* Features */}
        <div className="lp-features">
          <div className="lp-feature">
            <CalendarDaysIcon className="lp-icon" />
            <p>Track all <strong>monthly & annual</strong> compliance events.</p>
          </div>

          <div className="lp-feature">
            <MegaphoneIcon className="lp-icon" />
            <p>Get important <strong>reminders</strong> on time.</p>
          </div>

          <div className="lp-feature">
            <DocumentTextIcon className="lp-icon" />
            <p>Store & manage documents in one <strong>secure place</strong>.</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="lp-actions">
          <Link to="/dashboard/user/servicehub" className="lp-btn-primary">
            Start a New Business
            <ArrowRightIcon className="lp-btn-icon" />
          </Link>

          <Link to="/dashboard/user/servicehub" className="lp-btn-secondary">
            Add an Existing Business
          </Link>
        </div>
      </div>
    </div>
  );
}
