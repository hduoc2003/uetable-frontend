import { cloneDeep } from "lodash";
import { SemesterState } from "../semesterSlice";

export function discardChanges(state: SemesterState) {
    state.semesterInfo = state.dumpSemesterInfo;
    state.editing = false;
}
