'use client';

import { THEME } from '@/styles/theme'
import Link from 'next/link'
import React, { useState } from 'react'
import { Menu } from 'antd';
import type { MenuProps } from 'antd/es/menu';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import HomeIcon from '../common/(Icons)/NavIcons/HomeIcon';
import ScheduleIcon from '../common/(Icons)/NavIcons/ScheduleIcon';
import MySubjectIcon from '../common/(Icons)/NavIcons/MySubjectIcon';
import AllSubjectsIcon from '../common/(Icons)/NavIcons/AllSubjectsIcon';
import StatsIcon from '../common/(Icons)/NavIcons/StatsIcon';
import { AiOutlineMenu } from 'react-icons/ai';
import { NAVBAR_STYLE } from '@/styles/navBar';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const NavsContent: string[] = [
    "Trang chủ",
    "Thời khoá biểu",
    "Môn học của tôi",
    "Học phần",
    "Thống kê",
];

const NavsRoutes = [
    '/',
    '/schedule',
    '/mysubjects',
    '/allsubjects',
    '/stats'
]

const NavIcons = {
    'home': <HomeIcon/>,
    'schedule': <ScheduleIcon/>,
    'my-subjects': <MySubjectIcon/>,
    'all-subjects': <AllSubjectsIcon/>,
    'stats': <StatsIcon/>
}

const iconsKeys: (keyof typeof NavIcons)[] = [
    'home',
    'schedule',
    'my-subjects',
    'all-subjects',
    'stats'
]

const statsContent = ['Tín chỉ', 'Điểm số', 'Cá nhân']


export default function NavBar() {
    const [expand, setExpand] = useState(true);
    const [clickToExpand, setClickToExpand] = useState(!expand);
    const [r] = useAutoAnimate();

    const NavsItems: MenuItem[] = NavsContent.map((navContent, i) => {
        return getItem(
            <Link href={NavsRoutes[i]}>
                <div ref={r}>
                    {expand && <div className={`text-royal-gray font-semibold text-base`}>{navContent}</div>}
                </div>
            </Link>
            ,
            i,
            NavIcons[iconsKeys[i]],
            navContent === 'Thống kê' ?
                statsContent.map((statContent) => getItem(<div className={`text-royal-gray`}>{statContent}</div>, statContent))
                : undefined
        )
    })

    const handleClickToExpand = () => {
        setExpand(!expand);
        setClickToExpand(!clickToExpand)
    };

    return (
        <div
            className="flex flex-col h-screen sticky left-0 top-0 border-r-[1px] border-gray-200 bg-secondary"
        >
            <div className='flex gap-5 h-[70px] items-center mx-[25px]'>
                <button onClick={handleClickToExpand}>{<AiOutlineMenu size={NAVBAR_STYLE.ICON_SIZE} />}</button>
                {
                    expand &&
                    <Link href='/'>
                        <div className="text-3xl font-extrabold tracking-wide" style={{ color: THEME.PRIMARY_COLOR }}>UETable</div>
                    </Link>
                }
            </div>
            <div
                className='mt-[30px] flex-1'
                onMouseEnter={() => { if (!expand) setTimeout(() => setExpand(true), 500) }}
                onMouseLeave={() => { setExpand(!clickToExpand) }}
            >
                <Menu mode='inline' items={NavsItems} expandIcon={null}></Menu>
            </div>
        </div>
    )
}
