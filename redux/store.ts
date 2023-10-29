import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice";
import { scheduleReducer } from "./schedule/scheduleSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        schedule: scheduleReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
