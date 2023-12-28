'use client'
import { SaveButton } from '../(MyButton)/SaveButton';
import React, { useEffect, useId, useRef, useState } from 'react';
import { ColorPicker, Table } from 'antd';
import { TableRef, type ColumnsType } from 'antd/es/table';
import ScheduleCell from "./ScheduleCell";
// import { exportComponentAsPNG } from 'react-component-export-image';


// @ts-ignore
import { useDispatch, useSelector } from "react-redux";
import { scheduleDataSelector, scheduleSelector } from "@/redux/schedule/scheduleSelector";
import { scheduleActions } from '@/redux/schedule/scheduleSlice';
import ScheduleSetting from './ScheduleSetting';
import Download from '../(MyButton)/Download';
import { THEME } from '@/styles/theme';
import DangerButton from '../(MyButton)/DangerButton';
import { ScheduleInfo, Weekdays } from '@/types/schedule';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import TitleWithBox from '../TitleWithBox';
import { delay } from '@/utils/delay';
import useSWR from 'swr';
import { ScheduleAPI } from '@/api/scheduleAPI';
import { semesterActions } from '@/redux/semester/semesterSlice';

const numberOfLessons = 12;

interface ScheduleProps {
    onlyViewMode?: boolean
    scale?: number
}

interface TableData {
    lesson: number
}
type ColumnKey = 'lesson' | 'time' | Weekdays

const weekdays: ({ name: string, asNumber: number, key: ColumnKey })[] = [
    {
        name: 'Thứ hai',
        asNumber: 2,
        key: 'monday'
    },
    {
        name: 'Thứ ba',
        asNumber: 3,
        key: 'tuesday'
    },
    {
        name: 'Thứ tư',
        asNumber: 4,
        key: 'wednesday'
    },
    {
        name: 'Thứ năm',
        asNumber: 5,
        key: 'thursday'
    },
    {
        name: 'Thứ sáu',
        asNumber: 6,
        key: 'friday'
    },
    {
        name: 'Thứ bảy',
        asNumber: 7,
        key: 'saturday'
    },
    {
        name: 'Chủ nhật',
        asNumber: 8,
        key: 'sunday'
    }
]

