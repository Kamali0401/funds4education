import React, { useState } from "react";
import StudentProfileForm from "./studentprofile.jsx"; // your form
import "../../../pages/styles.css";

export default function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false);

  // Mock profile data (later you can fetch from API or state)
  const [profile, setProfile] = useState({
    firstName: "Demo",
    lastName: "User",
    email: "demo@example.com",
    phone: "9876543210",
    dob: "2000-01-01",
    gender: "Male",
    username: "demouser",
    educationList: [
      { degree: "B.Sc", college: "XYZ College", year: "2021" }
    ]
  });

  return (
    <div className="signup-container">
      {!isEditing ? (
        <div className="signup-card">
          {/* --- Header with title + edit button --- */}
          <div className="profile-header">
            <h2 className="headers">Student Profile</h2>
            <button
              className="sign-action-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </div>

          {/* --- Basic Info --- */}
          <h3 className="section-title">Basic Details</h3>
          <div className="profile-details">
  <div className="detail-row">
    <label>First Name:</label>
    <input type="text" value={profile.firstName} readOnly />
  </div>

  <div className="detail-row">
    <label>Last Name:</label>
    <input type="text" value={profile.lastName} readOnly />
  </div>

  <div className="detail-row">
    <label>Email:</label>
    <input type="text" value={profile.email} readOnly />
  </div>

  <div className="detail-row">
    <label>Phone:</label>
    <input type="text" value={profile.phone} readOnly />
  </div>

  <div className="detail-row">
    <label>Date of Birth:</label>
    <input type="text" value={profile.dob} readOnly />
  </div>

  <div className="detail-row">
    <label>Gender:</label>
    <input type="text" value={profile.gender} readOnly />
  </div>
</div>


           <h3 className="section-title">Verification</h3>
            <div className="profile-details">
  <div className="detail-row">
    <label>User Name:</label>
    <input type="text" value={profile.username} readOnly />
  </div>
           <div className="detail-row">
    <label>Password:</label>
    <input type="text" value={profile.password} readOnly />
  </div>
  </div>
          {/* --- Education --- */}
          <h3 className="section-title">Education</h3>
          {profile.educationList.length > 0 ? (
            <table className="signup-table">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>College</th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                {profile.educationList.map((edu, i) => (
                  <tr key={i}>
                    <td>{edu.degree}</td>
                    <td>{edu.college}</td>
                    <td>{edu.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No education records added.</p>
          )}


        </div>
      ) : (
        <StudentProfileForm
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
