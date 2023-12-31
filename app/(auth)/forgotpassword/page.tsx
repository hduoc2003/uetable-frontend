"use client"
import Fetcher from '@/api/Fetcher';
import { CloseCircleFilled } from '@ant-design/icons';
import Link from 'next/link'
import React, { useState } from 'react'
import Cookies from 'universal-cookie';
import Image from 'next/image'

export default function ForgotPassword() {
    const [inputMSSV, setMSSV] = useState("");
    const [inputFocused, setInputFocused] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [noMSSV, setNoMSSV] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [noti, setNoti] = useState("Đường link lấy lại mật khẩu sẽ được gửi tới email của bạn.");
    const cookies = new Cookies();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMSSV(e.target.value);
    };

    const handleInputFocus = () => {
        setInputFocused(true);
    };

    async function onConfirmClick() {
        setSubmitError("");
        setNoti("");
        if (inputMSSV === "") {
            setNoMSSV(true);
            return;
        }
        setIsSending(true);
        // if (cookies.get('forgotpassword')) {
        //     const cookieValue = cookies.get('forgotpassword');
        //     const expiresTime = new Date(cookieValue.expires);
        //     const currentTime = new Date();
        //     const timeRemaining = expiresTime.getTime() - currentTime.getTime();
        //     console.log(cookieValue.expires);
        //     console.log(currentTime);
        //     console.log(timeRemaining);
        //     const secondsRemaining = Math.ceil(timeRemaining / 1000);
        //     setSubmitError("Vui lòng thử lại sau " + secondsRemaining + " giây.");
        //     setIsSending(false)
        //     return;
        // }
        Fetcher.post('/users/forgot-password', {
            "studentid": inputMSSV
        }).then((response) => {
            console.log(response);
            setNoti("Thành công! Hãy kiểm tra mail của bạn.");
            const expiresDate = new Date(Date.now() + 60000);
            cookies.set('forgotpassword', true, {
                expires: expiresDate,
                path: '/'
            })
            console.log(cookies.get('forgotpassword')); 
            setIsSending(false)
        }).catch((error) => {
            // console.log(error.response.data.error);
            setIsSending(false)
            setSubmitError("MSSV không tồn tại!");
            // setNoti("Hãy kiểm tra lại MSSV của bạn.");
        })
    }

    return (

        <main className="flex justify-center p-[48px] bg-[#FCFCFC] h-screen relative">
      <div className="max-w-[350px]">
        <div>
          <button className="bg-transparent text-[48px] my-6 text-primary font-bold font-mainfont">
            <Link href="/">
              <Image alt='logo' src="https://static.vecteezy.com/system/resources/previews/024/241/000/original/colorful-shiba-inu-dog-shiba-inu-portrait-dog-sticker-clip-art-dog-lover-design-ai-generated-png.png" width={96} height={96} />
            </Link>
          </button>
        </div>
        <div className="text-[48px] text-black font-semibold my-8 tracking-tighter">Quên mật khẩu?</div>
        {/* <div className="flex flex-col justify-center items-center"> */}
        
        {/* <div className="w-full justify-center relative"> */}
          {/* <div className="absolute bottom-21 left-5 bg-white px-2 flex gap-[2px]">
            <pre className='text-red-500 text-xs'>*</pre>
            <p className="text-gray-500 text-xs font-semibold">MSSV</p>
          </div> */}
          <div className="w-full mb-4 relative">
            <input
              value={inputMSSV}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              type="text"
              name='email'
              className={`focus:bg-white focus:border focus:border-[#9A9FA5] w-full pl-8 h-[48px] px-[10px] rounded-lg bg-[#F4F4F4] font-semibold ${inputFocused && inputMSSV === '' ? 'border-red-500' : ''}`}
              placeholder="Nhập MSSV">
            </input>
            {noMSSV && inputMSSV === '' && (
              <p className="text-red-500 mt-2 ml-2 text-sm font-medium">*Vui lòng nhập MSSV</p>
            )}
          </div>
        {/* </div> */}
          
          
          {/* <div className="w-full flex flex-col justify-center items-center p-6"> */}
      
        
          {/* </div> */}
        {/* </div> */}

        {/* <div className="w-full flex justify-between"> */}
          {/* <button className="text-lg text-black rounded-lg px-6 py-2 font-bold ml-8 mt-16 hover:bg-slate-300">
            <Link href="/">Quay lại</Link>
          </button> */}
          <div className='w-full mt-2'>
            <button className="font-bold text-white rounded-lg bg-primary w-full py-2 hover:bg-dark-primary" onClick={onConfirmClick}>
                {
                  isSending===true? (<span> Đang xác nhận  </span>) : (<span> Xác nhận </span>)
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
        {/* <div className="w-full flex justify-end items-end mt-2">
          <button className="text-sm text-primary font-semibold text-gray-600 hover:underline hover:underline-offset-2" onClick={handleForgotPasswordClick}>Quên mật khẩu?</button>
        </div> */}

        {submitError != "" && (
          <div className='w-full relative'>
            <div className='w-full rounded-lg flex bg-red-200 p-4 mt-6 absolute top-0'>
              <CloseCircleFilled style={{ color: '#FF0000' }} />
              <p className='text-sm ml-4 font-semibold text-red-600'>{submitError}</p>
            </div>
          </div>
        )}

        {noti != "" && (
          <div className='w-full relative'>
            <div className='w-full rounded-lg flex bg-green-200 p-4 mt-6 absolute top-0'>
              {/* <CloseCircleFilled style={{ color: '#FF0000' }} /> */}
              <p className='text-sm ml-4 font-semibold text-green-600'>{noti}</p>
            </div>
          </div>
        )}

        <div className="text-sm font-bold absolute bottom-16">
          <span className='font-semibold text-gray-700'>Bạn đã có tài khoản? </span>
          <button className="text-primary hover:underline hover:underline-offset-2">
            <Link href="/signin">Đăng nhập ngay</Link>
          </button>
        </div>
        
      </div>
    </main>
        // <div className="h-screen flex">
        //     <div className="py-6 w-[420px] mx-auto bg-white rounded-xl shadow-lg border self-center">
        //         <div className="flex flex-col justify-center items-center">
        //             <button className="bg-transparent text-4xl my-6 text-primary font-bold font-mainfont">
        //                 <Link href="/">UETable</Link>
        //             </button>
        //             <div className="text-3xl text-black font-bold text-center my-8">Quên mật khẩu</div>
        //             <div className="w-full flex flex-col justify-center items-center p-6">
        //                 <div className="flex w-full justify-center relative pb-6">
        //                     <div className="absolute bottom-21 left-5 bg-white px-2 flex gap-[2px]">
        //                         <pre className='text-red-500 text-xs'>*</pre>
        //                         <p className="text-gray-500 text-xs font-semibold">MSSV</p>
        //                     </div>
        //                     <div className="w-full flex flex-col pr-4">
        //                         <input
        //                             value={inputMSSV}
        //                             onChange={handleInputChange}
        //                             onFocus={handleInputFocus}
        //                             type="text"
        //                             className={`w-full border rounded-lg text-black caret-black p-4 m-2 ${inputFocused && inputMSSV === '' ? 'border-red-500' : ''}`}
        //                             placeholder="Nhập MSSV">
        //                         </input>
        //                         {inputFocused && inputMSSV === '' && (
        //                             <p className="text-red-500 ml-2 text-sm">Vui lòng nhập MSSV</p>
        //                         )}
        //                     </div>
        //                 </div>
        //                 <div className='m-2'>
        //                     <p className=''>{noti}</p>
        //                 </div>
        //                 {submitError != "" && (
        //                     <div className='w-full p-2'>
        //                         <div className='w-full rounded-lg flex bg-red-300 p-4 mt-6'>
        //                             <CloseCircleFilled style={{ color: '#FF0000' }} />
        //                             <p className='text-sm ml-4'>{submitError}</p>
        //                         </div>
        //                     </div>
        //                 )}
        //             </div>
        //         </div>
        //         <div className="w-full flex justify-between">
        //             <button className="text-lg text-black rounded-lg px-6 py-2 font-bold ml-8 mt-16 hover:bg-slate-300">
        //                 <Link href="/signin">Quay lại</Link>
        //             </button>
        //             <button className="text-lg text-white rounded-lg bg-primary px-3 py-2 mr-8 mt-16 hover:bg-dark-primary" onClick={onConfirmClick}>
        //                 Xác nhận
        //             </button>
        //         </div>
        //     </div>
        // </div>
    )
}
