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
                ml-body-pd pt-body-pd
                bg-underground
                flex flex-col
                h-screen
            "
        >
            <div
                className='bg-secondary h-full shadow min-w-fit rounded-layout-el'
                style={{
                    borderTopRightRadius: scroll ? 0 : THEME.LAYOUT_ELEMENT_BORDER_RADIUS,
                    transition: 'border-radius 0.3s ease-in-out'
                }}
            >
                <div className='flex gap-3 h-[70px] items-center mx-[25px]'>
                    <MyButtonWrapper
                        onClick={handleClickToExpand}
                        className='rounded-full hover:bg-gray-100'
                    >
                        {<AiOutlineMenu size={NAVBAR_STYLE.ICON_SIZE} />}
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
                <div
                    className='mt-[30px] flex-1'
                    // onMouseEnter={() => { if (!expand) setTimeout(() => setExpand(true), 500) }}
                    // onMouseLeave={() => { setExpand(!clickToExpand) }}
                >
                    {/* <Menu mode='inline' items={NavsItems} expandIcon={null}></Menu> */}
                    <NavMenu expand={expand} />
                </div>
            </div>
        </div>
    )
}
