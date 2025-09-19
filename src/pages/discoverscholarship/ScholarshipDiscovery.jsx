import React, { useState } from "react";
import "./ScholarshipDiscovery.css";
import Header from "../../app/components/header/header";

const scholarships = [
  { id: 1, title: "Merit Scholarship", amount: "$2,000", deadline: "May 31, 2024" },
  { id: 2, title: "Women in STEM Award", amount: "$5,000", deadline: "June 15, 2024" },
  { id: 3, title: "Community Service Scholarship", amount: "$1,500", deadline: "July 10, 2024" },
  { id: 4, title: "Future Leaders Scholarship", amount: "$3,000", deadline: "August 20, 2024" },
];

export default function ScholarshipDiscovery() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  const filtered = scholarships.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      
      <div className="scholarship-page">
  {/* Search Bar (moved above layout) */}
<div class="main-container mt-4">
  <div class="search-group">
    <div>
    <input type="text" placeholder="Search scholarships" class="search-input" />
    <input type="text" placeholder="Location" class="search-input" />
    <input type="text" placeholder="Category" class="search-input" />
    </div>
    <button class="search-btn">Search</button>
  </div>
</div>

  <div className="layout">
    {/* Sidebar */}
    <aside className="sidebar">
      <h2>Saved Scholarships</h2>
      <ul>
        <li>Merit Scholarship</li>
      </ul>

      <h2>Recommendations</h2>
      <ul>
        <li>Science and Technology Scholarship</li>
        <li>Academic Excellence Grant</li>
      </ul>
    </aside>

    {/* Main Content */}
    <main className="content">
      <h2 className="main-heading">Scholarships</h2>
      <div className="scholarship-list">
        {filtered.map((s) => (
          <div key={s.id} className="card wide-card">
            <div>
              <h3>{s.title}</h3>
              <p>{s.amount}</p>
              <p className="deadline">Deadline: {s.deadline}</p>
            </div>
<button className="apply-btn">Apply</button>
          </div>
        ))}
      </div>

      {/* Upcoming Deadlines */}
      <div className="deadlines">
        <h2>Upcoming Deadlines</h2>
        <ul>
          <li>Service to Society Scholarship — April 28, 2024</li>
          <li>Women in Science Scholarship — May 10, 2024</li>
        </ul>
      </div>
    </main>
  </div>
</div>
    </div>
  );
}
