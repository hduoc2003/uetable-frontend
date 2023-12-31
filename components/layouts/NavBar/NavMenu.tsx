import { IconProps } from '@/components/common/(Icons)/IconProps';
import AllSubjectsIcon from '@/components/common/(Icons)/NavIcons/AllSubjectsIcon';
import HomeIcon from '@/components/common/(Icons)/NavIcons/HomeIcon';
import MySubjectIcon from '@/components/common/(Icons)/NavIcons/MySubjectIcon';
import ScheduleIcon from '@/components/common/(Icons)/NavIcons/ScheduleIcon';
import StatIcon from '@/components/common/(Icons)/NavIcons/StatIcon';
import { NAVBAR_STYLE } from '@/styles/navBar';
import { ConfigProvider, Menu } from 'antd'
import { ItemType, MenuItemGroupType, MenuItemType, SubMenuType } from 'antd/es/menu/hooks/useItems';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react'
import NavCurve from '../../../public/images/curve-nav.svg'
import { useAutoAnimate } from '@formkit/auto-animate/react';
import LinkIcon from '@/components/common/(Icons)/NavIcons/LinkIcon';
import { usePathname, useRouter } from 'next/navigation';
import _, { isUndefined } from 'lodash';
import { accessibleRoute, cookies } from '@/app/(dashboard)/layout';

type GroupKey = 'general' | 'explore';
type MenuKey = '' | 'schedule' | 'mysubjects' | 'all-subjects' | 'statistic' | 'links';
type ScheduleKey = 'subject-class' | 'calendar' | 'exam';
type MySubjectsKey = 'semester' | 'registered' | 'curriculum';
type StatKey = 'credit' | 'gpa' | 'personal' | 'subject';

export type AllRouteKey = GroupKey | MenuKey | MySubjectsKey | ScheduleKey | StatKey;

const allKeys: AllRouteKey[] = ['', 'schedule', 'mysubjects', 'all-subjects', 'statistic', 'links',
    'subject-class', 'calendar', 'exam',
    'semester', 'registered', 'curriculum',
    'credit', 'gpa', 'personal', 'subject'
]

const _key = (key: AllRouteKey) => key;

export default function NavMenu({
    expand
}: {
    expand: boolean
}) {
    const pathName = usePathname();
    const router = useRouter();
    const [selectedKey, setselectedKey] = useState<AllRouteKey>('');
    const [openKey, setOpenKey] = useState<AllRouteKey[]>([])
    const menuItems = useMemo(() => getMenuItems(selectedKey, expand), [selectedKey, expand]);
    useEffect(() => {
        const pathKey = pathName.split('/');
        // console.log(cookies.get('authToken'))
        // if (isUndefined(cookies.get('authToken'))) {
        //     let check: boolean = false
        //     for (const subKey of pathKey)
        //         check = check || publicRoutes.includes(subKey as AllKey)
        //     console.log(pathKey, check)
        //     if (!check) {
        //         router.replace('/signin')
        //         return;
        //     }
        // }
        const n = pathKey.length;
        for (const key of pathKey.toReversed())
            if (allKeys.includes(key as AllRouteKey)) {
                setselectedKey(key as AllRouteKey)
                break;
            }
        if (n >= 3)
            setOpenKey((oldPathKey) => [...oldPathKey, pathKey[1] as AllRouteKey])
    }, [pathName, router])
    // console.log(openKey)
    // console.log(selectedKey)
    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        // itemSelectedBg: NAVBAR_STYLE.ITEM_SELECTED_BACKGROUND_COLOR
                        itemSelectedBg: 'transparent',
                        itemHoverBg: 'transparent',
                        itemActiveBg: 'transparent'
                    }
                }
            }}
        >
            <div className='overflow-y-auto no-scrollbar'>
                <Menu
                    mode='inline'
                    onSelect={(info) => {
                        // console.log(info)
                        setselectedKey(info.key as AllRouteKey)
                    }}
                    onOpenChange={(info) => {
                        // console.log(info)
                        setOpenKey(info as AllRouteKey[])
                    }}
                    items={menuItems}
                    {...(expand ? {} : { expandIcon: null })}
                    onClick={(e) => {
                        // console.log(e.keyPath)
                        const pathName = '/' + _.join(_.reverse(e.keyPath), '/')
                        if (accessibleRoute(pathName))
                            router.replace(pathName)
                        else
                            router.replace('/signin')
                    }}
                    // defaultSelectedKeys={[selectedKey]}
                    selectedKeys={[selectedKey]}
                    // defaultOpenKeys={openKey}
                    openKeys={openKey}
                />
            </div>
        </ConfigProvider>
    )
}

function NavLabel({
    children,
    subMenu,
    selected = false
}: {
    children?: React.ReactNode
    subMenu?: boolean
    selected?: boolean
}) {
    const [ref] = useAutoAnimate();
    let className = 'font-semibold text-base text-royal-gray tracking-tight group-hover:text-nav-highlight';
    // className += ' animate__animated animate__slideOutLeft animate__slideInLeft'
    if (subMenu)
        className += ' pl-3'
    return (
        <span
            ref={ref}
            className={className}
            style={selected ? { color: NAVBAR_STYLE.ITEM_HIGHLIGHT_COLOR } : undefined}
        >
            {children}
        </span>
    )
}

