// src/app/redux/slices/ScholarshipSlice.js
import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { fetchScholarshipListReq } from "../../../api/Scholarship/Scholarship";

const scholarshipSlice = createSlice({
  name: "scholarship",
  initialState: {
    loading: false,
    error: false,
    data: [],
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
  },
});

export const { setLoading, addData, setError } = scholarshipSlice.actions;
export default scholarshipSlice.reducer;

// ✅ Redux Thunk
export const fetchScholarshipList = (userId, roleId) => async (dispatch) => {
  try {
    const role = roleId === 1 ? "student" : roleId === 2 ? "sponsor" : null;

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
