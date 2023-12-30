"use client";
import { LogoutOutlined, ProfileOutlined, UserOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import React from "react";

const contentt = function loadSetting(profile: () => void, signOut: () => void, role: string) {
    return (
        <div className='rounded-lg flex-col flex w-[200px] gap-2'>
            <button className="w-full font-semibold flex rounded-lg hover:bg-gray-100 p-2" onClick={profile}>
                <div className=" mr-5">
                    <UserOutlined/>
                </div>
                Hồ sơ
            </button>
            { role == 'admin' &&
            <button className="w-full font-semibold flex rounded-lg hover:bg-gray-100 p-2">
                <a href="http://localhost:8000/admin" className="flex">
                    <div className="mr-5">
                        <ProfileOutlined/>
                    </div>
                    Admin
                </a>
            </button>
            }
            <Divider className="m-0"/>
            <button className="w-full text-red-500 font-semibold flex rounded-lg hover:bg-gray-100 p-2" onClick={signOut}>
                <div className="mr-5">
                    <LogoutOutlined/>
                </div>
                Đăng xuất
            </button>
        </div>
    );
}

export {contentt}
