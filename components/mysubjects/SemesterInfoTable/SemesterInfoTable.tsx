import useSave from '@/hooks/useSave'
import { SemesterChangeLog, SemesterInfo } from '@/types/semester'
import { RegisteredSubject, LetterGrade } from '@/types/subject'
import { ConfigProvider, Table, Typography } from 'antd'
import Space from 'antd/es/space'
import { ColumnType, ColumnsType } from 'antd/es/table'
import _ from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import TaskBar from './TaskBar'
import SubjectInfo from './SubjectInfo'
import { useRouter } from 'next/navigation'
import { openNewTab } from '@/utils/openNewTab'
import { MySubjectsPageProps } from '@/app/(dashboard)/mysubjects/page'
import SelectedIcon from '@/components/common/(Icons)/SelectedIcon'
import DangerButton from '@/components/common/(MyButton)/DangerButton'

const { Title, Text } = Typography;

interface SemesterInfoProps {
    semesterInfo: SemesterInfo
    onUpdateSemester: (data: SemesterInfo) => Promise<void>
    onDeleteTable: () => void
    semesterMode?: boolean
    loading?: boolean
}

interface TableStat {
    id: keyof Pick<SemesterInfo, 'semesterGPA' | 'yearGPA' | 'sumOfCredits'>
    isStatRow?: true
}

type TableDataSourceType = RegisteredSubject | TableStat;

type ColKey = 'order' |
    'subject-id' |
    'subject-name' |
    'subject-credits' |
    'final-score' |
    'letter-grade' |
    '4-grade' |
    'others-score'

const statResultColSpan = 2;
const tableCols = 8;

export default function SemesterInfoTable({
    semesterInfo: _semesterInfo,
    onUpdateSemester,
    onDeleteTable,
    semesterMode = true,
    loading = false
}: SemesterInfoProps) {
    const {
        data: semesterInfo,
        setData: setSemesterInfo,
        save: saveTable,
        discard: discardTableChange,
        editing,
        startEditing
    } = useSave<SemesterInfo>(_semesterInfo);
    const [dataSource, setDataSource] = useState<TableDataSourceType[]>([])
    const [columns, setColumns] = useState<ColumnsType<TableDataSourceType>>([]);

    useEffect(() => {
        if (semesterMode)
            setDataSource([
                ...(semesterInfo.subjects ?? []),
                { id: 'sumOfCredits' }, { id: 'semesterGPA' }, { id: 'yearGPA' }
            ]);
        else
            setDataSource([
                ...(semesterInfo.subjects ?? []),
                { id: 'sumOfCredits' }, { id: 'yearGPA' }
            ]);
        setColumns([
            getOrderCol('order'),
            getSubjectIdCol('subject-id'),
            getSubjectNameCol('subject-name'),
            getSubjectCreditsCol('subject-credits'),
            getSubject4GradeCol('4-grade'),
            getSubjectFinalScoreCol('final-score'),
            getSubjectLetterGradeCol('letter-grade', semesterInfo),
            getOtherScoreCol('others-score')
        ])
    }, [semesterInfo, semesterMode])

    const [selectedSubjects, setSelectedSubjects] = useState<React.Key[]>([])

    return (
        <div>
            <ConfigProvider
                theme={{
                    components: {
                        Table: {
                            // borderColor: 'rgb(209, 213, 219)',
                            // cellPaddingBlock: 8,
                            // cellPaddingInline: 8
                        }
                    },
                }}
            >
                <Space direction='vertical' size={'small'} className='mt-3 w-full group/table'>
                    <TaskBar
                        editing={editing}
                        title={semesterInfo.title}
                        handleTitleChange={handleTitleChange}
                        startEditing={startEditing}
                        onSave={handleSave}
                        onSaveDone={saveTable}
                        discardChange={discardTableChange}
                        onDeleteTable={onDeleteTable}
                        onAddSubject={() => handleUpdateSubject(new RegisteredSubject(
                            '', '', 0, { final: 0 }, semesterInfo.id
                        ))}
                        semesterMode={semesterMode}
                    />
                    <Table
                        loading={loading}
                        dataSource={dataSource}
                        columns={columns}
                        pagination={false}
                        // bordered
                        rowKey={(subject) => subject.id}
                        size='middle'
                        className='shadow-md'
                        showSorterTooltip={false}
                        scroll={{
                            scrollToFirstRowOnChange: true
                        }}
                        onRow={(data) => (
                            !isStatRow(data) ? {
                                className: 'hover:bg-gray-200 cursor-pointer group',
                                onClick: () => handleUpdateSubject(data)
                            } : {

                            }
                        )}
                        rowSelection={semesterMode ? {
                            renderCell(checked, record, index, originNode) {
                                return !isStatRow(record) ? {
                                    props: {
                                        className: '!rounded-l-lg'
                                    },
                                    children: originNode
                                } : {}
                            },
                            hideSelectAll: true,
                            onChange(selectedRowKeys) {
                                setSelectedSubjects(selectedRowKeys)
                            }
                        } : undefined}
                    />
                    {selectedSubjects.length > 0 &&
                        <div className='flex gap-3 items-center py-2'>
                        <SelectedIcon/>
                        <Text strong className='text-royal-gray flex-1'>{`${selectedSubjects.length} môn học đã chọn`}</Text>
                        <DangerButton onClick={handleDeleteSubject}>Xoá môn học</DangerButton>
                        </div>
                    }

                </Space>
            </ConfigProvider>
            {/* <SubjectInfo
                key={editingSubject.current?.id}
                semesterName={semesterInfo.title}
                subjectInfo={editingSubject.current as RegisteredSubject}
                onSave={(newCompletedSubject) => {
                    // setSemesterInfo(newSemesterInfo);
                    setOpenSubjectInfo(false);
                }}
                onDelete={(subjectId) => {
                    setSemesterInfo({
                        ...semesterInfo,
                        subjects: semesterInfo.subjects.filter((info) => info.id !== subjectId)
                    })
                    setOpenSubjectInfo(false);
                    semesterChange.current.deletedSubject.push(subjectId)
                }}
                open={openSubjectInfo}
                onCancel={() => setOpenSubjectInfo(false)}
            /> */}

        </div>
    )

    function handleTitleChange(title: string) {
        setSemesterInfo({ ...semesterInfo, title });
        startEditing();
    }

    function handleUpdateSubject(subject: RegisteredSubject) {
        openNewTab<MySubjectsPageProps['searchParams']>('/mysubjects', {
            subjectId: subject.id
        })
    }

    function handleDeleteSubject() {
        startEditing();
        setSemesterInfo({
            ...semesterInfo,
            subjects: semesterInfo.subjects.filter((info) => !selectedSubjects.includes(info.id))
        })
        setSelectedSubjects([])
    }

    async function handleSave() {
        await onUpdateSemester(semesterInfo);
    }
}

