'use client'
import { MySubjectsPageProps } from '@/app/(dashboard)/mysubjects/page'
import ExclamationIcon from '@/components/common/(Icons)/ExclamationIcon'
import OpenNewTabButton from '@/components/common/(MyButton)/OpenNewTabButton'
import { SaveButton } from '@/components/common/(MyButton)/SaveButton'
import DecorBox from '@/components/common/DecorBox'
import { selectNotRegisteredSubjects } from '@/redux/allsubjects/allSubjectsSelector'
import { selectRootSemester } from '@/redux/semester/semesterSelector'
import { RegisteredSubject } from '@/types/subject'
import { allSemesterMode } from '@/utils/semester'
import strNormalize from '@/utils/strNormalize'
import { get4Grade, getFinalScore, getLetterGrade } from '@/utils/subjects'
import { AutoComplete, Divider, Form, Input, Modal, Popover, Space, Typography } from 'antd'
import _, { isUndefined } from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { twMerge } from 'tailwind-merge'
import { useDebouncedCallback } from 'use-debounce'

const { Title, Text } = Typography;

interface FormValue {
    id: string
    code: string
    name: string
    credits: string
    finalScore: string
    '4score': string
    'letter-score': string
    midTermScore: string
    midTermW: string
    finalTermScore: string
    finalTermW: string
    otherTermScore: string
    otherTermW: string
}

export default function SubjectInfo({
    semesterName,
    subjectInfo,
    onSave,
    open,
    onCancel
}: {
    semesterName: string,
    subjectInfo?: RegisteredSubject,
    onSave: (newCompletedSubject: RegisteredSubject) => void,
    open: boolean,
    onCancel: () => void
}) {
    return (
        <Modal
            title={
                <div className='flex items-center'>
                    <Title level={3} className='flex-1 !mb-0'>
                        <Space size={'middle'}>
                            <DecorBox />
                            {subjectInfo?.name || 'Thêm môn học'}
                        </Space>
                    </Title>
                    {subjectInfo?.code &&
                        <OpenNewTabButton<MySubjectsPageProps['searchParams']>
                            content={subjectInfo?.code}
                            url='/mysubjects'
                            searchParams={{ 'subjectId': subjectInfo?.code ?? 'vcl' }}
                        />
                    }
                </div>
            }
            open={open}
            onCancel={onCancel}
            footer={[]}
            width={'fit-content'}
            closeIcon={false}
            destroyOnClose
        >
            <Content onSave={onSave} subjectInfo={subjectInfo} />
        </Modal>
    )
}

