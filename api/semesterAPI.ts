import { SemesterChangeLog, SemesterInfo } from "@/types/semester";
import { mockAllSemesterInfo } from "./mocks/semester";
import { RegisteredSubject } from "@/types/subject";
import Fetcher from "./Fetcher";
import { delay } from "@/utils/delay";
import { OkResponse } from "@/types/response";

interface Data1 {
    totalGPA: number
    semesterInfo: SemesterInfo[]
}

type Data2 = Pick<SemesterInfo, 'sumOfCredits' | 'yearGPA' | 'semesterGPA'> & {totalGPA: number}
export class SemesterAPI {
    static async getAllSemesterInfo(): Promise<Data1> {
        // return {
        //     totalGPA: 5,
        //     semesterInfo: mockAllSemesterInfo
        // }
        // await delay(2000)
        // console.log(mockAllSemesterInfo)
        try {
            let data = await Fetcher.get<unknown, Data1>('/score/getAllSemesterInfo');
            data.semesterInfo.forEach((sem) => {
                sem.subjects.forEach((sub) => {
                    sub.type = 'registered'
                })
            })
            data.semesterInfo.reverse();
            return data;
        } catch (error) {
            console.log(error)
            throw error
        }

    }

    static async updateSemester(semesterInfo: SemesterInfo): Promise<OkResponse> {
        try {
            let res = await Fetcher.post<any, OkResponse, any>('/score/updateSemesterCourseList', {
                semesterId: semesterInfo.id,
                subjects: semesterInfo.subjects
            });
            console.log(res);
            return {
                ok: true
            }
        } catch (error) {
            console.log(error);
            return {
                ok: false
            }
            throw error
        }
    }

    static async getStat(subjects: SemesterInfo['subjects']): Promise<Data2> {
        try {
            let res: Data2 = await Fetcher.post('/score/getTempGPA', {
                id: subjects[0].semesterId,
                subjects
            });
            console.log(res)
            return res;
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    static async addSemester(): Promise<{
        semesterId: string
    }> {
        return {
            semesterId: '1'
        }
    }

    static async deleteSemester(semesterId: string): Promise<void> {
        await delay(2000);
    }
}