function LetterGradeTag({
    grade
}: {
    grade: LetterGrade
}) {
    let color: string;
    switch (grade) {
        case 'F':
            color = '#ff7476';
            break;
        case 'D':
        case 'D+':
            color = '#FCCB65';
            break;
        case 'C':
        case 'C+':
            color = '#DB66E4';
            break;
        case 'B':
        case 'B+':
            color = '#2FA4FF';
            break;
        case 'A':
        case 'A+':
            color = '#54E346'
            break;
    }
    return (
        <div className='w-[55px] inline-block rounded' style={{ backgroundColor: color }}>
            <Text
                className='font-bold text-sm'
            >
                {grade}
            </Text>
        </div>
    )
}

const headerStyle: React.CSSProperties = {
    // backgroundColor: 'rgb(229, 231, 235)',
    textAlign: 'center'
}

function CellContent({
    children,
    className
}: {
    children?: React.ReactNode,
    className?: string
}) {
    return (
        <span className={twMerge('text-royal-gray font-semibold', className)}>
            {children}
        </span>
    )
}

const cellStyle: React.CSSProperties = {
    textAlign: 'center',
    fontWeight: 600
}

function isStatRow(data: TableDataSourceType): data is TableStat {
    return !(data instanceof RegisteredSubject)
}

function getOrderCol(key: ColKey): ColumnType<TableDataSourceType> {
    return {
        key,
        title: <CellContent>STT</CellContent>,
        render: (_, data, rowIdx) => {
            let title: string | number = '';
            const statRow = isStatRow(data);
            if (statRow) {
                switch (data.id) {
                    case 'sumOfCredits':
                        title = 'Tổng số tín chỉ';
                        break;
                    case 'semesterGPA':
                        title = 'GPA học kì';
                        break;
                    case 'yearGPA':
                        title = 'GPA năm học'
                        break;
                }
            } else {
                title = rowIdx + 1
            }
            return {
                children: statRow ?
                    <h5 className='text-base ml-3 text-[#3b3f43]'>{title}</h5>
                    : <CellContent>{title}</CellContent>,
                props: {
                    style: statRow ? { ...cellStyle, textAlign: 'left' } : cellStyle,
                    colSpan: statRow ? tableCols - statResultColSpan : 1,
                    // className: statRow ? '' : '!rounded-l-lg'
                }
            }
        },
        onHeaderCell: () => ({
            style: {
                ...headerStyle,
            }
        })
    }
}

