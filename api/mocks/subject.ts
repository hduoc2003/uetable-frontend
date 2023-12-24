import { RegisteredSubject, SubjectAll, SubjectClass } from "@/types/subject";

export const mockSubjectClasses: SubjectClass[] = [
  {
    id: "INT3209 1",
    lessonStart: 1,
    lessonEnd: 3,
    group: "CL",
    name: "Khai phá dữ liệu",
    place: "309-GĐ2",
    credits: 3,
    teacherName: "Hà Quang Thuỵ",
    weekDay: 2,
    numberOfStudents: 100,
    highlightColor: "#EFEF98",
  },
  {
    id: "INT3401 4",
    lessonStart: 7,
    lessonEnd: 9,
    group: "CL",
    name: "Trí tuệ nhân tạo",
    place: "206-GĐ3",
    credits: 3,
    teacherName: "Nguyễn Thanh Thuỷ",
    weekDay: 2,
    numberOfStudents: 100,
    highlightColor: "#F5A56D",
    description: "Thầy dạy hay vcl",
  },
  {
    id: "INT3306 3",
    lessonStart: 10,
    lessonEnd: 11,
    group: "CL",
    name: "Web",
    place: "206-GĐ3",
    credits: 3,
    teacherName: "Hoàng Xuân Tùng",
    weekDay: 2,
    numberOfStudents: 50,
    highlightColor: "#CC66FF",
  },
  {
    id: "PES1075 4",
    lessonStart: 3,
    lessonEnd: 4,
    group: "CL",
    name: "Bóng chuyền hơi",
    place: "SVĐ ĐHNN",
    credits: 2,
    teacherName: "Giảng viên GDTC",
    weekDay: 3,
    numberOfStudents: 50,
    highlightColor: "#F7CECE",
  },
  {
    id: "INT3403 1",
    lessonStart: 11,
    lessonEnd: 12,
    group: "1",
    name: "Đồ hoạ máy tính",
    place: "PM501-E5",
    credits: 3,
    teacherName: "Ma Thị Châu",
    weekDay: 3,
    numberOfStudents: 50,
    highlightColor: "#8BEFB8",
  },
  {
    id: "PHI1002 2",
    lessonStart: 3,
    lessonEnd: 4,
    group: "CL",
    name: "Chủ nghĩa xã hội khoa học",
    place: "308-GĐ2",
    credits: 2,
    teacherName: "Nguyễn Thị Lan",
    weekDay: 4,
    numberOfStudents: 50,
    highlightColor: "#9BC2E6",
  },
  {
    id: "INT3403 1",
    lessonStart: 7,
    lessonEnd: 8,
    group: "CL",
    name: "Đồ hoạ máy tính",
    place: "301-GĐ2",
    credits: 3,
    teacherName: "Ma Thị Châu",
    weekDay: 4,
    numberOfStudents: 50,
    highlightColor: "#8BEFB8",
  },
  {
    id: "INT3306 3",
    lessonStart: 9,
    lessonEnd: 10,
    group: "1",
    name: "Web",
    place: "PM208-G2",
    credits: 3,
    teacherName: "??",
    weekDay: 4,
    numberOfStudents: 50,
    highlightColor: "#CC66FF",
  },
  {
    id: "MAT1101 4",
    lessonStart: 7,
    lessonEnd: 9,
    group: "CL",
    name: "Xác suất thống kê",
    place: "105-GĐ3",
    credits: 3,
    teacherName: "Lê Sỹ Vinh",
    weekDay: 6,
    numberOfStudents: 50,
    highlightColor: "#BAAB7E",
  },
  {
    id: "INT3111 1",
    lessonStart: 1,
    lessonEnd: 3,
    group: "CL",
    name: "Quản lý dự án phần mềm",
    place: "106-GĐ3",
    credits: 3,
    teacherName: "Trần Hoàng Việt",
    weekDay: 7,
    numberOfStudents: 50,
    highlightColor: "#F2EBE6",
  },
  {
    id: "INT3514 2",
    lessonStart: 5,
    lessonEnd: 6,
    group: "CL",
    name: "Pháp luật và đạo đức trong CNTT",
    place: "105-GĐ3",
    credits: 2,
    teacherName: "Trần Văn Luân",
    weekDay: 7,
    numberOfStudents: 50,
    highlightColor: "#B7C8D4",
  },
];

export const mockRegisteredSubjects = (semesterId: string): RegisteredSubject[] => [{
  id: "HIS1001",
  name: "Lịch sử Đảng Cộng sản Việt Nam",
  credits: 2,
  score: {
    final: 8.1,
  },
  semesterId,
  type: 'registered'
}, {
  id: "INT2208",
  name: "Công nghệ phần mềm",
  credits: 3,
  score: {
    final: 9.2,
  },
  semesterId,
  type: 'registered'
}, {
  id: "INT3202",
  name: "Hệ quản trị cơ sở dữ liệu",
  credits: 3,
  score: {
    final: 8,
  },
  semesterId,
  type: 'registered'
}, {
  id: "INT3115",
  name: "Thiết kế giao diện người dùng",
  credits: 3,
  score: {
    final: 7.1,
  },
  semesterId,
  type: 'registered'
}, {
  id: "INT3117",
  name: "Kiểm thử và đảm bảo chất lượng phần mềm",
  credits: 3,
  score: {
    final: 8,
  },
  semesterId,
  type: 'registered'
}, {
  id: "INT2211",
  name: "Cơ sở dữ liệu",
  credits: 4,
  score: {
    final: 5,
  },
  semesterId,
  type: 'registered'
}, {
  id: "INT2213",
  name: "Mạng máy tính",
  credits: 4,
  score: {
    final: 1,
  },
  semesterId,
  type: 'registered'
}];

export const mockAllSubjects: SubjectAll[] = [
  {
    id: "HIS1001",
    name: "Lịch sử Đảng Cộng sản Việt Nam",
    credits: 2,
    type: "registered",
    like: 6,
    documents: 652,
    stared: true,
    score: {
      final: 10
    }
  },
  {
    id: 'INT3117',
    name: 'Kiểm thử và đảm bảo chất lượng phần mềm',
    credits: 3,
    type: 'major',
    like: 235,
    documents: 554,
    stared: false,
    lecturers: [],
    score: {
      final: 10
    }
},
  {
    id: 'INT2213',
    name: 'Mạng máy tính',
    credits: 3,
    type: 'registered',
    like: 1133,
    documents: 1313,
    stared: true,
    score: {
      final: 10
    }
  }
];
