import { UploadFile } from "antd";

export interface DocumentInfo {
    id: number,
    name: string,
    createdAt: Date,
    like: number,
    download: number,
    category: string,
    link: string,
    userName: string,
    // subject: any,
    // subjectId: any,
    studentId : string,
    // type: string,
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
    createdAt: string
    link: string
    subjectName: string
    ext: string
}

export interface UserUploadFile {
    category: string;
    files: UploadFile<any>[];
    // description?: string;
    subjectId: string
}

export interface MySubjectDocument {
    id: string;
    link: string;
    name: string;
    ext: string;
    createdAt: Date
}

export interface MySubectDocGroup {
    category: string;
    files: MySubjectDocument[]
}
