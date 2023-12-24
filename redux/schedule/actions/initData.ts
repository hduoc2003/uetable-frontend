import { ScheduleInfo, ScheduleStyle } from "@/types/schedule";
import { PayloadAction } from "@reduxjs/toolkit";
import { ScheduleState } from "../scheduleSlice";

export function initData(state: ScheduleState, action: PayloadAction<ScheduleInfo>) {
    state.realData = state.tempData = action.payload
}
