'use client';

import { NotiAPI } from "@/api/NotiAPI";
import NotificationIcon from "@/components/common/(Icons)/NotificationIcon";
import SelectedIcon from "@/components/common/(Icons)/SelectedIcon";
import MyButtonWrapper from "@/components/common/(MyButton)/MyButtonWrapper";
import { MAIN_FONT } from "@/styles/fonts";
import { THEME } from "@/styles/theme";
import { UserNoti } from "@/types/notification";
import { shortTime } from "@/types/time";
import { Avatar, Badge, List, Popover, Segmented, Space, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";
import useSWR from "swr";

const { Text, Paragraph, Title } = Typography;

export default function Notifications() {

    const { data: notiList, isLoading } = useSWR<UserNoti[]>('get noti', NotiAPI.getAllNoti, {
        refreshInterval: 1000
    });
    const [notiCount, setNotiCount] = useState(0);
    const [solidNoti, setSolidNoti] = useState(false);
    useEffect(() => {
        setNotiCount(notiList?.reduce((sum, noti) => sum + (noti.seen ? 0 : 1), 0) ?? 0)
    }, [notiList])

    return (
        <Popover
            content={<NotiList notiList={notiList} />}
            trigger="click"
            arrow={false}
            placement="bottom"
            onOpenChange={(visible) => setSolidNoti(visible)}
        >
            <Badge count={notiCount} overflowCount={9} title="Thông báo" className={`mr-7 ${MAIN_FONT.className}`}>
                <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 cursor-pointer">
                    <NotificationIcon solid={solidNoti} />
                </div>
            </Badge>
        </Popover>
    );
}

type FilterKey = 'all' | 'unseen';
const filterKeys: FilterKey[] = ['all', 'unseen']
const filterLabels: Record<FilterKey, string> = {
    all: "Tất cả",
    unseen: "Chưa đọc"
}

function NotiList({
    notiList
}: {
    notiList: UserNoti[] | undefined
}) {
    const [openOptions, setOpenOptions] = useState(false);
    const [filterOption, setFilterOption] = useState<FilterKey>('all');
    const router = useRouter();
    const filteredNoti = useMemo<typeof notiList>((): typeof notiList => {
        switch (filterOption) {
            case 'all':
                return notiList;
            case 'unseen':
                return notiList?.filter((noti) => !noti.seen);
        }
        return []
    }, [filterOption, notiList])
    if (notiList?.length === 0)
        return (
            <Text type='secondary' italic>Bạn không có thông báo nào</Text>
        )

    return (
        <Space
            direction='vertical'
            className="max-h-[80vh] w-[25vw] overflow-y-scroll scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thin">
            <div className="w-full flex">
                <Title level={4}>Thông báo</Title>
                <Popover
                    open={openOptions}
                    placement='bottomRight'
                    content={
                        <button
                            onClick={() => {
                                setOpenOptions(false);
                                NotiAPI.markAllAsRead();
                            }}
                        >
                            <Space className="rounded-lg p-2 hover:bg-gray-200">
                                <Text>
                                    Đánh dấu tất cả là đã đọc
                                </Text>
                                <SelectedIcon />
                            </Space>
                        </button>
                    }
                    onOpenChange={(visible) => setOpenOptions(visible)}
                    trigger={'click'}
                >
                    <MyButtonWrapper onClick={() => setOpenOptions(true)} className='ml-auto hover:bg-gray-200' rounded>
                        <IoEllipsisHorizontal size='1.5em' />
                    </MyButtonWrapper>
                </Popover>
            </div>
            <Segmented
                options={filterKeys.map((key) => ({
                    value: key,
                    label: <Text strong className={`${key === filterOption ? 'text-primary' : ''}`}>{filterLabels[key]}</Text>
                }))}
                onChange={(option) => setFilterOption(option as FilterKey)}
            />
            <List bordered={false}>
                {
                    filteredNoti?.map((noti) => {
                        return (
                            <List.Item key={noti.id}>
                                <button
                                    onClick={() => {
                                        router.replace(noti.link);
                                        if (!noti.seen)
                                            NotiAPI.seenNoti(noti.id)
                                    }}
                                    className="text-start"
                                >
                                    <Space className="hover:bg-gray-200 rounded-lg p-2">
                                        <Space align='start'>
                                            <Avatar src={noti.reply.avatar} alt={noti.reply.name} size={50} />
                                            <span >
                                                <Text>{noti.content}</Text> <br />
                                                <Text type='secondary' className="text-[0.85rem]">{shortTime(noti.createdAt)}</Text>
                                            </span>
                                        </Space>
                                        <div className={`w-3 h-3 rounded-full bg-[#55CA36] ${noti.seen ? 'invisible' : 'visible'}`} />
                                    </Space>
                                </button>
                            </List.Item>)
                    })
                }
            </List>
        </Space>
    )
}
