'use client';

import { SubjectClass } from '@/types/subject'
import { Popover, Typography } from 'antd'
import React, { useState } from 'react'
import SubjectClassInfo, { SubjectClassInfoProps } from '../SubjectClassInfo'
import { twMerge } from 'tailwind-merge';
import { lightenDarkenColor } from '@/utils/lightenDarkenColor';
import Link from 'next/link';
import { getURL } from '@/utils/navigation';
import { RegisteredSubjectDetailsPageProps } from '@/app/(dashboard)/mysubjects/registered/details/page';

const { Text, Title } = Typography;

interface ScheduleCellProps {
    subjectClass: SubjectClass
    pattern?: (keyof SubjectClass)[][]
    onMouseEnter?: () => void
    onMouseLeave?: () => void
    onColorChange: SubjectClassInfoProps['onColorChange']
    className?: string
}

export default function ScheduleCellContent({
    subjectClass,
    className,
    onMouseEnter,
    onMouseLeave,
    onColorChange
}: ScheduleCellProps) {
    const [hover, setHover] = useState(false);
    return (
        <Popover
            content={
                <SubjectClassInfo
                    subjectClass={subjectClass}
                    onColorChange={onColorChange}
                />
            }
            placement='top'
            overlayInnerStyle={{
                padding: 0
            }}
            trigger={'hover'}
        >

            <div
                onMouseEnter={() => { onMouseEnter?.(); setHover(true); }}
                onMouseLeave={() => { onMouseLeave?.(); setHover(false) }}
                className={twMerge('flex flex-col rounded-md p-2', className)}
                style={{
                    backgroundColor:
                        hover ? lightenDarkenColor(subjectClass.highlightColor, -20) : subjectClass.highlightColor
                }}
            >
                <Link href={getURL<RegisteredSubjectDetailsPageProps['searchParams']>('/mysubjects/registered/details', {
                    subjectId: subjectClass.id.split(' ')[0]
                })}>
                    <Title level={5} className='!mb-1'>{subjectClass.name}</Title>
                    <Text className='text-xs text-royal-gray font-medium'>
                        {`${subjectClass.place}, Nhóm ${subjectClass.group}`}
                    </Text>
                </Link>
            </div>
        </Popover>
    )
}
