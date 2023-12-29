'use client';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import { StringMap } from 'quill';
import './quill.css'
import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import { ReactQuillProps } from 'react-quill';
import EditButton from '../(MyButton)/EditButton';
import { Space, Typography } from 'antd';
import { SaveButton } from '../(MyButton)/SaveButton';
import DangerButton from '../(MyButton)/DangerButton';

const { Text } = Typography;
interface Props {
    defaultEditing?: boolean;
    content: string;
    onSave: (content: string) => void
}

const modules: StringMap = {
    toolbar: [
        [{ header: [6, 5, 4, 3, 2, 1] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ align: ["", "right", "center", "justify"] }],
        // [{size: fontSize}],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
    ],
}

export default function Editor({
    defaultEditing, content, onSave
}: Props) {
    const [editing, setEditing] = useState(defaultEditing);
    const text = useRef<string>('');

    if (!editing)
        return (
            <div
                className='border-transparent hover:border-royal-gray border-2 rounded-lg p-4 flex gap-4'
            >
                <div className="flex-1">
                    {
                        content === ''
                            ?
                            <Text type='secondary' italic>Không có thông tin</Text>
                            :
                            <div dangerouslySetInnerHTML={{ __html: content }} />
                    }
                </div>
                <EditButton iconSize={25} onClick={() => setEditing(true)} />
            </div>
        )
    return (
        <div className='w-full flex flex-col gap-4'>
            <ReactQuill
                theme="snow"
                modules={modules}
                // value={'hê'}
                onChange={(value) => text.current = value}
                placeholder="Nhập dữ liệu"
                value={content}
            // className='w-[500px] h-[500px]'
            />
            <Space className='ml-auto'>
                <DangerButton onClick={() => setEditing(false)}>Huỷ thay đổi</DangerButton>
                <SaveButton onClick={() => {
                    setEditing(false);
                    onSave(text.current)
                }}>Lưu lại</SaveButton>
            </Space>
        </div>
    );
}
