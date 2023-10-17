import { Input } from 'antd'
import React from 'react'
import { BiSearchAlt } from "react-icons/bi";

export default function SearchBar({
    onSearch
}: {
    onSearch: (value: string) => void
}): React.JSX.Element {
    return (
        <Input.Search
            placeholder='Tìm kiếm môn học'
            allowClear
            onSearch={onSearch}
            size='large'
            style={{ width: 400 }}
        />
    )
}
