// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginReq } from "../../../api/Users/login";

// ✅ Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      debugger;
      let response;

      // ✅ Choose API based on userType (student/sponsor)
      if (userType === "student") {
        response = await loginReq({ username, password });
      } else if (userType === "sponsor") {
        response = await loginReq({ username, password });
      }else if (userType === "institution") {
        response = await loginReq({ username, password });
      }
       else {
        throw new Error("Unsupported user type");
      }
 const data = response.data;

      // ✅ Store all values in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("expiresAt", data.expiresAt);
      localStorage.setItem("roleId", data.roleId);
      localStorage.setItem("roleName", data.roleName || "");
      localStorage.setItem("username", data.username);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("userType", userType);
      localStorage.setItem("name", data.name);

      // ✅ Optional: store entire object as well
      //localStorage.setItem("userData", JSON.stringify(data));

      // ✅ Return response with userType
      return { ...data, userType };
      // ✅ Return response with userType
      //return { ...response.data, userType };
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
        const { username, roleId, userId, token, userType } = action.payload;

        // ✅ Save details to state
        state.user = username;
        state.role = roleId;
        state.id = userId;
        state.token = token || null;

        // ✅ Store locally for persistence
        localStorage.setItem("name", name || "");
        localStorage.setItem("username", username || "");
        localStorage.setItem("roleId", roleId);
        localStorage.setItem("id", userId);
        localStorage.setItem("userType", userType);

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
