import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { SemesterInfo } from "@/types/semester";
import { discardChanges } from "./actions/discardChanges";
import { saveChanges, saveChangesThunk } from "./actions/saveChanges";
import { startEditing } from "./actions/startEditing";
import { crudSubject, crudSubjectThunk } from "./actions/crudSubject";
import { updateRootSemester } from "./actions/updateRootSemester";
import { fakeSemesterInfo } from "@/api/fakedata/fakeSemesterData";
import { updateAllSemester } from "./actions/updateAllSemester";
import { crudSemester, crudSemesterThunk } from "./actions/crudSemester";
import { changeTitle } from "./actions/changeTitle";

export interface SemesterState {
    fetched: boolean
    pending: boolean
    editing: boolean
    currentId: string
    semesterInfo: {
        info: SemesterInfo[]
        totalGPA: number
    }
    dumpSemesterInfo: {
        info: SemesterInfo[]
        totalGPA: number
    }
}

const initialState: SemesterState = {
    fetched: false,
    pending: false,
    editing: false,
    currentId: fakeSemesterInfo.id,
    semesterInfo: {
        info: [fakeSemesterInfo],
        totalGPA: 0
    },
    dumpSemesterInfo: {
        info: [fakeSemesterInfo],
        totalGPA: 0
    }
}

export const {reducer: semesterReducer, actions: semesterActions} = createSlice({
    name: 'semester',
    initialState,
    reducers: {
        startEditing,
        updateRootSemester,
        updateAllSemester,
        discardChanges,
        changeTitle
    },
    extraReducers(builder) {
        builder
        .addCase(crudSubjectThunk.fulfilled, crudSubject)
        .addCase(crudSubjectThunk.rejected, (state, action) => console.log(action))

        builder
        .addCase(crudSemesterThunk.fulfilled, crudSemester)

        builder
        .addCase(saveChangesThunk.fulfilled, saveChanges)

        builder
        .addMatcher(
            (action: AnyAction) => action.type.endsWith('/pending'),
            (state, action) => {state.pending = true}
        )
        .addMatcher(
            (action: AnyAction) => action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected'),
            (state, action) => {state.pending = false}
        )
    }
})
