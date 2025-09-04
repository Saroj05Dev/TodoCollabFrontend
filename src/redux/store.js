import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import taskReducer from "./slices/taskSlice.js";
import userReducer from "./slices/usersSlice.js";
import attachmentReducer from "./slices/attachementSlice.js";

const store = configureStore ({
    reducer: {
        auth: authReducer,
        task: taskReducer,
        users: userReducer,
        attachments: attachmentReducer
    }
});

export default store;