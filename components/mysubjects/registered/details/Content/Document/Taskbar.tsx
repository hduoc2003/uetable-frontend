"use client";

import SearchBar from "@/components/common/SearchBar/SearchBar";
import TitleWithBox from "@/components/common/TitleWithBox";
import UserUpload from "@/components/common/UserUpload";
import { Select, Typography } from "antd";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const { Text } = Typography;

interface Props {
    onSearch: (value: string) => void;
    onGroup: (group: GroupType) => void;
    subjectId: string;
    subjectName: string;
    categories: string[]
}

type GroupType = "category" | "extension";

const groupOptions: { value: GroupType; label: React.ReactNode }[] = [
    {
        value: "category",
        label: <Text strong>Theo nhóm</Text>,
    },
    {
        value: "extension",
        label: <Text strong>Đuôi mở rộng</Text>,
    },
];

export default function Taskbar({ onSearch, onGroup, subjectId, subjectName, categories }: Props) {
    const [groupBy, setGroupBy] = useState<GroupType>("category");
    const debouceSearch = useDebouncedCallback(onSearch, 300);
    // const inputRef = useRef<InputRef>(null);
    return (
        <div className="flex justify-center group/document items-center gap-4 h-max">
            <TitleWithBox title="Tài liệu" />
            <div className="flex-1" >
                <SearchBar
                    className="w-3/4 min-w-[100px] h-[40px]"
                    placeholder="Tìm kiếm tài liệu"
                    onChange={(e) => debouceSearch(e.target.value)}
                />
            </div>
            <UserUpload subjectId={subjectId} subjectName={subjectName} categories={categories}/>
            <Select
                value={groupBy}
                options={groupOptions}
                onChange={(value) => {setGroupBy(value); onGroup(value); }}
                className="h-[35px]"
            />
            {/* <UserUpload uploading={uploading} onCancel={() => setUploading(false)} /> */}
        </div>
    );

}


