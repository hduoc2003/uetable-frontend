import { DocumentClass, MySubectDocGroup, UserUploadFile } from "@/types/document";
import { delay } from "@/utils/delay";
import { mockMySubectDocGroups } from "./mocks/document";
import Fetcher from "./Fetcher";
import { toast } from "react-toastify";

export class DocumentAPI {

    static async getTopDocumentsOfSubject(subjectId: string, limit: number): Promise<DocumentClass[]> {
        try {
            let res = await Fetcher.get<any, DocumentClass[]>('/document/getDocumentOfSubject', {
                params: {
                    subjectId,
                    limit
                }
            });
            return res;
        } catch (error) {
            console.log(error);
            toast.error('Fetch tài liệu thất bại');
            return []
        }
    }

    static async userUploadFiles(form: UserUploadFile) {
        await delay(2000);
        // Fetcher.post('/fff', data, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // })
    }

    static async getMySubjectDocs(subjectId: string): Promise<MySubectDocGroup[]> {
        await delay(2000);
        return mockMySubectDocGroups
    }

    static async deleteMySubjectDoc(docId: string): Promise<{ok: boolean}> {
        await delay(2000);
        return {
            ok: true
        }
    }

    static async toggleShare(docId: string): Promise<{ok: boolean}> {
        await delay(2000);
        return {
            ok: true
        }
    }
}
