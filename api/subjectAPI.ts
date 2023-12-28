import { RegisteredSubject, Subject, SubjectAll, SubjectClass } from "@/types/subject";
import { mockAllSubjects, mockSubjectClasses } from "./mocks/subject";
import { delay } from "@/utils/delay";
import _ from "lodash";
import Fetcher from "./Fetcher";

export function getSubjectClasses(): SubjectClass[] {
  return mockSubjectClasses;
}

export class SubjectAllAPI {
  static async getAllSubjects(): Promise<Subject[]> {
      try {
        const res = await Fetcher.get<any, {
          Id: string;
          Name: string;
          Code: string;
          Credit: number;
        }[]>('/subject/getSubjectByCode', {
          params: {
            code: ''
          }
        });

        const data: Subject[] = res.map((subject) => ({
          id: subject.Id,
          code: subject.Code,
          name: subject.Name,
          credits: subject.Credit,
          type: 'all',
        }))
        return data;
      } catch (error) {
        console.log(error);
        throw error
      }
  }

  static async getSomeSubjects(
    sortBy: "stared" | "rating" | "last-access",
    from: number,
    to: number,
    searchValue: string
  ): Promise<SubjectAll[]> {
    // console.log(sortBy)
    await delay(1000);
    // console.log(from, to)
    // console.log({from, to})
    return Math.random() < 0.5 ? mockAllSubjects : [];
  }

  static async starSubject(subjectId: string, star: boolean) {
    await delay(1500);
  }

  static async getRelatedSubject(subjectId: string, from: number, to: number): Promise<SubjectAll[]> {
    await delay(2000);
    return mockAllSubjects;
  }

  static async getSubjectById(subjectId: string): Promise<SubjectAll> {
    await delay(2000);
    let data: SubjectAll = {
      id: '1',
      code: "HIS1001",
      name: "Lịch sử Đảng Cộng sản Việt Nam",
      credits: 2,
      type: "registered",
      like: 6,
      documents: 652,
      stared: true,
      lecturers: [{
        name: 'Bùi Huy Dược',
        email: 'hduoc2003@gmail.com'
      }, {
        name: 'Dũng Bùi Tuấn'
      }, {
        name: 'Phạm Anh Việt Gia',
        email: ':V@gmail.com'
      }],
      score: {
        final: 10
      }
    };
    return data;
  }

  static async getDocuments(sortBy: 'latest' | 'rating', from: number, to: number, subjectId: string) {

  }

}

export class RegisteredSubjectAPI {
  static async getSubjectById(subjectId: string): Promise<RegisteredSubject> {
    await delay(2000);
    return {
      id: '1',
      code: "HIS1001",
      name: "Lịch sử Đảng Cộng sản Việt Nam",
      credits: 2,
      score: {
        final: 8.1,
      },
      semesterId: '222',
      type: 'registered',
      lecturer: 'Bùi Huy Dược'
    }
  }
}
