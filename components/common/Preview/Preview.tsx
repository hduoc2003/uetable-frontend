'use client';

import { getURL, openNewTab } from "@/utils/navigation";
import { Skeleton, Space, Typography } from "antd";
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'
import { UrlObject } from 'url';
import InfoIcon from "../(Icons)/InfoIcon";
import { isUndefined } from "lodash";
import { SearchParams } from "@/types/PageProps";

const {Text, Title} = Typography;

export interface PreviewProps {
    imgSrc: string | StaticImport;
    imgAlt?: string;
    imgHeight?: number | string;
    star?: React.ReactNode;
    stared?: boolean;
    url: string;
    newTab?: boolean;
    params?: SearchParams;
    title: string;
    info?: React.ReactNode;
    tag?: React.ReactNode;
    loading?: boolean;
    children?: React.ReactNode
}

export default function Preview({
    imgSrc, imgAlt, star, stared = false, url,
    newTab = false, params, title, info, tag,
    loading = false, imgHeight = 200, children
}: PreviewProps) {
    const router = useRouter();

    if (loading)
        return (
            <div className="flex flex-col gap-3 w-full">
                <Skeleton.Image active className="!w-full" style={{height: imgHeight}}/>
                <Skeleton.Input active size="small" style={{width: '70%', height: 15}}/>
                <Skeleton.Input active size="small" style={{width: '70%', height: 15}}/>
            </div>
        )

    const onClick = () => {
        if (isUndefined(url))
            return;
        if (newTab)
            openNewTab(url, params);
        else
            router.push(getURL(url, params))
    }

    return (
        <div className='group/preview cursor-pointer flex flex-col gap-3 w-full h-fit relative animate__animated animate__fadeIn' onClick={onClick}>
            <div className='relative overflow-hidden' style={{height: imgHeight}}>
                <Image src={imgSrc} alt={imgAlt ?? url} className='rounded-[12px]' fill/>
                <div className='absolute top-0 left-0 group-hover/preview:bg-[rgba(17,19,21,0.8)] w-full h-full transition-all duration-300 rounded-[15px]'/>
                <div
                    className={`z-20 absolute top-4 right-4 ${stared ? '' : 'hidden opacity-0 group-hover/preview:block group-hover/preview:opacity-100 transition-opacity duration-300'}`}
                >
                    {star}
                </div>
            </div>
            <div className="flex gap-5 w-full">
                <div className="flex flex-col flex-1 items-start text-start">
                    <Title level={5} className="group-hover/preview:text-[#69b1ff]">{title}</Title>
                    {info}
                </div>
                <div className="">{tag}</div>
            </div>
        </div>
    )
}
