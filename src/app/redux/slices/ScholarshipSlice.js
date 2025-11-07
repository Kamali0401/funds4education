import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import {
  fetchScholarshipByStatusReq,   // ✅ existing API (live/upcoming)
  fetchScholarshipByIdReq,        // ✅ existing API (by ID)
  fetchFeaturedScholarshipsReq, 
  fetchApplicationsBySponsorReq,
  updateApplicationStatusReq   // ✅ NEW API for featured
} from "../../../api/Scholarship/Scholarship";

const scholarshipSlice = createSlice({
  name: "scholarship",
  initialState: {
    loading: false,
    error: false,
    data: {
      live: [],
      upcoming: [],
      featured: [], // ✅ new field
      applications: [], // ✅ add this field

    },
    selectedScholarship: null,
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = false;
    },
    addData: (state, { payload }) => {
      state.loading = false;
      state.error = false;

      // ✅ Merge live/upcoming with existing featured
      state.data = {
        live: payload.live || [],
        upcoming: payload.upcoming || [],
        featured: state.data.featured || [],
      };
    },
    addFeatured: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.data.featured = Array.isArray(payload) ? payload : [];
    },
    setError: (state) => {
      state.loading = false;
      state.error = true;
    },
    setSelectedScholarship: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.selectedScholarship = payload;
    },
    clearSelectedScholarship: (state) => {
      state.selectedScholarship = null;
    },
        setApplications: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.data.applications = Array.isArray(payload) ? payload : [];
    },
     updateApplicationStatusInState: (state, { payload }) => {
      const { applicationId, status, modifiedBy } = payload;

      const index = state.data.applications.findIndex(
        (app) => app.applicationId === applicationId
      );

      if (index !== -1) {
        state.data.applications[index] = {
          ...state.data.applications[index],
          status,
          modifiedBy,
        };
      }
    },
  },
});
export const {
  setLoading,
  addData,
  addFeatured,
  setError,
  setSelectedScholarship,
  clearSelectedScholarship,
  setApplications, // ✅ new export
  updateApplicationStatusInState,

} = scholarshipSlice.actions;

export default scholarshipSlice.reducer;

//
// ✅ Fetch both “live” and “upcoming” scholarships
//
export const fetchScholarshipList = () => async (dispatch) => {
  try {
    dispatch(setLoading());

    const [liveRes, upcomingRes] = await Promise.all([
      fetchScholarshipByStatusReq("live"),
      fetchScholarshipByStatusReq("upcoming"),
    ]);

    const liveList =
      liveRes.errorMsg?.includes("No scholarships found") ? [] : liveRes.data;
    const upcomingList =
      upcomingRes.errorMsg?.includes("No scholarships found")
        ? []
        : upcomingRes.data;

    dispatch(addData({ live: liveList, upcoming: upcomingList }));
  } catch (error) {
    dispatch(setError());
    Swal.fire({
      icon: "error",
      title: "Error",
      text:
        error?.errorMsg ||
        error?.message ||
        "Something went wrong while fetching scholarships.",
    });
  }
};

//
// ✅ Fetch featured scholarships (green tag + right sidebar)
//
export const fetchFeaturedScholarships = () => async (dispatch) => {
  try {
    dispatch(setLoading());

    const res = await fetchFeaturedScholarshipsReq();

    if (!res.error && Array.isArray(res.data)) {
      dispatch(addFeatured(res.data));
    } else {
      dispatch(setError());
      Swal.fire({
        icon: "info",
        title: "No Featured Scholarships",
        text: res.errorMsg || "No featured scholarships found.",
        timer: 1800,
      });
    }
  } catch (error) {
    dispatch(setError());
    Swal.fire({
      icon: "error",
      title: "Error",
      text:
        error?.errorMsg ||
        error?.message ||
        "Something went wrong while fetching featured scholarships.",
    });
  }
};

//
// ✅ Fetch single scholarship by ID
//
export const fetchScholarshipById = (id) => async (dispatch) => {
  try {
    if (!id) {
      Swal.fire({
        icon: "warning",
        title: "Missing ID",
        text: "Scholarship ID is required to fetch details.",
      });
      return;
    }

    dispatch(setLoading());
    const res = await fetchScholarshipByIdReq(id);

    if (!res.error) {
      dispatch(setSelectedScholarship(res.data));
    } else {
      dispatch(setError());
      Swal.fire({
        icon: "error",
        title: "Error",
        text: res.errorMsg || "Failed to load scholarship details.",
      });
    }
  } catch (error) {
    dispatch(setError());
    Swal.fire({
      icon: "error",
      title: "Error",
      text:
        error?.errorMsg ||
        error?.message ||
        "Something went wrong while fetching scholarship details.",
    });
  }
};
//
// ✅ Fetch applications by sponsor
//
export const fetchApplicationsBySponsor =
  (sponsorId, status = "") =>
  async (dispatch) => {
    try {
      if (!sponsorId) {
        Swal.fire({
          icon: "warning",
          title: "Missing Sponsor ID",
          text: "Sponsor ID is required to fetch applications.",
        });
        return;
      }

      dispatch(setLoading());

      const res = await fetchApplicationsBySponsorReq(sponsorId, status);

      if (!res.error) {
        dispatch(setApplications(res.data));
      } else {
        dispatch(setError());
        Swal.fire({
          icon: "error",
          title: "Error",
          text: res.errorMsg || "Failed to load applications.",
        });
      }
    } catch (error) {
      dispatch(setError());
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.errorMsg ||
          error?.message ||
          "Something went wrong while fetching applications.",
      });
    }
  };
export const updateApplicationStatus =
  (applicationId, status, modifiedBy) =>
  async (dispatch) => {
    try {
      dispatch(setLoading());
      const res = await updateApplicationStatusReq(
        applicationId,
        status,
        modifiedBy
      );

      if (!res.error) {
        dispatch(
          updateApplicationStatusInState({
            applicationId,
            status,
            modifiedBy,
          })
        );
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Status updated successfully",
          timer: 1500,
        });
      } else {
        dispatch(setError());
        Swal.fire({
          icon: "error",
          title: "Error",
          text: res.errorMsg,
        });
      }
    } catch (err) {
      dispatch(setError());
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err?.message || "Failed to update application status",
      });
    }
  };