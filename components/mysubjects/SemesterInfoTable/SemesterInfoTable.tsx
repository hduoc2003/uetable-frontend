import { SemesterInfo } from '@/types/semester'
import { RegisteredSubject, LetterGrade } from '@/types/subject'
import { ConfigProvider, Table, Typography } from 'antd'
import Space from 'antd/es/space'
import { ColumnType, ColumnsType } from 'antd/es/table'
import _, { isUndefined } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import TaskBar from './TaskBar'
import SubjectInfo from './SubjectInfo'
import SelectedIcon from '@/components/common/(Icons)/SelectedIcon'
import DangerButton from '@/components/common/(MyButton)/DangerButton'
import { useDispatch, useSelector } from 'react-redux'
import { selectRootSemester, selectSemesterById, selectTotalGPA } from '@/redux/semester/semesterSelector'
import { RootState, useThunkDispatch } from '@/redux/store'
import { allSemesterMode } from '@/utils/semester'
import { crudSubjectThunk } from '@/redux/semester/actions/crudSubject'
import search from '@/utils/search'
import genId from '@/utils/genId'
import { get4Grade, getFinalScore, getLetterGrade } from '@/utils/subjects'
import { SubjectAllAPI } from '@/api/subjectAPI'
import { allSubjectsActions } from '@/redux/allsubjects/allSubjectsSlice'

const { Title, Text } = Typography;

interface SemesterInfoProps {
    loading?: boolean
    searchingSubject: string
}

