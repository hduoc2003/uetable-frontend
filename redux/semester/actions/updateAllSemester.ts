import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { SemesterState } from '../semesterSlice';
import { Action, PayloadAction } from '@reduxjs/toolkit';
import { RegisteredSubject } from '@/types/subject';
import { selectRegisteredSubjectById, selectSemesterById } from '../semesterSelector';
import { RootState, store } from '@/redux/store';

export function updateAllSemester(state: SemesterState, {payload}: PayloadAction<SemesterState['semesterInfo']>) {
    state.semesterInfo = state.dumpSemesterInfo = payload;
    console.log(payload)
    state.currentId = payload[0].id
}
