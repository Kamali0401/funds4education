import React, { useState } from "react";
import { Link } from "react-router-dom";
import { routePath as RP } from "../../app/components/router/routepath";
import "../../pages/styles.css";

export default function SponsorSignUpPage() {
    const [step, setStep] = useState(0);
    const [userType, setUserType] = useState("sponsor"); // default to sponsor

    const [basicDetails, setBasicDetails] = useState({
        sponsorName: "",
        orgType: "",
        email: "",
        phone: "",
        website: "",
    });

    const [verification, setVerification] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState({});

    // --- Validation regex ---
    const nameRegex = /^[A-Za-z\s]{1,150}$/;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+\.(com|org|net|edu|co\.in)$/;
    const phoneRegex = /^[0-9]{10}$/;
    const usernameRegex = /^[A-Za-z]{1,150}$/;
    const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

    // --- Step validation ---
    const validateStep = () => {
        let stepErrors = {};

        if (step === 0) {
            if (!basicDetails.sponsorName || !nameRegex.test(basicDetails.sponsorName))
                stepErrors.sponsorName = "Sponsor/Org name required (letters only, max 150).";
            if (!basicDetails.orgType) stepErrors.orgType = "Organization type required.";
            if (!basicDetails.email || !emailRegex.test(basicDetails.email))
                stepErrors.email = "Invalid email (use .com, .org, .edu, etc).";
            if (!basicDetails.phone || !phoneRegex.test(basicDetails.phone))
                stepErrors.phone = "Phone number must be 10 digits.";
            if (!basicDetails.website)
                stepErrors.website = "Website/LinkedIn link is required.";
        }

        if (step === 1) {
            if (!verification.username || !usernameRegex.test(verification.username))
                stepErrors.username = "Username required (alphabets only, max 150).";
            if (!verification.password || !passwordRegex.test(verification.password))
                stepErrors.password =
                    "Password min 6 chars, must include letters, numbers & 1 special char.";
        }

        setErrors(stepErrors);
        return Object.keys(stepErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep()) setStep(step + 1);
    };
    const prevStep = () => setStep(step - 1);

    const handleSave = () => {
      debugger;
        if (!validateStep()) return;
        const data = { basicDetails, verification };
        console.log("Sponsor Saved:", data);
        alert("Sponsor registered successfully!");
    };

    // --- Step completed check ---
    const isStepCompleted = (stepIndex) => {
        if (stepIndex === 0) {
            return (
                basicDetails.sponsorName &&
                nameRegex.test(basicDetails.sponsorName) &&
                basicDetails.orgType &&
                basicDetails.email &&
                emailRegex.test(basicDetails.email) &&
                basicDetails.phone &&
                phoneRegex.test(basicDetails.phone) &&
                basicDetails.website
            );
        }
        return true;
    };

    return (
        <div className="sponsorsignup-container">
            <div className="sponsorsignup-card">
                {/* Header */}
                <div className="sponsorsignup-header">
                    <h2>Sponsor Sign up</h2>
                    <p>
                        Already a sponsor?{" "}
                                  <Link
                          to={RP.login}
                          state={{ userType }}
                          className="sponsorsignup-link"
                        >
                          Sign in
                        </Link>
                    </p>
                </div>

                {/* Step navigation */}
                <div className="sponsorsignup-steps">
                    {["Organization Details", "Verification"].map((label, i) => (
                        <div key={i} className="step-item">
                            <div
                                className={`step-circle ${i === step ? "active" : ""} ${i > 0 && !isStepCompleted(i - 1) ? "disabled" : ""
                                    }`}
                                onClick={() => {
                                    if (i === 0 || isStepCompleted(i - 1)) setStep(i);
                                }}
                                title={label}
                            >
                                {i + 1}
                            </div>
                            <span className="step-label">{label}</span>
                        </div>
                    ))}
                </div>

                {/* Step content */}
                {/* Step content */}
               {step === 0 && (
  <div>
    <h3 className="sponsor-section-title">Organization Details</h3>

    <div className="row">
      <div className="form-group">
        <label>Organization/Sponsor Name *</label>
        <input
          type="text"
          value={basicDetails.sponsorName}
          onChange={(e) =>
            setBasicDetails({ ...basicDetails, sponsorName: e.target.value })
          }
          className={errors.sponsorName ? "input-error" : ""}
          placeholder="Organization / Sponsor Name"
        />
        {errors.sponsorName && <p className="error-text">{errors.sponsorName}</p>}
      </div>

      <div className="form-group">
        <label>Organization/Sponsor Type *</label>
        <select
          value={basicDetails.orgType}
          onChange={(e) =>
            setBasicDetails({ ...basicDetails, orgType: e.target.value })
          }
          className={errors.orgType ? "input-error" : ""}
        >
          <option value="">--Select--</option>
          <option value="Company">Company</option>
          <option value="NGO">NGO</option>
          <option value="Government">Government</option>
          <option value="Individual">Individual</option>
        </select>
        {errors.orgType && <p className="error-text">{errors.orgType}</p>}
      </div>
    </div>

    <div className="row">
      <div className="form-group">
        <label>Email *</label>
        <input
          type="email"
          value={basicDetails.email}
          onChange={(e) =>
            setBasicDetails({ ...basicDetails, email: e.target.value })
          }
          className={errors.email ? "input-error" : ""}
          placeholder="Email"
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label>Phone *</label>
        <input
          type="text"
          maxLength={10}
          value={basicDetails.phone}
          onChange={(e) =>
            setBasicDetails({ ...basicDetails, phone: e.target.value })
          }
          className={errors.phone ? "input-error" : ""}
          placeholder="Phone Number"
        />
        {errors.phone && <p className="error-text">{errors.phone}</p>}
      </div>
    </div>

    <div className="row">
      <div className="form-group">
        <label>Website / LinkedIn *</label>
        <input
          type="text"
          value={basicDetails.website}
          onChange={(e) =>
            setBasicDetails({ ...basicDetails, website: e.target.value })
          }
          className={errors.website ? "input-error" : ""}
          placeholder="https://yourwebsite.com"
        />
        {errors.website && <p className="error-text">{errors.website}</p>}
      </div>
    </div>
  </div>
)}

{step === 1 && (
  <div>
    <h3 className="sponsor-section-title">Verification</h3>

    <div className="row">
      <div className="form-group">
        <label>Username *</label>
        <input
          type="text"
          value={verification.username}
          onChange={(e) =>
            setVerification({ ...verification, username: e.target.value })
          }
          className={errors.username ? "input-error" : ""}
          placeholder="Choose username"
        />
        {errors.username && <p className="error-text">{errors.username}</p>}
      </div>

      <div className="form-group">
        <label>Password *</label>
        <input
          type="password"
          value={verification.password}
          onChange={(e) =>
            setVerification({ ...verification, password: e.target.value })
          }
          className={errors.password ? "input-error" : ""}
          placeholder="Password"
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
      </div>
    </div>
  </div>
)}


               
                {/* Navigation buttons */}
                <div className="nav-buttons">
                    {step > 0 && (
                        <button onClick={prevStep} className="nav-btn">
                            Previous
                        </button>
                    )}
                    {step < 1 && (
                        <button onClick={nextStep} className="nav-btn">
                            Next
                        </button>
                    )}
                    {step === 1 && (
                        <button onClick={handleSave} className="save-btn">
                            Save
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