const selectedStyle: React.CSSProperties = {
    boxShadow: 'inset 0px -2px 1px rgba(0, 0, 0, 0.05), inset 0px 1px 1px #FFFFFF',
    backgroundColor: NAVBAR_STYLE.ITEM_SELECTED_BACKGROUND_COLOR
}

const itemStyle = (selected: boolean): React.CSSProperties | undefined => {
    return selected ? selectedStyle : undefined;
}

const iconClassName = (selected: boolean) => {
    return 'group-hover:fill-nav-highlight ' + (selected ? 'fill-nav-highlight' : '');
}

const labels: Record<AllRouteKey, string> = {
    'general': 'Chung',
    '': 'Trang chủ',
    'schedule': 'Thời khoá biểu',
    'mysubjects': 'Môn học của tôi',
    'semester': 'Điểm học kì',
    'registered': 'Môn đã đăng kí',
    'curriculum': 'Chương trình đào tạo',
    'all-subjects': 'Học phần',
    'explore': 'Khám phá',
    'statistic': 'Thống kê',
    'credit': 'Tín chỉ',
    'gpa': 'Điểm số',
    'personal': 'Cá nhân',
    'subject': 'Các môn học',
    'links': 'Liên kết',
    'subject-class': 'Lịch học',
    calendar: 'Lịch làm việc',
    exam: 'Lịch thi'
}


function getMenuItems(
    selectedKey: AllRouteKey | undefined,
    expand: boolean
): ItemType[] {
    function getLabel(key: AllRouteKey): string {
        return expand ? labels[key] : '';
    }

    return [
        getGroupMenuItem('general', 'Chung', [
            getNormalMenuItem('', selectedKey, getLabel(''), false, HomeIcon),
            getSubMenuItem('schedule', getLabel('schedule'), ScheduleIcon,
                [
                    getNormalMenuItem('subject-class', selectedKey, getLabel('subject-class'), true),
                    getNormalMenuItem('calendar', selectedKey, getLabel('calendar'), true),
                    // getNormalMenuItem('exam', selectedKey, getLabel('exam'), true)
                ]),
            getSubMenuItem('mysubjects', getLabel('mysubjects'), MySubjectIcon,
                [
                    getNormalMenuItem('semester', selectedKey, getLabel('semester'), true),
                    getNormalMenuItem('registered', selectedKey, getLabel('registered'), true),
                    // getNormalMenuItem('curriculum', selectedKey, getLabel('curriculum'), true)
                ]),
            getNormalMenuItem('all-subjects', selectedKey, getLabel('all-subjects'), false, AllSubjectsIcon)
        ]),
        getGroupMenuItem('explore', 'Khám phá', [
            getSubMenuItem('statistic', getLabel('statistic'), StatIcon, [
                getNormalMenuItem('credit', selectedKey, getLabel('credit'), true),
                getNormalMenuItem('gpa', selectedKey, getLabel('gpa'), true),
                getNormalMenuItem('personal', selectedKey, getLabel('personal'), true),
                getNormalMenuItem('subject', selectedKey, getLabel('subject'), true)
            ]),
            getNormalMenuItem('links', selectedKey, getLabel('links'), false, LinkIcon)
        ])
    ]
}

function getNormalMenuItem(
    key: AllRouteKey,
    selectedKey: AllRouteKey | undefined,
    label: string,
    inSubmenu: boolean,
    Icon?: (props: IconProps) => React.JSX.Element,
): MenuItemType {
    let selected = (key === selectedKey);

    return {
        key,
        label: <NavLabel subMenu={typeof Icon === 'undefined'} selected={selected}>{label}</NavLabel>
        ,
        icon: typeof Icon === 'undefined' ? undefined : <Icon className={iconClassName(selected)} />
        ,
        style: itemStyle(selected),
        className: 'group' + (inSubmenu ? `
            !w-auto
            relative
            !ml-[37px] !pl-0 !pr-0
            `
            : '')
    }
}

function getSubMenuItem(
    key: AllRouteKey,
    label: React.ReactNode,
    Icon: (props: IconProps) => React.JSX.Element,
    children: MenuItemType[]
): SubMenuType {
    return {
        key,
        label:
            <div className='flex gap-3 group'>
                <Icon className={iconClassName(false)} />
                <NavLabel>{label}</NavLabel>
            </div>
        ,
        children: children.map((item: MenuItemType): MenuItemType => ({
            ...item,
            label:
                <div className='flex'>
                    <Image src={NavCurve} alt='hehe' className='absolute left-0 top-[7px]' />
                    <span className="ml-[14px] flex-1 rounded-[8px] pr-2" style={item.style}>{item.label}</span>
                </div>,
            style: {

            }
        })),
        className: `
            relative
            before:content-['']
            before:absolute
            before:bg-[#e8e8e8]
            before:top-[37px]
            before:left-[37px]
            before:bottom-[32px]
            before:w-[2px]
            before:rounded-full
        `
    }
}

function getGroupMenuItem(
    key: AllRouteKey,
    label: string,
    children: ItemType[]
): MenuItemGroupType {
    return {
        type: 'group',
        label,
        key,
        children
    }
}
