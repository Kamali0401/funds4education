import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../app/components/header/header";
import {
  fetchScholarshipApplicationList,
  deleteScholarshipApplication,
} from "../../../app/redux/slices/scholarshipApplicationSlice";
import Swal from "sweetalert2";
import AddApplicationModal from "./addApplication"; // <-- your modal component

const ApplicationsPage = () => {
  const dispatch = useDispatch();

  // Redux state
  const { data: applications = [], loading = false } =
    useSelector((state) => state.scholarshipApplicationList || {});

  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    dispatch(fetchScholarshipApplicationList());
  }, [dispatch]);

  // Filtered applications based on status
  const filteredApps =
    filter === "All"
      ? applications
      : applications.filter(
          (app) => app.status.toLowerCase() === filter.toLowerCase()
        );

  // Filter further by search query
  const displayedApps = filteredApps.filter((app) =>
    app.firstName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Open modal in Add mode
  const handleAddApplication = () => {
    setSelectedApplication(null);
    setShowModal(true);
  };

  // Open modal in Edit mode
  const handleEdit = (app) => {
    setSelectedApplication(app);
    setShowModal(true);
  };

  // Delete application
  const handleDelete = (appId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This application will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteScholarshipApplication(appId, dispatch);
        Swal.fire("Deleted!", "Application has been deleted.", "success");
        dispatch(fetchScholarshipApplicationList());
      }
    });
  };

  // After modal submit
  const handleModalSubmit = () => {
    setShowModal(false);
    setSelectedApplication(null);
    dispatch(fetchScholarshipApplicationList());
  };

  return (
    <>
      <Header variant="application" />

    {/*  <main className="applications-dashboard">*/}
        <h1 className="applications-title">My Scholarship Applications</h1>
        <p className="applications-subtitle">
          Track your scholarship applications and <br /> filter by status.
        </p>

        {/* Actions */}
        <div className="applications-actions">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: "0.5rem", width: "200px", marginRight: "1rem" }}
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="applications-filter"
          >
            <option value="All">All</option>
            <option value="Submitted">Submitted</option>
            <option value="In Review">In Review</option>
            <option value="Rejected">Rejected</option>
            <option value="Approved">Approved</option>
            <option value="Draft">Draft</option>
          </select>

          <button className="applications-btn-new" onClick={handleAddApplication}>
            + New Application
          </button>
        </div>

        {/* Applications List */}
        <section className="applications-cards">
          {displayedApps.length > 0 ? (
            displayedApps.map((app) => (
              <div key={app.id} className="applications-card">
                <div className="application-info">
                  <h3>Scholarship ID: {app.scholarshipId}</h3>
                  <span>
                    {app.firstName} {app.lastName}
                  </span>
                  <p>
                    {new Date(app.applicationDate).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>

                {/* Draft: show Edit/Delete */}
                {app.status.toLowerCase() === "draft" ? (
                  <>
                    <span
                      className={`applications-status ${app.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {app.status}
                    </span>
                    <button
                      className="applications-btn-edit"
                      onClick={() => handleEdit(app)}
                    >
                       Edit
                    </button>
                    <button
                      className="applications-btn-delete"
                      onClick={() => handleDelete(app.id)}
                    >
                       Delete
                    </button>
                  </>
                ) : (
                  <span
                    className={`applications-status ${app.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {app.status}
                  </span>
                )}
              </div>
            ))
          ) : (
            <p className="applications-no-results">
              No applications found for <strong>{filter}</strong>.
            </p>
          )}
        </section>

        {/* Modal for Add/Edit */}
        <AddApplicationModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          onSubmit={handleModalSubmit}
          application={selectedApplication}
        />
    
    </>
  );
};

export default ApplicationsPage;
