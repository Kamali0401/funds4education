import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getStudentProfile, updateStudentProfile } from "../../../api/Student/student";
import Swal from "sweetalert2";

// ✅ Decode JWT for user ID
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

// ✅ Update student profile (flat payload)
export const updateStudent = createAsyncThunk(
  "student/update",
  async (studentData, { dispatch, rejectWithValue }) => {
    try {
      // 🩵 Ensure backend-friendly structure here
      const formatDateForBackend = (dateStr) => {
        if (!dateStr) return null;
        const date = new Date(dateStr);
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${month}/${day}/${year} 00:00:00`;
      };

      const formattedData = {
        ...studentData,
        dateofBirth: formatDateForBackend(studentData.dateofBirth),
        roleId: studentData.roleId?.toString() || "1", // ✅ ensure string
      };

      await updateStudentProfile(formattedData);
      await dispatch(fetchStudentProfile()); // refresh data

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully.",
        confirmButtonColor: "#3085d6",
      });

      return formattedData;
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

      // ✅ Update profile
      .addCase(updateStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Merge updated data into current profile
        state.profile = { ...state.profile, ...action.payload };
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default studentSlice.reducer;
