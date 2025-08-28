import React from "react";
import "./ScholarshipDashboard.css";
import user1 from "./images/user1.png"; // Placeholder avatars
import user2 from "./images/user2.png";
import user3 from "./images/user3.png";
import logo from "../../app/assests/Logo.png";

const scholarships = [
  {
    id: 1,
    title: "STEM Scholars Program",
    amount: "$5,000",
    deadline: "June 15, 2024",
    background: "Women in STEM",
    img: user1,
  },
  {
    id: 2,
    title: "Academic Achievement",
    amount: "$3,000",
    deadline: "May 20, 2024",
    background: "Community Service",
    img: user2,
  },
  {
    id: 3,
    title: "Women in Technology",
    amount: "$4,000",
    deadline: "May 5, 2024",
    background: "",
    img: user3,
  },
];

const applications = [
  { name: "Vijay T.", department: "Arts", status: "In Review" },
];

const ScholarshipDashboard = () => {
  return (
    <div className="page-wrapper">
      {/* Full-width header */}
      <header className="header">
        <div className="header-left">
          <img src={logo} alt="VidyaSetu Logo" className="logo" />
          <span className="brand">VidyāSetu</span>
        </div>
        <nav>
          <span>Dashboard</span>
          <span>Saved</span>
          <span>Messages</span>
        </nav>
      </header>

      {/* Main content area */}
      <div className="dashboard-container">
        <section className="ai-match">
          <div className="ai-image">
            <img src={user1} alt="AI illustration" />
          </div>
          <div className="ai-content">
            <h2>AI Scholarship Match</h2>
            <p>
              Based on your profile and background, here are some recommended
              scholarships for you.
            </p>
            <button className="update-btn">Update Profile</button>
          </div>
        </section>

        <section className="matches-section">
          {/* Left side: Matches */}
          <div className="matches">
            <h3>Your Matches</h3>
            {scholarships.map((scholarship) => (
              <div key={scholarship.id} className="match-card">
                <img src={scholarship.img} alt={scholarship.title} />
                <div className="match-info">
                  <h4>{scholarship.title}</h4>
                  <p>{scholarship.amount}</p>
                  <p>Deadline: {scholarship.deadline}</p>
                  {scholarship.background && (
                    <p>Background: {scholarship.background}</p>
                  )}
                </div>
                <button className="apply-btn">Apply</button>
              </div>
            ))}
          </div>

          {/* Right side: Summary */}
          <div className="summary-section">
            <div className="financial-summary">
              <h4>Financial Summary</h4>
              <p className="amount">$50,000</p>
              <div className="budget-bar">
                <div className="progress"></div>
              </div>
              <p>Budget Utilization</p>
            </div>

            <button className="download-btn">Download Reports</button>

            <div className="applications">
              <h4>Applications</h4>
              {applications.map((app, index) => (
                <div key={index} className="application-card">
                  <p>{app.name}</p>
                  <p>{app.status}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ScholarshipDashboard;
