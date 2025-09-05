import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axiosInstance';

// Async thunks for API calls
export const createSubtask = createAsyncThunk(
    'subtasks/create',
    async ({ taskId, subtaskData }, thunkAPI) => {
        try {
            const response = await axiosInstance.post(`/subtasks/${taskId}`, subtaskData);
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const fetchSubtasks = createAsyncThunk(
    'subtasks/fetchByTaskId',
    async (taskId, thunkAPI) => {
        try {
            const response = await axiosInstance.get(`/subtasks/${taskId}`);
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateSubtask = createAsyncThunk(
    'subtasks/update',
    async ({ subtaskId, subtaskData }, thunkAPI) => {
        try {
            const response = await axiosInstance.put(`/subtasks/${subtaskId}`, subtaskData);
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const deleteSubtask = createAsyncThunk(
    'subtasks/delete',
    async (subtaskId, thunkAPI) => {
        try {
            await axiosInstance.delete(`/subtasks/${subtaskId}`);
            return subtaskId;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Initial state for the subtasks slice
const initialState = {
    subtasks: [],
    loading: 'idle',
    error: null,
};

const subtasksSlice = createSlice({
    name: 'subtasks',
    initialState,
    reducers: {
        // Reducers for any synchronous actions if needed
    },
    extraReducers: (builder) => {
        builder
            // Handle createSubtask lifecycle
            .addCase(createSubtask.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(createSubtask.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.subtasks.push(action.payload);
            })
            .addCase(createSubtask.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload || 'Failed to create subtask';
            })

            // Handle fetchSubtasks lifecycle
            .addCase(fetchSubtasks.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(fetchSubtasks.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.subtasks = action.payload;
            })
            .addCase(fetchSubtasks.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload || 'Failed to fetch subtasks';
            })

            // Handle updateSubtask lifecycle
            .addCase(updateSubtask.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(updateSubtask.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                const index = state.subtasks.findIndex(subtask => subtask._id === action.payload._id);
                if (index !== -1) {
                    state.subtasks[index] = action.payload;
                }
            })
            .addCase(updateSubtask.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload || 'Failed to update subtask';
            })
            
            // Handle deleteSubtask lifecycle
            .addCase(deleteSubtask.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(deleteSubtask.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.subtasks = state.subtasks.filter(subtask => subtask._id !== action.payload);
            })
            .addCase(deleteSubtask.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload || 'Failed to delete subtask';
            });
    },
});

export default subtasksSlice.reducer;