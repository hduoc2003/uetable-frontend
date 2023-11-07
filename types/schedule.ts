import { SubjectClass } from "./subject"

export interface ScheduleStyle {
    hasBorder: boolean
    roundedBorder: boolean
    lessonColumnColor: string
    timeColumnColor: string
    headerRowColor: string
    dividerRowColor: string
    hasDivider: boolean
    displayColumnSettings: boolean
}

export interface ScheduleInfo {
    subjectClassData: SubjectClass[]
    scheduleStyle: ScheduleStyle
}
