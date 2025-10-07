// src/app/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginReq } from "../../../api/Users/login";

// ✅ Async thunk for login (includes userType)
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password, userType }, { rejectWithValue }) => {
    try {
      let response;

      // ✅ Choose API based on userType (student/sponsor)
      if (userType === "student") {
        response = await loginReq({ username, password });
      } else if (userType === "sponsor") {
        response = await loginReq({ username, password });
      } else {
        throw new Error("Unsupported user type");
      }

      // ✅ Return response with userType
      return { ...response.data, userType };
    } catch (error) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

// ✅ Initial state
const initialState = {
  user: null,
  role: null,
  id: null,
  token: null,
  userType: null,
  loading: false,
  error: null,
};

// ✅ Slice creation
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.id = null;
      state.token = null;
      state.userType = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fulfilled (Success)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        const { username, roleId, id, token, userType } = action.payload;

        // ✅ Save details to state
        state.user = username;
        state.role = roleId;
        state.id = id;
        state.token = token || null;
        state.userType = userType;

        // ✅ Store locally
        localStorage.setItem("user", username);
        localStorage.setItem("roleId", roleId);
        localStorage.setItem("id", id);
        localStorage.setItem("userType", userType);
        if (token) localStorage.setItem("token", token);
      })
      // Rejected (Failed)
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Invalid credentials";
      });
  },
});

// ✅ Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
