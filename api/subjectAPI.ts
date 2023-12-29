import { RegisteredSubject, Subject, SubjectAll, SubjectClass } from "@/types/subject";
import { mockAllSubjects, mockSubjectClasses } from "./mocks/subject";
import { delay } from "@/utils/delay";
import _ from "lodash";
import Fetcher from "./Fetcher";
import { toast } from "react-toastify";

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
        }[]
        >('/subject/getSubjectByCode', {
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
    // console.log({from, to})
    // try {
    //     let res = await Fetcher.post<any, SubjectAll[]>('/subject/getPartSubject', {
    //       sortBy,
    //       from,
    //       to,
    //       searchValue
    //     });
    //     console.log(res)
    //     return res;
    // } catch (error) {
    //   console.log(error);
    //   toast.error('Fetch môn học thất bại')
    //   throw error
    // }
    // console.log(sortBy)
    await delay(1000);
    // console.log(from, to)
    // console.log({from, to})
    return Math.random() < 1 ? mockAllSubjects : [];
  }

  static async starSubject(subjectId: string, star: boolean) {
    await delay(1500);
  }

  static async getRelatedSubject(subjectCode: string, limit: number): Promise<SubjectAll[]> {
    try {
      const idList = await Fetcher.get<any, {Id: string}[]>('/subject/getSubjectByCode', {
        params: {
          code: subjectCode.slice(0, 3),
          limit
        }
      })
      // console.log(subjectCode.slice(0, 3))
      const subjects = await Promise.allSettled<SubjectAll>(idList.map(({Id}) => {
        return this.getSubjectById(Id)
      }))
      const notErrorSubjects = subjects.filter((subject) => subject.status === 'fulfilled')
                                        .map((subject) => (subject as PromiseFulfilledResult<SubjectAll>).value)
      return notErrorSubjects;
    } catch (error) {
      console.log(error);
      toast.error('Fetch môn học liên quan thất bại')
      return []
    }
    await delay(2000);
    return mockAllSubjects;
  }

  static async getSubjectById(subjectId: string): Promise<SubjectAll> {
    try {
      let res = await Fetcher.get<any, SubjectAll>('/subject/getSubjectInfo', {
        params: {
          subjectId
        }
      });
      return res;
    } catch (error) {
      console.log(error);
      toast.error('Fetch thông tin môn học thất bại');
      throw error
    }
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
    try {
      let res = Fetcher.get<any, RegisteredSubject>('/subject/getRegisteredSubjectInfo', {
        params: {
          subjectId
        }
      });
      return res;
    } catch (error) {
      console.log(error);
      // toast.error(error.toString())
      throw error;
    }

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
