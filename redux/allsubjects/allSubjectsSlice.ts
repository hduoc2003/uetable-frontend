import { Subject } from "@/types/subject"
import { createSlice } from "@reduxjs/toolkit";
import { initData } from "./actions/initData";

export type AllSubjectsState = Subject[];

const initialState: AllSubjectsState = []

export const {reducer: allSubjectsReducer, actions: allSubjectsActions} = createSlice({
    name: 'semester',
    initialState,
    reducers: {
        initData
    },
})
