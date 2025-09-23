import React, { useState } from "react";
import { Link } from "react-router-dom";
import { routePath as RP } from "../../app/components/router/routepath";
export default function SignUpPage() {
  const [step, setStep] = useState(0);

  // Basic Details state
  const [basicDetails, setBasicDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
  });

  // Education states
  const [educationList, setEducationList] = useState([]);
  const [education, setEducation] = useState({ degree: "", college: "", year: "" });
  const [showEducationFields, setShowEducationFields] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Verification state
  const [verification, setVerification] = useState({ username: "", password: "" });

  // --- Handlers for education ---
  const addEducation = () => {
    if (education.degree && education.college && education.year) {
      setEducationList([...educationList, education]);
      setEducation({ degree: "", college: "", year: "" });
      setShowEducationFields(false);
    }
  };

  const updateEducation = (index) => {
    if (education.degree && education.college && education.year) {
      const updated = [...educationList];
      updated[index] = education;
      setEducationList(updated);
      setEditIndex(null);
      setEducation({ degree: "", college: "", year: "" });
    }
  };

  const deleteEducation = (index) => {
    const updated = educationList.filter((_, i) => i !== index);
    setEducationList(updated);
  };

  // --- Navigation Handlers ---
  const nextStep = () => {
    if (step < 2) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  // --- Save handler ---
  const handleSave = () => {
    // Collect all data and log/save
    const data = {
      basicDetails,
      educationList,
      verification,
    };
    console.log("Saved data:", data);
    alert("Data saved! Check console.");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "40px 20px",
        fontFamily: "Segoe UI, sans-serif",
        minHeight: "80vh",
        background: "#f1f5f9",
      }}
    >
      <div
        style={{
          background: "#fff",
          width: "100%",
          maxWidth: "900px",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <h2 style={{ color: "#1D4F56", margin: 0 }}>Sign up</h2>
          <p style={{ margin: 0, fontSize: "14px" }}>
            Already a member?{" "}
            <Link to={RP.login} style={{ color: "#1D4F56", textDecoration: "underline" }}>
  Sign in
</Link>

          </p>
        </div>

        {/* Steps */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginBottom: "20px",
            alignItems: "center",
          }}
        >
          {[{ label: "Basic Details" }, { label: "Education" }, { label: "Verification" }].map(
            (stepItem, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: i === step ? "#1D4F56" : "transparent",
                    border: "2px solid #1D4F56",
                    color: i === step ? "#fff" : "#1D4F56",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    marginBottom: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => setStep(i)}
                  title={stepItem.label}
                >
                  {i + 1}
                </div>
                <span style={{ fontSize: "12px", color: "#1D4F56" }}>{stepItem.label}</span>
              </div>
            )
          )}
        </div>

        {/* Step content */}
        {step === 0 && (
          <>
            <h3 style={sectionTitle}>Basic Details</h3>

            {/* Row 1: First Name & Last Name */}
            <div style={rowStyle}>
              <div style={formGroupStyle}>
                <label style={labelStyle}>First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  style={inputStyle}
                  value={basicDetails.firstName}
                  onChange={(e) =>
                    setBasicDetails({ ...basicDetails, firstName: e.target.value })
                  }
                />
              </div>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  style={inputStyle}
                  value={basicDetails.lastName}
                  onChange={(e) =>
                    setBasicDetails({ ...basicDetails, lastName: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Row 2: Email & Phone Number */}
            <div style={rowStyle}>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  style={inputStyle}
                  value={basicDetails.email}
                  onChange={(e) => setBasicDetails({ ...basicDetails, email: e.target.value })}
                />
              </div>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Phone Number</label>
                <input
                  type="text"
                  placeholder="Phone Number"
                  style={inputStyle}
                  value={basicDetails.phone}
                  onChange={(e) => setBasicDetails({ ...basicDetails, phone: e.target.value })}
                />
              </div>
            </div>

            {/* Row 3: Date of Birth & Gender */}
            <div style={rowStyle}>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Date of Birth</label>
                <input
                  type="date"
                  style={inputStyle}
                  value={basicDetails.dob}
                  onChange={(e) => setBasicDetails({ ...basicDetails, dob: e.target.value })}
                />
              </div>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Gender</label>
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "center",
                    fontWeight: 500,
                    color: "#1D4F56",
                    height: "38px", // match input height
                    paddingLeft: "5px",
                  }}
                >
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      checked={basicDetails.gender === "Male"}
                      onChange={() => setBasicDetails({ ...basicDetails, gender: "Male" })}
                    />{" "}
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      checked={basicDetails.gender === "Female"}
                      onChange={() => setBasicDetails({ ...basicDetails, gender: "Female" })}
                    />{" "}
                    Female
                  </label>
                </div>
              </div>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <h3 style={{ ...sectionTitle, margin: 0 }}>Education</h3>

              {!showEducationFields && editIndex === null && (
                <button onClick={() => setShowEducationFields(true)} style={addBtnStyle}>
                  + Add Education Details
                </button>
              )}
            </div>

            {educationList.length > 0 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 100px",
                  fontWeight: "bold",
                  color: "#1D4F56",
                  padding: "10px 0",
                  borderBottom: "1px solid #ccc",
                }}
              >
                <div>Course</div>
                <div>College / University</div>
                <div>Year</div>
                <div>Actions</div>
              </div>
            )}

            {educationList.map((edu, index) =>
              editIndex === index ? (
                <div
                  key={index}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 100px",
                    gap: "10px",
                    marginTop: "10px",
                  }}
                >
                  <input
                    type="text"
                    value={education.degree}
                    onChange={(e) => setEducation({ ...education, degree: e.target.value })}
                    style={inputStyle}
                    placeholder="Course"
                  />
                  <input
                    type="text"
                    value={education.college}
                    onChange={(e) => setEducation({ ...education, college: e.target.value })}
                    style={inputStyle}
                    placeholder="College / University"
                  />
                  <input
                    type="text"
                    value={education.year}
                    onChange={(e) => setEducation({ ...education, year: e.target.value })}
                    style={inputStyle}
                    placeholder="Year"
                  />
                  <div style={{ display: "flex", gap: "5px" }}>
                    <button
                      onClick={() => updateEducation(index)}
                      style={actionBtnStyle}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditIndex(null);
                        setEducation({ degree: "", college: "", year: "" });
                      }}
                      style={actionBtnStyle}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  key={index}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 100px",
                    alignItems: "center",
                    padding: "10px 0",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <div>{edu.degree}</div>
                  <div>{edu.college}</div>
                  <div>{edu.year}</div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => {
                        setEditIndex(index);
                        setEducation(edu);
                        setShowEducationFields(false);
                      }}
                      style={actionBtnStyle}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteEducation(index)}
                      style={actionBtnStyle}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            )}

            {showEducationFields && editIndex === null && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 100px",
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                <input
                  type="text"
                  placeholder="Course"
                  value={education.degree}
                  onChange={(e) => setEducation({ ...education, degree: e.target.value })}
                  style={inputStyle}
                />
                <input
                  type="text"
                  placeholder="College / University"
                  value={education.college}
                  onChange={(e) => setEducation({ ...education, college: e.target.value })}
                  style={inputStyle}
                />
                <input
                  type="text"
                  placeholder="Year"
                  value={education.year}
                  onChange={(e) => setEducation({ ...education, year: e.target.value })}
                  style={inputStyle}
                />
                <div style={{ display: "flex", gap: "5px" }}>
                  <button onClick={addEducation} style={actionBtnStyle}>
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setShowEducationFields(false);
                      setEducation({ degree: "", college: "", year: "" });
                    }}
                    style={actionBtnStyle}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {step === 2 && (
          <>
            <h3 style={sectionTitle}>Verification</h3>
            <div style={rowStyle}>
              <input
                type="text"
                placeholder="Username"
                style={inputStyle}
                value={verification.username}
                onChange={(e) => setVerification({ ...verification, username: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                style={inputStyle}
                value={verification.password}
                onChange={(e) => setVerification({ ...verification, password: e.target.value })}
              />
            </div>
          </>
        )}

        {/* Navigation buttons */}
        <div
          style={{
            marginTop: 30,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {step > 0 && (
            <button onClick={prevStep} style={navBtnStyle}>
              Previous
            </button>
          )}
          {step < 2 && (
            <button onClick={nextStep} style={navBtnStyle}>
              Next
            </button>
          )}
          {step === 2 && (
            <button onClick={handleSave} style={saveBtnStyle}>
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Reusable Styles
const sectionTitle = {
  marginTop: "25px",
  marginBottom: "10px",
  color: "#1D4F56",
};

const inputStyle = {
  padding: "10px",
  fontSize: "16px",
  flex: 1,
  minWidth: "200px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  outline: "none",
};

const rowStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "15px",
  marginBottom: "15px",
};

const addBtnStyle = {
  background: "#1D4F56",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "6px",
  cursor: "pointer",
};

const navBtnStyle = {
  backgroundColor: "#1D4F56",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "6px",
  cursor: "pointer",
};

const saveBtnStyle = {
  backgroundColor: "green",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "6px",
  cursor: "pointer",
};

const labelStyle = {
  fontSize: "14px",
  color: "#1D4F56",
  marginBottom: "5px",
  display: "block",
  fontWeight: "500",
};

const formGroupStyle = {
  flex: 1,
  minWidth: "200px",
  display: "flex",
  flexDirection: "column",
};

const actionBtnStyle = {
  background: "#1D4F56",
  color: "#fff",
  border: "none",
  padding: "6px 10px",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
};
