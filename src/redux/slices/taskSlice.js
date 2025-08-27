import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";

export const createTask = createAsyncThunk(
  "task/createTask",
  async (taskData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/tasks", taskData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchTasks = createAsyncThunk(
  "task/fetchTasks",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/tasks");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchTaskById = createAsyncThunk(
  "task/fetchTaskById",
  async (taskId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/tasks/${taskId}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchTaskCount = createAsyncThunk(
  "task/fetchTaskCount",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/tasks/count");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (taskId, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/tasks/${taskId}`);
      return taskId; // return id so we can filter it from state
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async ({ taskId, taskData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`/tasks/${taskId}`, taskData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const smartAssignTask = createAsyncThunk(
  "task/smartAssignTask",
  async ({ taskData, taskId}, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/tasks/${taskId}/smart-assign`, taskData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const resolveConflict = createAsyncThunk(
  "task/resolveConflict",
  async (taskId, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/tasks/${taskId}/resolve-conflict`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const fetchInProgressTask = createAsyncThunk(
  "task/fetchInProgressTask",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/tasks/search?status=In Progress");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
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
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  all: [],
  inProgress: [],
  done: [],
  selectedTask: null,
  taskCount: 0,
  inProgressCount: 0,
  doneCount: 0,
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    clearSelectedTask: (state) => {
      state.selectedTask = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.all = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch task by ID
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.selectedTask = action.payload;
      })

      // Create task
      .addCase(createTask.fulfilled, (state, action) => {
        state.all.push(action.payload);
        state.taskCount += 1;
      })

      // Update task
      .addCase(updateTask.fulfilled, (state, action) => {
        const updated = action.payload;
        state.all = state.all.map((t) => (t._id === updated._id ? updated : t));

        // also update in status lists
        if (updated.status === "In Progress") {
          state.inProgress = [...state.inProgress.filter((t) => t._id !== updated._id), updated];
          state.inProgressCount = state.inProgress.length;
        }
        if (updated.status === "Done") {
          state.done = [...state.done.filter((t) => t._id !== updated._id), updated];
          state.doneCount = state.done.length;
        }
      })

      // Delete task
      .addCase(deleteTask.fulfilled, (state, action) => {
        const id = action.payload;
        state.all = state.all.filter((t) => t._id !== id);
        state.inProgress = state.inProgress.filter((t) => t._id !== id);
        state.done = state.done.filter((t) => t._id !== id);
        state.taskCount = state.all.length;
        state.inProgressCount = state.inProgress.length;
        state.doneCount = state.done.length;
      })

      // Count tasks
      .addCase(fetchTaskCount.fulfilled, (state, action) => {
        state.taskCount = action.payload;
      })

      // In Progress tasks
      .addCase(fetchInProgressTask.fulfilled, (state, action) => {
        state.inProgress = action.payload;
        state.inProgressCount = action.payload.length;
      })

      // Done tasks
      .addCase(fetchDoneTasks.fulfilled, (state, action) => {
        state.done = action.payload;
        state.doneCount = action.payload.length;
      });
  },
});

export const { clearSelectedTask } = taskSlice.actions;
export default taskSlice.reducer;
