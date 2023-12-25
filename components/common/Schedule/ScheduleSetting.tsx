'use client';

import { DownOutlined } from "@ant-design/icons";
import { Button, ColorPicker, ConfigProvider, Dropdown, MenuProps, Space } from "antd";
import MyCheckbox from "../Checkbox";
import { MenuDividerType, MenuItemGroupType, MenuItemType } from "antd/es/menu/hooks/useItems";
import { useDispatch, useSelector } from "react-redux";
import { scheduleActions } from "@/redux/schedule/scheduleSlice";
import { scheduleDataSelector } from "@/redux/schedule/scheduleSelector";
import { useState } from "react";
import MyButtonWrapper from "../(MyButton)/MyButtonWrapper";

const tableSettingTask: Record<'show-hiden-columns' | 'change-header-color' | 'styling-table' | 'delete-table', React.ReactNode> = {
    // 'column-setting': 'Cài đặt cột',
    'show-hiden-columns': 'Hiện cột ẩn',
    'change-header-color': 'Đổi màu Header',
    'styling-table': 'Tuỳ chỉnh',
    'delete-table': 'Xoá bảng'
}

type TableSettingKey = keyof typeof tableSettingTask;

let stylingTableTask = {
    'has-divider': <div></div>,
    'cell-round': <div></div>,
    'has-border': <div></div>
}
type StylingTableKey = keyof typeof stylingTableTask;


export default function ScheduleSetting() {

    const dispatch = useDispatch();
    const { scheduleStyle } = useSelector(scheduleDataSelector);
    const [open, setOpen] = useState(false);

    tableSettingTask["change-header-color"] = (
        <div className="flex items-center">
            <span className="flex-1">Đổi màu Header</span>
            <ColorPicker
                value={scheduleStyle.headerRowColor}
                onChange={(_, color) => dispatch(scheduleActions.updateScheduleStyle({
                    headerRowColor: color
                }))}
                trigger="hover"
            />
        </div>
    )

    stylingTableTask = {
        'has-divider':
            <Space>
                <MyCheckbox
                    checked={scheduleStyle.hasDivider}
                    onClick={() => dispatch(scheduleActions.updateScheduleStyle({
                        hasDivider: !scheduleStyle.hasDivider
                    }))}
                >
                    Ngăn cách sáng chiều
                </MyCheckbox>
                {
                    scheduleStyle.hasDivider &&
                    <ColorPicker
                        value={scheduleStyle.dividerRowColor}
                        onChange={(_, dividerRowColor) => {
                            dispatch(scheduleActions.updateScheduleStyle({
                                dividerRowColor: dividerRowColor
                            }))
                        }}
                        trigger="hover"
                    >
                    </ColorPicker>
                }
            </Space>
        ,
        'cell-round':
            <MyCheckbox
                checked={scheduleStyle.roundedBorder}
                onClick={() => dispatch(scheduleActions.updateScheduleStyle({
                    roundedBorder: !scheduleStyle.roundedBorder
                }))}
            >
                Bo góc môn học
            </MyCheckbox>,
        'has-border':
            <MyCheckbox
                checked={scheduleStyle.hasBorder}
                onClick={() =>
                    dispatch(scheduleActions.updateScheduleStyle({
                        hasBorder: !scheduleStyle.hasBorder
                    }))}
            >
                Hiển thị viền
            </MyCheckbox>
    }

    const handleTableSetting: MenuProps['onClick'] = (e) => {
        switch (e.key as TableSettingKey | StylingTableKey) {
            case 'show-hiden-columns':
                dispatch(scheduleActions.updateScheduleStyle({
                    hiddenColumns: []
                }))
                setOpen(true);
                break;
            case 'change-header-color':
                setOpen(true);
                break;
            case 'has-border':
                setOpen(true);
                break;
            case 'cell-round':
                setOpen(true);
                break;
            case 'has-divider':
                setOpen(true);
                break;
        }
    };

    const tableSettings: MenuProps = {
        items: Object.keys(tableSettingTask).map((key) => getTableSettingItem(key as TableSettingKey)),
        onClick: handleTableSetting,
    };
    tableSettings.items?.splice(tableSettings.items.length - 1, 0, {
        type: 'divider'
    } as MenuDividerType)

    return (
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
                menu={tableSettings}
                open={open}
                onOpenChange={(flag: boolean) => setOpen(flag)}
            >
                <MyButtonWrapper className="border-2 px-2">
                    <Space>
                        <div className="font-semibold">Cài đặt bảng</div>
                        <DownOutlined />
                    </Space>
                </MyButtonWrapper>
            </Dropdown>
        </ConfigProvider>
    );
}

function getTableSettingItem(tableSettingKey: TableSettingKey) {
    switch (tableSettingKey) {
        case 'show-hiden-columns':
            return showHidenColumnsItem();
        case 'change-header-color':
            return changeHeaderColorItem();
        case 'delete-table':
            return deleteTableItem();
        case 'styling-table':
            return stylingTableItem();
    }
}

function showHidenColumnsItem(): MenuItemType {
    let key: TableSettingKey = 'show-hiden-columns'
    return {
        label: tableSettingTask[key],
        key
    }
}

function changeHeaderColorItem(): MenuItemType {
    let key: TableSettingKey = 'change-header-color';
    return {
        label: tableSettingTask[key],
        key
    }
}
function deleteTableItem(): MenuItemType {
    let key: TableSettingKey = 'delete-table';
    return {
        label: tableSettingTask[key],
        key,
        danger: true
    }
}

function stylingTableItem(): MenuItemGroupType {

    let key: TableSettingKey = 'styling-table';
    let children: MenuItemType[] = [];
    for (const stylingTableKey in stylingTableTask) {
        children.push({
            label: stylingTableTask[stylingTableKey as StylingTableKey],
            key: stylingTableKey,
            // onClick: (e) => { e.domEvent.preventDefault(); e.domEvent.stopPropagation() },
            // className: "!hover:bg-transparent",
            style: {
                backgroundColor: 'transparent'
            }
        })
    }

    return {
        label: tableSettingTask[key],
        key,
        children,
        type: 'group'
    }
}
