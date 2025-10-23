import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { publicAxios } from "../../../api/config";
import { ApiKey } from "../../../api/endpoint";

const scholarshipSlice = createSlice({
  name: "scholarshipList",
  initialState: {
    loading: false,
    error: false,
    data: [],
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    addData: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.data = payload;
    },
    setError: (state) => {
      state.error = true;
      state.loading = false;
    },
  },
});

export const { setLoading, addData, setError } = scholarshipSlice.actions;

// ✅ Export only the reducer
export default scholarshipSlice.reducer;

// ---------------------------------------------------------
// 📘 Fetch Scholarship List
// ---------------------------------------------------------
/*export const fetchScholarshipList = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await publicAxios.get(ApiKey.SponsorScholarship/role?"");
    dispatch(addData(res.data));
  } catch (error) {
    dispatch(setError());
    Swal.fire({
      text: "Failed to load scholarships",
      icon: "error",
    });
  }
};
*/
export const fetchScholarshipList = (UserId,role) => async (dispatch) => {
  try {
    dispatch(setLoading());

    // Build the URL with the role parameter
    const url = `${ApiKey.SponsorScholarship}?id=${UserId}&role=${role}`;

    const res = await publicAxios.get(url);
    dispatch(addData(res.data));
  } catch (error) {
    dispatch(setError());
    Swal.fire({
      text: "Failed to load scholarships",
      icon: "error",
    });
  }
};

// ---------------------------------------------------------
// 📘 Add New Scholarship
// ---------------------------------------------------------
export const addNewScholarship = async (data, dispatch) => {
  try {
    const userId=localStorage.getItem("userId");
     const role=localStorage.getItem("roleName");
    dispatch(setLoading());
    const res = await publicAxios.post(ApiKey.SponsorScholarship, data);

    await dispatch(fetchScholarshipList(userId,role));

    /*Swal.fire({
      text: "Scholarship added successfully!",
      icon: "success",
    });*/

    return res.data;
  } catch (error) {
    dispatch(setError());
    Swal.fire({
      text: "Error adding scholarship! Try again.",
      icon: "error",
    });
    throw error;
  }
};

// ---------------------------------------------------------
// 📘 Update Scholarship
// ---------------------------------------------------------
export const updateScholarship = async (data, dispatch) => {
  try {
    const userId=localStorage.getItem("userId");
     const role=localStorage.getItem("roleName");
    dispatch(setLoading());
    await publicAxios.put(ApiKey.SponsorScholarship, data);

    await dispatch(fetchScholarshipList(userId,role));

    /*Swal.fire({
      text: "Scholarship updated successfully!",
      icon: "success",
    });*/
  } catch (error) {
    dispatch(setError());
    Swal.fire({
      text: "Error updating scholarship! Try again.",
      icon: "error",
    });
    throw error;
  }
};

// ---------------------------------------------------------
// 📘 Delete Scholarship (optional if API supports it)
// ---------------------------------------------------------
export const deleteScholarship = async (id, UserName ,dispatch) => {
  try {
    const userId=localStorage.getItem("userId");
     const role=localStorage.getItem("roleName");
    dispatch(setLoading());
    await publicAxios.delete(`${ApiKey.SponsorScholarship}/${id}?modifiedBy=${UserName}`);

    await dispatch(fetchScholarshipList(userId,role));

    Swal.fire({
      text: "Scholarship deleted successfully!",
      icon: "success",
    });
  } catch (error) {
    dispatch(setError());
    Swal.fire({
      text: "Error deleting scholarship! Try again.",
      icon: "error",
    });
    throw error;
  }
};
