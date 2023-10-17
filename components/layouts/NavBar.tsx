'use client';

import { THEME } from '@/styles/theme'
import Link from 'next/link'
import React, { useState } from 'react'
import { AiOutlineMenu, AiOutlineSchedule, AiFillSchedule } from 'react-icons/ai'
import { MdOutlineTopic, MdTopic } from 'react-icons/md'
import { BsFiletypeDoc, BsPerson, BsPersonRolodex } from 'react-icons/bs'
import { TfiStatsUp } from 'react-icons/tfi'
import { ImStatsDots } from 'react-icons/im'
import MySubjects from '../../public/images/my-subjects.svg'
import Image from 'next/image'

const NavsContent: string[] = [
    "Thời khoá biểu",
    "Môn học của tôi",
    "Học phần",
    "Thống kê",
];

const iconSize = 22;

// const NavsIcons = [
//     <AiOutlineSchedule key={0} size={iconSize} color={THEME.ROYAL_GRAY_COLOR}/>,
//     // <Image src={MySubjects} alt='My subjects' key={1} width={iconSize} height={iconSize}></Image>,
//     // <MdOutlineTopic key={1} size={iconSize} color={THEME.ROYAL_GRAY_COLOR}/>,
//     <BsPersonRolodex key={1} size={iconSize} color={THEME.ROYAL_GRAY_COLOR}/>,
//     <MdOutlineTopic key={2} size={iconSize}  color={THEME.ROYAL_GRAY_COLOR}/>,
//     <TfiStatsUp key={3} size={iconSize}  color={THEME.ROYAL_GRAY_COLOR}/>
// ]

const NavsIcons = [
    <AiFillSchedule key={0} size={iconSize} color={THEME.ROYAL_GRAY_COLOR}/>,
    // <Image src={MySubjects} alt='My subjects' key={1} width={iconSize} height={iconSize}></Image>,
    // <MdOutlineTopic key={1} size={iconSize} color={THEME.ROYAL_GRAY_COLOR}/>,
    <BsPersonRolodex key={1} size={iconSize} color={THEME.ROYAL_GRAY_COLOR}/>,
    <MdTopic key={2} size={iconSize}  color={THEME.ROYAL_GRAY_COLOR}/>,
    <ImStatsDots key={3} size={iconSize}  color={THEME.ROYAL_GRAY_COLOR}/>
]

const NavsRoutes = [
    '/schedule',
    '/mysubject',
    '/allsubject',
    '/stats'
]

export default function NavBar() {
    const [expand, setExpand] = useState(true);

    const handleCollapse = () => {
        setExpand(!expand);
    };

    return (
        <div
            className="h-screen sticky left-0 top-0 border-r-[1px] border-gray-200 px-5 bg-secondary"
        >
            <div className='flex gap-5 h-[70px] items-center'>
                <button onClick={handleCollapse}><AiOutlineMenu size={iconSize} /></button>
                {/* <Image src={UETLogo} alt="UET Logo" height={50} width={50} /> */}
                {
                    expand &&
                    <Link href='/'>
                        <div className="text-3xl font-extrabold tracking-wide" style={{ color: THEME.PRIMARY_COLOR }}>UETable</div>
                    </Link>
                }
            </div>
            <div className='mt-[30px]'>
                {
                    NavsContent.map((navContent: string, i: number) => {
                        return (
                            <div className='hover:bg-light-primary py-[10px] -mx-5 pl-5' key={i}>
                                <Link href={NavsRoutes[i]} >
                                    <div className="flex gap-3 items-center">
                                        {NavsIcons[i]}
                                        {expand && <div className='text-royal-gray'>{navContent}</div>}
                                    </div>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
