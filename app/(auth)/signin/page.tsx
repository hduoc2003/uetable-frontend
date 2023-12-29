"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { CloseCircleFilled, CloseCircleTwoTone, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import Fetcher from '@/api/Fetcher'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector } from '@/redux/auth/authSelector'
import { authActions } from '@/redux/auth/authSlice'
import { useRouter } from 'next/navigation'
import { cookies } from '@/app/(dashboard)/layout'

interface SignInResponse {
  message: string,
  authToken: string,
  studentid: string,
  role: string,
}

interface UserInfoResponse {
  id: string,
  name: string,
  studentId: string,
  date: string,
  avatar: string,
}

export default function SignIn() {
  const dispatch = useDispatch();
  const authState = useSelector(authSelector);
  const [inputValue, setInputValue] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [inputPasswordValue, setInputPasswordValue] = useState('');
  const [inputPasswordFocused, setInputPasswordFocused] = useState(false);
  const [type, setType] = useState("password");
  const [logInError, setLogInError] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleInputPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPasswordValue(e.target.value);
  };
  const handleInputFocus = () => {
    setInputFocused(true);
  };
  const handleInputPasswordFocus = () => {
    setInputPasswordFocused(true);
  };
  const changeStatus = () => {
    if (type == "password")
      setType("text");
    else
      setType("password");
  }

  async function handleSignIn() {
    Fetcher.get<any, UserInfoResponse>('/users/' + inputValue)
      .then((response: UserInfoResponse) => {
        dispatch(authActions.updateAuthState({
          signedIn: true,
          logging: false,
          username: inputValue,
          name: response.name,
        }));
        router.push('/');
      })
  };

  const handleForgotPasswordClick = () => {
    router.push('/forgotpassword');
  }

  async function onSignInClick() {
    setLogInError("");

    Fetcher.post<any, SignInResponse>('/users/auth', {
      "studentid": inputValue,
      "password": inputPasswordValue,
    }).then((response: SignInResponse) => {
      const expiresDate = new Date();
      expiresDate.setDate(expiresDate.getDate() + 999999);
      cookies.set('authToken', response.authToken, {
        expires: expiresDate,
      });
      cookies.set('studentid', inputValue, {
        expires: expiresDate,
      });
      cookies.set('password', inputPasswordValue, {
        expires: expiresDate,
      });
      cookies.set('role', response.role, {
        expires: expiresDate,
      });
      handleSignIn();
    }).catch((error) => {
      setLogInError("Tài khoản hoặc mật khẩu không đúng.");
    });
  }


  return (
    <main className="h-screen flex">
      <div className="py-6 w-[420px] mx-auto bg-white rounded-xl shadow-lg border self-center">
        <div className="flex flex-col justify-center items-center">
          <button className="bg-transparent text-4xl my-6 text-primary font-bold font-mainfont">
            <Link href="/">UETable</Link>
          </button>
          <div className="text-3xl text-black font-bold text-center my-8">Đăng Nhập</div>
          <div className="w-full flex flex-col justify-center items-center p-6">
            <div className="flex w-full justify-center relative pb-6">
              <div className="absolute bottom-21 left-5 bg-white px-2 flex gap-[2px]">
                <pre className='text-red-500 text-xs'>*</pre>
                <p className="text-gray-500 text-xs font-semibold">EMAIL / MSSV</p>
              </div>
              <div className="w-full flex flex-col pr-4">
                <input
                  value={inputValue}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  type="text"
                  name='email'
                  className={`w-full border rounded-lg text-black caret-black p-4 m-2 ${inputFocused && inputValue === '' ? 'border-red-500' : ''}`}
                  placeholder="Nhập email hoặc MSSV">
                </input>
                {inputFocused && inputValue === '' && (
                  <p className="text-red-500 ml-2 text-sm">Vui lòng nhập email hoặc MSSV</p>
                )}
              </div>
            </div>
            <div className="flex w-full justify-center relative">
              <div className="absolute bottom-15 left-5 bg-white px-2 flex gap-[2px]">
                <pre className='text-red-500 text-xs'>*</pre>
                <p className="text-gray-500 text-xs font-semibold">MẬT KHẨU</p>
              </div>
              <div className="w-full flex flex-col pr-4">
                <input
                  value={inputPasswordValue}
                  onChange={handleInputPasswordChange}
                  onFocus={handleInputPasswordFocus}
                  type={type}
                  className={`w-full border rounded-lg text-black caret-black p-4 m-2 ${inputPasswordFocused && inputPasswordValue === '' ? 'border-red-500' : ''}`}
                  placeholder="Nhập mật khẩu">
                </input>
                {inputPasswordFocused && inputPasswordValue === '' && (
                  <p className="text-red-500 ml-2 text-sm">Vui lòng nhập mật khẩu</p>
                )}
              </div>
              <div>
                {type == "password" && (
                  <EyeInvisibleOutlined className="absolute top-8 right-6" onClick={changeStatus} />
                )}
                {type == "text" && (
                  <EyeOutlined className="absolute top-8 right-6" onClick={changeStatus} />
                )}
              </div>
            </div>
            {logInError != "" && (
              <div className='w-full p-2'>
                <div className='w-full rounded-lg flex bg-red-300 p-4 mt-6'>
                  <CloseCircleFilled style={{ color: '#FF0000' }} />
                  <p className='text-sm ml-4'>{logInError}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full flex justify-end items-end">
          <button className="text-sm text-primary mr-8 hover:underline hover:underline-offset-2" onClick={handleForgotPasswordClick}>Quên mật khẩu?</button>
        </div>
        <div className="w-full flex justify-end items-end">
          Chưa có tài khoản?
          <button className="text-sm text-primary mr-8 mt-2 ml-2 hover:underline hover:underline-offset-2">
            <Link href="/signup">Đăng ký ngay</Link>
          </button>
        </div>
        <div className="w-full flex justify-between">
          <button className="text-lg text-black rounded-lg px-6 py-2 font-bold ml-8 mt-16 hover:bg-slate-300">
            <Link href="/">Quay lại</Link>
          </button>
          <button className="text-lg text-white rounded-lg bg-primary px-3 py-2 mr-8 mt-16 hover:bg-dark-primary" onClick={onSignInClick}>
            Đăng nhập
          </button>
        </div>
      </div>
    </main>
  )
}
