
export interface SubjectClass {
    id: string; ///
    lessonStart: number;
    lessonEnd: number;
    group: string;
    name: string;
    place: string;
    credits: number;
    teacherName: string;
    weekDay: number;
    numberOfStudents: number;
    highlightColor: string;
    description?: string
}
