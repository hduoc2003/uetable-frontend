import { RegisteredSubject } from "./subject";

export interface SemesterInfo {
    id: string  // id học kì
    title: string // Kiểu học kì 1, năm học ...
    subjects: RegisteredSubject[]
    sumOfCredits: number // tổng tín chỉ
    semesterGPA?: number // GPA học kì
    yearGPA?: number // GPA cả năm
}

export interface SemesterChangeLog {
    title: string
    updatedSubject: RegisteredSubject[]
    deletedSubject: string[] // id những môn bị xoá
}
