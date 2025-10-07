import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getStudentProfile, updateStudentProfile } from "../../../api/Student/student";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
};

// --- Thunks ---

// ✅ Fetch logged-in student's profile using token
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
      return rejectWithValue(err.message || "Failed to fetch student profile");
    }
  }
);

// ✅ Update student profile
export const updateStudent = createAsyncThunk(
  "student/update",
  async (studentData, { rejectWithValue }) => {
    try {
      const data = await updateStudentProfile(studentData);
      return data;
    } catch (err) {
      return rejectWithValue(err);
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
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.profile = { ...state.profile, ...action.payload };
      });
  },
});

export default studentSlice.reducer;