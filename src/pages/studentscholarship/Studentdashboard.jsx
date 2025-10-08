import React, { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../app/components/header/header";
import { routePath as RP } from "../../app/components/router/routepath";
import { logout } from "../../app/redux/slices/authSlice";
import "../../pages/styles.css";
import Swal from "sweetalert2";

const scholarships = [
  { title: "STEM Excellence Scholarship", amount: "$5,000", deadline: "May 15, 2024", status: "Submitted" },
  { title: "Achievers Scholarship", amount: "$2,500", deadline: "June 1, 2024" },
  { title: "Community Leader Award", amount: "$1,000", deadline: "June 20, 2024" },
];

const applications = [
  { title: "STEM Excellence Scholarship", status: "Submitted" },
  { title: "Future Innovators Grant", status: "In Review" },
  { title: "Emerging Talent Scholarship", status: "Pending" },
];

const deadlines = [
  { title: "Service to Society Scholarship", date: "April 28, 2024" },
  { title: "Women in Science Scholarship", date: "May 10, 2024" },
];

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Get user info from Redux or localStorage
 const name =
  useSelector((state) => state.auth.name) || localStorage.getItem("name");
  const roleId = useSelector((state) => state.auth.roleId) || Number(localStorage.getItem("roleId"));

  // ✅ Redirect if not a student
  useEffect(() => {
    if (!roleId) navigate("/login");
    else if (roleId !== 1) navigate("/unauthorized");
  }, [roleId, navigate]);

  // ✅ Logout handler
const handleLogout = () => {
  dispatch(logout());
  Swal.fire({
    icon: "success",
    title: "Logout Successful",
    text: "You have been logged out.",
    confirmButtonColor: "#3085d6",
    timer: 1800,
  });
  navigate("/login");
};

  return (
    <div>
      <Header variant="student-profile" />
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside>
          <div className="user-info">
            <FaUserCircle size={50} className="text-gray-500" />
            <div>
              <h2>{name || "Student"}</h2>
            </div>
          </div>

          <nav>
            <Link to="/student-dashboard" className="active">
              Dashboard
            </Link>
            <Link to="/applications">Applications</Link>
            <Link to="/scholarship-match">Matches</Link>
            <Link to={RP.studentmessages}>Messages</Link>
            <Link to={RP.ViewStudentProfile}>Profile</Link>
            <Link to={RP.studentwallet}>Wallet</Link>
          </nav>

          {/* ✅ Logout Button */}
          <div style={{ marginTop: "auto", padding: "1rem" }}>
            <button
              onClick={handleLogout}
              style={{
                width: "100%",
                padding: "0.5rem 1rem",
                backgroundColor: "#e53e3e",
                color: "#fff",
                border: "none",
                borderRadius: "0.5rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#c53030")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#e53e3e")}
            >
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main>
          <header>
            <h1>Scholarship Matches</h1>
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
                <br />
                <div className="status-bar">
                  <div
                    className={`progress ${app.status.toLowerCase().replace(" ", "-")}`}
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

export default StudentDashboard;
