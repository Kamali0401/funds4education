import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../app/components/header/header";
import "../../pages/styles.css";   

const AddApplicationPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    studyLevel: "",        // UG / PG / PhD
    college: "",
    course: "",
    yearOfStudy: "",
    gpa: "",
    scholarshipName: "",
    category: "",
    applicationDate: "",
    essay: "",
    documents: null,
    extracurricular: "",
    awards: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation for required fields
    const required = ["fullName", "email", "studyLevel", "scholarshipName", "category", "applicationDate"];
    for (let field of required) {
      if (!formData[field]) {
        alert(`Please fill ${field}`);
        return;
      }
    }
    console.log("Submitted Application:", formData);
    navigate("/applications");
  };

  return (
    <>
      <Header variant="newapplication" />

      <main className="add-applications-dashboard">
        <h1 className="add-applications-title">Apply for a Scholarship</h1>
        <p className="add-applications-subtitle">
          Fill the form below to submit your scholarship application.
        </p>

        <form className="add-application-form" onSubmit={handleSubmit}>
          {/* Personal Info */}
          <h3>Personal Information</h3>
          <input type="text" name="fullName" placeholder="Full Name *" value={formData.fullName} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email *" value={formData.email} onChange={handleChange} />
          <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {/* Academic Info */}
          <h3>Academic Information</h3>
          <select name="studyLevel" value={formData.studyLevel} onChange={handleChange} required>
            <option value="">Select Study Level *</option>
            <option value="UG">Undergraduate (UG)</option>
            <option value="PG">Postgraduate (PG)</option>
            <option value="PhD">Ph.D.</option>
          </select>
          <input type="text" name="college" placeholder="School/College Name" value={formData.college} onChange={handleChange} />
          <input type="text" name="course" placeholder="Course / Major" value={formData.course} onChange={handleChange} />
          <input type="text" name="yearOfStudy" placeholder="Year of Study" value={formData.yearOfStudy} onChange={handleChange} />
          <input type="text" name="gpa" placeholder="GPA / Marks" value={formData.gpa} onChange={handleChange} />

          {/* Scholarship Details */}
          <h3>Scholarship Details</h3>
          <input type="text" name="scholarshipName" placeholder="Scholarship Name *" value={formData.scholarshipName} onChange={handleChange} />
          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Select Category *</option>
            <option value="Merit-Based">Merit-Based</option>
            <option value="Need-Based">Need-Based</option>
            <option value="Research Grant">Research Grant</option>
            <option value="Tech Fellowship">Tech Fellowship</option>
          </select>
          <input type="date" name="applicationDate" value={formData.applicationDate} onChange={handleChange} required />
          <textarea name="essay" placeholder="Essay / Motivation Letter" value={formData.essay} onChange={handleChange}></textarea>
          <input type="file" name="documents" onChange={handleChange} />

          {/* Additional Info */}
          <h3>Additional Information</h3>
          <textarea name="extracurricular" placeholder="Extra-Curricular Activities" value={formData.extracurricular} onChange={handleChange}></textarea>
          <textarea name="awards" placeholder="Awards / Achievements" value={formData.awards} onChange={handleChange}></textarea>
          <textarea name="notes" placeholder="Notes / Comments" value={formData.notes} onChange={handleChange}></textarea>

          {/* Actions */}
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={() => navigate("/applications")}>Cancel</button>
            <button type="submit" className="submit-btn">Submit Application</button>
          </div>
        </form>
      </main>
    </>
  );
};

export default AddApplicationPage;
