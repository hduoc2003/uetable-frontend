import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { SemesterState } from "../semesterSlice";
import { Action, PayloadAction } from "@reduxjs/toolkit";
import { RegisteredSubject } from "@/types/subject";
import {
  selectRegisteredSubjectById,
  selectSemesterById,
} from "../semesterSelector";
import { RootState, store } from "@/redux/store";
import { createAsyncThunk } from "@/redux/createAsyncThunk";
import { SemesterInfo } from "@/types/semester";
import { SemesterAPI } from "@/api/semesterAPI";
import { isUndefined } from "lodash";

interface Payload {
    type: "delete" | "add"
    newSemesterId?: string;
    semesterIdx?: number;
}

interface ThunkPayload {
  type: Payload['type'];
  semesterId?: string;
}

export function crudSemester(
  state: SemesterState,
  { payload }: PayloadAction<Payload>
) {
    const {semesterIdx, type, newSemesterId} = payload;
    switch (type) {
        case 'add':
            if (isUndefined(newSemesterId))
                throw new Error(`Function crudSemester: newSemesterId is undefined`)
            state.semesterInfo.unshift({
                id: newSemesterId,
                title: "Học kì mới",
                subjects: [],
                sumOfCredits: 0
            })
            state.currentId = newSemesterId;
            break;
        case 'delete':
            if (isUndefined(semesterIdx))
                throw new Error(`Function crudSemester: semesterIdx is undefined`)
            state.semesterInfo.splice(semesterIdx, 1);
            break;
    }
}

export const crudSemesterThunk = createAsyncThunk<Payload, ThunkPayload>("crud-semester", async (args, thunkAPI) => {

  switch (args.type) {
    case 'add':
        return {
            type: 'add',
            newSemesterId: (await SemesterAPI.addSemester()).semesterId
        }
    case 'delete':
        if (isUndefined(args.semesterId))
            throw new Error('Function crudSemesterThunk: args.semesterId is undefined')
        await SemesterAPI.deleteSemester(args.semesterId)
        return {
            type: 'delete',
            semesterIdx: selectSemesterById(thunkAPI.getState(), args.semesterId).idx
        }
  }
});
