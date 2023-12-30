import { ScheduleInfo } from "@/types/schedule";
import { THEME } from "@/styles/theme";
import Fetcher from "./Fetcher";
import { SubjectClass } from "@/types/subject";
import { toast } from "react-toastify";

export class ScheduleAPI {
    static async getScheduleInfo(): Promise<ScheduleInfo> {
        try {
            const res = await Fetcher.get<any, SubjectClass[]>('/schedule/getSubjectInWeek');
            console.log(res)
            let scheduleInfo: ScheduleInfo = {
                subjectClassData: res,
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
        } catch (error) {
            console.log(error);
            toast.error('Fetch môn học trong tuần thất bại');
            throw error;
        }
    }
}
