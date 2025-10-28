import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../app/components/header/header";
import { logout } from "../../app/redux/slices/authSlice";
import { fetchScholarshipList } from "../../app/redux/slices/ScholarshipSlice";
import Swal from "sweetalert2";
import "../../pages/studentscholarship/studentdashboard.css";
import logoUrl from "../../app/assests/kotak.png";
import { routePath as RP } from "../../app/components/router/routepath";

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: scholarships = [], loading = false } =
    useSelector((state) => state.scholarship || {});

  const roleId =
    useSelector((state) => state.auth.roleId) ||
    Number(localStorage.getItem("roleId"));
  const userId =
    useSelector((state) => state.auth.userId) ||
    Number(localStorage.getItem("userId"));

  const [activeTab, setActiveTab] = useState("live");

  /*useEffect(() => {
    if (!roleId) navigate("/login");
    else if (roleId !== 1) navigate("/unauthorized");
  }, [roleId, navigate]);*/

  useEffect(() => {
    if (userId && roleId) {
      dispatch(fetchScholarshipList(userId, roleId));
    }
  }, [dispatch, userId, roleId]);

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

  const today = new Date();

  // 🧠 Days left logic
  const getDaysLeftText = (endDate) => {
    if (!endDate) return null;
    const end = new Date(endDate);
    const diffDays = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return null;
    if (diffDays === 0) return "Last day to go";
    if (diffDays <= 15) return `${diffDays} days to go`;
    return null;
  };

  const liveScholarships = useMemo(
    () => scholarships.filter((s) => s.endDate && new Date(s.endDate) >= today),
    [scholarships]
  );

  const upcomingScholarships = useMemo(() => {
    const nextTenDays = new Date();
    nextTenDays.setDate(today.getDate() + 10);
    return scholarships.filter((s) => {
      if (!s.startDate) return false;
      const startDate = new Date(s.startDate);
      return startDate > today && startDate <= nextTenDays;
    });
  }, [scholarships]);

  const featuredScholarships = useMemo(() => {
    return scholarships
      .filter((s) => !!s.scholarshipAmount && !isNaN(Number(s.scholarshipAmount)))
      .sort((a, b) => Number(b.scholarshipAmount) - Number(a.scholarshipAmount))
      .slice(0, 5);
  }, [scholarships]);

  const featuredIds = useMemo(
    () => featuredScholarships.map((s) => s.id || s.scholarshipId),
    [featuredScholarships]
  );

  const displayedScholarships =
    activeTab === "upcoming" ? upcomingScholarships : liveScholarships;

  return (
    <div>
      <Header variant="student-profile" />
      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <div>
            <div className="filter-title">Filters</div>
            <div className="filter-group">
              {["Class", "Country", "Gender", "Religion", "State", "Course"].map(
                (label) => (
                  <div key={label}>
                    <label>Select {label}</label>
                    <select>
                      <option>All</option>
                    </select>
                  </div>
                )
              )}
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Tabs */}
          <div className="tab-container">
            <div className="tab-group">
              <button
                className={`tab ${activeTab === "live" ? "active" : ""}`}
                onClick={() => setActiveTab("live")}
              >
                Live Scholarships ({liveScholarships.length})
              </button>
              <button
                className={`tab ${activeTab === "upcoming" ? "active" : ""}`}
                onClick={() => setActiveTab("upcoming")}
              >
                Upcoming Scholarships ({upcomingScholarships.length})
              </button>
            </div>
          </div>

          {/* Scholarships Grid + Featured Sidebar */}
          <div className="content-layout">
            <div className="scholarship-grid">
              {loading ? (
                <p>Loading scholarships...</p>
              ) : displayedScholarships.length === 0 ? (
                <p>No scholarships found.</p>
              ) : (
                displayedScholarships.map((s, i) => {
                  const startDate = s.startDate ? new Date(s.startDate) : null;
                  const endDate = s.endDate ? new Date(s.endDate) : null;
                  const daysLeftText = getDaysLeftText(s.endDate);
                  const diffDays = endDate
                    ? Math.ceil((endDate - today) / (1000 * 60 * 60 * 24))
                    : null;
                  const isFeatured = featuredIds.includes(s.id || s.scholarshipId);

                  return (
                    <div
                      className="scholarship-card"
                      key={i}
                      onClick={() =>
                        navigate(`${RP.scholarshipViewPage}?id=${s.id || s.scholarshipId}`)
                      }                  >

                      {/* Featured Tag */}
                      {!activeTab.includes("upcoming") && isFeatured && (
                        <div className="featured-tag">Featured</div>
                      )}

                      {activeTab === "live" && daysLeftText && (
                        <div
                          className={`deadline-badge ${diffDays <= 1 ? "urgent" : "warning"
                            }`}
                        >
                          {daysLeftText}
                        </div>
                      )}

                      {/* Header */}
                      <div className="card-header-flex">
                        <div className="logo-wrapper">
                          <img
                            src={logoUrl}
                            alt={s.scholarshipName}
                            className="card-logo"
                          />
                        </div>
                      </div>

                      {/* Scholarship Info */}
                      <div className="card-body">
                        <h3 className="card-title">{s.scholarshipName}</h3>

                        <p>
                          <strong>🏆 Award:</strong> {s.scholarshipAmount || "N/A"}
                        </p>

                        <p>
                          <strong>🎓 Eligibility:</strong>{" "}
                          {s.renewalCriteria || "Not specified"}
                        </p>

                        {/* ✅ Show Start Date for Upcoming, OR Deadline if no "days to go" badge */}
                        {activeTab === "upcoming" ? (
                          <p className="start-line">
                            <strong>🚀 Start Date:</strong>{" "}
                            {startDate
                              ? startDate.toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })
                              : "N/A"}
                          </p>
                        ) : !daysLeftText ? ( // ✅ only show deadline if no "days to go" text
                          <p className="deadline-line">
                            <strong>📅 Deadline:</strong>{" "}
                            {endDate
                              ? endDate.toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })
                              : "N/A"}
                          </p>
                        ) : null}


                        {/* ✅ Fixed Footer */}
                        <div className="card-footer-updated">
                          Last Updated On{" "}
                          {s.modifiedDate
                            ? new Date(s.modifiedDate).toISOString().split("T")[0]
                            : "N/A"}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Featured Sidebar */}
            <aside className="featured-sidebar">
              <div className="featured-header">Featured Scholarships</div>
              {featuredScholarships.length === 0 ? (
                <p style={{ padding: "12px" }}>No featured scholarships found.</p>
              ) : (
                featuredScholarships.map((s, i) => (
                  <div className="featured-item" key={i}>
                    <img
                      src={logoUrl}
                      alt={s.scholarshipName}
                      className="featured-logo"
                    />
                    <div>
                      <p className="featured-title">{s.scholarshipName}</p>
                      {s.endDate ? (
                        <p className="featured-deadline">
                          Deadline Date:{" "}
                          {new Date(s.endDate).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      ) : (
                        <p className="featured-deadline">No Deadline</p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
