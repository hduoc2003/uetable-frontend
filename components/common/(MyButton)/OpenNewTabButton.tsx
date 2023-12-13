import { openNewTab } from "@/utils/navigation";
import { SearchParams } from "@/types/PageProps";
import { Button, Typography } from 'antd'
import React from 'react'
import NewTabIcon from '../(Icons)/NewTabIcon'
import MyButtonWrapper from './MyButtonWrapper';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';

const {Text} = Typography;

export default function OpenNewTabButton<SP extends SearchParams>({
    content,
    url,
    searchParams
}: {
    content: React.ReactNode
    url: string
    searchParams?: SP
}) {
  return (
    <MyButtonWrapper
        onClick={() => openNewTab(url, searchParams)}
        className='border-2 px-2'
    >
        <div className="flex items-center gap-2 text-contrast">
            <Text className='font-semibold text-inherit'>{content}</Text>
            {/* <NewTabIcon/> */}
            <FaArrowUpRightFromSquare size={'1em'}/>
        </div>
    </MyButtonWrapper>
  )
}
