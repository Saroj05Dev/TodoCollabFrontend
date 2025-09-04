import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";

export const addAttachments = createAsyncThunk (
    "tasks/addAttachments",
    async ({taskId, attachements}, thunkAPI) => {
        try {
            const response = await axiosInstance.post(`/attachments/${taskId}`, attachements);
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const fetchAllAttachments = createAsyncThunk ( 
    "tasks/fetchAllAttachments",
    async (taskId, thunkAPI) => {
        try {
            const response = await axiosInstance.get(`/attachments/${taskId}`);
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const deleteAttachments = createAsyncThunk (
    "tasks/deleteAttachments",
    async ({taskId, publicId}, thunkAPI) => {
        try {
            const response = await axiosInstance.delete(`/attachments/${taskId}/${publicId}`);
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
)

// Initial State 
const initialState = {
    attachments: [],
};

const attachmentSlice = createSlice({
    name: "attachment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addAttachments.fulfilled, (state, action) => {
                state.attachments = action.payload;
            })
            .addCase(fetchAllAttachments.fulfilled, (state, action) => {
                state.attachments = action.payload;
            })
            .addCase(deleteAttachments.fulfilled, (state, action) => {
                state.attachments = action.payload;
            });
    },
});

export default attachmentSlice.reducer;