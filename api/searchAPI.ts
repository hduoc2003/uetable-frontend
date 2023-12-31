import { toast } from "react-toastify";
import Fetcher from "./Fetcher";

export type SearchSubject = {
    id: string;
    name: string;
    credits: number;
    code: string
}

export class SearchAPI {
    static async searchSubjects(subjectName: string): Promise<SearchSubject[]> {
        try {
            let res = await Fetcher.get<any, {
                "Id": number,
                "PageType": string,
                "Name": string,
                "Code": string,
                "Credit": number,
                "MajorId": number
            }[]
            >('/subject/getSubjectByName', {
                params: {
                    name: subjectName
                }
            });
            // console.log(subjectName)
            // console.log(res)
            return res.map((data): SearchSubject => {
                let tmp: SearchSubject = {
                    id: data.Id + '',
                    name: data.Name,
                    credits: data.Credit,
                    code: data.Code
                }
                return tmp
            })

        } catch (error) {
            console.log(error);
            toast.error('Fetch môn học tìm kiếm thất bại')
            return []
        }
    }
}
