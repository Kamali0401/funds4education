// src/app/redux/slices/ScholarshipSlice.js
import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import {
  fetchScholarshipListReq,
  fetchScholarshipByIdReq, // ✅ add this API function
} from "../../../api/Scholarship/Scholarship";

const scholarshipSlice = createSlice({
  name: "scholarship",
  initialState: {
    loading: false,
    error: false,
    data: [],
    selectedScholarship: null, // ✅ store for one scholarship
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = false;
    },
    addData: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.data = Array.isArray(payload) ? payload : payload?.data || [];
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
  setError,
  setSelectedScholarship,
  clearSelectedScholarship,
} = scholarshipSlice.actions;
export default scholarshipSlice.reducer;

// ✅ Redux Thunk — fetch all
export const fetchScholarshipList = (userId, role) => async (dispatch) => {
  try {
    if (!userId || !role) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "User ID or role is missing or invalid.",
      });
      return;
    }

    dispatch(setLoading());

    const res = await fetchScholarshipListReq(userId, role);
    if (!res.error) {
      dispatch(addData(res.data));
    } else {
      dispatch(setError());
      Swal.fire({
        icon: "error",
        title: "Error",
        text: res.errorMsg || "Failed to load scholarships.",
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
        "Something went wrong while fetching scholarships.",
    });
  }
};

// ✅ Redux Thunk — fetch single scholarship by ID
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
