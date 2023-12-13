import { createAsyncThunk } from "@/redux/createAsyncThunk";
import { RegisteredSubject } from "@/types/subject";
import { selectRegisteredSubjectById, selectRootSemester, selectSemesterById } from "../semesterSelector";
import { SemesterAPI } from "@/api/semesterAPI";
import { PayloadAction } from "@reduxjs/toolkit";
import { SemesterState } from "../semesterSlice";
import _, { isUndefined } from "lodash";

interface Payload {
  subjects: RegisteredSubject[];
  sumOfCredits: number;
  yearGPA?: number;
  semesterGPA?: number;
  semesterIdx: number;
}

interface ThunkPayload {
  type: 'delete' | 'add' | 'update',
  subject: string[] | RegisteredSubject
};

export const crudSubjectThunk = createAsyncThunk<Payload, ThunkPayload>(
  "crud-subject",
  async ({ type, subject }, thunkAPI): Promise<Payload> => {
    let semesterIdx: number = -1;
    let subjects: RegisteredSubject[] = []
    if (Array.isArray(subject)) {
      if (type !== 'delete')
        throw new Error('Function crudSubjectThunk: subject is array only for type "delete"');
      ({ idx: semesterIdx, semesterInfo: { subjects } } = selectSemesterById(
        thunkAPI.getState(),
        selectRootSemester(thunkAPI.getState()).currentId
      ))
      subjects = [...subjects]
      _.remove(subjects, (data) => subject.includes(data.id))
    } else {
      ({ idx: semesterIdx, semesterInfo: { subjects } } = selectSemesterById(
        thunkAPI.getState(),
        subject.semesterId
      ))
      subjects = [...subjects]
      const { subjectIdx } = selectRegisteredSubjectById(thunkAPI.getState(), subject.semesterId, subject.id)

      switch (type) {
        case 'add':
          subjects.push(subject);
          break;
        case 'update':
          subjects[subjectIdx] = subject
          break;
      }
    }

    let payload: Payload = {
      semesterIdx: semesterIdx,
      subjects,
      ...(await SemesterAPI.getStat(subjects))
    };

    return payload;
  }
);

export function crudSubject(state: SemesterState, { payload }: PayloadAction<Payload>) {
  const { semesterIdx, sumOfCredits, yearGPA, semesterGPA, subjects } = payload;

  state.semesterInfo[semesterIdx] = {
    ...state.semesterInfo[semesterIdx],
    sumOfCredits,
    yearGPA,
    semesterGPA,
    subjects,
  }
  state.editing = true;
}
