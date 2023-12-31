'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { LikeOutlined, DownloadOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Typography, Progress, Avatar, DatePicker, DatePickerProps, List, Space } from 'antd';
import Image from 'next/image';
import Fetcher from '@/api/Fetcher';
import { UserInfoResponse } from '@/api/userAPI';
import Cookies from 'universal-cookie';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import { useRouter, useSearchParams } from 'next/navigation';
import { DocumentClass } from '@/types/document';
import MyButtonWrapper from '@/components/common/(MyButton)/MyButtonWrapper';
import EditableText from '@/components/common/EditableText';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '@/redux/auth/authSlice';
import { authSelector } from '@/redux/auth/authSelector';
import { PageProps } from '@/types/PageProps';
import DocumentImage from '@/components/common/DocumentImage';
import { getExtOfFile } from '@/utils/getExtOfFile';
import Link from 'next/link';
import { getURL } from '@/utils/navigation';
import LikeIcon from '@/components/common/(Icons)/LikeIcon';
import DownloadIcon from '@/components/common/(Icons)/DownloadIcon';
import { useDebouncedCallback } from 'use-debounce';
import search from '@/utils/search';
import SearchBar from '@/components/common/SearchBar/SearchBar';
import Editor from '@/components/common/Editor/Editor';
const { Paragraph, Text, Title } = Typography;

