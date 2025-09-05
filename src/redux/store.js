import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import taskReducer from "./slices/taskSlice.js";
import userReducer from "./slices/usersSlice.js";
import attachmentReducer from "./slices/attachementSlice.js";
import subtasksReducer from "./slices/subtasksSlice.js";

const store = configureStore ({
    reducer: {
        auth: authReducer,
        task: taskReducer,
        users: userReducer,
        attachments: attachmentReducer,
        subtasks: subtasksReducer
    }
});

export default store;