"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { CloseCircleFilled, CloseCircleTwoTone, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import Fetcher from '@/api/Fetcher'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector } from '@/redux/auth/authSelector'
import { authActions } from '@/redux/auth/authSlice'
import { useRouter } from 'next/navigation'
import { cookies } from '@/app/(dashboard)/layout'
import { isUndefined, set } from 'lodash'
import { ClipLoader } from 'react-spinners'
import Image from 'next/image'

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
  const [noMSSV, setNoMSSV] = useState(false);
  const [noPassWord, setNoPassWord] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [inputPasswordValue, setInputPasswordValue] = useState('');
  const [inputPasswordFocused, setInputPasswordFocused] = useState(false);
  const [type, setType] = useState("password");
  const [isSending, setIsSending] = useState(false);
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

  // useEffect(() => {
  //   if (!isUndefined(cookies.get('authToken'))) {
  //     router.replace('/');
  //     return;
  //   }
  // }, [router])

  async function handleSignIn() {
    Fetcher.get<any, UserInfoResponse>('/users/' + inputValue)
      .then((response: UserInfoResponse) => {
        dispatch(authActions.updateAuthState({
          signedIn: true,
          logging: false,
          studentId: inputValue,
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
    
    let check = false;
    if (inputValue === '') {
      setNoMSSV(true);
      check = true;
    } 
    if (inputPasswordValue === '') {
      setNoPassWord(true);
      check = true;
    }

    if (check) {
      return
    }

    setIsSending(true);

    Fetcher.post<any, SignInResponse>('/users/auth', {
      "studentid": inputValue,
      "password": inputPasswordValue,
    }).then(async (response: SignInResponse) => {
      const expiresDate = new Date();
      expiresDate.setDate(expiresDate.getDate() + 999999);
      cookies.set('authToken', response.authToken, {
        expires: expiresDate,
        path: '/'
      });
      cookies.set('studentid', inputValue, {
        expires: expiresDate,
        path: '/'
      });
      cookies.set('password', inputPasswordValue, {
        expires: expiresDate,
        path: '/'
      });
      cookies.set('role', response.role, {
        expires: expiresDate,
        path: '/'
      });
      setIsSending(false);
      await handleSignIn();
    }).catch((error) => {
      setIsSending(false);
      // console.log(error)
      if (error.status === 401) {
        setLogInError("Mật khẩu không đúng.")
      } else if (error.status === 403) {
        setLogInError("Tài khoản của bạn không tồn tại")
      } else {
        setLogInError("Đã có lỗi xảy ra. Vui lòng thử lại sau.")
      }
    });
  }

  // console.log(cookies.get('authToken'))
  // if (!isUndefined(cookies.get('authToken')))
  //   return <></>

  return (
    <main className="flex justify-center p-[48px] bg-[#FCFCFC] h-screen relative">
      <div className="max-w-[296px]">
        <div>
          <button className="bg-transparent text-[48px] my-6 text-primary font-bold font-mainfont">
            <Link href="/">
              <Image alt='logo' src="https://static.vecteezy.com/system/resources/previews/024/241/000/original/colorful-shiba-inu-dog-shiba-inu-portrait-dog-sticker-clip-art-dog-lover-design-ai-generated-png.png" width={96} height={96} />
              {/* <div className="text-[64px] text-sky-700 font-bold my-8 tracking-tighter">UETable</div> */}
            </Link>
          </button>
        </div>
        <div className="text-[48px] text-black font-semibold my-8 tracking-tighter">Đăng Nhập</div>
        {/* <div className="flex flex-col justify-center items-center"> */}
        
        {/* <div className="w-full justify-center relative"> */}
          {/* <div className="absolute bottom-21 left-5 bg-white px-2 flex gap-[2px]">
            <pre className='text-red-500 text-xs'>*</pre>
            <p className="text-gray-500 text-xs font-semibold">MSSV</p>
          </div> */}
          <div className="w-full mb-4 relative">
            <input
              value={inputValue}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              type="text"
              name='email'
              className={`focus:bg-white focus:border focus:border-[#9A9FA5] w-full pl-8 h-[48px] px-[10px] rounded-lg bg-[#F4F4F4] font-semibold ${inputFocused && inputValue === '' ? 'border-red-500' : ''}`}
              placeholder="Nhập MSSV">
            </input>
            {noMSSV && inputValue === '' && (
              <p className="text-red-500 mt-2 ml-2 text-sm font-medium">*Vui lòng nhập MSSV</p>
            )}
          </div>
        {/* </div> */}
        <div className="w-full mb-2 relative">
          <div className='w-full relative'> 
            <input
              value={inputPasswordValue}
              onChange={handleInputPasswordChange}
              onFocus={handleInputPasswordFocus}
              type={type}
              className={`focus:bg-white focus:border focus:border-[#9A9FA5] w-full pl-8 h-[48px] px-[10px] rounded-lg bg-[#F4F4F4] font-semibold ${inputPasswordFocused && inputPasswordValue === '' ? 'border-red-500' : ''}`}
              placeholder="Nhập mật khẩu">

            </input>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  {type == "password" && (
                    <EyeInvisibleOutlined onClick={changeStatus} />
                  )}
                  {type == "text" && (
                    <EyeOutlined  onClick={changeStatus} />
                  )}
            </div>
          </div>
        
          {noPassWord && inputPasswordValue === '' && (
            <p className="text-red-500 mt-2 ml-2 text-sm font-medium">*Vui lòng nhập mật khẩu</p>
          )}

          
        </div>
          
          
          {/* <div className="w-full flex flex-col justify-center items-center p-6"> */}
      
        
          {/* </div> */}
        {/* </div> */}

        {/* <div className="w-full flex justify-between"> */}
          {/* <button className="text-lg text-black rounded-lg px-6 py-2 font-bold ml-8 mt-16 hover:bg-slate-300">
            <Link href="/">Quay lại</Link>
          </button> */}
          <div className='w-full mt-4'>
            <button className="font-bold text-white rounded-lg bg-primary w-full py-2 hover:bg-dark-primary" onClick={onSignInClick}>
                {
                  isSending===true? (<span>Đang đăng nhập  </span>) : (<span>Đăng nhập </span>)
                }
                
              {/* <span className={isSending===false?"flex items-center ml-2": "hidden items-center ml-2"}>
                  <ClipLoader
                  color="#2A85FF"
                  size={24}
                  cssOverride={{
                      'borderWidth': '4px'
                  }}
                  />
              </span> */}
            </button>
          </div>
          
        {/* </div> */}
        <div className="w-full flex justify-end items-end mt-2">
          <button className="text-sm text-primary font-semibold text-gray-600 hover:underline hover:underline-offset-2" onClick={handleForgotPasswordClick}>Quên mật khẩu?</button>
        </div>

        {logInError != "" && (
          <div className='w-full relative'>
            <div className='w-full rounded-lg flex bg-red-200 p-4 mt-6 absolute top-0'>
              <CloseCircleFilled style={{ color: '#FF0000' }} />
              <p className='text-sm ml-4 font-semibold text-red-600'>{logInError}</p>
            </div>
          </div>
        )}

        <div className="text-sm font-bold absolute bottom-16">
          <span className='font-semibold text-gray-700'>Bạn chưa có tài khoản? </span>
          <button className="text-primary hover:underline hover:underline-offset-2">
            <Link href="/signup">Đăng ký ngay</Link>
          </button>
        </div>
        
      </div>
    </main>
  )
}
