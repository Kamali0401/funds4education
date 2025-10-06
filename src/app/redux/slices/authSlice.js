// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginReq } from "../../../api/Users/login"; 


// ✅ Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await loginReq({ username, password });
      return response.data; // response = { id, username, role, token? }
      debugger;
      let response;

      // choose API based on userType
      if (userType === "student") {
        response = await loginReq({ username, password });
      } else if (userType === "sponsor") {
        response = await loginReq({ username, password });
    
      } else {
        throw new Error("Unsupported user type");
      }

      return { ...response.data, userType }; // return with userType
    } catch (error) {
      return rejectWithValue(error.errorMsg || "Login failed");
    }
  }
);

const initialState = {
  user: null,
  role: null,
  id: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.id = null;
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
