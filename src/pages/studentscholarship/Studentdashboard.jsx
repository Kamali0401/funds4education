import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../app/components/header/header";
import { routePath as RP } from "../../app/components/router/routepath";
import { logout } from "../../app/redux/slices/authSlice";
import { fetchScholarshipList } from "../../app/redux/slices/ScholarshipSlice";
import "../../pages/styles.css";
import Swal from "sweetalert2";

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

   const { applications = [] } = useSelector((state) => state.applications || {});

  const name =
    useSelector((state) => state.auth.name) || localStorage.getItem("name");
  const roleId =
    useSelector((state) => state.auth.roleId) ||
    Number(localStorage.getItem("roleId"));

  const { data: scholarships = [], loading = false } =
    useSelector((state) => state.scholarship || {});
    debugger;

  /*useEffect(() => {
    if (!roleId) navigate("/login");
    else if (roleId !== 1) navigate("/unauthorized");
  }, [roleId, navigate]);*/

  useEffect(() => {
    dispatch(fetchScholarshipList());
  }, [dispatch]);

  const upcomingDeadlines = useMemo(() => {
    const today = new Date();
    return scholarships.filter((s) => {
      if (!s.endDate) return false;
      const end = new Date(s.endDate);
      const diffDays = (end - today) / (1000 * 60 * 60 * 24);
      return diffDays > 0 && diffDays <= 5;
    });
  }, [scholarships]);

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

          {/* Logout Button */}
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
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = "#c53030")
              }
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

          {/* Scholarships Section */}
          <div className="scholarship-section">
            {loading ? (
              <p>Loading scholarships...</p>
            ) : scholarships.length === 0 ? (
              <p>No scholarships available.</p>
            ) : (
              scholarships.map((s, index) => {
                const today = new Date();
                const endDate = s.endDate
                  ? new Date(s.endDate).toLocaleDateString()
                  : "N/A";
                const diffDays = s.endDate
                  ? Math.ceil(
                      (new Date(s.endDate) - today) / (1000 * 60 * 60 * 24)
                    )
                  : null;

                return (
                  <div key={index} className="scholarship-card">
                    <div>
                      
                      <h3>{s.scholarshipName}</h3>
                      <p>
                        <strong>Type:</strong> {s.scholarshipType || "N/A"}
                      </p>
                      <p>
                        <strong>Amount:</strong> ₹
                        {s.scholarshipAmount?.toLocaleString() || "N/A"}
                      </p>
                      <p>
                        <strong>Eligibility:</strong>{" "}
                        {s.eligibilityCriteria || "N/A"}
                      </p>
                      <p>
                        <strong>Deadline:</strong> {endDate}
                      </p>
                      {diffDays > 0 && diffDays <= 5 && (
                        <p style={{ color: "red", fontWeight: "600" }}>
                          {diffDays} day(s) left
                        </p>
                      )}
                    </div>
                    <button className="btn-view">View</button>
                  </div>
                );
              })
            )}
          </div>
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
            {upcomingDeadlines.length === 0 ? (
              <p>No upcoming deadlines this week.</p>
            ) : (
              <ul>
                {upcomingDeadlines.map((deadline, index) => (
                  <li key={index}>
                    <span>• {deadline.scholarshipName}</span>
                    <span>
                      {new Date(deadline.endDate).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
