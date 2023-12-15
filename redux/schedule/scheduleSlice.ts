import { updateScheduleSubjects } from './actions/updateScheduleSubjects';
import { createSlice } from "@reduxjs/toolkit";
import { ScheduleInfo } from "@/types/schedule";
import { getScheduleInfo } from "@/api/scheduleAPI";
import { updateScheduleStyle } from "./actions/updateScheduleStyle";
import { cloneDeep } from 'lodash';
import { discardChanges } from './actions/discardChanges';
import { saveChanges } from './actions/saveChanges';
import { updateScheduleState } from './actions/updateScheduleState';
import { addHiddenColumns } from './actions/addHiddenColumns';

export interface ScheduleState {
    fetched: boolean
    tempData: ScheduleInfo
    realData: ScheduleInfo
    editing: boolean
}

const initTempData: ScheduleInfo = getScheduleInfo(false);
const initRealData: ScheduleInfo = cloneDeep(initTempData);

const initialState: ScheduleState = {
    fetched: true,
    tempData: initTempData,
    realData: initRealData,
    editing: false
}

export const {reducer: scheduleReducer, actions: scheduleActions} = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        updateScheduleState,
        updateScheduleStyle,
        updateScheduleSubjects,
        discardChanges,
        saveChanges,
        addHiddenColumns
    }
})
