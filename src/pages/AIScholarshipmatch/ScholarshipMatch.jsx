import React from "react";
import "../AIScholarshipmatch/ScholarshipMatch.css";
import user1 from "../../app/assests/user1.png";
import user2 from "../../app/assests/user2.png";
import user3 from "../../app/assests/user3.png";
import studentImg from "../../app/assests/aiimage.png";

export default function ScholarshipPage() {
  return (
    <div className="scholarship-page">

      {/* --- Hero Section --- */}
      <div className="hero">
        <div className="hero-left">
          <img src={studentImg} alt="Student illustration" />
        </div>
        <div className="hero-right">
          <h1>AI Scholarship Match</h1>
          <p>
            Based on your profile and background, here are some recommended
            scholarships for you.
          </p>
          <button className="btn-primary">Update Profile</button>
        </div>
      </div>

      {/* --- Bottom Section --- */}
      <div className="content-section">

        {/* Left: Your Matches */}
        <div className="matches">
          <h2>Your Matches</h2>

          <div className="match-card">
            <img src={user1} alt="Scholar" />
            <div className="match-info">
              <h3>STEM Scholars Program</h3>
              <p>$5,000</p>
              <p className="deadline">Deadline: June 15, 2024</p>
              <p>Background: Women in STEM</p>
            </div>
            <button className="apply-btn">Apply</button>
          </div>

          <div className="match-card">
            <img src={user2} alt="Scholar" />
            <div className="match-info">
              <h3>Academic Achievement</h3>
              <p>$3,000</p>
              <p className="deadline">Deadline: May 20, 2024</p>
              <p>Background: Community Service</p>
            </div>
            <button className="apply-btn">Apply</button>
          </div>

          <div className="match-card">
            <img src={user3} alt="Scholar" />
            <div className="match-info">
              <h3>Women in Technology</h3>
              <p>$4,000</p>
              <p className="deadline">Deadline: May 5, 2024</p>
              <p>Background: Women in Tech</p>
            </div>
            <button className="apply-btn">Apply</button>
          </div>
        </div>

        {/* Right: Summary & Applications */}
        <div className="summary-section">

          <div className="financial-summary">
            <h3>Financial Summary</h3>
            <p className="amount">$50,000</p>
            <div className="budget-bar">
              <div className="progress"></div>
            </div>
            <p>Budget Utilization</p>
          </div>

          <button className="download-btn">Download Reports</button>

          <div className="applications">
            <h3>Applications</h3>
            <div className="application-card">
              <p><strong>Vijay T.</strong></p>
              <p>Arts</p>
              <p className="status">In Review</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
