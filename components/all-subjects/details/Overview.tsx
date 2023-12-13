'use client';

import ClickableText from '@/components/common/ClickableText';
import SearchBar from '@/components/common/SearchBar/SearchBar';
import TitleWithBox from '@/components/common/TitleWithBox'
import { CellContent, LetterGradeTag } from '@/components/mysubjects/SemesterInfoTable/SemesterInfoTable'
import { SubjectAll } from '@/types/subject';
import genId from '@/utils/genId';
import search from '@/utils/search';
import { letterGrade } from '@/utils/subjects';
import { Drawer, List, Skeleton, Space, Table, Typography } from 'antd'
import { isUndefined } from 'lodash';
import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6';
import { useDebouncedCallback } from 'use-debounce';

const { Title, Text } = Typography;

interface Props {
    subject?: SubjectAll
}
type SubjectInfoKey = 'id' | 'credits' | 'gpa' | 'lecturers';
const subjectInfo: SubjectInfoKey[] = ['id', 'credits', 'gpa', 'lecturers'];

export default function Overview({
    subject
}: Props) {
    const [openDrawer, setOpenDrawer] = useState(false);
    const loading = isUndefined(subject);
    return (
        <>
            <div className="flex gap-12">
                <div className='flex flex-col flex-[7] gap-5'>
                    <TitleWithBox
                        title={
                            loading ? <Skeleton.Input active className='!w-[80%]' /> :
                                <div className="flex gap-4 items-center animate__animated animate__fadeIn">
                                    <Title level={3} className="!mb-0">{`${subject?.name}`}</Title>
                                    <LetterGradeTag grade={letterGrade(subject)} className="py-1" />
                                </div>
                        }
                    />
                    <Skeleton round active loading={loading}>
                        {
                            subject?.description ?
                                subject.description
                                :
                                <Text type='secondary' italic strong>Đang cập nhật mô tả</Text>
                        }
                    </Skeleton>

                </div>
                <div className='flex flex-col flex-[3] gap-3'>
                    <TitleWithBox title={'Thông tin'} />
                    <Skeleton round active loading={loading}>
                        <List
                            dataSource={subjectInfo}
                            renderItem={(type) => <Info type={type} subject={subject} onClick={handleOpenDrawer}/>}
                            rowKey={(data) => data}
                            itemLayout='vertical'
                            className=' animate__animated animate__fadeIn'
                        />
                    </Skeleton>

                </div>
            </div>
            <Drawer
                width={500}
                open={openDrawer}
                onClose={handleCloseDrawer}
                closeIcon={false}
            >
                <LecturersList subject={subject}/>
            </Drawer>
        </>
    )

    function handleOpenDrawer() {
        setOpenDrawer(true);
    }

    function handleCloseDrawer() {
        setOpenDrawer(false);
    }
}

function Info({
    type,
    subject,
    onClick
}: {
    type: SubjectInfoKey
    onClick: () => void
} & Props) {
    return (
        <List.Item>
            <Text strong className='whitespace-nowrap'>
                {
                    (() => {
                        switch (type) {
                            case 'id':
                                return `Mã học phần: ${subject?.id}`
                            case 'credits':
                                return `Số tín chỉ: ${subject?.credits}`
                            case 'gpa':
                                return (
                                    <span>
                                        Điểm trung bình: {subject?.GPA ?? <Text type='secondary'>Đang cập nhật</Text>}
                                    </span>
                                )
                            case 'lecturers':
                                return (
                                    <Space>
                                        <ClickableText onClick={onClick}>
                                            Danh sách giảng viên
                                        </ClickableText>
                                        {/* <FaArrowLeft size={'1.3em'}/> */}
                                    </Space>
                                )
                        }
                    })()
                }
            </Text>
        </List.Item>
    )
}

function LecturersList({
    subject
}: Props) {
    const [searchingText, setSearchingText] = useState('');

    const handleSearch = useDebouncedCallback((text: string) => {
        setSearchingText(text)
    }, 300);

    return (
        <Space direction='vertical' size={'large'} className='w-full'>
            <TitleWithBox title='Danh sách giảng viên'/>
            <SearchBar placeholder='Tìm giảng viên' className='w-full h-[40px]' onChange={(e) => handleSearch(e.target.value)}/>
            {
                isUndefined(subject?.lecturers) ?
                <Text type='secondary' italic strong>Danh sách đang cập nhật</Text>
                :
                <Table
                    dataSource={search(searchingText, subject.lecturers, ['name', 'email'])}
                    columns={[{
                        key: 'name',
                        title: 'Tên giảng viên',
                        render(_, lecturer) {
                            return {
                                children: <CellContent>{lecturer.name}</CellContent>
                            }
                        }
                    }, {
                        key: 'email',
                        title: 'Thông tin liên lạc',
                        render(_, lecturer) {
                            return {
                                children: <CellContent>{lecturer.email ?? <Text italic type='secondary'>Đang cập nhật</Text>}</CellContent>
                            }
                        }
                    }]}
                    rowKey={(lecturer) => genId()}
                    pagination={false}
                />

            }
        </Space>
    )
}