export default function Schedule({
    onlyViewMode = false,
    scale = 1
}: ScheduleProps) {

    const dispatch = useDispatch();
    const {data: scheduleInfo, isLoading} = useSWR<ScheduleInfo>('get schedule info', ScheduleAPI.getScheduleInfo);
    useEffect(() => {
        if (scheduleInfo)
            dispatch(scheduleActions.initData(scheduleInfo))
    }, [dispatch, scheduleInfo])

    let columns: ColumnsType<TableData> = [];
    let data: TableData[] = [];
    const rowId = useId();
    const tableRef = useRef<TableRef>(null);
    const { scheduleStyle, subjectClassData } = useSelector(scheduleDataSelector);
    const { editing } = useSelector(scheduleSelector)
    const cellStyle: Record<'normal' | 'header' | 'lesson' | 'time' | 'divider' | 'subject', React.CSSProperties> = {
        'normal': {},
        'divider': {
            backgroundColor: scheduleStyle.dividerRowColor
        },
        'header': {},
        'lesson': {},
        'time': {},
        'subject': {}
    }
    cellStyle['normal'] = {
        borderColor: scheduleStyle.hasBorder ? THEME.TABLE_BORDER_COLOR : '',
        textAlign: 'left',
        padding: '0px',
        height: 30
    }
    cellStyle['header'] = {
        ...cellStyle['normal'],
        backgroundColor: scheduleStyle.headerRowColor,
        width: 2000,
        textAlign: 'center'
    }
    cellStyle['lesson'] = {
        ...cellStyle['normal'],
        backgroundColor: scheduleStyle.lessonColumnColor,
        textAlign: 'center'
    }
    cellStyle['time'] = {
        ...cellStyle['normal'],
        backgroundColor: scheduleStyle.timeColumnColor,
        textAlign: 'center'
    }
    cellStyle['subject'] = {
        ...cellStyle['normal'],
        // borderRadius: scheduleStyle.roundedBorder ? 6 : 0,
        verticalAlign: 'top'
    }
    const [hoverSubject, setHoverSubject] = useState(-1);

    initData();

    const MainComponent = (
        <div className={`flex flex-col gap-5 scale-[${scale}]`}>
            {!onlyViewMode &&
                <div className="flex gap-5">
                    <TitleWithBox title='Thời khoá biểu' className='flex-1' />
                    {editing &&
                        <>
                            <DangerButton
                                onClick={async () => {
                                    await delay(500);
                                    dispatch(scheduleActions.discardChanges())
                                }}
                                onDoneAnimationEnd={() => {
                                    dispatch(scheduleActions.updateScheduleState({
                                        editing: false
                                    }))
                                }}
                            >
                                Huỷ thay đổi
                            </DangerButton>
                            <SaveButton
                                onClick={async () => {
                                    await delay(500);
                                    dispatch(scheduleActions.saveChanges())
                                }}
                                onDoneAnimationEnd={() => {
                                    dispatch(scheduleActions.updateScheduleState({
                                        editing: false
                                    }))
                                }}
                            >
                                Lưu
                            </SaveButton>
                        </>
                    }

                    <Download onClick={handleDownload}></Download>
                    <ScheduleSetting />
                </div>
            }
            <Table
                loading={isLoading}
                columns={columns.filter((val) => !scheduleStyle.hiddenColumns.includes(val.key as Weekdays))}
                dataSource={data}
                pagination={false}
                bordered={scheduleStyle.hasBorder}
                rowKey={() => rowId}
                ref={tableRef}
            />
        </div>
    );

    async function handleDownload() {
        exportComponentAsPNG(tableRef)
    }
    function isDivider(data: TableData) {
        if (scheduleStyle.hasDivider)
            return data.lesson === -1;
        return false;
    }

    function initData() {
        columns.push({
            title:
                <TableHeader
                    colKey={'lesson'}
                    color={scheduleStyle.lessonColumnColor}
                    onColorPick={(color) => dispatch(scheduleActions.updateScheduleStyle({
                        lessonColumnColor: color
                    }))}
                    onlyViewMode={onlyViewMode}
                >
                    Tiết
                </TableHeader>,
            key: 'lesson',
            onCell: (data) => ({
                style: isDivider(data) ? cellStyle['divider'] : cellStyle['lesson'],
            }),
            render: (_, data) => ({
                children: isDivider(data) ? '' : data.lesson
            })
        });

        columns.push({
            title:
                <TableHeader
                    colKey={'time'}
                    color={scheduleStyle.timeColumnColor}
                    onColorPick={(color) => dispatch(scheduleActions.updateScheduleStyle({
                        timeColumnColor: color
                    }))}
                    onlyViewMode={onlyViewMode}
                >
                    Thời gian
                </TableHeader>,
            key: 'time',
            onCell: (data: TableData) => ({
                style: isDivider(data) ? cellStyle['divider'] : cellStyle['time'],
            }),
            render: (_, data) => ({
                children: isDivider(data) ? '' : `${data.lesson as number + 6}h`
            })
        })

        for (let day of weekdays) {
            columns.push({
                title:
                    <TableHeader
                        colKey={day.key}
                        onlyViewMode={onlyViewMode}
                    >
                        {day.name}
                    </TableHeader>,
                key: day.key,
                render: (_, data: TableData) => {
                    for (let i = 0; i < subjectClassData.length; ++i) {
                        let subject = subjectClassData[i];
                        if (day.asNumber === subject.weekDay) {
                            if (subject.lessonStart === data.lesson) {
                                return {
                                    children:
                                        <div className='flex h-full w-full'>
                                            <div className='w-[2px] h-full' />
                                            <ScheduleCell
                                                subjectClass={subject}
                                                onMouseEnter={() => setHoverSubject(i)}
                                                onMouseLeave={() => setHoverSubject(-1)}
                                                onColorChange={(_, color) => {
                                                    dispatch(scheduleActions.updateScheduleSubjects({
                                                        index: i,
                                                        newProps: {
                                                            highlightColor: color
                                                        }
                                                    }))
                                                }}
                                                className='flex-1'
                                            />
                                            <div className='w-[2px] h-full' />
                                        </div>
                                }
                            }
                        }
                    }
                },
                onCell: (data) => {
                    for (let i = 0; i < subjectClassData.length; ++i) {
                        let subject = subjectClassData[i];
                        if (day.asNumber === subject.weekDay) {
                            if (subject.lessonStart === data.lesson)
                                return {
                                    rowSpan: subject.lessonEnd - subject.lessonStart + 1,
                                    style: {
                                        ...cellStyle['subject'],
                                        cursor: 'pointer'
                                    }
                                }
                            if (subject.lessonStart < data.lesson && data.lesson <= subject.lessonEnd)
                                return {
                                    rowSpan: 0,
                                    style: cellStyle['normal']
                                }
                        }
                    }
                    return {
                        style: isDivider(data) ? cellStyle['divider'] : cellStyle['normal']
                    }
                }
            })
        }

        for (let i = 0; i < columns.length; ++i)
            columns[i].onHeaderCell = (colIndex) => ({
                style: {
                    ...cellStyle['header'],
                    ...(i === 0 ? {
                        width: 50,
                        minWidth: 50
                    } : (i === 1 ? {
                        width: 100,
                        minWidth: 100
                    } : {}))
                }
            })

        for (let i = 1; i <= numberOfLessons; ++i) {
            data.push({
                lesson: i
            })
            if (scheduleStyle.hasDivider && i === 6)
                data.push({
                    lesson: -1
                })
        }
    }
    return MainComponent;
}