const cookies = new Cookies();
export default function Profile() {

  const searchParams = useSearchParams();
  const studentid = searchParams.get('studentid') || '';

  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [mssv, setMSSV] = useState("");
  const [bio, setBio] = useState("");
  const [changedImage, hasChangedImage] = useState(false);
  const [setUpAccount, hasSetUpAccount] = useState(true);
  const [personalInfo, finishedPersonalInfo] = useState(true);
  const [biography, hasBiogrpahy] = useState(true);
  const [other, setOther] = useState(false);
  const [docData, setDocData] = useState<DocumentClass[]>([]);
  const router = useRouter();
  const [percentage, setPercentage] = useState(20);
  const currentStudentId = cookies.get('studentid');
  const [otherAvt, setOtherAvt] = useState('')
  const [searchDoc, setSearchDoc] = useState('');
  const handleSearchDoc = useDebouncedCallback((search) => {
    setSearchDoc(search)
  }, 300)
  const filterDoc = useMemo(() => search(searchDoc, docData, ['name', 'subjectName']), [docData, searchDoc])

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const dispatch = useDispatch();
  const { avtLink } = useSelector(authSelector)

  useEffect(() => {
    if (studentid != currentStudentId) setOther(true);
    Fetcher.get<any, UserInfoResponse>('/users/' + studentid)
      .then((response) => {
        // dispatch(authActions.updateAuthState({
        //   avtLink: response.avatar
        // }))
        setOtherAvt(response.avatar)
        setMSSV(response.studentId);
        setName(response.name);
        setBirth(response.date);
        setBio(response.bio);
      }).catch((error) => {
        if (error.status == 401) {
          router.push('/signin');
        }
        else if (error.status == 404) {
          router.push('/');
        }
      });

    Fetcher.get<any, Omit<DocumentClass, 'ext'>[]>('/document/getMyDocumentByStudentId', {
      params: {
        "studentId": studentid,
      }
    }).then((response) => {
      let data = response;
      for (let i = 0; i < data.length; i++) {
        let time = data[i].createdAt.split('-');
        let date = time[2].split('T');
        data[i].createdAt = date[0] + '/' + time[1] + '/' + time[0];

      }
      setDocData(response.map((g) => ({ ...g, ext: getExtOfFile(g.link).ext })));
    }).catch((error) => {

    })
  }, [studentid, currentStudentId, other, router, dispatch]);

  useEffect(() => {
    setPercentage(20);
    if (avtLink) {
      hasChangedImage(true);
      setPercentage(p => p + 30);
    } else {
      hasChangedImage(false);
    }
    if (bio) {
      hasBiogrpahy(true);
      setPercentage(p => p + 20);
    } else {
      hasBiogrpahy(false);
    }
    if (name && mssv && birth) {
      finishedPersonalInfo(true);
      setPercentage(p => p + 30);
    } else {
      finishedPersonalInfo(false);
    }
  }, [bio, name, avtLink, birth, mssv])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File | undefined;
    if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null); // To clear the selected file
    }
  };

  const handleFinishEditName = (newName: string) => {
    dispatch(authActions.updateAuthState({
      name: newName
    }))
    setName(newName);
    Fetcher.put('/users/', {
      "name": newName,
      "avatar": avtLink,
      "birth": birth,
    }).then((response) => {

    }).catch((error) => {

    });
  }

  const handleFinishEditBirth: DatePickerProps['onChange'] = (date, dateString) => {
    setBirth(dateString);
    Fetcher.put('/users/', {
      "name": name,
      "avatar": avtLink,
      "birth": dateString,
    }).then((response) => {

    }).catch((error) => {

    });
  }

  const handleFinishEditBio = (newBio: string) => {
    setBio(newBio);
    Fetcher.post('/users/changeBio', {
      "bio": newBio,
    }).then((response) => {

    }).catch((error) => {

    });
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
            dispatch(authActions.updateAuthState({
              avtLink: dataURL
            }))
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

        }).catch((error) => {

        });
      }
      else {
        alert("Vui lòng upload ảnh bằng JPG hoặc PNG.");
      }
    }
  };

  return (
    <main className=''>
      <Title level={2} className="ml-5 mt-3">Hồ sơ</Title>
      <div className="flex">
        <div className="bg-white border rounded-2xl shadow w-full ml-layout-el">
          {other ?
            <div className="flex p-12 gap-[150px] items-center">
              <Avatar src={otherAvt} className='' alt="Profile Pic" size={100}></Avatar>
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
            <div className="flex p-10 gap-6 items-center">
              <Avatar src={avtLink} className='' alt="Profile Pic" size={100} />
              <div className="flex flex-col gap-3">
                <div className="flex">
                  <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-primary file:text-white
                  hover:file:bg-dark-primary
                "/>
                  <MyButtonWrapper onClick={changeImage} className='border-2 px-4 py-[6px] rounded-full'>
                    <Text strong>Tải lên</Text>
                  </MyButtonWrapper>
                  {/* <button className="text-sm border py-2 px-4 rounded-full font-semibold hover:shadow-lg" onClick={changeImage}>Upload</button> */}
                </div>
                <Text type='secondary'>Upload ảnh đại diện mới bằng JPG hoặc PNG</Text>
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
                  <div className="flex flex-col gap-3">
                    <label className="font-light text-gray-500">Họ và tên</label>
                    <EditableText
                      defaultValue={name}
                      normalText={<Text strong className='text-lg'>{name}</Text>}
                      onComplete={handleFinishEditName}
                    />
                    {/* <Paragraph className="font-semibold text-lg pt-3" editable={{ onChange: (newValue) => { handleFinishEditName(newValue) } }}>{name}</Paragraph> */}
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="font-light text-gray-500">Ngày sinh</label>
                    <DatePicker className='font-semibold text-lg' onChange={handleFinishEditBirth} value={dayjs(birth, 'YYYY-MM-DD')} />
                  </div>
                  <div className="flex-col">
                    <div className="font-light text-gray-500">Mã số sinh viên</div>
                    <Paragraph className="font-semibold text-lg pt-3">{mssv}</Paragraph>
                  </div>
                </div>
              </div>
            }
            {
              other ? (
                bio && (
                  <div className="w-full bg-white border rounded-2xl hover:shadow hover:bg-gray-100 m-10">
                    <div className="flex p-6 justify-between">
                      <div className="font-bold text-2xl">Giới thiệu</div>
                    </div>
                    <Paragraph className=" px-6 pb-6 text-xl font-semibold pt-3">{bio}</Paragraph>
                  </div>
                )
              ) : (
                <div className="w-full bg-white border rounded-2xl hover:shadow hover:bg-gray-100 m-10 p-5 flex flex-col gap-5">
                  {/* <div className="flex p-6 justify-between"> */}
                  <div className="font-bold text-2xl">Giới thiệu</div>
                  {/* </div> */}
                  {/* <Paragraph className=" px-6 pb-6 text-xl font-semibold pt-3" editable={{ onChange: (newValue) => { handleFinishEditBio(newValue) } }}>{bio}</Paragraph> */}
                  {/* <Editor content={bio} onSave={handleFinishEditBio} maxWidth={700}/> */}
                  <EditableText
                    defaultValue={bio}
                    normalText={
                      bio ?
                        <Text className='text-lg'>{bio}</Text>
                        :
                        <Text type='secondary' italic>Chưa cập nhật thông tin</Text>
                    }
                    type='textarea'
                    onComplete={handleFinishEditBio}
                    className='w-full'
                  />
                </div>
              )
            }

            <div className="w-full bg-white border rounded-2xl hover:shadow p-6">
            <div className="flex mb-4 gap-5 items-center">
              <span className="font-bold text-2xl ">Tài liệu</span>
              <SearchBar
                placeholder='Tìm kiếm tài liệu'
                onChange={(e) => handleSearchDoc(e.target.value)}
                className='h-[40px] w-[25vw]'
              />
            </div>
              {filterDoc.length === 0 ?
                <Text strong type='secondary' italic>Không có tài liệu</Text>
              :
              <List>
                {
                  filterDoc.map((doc) => {
                    return (
                      <List.Item key={doc.id}>
                        <Link
                          href={getURL('/all-subjects/documents/details', {
                            documentId: doc.id
                          })}
                          className='w-full'
                        >
                          <div className='flex w-full items-center'>
                            <div className='flex gap-1 items-center'>
                              <DocumentImage ext={doc.ext} />
                              <p>
                                <Text strong className='text-inherit'>{doc.name}</Text> <br />
                                <Text type='secondary' strong>{`${doc.subjectName}`}</Text>
                              </p>
                            </div>
                          </div>
                        </Link>
                        <div className='flex flex-col gap-2 ml-auto'>
                          <Space size={'large'}>
                            <Space className=''>
                              <LikeIcon />
                              <Text strong>{doc.like}</Text>
                            </Space>
                            <Space>
                              <DownloadIcon className='fill-contrast' size={'1.5em'} />
                              <Text strong>{doc.download}</Text>
                            </Space>
                          </Space>
                          <Text strong type='secondary'>{doc.createdAt}</Text>
                        </div>
                      </List.Item>
                    )
                  })
                }
              </List>
              }
            </div>
          </div>
        </div>
        {!other &&
          <div className="ml-8 mr-layout-el bg-white border rounded-2xl shadow flex flex-col p-6 gap-3 h-max-full">
            <text className="font-bold text-xl">Hoàn thành profile</text>
            <Progress type="circle" percent={percentage} strokeColor="#1dc14e" strokeWidth={10} size={200} className='mb-5' />
            {
              setUpAccount ?
                <div className="flex gap-2">
                  <span style={{ color: 'green' }}>
                    <CheckOutlined />
                  </span>
                  <p className='font-medium text-sm'>Kích hoạt tài khoản</p>
                  {/* <p className='font-medium text-gray-400 text-sm'>20%</p> */}
                </div>
                :
                <div className="flex gap-2">
                  <CloseOutlined />
                  <p className='font-medium text-gray-400 text-sm'>Kích hoạt tài khoản</p>
                  {/* <p className='text-green-400 font-semibold text-sm'>20%</p> */}
                </div>
            }
            {
              changedImage ?
                <div className="flex gap-2">
                  <span style={{ color: 'green' }}>
                    <CheckOutlined />
                  </span>
                  <p className='font-medium text-sm'>Cập nhật ảnh đại diện</p>
                  {/* <p className='font-medium text-gray-400 text-sm'>30%</p> */}
                </div>
                :
                <div className="flex gap-2">
                  <CloseOutlined />
                  <p className='font-medium text-gray-400 text-sm'>Cập nhật ảnh đại diện</p>
                  {/* <p className='text-green-400 font-semibold text-sm'>30%</p> */}
                </div>
            }
            {
              personalInfo ?
                <div className="flex gap-2">
                  <span style={{ color: 'green' }}>
                    <CheckOutlined />
                  </span>
                  <p className='font-medium text-sm'>Thông tin cá nhân</p>
                  {/* <p className='font-medium text-gray-400 text-sm'>30%</p> */}
                </div>
                :
                <div className="flex gap-2">
                  <CloseOutlined />
                  <p className='font-medium text-gray-400 text-sm'>Thông tin cá nhân</p>
                  {/* <p className='text-green-400 font-semibold text-sm'>30%</p> */}
                </div>
            }
            {
              biography ?
                <div className="flex gap-2">
                  <span style={{ color: 'green' }}>
                    <CheckOutlined />
                  </span>
                  <p className='font-medium text-sm'>Cập nhật Bio</p>
                  {/* <p className='font-medium text-gray-400 text-sm'>20%</p> */}
                </div>
                :
                <div className="flex gap-2">
                  <CloseOutlined />
                  <p className='font-medium text-gray-400 text-sm'>Cập nhật Bio</p>
                  {/* <p className='text-green-400 font-semibold text-sm'>20%</p> */}
                </div>
            }
          </div>
        }
      </div>
    </main >
  );
}
