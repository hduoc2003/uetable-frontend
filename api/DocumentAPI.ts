import {
    DocumentClass,
    DocumentInfo,
    MySubectDocGroup,
    MySubjectDocument,
    UserUploadFile,
} from "@/types/document";
import { delay } from "@/utils/delay";
import { mockMySubectDocGroups } from "./mocks/document";
import Fetcher from "./Fetcher";
import { toast } from "react-toastify";
import _ from "lodash";
import { getExtOfFile } from "@/utils/getExtOfFile";
import genId from "@/utils/genId";

export class DocumentAPI {
    static async getTopDocumentsOfSubject(
        subjectId: string,
        limit: number
    ): Promise<DocumentClass[]> {
        try {
            let res = await Fetcher.get<any, DocumentClass[]>(
                "/document/getDocumentOfSubject",
                {
                    params: {
                        subjectId,
                        limit,
                    },
                }
            );
            return res;
        } catch (error) {
            console.log(error);
            toast.error("Fetch tài liệu thất bại");
            return [];
        }
    }

    static async userUploadFiles(data: UserUploadFile) {
        const formData = new FormData();
        _.forEach(data, (val, key) => {
            if (typeof val === "string") formData.append(key, val);
            else {
                _.forEach(val, (file) => {
                    if (file.originFileObj) formData.append(file.uid, file.originFileObj);
                });
            }
        });
        // formData.forEach((value, key) => {
        //     console.log(`${key}: ${value}`);
        //   });
        await delay(2000);
        // Fetcher.post('/fff', data, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // })
    }

    static async getMySubjectDocs(
        subjectId: string,
        myStudentId: string
    ): Promise<MySubectDocGroup[]> {
        try {
            let res = await Fetcher.get<
                any,
                {
                    id: string;
                    name: string;
                    link: string;
                    studentId: string;
                    category: string;
                }[]
            >("/document/getDocumentOfSubject", {
                params: {
                    subjectId,
                },
            });
            res = res.filter((datum) => datum.studentId + "" === 21020051 + "");
            if (res.length === 0) return [];
            const data = _.map(
                _.groupBy(res, "category"),
                (d, category): MySubectDocGroup => {
                    return {
                        category,
                        files: _.map(d, (f): MySubjectDocument => {
                            return {
                                name: f.name,
                                ext: getExtOfFile(f.link).ext.toUpperCase(),
                                id: f.id,
                                link: f.link,
                            };
                        }),
                    };
                }
            );
            return data;
        } catch (error) {
            console.log(error);
            toast.error("Lấy môn học của bạn thất bại");
            throw error;
        }
        // return mockMySubectDocGroups
    }

    static async deleteMySubjectDoc(docId: string): Promise<{ ok: boolean }> {
        await delay(2000);
        return {
            ok: true,
        };
    }

    static async getAllDocumentsOfSubject(subjectId: string): Promise<DocumentInfo[]> {
        type g = Omit<DocumentInfo, 'createdAt'> & {createdAt: string}
        try {
            const res = await Fetcher.get<any, g[]>("/document/getDocumentOfSubject", {
                params: {
                    subjectId: subjectId,
                },
            });
            return res.map((val) => ({...val, createdAt: new Date(val.createdAt)}))
        } catch (error) {
            console.log(error);
            toast.error('Fetch document thất bại')
            return []
        }
    }
    static async toggleShare(docId: string): Promise<{ ok: boolean }> {
        await delay(2000);
        return {
            ok: true,
        };
    }
}
