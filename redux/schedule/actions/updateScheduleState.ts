import { ScheduleState } from '@/redux/schedule/scheduleSlice';
import { ScheduleStyle } from '@/types/schedule';
import { PayloadAction } from '@reduxjs/toolkit';

export function updateScheduleState(state: ScheduleState, action: PayloadAction<Partial<ScheduleState>>) {
    return {
        ...state,
        ...action.payload
    }
}
