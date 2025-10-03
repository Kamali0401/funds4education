import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import login from "../../app/assests/login.jpg";
import "../../pages/styles.css";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { routePath as RP } from "../../app/components/router/routepath";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLocation } from "react-router-dom";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const location = useLocation(); // ✅ use this instead of global 'location'
  const [userType, setUserType] = useState(location.state?.userType || "");
    const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = { email: "", password: "" };

    if (!email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      alert("Login Successful ✅");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor: "#f3f4f6",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          backgroundColor: "#fff",
          borderRadius: "1rem",
          boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          overflow: "hidden",
        }}
      >
        {/* Left: Login Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#1D4F56",
              marginBottom: "0.5rem",
            }}
          >
            Login
          </h2>
         <p
  style={{
    fontSize: "0.875rem",
    color: "#1D4F56",
    marginBottom: "1.5rem",
  }}
>
  Doesn’t have an account yet?{" "}
  <Link
    to={
      userType === "student"
        ? RP.signup
        : userType === "sponsor"
        ? RP.signupSponsor
        : RP.signupInstitution
    }
    state={{ userType }}
    style={{ color: "#1D4F56", textDecoration: "underline" }}
  >
    Sign Up
  </Link>
</p>

<div className="user-radio-group">
  <label className="user-radio-label">
    <input
      type="radio"
      name="userType"
      value="student"
      checked={userType === "student"}
      onChange={(e) => setUserType(e.target.value)}
    />
    <span>Student</span>
  </label>

  <label className="user-radio-label">
    <input
      type="radio"
      name="userType"
      value="sponsor"
      checked={userType === "sponsor"}
      onChange={(e) => setUserType(e.target.value)}
    />
    <span>Sponsor</span>
  </label>

  <label className="user-radio-label">
    <input
      type="radio"
      name="userType"
      value="institution"
      checked={userType === "institution"}
      onChange={(e) => setUserType(e.target.value)}
    />
    <span>Institution</span>
  </label>
</div>



          
          {/* Email */}
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#1D4F56",
                marginBottom: "0.25rem",
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem 1rem",
                fontSize: "14px",
                border: "1px solid #d1d5db",
                borderRadius: "0.5rem",
                outline: "none",
                height: "36px",
                boxSizing: "border-box",
              }}
            />
            {errors.email && (
              <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div style={{ marginBottom: "1rem", position: "relative" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#1D4F56",
                marginBottom: "0.25rem",
              }}
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem 1rem",
                fontSize: "14px",
                border: "1px solid #d1d5db",
                borderRadius: "0.5rem",
                outline: "none",
                height: "36px",
                boxSizing: "border-box",
              }}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                top: "65%",
                right: "10px",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#1D4F56",
                fontSize: "20px",
              }}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
            {errors.password && (
              <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                {errors.password}
              </p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#1D4F56",
              color: "#fff",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              fontWeight: 600,
              cursor: "pointer",
              border: "none",
              marginBottom: "1rem",
            }}
          >
            LOGIN
          </button>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "1rem 0",
            }}
          >
            <div style={{ flexGrow: 1, height: "1px", backgroundColor: "#d1d5db" }}></div>
            <span
              style={{
                padding: "0 0.5rem",
                fontSize: "0.875rem",
                color: "#1D4F56",
              }}
            >
              or login with
            </span>
            <div style={{ flexGrow: 1, height: "1px", backgroundColor: "#d1d5db" }}></div>
          </div>

          {/* Social Buttons */}
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              type="button"
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #d1d5db",
                borderRadius: "0.5rem",
                padding: "0.5rem",
                cursor: "pointer",
              }}
            >
              <FcGoogle style={{ marginRight: "0.5rem", fontSize: "1.25rem" }} /> Google
            </button>
            <button
              type="button"
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #d1d5db",
                borderRadius: "0.5rem",
                padding: "0.5rem",
                cursor: "pointer",
                color: "#1D4F56",
              }}
            >
              <FaFacebook style={{ marginRight: "0.5rem", fontSize: "1.25rem" }} /> Facebook
            </button>
          </div>
        </form>

        {/* Right: Optional image or illustration */}
        <div
          style={{
            backgroundImage: `url(${login})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
    </div>
  );
}
