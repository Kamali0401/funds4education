import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateStudent } from "../../../app/redux/slices/studentSlice";
import Swal from "sweetalert2";
import "../../../pages/styles.css";

export default function StudentProfileForm({ profile, onCancel, onSave }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateofBirth: "",
    gender: "",
    userName: "",
  });

  const [educationList, setEducationList] = useState([]);
  const [education, setEducation] = useState({ degree: "", college: "", year: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (profile) {
      setFormData({
        id: profile.id,
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        email: profile.email || "",
        phone: profile.phone || "",
        dateofBirth: profile.dateofBirth
          ? new Date(profile.dateofBirth).toLocaleDateString("en-CA")
          : "",
        gender: profile.gender || "",
        userName: profile.userName || "",
      });

      try {
        if (profile.education) {
          const parsed = JSON.parse(profile.education);
          setEducationList(Array.isArray(parsed) ? parsed : [parsed]);
        }
      } catch {
        console.warn("⚠️ Invalid education JSON:", profile.education);
      }
    }
  }, [profile]);

  const formatDateForBackend = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year} 00:00:00`;
  };

  const validateForm = () => {
    const errs = {};
    if (!formData.firstName) errs.firstName = "First name required.";
    if (!formData.lastName) errs.lastName = "Last name required.";
    if (!formData.email) errs.email = "Email required.";
    if (!formData.phone) errs.phone = "Phone required.";
    if (!formData.gender) errs.gender = "Gender required.";
    if (!formData.userName) errs.userName = "Username required.";
    if (!formData.dateofBirth) errs.dateofBirth = "Date of Birth required.";
    if (educationList.length === 0) errs.education = "Add at least one education record.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const addOrUpdateEducation = () => {
    if (!education.degree || !education.college || !education.year) {
      Swal.fire("Error", "Please fill in all education fields.", "error");
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
  };

  const deleteEducation = (index) => {
    setEducationList(educationList.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    const loggedInName = localStorage.getItem("name") || "System";

    const payload = {
      id: formData.id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      dateofBirth: formatDateForBackend(formData.dateofBirth),
      userName: formData.userName,
      passwordHash: profile.passwordHash, // keep same password
      gender: formData.gender,
      education: JSON.stringify(educationList),
      roleId: "1", // string for backend
      createdBy: profile.createdBy || null,
      createdDate: profile.createdDate || null,
      modifiedBy: loggedInName,
      modifiedDate: null,
    };

    try {
      await dispatch(updateStudent(payload)).unwrap();
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully.",
      });
      onSave(payload); // ✅ return to view mode
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err?.message || "Could not update profile.",
      });
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="walletheader">Edit Student Profile</h2>

        <form onSubmit={handleSubmit}>
          {/* Basic Details */}
          <h3 className="section-title">Basic Details</h3>
          <div className="row">
            <div className="form-group">
              <label>First Name *</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
              {errors.firstName && <p className="error-text">{errors.firstName}</p>}
            </div>
            <div className="form-group">
              <label>Last Name *</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
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
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>
            <div className="form-group">
              <label>Phone *</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              {errors.phone && <p className="error-text">{errors.phone}</p>}
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label>Date of Birth *</label>
              <input
                type="date"
                value={formData.dateofBirth}
                onChange={(e) => setFormData({ ...formData, dateofBirth: e.target.value })}
              />
              {errors.dateofBirth && <p className="error-text">{errors.dateofBirth}</p>}
            </div>
            <div className="form-group">
              <label>Gender *</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && <p className="error-text">{errors.gender}</p>}
            </div>
          </div>

          {/* Education */}
          <h3 className="section-title">Education</h3>
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

          {/* Username */}
          <h3 className="section-title">Account</h3>
          <div className="form-group">
            <label>Username *</label>
            <input
              type="text"
              value={formData.userName}
              onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
            />
            {errors.userName && <p className="error-text">{errors.userName}</p>}
          </div>

          {/* Buttons */}
          <div className="btn-row">
            <button type="submit" className="sign-action-btn1">
              Update Profile
            </button>
            <button
              type="button"
              className="sign-action-btn1 danger"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
