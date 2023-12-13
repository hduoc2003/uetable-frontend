import { AsyncThunk, AsyncThunkOptions, AsyncThunkPayloadCreator } from "@reduxjs/toolkit";
import { createAsyncThunk as cat } from '@reduxjs/toolkit';
import { RootState } from "./store";


export function createAsyncThunk<Returned, ThunkArg = void>(typePrefix: string, payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg, { state: RootState; }>, options?: AsyncThunkOptions<ThunkArg, { state: RootState; }>): AsyncThunk<Returned, ThunkArg, { state: RootState; }> {
    return cat(typePrefix, payloadCreator, options);
}
