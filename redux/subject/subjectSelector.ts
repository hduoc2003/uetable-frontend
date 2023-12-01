import { SubjectState } from './subjectSlice';
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Subject } from "@/types/subject";
import _ from "lodash";
import { SemesterInfo } from '@/types/semester';

const subjectSelector = (state: RootState) => state.subject;

export const getSubjectByType = createSelector([
    subjectSelector,
    (state: RootState, type: Subject['type'][number]) => type
], (subjectState, type): Subject[] => {
    return _.values(_.pickBy(subjectState, (subject) => subject.type.includes(type)))
})

export const getSubjectById = createSelector([
    subjectSelector,
    (state: RootState, subjectId: string) => subjectId
], (SubjectState, subjectId): Subject => {
    return SubjectState[subjectId]
})
