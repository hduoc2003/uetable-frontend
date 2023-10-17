import { createSlice } from "@reduxjs/toolkit";
import { updateAuthState } from "./actions/changeAuthState";

export interface AuthState {
    signedIn?: boolean,
    role?: "admin" | "user",
    username?: string,
    name?: string,
}

const initialState: AuthState = {
    signedIn: false,
    role: "user",
}

export const {reducer: authReducer, actions: authActions} = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateAuthState
    }
})
