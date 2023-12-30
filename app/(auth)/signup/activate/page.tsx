'use client';

import MyButtonWrapper from "@/components/common/(MyButton)/MyButtonWrapper";
import { PageProps } from "@/types/PageProps";
import { Button, Result, Spin } from "antd";
import backgroundImage from '@/public/images/sky.jpeg'
import DoneIcon from '@/public/images/done.png'
import Image from "next/image";
import useSWR from "swr";
import { AuthAPI } from "@/api/authAPI";
import ErrorIcon from '@/public/images/error.png'
import Link from "next/link";

type ActivatePageProps = PageProps<{
    token: string
}>

export const dynamic='force-static';

export default function ActivatePage({
    searchParams: {
        token
    }
}: ActivatePageProps) {
    const { data: status, isLoading } = useSWR(token, AuthAPI.activateAccount);
    return (
        <div
            className="w-screen h-screen flex items-center justify-center bg-underground flex-col gap-10 py-20"
            // style={{backgroundImage: `url(${backgroundImage})`}}
            style={{
                background: `url(${backgroundImage.src})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%'
            }}
        >
            <div className="bg-secondary flex flex-col items-center pt-10 w-[420px] shadow-lg rounded-lg">
                <span className="text-5xl text-primary font-bold">UETable</span>
                <Result
                    title={status ? `Tài khoản kích hoạt ${status.ok ? 'thành công' : 'thất bại'}` : ''}
                    extra={[
                        <Link href={'/'} key={'home'}>
                            <MyButtonWrapper className="border-2 px-2">
                                <span className="font-semibold text-base">Trang chủ</span>
                            </MyButtonWrapper>
                        </Link>
                    ]}
                    icon={
                        isLoading ?
                            <Spin className="w-[50px] h-[50px]" />
                            :
                            <Image src={status?.ok ? DoneIcon : ErrorIcon} alt="" width={50} height={50} className="ml-auto mr-auto" />
                    }
                />
            </div>
            {/* <svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 1920 1080">
                <style type="text/css">
                    {
                        `.st0{fill:#82D6F4;}
                        .st1{fill:#29ABE2;}
                        .st2{fill:#0071BC;}
                        .st3{fill:none;stroke:#00A99D;stroke-width:10;stroke-miterlimit:10;}
                        .st4{fill:none;stroke:#00A99D;stroke-width:10;stroke-miterlimit:10;stroke-dasharray:20.1304,20.1304;}`
                    }
                </style>
                <polygon className="st0" points="1211.9,332.5 1782,165 1367.9,391.8 " />
                <polygon className="st1" points="1782,165 1367.9,391.8 1434.4,533.5 " />
                <polygon className="st0" points="1782,165 1451.9,421.5 1584.6,603.7 " />
                <polygon className="st2" points="1434.4,533.5 1451.9,421.5 1490.3,474.2 " />
                <g>
                    <g>
                        <path className="st3" d="M1390.5,557.4c0,0-2.5,2.5-7.2,6.9" />
                        <path className="st4" d="M1368.3,577.8c-62.6,55.1-247.4,199.7-416.4,156.1c-207.5-53.4-166.3-275.2-43.8-274.8S1105.5,673,1039.5,814    s-270,243-552.1,171c-229.3-58.5-419-299.7-466.8-364.9" />
                        <path className="st3" d="M14.7,611.9c-3.8-5.3-5.7-8.2-5.7-8.2" />
                    </g>
                </g>
            </svg> */}

        </div>
    );
}
