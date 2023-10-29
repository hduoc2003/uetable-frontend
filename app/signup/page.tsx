"use client"
import Link from 'next/link'
import { emit } from 'process'
import React, { useState } from 'react'

export default function SignUp() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [classnameE, setClassnameE] = useState("border hover:border-sky-500 w-full h-14 rounded px-2")
  const [classnameP, setClassnameP] = useState("border hover:border-sky-500 w-full h-14 rounded px-2")
  const [note, setNote] = useState("")

  function handleClick() {
    if(email.length == 0) {
      setClassnameE("border border-red-600 hover:border-sky-500 w-full h-14 rounded px-2")
      setNote("You must enter your email")
    }
    else {
      setClassnameE("border hover:border-sky-500 w-full h-14 rounded px-2")
    }

    if(password.length == 0) {
      setClassnameP("border border-red-600 hover:border-sky-500 w-full h-14 rounded px-2")
      setNote("You must enter your password")
    }
    else {
      setClassnameP("border hover:border-sky-500 w-full h-14 rounded px-2")
    }

    if(email.length == 0 && password.length == 0) {
      setNote("You must enter your email and password")
    }
    if(email.length > 0 && password.length > 0) {
      setNote("")
    }
  }

  return (
    <div className="bg-white py-10 font-sans">

      <div className="mx-auto bg-white max-w-sm max-h-max border shadow-lg py-7 rounded-3xl">

        <div className="flex flex-col justify-center items-center">
          <div className="text-blue-600 text-3xl font-bold">UETable</div> <br />
          <div className="font-bold text-3xl">Register with email</div> <br />
        </div>

        <div className="mx-auto w-4/5 flex flex-col justify-center">

          <div className="relative top-2 left-2 w-12">
            <div className="absolute bg-white w-full px-1">
              <label htmlFor="email" className="text-xs text-red-600 w-full font-medium">EMAIL*</label>
            </div>
          </div> <br /> 

          <input className={classnameE} type="email" id = "email" placeholder='Enter your email address' value={email} onChange={(evt) => setEmail(evt.target.value)} /> <br />

          <div className="relative top-2 left-2 w-20">
            <div className="absolute bg-white w-full px-1">
              <label htmlFor="password" className="text-xs text-red-600 w-full font-medium">PASSWORD*</label>
            </div>
          </div> <br /> 

            <input className={classnameP} type="password" id = "password" placeholder='Enter password' value={password} onChange={(evt) => setPassword(evt.target.value)} /> <br />

          <div className="relative top-2 left-2 w-20">
            <div className="absolute bg-white w-full px-1">
              <label htmlFor="Full Name" className="text-xs text-gray-400 w-full font-medium">FULL NAME</label>
            </div>
          </div> <br /> 
            <input className="border hover:border-sky-500 w-full h-14 rounded px-2" type="text" id = "Full Name" placeholder='Enter your full name' /> <br />

            <div className="relative top-2 left-2 w-24">
            <div className="absolute bg-white w-full px-1">
            <label htmlFor="student code" className="text-xs text-gray-400 w-full font-medium">STUDENT CODE</label>
            </div>
          </div> <br /> 
            <input className="border hover:border-sky-500 w-full h-14 rounded px-2" type="text" id = "student code" placeholder='Enter your student code' /> <br />

          <div className="text-sm text-red-600 w-full font-medium italic">{note}</div> <br />

        </div>

        <div className="mx-10 flex justify-between">
          <button className="font-bold bg-slate-300 hover:bg-sky-300 text-black rounded-2xl w-28 h-10 ">
          <Link href="/">Back</Link>
          </button>

          <button className="font-bold bg-black hover:bg-sky-300 text-white rounded-2xl w-28 h-10" 
          onClick={() => handleClick()}>Next</button>
        </div>

      </div>
      
    </div>
  )
}
