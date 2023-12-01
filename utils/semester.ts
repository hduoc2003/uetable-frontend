import { SemesterInfo } from "@/types/semester";
import { RegisteredSubject } from "@/types/subject";

export function getCombinedSemesterInfo(semesterInfo: SemesterInfo[], totalGPA: number): SemesterInfo {
    let sumOfCredits = 0;
    let subjects: RegisteredSubject[] = []
    for (const info of semesterInfo) {
        sumOfCredits += info.sumOfCredits;
        subjects.push(...info.subjects);
    }
    return {
        'id': 'all',
        'title': 'Tất cả học kì',
        sumOfCredits,
        subjects,
        'yearGPA': totalGPA
    }
}
