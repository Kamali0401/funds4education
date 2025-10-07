// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginReq } from "../../../api/Users/login";

// ✅ Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await loginReq({ username, password });
      return response.data; // full object from backend
    } catch (error) {
      return rejectWithValue(error.errorMsg || "Login failed");
    }
  }
);

const initialState = {
  name: null,        // ✅ Student’s actual name (e.g., “Karthik M”)
  username: null,    // (keep if you need student ID like AK12345)
  roleId: null,
  roleName: null,    // ✅ e.g., “Student”
  userId: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.name = null;
      state.username = null;
      state.roleId = null;
      state.roleName = null;
      state.userId = null;
      state.token = null;
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
      // Success
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        const {
          name,
          username,
          roleId,
          roleName,
          userId,
          token,
        } = action.payload;

        // ✅ Assign state values
        state.name = name || "";
        state.username = username || "";
        state.roleId = roleId || null;
        state.roleName = roleName || "";
        state.userId = userId || null;
        state.token = token || null;

        // ✅ Store locally for persistence
        localStorage.setItem("name", name || "");
        localStorage.setItem("username", username || "");
        localStorage.setItem("roleId", roleId);
        localStorage.setItem("roleName", roleName || "");
        localStorage.setItem("userId", userId);
        if (token) localStorage.setItem("token", token);
      })
      // Failed
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Invalid credentials";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
