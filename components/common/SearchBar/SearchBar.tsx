import { Input, InputProps } from 'antd'
import React from 'react'
import { twMerge } from 'tailwind-merge';
import SearchIcon from '../(Icons)/SearchIcon';
import './searchbar.css'

export default function SearchBar(props: InputProps): React.JSX.Element {
    return (
        <Input
            size='large'
            placeholder='Tìm kiếm'
            allowClear
            prefix={<SearchIcon className='hover:fill-[#1A1D1F]'/>}
            classNames={{
                input: 'bg-[#F4F4F4]'
            }}
            // bordered={false}
            {...props}
            className={twMerge('bg-[#F4F4F4] w-[400px] hover:border-2 rounded-xl h-12 border-2 border-transparent', props.className)}
        />
    )
}
