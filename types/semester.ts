import { CompletedSubject } from "./subject";

export interface SemesterInfo {
    id: string
    title: string
    subjects: CompletedSubject[]
    sumOfCredits?: number
    semesterGPA?: number
    yearGPA?: number
    totalGPA?: number
}

export interface SemesterChangeLog {
    title: string
    updatedSubject: CompletedSubject[]
    deletedSubject: string[] // id những môn bị xoá
}
