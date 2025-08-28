import React from "react";  // ✅ Add this
import { Link } from "react-router-dom";
import logo from "../../assests/Logo.png";
import "./header.css";
import { FiBell } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";

const Header = ({ variant = "public" }) => {
  return (
    <header className="header">
      {/* Left: Logo + Branding */}
      <div className="header-left">
        <img src={logo} alt="VidyaSetu Logo" className="logo" />
        <span className="brand">VidyāSetu</span>
      </div>

      {/* Right: Navigation (depends on variant) */}
      <nav className="header-right">
        {variant === "dashboard" && (
          <div className="header-actions">
            <FiBell size={22} className="cursor-pointer" />
            <div className="icon-circle">
              <span className="icon-text">?</span>
            </div>
            <div className="language-selector">
              <span>English</span>
              <IoMdArrowDropdown />
            </div>
          </div>
        )}

        {variant === "student" && (
          <div className="nav-links">
            <Link to="/about">About</Link>
            <Link to="/scholarships">Scholarships</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup" className="btn-signup">
              Sign Up
            </Link>
          </div>
        )}

        {variant === "student" && (
          <div className="nav-links">
            <Link to="/my-scholarships">My Scholarships</Link>
            <Link to="/applications">Applications</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/logout">Logout</Link>
          </div>
        )}

        {variant === "discovery" && (
          <div className="nav-links">
            <Link to="/saved">Saved Scholarships</Link>
            <Link to="/eligibility">Eligibility</Link>
            <Link to="/amount">Amount</Link>
            <Link to="/sponsor">Sponsor Type</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
