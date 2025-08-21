import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";

export const signup = createAsyncThunk("auth/signup", async (userData, thunkAPI) => {
    try {
        const response = await axiosInstance.post("/users", userData);
        console.log("res data", response.data);
        return response.data.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const login = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
    try {
        const response = await axiosInstance.post("/users/login", credentials);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
  isLoggedIn: !!localStorage.getItem("token")
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      logout: (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        state.error = null;
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      },
    },
    extraReducers: (builder) => {
        builder
        // signup
        .addCase(signup.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(signup.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user || action.payload; // <-- just action.payload if your API returns user only
            state.token = action.payload.token || null;
            state.isLoggedIn = true;
            localStorage.setItem("user", JSON.stringify(state.user));
            if (state.token) {
                localStorage.setItem("token", state.token);
            }
        })
        .addCase(signup.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Signup Failed!";
        })
        // login
        .addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.userData;
            state.token = action.payload.token;
            state.isLoggedIn = true;
            localStorage.setItem("user", JSON.stringify(state.user));
            localStorage.setItem("token", state.token);
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Login Failed!";
        });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;