import Schedule from "@/components/common/Schedule/Schedule";
import { ScheduleInfo } from "@/types/schedule";
import { mockSubjectClasses } from "./mocks/subject";
import { THEME } from "@/styles/theme";

export function getScheduleInfo(shouldDispatch: boolean = true): ScheduleInfo {
    let scheduleInfo: ScheduleInfo = {
        subjectClassData: mockSubjectClasses,
        scheduleStyle: {
            hasBorder: false,
            roundedBorder: true,
            lessonColumnColor: "#FEF2CB",
            timeColumnColor: "#FFD965",
            headerRowColor: THEME.PRIMARY_COLOR,
            dividerRowColor: "#262626",
            hasDivider: true,
            displayColumnSettings: false,
        }
    }

    return scheduleInfo;
}
