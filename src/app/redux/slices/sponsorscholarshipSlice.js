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
    dispatch(setLoading()); // Set loading before API call

    const res = await fetchScholarshipBySponsorReq(userId, role); // Call API

    dispatch(setData(res.data)); // Dispatch the data
  } catch (error) {
    dispatch(setError()); // Dispatch error action
    Swal.fire({
      text: "Failed to load sponsor scholarships",
      icon: "error",
    });
  }
};
//
// 📘 Add new scholarship
//
export const addNewScholarship = async (formData, dispatch) => {
  try {
    dispatch(setLoading());

    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("roleName");

    // API call to add new scholarship
    const res = await addScholarshipReq(formData);

    // Refresh scholarship list after adding
    await dispatch(fetchScholarshipBySponsor(userId, role));

    // Optional success message
    Swal.fire({
      text: "Scholarship added successfully!",
      icon: "success",
    });

    return res.data; // Return response data
  } catch (error) {
    dispatch(setError());
    Swal.fire({
      text: "Error! Try Again!",
      icon: "error",
    });
    throw error; // Rethrow error if needed elsewhere
  }
};

// ✅ Update scholarship
//
export const updateScholarship = async (formData, dispatch) => {
  try {
    dispatch(setLoading()); // Set loading before making the API request

    await updateScholarshipReq(formData); // Call API to update scholarship

    // Fetch updated scholarship list after updating
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("roleName");
    await dispatch(fetchScholarshipBySponsor(userId, role));

    /*Swal.fire({
      text: "Scholarship updated successfully!",
      icon: "success",
    });*/
  } catch (error) {
    dispatch(setError()); // Handle error if API fails
    Swal.fire({
      text: "Error! Try Again!",
      icon: "error",
    });
    throw error; // Re-throw error if needed elsewhere
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