interface TableStat {
    id: (keyof Pick<SemesterInfo, 'semesterGPA' | 'yearGPA' | 'sumOfCredits'>) | 'totalGPA';
    isStatRow: true
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

function getRowKey(tableDataSource: TableDataSourceType) {
    if (isStatRow(tableDataSource))
        return tableDataSource.id;

}

export default function SemesterInfoTable({
    loading: _loading = false,
    searchingSubject
}: SemesterInfoProps) {
    const dispatch = useDispatch();
    const thunkDispatch = useThunkDispatch();
    const { currentId, pending } = useSelector(selectRootSemester);
    const totalGPA: number = useSelector(selectTotalGPA)
    const { semesterInfo } = useSelector((state: RootState) => selectSemesterById(state, currentId))

    const [dataSource, setDataSource] = useState<TableDataSourceType[]>([])
    const [columns, setColumns] = useState<ColumnsType<TableDataSourceType>>([]);
    const [editingSubject, setEditingSubject] = useState<RegisteredSubject>()
    const [openSubjectInfo, setOpenSubjectInfo] = useState(false);
    const [loading, setLoading] = useState(_loading);
    const [selectedSubjects, setSelectedSubjects] = useState<React.Key[]>([])


    useEffect(() => {
        let filtered = search<RegisteredSubject>(searchingSubject, semesterInfo.subjects, ['id', 'name']);
        // for (let i = 0; i < filtered.length; ++i)
        //     filtered[i].id = genId();
        if (!allSemesterMode(currentId))
            setDataSource([
                ...filtered,
                { id: 'sumOfCredits', isStatRow: true },
                { id: 'semesterGPA', isStatRow: true },
                { id: 'yearGPA', isStatRow: true },
                { id: 'totalGPA', isStatRow: true}
            ]);
        else
            setDataSource([
                ...filtered,
                { id: 'sumOfCredits', isStatRow: true },
                { id: 'totalGPA', isStatRow: true }
            ]);
        setColumns([
            getOrderCol('order'),
            getSubjectIdCol('subject-id'),
            getSubjectNameCol('subject-name'),
            getSubjectCreditsCol('subject-credits'),
            getSubject4GradeCol('4-grade'),
            getSubjectFinalScoreCol('final-score'),
            getSubjectLetterGradeCol('letter-grade', semesterInfo, totalGPA),
            // getOtherScoreCol('others-score')
        ])
    }, [currentId, searchingSubject, semesterInfo, totalGPA])

    useEffect(() => {
        SubjectAllAPI.getAllSubjects()
        .then((data) => {
            dispatch(allSubjectsActions.initData(data))
        })
    }, [dispatch]);

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
                        onAddSubject={() => handleClickSubject({
                            id: genId(),
                            code: '',
                            type: 'registered',
                            semesterId: semesterInfo.id,
                            score: {
                                final: 0
                            },
                            name: '',
                            credits: 0
                        })}
                    />
                    <Table
                        loading={loading || pending}
                        dataSource={dataSource}
                        columns={columns}
                        pagination={false}
                        // bordered
                        rowKey={(subject) => isStatRow(subject) ? subject.id : subject.code}
                        size='middle'
                        className='shadow-md'
                        showSorterTooltip={false}
                        scroll={{
                            scrollToFirstRowOnChange: true
                        }}
                        onRow={(data) => (
                            !isStatRow(data) ? {
                                className: 'hover:bg-gray-200 cursor-pointer group',
                                onClick: () => handleClickSubject(data)
                            } : {

                            }
                        )}
                        rowSelection={!allSemesterMode(currentId) ? {
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
                            <SelectedIcon />
                            <Text strong className='text-royal-gray flex-1'>{`${selectedSubjects.length} môn học đã chọn`}</Text>
                            <DangerButton onClick={handleDeleteSubject}>Xoá môn học</DangerButton>
                        </div>
                    }

                </Space>
            </ConfigProvider>
            {
                <SubjectInfo
                    // key={(editingSubject?.id ?? '') + editingSubject?.getFinalScore?.()}
                    // key={editingSubject.current?.id ?? ''}
                    semesterName={semesterInfo.title}
                    subjectInfo={editingSubject}
                    onSave={(newSubject) => {
                        setOpenSubjectInfo(false);
                        thunkDispatch(crudSubjectThunk({
                            type: editingSubject?.code === '' ? 'add' : 'update',
                            subject: newSubject
                        }))
                    }}
                    open={openSubjectInfo}
                    onCancel={() => setOpenSubjectInfo(false)}
                />
            }
        </div>
    )

    function handleClickSubject(subject: RegisteredSubject) {
        setEditingSubject(subject);
        setOpenSubjectInfo(true);
    }

    function handleDeleteSubject() {
        thunkDispatch(crudSubjectThunk({
            type: 'delete',
            subject: selectedSubjects as string[]
        }))
        setSelectedSubjects([])
    }
}

export function LetterGradeTag({
    grade,
    className
}: {
    grade: LetterGrade,
    className?: string
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
        case 'Chưa hoàn thành':
            color = '#e1e1e1';
            break;
    }
    return (
        <div className={twMerge('h-fit max-w-fit min-w-[55px] px-4 flex items-center justify-center rounded', className)} style={{ backgroundColor: color }}>
            <Text
                className='font-bold text-sm whitespace-nowrap'
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

export function CellContent({
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
    return 'isStatRow' in data;
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
                    case 'totalGPA':
                        title = 'GPA tổng';
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
            children: <CellContent>{isStatRow(data) ? '' : data.code}</CellContent>,
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
            children: isStatRow(data) ? null : get4Grade(data),
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
            children: isStatRow(data) ? null : getFinalScore(data),
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
            return getFinalScore(a) - getFinalScore(b)
        }
    }
}

function getSubjectLetterGradeCol(key: ColKey, semesterInfo: SemesterInfo, totalGPA: number): ColumnType<TableDataSourceType> {
    return {
        key,
        title: <CellContent>Điểm chữ</CellContent>,
        render: (_, data, rowIdx) => {
            const statRow = isStatRow(data);
            return ({
                children: statRow ?
                    <Typography.Title level={5} className='!mb-0'>
                        {
                            (data.id === 'totalGPA' ? totalGPA : semesterInfo[data.id])?.toFixed(data.id === 'sumOfCredits' ? 0 : 2)
                        }
                    </Typography.Title>
                    :
                    <div className='inline-block'><LetterGradeTag grade={getLetterGrade(data)} /></div>,
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
            children: isStatRow(data) ? null : getFinalScore(data),
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
