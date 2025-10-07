import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudentProfile, updateStudent } from "../../../app/redux/slices/studentSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../../pages/styles.css";
import { routePath as RP } from "../../../app/components/router/routepath";

export default function StudentProfileForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, status } = useSelector((state) => state.student);

  // ✅ Load profile on mount
  useEffect(() => {
    if (!profile) dispatch(fetchStudentProfile());
  }, [dispatch, profile]);

  // ✅ Local form data
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateofBirth: "",
    gender: "",
    userName: "",
    passwordHash: "",
  });

  const [educationList, setEducationList] = useState([]);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [errors, setErrors] = useState({});

  // ✅ Populate form with fetched profile
  useEffect(() => {
    if (profile) {
      setFormData({
        id: profile.id,
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        email: profile.email || "",
        phone: profile.phone || "",
        dateofBirth: profile.dateOfBirth
          ? new Date(profile.dateOfBirth).toLocaleDateString("en-CA")
          : "",
        gender: profile.gender || "",
        userName: profile.userName || "",
        passwordHash: "",
      });

      try {
        if (profile.education) {
          const parsed = JSON.parse(profile.education);
          setEducationList(Array.isArray(parsed) ? parsed : [parsed]);
        }
      } catch {
        setEducationList([]);
      }
    }
  }, [profile]);

  // ✅ Validation
  const nameRegex = /^[A-Za-z]{1,150}$/;
  const phoneRegex = /^[0-9]{10}$/;
  const usernameRegex = /^[A-Za-z0-9_]{4,150}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;

  const validateForm = () => {
    let errs = {};
    if (!nameRegex.test(formData.firstName)) errs.firstName = "Invalid first name.";
    if (!nameRegex.test(formData.lastName)) errs.lastName = "Invalid last name.";
    if (formData.phone && !phoneRegex.test(formData.phone)) errs.phone = "Phone must be 10 digits.";
    if (!formData.gender) errs.gender = "Gender required.";
    if (!usernameRegex.test(formData.userName)) errs.userName = "Username must be at least 4 characters.";
    if (isPasswordChanged && !passwordRegex.test(formData.passwordHash))
      errs.passwordHash = "Password must contain a letter, number, and special character.";
    if (educationList.length === 0) errs.education = "Add at least one education record.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ✅ Submit (Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      ...formData,
      roleId: 1, // Student
      dateOfBirth: formData.dateofBirth
        ? new Date(formData.dateofBirth).toISOString()
        : null,
      education: JSON.stringify(educationList),
    };

    // 🩵 Backend requires PasswordHash: send old one if unchanged
    if (!isPasswordChanged) {
      payload.passwordHash = profile.passwordHash;
    }

    try {
      await dispatch(updateStudent(payload)).unwrap();
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully.",
      });
      navigate(RP.ViewStudentProfile);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err.message || "Could not update profile.",
      });
    }
  };

  if (status === "loading" || !profile)
    return <p className="loading-text">Loading profile...</p>;

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="walletheader">Update Student Profile</h2>

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
              <input type="email" value={formData.email} readOnly />
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
                value={formData.dateofBirth || ""}
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
          {educationList.length > 0 ? (
            <table className="signup-table">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>College</th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                {educationList.map((edu, i) => (
                  <tr key={i}>
                    <td>{edu.degree}</td>
                    <td>{edu.college}</td>
                    <td>{edu.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No education details found.</p>
          )}

          {/* --- Account Info --- */}
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
                value={isPasswordChanged ? formData.passwordHash : "********"}
                onFocus={() => {
                  if (!isPasswordChanged) {
                    setFormData({ ...formData, passwordHash: "" });
                    setIsPasswordChanged(true);
                  }
                }}
                onChange={(e) => setFormData({ ...formData, passwordHash: e.target.value })}
                className={errors.passwordHash ? "input-error" : ""}
              />
              {errors.passwordHash && <p className="error-text">{errors.passwordHash}</p>}
            </div>
          </div>

          {/* --- Buttons --- */}
          <div className="btn-row">
            <button type="submit" className="sign-action-btn1">
              Update Profile
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
