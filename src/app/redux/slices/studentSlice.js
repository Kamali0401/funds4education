import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getStudentProfile,
  updateStudentProfile,
} from "../../../api/Student/student";

// ✅ Fetch Student
export const fetchStudentProfile = createAsyncThunk(
  "student/fetchProfile",
  async (id, { rejectWithValue }) => {
    try {
      const data = await getStudentProfile(id);
      return data;
    } catch (err) {
      const message =
        typeof err === "object"
          ? err.title || err.detail || "Failed to load profile"
          : err;
      return rejectWithValue(message);
    }
  }
);

// ✅ Update Student
export const saveStudentProfile = createAsyncThunk(
  "student/saveProfile",
  async (data, { rejectWithValue }) => {
    try {
      const res = await updateStudentProfile(data);
      return res;
    } catch (err) {
      const message =
        typeof err === "object"
          ? err.title || err.detail || "Failed to update profile"
          : err;
      return rejectWithValue(message);
    }
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState: {
    profile: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchStudentProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(saveStudentProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveStudentProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.profile = action.payload;
      })
      .addCase(saveStudentProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default studentSlice.reducer;
