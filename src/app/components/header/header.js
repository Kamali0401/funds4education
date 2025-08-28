import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../assests/Logo.png";
import ScholarshipCard from "../../../pages/headerscholarship/ScholarshipCard"; // Import your card component
import "./header.css";
import { FiBell } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";

const Header = ({ isDashboard = false }) => {
  const [showCard, setShowCard] = useState(false);

  return (
    <header className="header">
      {/* Left: Logo + Branding */}
      <div className="header-left">
        <img src={logo} alt="VidyaSetu Logo" className="logo" />
        <span className="brand">VidyāSetu</span>
      </div>

      {/* Right: Navigation */}
      <nav className="header-right">
        {isDashboard ? (
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
        ) : (
          <nav>
            <a href="/about">About</a>
            <a href="/scholarships">Scholarships</a>
            <a href="/login">Login</a>
            <a href="/signup" className="btn-signup">
              Sign Up
            </a>
          </nav>
        )}
      </nav>
    </header>
  );
};

export default Header;
