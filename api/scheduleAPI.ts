import { ScheduleInfo } from "@/types/schedule";
import { mockSubjectClasses } from "./mocks/subject";
import { THEME } from "@/styles/theme";
import { delay } from "@/utils/delay";

export class ScheduleAPI {
    static async getScheduleInfo(): Promise<ScheduleInfo> {
        await delay(2000)

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
                hiddenColumns: []
            }
        }
        return scheduleInfo;
    }
}
