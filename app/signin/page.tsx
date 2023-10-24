"use client"
import Link from 'next/link'
import React, {useState} from 'react'

export default function SignIn() {
  const [inputValue, setInputValue] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [inputPasswordValue, setInputPasswordValue] = useState('');
  const [inputPasswordFocused, setInputPasswordFocused] = useState(false);
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

  return (
    <main className="bg-white py-5">
      <div className="py-6 max-w-md mx-auto bg-white rounded-xl shadow-lg border">
        <div className="flex flex-col justify-center items-center">
          <button className="bg-transparent text-4xl my-6 text-primary font-bold font-mainfont">
            <Link href="/">UETable</Link>
          </button>
          <div className="text-3xl text-black font-bold text-center my-8">Đăng Nhập</div>
          <div className="w-full flex flex-col justify-center items-center p-6">
            <div className="flex w-full justify-center relative pb-6">
              <div className="absolute bottom-21 left-5 bg-white px-2">
                <p className="text-gray-500 text-xs font-semibold">EMAIL / MSSV</p>
              </div>
              <div className="w-full flex flex-col pr-4">
                <input
                  value={inputValue}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  type="text"
                  className={`w-full border rounded-lg text-black caret-black p-4 m-2 ${inputFocused && inputValue === '' ? 'border-red-500':''}`}
                  placeholder="Nhập email hoặc MSSV">
                </input>
                  {inputFocused && inputValue === '' && (
                  <p className="text-red-500 ml-2 text-sm">Vui lòng nhập email hoặc MSSV</p>
                  )}
              </div>
            </div>
            <div className="flex w-full justify-center relative">
              <div className="absolute bottom-15 left-5 bg-white px-2">
                <p className="text-gray-500 text-xs font-semibold">MẬT KHẨU</p>
              </div>
              <div className="w-full flex flex-col pr-4">
                <input
                  value={inputPasswordValue}
                  onChange={handleInputPasswordChange}
                  onFocus={handleInputPasswordFocus}
                  type="password"
                  className={`w-full border rounded-lg text-black caret-black p-4 m-2 ${inputPasswordFocused && inputPasswordValue === '' ? 'border-red-500':''}`}
                  placeholder="Nhập mật khẩu">
                </input>
                {inputPasswordFocused && inputPasswordValue === '' && (
                  <p className="text-red-500 ml-2 text-sm">Vui lòng nhập mật khẩu</p>
                  )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end items-end">
          <button className="text-sm text-primary mr-8 hover:underline hover:underline-offset-2">Quên mật khẩu?</button>
        </div>
        <div className="w-full flex justify-between">
        <button className="text-lg text-black rounded-lg px-6 py-2 font-bold ml-8 mt-16 hover:bg-slate-300">
            <Link href="/">Quay lại</Link>
          </button>
          <button className="text-lg text-white rounded-lg bg-primary px-3 py-2 mr-8 mt-16 hover:bg-dark-primary">
            <Link href="/">Đăng nhập</Link>
          </button>
        </div>
      </div>
    </main>
  )
}
