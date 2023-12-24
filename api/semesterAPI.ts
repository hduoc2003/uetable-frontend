import { SemesterChangeLog, SemesterInfo } from "@/types/semester";
import { mockAllSemesterInfo } from "./mocks/semester";
import { RegisteredSubject } from "@/types/subject";
import Fetcher from "./Fetcher";
import { delay } from "@/utils/delay";

interface Data1 {
    totalGPA: number
    semesterInfo: SemesterInfo[]
}
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
            console.log(data)
            data.semesterInfo.reverse();
            return data;
        } catch (error) {
            console.log(error)
            throw error
        }

    }

    static async updateSemester(semesterInfo: SemesterInfo): Promise<{
        totalGPA: number
    }> {
        console.log('haha')
        try {
            let res = await Fetcher.post('/score/updateSemesterCourseList', {
                semesterId: semesterInfo.id,
                subjects: semesterInfo.subjects
            });
            console.log(res);
            // return res;
        } catch (error) {
            console.log(error)
        }
        // await delay(2000)
        return {
            totalGPA: 100
        }
    }

    static async getStat(subjects: SemesterInfo['subjects']): Promise<Pick<SemesterInfo, 'sumOfCredits' | 'yearGPA' | 'semesterGPA'>> {
        try {
            let res = await Fetcher.get('/score/getTempGPA')
        } catch (error) {

        }
        await delay(1000);
        return {
            sumOfCredits: 5,
            yearGPA: Math.random(),
            semesterGPA: 4
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
