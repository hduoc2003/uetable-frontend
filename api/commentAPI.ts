import { CommentInfoType } from "@/types/comment";
import Fetcher from "./Fetcher";

interface Data1 {
    semesterInfo: CommentInfoType[]
}
export class CommentAPI {
    static async getCommentByPage(pageType: string, pageId: string, offset: number, limit: number): Promise<Data1> {
        try {
            const uri = `/page/comment/${pageType}/${pageId}/${offset}/${limit}`
            console.log(uri)
            let data = await Fetcher.get<unknown, Data1>(uri);
            // data.semesterInfo.forEach((sem) => {
            //     sem.subjects.forEach((sub) => {
            //         sub.type = 'registered'
            //     })
            // })
            console.log(data)
            // data.semesterInfo.reverse();
            return data;
        } catch (error) {
            console.log(error)
            throw error
        }

    }
}