const settingIconColor = 'black';

function isWeeksday(col: ColumnKey): col is Weekdays {
    return col !== 'lesson' && col !== 'time'
}

function TableHeader({
    children,
    color,
    colKey,
    onColorPick,
    onlyViewMode
}: {
    children: React.ReactNode
    color?: string
    colKey: ColumnKey
    onColorPick?: (pickedColor: string) => void
    onlyViewMode: boolean;
}) {
    const [hovering, setHovering] = useState(false);
    const dispatch = useDispatch();
    if (onlyViewMode)
        return children
    return (
        <div className={'relative group/header'}>
            {isWeeksday(colKey) ?
                <>
                    {children}
                    <button
                        className='absolute right-1 -translate-y-1/2 top-1/2 opacity-0 group-hover/header:opacity-100 transition-opacity duration-300'
                        onMouseEnter={() => setHovering(true)}
                        onMouseLeave={() => setHovering(false)}
                        onClick={() => dispatch(scheduleActions.addHiddenColumns(colKey))}
                    >
                        {!hovering ?
                            // <EyeIcon solidOnHover size={17} />
                            <IoMdEye size={20} />
                            :
                            <IoMdEyeOff size={20} />
                        }
                    </button>
                </>
                :
                <ColorPicker value={color} onChange={(_, pickedColor) => onColorPick?.(pickedColor)}>
                    <button>{children}</button>
                </ColorPicker>
            }
        </div>
    )
    // const items: MenuProps['items'] = [
    //     {
    //         key: 'hide_column',
    //         label: 'Ẩn cột',
    //         onClick: () => onHideColumn(colKey)
    //     },
    // ];
    // const [openDropDown, setOpenDropDown] = useState(false);
    // const [openColorPicker, setOpenColorPicker] = useState(false);

    // if (colorPicker)
    //     items.push({
    //         key: 'color_picker',
    //         label:
    //             <Space
    //                 onMouseEnter={() => setOpenColorPicker(true)}
    //                 onMouseLeave={() => setOpenColorPicker(false)}
    //             >
    //                 Chọn màu
    //                 <ColorPicker
    //                     value={color}
    //                     onChange={(_, pickedColor) => onColorPick?.(pickedColor)}
    //                     trigger='hover'
    //                     open={openColorPicker}
    //                     arrow={false}
    //                 />
    //             </Space>,
    //         onClick: () => setOpenDropDown(true)
    //     })

    // const [hoverSetting, setHoverSetting] = useState(false);

    // return (
    //     <div className={`flex justify-center items-center relative p-[5px]`}
    //     >
    //         <div className="flex-1">{children}</div>
    //         {displaySetting &&
    //             <ConfigProvider
    //                 theme={{
    //                     components: {
    //                         Dropdown: {
    //                             zIndexPopup: 0
    //                         }
    //                     }
    //                 }}
    //             >
    //                 <Dropdown
    //                     menu={{ items }}
    //                     open={openDropDown}
    //                     onOpenChange={(flag) => setOpenDropDown(flag)}
    //                 >
    //                     <div
    //                         onMouseEnter={() => setHoverSetting(true)}
    //                         onMouseLeave={() => setHoverSetting(false)}
    //                     >
    //                         <AiTwotoneSetting
    //                             size={17}
    //                             color={hoverSetting ? LightenDarkenColor(settingIconColor, 80) : settingIconColor}
    //                         />
    //                     </div>
    //                 </Dropdown>
    //             </ConfigProvider>
    //         }
    //     </div>
    // )
}
