import { RootState } from "../store";
import { AuthState } from "./authSlice";

export const authSelector = (state: RootState): AuthState => state.auth;