function Content({
    subjectInfo,
    onSave,
}: {
    subjectInfo?: RegisteredSubject,
    onSave: (newCompletedSubject: RegisteredSubject) => void
}) {
    const { currentId } = useSelector(selectRootSemester);
    const [form] = Form.useForm<FormValue>();
    const allSubjects = useSelector(selectNotRegisteredSubjects);
    const initialValues: FormValue | undefined = isUndefined(subjectInfo) ? undefined : {
        id: subjectInfo.id,
        code: subjectInfo?.code,
        name: subjectInfo?.name,
        credits: '' + subjectInfo?.credits,
        finalScore: '' + getFinalScore(subjectInfo),
        '4score': '' + get4Grade(subjectInfo),
        'letter-score': '' + getLetterGrade(subjectInfo),
        midTermScore: '' + (subjectInfo?.score.midTerm?.score ?? 0),
        midTermW: '' + (subjectInfo?.score.midTerm?.weight ?? 0),
        finalTermScore: '' + (subjectInfo?.score.finalTerm?.score ?? 0),
        finalTermW: '' + (subjectInfo?.score.finalTerm?.weight ?? 0),
        otherTermScore: '' + (subjectInfo?.score.otherTerm?.score ?? 0),
        otherTermW: '' + (subjectInfo?.score.otherTerm?.weight ?? 0)
    }
    const handleSubmit = (value: FormValue) => {
        onSave({
            id: value.id,
            code: value.code.trim(),
            name: value.name,
            credits: +value.credits,
            score: {
                final: +value.finalScore,
                midTerm: {
                    score: +value.midTermScore,
                    weight: +value.midTermW
                },
                finalTerm: {
                    score: +value.finalTermScore,
                    weight: +value.finalTermW
                },
                otherTerm: {
                    score: +value.otherTermScore,
                    weight: +value.otherTermW
                }
            },
            semesterId: subjectInfo?.semesterId || '',
            type: 'registered'
        })
    }

    const handleChangeCode = useDebouncedCallback((code: string) => {
        const subject = _.find(allSubjects, (subject) => subject.code === code);
        form.setFieldValue('name', subject?.name ?? '');
        form.setFieldValue('credits', subject?.credits ?? 0)
        form.setFieldValue('id', subject?.id ?? '')
    }, 300);

    return (
        <Form<FormValue>
            // key={1}
            form={form}
            name="subject"
            onFinish={handleSubmit}
            initialValues={initialValues}
            className='flex flex-col'
        >
            <Divider className='border' />
            <Form.Item name={'id'} hidden/>
            <table>
                <tbody>
                    <tr key={0} className='group/r1'>
                        <FieldBlock formNames={['code']} onChangeCode={handleChangeCode} isNewSubject={subjectInfo?.code === ''} title='Học phần' labels={['Mã học phần']} disable={subjectInfo?.code !== ''} contents={[subjectInfo?.code]} type='first' className='group-hover/r1:bg-[#F5F6F8]' />
                        <FieldBlock labels={['Tên học phần']} contents={[subjectInfo?.name]} disable className='group-hover/r1:bg-[#F5F6F8]' formNames={['name']} />
                        <FieldBlock labels={['Số tín chỉ']} contents={[subjectInfo?.credits]} disable type='last' className='group-hover/r1:bg-[#F5F6F8]' formNames={['credits']} />
                    </tr>
                    <tr key={1} className='group/r2'>
                        <FieldBlock title='Điểm tổng kết' labels={['Điểm hệ 10']} contents={[getFinalScore(subjectInfo)]} type='first' className='group-hover/r2:bg-[#F5F6F8]' formNames={['finalScore']} />
                        <FieldBlock labels={['Điểm hệ 4']} contents={[get4Grade(subjectInfo)]} disable className='group-hover/r2:bg-[#F5F6F8]' formNames={['4score']} />
                        <FieldBlock labels={['Điểm chữ']} contents={[getLetterGrade(subjectInfo)]} disable type='last' className='group-hover/r2:bg-[#F5F6F8]' formNames={['letter-score']} />
                    </tr>
                    <tr key={2} className='group/r3'>
                        <FieldBlock
                            title={
                                <Space>
                                    <span>Điểm thành phần</span>
                                    <Popover title={<span className='text-danger font-base'>*Tổng trọng số điểm phải bằng 1</span>}>
                                        <div><ExclamationIcon /></div>
                                    </Popover>
                                </Space>
                            }
                            labels={['Điểm giữa kì', 'Điểm cuối kì', 'Điểm thành phần']}
                            contents={[subjectInfo?.score.midTerm?.score ?? 0, subjectInfo?.score.finalTerm?.score ?? 0, subjectInfo?.score.otherTerm?.score ?? 0]}
                            formNames={['midTermScore', 'finalTermScore', 'otherTermScore']}
                            type='first'
                            className='group-hover/r3:bg-[#F5F6F8]'
                        />
                        <FieldBlock
                            labels={['Trọng số', 'Trọng số', 'Trọng số']}
                            contents={[subjectInfo?.score.midTerm?.weight ?? 0, subjectInfo?.score.finalTerm?.weight ?? 0, subjectInfo?.score.otherTerm?.weight ?? 0]}
                            formNames={['midTermW', 'finalTermW', 'otherTermW']}
                            type='last'
                            colSpan={2}
                            className='group-hover/r3:bg-[#F5F6F8]'
                        />
                    </tr>
                </tbody>
            </table>
            {!allSemesterMode(currentId) &&
                <SaveButton className='self-end' onClick={form.submit}>
                    Lưu môn học
                </SaveButton>
            }
        </Form>

    )
}
function FieldBlock({
    formNames,
    contents,
    labels,
    disable = false,
    type = 'mid',
    title = 'hiden',
    colSpan = 1,
    className: _className,
    onChangeCode,
    isNewSubject = false
}: {
    formNames: (keyof FormValue)[]
    contents?: (string | number | undefined)[]
    labels: React.ReactNode[]
    disable?: boolean
    type?: 'first' | 'mid' | 'last'
    title?: React.ReactNode
    colSpan?: number
    className?: string
    onChangeCode?: (code: string) => void
    isNewSubject?: boolean
}) {
    const { currentId } = useSelector(selectRootSemester);
    const allSubjects = useSelector(selectNotRegisteredSubjects);
    console.log(allSubjects)
    const options = useMemo<{value: string; label: string}[]>(() => {
        return allSubjects.map((subject, idx) => ({
            value: subject.code,
            label: `${subject.code} - ${subject.name}`
        }))
    }, [allSubjects]);
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
                    {
                        contents?.map((content, idx) => {
                            return (
                                <div className='flex flex-col gap-1' key={idx}>
                                    <Text type='secondary'>{labels[idx]}</Text>
                                    <Form.Item<FormValue>
                                        name={formNames[idx]}
                                        className='mb-0'
                                        rules={[{ required: true, message: '' }]}
                                    >
                                        {
                                            formNames[idx] === 'code'  && isNewSubject ?
                                            <AutoComplete
                                                disabled={disable}
                                                placeholder='Nhập tên hoặc mã môn học'
                                                size='large'
                                                options={options}
                                                style={{width: 200}}
                                                filterOption={(inputValue, option) => {
                                                    if (isUndefined(option))
                                                        return true;
                                                    return strNormalize(option.label).includes(strNormalize(inputValue))
                                                }}
                                                popupMatchSelectWidth={false}
                                                // onChange={(value) => {
                                                //     console.log(value)
                                                // }}
                                                onChange={onChangeCode}
                                            />
                                            :
                                            <Input
                                                disabled={disable || allSemesterMode(currentId)}
                                                size='large'
                                                className='font-medium'
                                                htmlSize={(content + '').length}
                                            />
                                        }
                                    </Form.Item>
                                    {/* <EditableText defaultValue={content as string} normalText={content}/> */}
                                </div>
                            )
                        })
                    }
                </Space>
            </div>
        </td>
    )
}
