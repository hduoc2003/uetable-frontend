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
import React, { useMemo, useState } from 'react'
import NavCurve from '../../../public/images/curve-nav.svg'
import { useAutoAnimate } from '@formkit/auto-animate/react';
import LinkIcon from '@/components/common/(Icons)/NavIcons/LinkIcon';

type GroupKey = 'general' | 'explore';
type MenuKey = 'home' | 'schedule' | 'my-subjects' | 'all-subjects' | 'stat' | 'links';
type MySubjectsKey = 'my-subjects-self' | 'my-subjects-majors';
type StatKey = 'stat-credits' | 'stat-score' | 'stat-self';

type AllKey = GroupKey | MenuKey | MySubjectsKey | StatKey;

const _key = (key: AllKey) => key;

export default function NavMenu({
    expand
} : {
    expand: boolean
}) {
    const [selectedKey, setselectedKey] = useState<AllKey>();
    const menuItems = useMemo(() => getMenuItems(selectedKey, expand), [selectedKey, expand]);
    const [r] = useAutoAnimate();
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
            {/* <div ref={r}> */}
            <Menu
                mode='inline'
                onSelect={(info) => setselectedKey(info.key as AllKey)}
                items={menuItems}
                {...(expand ? {} : {expandIcon: null})}
            />
            {/* </div> */}
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
    let className = 'font-semibold text-base text-royal-gray tracking-tight group-hover:text-nav-highlight ';
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

const labels: Record<AllKey, string> = {
    'general': 'Chung',
    'home': 'Trang chủ',
    'schedule': 'Thời khoá biểu',
    'my-subjects': 'Môn học của tôi',
    'my-subjects-self': 'Cá nhân',
    'my-subjects-majors': 'Chương trình đào tạo',
    'all-subjects': 'Học phần',
    'explore': 'Khám phá',
    'stat': 'Thống kê',
    'stat-credits': 'Tín chỉ',
    'stat-score': 'Điểm số',
    'stat-self': 'Cá nhân',
    'links': 'Liên kết'
}


function getMenuItems(
    selectedKey: AllKey | undefined,
    expand: boolean
): ItemType[] {
    function getLabel(key: AllKey): string {
        return expand ? labels[key] : '';
    }

    return [
        getGroupMenuItem('general', 'Chung', [
            getNormalMenuItem('home', selectedKey, getLabel('home'), false, HomeIcon),
            getNormalMenuItem('schedule', selectedKey, getLabel('schedule'), false, ScheduleIcon),
            getSubMenuItem('my-subjects', getLabel('my-subjects'), MySubjectIcon,
            [
                getNormalMenuItem('my-subjects-self', selectedKey, getLabel('my-subjects-self'), true),
                getNormalMenuItem('my-subjects-majors', selectedKey, getLabel('my-subjects-majors'), true)
            ]),
            getNormalMenuItem('all-subjects', selectedKey, getLabel('all-subjects'), false, AllSubjectsIcon)
        ]),
        getGroupMenuItem('explore', 'Khám phá', [
            getSubMenuItem('stat', getLabel('stat'), StatIcon, [
                getNormalMenuItem('stat-credits', selectedKey, getLabel('stat-credits'), true),
                getNormalMenuItem('stat-score', selectedKey, getLabel('stat-score'), true),
                getNormalMenuItem('stat-self', selectedKey, getLabel('stat-self'), true)
            ]),
            getNormalMenuItem('links', selectedKey, getLabel('links'), false, LinkIcon)
        ])
    ]
}

function getNormalMenuItem(
    key: AllKey,
    selectedKey: AllKey | undefined,
    label: string,
    inSubmenu:boolean,
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
    key: AllKey,
    label: React.ReactNode,
    Icon: (props: IconProps) => React.JSX.Element,
    children: MenuItemType[]
): SubMenuType {
    return {
        key,
        label:
            <div className='flex gap-3 group'>
                <Icon className={iconClassName(false)}/>
                <NavLabel>{label}</NavLabel>
            </div>
        ,
        children: children.map((item: MenuItemType): MenuItemType => ({
            ...item,
            label:
                <div className='flex'>
                    <Image src={NavCurve} alt='hehe' className='absolute left-0 top-[7px]'/>
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
    key: AllKey,
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
