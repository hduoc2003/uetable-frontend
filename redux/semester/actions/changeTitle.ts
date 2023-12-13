import { PayloadAction } from "@reduxjs/toolkit";
import { SemesterState } from "../semesterSlice";
import { selectSemesterById } from "../semesterSelector";
import _ from "lodash";
// import { store } from "@/redux/store";

export function changeTitle(state: SemesterState, {payload: newTitle}: PayloadAction<string>) {
    const idx = _.findIndex(state.semesterInfo, (info) => state.currentId === info.id)
    state.semesterInfo[idx].title = newTitle
}
