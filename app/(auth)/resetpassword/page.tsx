"use client"
import Fetcher from '@/api/Fetcher';
import { CloseCircleFilled } from '@ant-design/icons';
import Link from 'next/link'
import React, {useState} from 'react'
import { useSearchParams } from 'next/navigation';

export default function ResetPassword() {
    
    const searchParams = useSearchParams();
    

    const authToken = searchParams.get("token");

    const [inputPassword, setPassword] = useState("");
    const [inputFocused, setInputFocused] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [changeSuccess, setChangeSuccess] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleInputFocus = () => {
        setInputFocused(true);
    };

    async function onConfirmClick() {
        setSubmitError("");
        Fetcher.post('/users/reset/' + authToken, {
            "password": inputPassword
        }).then((response) => {
            console.log(response);
            setChangeSuccess(true);
        }).catch((error) => {
            console.log(error);
            setSubmitError("Đã có lỗi xảy ra khi đổi mật khẩu. Vui lòng thử lại sau ít phút.")
        })
    }

    return (
        <div className="h-screen flex">
            <div className="py-6 w-[420px] mx-auto bg-white rounded-xl shadow-lg border self-center">
                <div className="flex flex-col justify-center items-center">
                    <button className="bg-transparent text-4xl my-6 text-primary font-bold font-mainfont">
                        <Link href="/">UETable</Link>
                    </button>
                    <div className="text-3xl text-black font-bold text-center my-8">Mật khẩu mới</div>
                    {
                        changeSuccess && (
                            <p>Đổi mật khẩu thành công</p>
                        )
                    }
                    {
                        changeSuccess == false && (
                            <div className="w-full flex flex-col justify-center items-center p-6">
                                <div className="flex w-full justify-center relative pb-6">
                                    <div className="absolute bottom-21 left-5 bg-white px-2 flex gap-[2px]">
                                        <pre className='text-red-500 text-xs'>*</pre>
                                        <p className="text-gray-500 text-xs font-semibold">Mật khẩu mới</p>
                                    </div>
                                    <div className="w-full flex flex-col pr-4">
                                        <input
                                        value={inputPassword}
                                        onChange={handleInputChange}
                                        onFocus={handleInputFocus}
                                        type="text"
                                        className={`w-full border rounded-lg text-black caret-black p-4 m-2 ${inputFocused && inputPassword === '' ? 'border-red-500':''}`}
                                        placeholder="Nhập mật khẩu mới">
                                        </input>
                                        {inputFocused && inputPassword === '' && (
                                        <p className="text-red-500 ml-2 text-sm">Vui lòng nhập mật khẩu</p>
                                        )}
                                    </div>
                                </div>
                                {submitError != "" && (
                                    <div className='w-full p-2'>
                                        <div className='w-full rounded-lg flex bg-red-300 p-4 mt-6'>
                                            <CloseCircleFilled style={{color: '#FF0000'}}/>
                                            <p className='text-sm ml-4'>{submitError}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    }
                    
                </div>
                {
                    changeSuccess == false && (
                        <div className="w-full flex justify-between">
                            <button className="text-lg text-black rounded-lg px-6 py-2 font-bold ml-8 mt-16 hover:bg-slate-300">
                                <Link href="/forgotpassword">Quay lại</Link>
                            </button>
                            <button className="text-lg text-white rounded-lg bg-primary px-3 py-2 mr-8 mt-16 hover:bg-dark-primary" onClick={onConfirmClick}>
                                Xác nhận
                            </button>
                        </div>
                    )
                }
                {
                    changeSuccess && (
                        <div className="w-full flex justify-end">
                            <button className="text-lg text-white rounded-lg bg-primary px-3 py-2 mr-8 mt-16 hover:bg-dark-primary" onClick={onConfirmClick}>
                                <Link href='/signin'> Đăng nhập</Link>
                            </button>
                        </div>
                    )
                }
                
            </div>
        </div>
    );
}