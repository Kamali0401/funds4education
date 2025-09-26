import React, { useState } from "react";
import "../../../pages/styles.css"; // ✅ reuse your signup/signin styles
import { useNavigate } from "react-router-dom";
import { routePath as RP } from "../../../app/components/router/routepath";
export default function StudentProfileForm({ profile, onCancel, onSave }) {
  const [formData, setFormData] = useState(profile || ""); // prefill values
 const navigate = useNavigate();
/*  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    username: "",
    password: "",
  });*/

  const [educationList, setEducationList] = useState([]);
  const [education, setEducation] = useState({ degree: "", college: "", year: "" });
  const [editIndex, setEditIndex] = useState(null);

  const [errors, setErrors] = useState({});
  const [eduErrors, setEduErrors] = useState({});

  // --- Regex rules ---
  const nameRegex = /^[A-Za-z]{1,150}$/;
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|edu|org)$/;
  const phoneRegex = /^[0-9]{10}$/;
  const yearRegex = /^[0-9]{4}$/;
const courseRegex = /^[A-Za-z\s]{1,150}$/; // course: letters + spaces only
  const collegeRegex = /^[A-Za-z\s]{1,250}$/; // college/university max 250 chars
   const usernameRegex = /^[A-Za-z]{0,150}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
  

  // --- Education handlers ---
  const addOrUpdateEducation = () => {
    debugger;
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

  // --- Validation ---
  const validateForm = () => {
    let errs = {};
    if (!nameRegex.test(formData.firstName)) errs.firstName = "Invalid first name.";
    if (!nameRegex.test(formData.lastName)) errs.lastName = "Invalid last name.";
    if (!emailRegex.test(formData.email)) errs.email = "Invalid email.";
    if (!phoneRegex.test(formData.phone)) errs.phone = "Phone must be 10 digits.";
    if (!formData.dob) errs.dob = "Date of birth required.";
    if (!formData.gender) errs.gender = "Gender required.";
    if (!formData.username) errs.username = "Username required.";
    if (!formData.password) errs.password = "Password required.";
    if (educationList.length === 0) errs.education = "Add at least one education record.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const profile = { ...formData, educationList };
    console.log("Student Profile Submitted:", profile);
    alert("Profile Saved!");
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="walletheader">Student Profile</h2>

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
            <label>Email *</label>
            <input
              type="email"
              value={formData.email}
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
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={errors.phone ? "input-error" : ""}
            />
            {errors.phone && <p className="error-text">{errors.phone}</p>}
          </div>
        </div>

        <div className="row">
          <div className="form-group">
            <label>Date of Birth *</label>
            <input
              type="date"
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              className={errors.dob ? "input-error" : ""}
            />
            {errors.dob && <p className="error-text">{errors.dob}</p>}
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
    maxLength={150}
    onChange={(e) => {
      const value = e.target.value;
      if (value.length <= 150 && /^[A-Za-z\s]*$/.test(value)) {
        setEducation({ ...education, degree: value });
      }
    }}
  />

  <input
    type="text"
    placeholder="College"
    value={education.college}
    maxLength={250}
    onChange={(e) => {
      const value = e.target.value;
      if (value.length <= 250 && /^[A-Za-z\s]*$/.test(value)) {
        setEducation({ ...education, college: value });
      }
    }}
  />

  <input
    type="text"
    placeholder="Year"
    value={education.year}
    maxLength={4}
    onChange={(e) => {
      const value = e.target.value;
      // ✅ only numbers allowed, max 4 digits
      if (/^\d{0,4}$/.test(value)) {
        setEducation({ ...education, year: value });
      }
    }}
  />

  <button
    type="button"
    className="sign-action-btn"
    onClick={addOrUpdateEducation}
  >
    {editIndex !== null ? "Update" : "Add"}
  </button>
</div>

{/* --- Education List --- */}
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
              className="sign-action-btn1"
              onClick={() => {
                setEducation(edu);
                setEditIndex(i);
                setEduErrors({}); // clear errors on edit
              }}
            >
              Edit
            </button>
            <button
              className="sign-action-btn1 danger"
              onClick={() => {
                deleteEducation(i);
                setEduErrors({}); // clear errors on delete
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)}

{/* --- Common Errors Block (after table) --- */}
{Object.keys(eduErrors).length > 0 && (
  <div className="error-block">
    {eduErrors.degree && <p className="error-text">{eduErrors.degree}</p>}
    {eduErrors.college && <p className="error-text">{eduErrors.college}</p>}
    {eduErrors.year && <p className="error-text">{eduErrors.year}</p>}
  </div>
)}


        {/* --- Verification --- */}
        <h3 className="section-title">Verification</h3>
        <div className="row">
          <div className="form-group">
            <label>Username *</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className={errors.username ? "input-error" : ""}
            />
            {errors.username && <p className="error-text">{errors.username}</p>}
          </div>
          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={errors.password ? "input-error" : ""}
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>
        </div>

        {/* --- Submit --- */}
        <div className="btn-row">
        <button className="sign-action-btn1" onClick={handleSubmit}>
          Update Profile
        </button>
        <button
          className="sign-action-btn1 danger"
          onClick={() => onCancel() || navigate(RP.ViewStudentProfile)}
         // onClick={() => navigate(RP.ViewStudentProfile)} // 🔹 Go back to previous page
        >
          Cancel
        </button>
      </div>
      </div>
    </div>
  );
}
