// src/pages/ScholarshipCard.jsx
import React from "react";
import "./Scholarshipcard.css"; // create CSS for styling
import Student from  "./Studentprofile.jsx";
const ScholarshipCard = () => {
  return (
    <div className="scholarship-container">
      <h2>Search and Filter</h2>
      <input
        type="text"
        placeholder="Search Scholarships of any State/Gender/Class"
        className="search-bar"
      />

      <div className="button-group">
        <button>All Scholarships</button>
        <button>Live Application Form</button>
        <button>Check Scholarship Result</button>
        <button>Recommend Needy Students</button>
      </div>

      <p>Select the scholarship according to your need and preference</p>

      <div className="filter-tabs">
        <button className="active">Categories</button>
        <button>State</button>
        <button>Current Class</button>
        <button>Type</button>
        <button>International</button>
        <button>Government</button>
      </div>

      <div className="filter-options">
        <button>Girls</button>
        <button>SC/ST/OBC</button>
        <button>Minority</button>
        <button>Physically Disabled</button>
      </div>
      <Student/>
    </div>
  );
};

export default ScholarshipCard;
