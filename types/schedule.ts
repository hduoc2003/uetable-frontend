import { SubjectClass } from "./subject"

export type Weekdays = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
export interface ScheduleStyle {
    hasBorder: boolean
    roundedBorder: boolean
    lessonColumnColor: string
    timeColumnColor: string
    headerRowColor: string
    dividerRowColor: string
    hasDivider: boolean
    hiddenColumns: Weekdays[]
}

export interface ScheduleInfo {
    subjectClassData: SubjectClass[]
    scheduleStyle: ScheduleStyle
}
