export interface SubjectClass {
  id: string; /// mã môn học
  lessonStart: number; /// tiết học bắt đầu
  lessonEnd: number; /// tiết học kết thúc
  group: string; // nhóm
  name: string; // tên môn học
  place: string; // giảng đường
  credits: number; // tín chỉ
  teacherName: string; // tên giảng viên
  weekDay: number; // ngày học trong tuần, Thứ 2 là 2, CN là 8
  numberOfStudents: number; // sĩ số
  highlightColor: string;
  description?: string;
}

export interface Subject {
  id: string; /// mã học phần
  name: string; // tên học phần
  credits: number; // tín chỉ
}
interface ScoreInfo {
  score: number;
  weight: number;
}

export type LetterGrade = 'F' | 'D' | 'D+' | 'C' | 'C+' | 'B' | 'B+' | 'A' | 'A+';
export class CompletedSubject implements Subject {
  id: string;
  name: string;
  credits: number;
  score: {
    midTerm?: ScoreInfo; // điểm giữa kì
    finalTerm?: ScoreInfo; // điểm cuối kì
    otherTerm?: ScoreInfo; // điểm thành phần
    final: number; // điểm tổng trong hệ 10
  };

  constructor(
    id: string,
    name: string,
    credits: number,
    score: typeof CompletedSubject.prototype.score
  ) {
    this.id = id;
    this.name = name;
    this.credits = credits;
    this.score = score;
  }

  getFinalScore(): number {
    let res = 0;
    let weight = 0;
    const { midTerm, finalTerm, otherTerm, final } = this.score;
    if (typeof midTerm !== "undefined") {
      weight += midTerm.weight;
      res += midTerm.score * midTerm.weight;
    }
    if (typeof finalTerm !== "undefined") {
      weight += finalTerm.weight;
      res += finalTerm.score * finalTerm.weight;
    }
    if (typeof otherTerm !== "undefined") {
      weight += otherTerm.weight;
      res += otherTerm.score * otherTerm.weight;
    }
    if (weight !== 1) return final;
    this.score.final = res;
    return res;
  }

  get4Grade(): number {
    let finalScore = this.getFinalScore();
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

  getLetterGrade(): LetterGrade {
    switch (this.get4Grade()) {
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
}
