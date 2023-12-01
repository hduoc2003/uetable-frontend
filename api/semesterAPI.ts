import { SemesterChangeLog, SemesterInfo } from "@/types/semester";
import { mockAllSemesterInfo } from "./mocks/semester";
import { RegisteredSubject } from "@/types/subject";
import Fetcher from "./Fetcher";
import { delay } from "@/utils/delay";

export class SemesterAPI {
    static async getAllSemesterInfo(): Promise<SemesterInfo[]> {
        await delay(2000)
        // console.log(mockAllSemesterInfo)
        return mockAllSemesterInfo;
    }

    static async getTotalGPA(): Promise<number> {
        return Math.random()
    }

    static async updateSemester(data: SemesterInfo) {
        await delay(2000)
    }

    static async addSemester(): Promise<{
        semesterId: string
    }> {
        return {
            semesterId: '1'
        }
    }
}
