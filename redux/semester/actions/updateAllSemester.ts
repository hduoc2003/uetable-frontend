import { SemesterState } from '../semesterSlice';
import { PayloadAction } from '@reduxjs/toolkit';

export function updateAllSemester(state: SemesterState, {payload}: PayloadAction<SemesterState['semesterInfo']>) {
    state.semesterInfo = state.dumpSemesterInfo = payload;
    console.log(payload)
    state.currentId = payload.info[0].id
}
