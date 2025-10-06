import "../../../pages/styles.css";
import "../../../pages/styles.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentProfile, updateStudent } from "../../../app/redux/slices/studentSlice.js";
import StudentProfileForm from "./studentprofile.jsx";

export default function StudentProfile() {
  const dispatch = useDispatch();
  const { profile, status, error } = useSelector((state) => state.student);
  const [isEditing, setIsEditing] = useState(false);

  // ✅ Fetch logged-in student's profile on mount
  useEffect(() => {
    dispatch(fetchStudentProfile());
  }, [dispatch]);

  // ✅ Loading & error states
  if (status === "loading") return <div className="signup-container">Loading profile...</div>;
  if (error) return <div className="signup-container text-red-600">Error: {error}</div>;
  if (!profile) return null;

  return (
    <div className="signup-container">
      {!isEditing ? (
        <div className="signup-card">
          <div className="profile-header">
            <h2 className="headers">Student Profile</h2>
            <button className="sign-action-btn" onClick={() => setIsEditing(true)}>
              Edit
            </button>
          </div>

          {/* --- Basic Info --- */}
          <h3 className="section-title">Basic Details</h3>
          <div className="profile-details">
            <div className="detail-row">
              <label>First Name:</label>
              <input type="text" value={profile.firstName || ""} readOnly />
            </div>
            <div className="detail-row">
              <label>Last Name:</label>
              <input type="text" value={profile.lastName || ""} readOnly />
            </div>
            <div className="detail-row">
              <label>Email:</label>
              <input type="text" value={profile.email || ""} readOnly />
            </div>
            <div className="detail-row">
              <label>Phone:</label>
              <input type="text" value={profile.phone || ""} readOnly />
            </div>
            <div className="detail-row">
              <label>Date of Birth:</label>
              <input type="text" value={profile.dateofBirth || ""} readOnly />
            </div>
            <div className="detail-row">
              <label>Gender:</label>
              <input type="text" value={profile.gender || ""} readOnly />
            </div>
          </div>

          {/* --- Account Info --- */}
          <h3 className="section-title">Account Info</h3>
          <div className="profile-details">
            <div className="detail-row">
              <label>User Name:</label>
              <input type="text" value={profile.userName || ""} readOnly />
            </div>
            <div className="detail-row">
              <label>Password:</label>
              <input type="password" value={profile.passwordHash ? "********" : ""} readOnly />
            </div>
          </div>

          {/* --- Education --- */}
          <h3 className="section-title">Education</h3>
          {profile.education ? (
            <div className="profile-details">
              <input type="text" value={profile.education || ""} readOnly />
            </div>
          ) : (
            <p>No education details available.</p>
          )}
        </div>
      ) : (
        // ✅ Edit Form Mode
        <StudentProfileForm
          profile={profile}
          onCancel={() => setIsEditing(false)}
          onSave={(updatedData) => {
            dispatch(updateStudent(updatedData)).then(() => {
              dispatch(fetchStudentProfile()); // refresh updated data
              setIsEditing(false);
              alert("✅ Profile updated successfully!");
            });
          }}
        />
      )}
    </div>
  );
}
