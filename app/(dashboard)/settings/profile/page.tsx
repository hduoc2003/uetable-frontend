'use client';
import React, { useEffect, useState } from 'react';
import { LikeOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Typography, Progress, Avatar, DatePicker, DatePickerProps } from 'antd';
import Image from 'next/image';
import Fetcher from '@/api/Fetcher';
import { UserInfoResponse } from '@/api/userAPI';
import Cookies from 'universal-cookie';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import { useRouter, useSearchParams } from 'next/navigation';
import { DocumentClass } from '@/types/document';
import { PageProps } from '@/types/PageProps';
const { Paragraph } = Typography;

const cookies = new Cookies();
export default function Profile() {

  const searchParams = useSearchParams();
  const studentid = searchParams.get('studentid') || '';
  console.log({studentid})
  const [name, setName] = useState('Hoàng Minh Thái');
  const [birth, setBirth] = useState("2003-01-13");
  const [mssv, setMSSV] = useState('21020034');
  const [bio, setBio] = useState('amogus');
  const [changedImage, hasChangedImage] = useState(false);
  const [setUpAccount, hasSetUpAccount] = useState(true);
  const [personalInfo, finishedPersonalInfo] = useState(true);
  const [biography, hasBiogrpahy] = useState(true);
  const [other, setOther] = useState(false);
  const [docData, setDocData] = useState<DocumentClass[]>([]);
  const router = useRouter();
  var percentage = 70;
  const currentStudentId = cookies.get('studentid');

  const [imageURL, setImageURL] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    console.log(studentid);
    if (studentid != currentStudentId) setOther(true);
    console.log(other);
    Fetcher.get<any, UserInfoResponse>('/users/' + studentid)
      .then((response) => {
        setImageURL(response.avatar);
        setMSSV(response.studentId);
        setName(response.name);
        setBirth(response.date);
        setBio(response.bio);
      }).catch((error) => {
        if (error.response.status == 401) {
          router.push('/signin');
        }
        else if (error.response.status == 404) {

        }
        //console.log(studentid);
      });

    Fetcher.get<any, DocumentClass[]>('/document/getMyDocumentByStudentId', {
      params: {
        "studentId": studentid,
      }
    }).then((response) => {
      console.log(response);
      setDocData(response);
    }).catch((error) => {

    })
  }, [studentid, currentStudentId, other, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File | undefined;
    if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null); // To clear the selected file
    }
  };

  const handleFinishEditName = (newName: string) => {
    setName(newName);
    Fetcher.put('/users/', {
      "name": newName,
      "avatar": imageURL,
      "birth": birth,
    }).then((response) => {
      console.log(response)
    }).catch((error) => {

    });
    console.log(newName);
  }

  const handleFinishEditBirth: DatePickerProps['onChange'] = (date, dateString) => {
    setBirth(dateString);
    Fetcher.put('/users/', {
      "name": name,
      "avatar": imageURL,
      "birth": dateString,
    }).then((response) => {
      console.log(response)
    }).catch((error) => {

    });
    console.log(dateString);
  }

  const handleFinishEditBio = (newBio: string) => {
    setBio(newBio);
    Fetcher.post('/users/changeBio', {
      "bio": newBio,
    }).then((response) => {
      console.log(response)
    }).catch((error) => {

    });
    console.log(newBio);
  }

  const changeImage = () => {
    if (selectedFile) {
      const fileExtension = selectedFile.name.split('.').pop();

      const allowedExtensions = ["jpg", "jpeg", "png"];

      if (fileExtension && allowedExtensions.includes(fileExtension)) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target) {
            const dataURL = e.target.result as string;
            setImageURL(dataURL);
            if (!changedImage) {
              percentage += 20;
            }
            hasChangedImage(true);
          }
        };
        reader.readAsDataURL(selectedFile);
        const formData = new FormData();
        formData.append('up', selectedFile);
        Fetcher.post('/users/changeAvatar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }).then((response) => {
          console.log(response);
        }).catch((error) => {

        });
      }
      else {
        alert("Vui lòng upload ảnh bằng JPG hoặc PNG.");
      }
    }
  };

  return (
    <main className="bg-slate-100 p-6">
      <div className="text-3xl text-black font-bold ml-5">Profile</div>
      <div className="flex">
        <div className="m-4 bg-white border rounded-2xl shadow-lg w-full">
          {other ?
            <div className="flex p-12 gap-[100px]">
              <div>
                <Avatar src={imageURL} className='' alt="Profile Pic" size={100}></Avatar>
              </div>
              <div className='flex-col'>
                <label className="font-light text-gray-500">Họ và tên</label>
                <Paragraph className="font-semibold text-lg pt-3">{name}</Paragraph>
              </div>
              <div className='flex-col'>
                <label className="font-light text-gray-500">Ngày sinh</label>
                <Paragraph className="font-semibold text-lg pt-3">{birth}</Paragraph>
              </div>
              <div className='flex-col'>
                <label className="font-light text-gray-500">Mã số sinh viên</label>
                <Paragraph className="font-semibold text-lg pt-3">{mssv}</Paragraph>
              </div>
            </div>
            :
            <div className="flex">
              <div className='p-12'>
                <Avatar src={imageURL} className='' alt="Profile Pic" size={100}></Avatar>
              </div>
              <div className="flex flex-col my-10 mr-10">
                <div className="flex mt-8">
                  <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-primary file:text-white
                  hover:file:bg-dark-primary
                "/>
                  <button className="text-sm border py-2 px-4 rounded-full font-semibold hover:shadow-lg" onClick={changeImage}>Upload</button>
                </div>
                <text className="text-lg py-4">Upload ảnh đại diện mới bằng JPG hoặc PNG</text>
              </div>
            </div>
          }
          <div className="w-full border-t-2 flex flex-col items-center p-10">
            {!other &&
              <div className="w-full bg-white border rounded-2xl hover:shadow hover:bg-gray-100">
                <div className="flex p-6 justify-between">
                  <text className="font-bold text-2xl">Thông tin cá nhân</text>
                </div>
                <div className="flex gap-[120px] px-6 pb-6">
                  <div className="flex-col">
                    <label className="font-light text-gray-500">Họ và tên</label>
                    <Paragraph className="font-semibold text-lg pt-3" editable={{ onChange: (newValue) => { handleFinishEditName(newValue) } }}>{name}</Paragraph>
                  </div>
                  <div className="flex-col">
                    <label className="font-light text-gray-500">Ngày sinh</label>
                    <p className='p-1'></p>
                    <DatePicker className='font-semibold text-lg' onChange={handleFinishEditBirth} value={dayjs(birth, 'YYYY-MM-DD')} />
                  </div>
                  <div className="flex-col">
                    <div className="font-light text-gray-500">Mã số sinh viên</div>
                    <Paragraph className="font-semibold text-lg pt-3">{mssv}</Paragraph>
                  </div>
                </div>
              </div>
            }
            <div className="w-full bg-white border rounded-2xl hover:shadow hover:bg-gray-100 m-10">
              <div className="flex p-6 justify-between">
                <div className="font-bold text-2xl">Bio</div>
              </div>
              {other ?
                <Paragraph className=" px-6 pb-6 text-xl font-semibold pt-3">{bio}</Paragraph>
                :
                <Paragraph className=" px-6 pb-6 text-xl font-semibold pt-3" editable={{ onChange: (newValue) => { handleFinishEditBio(newValue) } }}>{bio}</Paragraph>
              }
            </div>
            <div className="w-full bg-white border rounded-2xl hover:shadow hover:bg-gray-100 p-6">
              <div className="font-bold text-2xl mb-4">Tài liệu</div>
              <div>
                {docData.map((document) => {
                  return (
                    <>
                      <div className="border hover:bg-gray-100 hover:shadow bg-white p-6 m-4 flex">
                        <Image src={document.link} height={100} width={100} alt="Document Image" className='mr-5' />
                        <div className="flex flex-col gap-3">
                          <p className='text-blue-400 text-2xl'>{document.name}</p>
                          {/* <p className="text-">Môn học: {document.category}</p> */}
                          <div className="flex gap-10">
                            <div className="flex">
                              <p>{document.like}</p>
                              <LikeOutlined />
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="m-4 bg-white border rounded-2xl shadow-lg flex flex-col p-6 gap-3 max-h-full">
          <text className="font-bold text-xl">Hoàn thành profile</text>
          <Progress type="circle" percent={percentage} strokeColor="#1dc14e" strokeWidth={10} size={200} />
          {
            setUpAccount ?
              <div className="flex gap-2">
                <CheckOutlined />
                <p className='font-medium text-sm'>Setup Account</p>
                <p className='font-medium text-gray-400 text-sm'>20%</p>
              </div>
              :
              <div className="flex gap-2">
                <CloseOutlined />
                <p className='font-medium text-gray-400 text-sm'>Setup Account</p>
                <p className='text-green-400 font-semibold text-sm'>20%</p>
              </div>
          }
          {
            changedImage ?
              <div className="flex gap-2">
                <CheckOutlined />
                <p className='font-medium text-sm'>Upload your photo</p>
                <p className='font-medium text-gray-400 text-sm'>30%</p>
              </div>
              :
              <div className="flex gap-2">
                <CloseOutlined />
                <p className='font-medium text-gray-400 text-sm'>Upload your photo</p>
                <p className='text-green-400 font-semibold text-sm'>30%</p>
              </div>
          }
          {
            personalInfo ?
              <div className="flex gap-2">
                <CheckOutlined />
                <p className='font-medium text-sm'>Personal Info</p>
                <p className='font-medium text-gray-400 text-sm'>30%</p>
              </div>
              :
              <div className="flex gap-2">
                <CloseOutlined />
                <p className='font-medium text-gray-400 text-sm'>Personal Info</p>
                <p className='text-green-400 font-semibold text-sm'>30%</p>
              </div>
          }
          {
            biography ?
              <div className="flex gap-2">
                <CheckOutlined />
                <p className='font-medium text-sm'>Biography</p>
                <p className='font-medium text-gray-400 text-sm'>20%</p>
              </div>
              :
              <div className="flex gap-2">
                <CloseOutlined />
                <p className='font-medium text-gray-400 text-sm'>Biography</p>
                <p className='text-green-400 font-semibold text-sm'>20%</p>
              </div>
          }
        </div>
      </div>
    </main>
  );
}
