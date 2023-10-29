import { ScheduleInfo } from "@/types/schedule";
import { RootState } from "../store";
import { ScheduleState } from "./scheduleSlice";

export const scheduleDataSelector = (state: RootState): ScheduleInfo => state.schedule.tempData;

export const scheduleSelector = (state: RootState): ScheduleState => state.schedule
