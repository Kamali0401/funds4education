import React, { useEffect, useState } from "react";
import "../../../pages/styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudentProfile,
  saveStudentProfile,
} from "../../../app/redux/slices/studentSlice";
import { useNavigate } from "react-router-dom";
import { routePath as RP } from "../../../app/components/router/routepath";

export default function StudentProfileForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");

  const { profile, loading, error, success } = useSelector(
    (state) => state.student
  );

  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    username: "",
  });

  // ✅ Fetch profile when component mounts
  useEffect(() => {
    if (userId) {
      dispatch(fetchStudentProfile(userId));
    }
  }, [dispatch, userId]);

  // ✅ Update form when profile loaded
  useEffect(() => {
    if (profile) {
      setFormData({
        id: profile.id,
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        email: profile.email || "",
        phone: profile.phone || "",
        dob: profile.dob || "",
        gender: profile.gender || "",
        username: profile.username || "",
      });
    }
  }, [profile]);

  // ✅ Handle changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Save Profile
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveStudentProfile(formData))
      .unwrap()
      .then(() => {
        alert("✅ Profile updated successfully!");
        navigate(RP.ViewStudentProfile);
      })
      .catch(() => {
        alert("❌ Update failed!");
      });
  };

  if (loading)
    return <p style={{ textAlign: "center", marginTop: 50 }}>Loading...</p>;

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="walletheader">Edit Student Profile</h2>

        {error && (
          <p style={{ color: "red", textAlign: "center" }}>
            {typeof error === "string" ? error : error.title}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="form-group">
              <label>First Name *</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name *</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label>Email *</label>
              <input
                name="email"
                value={formData.email}
                type="email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone *</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label>Date of Birth *</label>
              <input
                name="dob"
                value={formData.dob}
                type="date"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Username *</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="btn-row">
            <button type="submit" className="sign-action-btn1" disabled={loading}>
              {loading ? "Updating..." : "Update Profile"}
            </button>
            <button
              type="button"
              className="sign-action-btn1 danger"
              onClick={() => navigate(RP.ViewStudentProfile)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
