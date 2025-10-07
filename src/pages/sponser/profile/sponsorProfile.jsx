import React, { useState } from "react";
import "../../../pages/styles.css"; 
import { useNavigate } from "react-router-dom";
import { routePath as RP } from "../../../app/components/router/routepath";

export default function SponsorProfileForm({ profile, onCancel, onSave }) {
  const [formData, setFormData] = useState(profile || {});
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|org|edu)$/;
  const phoneRegex = /^[0-9]{10}$/;

  const validateForm = () => {
    const errs = {};
    if (!formData.sponsorName) errs.sponsorName = "Sponsor/Org name required.";
    if (!formData.sponsorType) errs.sponsorType = "Type required.";
    if (!formData.email || !emailRegex.test(formData.email)) errs.email = "Invalid email.";
    if (!formData.phone || !phoneRegex.test(formData.phone)) errs.phone = "Phone must be 10 digits.";
    if (!formData.address) errs.address = "Address required.";
    if (!formData.budget) errs.budget = "Budget required.";
    if (!formData.studyLevels) errs.studyLevels = "Select study level.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSave(formData);
    alert("Sponsor Profile Saved!");
  };

  return (
    <div className="signup-card">
      <h2 className="walletheader">Sponsor Profile</h2>

      {/* Organization Info */}
      <h3 className="section-title">Organization Info</h3>
      <div className="row">
        <div className="form-group">
          <label>Sponsor / Organization Name *</label>
          <input
            type="text"
            value={formData.sponsorName || ""}
            onChange={(e) => setFormData({ ...formData, sponsorName: e.target.value })}
            className={errors.sponsorName ? "input-error" : ""}
          />
          {errors.sponsorName && <p className="error-text">{errors.sponsorName}</p>}
        </div>
        <div className="form-group">
          <label>Type *</label>
          <select
            value={formData.sponsorType || ""}
            onChange={(e) => setFormData({ ...formData, sponsorType: e.target.value })}
            className={errors.sponsorType ? "input-error" : ""}
          >
            <option value="">Select</option>
            <option value="Nonprofit">Nonprofit</option>
            <option value="Company">Company</option>
            <option value="Government">Government</option>
            <option value="Individual">Individual</option>
          </select>
          {errors.sponsorType && <p className="error-text">{errors.sponsorType}</p>}
        </div>
      </div>

      {/* Contact Info */}
      <h3 className="section-title">Contact Info</h3>
      <div className="row">
        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            value={formData.email || ""}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label>Phone *</label>
          <input
            type="text"
            maxLength={10}
            value={formData.phone || ""}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={errors.phone ? "input-error" : ""}
          />
          {errors.phone && <p className="error-text">{errors.phone}</p>}
        </div>
      </div>
      <div className="form-group">
        <label>Address *</label>
        <textarea
          rows="2"
          value={formData.address || ""}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className={errors.address ? "input-error" : ""}
        />
        {errors.address && <p className="error-text">{errors.address}</p>}
      </div>

      {/* Scholarship Preferences */}
      <h3 className="section-title">Scholarship Preferences</h3>
      <div className="row">
        <div className="form-group">
          <label>Budget *</label>
          <input
            type="text"
            value={formData.budget || ""}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className={errors.budget ? "input-error" : ""}
          />
          {errors.budget && <p className="error-text">{errors.budget}</p>}
        </div>
        <div className="form-group">
          <label>Student Criteria</label>
          <input
            type="text"
            value={formData.studentCriteria || ""}
            onChange={(e) => setFormData({ ...formData, studentCriteria: e.target.value })}
          />
        </div>
      </div>
      <div className="form-group">
        <label>Supported Study Levels *</label>
        <select
          value={formData.studyLevels || ""}
          onChange={(e) => setFormData({ ...formData, studyLevels: e.target.value })}
          className={errors.studyLevels ? "input-error" : ""}
        >
          <option value="">Select</option>
          <option value="High School">High School</option>
          <option value="Undergraduate">Undergraduate</option>
          <option value="Graduate">Graduate</option>
          <option value="PhD">PhD</option>
        </select>
        {errors.studyLevels && <p className="error-text">{errors.studyLevels}</p>}
      </div>

      {/* Buttons */}
      <div className="btn-row">
        <button className="sign-action-btn1" onClick={handleSubmit}>Update Profile</button>
        <button
          className="sign-action-btn1 danger"
          onClick={() => {
            onCancel();
            navigate(RP.ViewSponsorProfile);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
