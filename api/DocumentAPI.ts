import { MySubectDocGroup, UserUploadFile } from "@/types/document";
import { delay } from "@/utils/delay";
import { mockMySubectDocGroups } from "./mocks/document";

export class DocumentAPI {
    static async userUploadFiles(form: UserUploadFile) {
        await delay(2000);
        // Fetcher.post('/fff', data, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // })
    }

    static async getMySubjectDocs(subjectIdInDb: string): Promise<MySubectDocGroup[]> {
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
