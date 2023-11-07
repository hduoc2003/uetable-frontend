import { SubjectClass } from "@/types/subject";
import { time } from "console";
import internal from "stream";

/**
 * thời gian còn lại tính từ hiện tại cho tới thời gian học của lớp đã cho tính bằng giây
 * @param subjectClass thông tin về lớp
 * @returns thời gian còn lại tính từ hiện tại cho tới thời gian học của lớp đó tính bằng giây
 */

export function nowToSubjectClass(subjectClass: SubjectClass): number {
    const currentDate = new Date();
    let currentWeekday = currentDate.getDay();
    currentWeekday += (currentWeekday === 0 ? 8 : 1);

    const targetDate = new Date(currentDate);
    targetDate.setDate(currentDate.getDate() + subjectClass.weekDay - currentWeekday);
    targetDate.setHours(lessonToHour(subjectClass.lessonStart), 0, 0, 0);

    if (targetDate < currentDate)
        targetDate.setDate(targetDate.getDate() + 7)

    return (targetDate.getTime() - currentDate.getTime()) / 1000;
};

/**
 *
 * @param subjectClasses mảng các môn học
 * @returns {
 *      time: Thời gian đến môn học gần nhất,
 *      subjectClass: môn học gần nhất,
 *      index: chỉ số môn học trong mảng
 * } hoặc time = 0 và các trường khác undefined nếu mảng rỗng
 */

export function nowToNextSubjectClass(subjectClasses: SubjectClass[]): {
    time: number
    subjectClass: SubjectClass
    index: number
} {
    if (subjectClasses.length === 0)
        throw new Error('Hàm nowToNextSubjectClass có subjectClasses rỗng')
    let mi: number = 0;
    let minTime = nowToSubjectClass(subjectClasses[0]);

    for (let i = 1; i < subjectClasses.length; ++i) {
        let current = nowToSubjectClass(subjectClasses[i]);
        if (minTime > current) {
            minTime = current;
            mi = i;
        }
    }

    return {
        time: minTime,
        subjectClass: subjectClasses[mi],
        index: mi
    }
}

export function lessonToHour(lesson: number): number {
    return lesson + 6;
}
