import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import {
  fetchScholarshipBySponsorReq,
  addScholarshipReq,
  updateScholarshipReq,
  deleteScholarshipReq,
} from "../../../api/Scholarship/SponsorScholarship";

const sponsorScholarshipSlice = createSlice({
  name: "sponsorScholarship",
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
    setError: (state) => {
      state.loading = false;
      state.error = true;
    },
    setData: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.data = Array.isArray(payload) ? payload : [];
    },
  },
});

export const { setLoading, setError, setData } =
  sponsorScholarshipSlice.actions;

export default sponsorScholarshipSlice.reducer;

//
// 📘 Fetch scholarships for sponsor
//
export const fetchScholarshipBySponsor = (userId, role) => async (dispatch) => {
  try {
    if (!userId || !role) {
      Swal.fire("Warning", "Missing user or role info.", "warning");
      return;
    }

    dispatch(setLoading());
    const { error, data, errorMsg } = await fetchScholarshipBySponsorReq(
      userId,
      role
    );

    if (error) {
      dispatch(setError());
      Swal.fire("Error", errorMsg, "error");
    } else {
      dispatch(setData(data));
    }
  } catch {
    dispatch(setError());
    Swal.fire("Error", "Failed to load sponsor scholarships.", "error");
  }
};

//
// 📘 Add new scholarship
//
export const addNewScholarship = (formData) => async (dispatch) => {
  try {
    dispatch(setLoading());

    const response = await addScholarshipReq(formData);

    if (response.error) {
      dispatch(setError());
      return Swal.fire("Error", response.errorMsg, "error");
    }

    Swal.fire("Success", "Scholarship added successfully!", "success");

    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("roleName");

    await dispatch(fetchScholarshipBySponsor(userId, role));
  } catch (err) {
    dispatch(setError());
    Swal.fire("Error", "Error adding scholarship.", "error");
  }
};

//
// ✅ Update scholarship
//
export const updateScholarship = (formData) => async (dispatch) => {
  try {
    dispatch(setLoading());

    const response = await updateScholarshipReq(formData);

    if (response.error) {
      dispatch(setError());
      return Swal.fire("Error", response.errorMsg, "error");
    }

    Swal.fire("Success", "Scholarship updated successfully!", "success");

    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("roleName");

    await dispatch(fetchScholarshipBySponsor(userId, role));
  } catch (err) {
    dispatch(setError());
    Swal.fire("Error", "Error updating scholarship.", "error");
  }
};

//
// ✅ Delete scholarship
//
export const deleteScholarship = (id, modifiedBy) => async (dispatch) => {
  try {
    dispatch(setLoading());

    const response = await deleteScholarshipReq(id, modifiedBy);

    if (response.error) {
      dispatch(setError());
      return Swal.fire("Error", response.errorMsg, "error");
    }

    Swal.fire("Success", "Scholarship deleted successfully!", "success");

    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("roleName");

    await dispatch(fetchScholarshipBySponsor(userId, role));
  } catch (err) {
    dispatch(setError());
    Swal.fire("Error", "Error deleting scholarship.", "error");
  }
};