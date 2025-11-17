import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  MegaphoneIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { getAuth } from "../../lib/auth";

export default function LandingPageContent() {
  const authData = getAuth();
  const user = authData?.user;
  const userName = user?.fullName || user?.name || user?.email || "User";

  const hiddenScrollStyle = {
    minHeight: "100vh",
    backgroundColor: "#F9FAFB",
    fontFamily: "Poppins, sans-serif",
    padding: "2rem",
    overflowY: "scroll",
    msOverflowStyle: "none", // IE & Edge
    scrollbarWidth: "none", // Firefox
  };

  return (
    <div
      style={hiddenScrollStyle}
      className="antialiased space-y-10"
    >
      {/* Hide scrollbar for Chrome, Safari and Edge */}
      <style>{`
        div::-webkit-scrollbar {
          width: 0px;
          height: 0px;
        }
        div::-webkit-scrollbar-thumb {
          background: transparent;
        }
      `}</style>

      {/* ⭐️ Welcome Banner & Primary CTA */}
      <section
        style={{
          padding: "2.5rem",
          backgroundColor: "#fff",
          borderTop: "4px solid #4F46E5",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          borderRadius: "0.75rem",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            color: "#111827",
            marginBottom: "0.5rem",
          }}
        >
          Hello, <span style={{ color: "#4F46E5" }}>{userName}</span>!
        </h1>

        <h2
          style={{
            marginTop: "0.75rem",
            fontSize: "1.25rem",
            fontWeight: "600",
            color: "#374151",
          }}
        >
          One Stop for Managing Your Compliances
        </h2>

        <div style={{ marginTop: "1.5rem", color: "#4B5563" }}>
          <p style={{ display: "flex", alignItems: "flex-start", marginBottom: "0.75rem" }}>
            <CalendarDaysIcon className="w-5 h-5 mt-1 mr-2 text-green-500" />
            Stay on top of every <strong>compliance requirement</strong> for your business, whether it's monthly, annual, or event-based.
          </p>
          <p style={{ display: "flex", alignItems: "flex-start", marginBottom: "0.75rem" }}>
            <MegaphoneIcon className="w-5 h-5 mt-1 mr-2 text-green-500" />
            Receive automatic <strong>reminders</strong> for every due date, so you never miss an important task.
          </p>
          <p style={{ display: "flex", alignItems: "flex-start" }}>
            <DocumentTextIcon className="w-5 h-5 mt-1 mr-2 text-green-500" />
            Upload documents effortlessly and store them securely in one <strong>centralized place</strong>.
          </p>
        </div>

        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Link
            to="/setup/start"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              padding: "0.75rem 1.5rem",
              fontWeight: "600",
              color: "#fff",
              backgroundColor: "#4F46E5",
              borderRadius: "0.5rem",
              textDecoration: "none",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              transition: "background-color 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#4338CA")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4F46E5")}
          >
            <span>Start Your Business</span>
            <ArrowRightIcon className="w-4 h-4 ml-2" />
          </Link>

          <Link
            to="/setup/add"
            style={{
              display: "block",
              textAlign: "center",
              width: "100%",
              padding: "0.75rem 1.5rem",
              fontWeight: "600",
              color: "#4F46E5",
              border: "2px solid #4F46E5",
              borderRadius: "0.5rem",
              textDecoration: "none",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#EEF2FF")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            Already Have Business? Add Business
          </Link>
        </div>
      </section>
    </div>
  );
}
