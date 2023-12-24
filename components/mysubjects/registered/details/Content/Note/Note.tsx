'use client';
import "react-quill/dist/quill.snow.css";
import TitleWithBox from "@/components/common/TitleWithBox";
import { Space } from "antd";
import Editor from "@/components/common/Editor/Editor";



export default function Note() {
    return (
        <Space direction="vertical" size={'large'} className="w-full">

            <TitleWithBox title='Ghi chú' />
            <Editor />
        </Space>
    );
}
