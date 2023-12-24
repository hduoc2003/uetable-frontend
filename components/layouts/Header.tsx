"use client";

import { THEME } from "@/styles/theme";
import React, { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "@/redux/auth/authSlice";
import { authSelector } from "@/redux/auth/authSelector";
import { AuthState } from "@/redux/auth/authSlice";
import { Avatar, Badge, Divider, Select, Popover } from "antd";
import { IoNotificationsOutline, IoNotifications } from "react-icons/io5";
import SearchBar from "../common/SearchBar/SearchBar";
import Link from "next/link";
import { MAIN_FONT } from "@/styles/fonts";
import { content } from "@/components/layouts/Notifications"
import NotificationIcon from "../common/(Icons)/NotificationIcon";
import Fetcher from "@/api/Fetcher";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import { UserInfoResponse } from "@/api/userAPI";
import { cookies } from "@/app/(dashboard)/layout";
interface TabProps {
  selected: boolean;
  children: ReactNode;
}

export default function Header() {
  const [avtURL, setAvtURL] = useState<string>('https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj')
  const [avtStrokeColor, setAvtStrokeColor] = useState<string>(THEME.PRIMARY_COLOR);
  const [notiCount, setNotiCount] = useState(10);
  const [solidNoti, setSolidNoti] = useState(false);
  const authState = useSelector(authSelector);
  const dispatch = useDispatch();
  const router = useRouter();
  const [scroll, setScroll] = useState(false)

  const handleOnSearch = (): void => {
  }

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
  // console.log(value)

  const handleSignOut = () => {
    cookies.remove('authToken');
    dispatch(authActions.updateAuthState({
      signedIn: false,
      logging: false,
      name: '',
      username: '',
    }));
  }

  return (
    <header
      className="sticky top-0 z-[1000] pb-layout-el pr-body-pd bg-underground pt-body-pd"
      style={{
        paddingLeft: scroll ? 0 : THEME.LAYOUT_ELEMENT_SPACE,
        transition: 'padding-left 0.3s ease-in-out'
      }}
    >
      <div
        className="flex items-center h-[80px] bg-secondary shadow px-8  rounded-layout-el"
        style={{
          borderTopLeftRadius: scroll ? 0 : THEME.LAYOUT_ELEMENT_BORDER_RADIUS,
          borderBottomLeftRadius: scroll ? 0 : THEME.LAYOUT_ELEMENT_BORDER_RADIUS,
          transition: 'border-radius 0.3s ease-in-out'
        }}
      >
        <div className="flex-1">
          <SearchBar placeholder="Tìm kiếm học phần" className="w-[25vw]"/>
        </div>
        <LanguaguesSelector />
        {
          authState.signedIn ?
            <div className="flex mr-5">
              <Popover content={content} trigger="click" arrow={false} placement="bottom" className="bg-white">
                <button onClick={() => { setNotiCount(0); setSolidNoti(true); }}>
                  <Badge count={notiCount} overflowCount={9} title="Thông báo" className={`mr-7 ${MAIN_FONT.className}`}>
                    <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-gray-200 hover:bg-gray-300">
                      <NotificationIcon solid={solidNoti} />
                    </div>
                  </Badge>
                </button>
              </Popover>
              <button
                onMouseEnter={() => setAvtStrokeColor(THEME.DARK_PRIMARY_COLOR)}
                onMouseLeave={() => setAvtStrokeColor(THEME.PRIMARY_COLOR)}
              >
                <div className="relative flex">
                  <Avatar className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" src={avtURL} size={40} onClick={handleSignOut}></Avatar>
                  <svg width="50" height="50" viewBox="0 0 32 32"><circle r="15" cx="16" cy="16" fill="none" strokeWidth="2" style={{ stroke: avtStrokeColor }}></circle></svg>
                </div>
              </button>
              <div className="ml-3">
                <div className="font-semibold ">Xin chào,</div>
                <div className="text-xs font-semibold">{`${authState.username} ${authState.name}`}</div>
              </div>
            </div>
            :
            <div className="flex gap-4">
              <Link href='/signup'>
                <button
                  className="bg-gray-200 hover:bg-gray-300 shadow rounded-lg text-primary px-[17px] py-[7px]"
                >
                  Đăng ký
                </button>
              </Link>
              <Link href='/signin'>
                <button
                  className="bg-primary hover:bg-dark-primary shadow rounded-[10px] text-secondary"
                  style={{
                    padding: "7px 17px",
                  }}
                >
                  Đăng nhập
                </button>
              </Link>
            </div>
        }
      </div>
    </header>
  );
}

const languages = ['Tiếng Việt', 'English'];
function LanguaguesSelector() {
  return (
    <Select
      defaultValue={languages[0]}
      // onChange={handleProvinceChange}
      options={languages.map((language: string, i: number) => ({
        label: <span className="font-semibold">{language}</span>,
        value: language,
      }))}
      className={`w-[110px] mr-[30px] h-[45%]`}
    />
  )
}
function useMemo(arg0: () => Cookies, arg1: never[]) {
  throw new Error("Function not implemented.");
}

