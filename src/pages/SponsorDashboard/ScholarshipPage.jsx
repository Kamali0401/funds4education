import React from "react";
import "../styles.css";
import { FaGraduationCap, FaMoneyBillWave, FaCalendarAlt, FaUsers } from "react-icons/fa";

export default function ScholarshipPage() {
  const sponsor = {
    name: "Mike Sharma",
    scholarships: [
      {
        id: 101,
        title: "Women in STEM Scholarship",
        amount: 5000,
        studentsSponsored: 3,
        status: "Active",
        deadline: "2025-05-01"
      },
      {
        id: 102,
        title: "Arts & Culture Scholarship",
        amount: 3000,
        studentsSponsored: 2,
        status: "Closed",
        deadline: "2024-12-30"
      },
      {
        id: 103,
        title: "Future Leaders Fund",
        amount: 8000,
        studentsSponsored: 5,
        status: "Active",
        deadline: "2025-07-15"
      }
    ]
  };

  return (
    <div className="scholarship-page">
      <h2 className="page-title">{sponsor.name} – Scholarships</h2>

      <div className="scholarship-table">
        {/* Table Header */}
        <div className="table-header">
          <span>Title</span>
          <span>Amount</span>
          <span>Students</span>
          <span>Status</span>
          <span>Deadline</span>
          <span>Actions</span>
        </div>

        {/* Table Rows */}
        {sponsor.scholarships.map((scholarship) => (
          <div key={scholarship.id} className="table-row">
            <span className="title">
              <FaGraduationCap className="icon" /> {scholarship.title}
            </span>
            <span>
              <FaMoneyBillWave className="icon" /> ${scholarship.amount}
            </span>
            <span>
              <FaUsers className="icon" /> {scholarship.studentsSponsored}
            </span>
            <span>
              <span className={`status ${scholarship.status.toLowerCase()}`}>
                {scholarship.status}
              </span>
            </span>
            <span>
              <FaCalendarAlt className="icon" /> {scholarship.deadline}
            </span>
            <span className="actions">
              <button className="btn-view">View Applicants</button>
              <button className="btn-edit">Edit</button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}