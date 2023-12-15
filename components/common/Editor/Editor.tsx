'use client';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import { StringMap } from 'quill';
import './quill.css'
import dynamic from 'next/dynamic';

// var Size = Quill.import('formats/size');
// Size.whitelist = fontSize;
// Quill.register(Size, true);

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

export default function Editor() {
    return (
        <ReactQuill
            theme="snow"
            modules={modules}
            // value={'hê'}
            onChange={(value) => console.log(value)}
            placeholder="Nhập dữ liệu"
        />
    );
}
