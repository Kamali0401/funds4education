import React from "react";
import { FaUser, FaCreditCard, FaLock, FaCog } from "react-icons/fa";
import "../styles.css";


export default function SponsorSettings() {
  return (
    <div className="sponsor-settings">
      <h1>Sponsor Settings</h1>
      <p>Manage your profile, payment, and sponsorship preferences.</p>

      {/* Profile */}
      <div className="settings-card">
        <h2><FaUser /> Profile Information</h2>
        <label>Name</label>
        <input type="text" placeholder="Enter your name" />
        <label>Organisation Name or Company Name</label>
        <input type="text" placeholder="Enter your organisation or company name if any" />
        <label>Email</label>
        <input type="email" placeholder="Enter your email" />
        <label>Phone</label>
        <input type="text" placeholder="Enter your phone" />
        <button>Save Profile</button>
      </div>

      {/* Payment */}
      <div className="settings-card">
        <h2><FaCreditCard /> Payment Settings</h2>
        <label>Payment Method</label>
        <select>
          <option>Bank Transfer</option>
          <option>UPI</option>
          <option>PayPal</option>
        </select>
        <label>Account / UPI ID</label>
        <input type="text" placeholder="Enter details" />
        <button>Save Payment</button>
      </div>

      {/* Sponsorship */}
     <div className="settings-card">
  <h2><FaCog /> Sponsorship Preferences</h2>

  <label>Scholarship Type</label>
  <select>
    <option>Merit-based</option>
    <option>Need-based</option>
    <option>Custom</option>
  </select>

  <label>Max Amount</label>
  <input type="number" placeholder="Enter amount" />

  <label>Number of Students</label>
  <input type="number" placeholder="Enter number" />

  {/* 🔹 New Dropdown */}
  <label>Preferred Department / Field</label>
  <select>
    <option>Engineering</option>
    <option>Science</option>
    <option>Arts</option>
    <option>Commerce</option>
    <option>Medical</option>
    <option>Law</option>
  </select>

  <button>Save Preferences</button>
</div>


      {/* Security */}
      <div className="settings-card">
        <h2><FaLock /> Security</h2>
        <label>Change Password</label>
        <input type="password" placeholder="New password" />
        <button>Update Password</button>
      </div>
    </div>
  );
}
