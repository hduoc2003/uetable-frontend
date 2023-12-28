import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { selectAllSemester } from "../semester/semesterSelector";
import { Subject } from "@/types/subject";

export const selectAllSubjects = (state: RootState) => state.allSubjects

export const selectNotRegisteredSubjects = createSelector([
    selectAllSubjects,
    selectAllSemester
], (allSubjects, allSemesters): Subject[] => {
    // return allSubjects;
    return allSubjects.filter((subject) => {
        for (const sem of allSemesters)
            if (sem.subjects.some((subject2) => subject2.id === subject.id)) {
                // console.log(subject.code)
                return false;
            }
        return true;
    })
});
