import { PayloadAction } from "@reduxjs/toolkit"
import { ScheduleState } from "../scheduleSlice"
import { Weekdays } from "@/types/schedule"

export const addHiddenColumns = (state: ScheduleState, {
    payload: day
}: PayloadAction<Weekdays>) => {
    state.tempData.scheduleStyle.hiddenColumns.push(day)
    state.editing = true;
}
