import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";

// --- Thunks ---

// Create Team
export const createTeam = createAsyncThunk(
  "quickActions/createTeam",
  async (teamData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/teams", teamData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Invite Member
export const inviteMember = createAsyncThunk(
  "quickActions/inviteMember",
  async ({ teamId, email }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/teams/${teamId}/invite-member`, { email });
      console.log("response", response);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Remove Member
export const removeMember = createAsyncThunk(
  "quickActions/removeMember",
  async ({ teamId, userId }, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/teams/${teamId}/remove-member/${userId}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch Team by ID (with members)
export const fetchTeamById = createAsyncThunk(
  "quickActions/fetchTeamById",
  async (teamId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/teams/${teamId}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// --- Slice ---

const quickActionsSlice = createSlice({
  name: "quickActions",
  initialState: {
    currentTeamId: null,
    team: null,
    members: [],
    loading: false,
    successMessage: null,
    error: null,
  },
  reducers: {
    setCurrentTeamId: (state, action) => {
      state.currentTeamId = action.payload;
    },
    clearMessages: (state) => {
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Team
      .addCase(createTeam.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.team = action.payload;
        state.currentTeamId = action.payload._id;
        state.successMessage = "Team created successfully!";
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Invite Member
      .addCase(inviteMember.pending, (state) => {
        state.loading = true;
      })
      .addCase(inviteMember.fulfilled, (state, action) => {
        state.loading = false;
        state.team = action.payload;
        state.members = action.payload.members;
        state.successMessage = "Member invited successfully!";
      })
      .addCase(inviteMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove Member
      .addCase(removeMember.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeMember.fulfilled, (state, action) => {
        state.loading = false;
        state.team = action.payload;
        state.members = action.payload.members;
        state.successMessage = "Member removed successfully!";
      })
      .addCase(removeMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Team by ID
      .addCase(fetchTeamById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeamById.fulfilled, (state, action) => {
        state.loading = false;
        state.team = action.payload;
        state.members = action.payload.members;
        state.currentTeamId = action.payload._id;
      })
      .addCase(fetchTeamById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentTeamId, clearMessages } = quickActionsSlice.actions;
export default quickActionsSlice.reducer;
