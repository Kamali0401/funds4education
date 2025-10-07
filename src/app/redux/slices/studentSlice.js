import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getStudentProfile, updateStudentProfile } from "../../../api/Student/student";
import Swal from "sweetalert2";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
};

// ✅ Fetch student profile
export const fetchStudentProfile = createAsyncThunk(
  "student/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const decoded = parseJwt(token);
      const userId = decoded?.UserId;
      if (!userId) throw new Error("Invalid token: missing UserId");

      const data = await getStudentProfile(userId);
      return data;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Unable to fetch profile data.";

      Swal.fire({
        icon: "error",
        title: "Profile Load Failed",
        text: message,
        confirmButtonColor: "#d33",
      });

      return rejectWithValue(message);
    }
  }
);

// ✅ Update student profile
export const updateStudent = createAsyncThunk(
  "student/update",
  async (studentData, { dispatch, rejectWithValue }) => {
    try {
      await updateStudentProfile(studentData);
      await dispatch(fetchStudentProfile()); // refresh after update

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully.",
        confirmButtonColor: "#3085d6",
      });

      return studentData;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to update profile.";

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: message,
        confirmButtonColor: "#d33",
      });

      return rejectWithValue(message);
    }
  }
);

// --- Slice ---
const studentSlice = createSlice({
  name: "student",
  initialState: {
    profile: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Fetch profile
      .addCase(fetchStudentProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudentProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(fetchStudentProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ✅ Update student profile
      .addCase(updateStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateStudent.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default studentSlice.reducer;
