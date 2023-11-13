"use client"
import Link from 'next/link'
import React, { use, useState } from 'react'
import { EyeOutlined } from '@ant-design/icons';

export default function SignUp() {

  const [mssv, setMssv] = useState("")
  const [password, setPassword] = useState("")
  const [classnameE, setClassnameE] = useState("border hover:border-sky-500 w-full h-14 rounded-lg px-2")
  const [classnameP, setClassnameP] = useState("border hover:border-sky-500 w-full h-14 rounded-lg px-2")
  const [note, setNote] = useState("")
  const [type, setType] = useState("password")
  const [eye, setEye] = useState("relative top-10 left-72 text-balck")
  const [nlink, setNlink] = useState("")
  const [check, setCheck] = useState("false")

  function changeStatus() {
    if(type == "password") {
      setType("text");
      setEye("relative top-10 left-72 text-sky-300")
    }
    else {
      setType("password")
      setEye("relative top-10 left-72 text-balck")
    }
  }

  function handleClick() {
    if(mssv.length == 0) {
      setClassnameE("border border-red-600 hover:border-sky-500 w-full h-14 rounded-lg px-2")
      setNote("Bạn phải nhập MSSV")
      setCheck("false")
      setNlink("")
    }
    else {
      setClassnameE("border hover:border-sky-500 w-full h-14 rounded-lg px-2")
    }

    if(password.length == 0) {
      setClassnameP("border border-red-600 hover:border-sky-500 w-full h-14 rounded-lg px-2")
      setNote("Bạn phải nhập mật khẩu")
      setCheck("false")
      setNlink("")
    }
    else {
      setClassnameP("border hover:border-sky-500 w-full h-14 rounded-lg px-2")
    }

    if(mssv.length == 0 && password.length == 0) {
      setNote("Bạn phải nhập MSSV và mật khẩu")
      setCheck("false")
      setNlink("")
    }
    if(mssv.length > 0 && password.length > 0) {
      setNote("")
      setCheck("true")
      setNlink("/signin")
    }
  }

  return (
    <main className="bg-white py-10">

      <div className="mx-auto bg-white max-w-sm max-h-max border shadow-lg py-7 rounded-lg">

        <div className="flex flex-col justify-center items-center">
          <div className="text-blue-600 text-3xl font-bold">UETable</div> <br />
          <div className="font-bold text-3xl">Đăng ký</div> <br />
        </div>

        <div className="mx-auto w-5/6 flex flex-col justify-center">

          <div className="relative top-2 left-1 w-16">
            <div className="absolute bg-white w-full px-2">
              <label htmlFor="mssv" className="text-xs w-full text-red-600 font-medium">*  </label>
              <label htmlFor="mssv" className="text-xs text-gray-400 w-full font-medium">MSSV</label>
            </div>
          </div> <br />

          <input className={classnameE} type="text" id = "mssv" placeholder='Nhập mã số sinh viên' value={mssv} onChange={(evt) => setMssv(evt.target.value)} /> <br />

          <div className="relative top-2 left-1 w-20">
            <div className="absolute bg-white w-full px-2">
              <label htmlFor="mssv" className="text-xs w-full text-red-600 font-medium">*  </label>
              <label htmlFor="mssv" className="text-xs text-gray-400 w-full font-medium">Mật khẩu</label>
            </div>
          </div>

          <div>
            <EyeOutlined className={eye} onClick={changeStatus} />
          </div>

          <input className={classnameP} type={type} maxLength={32} id = "password" placeholder='Nhập mật khẩu' value={password} onChange={(evt) => setPassword(evt.target.value)} />  <br />

          <div className="relative top-2 left-1 w-20">
            <div className="absolute bg-white w-full px-2">
              <label htmlFor="Full Name" className="text-xs text-gray-400 w-full font-medium">Họ và tên</label>
            </div>
          </div> <br />
            <input className="border hover:border-sky-500 w-full h-14 rounded-lg px-2" type="text" id = "Full Name" placeholder='Nhập họ và tên' /> <br />

            <div className="relative top-2 left-1 w-12">
            <div className="absolute bg-white w-full px-2">
            <label htmlFor="email" className="text-xs text-gray-400 w-full font-medium"> Email</label>
            </div>
          </div> <br />
            <input className="border hover:border-sky-500 w-full h-14 rounded-lg px-2" type="text" id = "email" placeholder='Nhập email' /> <br />

          <div className="text-sm text-red-600 w-full font-medium italic">{note}</div> <br />

        </div>

        <div className="mx-10 flex justify-between">
          <button className="font-bold bg-slate-300 hover:bg-sky-300 text-black rounded-2xl w-28 h-10 ">
          <Link href="/">Back</Link>
          </button>

          <button className="font-bold bg-black hover:bg-sky-300 text-white rounded-2xl w-28 h-10"
          onClick={() => handleClick()}> <Link href = {nlink}>Next</Link> </button>
        </div>

      </div>

    </main>
  )
}
