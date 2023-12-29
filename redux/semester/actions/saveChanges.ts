import { SemesterState } from "../semesterSlice";
import { createAsyncThunk } from "@/redux/createAsyncThunk";
import { SemesterAPI } from "@/api/semesterAPI";
import { selectRootSemester, selectSemesterById } from "../semesterSelector";
import { PayloadAction } from "@reduxjs/toolkit";

export function saveChanges(state: SemesterState) {
    state.dumpSemesterInfo = state.semesterInfo;
    state.editing = false;
}

export const saveChangesThunk = createAsyncThunk("save-changes-semester", async (args, thunkAPI) => {
    const {ok} = await SemesterAPI.updateSemester(
        selectSemesterById(thunkAPI.getState(),
            selectRootSemester(thunkAPI.getState()).currentId
        ).semesterInfo
    )
});
