import { SemesterInfo } from "@/types/semester";
import genId from "@/utils/genId";
import { mockCompletedSubjects } from "./subject";
import _ from "lodash";


export const mockSemesterInfo: SemesterInfo = {
  id: 'lmao',
  title: 'Học kì ',
  subjects: mockCompletedSubjects('lmao'),
  sumOfCredits: 100,
  semesterGPA: 4,
  yearGPA: 4,
};

export const mockAllSemesterInfo: SemesterInfo[] = Array(5).fill(null).map((g, i) => {
  const semesterId = genId();
  return {
    ...mockSemesterInfo,
    id: semesterId,
    title: mockSemesterInfo.title + i,
    subjects: _.cloneDeep(mockSemesterInfo.subjects).map((g) => {g.semesterId = semesterId; return g;})
  }
});
