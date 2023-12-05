'use client';
import React, { useState } from 'react';
import { mockDocumentClasses } from '@/api/mocks/document';
import { LikeOutlined, CommentOutlined, DownloadOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Typography, Progress} from 'antd';
import Image from 'next/image';

const {Paragraph} = Typography;

export default function Profile() {

  const [name, setName] = useState('Hoàng Minh Thái');
  const [email, setEmail] = useState('masterthai001@gmail.com');
  const [mssv, setMSSV] = useState('21020034');
  const [bio, setBio] = useState('amogus');
  const [changedImage, hasChangedImage] = useState(false);
  const [setUpAccount, hasSetUpAccount] = useState(true);
  const [personalInfo, finishedPersonalInfo] = useState(true);
  const [biography, hasBiogrpahy] = useState(true);
  var percentage = 70;

  const [imageURL, setImageURL] = useState("https://i.imgur.com/bD4NtE6.jpeg");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File | undefined;
    if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null); // To clear the selected file
    }
  };

  const changeImage = () => {
    if (selectedFile) {
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
    }
  };

  return (
    <main className="bg-slate-100 p-6">
      <div className="text-3xl text-black font-bold ml-5">Chỉnh sửa profile</div>
      <div className="flex">
        <div className="m-4 bg-white border rounded-2xl shadow-lg">
          <div className="flex">
            <div>
              <Image src={imageURL} alt="Profile Pic"/>
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
          <div className="w-full border-t-2 flex flex-col items-center p-10">
            <div className="w-full bg-white border rounded-2xl hover:shadow hover:bg-gray-100">
              <div className="flex p-6 justify-between">
                <text className="font-bold text-2xl">Thông tin cá nhân</text>
              </div>
              <div className="flex gap-10 px-6 pb-6">
                <div className="flex-col">
                  <label className="font-light text-gray-500">Họ và tên</label>
                  <Paragraph className="font-semibold text-lg pt-3" editable={{ onChange: setName }}>{name}</Paragraph>
                </div>
                <div className="flex-col">
                  <label className="font-light text-gray-500">Email</label>
                  <Paragraph className="font-semibold text-lg pt-3" editable={{ onChange: setEmail }}>{email}</Paragraph>
                </div>
                <div className="flex-col">
                  <div className="font-light text-gray-500">Mã số sinh viên</div>
                  <Paragraph className="font-semibold text-lg pt-3" editable={{ onChange: setMSSV }}>{mssv}</Paragraph>
                </div>
              </div>
            </div>
            <div className="w-full bg-white border rounded-2xl hover:shadow hover:bg-gray-100 m-10">
              <div className="flex p-6 justify-between">
                <div className="font-bold text-2xl">Bio</div>
              </div>
              <Paragraph className=" px-6 pb-6 text-xl font-semibold pt-3" editable={{ onChange: setBio }}>{bio}</Paragraph>
            </div>
            <div className="w-full bg-white border rounded-2xl hover:shadow hover:bg-gray-100 p-6">
              <div className="font-bold text-2xl mb-4">Tài liệu</div>
              <div>
                {mockDocumentClasses.map((document) => {
                  return (
                    <>
                      <div className="border hover:bg-gray-100 hover:shadow bg-white p-6 m-4 flex">
                        <Image src={document.image} height={100} width={100} alt="Document Image"/>
                        <div className="flex flex-col gap-1">
                        <p className='text-blue-400 text-lg'>{document.name}</p>
                        <p className="">Tác giả: {document.author}</p>
                        <p className="text-sm">Môn học: {document.subject}</p>
                        <div className="flex gap-10">
                          <div className="flex">
                            <p>{document.like}</p>
                            <LikeOutlined/>
                          </div>
                          <div className="flex">
                            <p>{document.comment}</p>
                            <CommentOutlined/>
                          </div>
                          <div className="flex">
                            <p>{document.download}</p>
                            <DownloadOutlined/>
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
          <Progress type="circle" percent={percentage} strokeColor="#1dc14e" strokeWidth={10} size={200}/>
          {
            setUpAccount ?
            <div className="flex gap-2">
              <CheckOutlined/>
              <p className='font-medium text-sm'>Setup Account</p>
              <p className='font-medium text-gray-400 text-sm'>20%</p>
            </div>
            :
            <div className="flex gap-2">
              <CloseOutlined/>
              <p className='font-medium text-gray-400 text-sm'>Setup Account</p>
              <p className='text-green-400 font-semibold text-sm'>20%</p>
            </div>
          }
          {
            changedImage ?
            <div className="flex gap-2">
              <CheckOutlined/>
              <p className='font-medium text-sm'>Upload your photo</p>
              <p className='font-medium text-gray-400 text-sm'>30%</p>
            </div>
            :
            <div className="flex gap-2">
              <CloseOutlined/>
              <p className='font-medium text-gray-400 text-sm'>Upload your photo</p>
              <p className='text-green-400 font-semibold text-sm'>30%</p>
            </div>
          }
          {
            personalInfo ?
            <div className="flex gap-2">
              <CheckOutlined/>
              <p className='font-medium text-sm'>Personal Info</p>
              <p className='font-medium text-gray-400 text-sm'>30%</p>
            </div>
            :
            <div className="flex gap-2">
              <CloseOutlined/>
              <p className='font-medium text-gray-400 text-sm'>Personal Info</p>
              <p className='text-green-400 font-semibold text-sm'>30%</p>
            </div>
          }
          {
            biography ?
            <div className="flex gap-2">
              <CheckOutlined/>
              <p className='font-medium text-sm'>Biography</p>
              <p className='font-medium text-gray-400 text-sm'>20%</p>
            </div>
            :
            <div className="flex gap-2">
              <CloseOutlined/>
              <p className='font-medium text-gray-400 text-sm'>Biography</p>
              <p className='text-green-400 font-semibold text-sm'>20%</p>
            </div>
          }
        </div>
      </div>
    </main>
  );
}
