"use client"
import React, { useState } from 'react'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import Fetcher from '@/api/Fetcher';
import { useRouter } from 'next/navigation';
import { Result, Spin, Typography } from 'antd';
import Link from 'next/link';
import MyButtonWrapper from '@/components/common/(MyButton)/MyButtonWrapper';
import DoneIcon from '@/public/images/done.png'
import Image from 'next/image'
const { Text } = Typography

export default function SignUp() {

  const [mssv, setMssv] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [fullname, setFullname] = useState("");
  const [classnameE, setClassnameE] = useState("border hover:border-sky-500 w-full h-14 rounded-lg px-2");
  const [classnameP1, setClassnameP1] = useState("border hover:border-sky-500 w-full h-14 rounded-lg px-2");
  const [classnameP2, setClassnameP2] = useState("border hover:border-sky-500 w-full h-14 rounded-lg px-2");
  const [note, setNote] = useState("");
  const [type1, setType1] = useState("password");
  const [type2, setType2] = useState("password");
  const [sendEmail, setSendEmail] = useState(false);

  const router = useRouter();

  function ChangeStatus1() {
    if (type1 == "password") setType1("text");
    else setType1("password")
  }

  function ChangeStatus2() {
    if (type2 == "password") setType2("text");
    else setType2("password")
  }

  async function HandleAccount() {
    try {
      let data = await Fetcher.post('/users/', {
        "name": fullname,
        "studentid": mssv,
        "password": password1
      });
      setSendEmail(true)
      // console.log(data);
      // router.push("/signin");
    } catch (error) {
      setNote("Tài khoản không hợp lệ hoặc đã tồn tại.")
    }
  }

  function HandleBlank() {
    if (mssv.length === 0) {
      setClassnameE("border border-red-600 hover:border-sky-500 w-full h-14 rounded-lg px-2")
      setNote("Bạn phải nhập đầy đủ thông tin được đánh dấu *.")
    }
    else {
      setClassnameE("border hover:border-sky-500 w-full h-14 rounded-lg px-2")
    }

    if (mssv.length === 0 && password1.length === 0) {
      setNote("Bạn phải nhập đầy đủ thông tin được đánh dấu *.")
    }

    if (password2.length === 0) {
      setClassnameP2("border border-red-600 hover:border-sky-500 w-full h-14 rounded-lg px-2");
      setNote("Bạn phải nhập đầy đủ thông tin được đánh dấu *.");
    }
    else {
      setClassnameP2("border hover:border-sky-500 w-full h-14 rounded-lg px-2");
    }

    if (password1.length === 0) {
      setClassnameP1("border border-red-600 hover:border-sky-500 w-full h-14 rounded-lg px-2");
      setNote("Bạn phải nhập đầy đủ thông tin được đánh dấu *.");
    }
    else {
      setClassnameP1("border hover:border-sky-500 w-full h-14 rounded-lg px-2");
    }

    if (password1 !== password2 && password1.length !== 0 && password2.length !== 0 && mssv.length !== 0) {
      setNote("Mật khẩu và mật khẩu nhập lại không trùng khớp.")
    }
  }

  function HandleClick() {
    HandleBlank();
    if (mssv.length !== 0 && password1.length !== 0 && password2.length !== 0 && password1 === password2) { HandleAccount(); }
  }

  if (sendEmail)
    return (
      <main className='flex items-center h-screen w-creen justify-center bg-secondary'>
        <Result
          title={<Text strong className='text-lg'>{`Đường dẫn kích hoạt đã được gửi tới ${mssv}@vnu.edu.vn`}</Text>}
          extra={[
            <Link href={'/'} key={'home'}>
              <MyButtonWrapper className="border-2 px-2">
                <span className="font-semibold text-base">Trang chủ</span>
              </MyButtonWrapper>
            </Link>,
            <Link key={'signin'} href={'/signin'}>
              <MyButtonWrapper className="border-2 px-2">
                <span className="font-semibold text-base">Đăng nhập</span>
              </MyButtonWrapper>
            </Link>
          ]}
          icon={
            <Image src={DoneIcon} alt="" width={50} height={50} className="ml-auto mr-auto" />
          }
        />
      </main>
    )
  return (
    <main className="bg-white py-10 h-screen w-screen">

      <div className="mx-auto bg-white max-w-[400px] max-h-max border shadow-lg py-7 rounded-lg">

        <div className="flex flex-col justify-center items-center">
          <div className="text-blue-600 text-3xl font-bold">UETable</div> <br />
          <div className="font-bold text-3xl">Đăng ký</div> <br />
        </div>

        {
          <>
            <div className="mx-auto w-5/6 flex flex-col justify-center">

              <div className="relative top-2 left-1 w-16">
                <div className="absolute bg-white w-full px-2">
                  <label htmlFor="mssv" className="text-xs w-full text-red-600 font-medium">*  </label>
                  <label htmlFor="mssv" className="text-xs text-gray-400 w-full font-medium">MSSV</label>
                </div>
              </div> <br />

              <input className={classnameE} type="text" id="mssv" placeholder='Nhập mã số sinh viên' value={mssv} onChange={(evt) => setMssv(evt.target.value)} /> <br />

              <div className="relative top-2 left-1 w-20">
                <div className="absolute bg-white w-full px-2">
                  <label htmlFor="mssv" className="text-xs w-full text-red-600 font-medium">*  </label>
                  <label htmlFor="mssv" className="text-xs text-gray-400 w-full font-medium">Mật khẩu</label>
                </div>
              </div>

              <div>
                {type1 == "password" && (<EyeInvisibleOutlined className="relative top-10 left-[300px]" onClick={ChangeStatus1} />)}
                {type1 == "text" && (<EyeOutlined className="relative top-10 left-[300px]" onClick={ChangeStatus1} />)}
              </div>

              <input className={classnameP1} type={type1} maxLength={32} id="password" placeholder='Nhập mật khẩu' value={password1} onChange={(evt) => setPassword1(evt.target.value)} />  <br />

              <div className="relative top-2 left-1 w-[132px]">
                <div className="absolute bg-white w-full px-2">
                  <label htmlFor="mssv" className="text-xs w-full text-red-600 font-medium">*  </label>
                  <label htmlFor="mssv" className="text-xs text-gray-400 w-full font-medium">Nhập lại mật khẩu</label>
                </div>
              </div>

              <div>
                {type2 == "password" && (<EyeInvisibleOutlined className="relative top-10 left-[300px]" onClick={ChangeStatus2} />)}
                {type2 == "text" && (<EyeOutlined className="relative top-10 left-[300px]" onClick={ChangeStatus2} />)}
              </div>

              <input className={classnameP2} type={type2} maxLength={32} id="password" placeholder='Nhập lại mật khẩu' value={password2} onChange={(evt) => setPassword2(evt.target.value)} />  <br />

              <div className="relative top-2 left-1 w-[72px]">
                <div className="absolute bg-white w-full px-2">
                  <label htmlFor="Full Name" className="text-xs text-gray-400 w-full font-medium">Họ và tên</label>
                </div>
              </div> <br />
              <input className="border hover:border-sky-500 w-full h-14 rounded-lg px-2" type="text" id="Full Name" placeholder='Nhập họ và tên' value={fullname} onChange={(evt) => setFullname(evt.target.value)} />
              <br />
              <div className="text-sm text-red-600 w-full font-medium italic">{note}</div>
              <br />
            </div>

            <div className="mx-10 flex justify-between">
              <button className="font-bold bg-slate-300 hover:bg-sky-300 text-black rounded-2xl w-28 h-10"
                onClick={() => router.push("/signin")}>Đăng nhập</button>

              <button className="font-bold bg-black hover:bg-sky-300 text-white rounded-2xl w-28 h-10"
                onClick={() => HandleClick()}>Đăng ký</button>
            </div>
          </>
        }

      </div>

    </main>
  )
}
