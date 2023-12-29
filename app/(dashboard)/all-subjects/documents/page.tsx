"use client";
import React, {use, useEffect, useState} from "react";
import { FilePdfOutlined, FontColorsOutlined } from "@ant-design/icons";
import { FaRegFileImage } from "react-icons/fa6";
import Main from "@/components/layouts/Main";
import Fetcher from "@/api/Fetcher";
import { useSearchParams, useRouter } from "next/navigation";
import { DocumentInfo } from "@/types/document";
import { FaFilePdf } from "react-icons/fa";


export default function DocumentsOfSubject() {

    const [listfile, setList] = useState<DocumentInfo[]>([]);
    const [subject, setSubject] = useState("Giải Tích 2");
    const [status, setStatus] = useState("Normal");
    const [view, setView] = useState("list");
    const router = useRouter();
    const months : string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const searchParams = useSearchParams();
    const subjectId = searchParams.get('subjectId');

    useEffect(() => {
        Fetcher.get('/subject/getSubjectInfo', {
            params: {
                "subjectId": subjectId
            }
        }).then((response) => {
            setSubject(response.name);
        }).catch((error) => {

        })
        Fetcher.get<any, DocumentInfo[]>('/document/getDocumentOfSubject', {
            params: {
                "subjectId": subjectId
            }
        })
        .then((response) => {
            console.log(response);
            setList((response.map(DocInfo => {
                console.log(DocInfo);
                if(DocInfo.link[DocInfo.link.length - 1] === "f" || DocInfo.link[DocInfo.link.length - 1] === "F")
                    DocInfo.type = "PDF";
                if(DocInfo.link[DocInfo.link.length - 1] === "g" || DocInfo.link[DocInfo.link.length - 1] === "G")
                    DocInfo.type = "PNG";
                //DocInfo.name = "Đề thi thử học kỳ I năm học 2022-2023"
                return DocInfo;
            })));
        }).catch((error) => {

        })
    }, [subjectId]);

    function handleName() {
        if(status === "AZ") setStatus("ZA");
        else setStatus("AZ");
    }

    function handleDate() {
        if(status === "OldNew") setStatus("NewOld");
        else setStatus("OldNew");
    }

    function handleType() {
        if(status === "PDFtoPNG") setStatus("PNGtoPDF");
        else setStatus("PDFtoPNG");
    }

    function getTime(x : Date) {
        console.log(x);
        return months[x.getMonth()] + ' ' + x.getDate() + ', ' + x.getFullYear() + ' at ' + x.getHours() + ':' + x.getMinutes() + ':' + x.getSeconds(); 
    }

    function LoadList() {
        if(status === "AZ") {
            listfile.sort((a, b) => a.name.localeCompare(b.name));
        }
        if(status === "ZA") {
            listfile.sort((a, b) => b.name.localeCompare(a.name));
        }
        if(status === "OldNew") {
            listfile.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        }
        if(status === "NewOld") {
            listfile.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
        if(status === "PDFtoPNG") {
            listfile.sort((a, b) => a.type.localeCompare(b.type));
        }
        if(status === "PNGtoPDF") {
            listfile.sort((a, b) => b.type.localeCompare(a.type));
        }

        let cnt = 0;
        return listfile.map(DocInfo => {
            cnt++;
            return (<>
                <div className = {`flex bg-white hover:bg-slate-100 max-h-fit max-w-fit cursor-pointer font-semibold p-1 rounded-lg`} onClick={ () => {
                    router.push('/all-subjects/documents/details?documentId=' + DocInfo.id);
                    console.log(listfile[0].id);
                }}>
                    <div className = {`w-[85px] my-[40px]`}>{cnt}</div>
                    <div className = {`flex w-[410px]`}>
                        {DocInfo.type === "PDF" &&( 
                            <FaFilePdf className = {`text-slate-500`} style={{fontSize : '100px'}}/>
                        )}
                        {DocInfo.type === "PNG" &&(
                            <FaRegFileImage className = {`text-green-400`} style={{fontSize : '100px'}}/>
                        )}
                        <div className = {`ml-[10px] max-w-[250px] space-y-[12px]`}>
                            <div className = {`text-2xl text-black hover:text-blue-400`}>{DocInfo.name}</div>
                            <div className = {`text-slate-400 truncate`}>{DocInfo.link}</div>
                        </div>
                    </div>
                    <div className = {`w-[300px] my-[40px]`}>
                        <div className = {`text-black max-w-fit rounded p-[5px] bg-emerald-400`}>
                            {getTime(new Date(DocInfo.createdAt))}
                        </div>
                    </div>                        
                    <div>
                        <div className = {`my-[40px] w-[100px]`}>
                            <div className = {`bg-cyan-500 text-black max-w-fit rounded p-[5px]`}>
                                {DocInfo.type}
                            </div>
                        </div>
                    </div>
                </div>
                <hr className = {`my-[20px]`} />
            </>)
        })
    }


    return(<>
        <Main title={subject}>
            <div className = {`flex`}>
                <div className = {`w-[15px] h-[30px] bg-blue-300 rounded`}></div>
                <div className = {`ml-[10px] font-semibold text-2xl`}>Documents</div>
            </div>
            <br />
            <div className = {`ml-[10px] my-[10px] text-base text-slate-500 font-semibold`}>
                <div className = {`flex`}>
                    <div className = {`w-[100px]`}>STT</div>
                    <div className = {`w-[400px]`}>
                        <button className = {``} onClick = {handleName}>Name</button>
                    </div>
                    <div className = {`w-[300px]`} onClick={handleDate}>
                        <button>Date modified</button>
                    </div>
                    <div className = {`w-[100px]`} onClick={handleType}>
                        <button>Type</button>
                    </div>    
                </div>
                <hr />
                <br />
                <div className = {``}>
                    {LoadList()}
                </div>
            </div>
        </Main>
    </>)
}