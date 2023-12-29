import { createSlice } from "@reduxjs/toolkit";
import { updateAuthState } from "./actions/changeAuthState";

export interface AuthState {
    signedIn?: boolean,
    logging: boolean,
    role?: "admin" | "user",
    studentId: string,
    name?: string,
    avtLink?: string
}

const initialState: AuthState = {
    signedIn: false,
    logging: true,
    role: "user",
    studentId: ''
}

export const {reducer: authReducer, actions: authActions} = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateAuthState
    }
})
