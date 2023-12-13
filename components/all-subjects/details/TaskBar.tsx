'use client';

import MyButtonWrapper from "@/components/common/(MyButton)/MyButtonWrapper";
import { SubjectAll } from "@/types/subject";
import { Typography } from "antd";
import { useState } from "react";

const { Text } = Typography;

type ModeKey = 'overview' | 'doc';
const Tab: { key: ModeKey; label: string }[] = [{
    key: 'overview',
    label: 'Tổng quan'
}, {
    key: 'doc',
    label: 'Tài liệu'
}
]

export default function Taskbar({
    subject
}: {
    subject?: SubjectAll
}) {
    const [tab, setTab] = useState<ModeKey>('overview')
    return (
        <div>
            <div className="flex gap-2">
                {
                    Tab.map((option) => {
                        return (
                            <button key={option.key} className={`p-2 rounded-md ${option.key === tab ? 'bg-gray-200' : ''}`}
                                onClick={(e) => { setTab(option.key); }}
                            >
                                <Text strong className={`hover:text-current text-base font-semibold ${option.key === tab ? '' : 'text-royal-gray'}`}>
                                    {option.label}
                                </Text>
                            </button>
                        )
                    })
                }
            </div>
        </div>
    );
}
