import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";

export const fetchTaskCount = createAsyncThunk(
  "task/fetchTaskCount",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/tasks/count");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Thunks for searching tasks by status

export const fetchInProgressTask = createAsyncThunk(
  "task/fetchInProgressTask",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        "/tasks/search?status=In Progress"
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchDoneTasks = createAsyncThunk(
  "task/fetchDoneTasks",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/tasks/search?status=Done");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  inProgress: [],
  done: [],
  taskCount: 0,
  inProgressCount: 0,
  doneCount: 0,
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // Count all tasks
      .addCase(fetchTaskCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaskCount.fulfilled, (state, action) => {
        state.loading = false;
        state.taskCount = action.payload;
      })
      .addCase(fetchTaskCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Search tasks by status
      // In Progress Tasks
      .addCase(fetchInProgressTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInProgressTask.fulfilled, (state, action) => {
        state.loading = false;
        state.inProgress = action.payload;
        state.inProgressCount = action.payload.length;
      })
      .addCase(fetchInProgressTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Done Tasks
      .addCase(fetchDoneTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoneTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.done = action.payload;
        state.doneCount = action.payload.length;
      })
      .addCase(fetchDoneTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
