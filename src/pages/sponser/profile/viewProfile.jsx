import React, { useState } from "react";
import SponsorProfileForm from "./sponsorProfile.jsx";
import "../../../pages/styles.css";

export default function ViewProfile() {
  const [isEditing, setIsEditing] = useState(false);

  // Mock sponsor data (later fetch from API)
  const [profile, setProfile] = useState({
    sponsorName: "ABC Foundation",
    sponsorType: "Nonprofit",
    website: "https://abcfoundation.org",
    contactPerson: "John Doe",
    email: "contact@abcfoundation.org",
    phone: "9876543210",
    address: "123 Charity Street, Cityville",
    budget: "$50,000",
    studentCriteria: "Low-income students with good grades",
    studyLevels: "Undergraduate"
  });

  return (
    <div className="signup-container">
      {!isEditing ? (
        <div className="signup-card">
          {/* --- Header --- */}
          <div className="profile-header">
            <h2 className="headers">Sponsor Profile</h2>
            <button
              className="sign-action-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </div>

          {/* --- Organization Info --- */}
          <h3 className="section-title">Organization Info</h3>
          <div className="profile-details">
            <div className="detail-row">
              <label>Organization Name:</label>
              <input type="text" value={profile.sponsorName} readOnly />
            </div>
            <div className="detail-row">
              <label>Type:</label>
              <input type="text" value={profile.sponsorType} readOnly />
            </div>
            <div className="detail-row">
              <label>Website:</label>
              <input type="text" value={profile.website} readOnly />
            </div>
            <div className="detail-row">
              <label>Contact Person:</label>
              <input type="text" value={profile.contactPerson} readOnly />
            </div>
          </div>

          {/* --- Contact Info --- */}
          <h3 className="section-title">Contact Info</h3>
          <div className="profile-details">
            <div className="detail-row">
              <label>Email:</label>
              <input type="text" value={profile.email} readOnly />
            </div>
            <div className="detail-row">
              <label>Phone:</label>
              <input type="text" value={profile.phone} readOnly />
            </div>
            <div className="detail-row">
              <label>Address:</label>
              <textarea value={profile.address} readOnly />
            </div>
          </div>

          {/* --- Scholarship Preferences --- */}
          <h3 className="section-title">Scholarship Preferences</h3>
          <div className="profile-details">
            <div className="detail-row">
              <label>Budget:</label>
              <input type="text" value={profile.budget} readOnly />
            </div>
            <div className="detail-row">
              <label>Student Criteria:</label>
              <input type="text" value={profile.studentCriteria} readOnly />
            </div>
            <div className="detail-row">
              <label>Supported Levels:</label>
              <input type="text" value={profile.studyLevels} readOnly />
            </div>
          </div>
        </div>
      ) : (
        <SponsorProfileForm
          profile={profile}
          onCancel={() => setIsEditing(false)}
          onSave={(updated) => {
            setProfile(updated);
            setIsEditing(false);
          }}
        />
      )}
    </div>
  );
}
