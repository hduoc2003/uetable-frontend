"use client";

import { THEME } from "@/styles/theme";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "@/redux/auth/authSlice";
import { authSelector } from "@/redux/auth/authSelector";
import { AuthState } from "@/redux/auth/authSlice";
import { Avatar, Badge, Divider, Select, Popover } from "antd";
import { IoNotificationsOutline, IoNotifications } from "react-icons/io5";
import SearchBar from "../../common/SearchBar/SearchBar";
import Link from "next/link";
import { MAIN_FONT } from "@/styles/fonts";
import NotificationIcon from "../../common/(Icons)/NotificationIcon";
import Fetcher from "@/api/Fetcher";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "universal-cookie";
import { UserInfoResponse } from "@/api/userAPI";
import { cookies } from "@/app/(dashboard)/layout";
import { contentt } from "../Settings";
import Notifications from "./Notifications";
import { useDebouncedCallback } from "use-debounce";
import { getURL } from "@/utils/navigation";
interface TabProps {
  selected: boolean;
  children: ReactNode;
}



export default function Header() {
  const [avtStrokeColor, setAvtStrokeColor] = useState<string>(THEME.PRIMARY_COLOR);
  const authState = useSelector(authSelector);
  const dispatch = useDispatch();
  const router = useRouter();
  const [scroll, setScroll] = useState(false)
  const [openAvt, setOpenAvt] = useState(false)
  const searchValue = useRef('')
  const searchParams = useSearchParams();

  const handleOnSearch = useDebouncedCallback((): void => {
    router.replace(getURL('/search', {
      subjectName: searchValue.current
    }))
  })

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    if (authState?.signedIn) {
      Fetcher.get<any, UserInfoResponse>('/users/' + authState?.studentId)
        .then((response) => {
          dispatch(authActions.updateAuthState({
            avtLink: response.avatar
          }))
        });
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [authState?.signedIn, authState?.studentId, dispatch]);
  // console.log(value)

  const handleSignOut = () => {
    cookies.remove('authToken', {
      path: '/'
    });
    dispatch(authActions.updateAuthState({
      signedIn: false,
      logging: false,
      name: '',
      studentId: '',
    }));
    router.push('/');
  }

  const handleProfile = () => {
    setOpenAvt(false)
    router.push('/profile?studentid=' + cookies.get('studentid'));
  }

  return (
    <header
      className="sticky top-0 z-[1000] bg-underground"
      style={{
        transition: 'padding-left 0.3s ease-in-out'
      }}
    >
      <div
        className="flex items-center h-[80px] bg-secondary px-8"
        style={{
          // borderTopLeftRadius: scroll ? 0 : THEME.LAYOUT_ELEMENT_BORDER_RADIUS,
          // borderBottomLeftRadius: scroll ? 0 : THEME.LAYOUT_ELEMENT_BORDER_RADIUS,
          transition: 'border-radius 0.3s ease-in-out',
          boxShadow: 'inset 1px 0px 0px #F4F4F4, inset 0 -1px 0px #EFEFEF'
        }}
      >
        <div className="flex-1">
          <SearchBar
            placeholder="Tìm kiếm học phần"
            className="w-[25vw]"
            onPressEnter={() => handleOnSearch()}
            onChange={(e) => searchValue.current = e.target.value}
            defaultValue={searchParams.get('subjectName') ?? ''}
          />
        </div>
        {/* <LanguaguesSelector /> */}
        {
          authState.signedIn ?
            <div className="flex mr-5 items-center">
              <Notifications />
              <button
                onMouseEnter={() => setAvtStrokeColor(THEME.DARK_PRIMARY_COLOR)}
                onMouseLeave={() => setAvtStrokeColor(THEME.PRIMARY_COLOR)}
              >
                <div className="relative flex">
                  <Popover
                    content={contentt(handleProfile, handleSignOut, cookies.get('role'))}
                    trigger="click"
                    arrow={false}
                    placement='bottomLeft'
                    open={openAvt}
                    onOpenChange={(vis) => setOpenAvt(vis)}
                  // className="bg-white"
                  >
                    <Avatar className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" src={authState.avtLink} size={40}></Avatar>
                    <svg width="50" height="50" viewBox="0 0 32 32"><circle r="15" cx="16" cy="16" fill="none" strokeWidth="2" style={{ stroke: avtStrokeColor }}></circle></svg>
                  </Popover>
                </div>
              </button>
              <div className="ml-3">
                <div className="font-semibold ">Xin chào,</div>
                <div className="text-xs font-semibold">{`${authState.studentId} ${authState.name}`}</div>
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

