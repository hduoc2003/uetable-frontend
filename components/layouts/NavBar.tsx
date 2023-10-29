'use client';

import { THEME } from '@/styles/theme'
import Link from 'next/link'
import React, { useState } from 'react'
import { Menu } from 'antd';
import type { MenuProps } from 'antd/es/menu';
import { NavsIcons, NavsIconsProp } from "../common/Icons/NavIcons";
import { useAutoAnimate } from '@formkit/auto-animate/react';

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

const iconsKeys: (keyof NavsIconsProp)[] = [
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
            NavsIcons[iconsKeys[i]],
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
                <button onClick={handleClickToExpand}>{NavsIcons['expand-nav']}</button>
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
