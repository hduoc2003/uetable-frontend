import { UploadFile } from "antd";

export interface DocumentClass {
    id: string;
    name: string;
    like: string;
    comment: string;
    download: string;
    category: string;
    link: string;
}

export interface UserUploadFile {
    docGroup: string;
    files: UploadFile<any>[];
    description?: string;
}

export interface MySubjectDocument {
    shared: boolean;
    id: string;
    link: string;
    name: string;
    ext: string;
}

export interface MySubectDocGroup {
    category: string;
    files: MySubjectDocument[]
}
