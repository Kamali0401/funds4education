import { FiBell, FiUpload, FiDownload } from "react-icons/fi";
import "./SponsorCard.css";
import logo from "../../app/assests/Logo.png"
import Header from "../../app/components/header/header";
export default function SponsorDashboard() {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="profile">
          <div className="avatar">👤</div>
          <div>
            <p className="profile-name">Mike Sharma</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button className="active">Dashboard</button>
          <button>Sponsored Students</button>
          <button>Applications</button>
          <button>Reports</button>
          <button>Settings</button>
        </nav>
      </aside>
      <div className="main-section">
       
        {/*<header className="header">
          <div className="header-left">
            <img src={logo} alt="logo" className="logo" />
            <span className="brand">VidyāSetu</span>
            
          </div>

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
        </header>*/}
        <main className="dashboard-main">
          <h2 className="section-title">Scholarships</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <p>Sponsored Students</p>
              <p className="stat-value">5</p>
            </div>
            <div className="stat-card">
              <p>Regions Supported</p>
              <p className="stat-value">$50,000</p>
            </div>
          </div>
          <h3 className="sub-title">Student Profiles</h3>
          <div className="students-list">
            {[
              {
                name: "Ananya S.",
                field: "Engineering",
                deadline: "May 1, 2024",
                background: "Women in STEM",
              },
              {
                name: "Community Service Scholarship",
                field: "$1,500",
                deadline: "July 10, 2024",
                background: "Community Service",
              },
              {
                name: "Future Leaders Scholarship",
                field: "$3,000",
                deadline: "Aug 20, 2024",
                background: "Leadership",
              },
            ].map((student, i) => (
              <div key={i} className="student-card">
                <div className="student-info">
                  <div className="avatar">👤</div>
                  <div>
                    <h4>{student.name}</h4>
                    <p>{student.field}</p>
                    <p className="muted">Deadline: {student.deadline}</p>
                    <p className="muted">Background: {student.background}</p>
                  </div>
                </div>
                <button className="msg-btn">Message</button>
              </div>
            ))}
          </div>
          <h3 className="sub-title">Applications</h3>
          <div className="applications">
            <div className="app-header">
              <p>
                <strong>Vijay T.</strong> - Arts
              </p>
              <span className="status">In Review</span>
            </div>

            <div className="progress-bar">
              <div className="progress" style={{ width: "60%" }}></div>
            </div>

            <p className="muted">Funds Disbursed</p>
            <p className="muted">Customize Branding</p>

            <button className="download-btn">Download Reports</button>
          </div>
        </main>
      </div>
    </div>
  );
}
