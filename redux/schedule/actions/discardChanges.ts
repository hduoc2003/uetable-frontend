import { ScheduleState } from "../scheduleSlice";
import { cloneDeep } from "lodash";

export function discardChanges(state: ScheduleState) {
    state.tempData = state.realData;
    // state.editing = false;
}
