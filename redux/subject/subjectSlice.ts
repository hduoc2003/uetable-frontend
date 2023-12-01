import { createSlice } from "@reduxjs/toolkit";
import { ScheduleInfo } from "@/types/schedule";
import { Subject } from "@/types/subject";

export type SubjectState = Record<string, Subject>

const initialState: SubjectState = {}

export const {reducer: subjectReducer, actions: subjectActions} = createSlice({
    name: 'subject',
    initialState,
    reducers: {

    }
})
