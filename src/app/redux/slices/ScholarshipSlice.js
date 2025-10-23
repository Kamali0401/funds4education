import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { fetchScholarshipListReq } from "../../../api/Scholarship/Scholarship";
// 👆 Make sure this API function exists, similar to fetchSponsorListReq()

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
      state.data = payload;
    },
    setError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { setLoading, addData, setError } = scholarshipSlice.actions;
export default scholarshipSlice.reducer;

// ✅ Redux thunk
export const fetchScholarshipList = (userId, role) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await fetchScholarshipListReq(userId, role);
    dispatch(addData(res.data));
  } catch (error) {
    dispatch(setError());
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to load scholarships",
    });
  }
};