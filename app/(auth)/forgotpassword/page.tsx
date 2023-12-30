"use client"
import Fetcher from '@/api/Fetcher';
import { CloseCircleFilled } from '@ant-design/icons';
import Link from 'next/link'
import React, { useState } from 'react'
import Cookies from 'universal-cookie';

export default function ForgotPassword() {
    const [inputMSSV, setMSSV] = useState("");
    const [inputFocused, setInputFocused] = useState(false);
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
        if (cookies.get('forgotpassword')) {
            const cookieValue = cookies.get('forgotpassword');
            const expiresTime = new Date(cookieValue.expires);
            const currentTime = new Date();
            const timeRemaining = expiresTime.getTime() - currentTime.getTime();
            console.log(cookieValue.expires);
            console.log(currentTime);
            console.log(timeRemaining);
            const secondsRemaining = Math.ceil(timeRemaining / 1000);
            setSubmitError("Vui lòng thử lại sau " + secondsRemaining + " giây.");
            return;
        }
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
        }).catch((error) => {
            console.log(error.response.data.error);
            setSubmitError("MSSV không tồn tại!");
            setNoti("Hãy kiểm tra lại MSSV của bạn.");
        })
    }

    return (
        <div className="h-screen flex">
            <div className="py-6 w-[420px] mx-auto bg-white rounded-xl shadow-lg border self-center">
                <div className="flex flex-col justify-center items-center">
                    <button className="bg-transparent text-4xl my-6 text-primary font-bold font-mainfont">
                        <Link href="/">UETable</Link>
                    </button>
                    <div className="text-3xl text-black font-bold text-center my-8">Quên mật khẩu</div>
                    <div className="w-full flex flex-col justify-center items-center p-6">
                        <div className="flex w-full justify-center relative pb-6">
                            <div className="absolute bottom-21 left-5 bg-white px-2 flex gap-[2px]">
                                <pre className='text-red-500 text-xs'>*</pre>
                                <p className="text-gray-500 text-xs font-semibold">MSSV</p>
                            </div>
                            <div className="w-full flex flex-col pr-4">
                                <input
                                    value={inputMSSV}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    type="text"
                                    className={`w-full border rounded-lg text-black caret-black p-4 m-2 ${inputFocused && inputMSSV === '' ? 'border-red-500' : ''}`}
                                    placeholder="Nhập MSSV">
                                </input>
                                {inputFocused && inputMSSV === '' && (
                                    <p className="text-red-500 ml-2 text-sm">Vui lòng nhập MSSV</p>
                                )}
                            </div>
                        </div>
                        <div className='m-2'>
                            <p className=''>{noti}</p>
                        </div>
                        {submitError != "" && (
                            <div className='w-full p-2'>
                                <div className='w-full rounded-lg flex bg-red-300 p-4 mt-6'>
                                    <CloseCircleFilled style={{ color: '#FF0000' }} />
                                    <p className='text-sm ml-4'>{submitError}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full flex justify-between">
                    <button className="text-lg text-black rounded-lg px-6 py-2 font-bold ml-8 mt-16 hover:bg-slate-300">
                        <Link href="/signin">Quay lại</Link>
                    </button>
                    <button className="text-lg text-white rounded-lg bg-primary px-3 py-2 mr-8 mt-16 hover:bg-dark-primary" onClick={onConfirmClick}>
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    )
}
