import { CommentType } from "@/types/comment";
import { mockAllSemesterInfo } from "./mocks/semester";
import { RegisteredSubject } from "@/types/subject";
import Fetcher from "./Fetcher";
import { delay } from "@/utils/delay";

interface Data1 {
    semesterInfo: CommentType[]
}
export class CommentAPI {
    static async getCommentByPage(subjectId: string, userId: string, offset: number, limit: number, ): Promise<any[]> {
        try {
            let data = await Fetcher.get<any, any[]>('/page/comment/S/' + subjectId + '/' + userId + '/' + offset + '/' + limit)
            return data;
        } catch (error) {
            console.log(error)
            throw error
        }

    }
}
