"use client";

import { THEME } from "@/styles/theme";
import React, { ReactNode, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "@/redux/auth/authSlice";
import { authSelector } from "@/redux/auth/authSelector";
import { Avatar, Badge, Select, Button, Popover, Space, Card } from "antd";
import { IoNotificationsOutline, IoNotifications } from "react-icons/io5";
import SearchBar from "../common/SearchBar";
import Link from "next/link";
import { MAIN_FONT } from "@/styles/fonts";

import { FloatButton } from 'antd'
import { CommentOutlined, CustomerServiceOutlined, NotificationOutlined } from '@ant-design/icons';


const languages = ['Tiếng Việt', 'English'];


interface TabProps {
  selected: boolean;
  children: ReactNode;
}

const Tab: React.FC<TabProps> = ({ selected, children }: TabProps) => {
  const [hover, setHover] = useState<Boolean>(false);

  return (
    <button
      style={{
        justifyItems: "center",
        height: "100%",
        // backgroundColor: 'red',
        position: "relative",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover ? (
        <div
          style={{
            height: "2px",
            width: "100%",
            backgroundColor: THEME.PRIMARY_COLOR,
            position: "absolute",
            top: "0px",
          }}
        ></div>
      ) : null}
      <div style={selected ? { color: THEME.PRIMARY_COLOR } : {}}>
        {children}
      </div>
    </button>
  );
};

export default function Header() {
  const dispatch = useDispatch();
  const authState = useSelector(authSelector);
  const [avtURL, setAvtURL] = useState<string>('https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj')
  const [avtStrokeColor, setAvtStrokeColor] = useState<string>(THEME.PRIMARY_COLOR);
  const [notiCount, setNotiCount] = useState(10)

  const handleSignIn = (): void => {
    dispatch(authActions.updateAuthState({
      signedIn: true,
      username: "21020059",
      name: "Bùi Huy Dược"
    }))
  };

  const handleSignOut = (): void => {
    dispatch(authActions.updateAuthState({
      signedIn: false
    }))
  };

  const handleOnSearch = (value: string): void => {
    console.log(value)
  }

  const content = (
    <div className="border-2 border-black overflow-y-auto min-h-fit max-h-96">
      <Card title="Thông báo" style={{ width: 400}}>
        <Space direction="vertical" className="flex flex-col justify-center">
          <p className="bg-white hover:bg-gray-100 border-2 rounded-lg p-2 max-w-sm">VanhG bị gay!!!</p>
          <p className="bg-white hover:bg-gray-100 border-2 rounded-lg p-2 max-w-sm">VanhG bị gay!!!</p>
          <p className="bg-white hover:bg-gray-100 border-2 rounded-lg p-2 max-w-sm">VanhG bị gay!!!</p>

          <p className="bg-white hover:bg-gray-100 border-2 rounded-lg p-2 max-w-sm">Thời khóa biểu của bạn vừa được cập nhật vào 00:00 ngày 9/11/2023</p>
          <p className="bg-white hover:bg-gray-100 border-2 rounded-lg p-2 max-w-sm">Thời khóa biểu của bạn vừa được cập nhật vào 00:00 ngày 8/11/2023 </p>
          <p className="bg-white hover:bg-gray-100 border-2 rounded-lg p-2 max-w-sm">Thời khóa biểu của bạn vừa được cập nhật vào 00:00 ngày 7/11/2023 </p>
          <p className="bg-white hover:bg-gray-100 border-2 rounded-lg p-2 max-w-sm">Thời khóa biểu của bạn vừa được cập nhật vào 00:00 ngày 6/11/2023 </p>
          <p className="bg-white hover:bg-gray-100 border-2 rounded-lg p-2 max-w-sm">Thời khóa biểu của bạn vừa được cập nhật vào 00:00 ngày 5/11/2023 </p>
          <p className="bg-white hover:bg-gray-100 border-2 rounded-lg p-2 max-w-sm">Thời khóa biểu của bạn vừa được cập nhật vào 00:00 ngày 4/11/2023 </p>
          <p className="bg-white hover:bg-gray-100 border-2 rounded-lg p-2 max-w-sm">Thời khóa biểu của bạn vừa được cập nhật vào 00:00 ngày 3/11/2023 </p>
          <p className="bg-white hover:bg-gray-100 border-2 rounded-lg p-2 max-w-sm">Thời khóa biểu của bạn vừa được cập nhật vào 00:00 ngày 2/11/2023 </p>
          <p className="bg-white hover:bg-gray-100 border-2 rounded-lg p-2 max-w-sm">Thời khóa biểu của bạn vừa được cập nhật vào 00:00 ngày 1/11/2023 </p>
        </Space>
      </Card>
    </div>

  );

  return (
    <div className="flex items-center h-[70px] sticky top-0 z-[1000] border-b-[0px] border-gray-200" style={{ backgroundColor: THEME.SECONDARY_COLOR }}>
      {/* <NavBar/> */}
      <div className="ml-10 flex-1">
        <SearchBar onSearch={handleOnSearch} />
      </div>
      <Select
        defaultValue={languages[0]}
        // onChange={handleProvinceChange}
        options={languages.map((language: string, i: number) => ({
          label: language,
          value: language,
        }))}
        className={`w-[110px] mr-[30px] ${MAIN_FONT.className}`}
      />
      {
        authState.signedIn ?
          <div className="flex mr-5">
            <Popover content = {content} trigger  = "click">
              <button onClick={() => setNotiCount(0)}>
                <Badge count={notiCount} overflowCount={9} title="Thông báo" className={`mr-7 ${MAIN_FONT.className}`}>
                    <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-gray-200 hover:bg-gray-300">
                      <IoNotificationsOutline size={25} />
                    </div>
                </Badge>
              </button>
            </Popover>
            <button
              onClick={handleSignOut}
              onMouseEnter={() => setAvtStrokeColor(THEME.DARK_PRIMARY_COLOR)}
              onMouseLeave={() => setAvtStrokeColor(THEME.PRIMARY_COLOR)}
            >
              <div className="relative flex">
                <Avatar className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" src={avtURL} size={40}></Avatar>
                <svg width="50" height="50" viewBox="0 0 32 32"><circle r="15" cx="16" cy="16" fill="none" strokeWidth="2" style={{ stroke: avtStrokeColor }}></circle></svg>
              </div>
            </button>
            <div className="ml-3">
              <div className="font-semibold ">Xin chào,</div>
              <div className="text-xs font-semibold">{`${authState.username} ${authState.name}`}</div>
            </div>
          </div>
          :
          <div className="flex gap-4 mr-10">
            <Link href='/signup'>
              <button
                style={{
                  // backgroundColor: "gray",
                  borderRadius: "10px",
                  padding: "7px 17px",
                  color: THEME.PRIMARY_COLOR,
                }}
                className="bg-gray-200 hover:bg-gray-300"
              >
                Đăng ký
              </button>
            </Link>
            <Link href='/signin'>
              <button
                className="bg-primary hover:bg-dark-primary"
                style={{
                  // backgroundColor: THEME.PRIMARY_COLOR,
                  borderRadius: "10px",
                  padding: "7px 17px",
                  color: THEME.SECONDARY_COLOR,
                }}
                onClick={handleSignIn}
              >
                Đăng nhập
              </button>
            </Link>
          </div>
      }
    </div>
  );
}
