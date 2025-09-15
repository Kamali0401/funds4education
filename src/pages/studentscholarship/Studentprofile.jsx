import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import "../../pages/styles.css";
import Header from "../../app/components/header/header";
const scholarships = [
  {
    title: "STEM Excellence Scholarship",
    amount: "$5,000",
    deadline: "May 15, 2024",
    status: "Submitted",
  },
  {
    title: "Achievers Scholarship",
    amount: "$2,500",
    deadline: "June 1, 2024",
  },
  {
    title: "Community Leader Award",
    amount: "$1,000",
    deadline: "June 20, 2024",
  },
];

const applications = [
  {
    title: "STEM Excellence Scholarship",
    status: "Submitted",
  },
  {
    title: "Future Innovators Grant",
    status: "In Review",
  },
  {
    title: "Emerging Talent Scholarship",
    status: "Pending",
  },
];

const deadlines = [
  {
    title: "Service to Society Scholarship",
    date: "April 28, 2024",
  },
  {
    title: "Women in Science Scholarship",
    date: "May 10, 2024",
  },
];

const Dashboard = () => {
  return (
     <div>
    <Header variant="student-profile"  />
    <div className="flex h-screen">
      
      {/* Sidebar */}
      <aside>
        <div className="user-info">
          <FaUserCircle size={50} className="text-gray-500" />
          <div>
            <h2>Sarah Mahajan</h2>
          </div>
        </div>

        <nav>
          <a href="#" className="active">
            Dashboard
          </a>
          <a href="#">Applications</a>
          <a href="#">Matches</a>
          <a href="#">Messages</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main>
        {/* Header */}
        <header>
          <h1>Scholarship Matches</h1>
         {/* <div className="header-actions">
            <FiBell size={22} className="cursor-pointer" />
            <div className="language-selector">
              <span>English</span>
              <IoMdArrowDropdown />
            </div>
          </div>*/}
        </header>

        {/* Scholarship Matches */}
        <div className="scholarship-section">
          {scholarships.map((scholarship, index) => (
            <div key={index} className="scholarship-card">
              <div>
                <h3>{scholarship.title}</h3>
                <p>{scholarship.amount}</p>
                <p>Deadline: {scholarship.deadline}</p>
              </div>
              <button className="btn-view">View</button>
            </div>
          ))}
        </div>

        {/* Application Status */}
        <section className="application-status">
          <h2>Application Status</h2>
          {applications.map((app, index) => (
            <div key={index} className="application-item">
              <div className="flex justify-between mb-1">
                <span>{app.title}</span>
                <span>{app.status}</span>
              </div>
              <div className="status-bar">
                <div
                  className={`progress ${app.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                ></div>
              </div>
            </div>
          ))}
        </section>

        {/* Upcoming Deadlines */}
        <section className="upcoming-deadlines">
          <h2>Upcoming Deadlines</h2>
          <ul>
            {deadlines.map((deadline, index) => (
              <li key={index}>
                <span>• {deadline.title}</span>
                <span>{deadline.date}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
    </div>
  );
};

export default Dashboard;
