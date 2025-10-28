// src/app/redux/slices/ScholarshipSlice.js
import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import {
  fetchScholarshipByStatusReq,   // ✅ existing API (live/upcoming)
  fetchScholarshipByIdReq,        // ✅ existing API (by ID)
  fetchFeaturedScholarshipsReq,   // ✅ NEW API for featured
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
  },
});

export const {
  setLoading,
  addData,
  addFeatured,
  setError,
  setSelectedScholarship,
  clearSelectedScholarship,
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
