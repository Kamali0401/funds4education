import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import login from "../../app/assests/login.jpg";
import { Link } from "react-router-dom";
import { routePath as RP } from "../../app/components/router/routepath";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
export default function LoginPage() {
     const [showPassword, setShowPassword] = useState(false);
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f4f6",
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
        <div
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
            
             <Link to={RP.signup} style={{ color: "#1D4F56", textDecoration: "underline" }}>
               Sign Up
            </Link>
          </p>

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
            top: "70%",
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

          {/* Login Button */}
          <button
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
            <span style={{ padding: "0 0.5rem", fontSize: "0.875rem", color: "#1D4F56" }}>
              or login with
            </span>
            <div style={{ flexGrow: 1, height: "1px", backgroundColor: "#d1d5db" }}></div>
          </div>

          {/* Social Buttons */}
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
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
        </div>

        {/* Right: Illustration */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#e6f0f1", // soft background
          }}
        >
          <img
            src={login}
            alt="Login Illustration"
            style={{
              width: "100%",
              maxWidth: "400px",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    </div>
  );
}
