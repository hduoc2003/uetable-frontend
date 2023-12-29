import { DocumentClass, MySubectDocGroup, MySubjectDocument, UserUploadFile } from "@/types/document";
import { delay } from "@/utils/delay";
import { mockMySubectDocGroups } from "./mocks/document";
import Fetcher from "./Fetcher";
import { toast } from "react-toastify";
import _ from "lodash";
import { getExtOfFile } from "@/utils/getExtOfFile";

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

    static async getMySubjectDocs(subjectId: string, myStudentId: string): Promise<MySubectDocGroup[]> {
        try {
            let res = await Fetcher.get<any, {
                id: string,
                name: string,
                link: string,
                studentId: string
                category: string
            }[]
            >
            ('/document/getDocumentOfSubject', {
                params: {
                    subjectId
                }
            });
            res = res.filter((datum) => datum.studentId + '' === myStudentId + '');
            if (res.length === 0)
                return []
            const data = _.map(_.groupBy(res, 'category'), (d, category): MySubectDocGroup => {
                return {
                    category,
                    files: _.map(d, (f): MySubjectDocument => {
                        return {
                            name: f.name,
                            ext: getExtOfFile(f.link).ext.toUpperCase(),
                            id: f.id,
                            link: f.link
                        }
                    })
                }
            })
            return data;
        } catch (error) {
            console.log(error);
            toast.error('Lấy môn học của bạn thất bại')
            throw error;
        }
        // return mockMySubectDocGroups
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