function getSubjectIdCol(key: ColKey): ColumnType<TableDataSourceType> {
    return {
        key,
        title: <CellContent>Mã học phần</CellContent>,
        render: (_, data, rowIdx) => ({
            children: <CellContent>{data.id}</CellContent>,
            props: {
                style: cellStyle,
                colSpan: isStatRow(data) ? 0 : 1,
                className: isStatRow(data) ? '' : 'group-hover:ml-2'
            }
        }),
        onHeaderCell: () => ({
            style: {
                ...headerStyle,
                minWidth: 130
            },
        })
    }
}

function getSubjectNameCol(key: ColKey): ColumnType<TableDataSourceType> {
    return {
        key,
        title: <CellContent>Tên học phần</CellContent>,
        render: (_, data, rowIdx) => ({
            children: <CellContent>{(data as RegisteredSubject).name}</CellContent>,
            props: {
                style: {
                    ...cellStyle,
                    textAlign: 'left'
                },
                colSpan: isStatRow(data) ? 0 : 1
            }
        }),
        onHeaderCell: () => ({
            style: {
                ...headerStyle,
                minWidth: 400
            }
        })
    }
}

function getSubjectCreditsCol(key: ColKey): ColumnType<TableDataSourceType> {
    return {
        key,
        title: <CellContent>Số tín chỉ</CellContent>,
        render: (_, data, rowIdx) => ({
            children: isStatRow(data) ? null : data.credits,
            props: {
                style: cellStyle,
                colSpan: isStatRow(data) ? 0 : 1
            }
        }),
        onHeaderCell: () => ({
            style: {
                ...headerStyle,
            }
        })
    }
}


function getSubject4GradeCol(key: ColKey): ColumnType<TableDataSourceType> {
    return {
        key,
        title: <CellContent>Điểm hệ 4</CellContent>,
        render: (_, data, rowIdx) => ({
            children: isStatRow(data) ? null : data.get4Grade(),
            props: {
                style: cellStyle,
                colSpan: isStatRow(data) ? 0 : 1
            }
        }),
        onHeaderCell: () => ({
            style: {
                ...headerStyle,
            }
        })
    }
}

function getSubjectFinalScoreCol(
    key: ColKey,
): ColumnType<TableDataSourceType> {
    return {
        key,
        title: <CellContent>Điểm hệ 10</CellContent>,
        render: (_, data, rowIdx) => ({
            children: isStatRow(data) ? null : data.getFinalScore(),
            props: {
                style: cellStyle,
                colSpan: isStatRow(data) ? 0 : 1
            }
        }),
        onHeaderCell: () => ({
            style: {
                ...headerStyle,
            }
        }),
        sorter: (a, b) => {
            if (isStatRow(a) || isStatRow(b))
                return 0;
            return a.getFinalScore() - b.getFinalScore()
        }
    }
}

function getSubjectLetterGradeCol(key: ColKey, semesterInfo: SemesterInfo): ColumnType<TableDataSourceType> {
    return {
        key,
        title: <CellContent>Điểm chữ</CellContent>,
        render: (_, data, rowIdx) => {
            const statRow = isStatRow(data);
            return ({
                children: statRow ?
                    <Typography.Title level={5} className='!mb-0'>
                        {semesterInfo[data.id]?.toFixed(data.id === 'sumOfCredits' ? 0 : 2)}
                    </Typography.Title>
                    :
                    <LetterGradeTag grade={data.getLetterGrade()} />,
                props: {
                    style: cellStyle,
                    colSpan: statRow ? statResultColSpan : 1
                }
            })
        },
        onHeaderCell: () => ({
            style: {
                ...headerStyle,
            }
        })
    }
}

function getOtherScoreCol(key: ColKey): ColumnType<TableDataSourceType> {
    return {
        key,
        title: <CellContent>Điểm khác</CellContent>,
        render: (_, data, rowIdx) => ({
            children: isStatRow(data) ? null : data.getFinalScore(),
            props: {
                style: cellStyle,
                colSpan: isStatRow(data) ? 0 : 1,
                className: isStatRow(data) ? '' : 'rounded-r-lg'
            }
        }),
        onHeaderCell: () => ({
            style: {
                ...headerStyle,
            }
        })
    }
}
