import { updateScheduleSubjects } from './actions/updateScheduleSubjects';
import { createSlice } from "@reduxjs/toolkit";
import { ScheduleInfo } from "@/types/schedule";
import { updateScheduleStyle } from "./actions/updateScheduleStyle";
import { discardChanges } from './actions/discardChanges';
import { saveChanges } from './actions/saveChanges';
import { updateScheduleState } from './actions/updateScheduleState';
import { addHiddenColumns } from './actions/addHiddenColumns';
import { initData } from './actions/initData';

export interface ScheduleState {
    tempData: ScheduleInfo
    realData: ScheduleInfo
    editing: boolean
}

const initTempData: ScheduleInfo = {
    subjectClassData: [],
    scheduleStyle: {
        hasBorder: false,
        roundedBorder: false,
        lessonColumnColor: '',
        timeColumnColor: '',
        headerRowColor: '',
        dividerRowColor: '',
        hasDivider: false,
        hiddenColumns: []
    }
}

const initialState: ScheduleState = {
    tempData: initTempData,
    realData: initTempData,
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
        addHiddenColumns,
        initData
    }
})
