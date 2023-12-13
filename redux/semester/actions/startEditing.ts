import { SemesterState } from "../semesterSlice";

export function startEditing(state: SemesterState) {
    state.editing = true;
}
