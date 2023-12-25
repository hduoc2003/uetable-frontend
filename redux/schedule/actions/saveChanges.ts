import { ScheduleState } from "../scheduleSlice";

export function saveChanges(state: ScheduleState) {
    state.realData = state.tempData;
    // state.editing = true;
}
