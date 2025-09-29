import { useState, useMemo } from "react";
import "../styles.css";

export default function SponsorApplications() {
  const [applications, setApplications] = useState([
    {
      id: 1,
      name: "John Doe",
      course: "B.Sc CS",
      university: "Harvard",
      gpa: 3.9,
      status: "pending",
      messages: [
        { sender: "Student", text: "Hello sponsor, I am applying for this scholarship.", time: "2025-09-20 10:15" },
        { sender: "Student", text: "Please let me know if you need more details.", time: "2025-09-21 14:30" },
      ],
    },
    {
      id: 2,
      name: "Alice Johnson",
      course: "MBA",
      university: "Stanford",
      gpa: 3.7,
      status: "approved",
      messages: [
        { sender: "Student", text: "Thank you for reviewing my application.", time: "2025-09-22 09:45" },
      ],
    },
  ]);

  const [filter, setFilter] = useState("All");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const normalize = (s) => (s || "").toLowerCase();

  const updateStatus = (id, newStatus) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: newStatus.toLowerCase() } : app
      )
    );
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedStudent) return;

    setApplications((prev) =>
      prev.map((app) =>
        app.id === selectedStudent.id
          ? {
              ...app,
              messages: [
                ...app.messages,
                { sender: "Sponsor", text: newMessage, time: new Date().toLocaleString() },
              ],
            }
          : app
      )
    );

    setNewMessage("");
  };

  const filteredApplications = useMemo(() => {
    if (filter === "All") return applications;
    return applications.filter((app) => normalize(app.status) === normalize(filter));
  }, [applications, filter]);

  const displayStatus = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div className="page">
      <div className="container">
        <h2 className="page-title">Student Applications</h2>

        {/* Filter */}
        <div className="filter">
          <label>Filter by status:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option>All</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Funded</option>
            <option>Rejected</option>
          </select>
        </div>

        {/* Applications Lists */}
        <div className="application-list">
          {filteredApplications.map((app) => (
            <div key={app.id} className="application-card">
              <div className="application-info">
                <h3 className="student-name">{app.name}</h3>
                <p>{app.course} • {app.university}</p>
                <p>GPA: {app.gpa}</p>
                <span className={`status ${normalize(app.status)}`}>
                  {displayStatus(app.status)}
                </span>
              </div>

              <div className="application-actions">
                {normalize(app.status) === "pending" && (
                  <>
                    <button className="btn btn-approve" onClick={() => updateStatus(app.id, "approved")}>Approve</button>
                    <button className="btn btn-reject" onClick={() => updateStatus(app.id, "rejected")}>Reject</button>
                  </>
                )}
                {normalize(app.status) === "approved" && (
                  <button className="btn btn-fund" onClick={() => updateStatus(app.id, "funded")}>Fund Student</button>
                )}

                <button className="btn btn-message" onClick={() => setSelectedStudent(app)}>
                  Messages ({app.messages.length})
                </button>
              </div>
            </div>
          ))}

          {filteredApplications.length === 0 && (
            <p className="empty">No applications found.</p>
          )}
        </div>
      </div>

      {/* Modal for Messages */}
      {selectedStudent && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Messages with {selectedStudent.name}</h2>

            <div className="messages-box">
              {selectedStudent.messages.length === 0 ? (
                <p className="empty">No messages yet.</p>
              ) : (
                selectedStudent.messages.map((m, i) => (
                  <div key={i} className={`message-item ${m.sender.toLowerCase()}`}>
                    <strong>{m.sender}:</strong> {m.text}
                    <div className="message-time">{m.time}</div>
                  </div>
                ))
              )}
            </div>

            {/* Send message box */}
            <div className="send-box">
              <textarea
                rows="3"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
              />
              <button className="btn btn-approve" onClick={sendMessage}>
                Send
              </button>
            </div>

            <div className="modal-actions">
              <button className="btn btn-reject" onClick={() => setSelectedStudent(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}