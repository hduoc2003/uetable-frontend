import { UploadFile } from "antd";

export interface DocumentInfo {
    id: any,
    name: any,
    createdAt: Date,
    like: any,
    download: any,
    category: any,
    link: any,
    userName: any,
    subject: any,
    subjectId: any,
    studentId : any,
    type: string,
}

export interface DocumentClass {
    id: string,
    name: string,
    author: string,
    like: string,
    comment: string,
    download: string,
    subject: string,
    image: string,
}

export interface UserUploadFile {
    docGroup: string;
    files: UploadFile<any>[];
    description?: string;
}

export interface MySubjectDocument {
    id: string;
    link: string;
    name: string;
    ext: string;
}

export interface MySubectDocGroup {
    category: string;
    files: MySubjectDocument[]
}
