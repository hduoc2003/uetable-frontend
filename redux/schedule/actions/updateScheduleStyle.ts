import { ScheduleStyle } from "@/types/schedule";
import { PayloadAction } from "@reduxjs/toolkit";
import { ScheduleState } from "../scheduleSlice";

export function updateScheduleStyle(state: ScheduleState, action: PayloadAction<Partial<ScheduleStyle>>) {
    state.tempData.scheduleStyle = {
        ...state.tempData.scheduleStyle,
        ...action.payload
    }
    state.editing = true;
}
