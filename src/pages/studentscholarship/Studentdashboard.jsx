import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../app/components/header/header";
import { logout } from "../../app/redux/slices/authSlice";
import {
  fetchScholarshipList,
  fetchFeaturedScholarships,
} from "../../app/redux/slices/ScholarshipSlice";
import Swal from "sweetalert2";
import "../../pages/studentscholarship/studentdashboard.css";
import logoUrl from "../../app/assests/kotak.png";
import { routePath as RP } from "../../app/components/router/routepath";

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data = {}, loading = false } = useSelector(
    (state) => state.scholarship || {}
  );
  const { live = [], upcoming = [], featured = [] } = data;

  const roleId =
    useSelector((state) => state.auth.roleId) ||
    Number(localStorage.getItem("roleId"));
  const userId =
    useSelector((state) => state.auth.userId) ||
    Number(localStorage.getItem("userId"));
  const name =
    useSelector((state) => state.auth.name) || localStorage.getItem("name");

  const [activeTab, setActiveTab] = useState("live");
  const [filters, setFilters] = useState({
    class: "All",
    country: "All",
    gender: "All",
    religion: "All",
    state: "All",
    course: "All",
  });

  const isLoggedIn = Boolean(userId && roleId);
  const sanitizeValue = (v) =>
    v && v !== "null" && v !== "undefined" ? v : null;

  const allScholarships = useMemo(() => {
    const merged = [...(live || []), ...(upcoming || []), ...(featured || [])];
    return merged.map((s) => ({
      ...s,
      eligibility: sanitizeValue(s.eligibility),
      documents: sanitizeValue(s.documents),
      webportaltoApply: sanitizeValue(s.webportaltoApply),
      canApply: sanitizeValue(s.canApply),
      contactDetails: sanitizeValue(s.contactDetails),
    }));
  }, [live, upcoming, featured]);

  useEffect(() => {
    dispatch(fetchScholarshipList());
    dispatch(fetchFeaturedScholarships());
  }, [dispatch]);

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

  const today = useMemo(() => new Date(), []);

  const getDaysLeftText = (endDate) => {
    if (!endDate) return null;
    const end = new Date(endDate);
    const diffDays = Math.ceil((end - today) / 86400000);
    if (diffDays <= 0) return null;
    if (diffDays === 1) return "Last day to go";
    if (diffDays <= 15) return `${diffDays} days to go`;
    return null;
  };

  const liveScholarships = useMemo(() => live || [], [live]);
  const upcomingScholarships = useMemo(() => upcoming || [], [upcoming]);
  const featuredScholarships = useMemo(() => featured || [], [featured]);

  const featuredIds = useMemo(
    () => featuredScholarships.map((s) => s.id || s.scholarshipId),
    [featuredScholarships]
  );

  const displayedScholarships = useMemo(() => {
    const baseList =
      activeTab === "upcoming" ? upcomingScholarships : liveScholarships;

    return baseList.filter((s) => {
      const classMatch =
        filters.class === "All" ||
        (s.className &&
          s.className.toLowerCase().includes(filters.class.toLowerCase()));
      const countryMatch =
        filters.country === "All" ||
        (s.country &&
          s.country.toLowerCase().includes(filters.country.toLowerCase()));
      const genderMatch =
        filters.gender === "All" ||
        (s.gender &&
          s.gender.toLowerCase().includes(filters.gender.toLowerCase()));
      const religionMatch =
        filters.religion === "All" ||
        (s.religion &&
          s.religion.toLowerCase().includes(filters.religion.toLowerCase()));
      const stateMatch =
        filters.state === "All" ||
        (s.state &&
          s.state.toLowerCase().includes(filters.state.toLowerCase()));
      const courseMatch =
        filters.course === "All" ||
        (s.course &&
          s.course.toLowerCase().includes(filters.course.toLowerCase()));

      return (
        classMatch &&
        countryMatch &&
        genderMatch &&
        religionMatch &&
        stateMatch &&
        courseMatch
      );
    });
  }, [filters, liveScholarships, upcomingScholarships, activeTab]);

  const trimText = (text, maxLength = 100) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const clearAllFilters = () => {
    setFilters({
      class: "All",
      country: "All",
      gender: "All",
      religion: "All",
      state: "All",
      course: "All",
    });
  };

  return (
    <div>
      <Header variant="student-profile" />

      {isLoggedIn && (
        <div className="student-navbar">
          <div className="user-info">
            <h2>{name ?? "Student"}</h2>
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
        </div>
      )}

      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <div>
            <div className="filter-title">Filters</div>

            <div className="filter-group">
              {[
                {
                  key: "class",
                  label: "Class",
                  options: [
                    "10th",
                    "11th",
                    "12th",
                    "Undergraduate",
                    "Postgraduate",
                    "PhD",
                  ],
                },
                {
                  key: "country",
                  label: "Country",
                  options: ["India", "USA", "UK", "Canada", "Australia", "Germany"],
                },
                {
                  key: "gender",
                  label: "Gender",
                  options: ["Male", "Female", "Other"],
                },
                {
                  key: "religion",
                  label: "Religion",
                  options: [
                    "Hindu",
                    "Muslim",
                    "Christian",
                    "Sikh",
                    "Buddhist",
                    "Jain",
                    "Other",
                  ],
                },
                {
                  key: "state",
                  label: "State",
                  options: [
                    "Maharashtra",
                    "Karnataka",
                    "Tamil Nadu",
                    "Delhi",
                    "Uttar Pradesh",
                    "Gujarat",
                    "West Bengal",
                  ],
                },
                {
                  key: "course",
                  label: "Course",
                  options: [
                    "Engineering",
                    "Medical",
                    "Science",
                    "Arts",
                    "Commerce",
                    "Law",
                    "Management",
                  ],
                },
              ].map(({ key, label, options }) => (
                <div key={key}>
                  <label>Select {label}</label>
                  <select
                    value={filters[key]}
                    onChange={(e) =>
                      setFilters({ ...filters, [key]: e.target.value })
                    }
                  >
                    <option>All</option>
                    {options.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <button className="clear-filters-btn" onClick={clearAllFilters}>
              Clear All Filters
            </button>

            {isLoggedIn && (
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
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

          <div className="content-layout">
            {/* Scholarships Grid */}
            <div className="scholarship-grid">
              {loading ? (
                <p>Loading scholarships...</p>
              ) : displayedScholarships.length === 0 ? (
                <p>
                  {activeTab === "live"
                    ? "No live scholarships are currently available."
                    : "No upcoming scholarships available yet."}
                </p>
              ) : (
                displayedScholarships.map((s, i) => {
                  const endDate = s.endDate ? new Date(s.endDate) : null;
                  const daysLeftText = getDaysLeftText(s.endDate);
                  const diffDays = endDate
                    ? Math.ceil((endDate - today) / 86400000)
                    : null;
                  const isFeatured = featuredIds.includes(
                    s.id || s.scholarshipId
                  );

                  return (
                    <div
                      className="scholarship-card"
                      key={i}
                      onClick={() =>
                        navigate(
                          `${RP.scholarshipViewPage}?id=${
                            s.id || s.scholarshipId
                          }`
                        )
                      }
                    >
                      {!activeTab.includes("upcoming") && isFeatured && (
                        <div className="featured-tag">Featured</div>
                      )}
                      {activeTab === "live" && daysLeftText && (
                        <div
                          className={`deadline-badge ${
                            diffDays <= 1 ? "urgent" : "warning"
                          }`}
                        >
                          {daysLeftText}
                        </div>
                      )}

                      <div className="card-header-flex">
                        <div className="logo-wrapper">
                          <img
                            src={logoUrl}
                            alt={s.name ?? "Scholarship Logo"}
                            className="card-logo"
                          />
                        </div>
                      </div>

                      <div className="card-body">
                        <h3 className="card-title">
                          {s.name ?? "Untitled Scholarship"}
                        </h3>
                        <p>
                          <strong>🏆 Award:</strong>{" "}
                          {s.amount ?? "Not specified"}
                        </p>
                        <p>
                          <strong>🎓 Eligibility:</strong>{" "}
                          {s.eligibility ?? "Not specified"}
                        </p>

                        {!daysLeftText && (
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
                        )}

                        <div className="card-footer-updated">
                          Last Updated On{" "}
                          {s.lastUpdatedDate
                            ? new Date(s.lastUpdatedDate)
                                .toISOString()
                                .split("T")[0]
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
                      alt={s.scholarshipName ?? "Scholarship Logo"}
                      className="featured-logo"
                    />
                    <div>
                      <p className="featured-title">
                        {s.scholarshipName ?? "Unnamed Scholarship"}
                      </p>
                      {s.deadline ? (
                        <p className="featured-deadline">
                          Deadline Date:{" "}
                          {new Date(s.deadline).toLocaleDateString("en-GB", {
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
