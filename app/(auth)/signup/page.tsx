"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import Fetcher from '@/api/Fetcher';
import { useRouter } from 'next/navigation';

export default function SignUp() {

  const [mssv, setMssv] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [classnameE, setClassnameE] = useState("border hover:border-sky-500 w-full h-14 rounded-lg px-2");
  const [classnameP, setClassnameP] = useState("border hover:border-sky-500 w-full h-14 rounded-lg px-2");
  const [note, setNote] = useState("");
  const [type, setType] = useState("password");
  const router = useRouter();

  function ChangeStatus() {
    if(type == "password") setType("text");
    else setType("password")
  }

  async function HandleAccount() {
    try {
      let data = await Fetcher.post('/users/', {
        "name": fullname,
        "studentid": mssv,
        "password": password
      });
      console.log(data);
      router.push("/signin");
    } catch (error) {
      setNote("Tài khoản không hợp lệ hoặc đã tồn tại.")
    }
  }

  function HandleBlank() {
    if(mssv.length === 0) {
      setClassnameE("border border-red-600 hover:border-sky-500 w-full h-14 rounded-lg px-2")
      setNote("Bạn phải nhập MSSV.")
    }
    else {
      setClassnameE("border hover:border-sky-500 w-full h-14 rounded-lg px-2")
    }

    if(password.length === 0) {
      setClassnameP("border border-red-600 hover:border-sky-500 w-full h-14 rounded-lg px-2")
      setNote("Bạn phải nhập mật khẩu.")
    }
    else {
      setClassnameP("border hover:border-sky-500 w-full h-14 rounded-lg px-2")
    }

    if(mssv.length === 0 && password.length === 0) {
      setNote("Bạn phải nhập MSSV và mật khẩu.")
    }
  }

  function HandleClick() {
    HandleBlank();
    if(mssv.length !== 0 && password.length !== 0) {HandleAccount();}
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
            {type == "password" && (<EyeInvisibleOutlined className="relative top-10 left-72" onClick={ChangeStatus} />)}
            {type == "text" && (<EyeOutlined className="relative top-10 left-72" onClick={ChangeStatus} />)}
          </div>

          <input className={classnameP} type={type} maxLength={32} id = "password" placeholder='Nhập mật khẩu' value={password} onChange={(evt) => setPassword(evt.target.value)} />  <br />

          <div className="relative top-2 left-1 w-20">
            <div className="absolute bg-white w-full px-2">
              <label htmlFor="Full Name" className="text-xs text-gray-400 w-full font-medium">Họ và tên</label>
            </div>
          </div> <br />
            <input className="border hover:border-sky-500 w-full h-14 rounded-lg px-2" type="text" id = "Full Name" placeholder='Nhập họ và tên' value={fullname} onChange={(evt) => setFullname(evt.target.value)} /> <br />

            <div className="relative top-2 left-1 w-12">
            <div className="absolute bg-white w-full px-2">
            </div>
          </div> <br />

          <div className="text-sm text-red-600 w-full font-medium italic">{note}</div> <br />

        </div>

        <div className="mx-10 flex justify-between">
          <button className="font-bold bg-slate-300 hover:bg-sky-300 text-black rounded-2xl w-28 h-10 ">
          <Link href="/">Back</Link>
          </button>

          <button className="font-bold bg-black hover:bg-sky-300 text-white rounded-2xl w-28 h-10"
          onClick={() => HandleClick()}>Next</button>
        </div>

      </div>

    </main>
  )
}
