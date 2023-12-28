'use client';
import "react-quill/dist/quill.snow.css";
import TitleWithBox from "@/components/common/TitleWithBox";
import { Space } from "antd";
import Editor from "@/components/common/Editor/Editor";
import { useState } from "react";



export default function Note() {
    const [content, setContent] = useState('')
    return (
        <Space direction="vertical" size={'large'} className="w-full">

            <TitleWithBox title='Ghi chú' />
            <Editor defaultEditing={false} content={content} onSave={(newContent) => setContent(newContent)} />
        </Space>
    );
}

