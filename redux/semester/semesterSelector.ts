import { SemesterInfo } from './../../types/semester';
import { RegisteredSubject } from "@/types/subject"
import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "../store"
import _ from 'lodash';
import { allSemesterMode } from '@/utils/semester';

export const selectRootSemester = (state: RootState) => state.semester;
export const selectAllSemester = (state: RootState) => state.semester.semesterInfo;

export const selectSemesterById = createSelector([
    selectRootSemester,
    selectAllSemester,
    (state: RootState, semesterId: string) => semesterId
], (semesterState, allSemesterInfo, semesterId): {
    idx: number
    semesterInfo: SemesterInfo
} => {
    if (allSemesterMode(semesterId)) {
        let sumOfCredits = 0;
        let subjects: RegisteredSubject[] = []
        for (const info of allSemesterInfo) {
            sumOfCredits += info.sumOfCredits;
            subjects.push(...info.subjects);
        }
        return {
            idx: -1,
            semesterInfo: {
                'id': 'all',
                'title': 'Tất cả học kì',
                sumOfCredits,
                subjects,
                'yearGPA': semesterState.totalGPA
            }
        }
    }
    let idx = _.findIndex(allSemesterInfo, (info) => semesterId === info.id);
    if (idx === -1)
        throw new Error(`Function getSemesterById: Semester with id ${semesterId} not found`)
    return {
        idx,
        semesterInfo: allSemesterInfo[idx]
    };
})

export const selectRegisteredSubjectById = createSelector([
    (state: RootState) => state,
    selectSemesterById,
    (state: RootState, semesterId: string, subjectId: string) => subjectId
], (rootState, semester, subjectId): {
    subjectIdx: number
    semesterIdx: number
    subject: RegisteredSubject
} => {
    let idx = _.findIndex(semester.semesterInfo.subjects, (subject) => subject.code === subjectId)
    if (idx === -1)
        throw new Error(`Function getRegisteredSubjectById: Subject with id ${subjectId} not found`)
    return {
        subjectIdx: idx,
        semesterIdx: semester.idx,
        subject: semester.semesterInfo.subjects[idx]
    };
})
