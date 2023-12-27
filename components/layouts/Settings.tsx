"use client";
import { LogoutOutlined, ProfileOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";

const contentt = function loadSetting(profile: () => void, signOut: () => void) {
    return (
        <div className='rounded-lg flex-col'>
            <button className="w-full text-lg font-semibold flex rounded-lg hover:bg-gray-100 p-2" onClick={profile}>
                <div className=" mr-5">
                    <UserOutlined/>
                </div>
                Trang cá nhân
            </button>
            <button className="w-full text-lg font-semibold flex rounded-lg hover:bg-gray-100 p-2">
                <a href="http://localhost:8000/admin?authToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoie1wiSWRcIjozMixcIk5hbWVcIjpcIkLDuWkgVHXhuqVuIETFqW5nXCIsXCJTdHVkZW50SWRcIjpcIjIxMDIwMDA2XCIsXCJQYXNzd29yZEhhc2hcIjpcIiQyYiQxMCRHM0guSktONlp0S0M3MFQ3cnljU3UuM3lKLlozblNYSzN1LmdmWkRaaWZydTkybmEuRlp1MlwiLFwiUm9sZVwiOjF9IiwiaWF0IjoxNzAzNjAwOTQwLCJleHAiOjE3MDYxOTI5NDB9.U26LgfZirDIu4smezQi13cOlozKgSarTxwrspM6faaE" className="flex">
                    <div className="mr-5">
                        <ProfileOutlined/>
                    </div>
                    Admin
                </a>
            </button>
            <button className="w-full text-lg text-red-500 font-semibold flex rounded-lg hover:bg-gray-100 p-2" onClick={signOut}>
                <div className="mr-5">
                    <LogoutOutlined/>
                </div>
                Đăng xuất
            </button>
        </div>
    );
} 

export {contentt}