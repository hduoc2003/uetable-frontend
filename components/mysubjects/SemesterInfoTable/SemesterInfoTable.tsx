import useSave from '@/hooks/useSave'
import { SemesterChangeLog, SemesterInfo } from '@/types/semester'
import { CompletedSubject, LetterGrade } from '@/types/subject'
import { ConfigProvider, Table, Typography } from 'antd'
import Space from 'antd/es/space'
import { ColumnType, ColumnsType } from 'antd/es/table'
import _ from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import TaskBar from './TaskBar'
import SubjectInfo from './SubjectInfo'

const { Title, Text } = Typography;

interface SemesterInfoProps {
    semesterInfo: SemesterInfo
    onUpdateSemester: (data: SemesterChangeLog) => void
    onDeleteTable: () => void
    semesterMode?: boolean
}

interface TableStat {
    id: keyof Pick<SemesterInfo, 'semesterGPA' | 'yearGPA' | 'sumOfCredits'>
    isStatRow?: true
}

type TableDataSourceType = CompletedSubject | TableStat;

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
    semesterMode = true
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

    // const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]); // mã những môn được chọn
    const semesterChange = useRef<SemesterChangeLog>({
        title: semesterInfo.title,
        deletedSubject: [],
        updatedSubject: []
    });
    // const rowSelection: TableRowSelection<TableDataSourceType> | undefined = useMemo(() => {
    //     if (!editing)
    //         return undefined;
    //     return {
    //         selectedRowKeys,
    //         onChange: (newSelectedRowKeys) => { setSelectedRowKeys(newSelectedRowKeys) },
    //         selections: [
    //             {
    //                 key: 'erase-row',
    //                 text: <DangerButton>Xoá dòng đã chọn</DangerButton>,
    //                 onSelect: () => {
    //                     // setDataSource(dataSource.filter((data) => {
    //                     //     if (isStatRow(data))
    //                     //         return true;
    //                     //     return !selectedRowKeys.includes(data.id);
    //                     // }));
    //                     semesterChange.current.deletedSubject = selectedRowKeys as string[];
    //                 }
    //             }
    //         ],
    //         columnWidth: 60
    //     }
    // }, [editing, selectedRowKeys]);
    const [openSubjectInfo, setOpenSubjectInfo] = useState(false);
    const editingSubject = useRef<CompletedSubject | null>(null);
    const handleUpdateSubject = (subject: CompletedSubject) => {
        startEditing();
        setOpenSubjectInfo(true);
        editingSubject.current = subject;
    }
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
                <Space direction='vertical' size={'small'} className='mt-3 w-full'>
                    <TaskBar
                        editing={editing}
                        title={semesterInfo.title}
                        handleTitleChange={handleTitleChange}
                        startEditing={startEditing}
                        save={() => { saveTable(); onUpdateSemester(semesterChange.current) }}
                        discardChange={discardTableChange}
                        onDeleteTable={onDeleteTable}
                        onAddSubject={() => handleUpdateSubject(new CompletedSubject(
                            '', '', 0, { final: 0 }
                        ))}
                        semesterMode={semesterMode}
                    />
                    <Table
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
                            !isStatRow(data) && semesterMode ? {
                                className: 'hover:bg-gray-200 cursor-pointer rounded-md group',
                                onClick: () => handleUpdateSubject(data)
                            } : {

                            }
                        )}
                    // rowSelection={rowSelection}
                    />

                </Space>
            </ConfigProvider>
            <SubjectInfo
                key={editingSubject.current?.id}
                semesterName={semesterInfo.title}
                subjectInfo={editingSubject.current as CompletedSubject}
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
            />

        </div>
    )

    function handleTitleChange(title: string) {
        setSemesterInfo({ ...semesterInfo, title });
        semesterChange.current.title = title
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
    return !(data instanceof CompletedSubject)
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
                    className: statRow ? '' : '!rounded-l-lg'
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
            children: <CellContent>{(data as CompletedSubject).name}</CellContent>,
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
            // console.log('vcl')
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
