import { PayloadAction } from "@reduxjs/toolkit";
import { AllSubjectsState } from "../allSubjectsSlice";

export function initData(state: AllSubjectsState, action: PayloadAction<AllSubjectsState>) {
    return action.payload
    // state.signedIn = action.payload.signedIn
}
