import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice";
import { scheduleReducer } from "./schedule/scheduleSlice";
import { semesterReducer } from "./semester/semesterSlice";
import { useDispatch } from "react-redux";
import { allSubjectsReducer } from "./allsubjects/allSubjectsSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        schedule: scheduleReducer,
        semester: semesterReducer,
        allSubjects: allSubjectsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useThunkDispatch = () => useDispatch<AppDispatch>()
