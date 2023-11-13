import { SemesterInfo } from "@/types/semester";
import genId from "@/utils/genId";
import { mockCompletedSubjects } from "./subject";


export const mockSemesterInfo: SemesterInfo = {
  id: genId(),
  title: 'Học kì ',
  subjects: mockCompletedSubjects,
  sumOfCredits: 100,
  semesterGPA: 4,
  yearGPA: 4,
};

export const mockAllSemesterInfo: SemesterInfo[] = Array(5).fill(null).map((g, i) => ({
  ...mockSemesterInfo,
  id: genId(),
  title: mockSemesterInfo.title + i
}));
