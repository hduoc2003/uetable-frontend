import { SaveButton } from '../(MyButton)/SaveButton';
import React, { useId, useState } from 'react';
import { Button, ColorPicker, ConfigProvider, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import ScheduleCell from "./ScheduleCell";
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { AiTwotoneSetting } from "react-icons/ai";
import MyCheckbox from "../Checkbox";
// @ts-ignore
import { LightenDarkenColor } from 'lighten-darken-color';
import { useDispatch, useSelector } from "react-redux";
import { scheduleDataSelector, scheduleSelector } from "@/redux/schedule/scheduleSelector";
import { scheduleActions } from '@/redux/schedule/scheduleSlice';
import ScheduleSetting from './ScheduleSetting';
import Download from '../(MyButton)/Download';
import { THEME } from '@/styles/theme';
import DangerButton from '../(MyButton)/DangerButton';

const numberOfLessons = 12;

interface ScheduleProps {
    onlyViewMode?: boolean
    scale?: number
}

interface TableData {
    lesson: number
}
type ColumnKey = 'lesson' | 'time' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
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
    let columns: ColumnsType<TableData> = [];
    let data: TableData[] = [];
    const rowId = useId();
    const { scheduleStyle, subjectClassData } = useSelector(scheduleDataSelector);
    const { editing } = useSelector(scheduleSelector)
    const [hidenColumns, setHidenColumns] = useState<(React.Key | undefined)[]>([]);
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
    const dispatch = useDispatch();
    const [hoverSubject, setHoverSubject] = useState(-1);

    const handleHideColumn = (colKey: React.Key) => {
        setHidenColumns([...hidenColumns, colKey]);
    }

    initData();

    const MainComponent = (
        <div className={`flex flex-col gap-3 scale-[${scale}]`}>
            {!onlyViewMode &&
                <div className="flex gap-5">
                    <div className="flex-1">
                        <MyCheckbox
                            checked={scheduleStyle.displayColumnSettings}
                            onClick={() => dispatch(scheduleActions.updateScheduleStyle({
                                displayColumnSettings: !scheduleStyle.displayColumnSettings
                            }))}
                        >
                            <div className="font-semibold">Hiện cài đặt cột</div>
                        </MyCheckbox>
                    </div>
                    <DangerButton
                        onClick={() => {
                            dispatch(scheduleActions.discardChanges())
                            dispatch(scheduleActions.updateScheduleState({
                                editing: false
                            }))
                        }}
                        disable={!editing}
                    >
                        Huỷ thay đổi
                    </DangerButton>
                    <SaveButton
                        onClick={() => {
                            dispatch(scheduleActions.saveChanges())
                            dispatch(scheduleActions.updateScheduleState({
                                editing: false
                            }))
                        }}
                    >
                        Lưu
                    </SaveButton>

                    <Download></Download>
                    <ScheduleSetting onHideColumn={() => setHidenColumns([])} />
                </div>
            }
            <Table
                columns={columns.filter((val) => !hidenColumns.includes(val.key))}
                dataSource={data}
                pagination={false}
                bordered={scheduleStyle.hasBorder}
                rowKey={() => rowId}
            />
        </div>
    );

    function isDivider(data: TableData) {
        if (scheduleStyle.hasDivider)
            return data.lesson === -1;
        return false;
    }

    function initData() {
        columns.push({
            title:
                <TableHeader
                    colorPicker
                    colKey={'lesson'}
                    displaySetting={scheduleStyle.displayColumnSettings}
                    onHideColumn={handleHideColumn}
                    color={scheduleStyle.lessonColumnColor}
                    onColorPick={(color) => dispatch(scheduleActions.updateScheduleStyle({
                        lessonColumnColor: color
                    }))}
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
                    colorPicker
                    colKey={'time'}
                    displaySetting={scheduleStyle.displayColumnSettings}
                    onHideColumn={handleHideColumn}
                    color={scheduleStyle.timeColumnColor}
                    onColorPick={(color) => dispatch(scheduleActions.updateScheduleStyle({
                        timeColumnColor: color
                    }))}
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
                        colorPicker={false}
                        colKey={day.key}
                        displaySetting={scheduleStyle.displayColumnSettings}
                        onHideColumn={handleHideColumn}
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

function TableHeader({
    children,
    colorPicker,
    color,
    colKey,
    displaySetting,
    onHideColumn,
    onColorPick,
}: {
    children: React.ReactNode
    colorPicker?: boolean
    color?: string
    colKey: ColumnKey
    displaySetting: boolean
    onHideColumn: (colKey: React.Key) => void
    onColorPick?: (pickedColor: string) => void
}) {
    const items: MenuProps['items'] = [
        {
            key: 'hide_column',
            label: 'Ẩn cột',
            onClick: () => onHideColumn(colKey)
        },
    ];
    const [openDropDown, setOpenDropDown] = useState(false);
    const [openColorPicker, setOpenColorPicker] = useState(false);

    if (colorPicker)
        items.push({
            key: 'color_picker',
            label:
                <Space
                    onMouseEnter={() => setOpenColorPicker(true)}
                    onMouseLeave={() => setOpenColorPicker(false)}
                >
                    Chọn màu
                    <ColorPicker
                        value={color}
                        onChange={(_, pickedColor) => onColorPick?.(pickedColor)}
                        trigger='hover'
                        open={openColorPicker}
                        arrow={false}
                    />
                </Space>,
            onClick: () => setOpenDropDown(true)
        })

    const [hoverSetting, setHoverSetting] = useState(false);

    return (
        <div className={`flex justify-center items-center relative p-[5px]`}
        >
            <div className="flex-1">{children}</div>
            {displaySetting &&
                <ConfigProvider
                    theme={{
                        components: {
                            Dropdown: {
                                zIndexPopup: 0
                            }
                        }
                    }}
                >
                    <Dropdown
                        menu={{ items }}
                        open={openDropDown}
                        onOpenChange={(flag) => setOpenDropDown(flag)}
                    >
                        <div
                            onMouseEnter={() => setHoverSetting(true)}
                            onMouseLeave={() => setHoverSetting(false)}
                        >
                            <AiTwotoneSetting
                                size={17}
                                color={hoverSetting ? LightenDarkenColor(settingIconColor, 80) : settingIconColor}
                            />
                        </div>
                    </Dropdown>
                </ConfigProvider>
            }
        </div>
    )
}
