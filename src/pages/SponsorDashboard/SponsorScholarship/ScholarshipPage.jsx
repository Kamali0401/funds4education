import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaGraduationCap, FaMoneyBillWave, FaCalendarAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import Header from "../../../app/components/header/header";
import {
  fetchScholarshipList,
} from "../../../app/redux/slices/ScholarshipSlice"; // ✅ FIXED import
import AddScholarshipModal from "./AddScholarshipPage";
import "../../styles.css";

const ScholarshipPage = () => {
  const dispatch = useDispatch();

  // ✅ FIX: Use correct slice name
  const { data: scholarships = [], loading = false } =
    useSelector((state) => state.scholarship || {});

  const role = localStorage.getItem("roleName");
  const UserId = localStorage.getItem("userId");
  const UserName = localStorage.getItem("username");

  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState(null);

  useEffect(() => {
    if (UserId && role) {
      dispatch(fetchScholarshipList(UserId, role)); // ✅ FIXED role as string
    }
  }, [dispatch, UserId, role]);

  const filteredScholarships =
    filter === "All"
      ? scholarships
      : scholarships.filter((s) => s.status?.toLowerCase() === filter.toLowerCase());

  const displayedScholarships = filteredScholarships.filter((s) =>
    s.scholarshipName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddScholarship = () => {
    setSelectedScholarship(null);
    setShowModal(true);
  };

  const handleEdit = (scholarship) => {
    setSelectedScholarship(scholarship);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This scholarship will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Assuming you’ll add delete logic later
        Swal.fire("Deleted!", "Scholarship has been deleted.", "success");
        dispatch(fetchScholarshipList(UserId, role));
      }
    });
  };

  const handleModalSubmit = () => {
    setShowModal(false);
    setSelectedScholarship(null);
    dispatch(fetchScholarshipList(UserId, role));
  };

  console.log("Scholarships:", scholarships); // ✅ check data here

  return (
    <>
      <Header variant="scholarship" />

      <div className="scholarship-page">
        <h2 className="page-title">My Sponsored Scholarships</h2>
        <p className="page-subtitle">
          Manage your scholarships and filter them by status or title.
        </p>

        {/* Search + Filter */}
        <div className="scholarship-actions">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: "0.5rem", width: "200px" }}
          />

          <div className="scholarship-actions-right">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="applications-filter"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Closed">Closed</option>
            </select>

            <button className="applications-btn-new" onClick={handleAddScholarship}>
              + New Scholarship
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="scholarship-table">
          <div className="table-header">
            <span>Title</span>
            <span>Amount</span>
            <span>Scholarship Limit</span>
            <span>Status</span>
            <span>Deadline</span>
            <span>Actions</span>
          </div>

          {loading ? (
            <p className="loading-text">Loading scholarships...</p>
          ) : displayedScholarships.length > 0 ? (
            displayedScholarships.map((scholarship) => (
              <div key={scholarship.id} className="table-row">
                <span className="title">
                  <FaGraduationCap className="icon" /> {scholarship.scholarshipName}
                </span>
                <span>
                  <FaMoneyBillWave className="icon" /> ${scholarship.benefits}
                </span>
                <span>
                  <FaUsers className="icon" /> {scholarship.scholarshipLimit}
                </span>
                <span>
                  <span className={`status ${scholarship.status?.toLowerCase()}`}>
                    {scholarship.status}
                  </span>
                </span>
                <span>
                  <FaCalendarAlt className="icon" />{" "}
                  {scholarship.endDate?.split("T")[0]}
                </span>
                <span className="actions">
                  <button className="btn-view">View Applicants</button>
                  <button className="btn-edit" onClick={() => handleEdit(scholarship)}>
                    Edit
                  </button>
                  <button className="btn-danger" onClick={() => handleDelete(scholarship.id)}>
                    Delete
                  </button>
                </span>
              </div>
            ))
          ) : (
            <p className="applications-no-results">
              No scholarships found for <strong>{filter}</strong>.
            </p>
          )}
        </div>

        {/* Modal */}
        <AddScholarshipModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          onSubmit={handleModalSubmit}
          scholarship={selectedScholarship}
        />
      </div>
    </>
  );
};

export default ScholarshipPage;
