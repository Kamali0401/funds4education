import React, { useState } from "react";
import "../../../pages/styles.css"; // ✅ reuse your signup/signin styles
import { useNavigate } from "react-router-dom";
import { routePath as RP } from "../../../app/components/router/routepath";

export default function StudentProfileForm({ profile, onCancel, onSave }) {
  const navigate = useNavigate();

  // ✅ Prefill profile values
  const [formData, setFormData] = useState({
    id: profile.id,
    firstName: profile.firstName || "",
    lastName: profile.lastName || "",
    email: profile.email || "",
    phone: profile.phone || "",
    dateofBirth: profile.dateofBirth || "",
    gender: profile.gender || "",
    userName: profile.userName || "",
    passwordHash: "", // don’t prefill actual password
  });

  // ✅ Education array
  const [educationList, setEducationList] = useState(
    Array.isArray(profile.education) ? profile.education : []
  );
  const [education, setEducation] = useState({ degree: "", college: "", year: "" });
  const [editIndex, setEditIndex] = useState(null);

  const [errors, setErrors] = useState({});
  const [eduErrors, setEduErrors] = useState({});

  // ✅ Validation rules
  const nameRegex = /^[A-Za-z]{1,150}$/;
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|edu|org)$/;
  const phoneRegex = /^[0-9]{10}$/;
  const yearRegex = /^[0-9]{4}$/;
  const usernameRegex = /^[A-Za-z0-9_]{4,150}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;

  // --- Add or update education ---
  const addOrUpdateEducation = () => {
    let errs = {};
    if (!education.degree) errs.degree = "Course required.";
    if (!education.college) errs.college = "College required.";
    if (!yearRegex.test(education.year)) errs.year = "Year must be 4 digits.";

    if (Object.keys(errs).length > 0) {
      setEduErrors(errs);
      return;
    }

    if (editIndex !== null) {
      const updated = [...educationList];
      updated[editIndex] = education;
      setEducationList(updated);
      setEditIndex(null);
    } else {
      setEducationList([...educationList, education]);
    }

    setEducation({ degree: "", college: "", year: "" });
    setEduErrors({});
  };

  const deleteEducation = (index) => {
    setEducationList(educationList.filter((_, i) => i !== index));
  };

  // ✅ Validate entire form
  const validateForm = () => {
    let errs = {};
    if (!nameRegex.test(formData.firstName)) errs.firstName = "Invalid first name.";
    if (!nameRegex.test(formData.lastName)) errs.lastName = "Invalid last name.";
    if (formData.email && !emailRegex.test(formData.email)) errs.email = "Invalid email.";
    if (formData.phone && !phoneRegex.test(formData.phone)) errs.phone = "Phone must be 10 digits.";
    if (!formData.gender) errs.gender = "Gender required.";
    if (!usernameRegex.test(formData.userName)) errs.userName = "Username must be at least 4 characters.";
    if (!passwordRegex.test(formData.passwordHash))
      errs.passwordHash = "Password must contain a letter, number, and special character.";
    if (educationList.length === 0) errs.education = "Add at least one education record.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ✅ Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      ...formData,
      education: educationList, // send array
    };

    console.log("📤 Sending JSON to API:", JSON.stringify(payload, null, 2));
    onSave(payload); // dispatch Redux action
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="walletheader">Edit Student Profile</h2>

        <form onSubmit={handleSubmit}>
          {/* --- Basic Info --- */}
          <h3 className="section-title">Basic Details</h3>
          <div className="row">
            <div className="form-group">
              <label>First Name *</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className={errors.firstName ? "input-error" : ""}
              />
              {errors.firstName && <p className="error-text">{errors.firstName}</p>}
            </div>
            <div className="form-group">
              <label>Last Name *</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className={errors.lastName ? "input-error" : ""}
              />
              {errors.lastName && <p className="error-text">{errors.lastName}</p>}
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                maxLength={10}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={errors.phone ? "input-error" : ""}
              />
              {errors.phone && <p className="error-text">{errors.phone}</p>}
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                value={formData.dateofBirth ? formData.dateofBirth.split("T")[0] : ""}
                onChange={(e) => setFormData({ ...formData, dateofBirth: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Gender *</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className={errors.gender ? "input-error" : ""}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && <p className="error-text">{errors.gender}</p>}
            </div>
          </div>

          {/* --- Education --- */}
          <h3 className="section-title">Education</h3>
          {errors.education && <p className="error-text">{errors.education}</p>}
          <div className="row">
            <input
              type="text"
              placeholder="Course"
              value={education.degree}
              onChange={(e) => setEducation({ ...education, degree: e.target.value })}
            />
            <input
              type="text"
              placeholder="College"
              value={education.college}
              onChange={(e) => setEducation({ ...education, college: e.target.value })}
            />
            <input
              type="text"
              placeholder="Year"
              value={education.year}
              onChange={(e) => setEducation({ ...education, year: e.target.value })}
            />
            <button type="button" className="sign-action-btn" onClick={addOrUpdateEducation}>
              {editIndex !== null ? "Update" : "Add"}
            </button>
          </div>

          {educationList.length > 0 && (
            <table className="signup-table">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>College</th>
                  <th>Year</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {educationList.map((edu, i) => (
                  <tr key={i}>
                    <td>{edu.degree}</td>
                    <td>{edu.college}</td>
                    <td>{edu.year}</td>
                    <td>
                      <button
                        type="button"
                        className="sign-action-btn1"
                        onClick={() => {
                          setEducation(edu);
                          setEditIndex(i);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="sign-action-btn1 danger"
                        onClick={() => deleteEducation(i)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* --- Username & Password --- */}
          <h3 className="section-title">Account</h3>
          <div className="row">
            <div className="form-group">
              <label>Username *</label>
              <input
                type="text"
                value={formData.userName}
                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                className={errors.userName ? "input-error" : ""}
              />
              {errors.userName && <p className="error-text">{errors.userName}</p>}
            </div>
            <div className="form-group">
              <label>Password *</label>
              <input
                type="password"
                value={formData.passwordHash}
                onChange={(e) => setFormData({ ...formData, passwordHash: e.target.value })}
                className={errors.passwordHash ? "input-error" : ""}
              />
              {errors.passwordHash && <p className="error-text">{errors.passwordHash}</p>}
            </div>
          </div>

          {/* --- Submit --- */}
          <div className="btn-row">
            <button type="submit" className="sign-action-btn1">
              Update Profile
            </button>
            <button
              type="button"
              className="sign-action-btn1 danger"
              onClick={() => onCancel() || navigate(RP.ViewStudentProfile)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}