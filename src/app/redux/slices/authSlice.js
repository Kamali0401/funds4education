import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginReq } from "../../../api/Users/login"; 

// 🔹 Async Thunk for login (student or sponsor)
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password, userType }, { rejectWithValue }) => {
    try {
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
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        // destructure payload
        const { username, role, id, token, userType } = action.payload;

        state.user = username;
        state.role = role;
        state.id = id;
        state.token = token || null;
        state.userType = userType;

        // ✅ save to localStorage
        localStorage.setItem("user", username);
        localStorage.setItem("role", role);
        localStorage.setItem("id", id);
        localStorage.setItem("userType", userType);
        if (token) localStorage.setItem("token", token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
