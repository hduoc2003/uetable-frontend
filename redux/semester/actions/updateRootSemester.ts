import { SemesterState } from '../semesterSlice';
import { PayloadAction } from '@reduxjs/toolkit';

export function updateRootSemester(state: SemesterState, {payload}: PayloadAction<Partial<SemesterState>>) {
    return {
        ...state,
        ...payload
    }
}
