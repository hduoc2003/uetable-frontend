import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice";
import { scheduleReducer } from "./schedule/scheduleSlice";
import { subjectReducer } from "./subject/subjectSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        schedule: scheduleReducer,
        subject: subjectReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
