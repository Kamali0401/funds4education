// src/app/redux/slices/ScholarshipSlice.js
import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import {
  fetchScholarshipListReq,
  fetchScholarshipByStatusReq,
  fetchScholarshipByIdReq,
  fetchFeaturedScholarshipsReq,
} from "../../../api/Scholarship/Scholarship";

const scholarshipSlice = createSlice({
  name: "scholarship",
  initialState: {
    loading: false,
    error: false,
    data: {
      live: [],
      upcoming: [],
      featured: [],
      sponsor: [],
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
      state.data = {
        ...state.data,
        live: Array.isArray(payload.live) ? payload.live : state.data.live,
        upcoming: Array.isArray(payload.upcoming)
          ? payload.upcoming
          : state.data.upcoming,
      };
    },
    addFeatured: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.data.featured = Array.isArray(payload) ? payload : [];
    },
    addSponsorScholarship: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.data.sponsor = Array.isArray(payload) ? payload : [];
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
  addSponsorScholarship,
  setError,
  setSelectedScholarship,
  clearSelectedScholarship,
} = scholarshipSlice.actions;

export default scholarshipSlice.reducer;

//
// ✅ 1️⃣ Fetch both “live” and “upcoming” scholarships
//
export const fetchScholarshipList = () => async (dispatch) => {
  try {
    dispatch(setLoading());

    const [liveRes, upcomingRes] = await Promise.all([
      fetchScholarshipByStatusReq("live"),
      fetchScholarshipByStatusReq("upcoming"),
    ]);

    const liveList = Array.isArray(liveRes?.data) ? liveRes.data : [];
    const upcomingList = Array.isArray(upcomingRes?.data)
      ? upcomingRes.data
      : [];

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
// ✅ 2️⃣ Fetch featured scholarships
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
// ✅ 3️⃣ Fetch single scholarship by ID
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

    if (!res.error && res.data) {
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

