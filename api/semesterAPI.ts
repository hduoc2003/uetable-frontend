import { SemesterChangeLog, SemesterInfo } from "@/types/semester";
import { mockAllSemesterInfo } from "./mocks/semester";
import { CompletedSubject } from "@/types/subject";
import Fetcher from "./Fetcher";

export class SemesterAPI {
    static getAllSemesterInfo(): SemesterInfo[] {
        return mockAllSemesterInfo;
    }

    static updateSemester(semesterId: string, data: SemesterChangeLog) {
        // Fetcher.get('/api/v1/get_user')
    }

    static updateSemesterSubject(semesterId: string, subjectId: string, updateInfo: Partial<CompletedSubject>): void {

    }
}
