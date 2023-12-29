import { AuthState } from "../authSlice";
import { PayloadAction, current } from '@reduxjs/toolkit';

export function updateAuthState(state: AuthState, action: PayloadAction<Partial<AuthState>>) {
    return {
        ...state,
        ...action.payload
    }
    // state.signedIn = action.payload.signedIn
}
