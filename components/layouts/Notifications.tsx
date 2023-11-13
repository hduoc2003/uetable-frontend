"use client";
import React, {use, useState} from "react";
import { Avatar, Space, Card, Typography, Popover} from "antd";
import { CheckOutlined, SmallDashOutlined } from '@ant-design/icons';
import { mockNoticlass } from "@/api/mocks/notification";
import { MAIN_FONT } from "@/styles/fonts";
import {RxDotsHorizontal} from "react-icons/rx"


const content = function loadContent() {
    const { Text } = Typography;
    const [tatcaClassname, settatca] = useState("rounded-2xl bg-blue-100 hover:bg-blue-300 text-blue-600 p-1.5 cursor-pointer");
    const [chuadocClassname, setchuadoc] = useState("rounded-2xl bg-white hover:bg-slate-300 p-1.5 ml-5 cursor-pointer");
    const notiClassname = "flex max-w-[400px] bg-white hover:bg-gray-100 rounded-lg p-1 text-base cursor-pointer";
    const greendot = "rounded-full bg-[#17EB00] min-w-[10px] max-w-[10px] min-h-[10px] max-h-[10px] mx-auto";
    const whitedot = "";
    const [status, setstt] = useState("tatca");

    const [listNoti, setlist] = useState(mockNoticlass.map((Notification) => {
        const newNoti = {
            ...Notification,
            dotClassname : greendot,  
        };
        return newNoti;
    }));

    function handleClick(id : number) {
        setlist(listNoti.map((Notification) => {
            if(Notification.id === id) {
                const newNoti = {
                    ...Notification,
                    dotClassname : whitedot,  
                };
                return newNoti;
            }
            return Notification;
        }))
    }

    function selectAll() {
        setlist(listNoti.map((Notification) => {
            const newNoti = {
                ...Notification,
                dotClassname : whitedot,  
            };
            return newNoti;
        }))
    }

    function getTimepast(startTime : Date) : string {
        const currentDate = new Date();
        var res = "";
        var days = (currentDate.getTime() - startTime.getTime()) / (24 * 60 * 60 * 1000);
        if(days > 365) {
            res = Math.round(days / 365).toString() + " năm";
        }
        else {
            if(days > 30) {
                res = Math.round(days / 30).toString() + " tháng";
            }
            else {
                if(days >= 1) {
                    res = Math.round(days).toString() + " ngày";
                }
                else {
                    var seconds = (currentDate.getTime() - startTime.getTime()) / (1000);
                    if(seconds > 3600) {
                        res = Math.round(seconds / 3600).toString() + " giờ";
                    }
                    else {
                        if(seconds > 60) {
                            res = Math.round(seconds / 60).toString() + " phút";
                        }
                        else {
                            res = Math.round(seconds).toString() + " giây";
                        }
                    }
                }
            }
        }
        res += " trước"
        return res;
    }

    function loadNoti() {
        if(status === "tatca") {
            return listNoti.map((Notification) => {
                return ( <>
                    <p key={Notification.id} className={notiClassname} onClick={() => handleClick(Notification.id)}>
                        <Avatar src = {Notification.avatarImg} size={Notification.avartarSize} style={{background : Notification.avatarBgr, minWidth : Notification.avatarminW, minHeight : Notification.avatarminH}} className="mt-1 min-w-min font-sans">{Notification.avatarContent}</Avatar>
    
                        <p className={`ml-3 max-w-full ${MAIN_FONT.className}`}>
                            <div className={`max-w-[300px]`}>{Notification.content}</div>
                            <Text type="secondary">{getTimepast(Notification.time)}
                            </Text>
                        </p>
                        <p className={Notification.dotClassname}></p>
                    </p>
                </> )  
            })
        }
        else {
            return listNoti.map((Notification) => {
                if(Notification.dotClassname === greendot) {
                    return ( <>
                        <p key={Notification.id} className={notiClassname} onClick={() => handleClick(Notification.id)}>
                            <Avatar src = {Notification.avatarImg} size={Notification.avartarSize} style={{background : Notification.avatarBgr, minWidth : Notification.avatarminW, minHeight : Notification.avatarminH}} className="mt-1 min-w-min font-sans">{Notification.avatarContent}</Avatar>
        
                            <p className={`ml-3 max-w-full ${MAIN_FONT.className}`}>
                                <div className={`max-w-[300px]`}>{Notification.content}</div>
                                <Text type="secondary">{getTimepast(Notification.time)}
                                </Text>
                            </p>
                            <p className={Notification.dotClassname}></p>
                        </p>
                    </> )  
                }
            })
        }
    }

    function tatca() {
        settatca("rounded-2xl bg-blue-100 hover:bg-blue-300 text-blue-600 p-1.5 cursor-pointer");
        setchuadoc("rounded-2xl bg-white hover:bg-slate-300 p-1.5 ml-5 cursor-pointer");
        setstt("tatca");
    }

    function chuadoc() {
        setchuadoc("rounded-2xl bg-blue-100 hover:bg-blue-300 text-blue-600 p-1.5 ml-5 cursor-pointer");
        settatca("rounded-2xl bg-white hover:bg-slate-300 p-1.5 cursor-pointer");
        setstt("chuadoc");
    }

    const content2 = (
        <p className={`flex ${MAIN_FONT.className} bg-white hover:bg-slate-100 cursor-pointer p-1 rounded-lg`}onClick={() => selectAll()}>
            <CheckOutlined/>
            <p className="ml-2">Đánh dấu tất cả là đã đọc</p>
        </p>
    )

    return (
        <div className = {`rounded-lg overflow-y-auto min-h-fit max-h-fit`}>
            <div className="min-w-[384px] max-w-[384px] max-h-[450px]">
    
                <p className={`relative top-0 flex font-sans`}>
                    <p className="mx-0 font-bold text-xl">Thông báo</p>
                    <Popover content = {content2} trigger = "click" className="ml-64 cursor-pointer rounded-xl bg-white hover:bg-slate-200 p-px">
                        <RxDotsHorizontal style={{fontSize: '20px'}} className="text-black hover:text-blue-700"/>
                    </Popover>
                    
                </p> <br />
                
                <p className={`${MAIN_FONT.className} flex font-semibold text-base`}>
                    <p className = {tatcaClassname} onClick={() => tatca()}>Tất cả</p>
                    <p className = {chuadocClassname} onClick={() => chuadoc()}>Chưa đọc</p>
                </p> <br />
    
                <Space direction="vertical" className="flex flex-col justify-center">
                    {loadNoti()}
                </Space>
    
            </div>
        </div>
    );
} 

export {content}