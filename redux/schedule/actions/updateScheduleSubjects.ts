import { PayloadAction } from "@reduxjs/toolkit"
import { ScheduleState } from "../scheduleSlice"
import { SubjectClass } from "@/types/subject"
import { isUndefined } from "@/utils/typeChecking"

export const updateScheduleSubjects = (state: ScheduleState, {
    payload: {
        index,
        newProps
    }
}: PayloadAction<{
    index: number
    newProps: Partial<SubjectClass>
}>) => {
    state.tempData.subjectClassData[index] = {
        ...state.tempData.subjectClassData[index],
        ...newProps
    }
    let subjectClassData = state.tempData.subjectClassData;

    if (!isUndefined(newProps.highlightColor)) {
        subjectClassData.forEach((subjectClass, i) => {
            if (i !== index && subjectClass.code === subjectClassData[index].code) {
                subjectClassData[i].highlightColor = newProps.highlightColor as string
            }
        })
    }
    state.editing = true;
}
