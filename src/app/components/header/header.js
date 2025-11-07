import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assests/Logo.png";
import "./header.css";
import { FiBell } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
 import { routePath as RP } from "../router/routepath";
 import { FiUpload, FiDownload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
const Header = ({ variant = "public" }) => {
  const navigate = useNavigate();
  return (
    <header className="header">
      {/* Left: Logo + Branding */}
       <div className="header-left" onClick={() => navigate(RP.home)} style={{ cursor: "pointer" }}>
        <img src={logo} alt="VidyaSetu Logo" className="logo" />
        <span className="brand">VidyāSetu</span>
      </div>
      {/* Right: Navigation (depends on variant) */}
      <nav className="header-right">
        {variant === "student-profile" && (
          <div className="header-actions">
             <Link to="/login">Login</Link>
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

        {variant === "public" && (
          <div className="nav-links">
            <Link to="/about">About</Link>
           {/* <Link to={RP.scholarshipdiscovery}>Scholarships</Link>*/}
           <Link to={RP.studentdashboard}>Scholarships</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to={RP.resetPassword} >ResetPassword</Link>
          </div>
        )}

        {variant === "student" && (
          <div className="nav-links">
            <Link to="/my-scholarships">Dashboard</Link>
            <Link to="/applications">Saved</Link>
            <Link to="/profile">Message</Link>
          
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
         {variant === "studentwalletredemption" && (
          <div className="nav-links">
            <Link to="">Dashboard</Link>
            <Link to="">Ponits</Link>
            <Link to="">Rewards</Link>
            
          </div>
        )} 

        {variant === "studentredemptioncalog" && (
          <div className="nav-links">
             <Link to="">Dashboard</Link>
           
            <Link to="">Rewards</Link>
             <Link to="">Message</Link>
            
            
          </div>
        )} 
         {variant === "studentwallet" && (
          <div className="nav-links">
            <Link to="">Dashboard</Link>
           
            <Link to="">Rewards</Link>
             <Link to="">Message</Link>
            
          </div>
        )}
         {variant === "studentrewards" && (
          <div className="nav-links">
            <Link to="">Dashboard</Link>
           
            <Link to="">Wallet</Link>
             <Link to="">Message</Link>
            
          </div>
        )}
{variant === "studentmonetization" && (
          <div className="nav-links">
            <Link to="">Dashboard</Link>
           
            <Link to="">sweel</Link>
             <Link to="">Message</Link>
            
          </div>
        )}
       {variant === "dashboard" && (
    <div className="header-right">
      <button className="icon-btn">
        <FiBell size={20} />
      </button>
      <button className="action-btn">
        <FiUpload size={16} /> Upload
      </button>
      <button className="action-btn">
        <FiDownload size={16} /> Download
      </button>
    </div>
  )}



{variant === "sponsordashboardreport" && (
          <div className="nav-links">
            <Link to="">Dashboard</Link>
           
            <Link to="">Campaigns</Link>
             <Link to="">Reports</Link>
            
          </div>
        )}
  {variant === "sponsoraddashboard" && (
          <div className="nav-links">
            <Link to="">Dashboard</Link>
           
            <Link to="">AdCampaigns</Link>
             <Link to="">Settings</Link>
            
          </div>
            )}
           


      </nav>
    </header>
  );
};

export default Header;
