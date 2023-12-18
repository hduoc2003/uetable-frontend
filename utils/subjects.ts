import { LetterGrade, RegisteredSubject, SubjectAll } from "@/types/subject";
import { isUndefined } from "lodash";

export function letterGrade(subject: SubjectAll | undefined): LetterGrade {
    return subject?.type !== "registered" || !subject?.letterGrade
        ? "Chưa hoàn thành"
        : subject?.letterGrade;
}

export function getFinalScore(subject: RegisteredSubject | undefined) {
    if (isUndefined(subject))
        return 0;
    let score = 0;
    let weight = 0;
    const { midTerm, finalTerm, otherTerm, final } = subject.score;
    if (typeof midTerm !== "undefined") {
        weight += midTerm.weight;
        score += midTerm.score * midTerm.weight;
    }
    if (typeof finalTerm !== "undefined") {
        weight += finalTerm.weight;
        score += finalTerm.score * finalTerm.weight;
    }
    if (typeof otherTerm !== "undefined") {
        weight += otherTerm.weight;
        score += otherTerm.score * otherTerm.weight;
    }
    score = Math.min(score, 10);
    if (Math.abs(weight - 1) > 0.0000001) return final ?? 0;
    subject.score.final = score;
    return score;
}


export function get4Grade(subject: RegisteredSubject | undefined): number {
    let finalScore = getFinalScore(subject);
    if (finalScore < 4) return 0;
    if (finalScore < 5) return 1;
    if (finalScore < 5.5) return 1.5;
    if (finalScore < 6.5) return 2;
    if (finalScore < 7) return 2.5;
    if (finalScore < 8) return 3;
    if (finalScore < 8.5) return 3.5;
    if (finalScore < 9) return 3.7;
    return 4;
}

export function getLetterGrade(subject: RegisteredSubject  | undefined): LetterGrade {
    switch (get4Grade(subject)) {
        case 0:
            return "F";
        case 1:
            return "D";
        case 1.5:
            return "D+";
        case 2:
            return "C";
        case 2.5:
            return "C+";
        case 3:
            return "B";
        case 3.5:
            return "B+";
        case 3.7:
            return "A";
        case 4:
            return "A+";
        default:
            return "F";
    }
}