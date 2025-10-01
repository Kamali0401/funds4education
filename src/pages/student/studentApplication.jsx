import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../app/components/header/header";
import "../../pages/styles.css";
const ApplicationsPage = () => {
  const navigate = useNavigate();

  const [applications] = useState([
    { id: 1, name: "Merit Scholarship 2025", date: "2025-08-12", status: "Submitted" },
    { id: 2, name: "Need-Based Aid", date: "2025-07-05", status: "In Review" },
    { id: 3, name: "Research Grant", date: "2025-06-10", status: "Rejected" },
    { id: 4, name: "Tech Fellowship", date: "2025-09-01", status: "Approved" },
  ]);

  const [filter, setFilter] = useState("All");

  const filteredApps =
    filter === "All" ? applications : applications.filter((app) => app.status === filter);

  return (
    <>
      <Header variant="application" />

      <main className="applications-dashboard">
        <h1 className="applications-title">My Scholarship Applications</h1>
        <p className="applications-subtitle">
          Track your scholarship applications and <br />filter by status.
        </p>

        {/* Actions */}
   <div className="applications-actions">
  <select
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
    className="applications-filter"
  >
    <option value="All">All</option>
    <option value="Submitted">Submitted</option>
    <option value="In Review">In Review</option>
    <option value="Rejected">Rejected</option>
    <option value="Approved">Approved</option>
  </select>

  <button className="applications-btn-new" onClick={() => navigate("/add-application")}>
    + New Application
  </button>
</div>


        {/* Applications List */}
        <section className="applications-cards">
  {filteredApps.length > 0 ? (
    filteredApps.map((app) => (
      <div key={app.id} className="applications-card">
        <div className="application-info">
          <h3>{app.name}</h3>
          <p>{app.date}</p>
        </div>
        <span
          className={`applications-status ${app.status
            .toLowerCase()
            .replace(" ", "-")}`}
        >
          {app.status}
        </span>
      </div>
    ))
  ) : (
    <p className="applications-no-results">
      No applications found for <strong>{filter}</strong>.
    </p>
  )}
</section>
</main>
    </>
  );
};

export default ApplicationsPage;
