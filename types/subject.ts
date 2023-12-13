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
  type: ('all' | 'major' | 'registered');
}
export interface SubjectAll extends Subject {
  letterGrade?: LetterGrade; // Điểm
  like: number; // Số lượt thích
  documents: number; // Số tài liệu
  stared: boolean; // Đã yêu thích hay chưa
  imgLink?: string; // Link ảnh
  GPA?: number; // Điểm trung bình chung của môn
  lecturers?: {
    name: string,
    email?: string
  }[] /// Danh sách giảng viên
  description?: string /// Mô tả môn học
}
interface ScoreInfo {
  score: number; // điểm
  weight: number; // trọng số
}

export type LetterGrade = 'F' | 'D' | 'D+' | 'C' | 'C+' | 'B' | 'B+' | 'A' | 'A+' | 'Chưa hoàn thành';
export interface RegisteredSubject extends Subject {
  // type: "registered";
  semesterId: string; // id của học kì
  score: {
    midTerm?: ScoreInfo; // điểm giữa kì
    finalTerm?: ScoreInfo; // điểm cuối kì
    otherTerm?: ScoreInfo; // điểm thành phần
    final?: number; // điểm tổng trong hệ 10
  };
}

