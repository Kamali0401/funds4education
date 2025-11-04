import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import login from "../../app/assests/login.jpg";
import "../../pages/styles.css";
import {
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaPinterest,
  FaFacebook,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { routePath as RP } from "../../app/components/router/routepath";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../app/redux/slices/authSlice";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ identifier: "", password: "" });

  const location = useLocation();
  const navigate = useNavigate();
  const [userType, setUserType] = useState(location.state?.userType || "");

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
// ✅ Update API base URL to match your backend
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://localhost:44315/api/Auth";

const handleOAuthLogin = (provider) => {
  if (!userType) {
    alert("Please select or provide user type before login.");
    return;
  }

  // Redirect to backend OAuth endpoint
  //window.location.href = `${API_BASE_URL}/${provider}/login?role=${userType}`;
  window.location.href = `https://localhost:44315/api/Auth/${provider}/${userType}/login`;
};
/*const handleOAuthLogin = async (provider) => {
  if (!userType) {
    alert("Please select or provide user type before login.");
    return;
  }
debugger;
  const loginUrl = `https://localhost:44315/api/Auth/${provider}/${userType}/login`;

  // Open OAuth login popup
  const popup = window.open(loginUrl, "_blank", "width=500,height=600");

  // Listen for backend message (token info)
  const handleMessage = (event) => {
    // Validate message origin
    if (!event.origin.includes("localhost")) return;

    const data = event.data;
    if (data?.token) {
      // ✅ Save token data to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.name);
      localStorage.setItem("roleId", data.roleId);
      localStorage.setItem("roleName", data.roleName);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("username", data.username);

      // ✅ Close popup
      popup.close();

      // ✅ Navigate based on role
      if (data.roleName === "Student") navigate("/student-dashboard");
      else if (data.roleName === "Sponsor") navigate("/sponsor-dashboard");
      else if (data.roleName === "Institution") navigate("/institution-dashboard");
    }

    // Cleanup listener
    window.removeEventListener("message", handleMessage);
  };

  window.addEventListener("message", handleMessage);
};*/

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = { identifier: "", password: "" };

    if (!identifier.trim())
      newErrors.identifier = "Username or Email is required";
    if (!password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);

    if (!newErrors.identifier && !newErrors.password) {
      dispatch(loginUser({ username: identifier, password, userType }))
        .unwrap()
        .then((res) => {
          const roleId = res.roleId;
          if (roleId === 1) navigate("/student-dashboard");
          else if (roleId === 2) navigate("/sponsor-dashboard");
          else if (roleId === 4) navigate("/institution-dashboard");
        })
        .catch(() => {
          // Let Redux handle error — don't add local form error here
        });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
            Don’t have an account yet?{" "}
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

          {/* User Type Radio */}
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

          {/* Username or Email */}
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
              Username or Email
            </label>
            <input
              type="text"
              placeholder="Enter username or email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
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
            {errors.identifier && (
              <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                {errors.identifier}
              </p>
            )}
          </div>

          {/* Password */}
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
    Password
  </label>

  <div style={{ position: "relative" }}>
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
        top: "50%", // works now
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
  </div>

  {errors.password && (
    <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
      {errors.password}
    </p>
  )}
</div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
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
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>

          {/* ✅ Moved error display here */}
          {error && (
            <p style={{ color: "red", fontSize: "12px", marginTop: "-0.5rem", marginBottom: "1rem" }}>
              {error}
            </p>
          )}

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "1rem 0",
            }}
          >
            <div
              style={{ flexGrow: 1, height: "1px", backgroundColor: "#d1d5db" }}
            ></div>
            <span
              style={{
                padding: "0 0.5rem",
                fontSize: "0.875rem",
                color: "#1D4F56",
              }}
            >
              or login with
            </span>
            <div
              style={{ flexGrow: 1, height: "1px", backgroundColor: "#d1d5db" }}
            ></div>
          </div>

          <div className="social-buttons">
            <button className="social-btn" onClick={() => handleOAuthLogin("google")}>
              <FcGoogle /> Google
            </button>
            <button className="social-btn" onClick={() => handleOAuthLogin("facebook")}>
              <FaFacebook /> Facebook
            </button>
            <button className="social-btn"onClick={() => handleOAuthLogin("linkedin")}>
              <FaLinkedin /> LinkedIn
            </button>
            <button className="social-btn"onClick={() => handleOAuthLogin("instagram")}>
              <FaInstagram /> Instagram
            </button>
            <button className="social-btn"onClick={() => handleOAuthLogin("twitter")}>
              <FaTwitter /> X
            </button>
            <button className="social-btn"onClick={() => handleOAuthLogin("pinterest")}>
              <FaPinterest /> Pinterest
            </button>
          </div>
        </form>

        {/* Right: Login Image */}
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
