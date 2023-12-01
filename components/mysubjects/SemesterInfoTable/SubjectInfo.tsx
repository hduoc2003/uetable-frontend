'use client'
import ExclamationIcon from '@/components/common/(Icons)/ExclamationIcon'
import HomeIcon from '@/components/common/(Icons)/NavIcons/HomeIcon'
import DangerButton from '@/components/common/(MyButton)/DangerButton'
import { SaveButton } from '@/components/common/(MyButton)/SaveButton'
import DecorBox from '@/components/common/DecorBox'
import { RegisteredSubject } from '@/types/subject'
import { Divider, Input, Modal, Popover, Space, Tooltip, Typography } from 'antd'
import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'

const { Title, Text } = Typography;

export default function SubjectInfo({
    semesterName,
    subjectInfo,
    onSave,
    onDelete,
    open,
    onCancel
}: {
    semesterName: string,
    subjectInfo: RegisteredSubject | null,
    onSave: (newCompletedSubject: RegisteredSubject) => void,
    onDelete: (subjectId: string) => void
    open: boolean,
    onCancel: () => void
}) {
    const [hoveringRow, setHoveringRow] = useState(-1);
    return (
        <Modal
            title={
                <Title level={3}>
                    <Space size={'middle'}>
                        <DecorBox color='#CABDFF' />
                        {semesterName}
                    </Space>
                </Title>
            }
            open={open}
            onCancel={onCancel}
            footer={[
                <DangerButton key={1} onClick={() => onDelete(subjectInfo?.id as string)}>
                    Xoá môn học
                </DangerButton>
                , <SaveButton
                    key={0}
                    editing={true}
                    onClick={() => { }}
                >
                    Lưu môn học
                </SaveButton>
            ]}
            width={'fit-content'}
        >
            <Divider className='border'/>
            <table>
                <tr key={0} className='group/r1'>
                    <FieldBlock title='Học phần' label='Mã học phần' content={subjectInfo?.id} type='first' className='group-hover/r1:bg-[#F5F6F8]'/>
                    <FieldBlock label='Tên học phần' content={subjectInfo?.name} disable  className='group-hover/r1:bg-[#F5F6F8]'/>
                    <FieldBlock label='Số tín chỉ' content={subjectInfo?.credits} disable type='last'  className='group-hover/r1:bg-[#F5F6F8]'/>
                </tr>
                <tr key={1} className='group/r2'>
                    <FieldBlock title='Điểm tổng kết' label='Điểm hệ 10' content={subjectInfo?.getFinalScore()} type='first' className='group-hover/r2:bg-[#F5F6F8]'/>
                    <FieldBlock label='Điểm hệ 4' content={subjectInfo?.get4Grade()} disable className='group-hover/r2:bg-[#F5F6F8]'/>
                    <FieldBlock label='Điểm chữ' content={subjectInfo?.getLetterGrade()} disable type='last' className='group-hover/r2:bg-[#F5F6F8]'/>
                </tr>
                <tr key={2} className='group/r3'>
                    <FieldBlock
                        title={
                            <Space>
                                <span>Điểm thành phần</span>
                                <Popover title={<span className='text-danger font-base'>*Tổng trọng số điểm phải bằng 1</span>}>
                                    <div><ExclamationIcon/></div>
                                </Popover>
                            </Space>
                        }
                        label='Điểm giữa kì'
                        content={subjectInfo?.score.midTerm?.score ?? 0}
                        type='first'
                        className='group-hover/r3:bg-[#F5F6F8]'
                    />
                    <FieldBlock
                        label='Trọng số'
                        content={subjectInfo?.score.midTerm?.weight ?? 0}
                        type='last'
                        colSpan={2}
                        className='group-hover/r3:bg-[#F5F6F8]'
                    />
                    {/* <FieldBlock label='Điểm chữ' content={subjectInfo?.getLetterGrade()} disable type='last' /> */}
                </tr>
            </table>
        </Modal>
    )
}

function FieldBlock({
    content,
    label,
    disable = false,
    type = 'mid',
    title = 'hiden',
    colSpan = 1,
    className: _className
}: {
    content?: string | number
    label: React.ReactNode
    disable?: boolean
    type?: 'first' | 'mid' | 'last'
    title?: React.ReactNode
    colSpan?: number
    className?: string
}) {
    let className = `border-2 border-gray-300 p-5 mb-6`;
    if (type !== 'last')
        className += ' pr-0 border-r-0'
    if (type !== 'first')
        className += ' border-l-0'
    if (type === 'first')
        className += ' rounded-l-2xl'
    if (type === 'last')
        className += ' rounded-r-2xl'
    return (
        <td className='p-0' colSpan={colSpan}>
            <div className={twMerge(className, _className)}>
                <Space direction='vertical' className='w-full'>
                    {<Title level={5} className={type !== 'first' ? 'invisible' : ''}>{title}</Title>}
                    <div className='flex flex-col gap-1'>
                        <Text type='secondary'>{label}</Text>
                        <Input
                            defaultValue={content}
                            disabled={disable}
                            size='large'
                            className='font-medium'
                            htmlSize={(content + '').length}
                        />
                        {/* <EditableText defaultValue={content as string} normalText={content}/> */}
                    </div>
                </Space>
            </div>
        </td>
    )
}
