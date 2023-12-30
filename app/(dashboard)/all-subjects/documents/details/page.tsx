"use client"
import React, { use, useEffect } from "react"
import { FilePdfOutlined, FontColorsOutlined } from "@ant-design/icons";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { RiDownload2Fill } from "react-icons/ri";
import { MdOutlineReportProblem } from "react-icons/md";
import { Button, Image, Input, Modal, notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import { useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { FaBook } from "react-icons/fa6";
import { FaFaceGrin } from "react-icons/fa6";
import { FaFaceFrownOpen } from "react-icons/fa6";
import { FaFaceLaughSquint } from "react-icons/fa6";
import { FaFaceSadCry } from "react-icons/fa6";
import { FiClock } from "react-icons/fi";
import { FaFaceFrown } from "react-icons/fa6";
import { IoMdDocument } from "react-icons/io";
import Fetcher from "@/api/Fetcher";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation';
import Main from "@/components/layouts/Main";
import { error } from "console";
import Avatar from "antd/es/avatar/avatar";




interface Response {
    id: any,
    name: any,
    createdAt: any,
    like: any,
    download: any,
    category: any,
    link: any,
    userName: any,
    subject: any,
    subjectId: any,
    userId : any,
    studentId: any,
}

export default function Documentdetail() {
    const [filename, setFilename] = useState("");
    const [subname, setSubname] = useState("");
    const [link, setLink] = useState("");
    const [author, setAuthor] = useState("");
    const [numoflike, setNumOfLike] = useState(0);
    const [numofDownload, setNumOfDownload] = useState(0);
    const [subjecttId, setSubjectId] = useState("");
    const [studentId, setStudentId] = useState("");

    const [imageURL, setImageURL] = useState("");
    const [time, setTime] = useState("");

    const months : string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const router = useRouter();

    const searchParams = useSearchParams();
    const documentId = searchParams.get('documentId');

    const [isliked, setIsliked] = useState(false);

    useEffect(() => {
            Fetcher.get<any, Response>('/document/getDocumentById', { params: { "id": documentId }}).then((response : Response) => {
                setFilename(response.name);
                setSubname(response.subject);
                setLink(response.link);
                setAuthor(response.userName);
                setSubjectId(response.subjectId);
                setNumOfLike(response.like);
                setNumOfDownload(response.download);
                setStudentId(response.studentId);
                setTime(response.createdAt);
                console.log(response);
                console.log(response.createdAt);
            })
            .catch(error => {
                console.log('Lỗi khi gọi API:', error)
            });      
            console.log(studentId);

            Fetcher.get('/users/' + studentId)
            .then((response) => {
                setImageURL(response.avatar);
                console.log(imageURL);
            }).catch((error) => {
                console.log(error);
            }); 

    }, [documentId, numoflike, imageURL, studentId, numoflike, isliked]);

    function handleLike() {
        if(isliked === true) return;
        Fetcher.post('/page/like/', {
            'pageId' : documentId,
            'pageType' : 'D',
            'score' : 1
        }).then(response => {
            console.log(response);
            //setNumOfLike(numoflike + 1);
            setIsliked(true);
        }).catch(error => {
            console.log(error);
        }) 
    };

    const handleDown = () => {
    };

    function handleAuthor() {
        console.log(studentId);
        router.push("/settings/profile?studentid=" + studentId);
    }

    function handleSubject() {
        router.push("/all-subjects/documents?subjectId=" + subjecttId);
    }
    return (<>
        <Main title = "Document">
            <br />
            <div className = {`flex`}>
                <div className = {`ml-[10px]`}>
                    <div className = {`text-3xl font-semibold`}>{filename}</div>
                </div>
            </div>
            <br />
            <div className = {`ml-[10px] flex`}>
                <div className = {`flex font-semibold`}>
                    <div className = {`flex bg-white hover:bg-slate-200 p-2 rounded-lg cursor-pointer`} onClick = {handleAuthor}>
                        <Avatar src = {imageURL} size = {40} style={{background : imageURL, minWidth : 40, minHeight : 15}}></Avatar>
                        <div className = {`ml-[10px] mt-[5px] text-blue-500 hover:text-blue-300`}>{author}</div>
                    </div>
                    <div className = {`flex bg-white hover:bg-slate-200 p-2 rounded-lg ml-[50px] cursor-pointer`}>
                        <FaBook className = {`text-blue-700`} style={{fontSize : '40px'}} />
                        <div className = {`ml-[10px] my-[5px] text-orange-500 hover:text-orange-300`} onClick = {handleSubject}>{subname}</div>
                    </div>
                    <div className = {`flex bg-white hover:bg-slate-200 p-2 rounded-lg ml-[50px] cursor-pointer`}>
                        <FiClock className = {`text-blue-700`} style={{fontSize : '40px'}} />
                        <div className = {`ml-[10px] my-[5px] text-purple-500 hover:text-purple-300`}>{months[new Date(time).getMonth()] + ' ' + new Date(time).getDate() + ', ' + new Date(time).getFullYear()}</div>
                    </div>
                </div>
            </div>
            <br />
            <div className = {`flex`}>
                <div className = {`overflow-auto ml-[10px] border p-2 border-emerald-700 max-w-[750px] max-h-[600px] min-w-[750px] min-h-[600px]`}>
                    <div className = {`max-w-full max-h-full min-w-full min-h-full`}>
                        {(link[link.length - 1] === 'f' || link[link.length - 1] === 'F')  && (
                            <embed src = {link} width = "780px" height="580px"/>
                        )}
                        {(link[link.length - 1] === 'g' || link[link.length - 1] === 'G') && (
                            <Image src = {link} alt = "Không tải được ảnh"/>
                        )}
                    </div>
                </div>

                <div className = {`ml-[20px] my-[200px] `}>
                    <button className = {`text-black hover:text-blue-500`} onClick = {handleLike}>
                        <div className = {`flex flex-col items-center`}>
                            <div className = {`flex max-w-fit`}>
                                <div className = {`rounded-full bg-blue-500 hover:bg-blue-700 p-1`}>
                                    <BiSolidLike className = {`cursor-pointer text-white`} style={{fontSize : '30px'}}/>
                                </div>
                                <div className = {`ml-[10px] my-[5px] font-semibold text-[20px]`}>{numoflike} Like</div>
                            </div>
                        </div>
                    </button>
                    <br />
                    <br />
                    <br />
                    <button className = {`text-black hover:text-green-300`} onClick = {handleDown}>
                        <a className = {``} href = {link} download = "" target = "_blank">
                            <div className = {`flex flex-col items-center`}>
                                <button  className = {`flex`}>
                                    <IoMdDocument className = {`cursor-pointer text-green-500 hover:text-green-300`} style={{fontSize : '50px'}}/>
                                    <div className = {`text-[15px] max-w-[70px] my-[3px] font-semibold`}>Mở trong tab mới</div>
                                </button>
                            </div>
                        </a>
                    </button>
                </div>
            </div>
        </Main>
    </>)
}