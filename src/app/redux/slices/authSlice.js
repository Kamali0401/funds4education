import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginReq } from "../../../api/Users/login"; 
import { sponsorLoginReq } from "../../../api/Users/Sponsorlogin"; // ✅ sponsor API

// 🔹 Async Thunk for login (student or sponsor)
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password, userType }, { rejectWithValue }) => {
    try {
      let response;

      // choose API based on userType
      if (userType === "student") {
        response = await loginReq({ username, password });
      } else if (userType === "sponsor") {
        response = await sponsorLoginReq({ username, password });
      } else {
        throw new Error("Unsupported user type");
      }

      return { ...response.data, userType }; // return with userType
    } catch (error) {
      return rejectWithValue(error.errorMsg || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    role: null,
    id: null,
    token: null,
    userType: null,
    loading: false,
    error: null,
  },
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
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Success
     .addCase(loginUser.fulfilled, (state, action) => {
  state.loading = false;
  const { username, roleId, id, token } = action.payload;

  state.user = username;
  state.role = roleId; // 👈 rename to roleId for clarity
  state.id = id;
  state.token = token || null;

  // Store locally
  localStorage.setItem("user", username);
  localStorage.setItem("roleId", roleId);
  localStorage.setItem("id", id);
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
