'use client';

import { THEME } from '@/styles/theme'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { ConfigProvider, Layout, Menu, Typography } from 'antd';
import type { MenuProps } from 'antd/es/menu';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import HomeIcon from '../../common/(Icons)/NavIcons/HomeIcon';
import ScheduleIcon from '../../common/(Icons)/NavIcons/ScheduleIcon';
import MySubjectIcon from '../../common/(Icons)/NavIcons/MySubjectIcon';
import AllSubjectsIcon from '../../common/(Icons)/NavIcons/AllSubjectsIcon';
import StatsIcon from '../../common/(Icons)/NavIcons/StatIcon';
import { AiOutlineMenu } from 'react-icons/ai';
import { NAVBAR_STYLE } from '@/styles/navBar';
import NavMenu from './NavMenu';
import MyButtonWrapper from '@/components/common/(MyButton)/MyButtonWrapper';
import Image from 'next/image';

const { Text } = Typography;
const { Sider } = Layout;


export default function NavBar() {
    const [expand, setExpand] = useState(true);
    // const [clickToExpand, setClickToExpand] = useState(!expand);
    const [scroll, setScroll] = useState(false);
    const handleClickToExpand = () => {
        setExpand(!expand);
        // setClickToExpand(!clickToExpand)
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div
            className="
                sticky left-0 top-0
                bg-underground
                flex flex-col
                h-screen
            "
        >
            <div
                className={expand?'bg-secondary h-full shadow min-w-[300px] flex flex-col gap-[30px]':'bg-secondary h-full shadow min-w-fit flex flex-col gap-[30px]' }
                style={{
                    // borderTopRightRadius: scroll ? 0 : THEME.LAYOUT_ELEMENT_BORDER_RADIUS,
                    transition: 'border-radius 0.3s ease-in-out'
                }}
            >
                <div className='flex gap-3 h-[70px] items-center mx-[25px]'>
                    <MyButtonWrapper
                        onClick={handleClickToExpand}
                        className='rounded-full hover:bg-gray-100'
                    >
                        {<AiOutlineMenu size={NAVBAR_STYLE.ICON_SIZE} />}
                        {/* <Image alt='logo' src={'https://ui8-core.herokuapp.com/img/logo-dark.png'} width={50} height={50} /> */}
                    </MyButtonWrapper>
                    {
                        expand &&
                        <Link href='/'>
                            <div className="text-3xl font-extrabold tracking-wide text-primary">
                                UETable
                            </div>
                        </Link>
                    }
                </div>
                <NavMenu expand={expand} />
            </div>
        </div>
    )
}
