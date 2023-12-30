"use client";
import React, { useMemo, useState } from "react";
import Main from "@/components/layouts/Main";
import { GoPlus } from "react-icons/go";
import { DocumentInfo } from "@/types/document";
import TitleWithBox from "@/components/common/TitleWithBox";
import { PageProps } from "@/types/PageProps";
import { ConfigProvider, Space, Table, Typography } from "antd";
import genId from "@/utils/genId";
import useSWR from "swr";
import { DocumentAPI } from "@/api/DocumentAPI";
import { SubjectAllAPI } from "@/api/subjectAPI";
import { ColumnType } from "antd/es/table";
import { CellContent } from "@/components/mysubjects/SemesterInfoTable/SemesterInfoTable";
import DocumentImage from "@/components/common/DocumentImage";
import { getExtOfFile } from "@/utils/getExtOfFile";
import Link from "next/link";
import { getURL } from "@/utils/navigation";
import DecorBox from "@/components/common/DecorBox";
import { lightenDarkenColor } from "@/utils/lightenDarkenColor";
import ClickableText from "@/components/common/ClickableText";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import { useDebouncedCallback } from "use-debounce";
import search from "@/utils/search";
import UserUpload from "@/components/common/UserUpload";
import { isUndefined } from "lodash";
import { FaPlus } from "react-icons/fa6";


// export default function DocumentsOfSubject() {

//     const [listfile, setList] = useState<DocumentInfo[]>([]);
//     const [subject, setSubject] = useState("Giải Tích 2");
//     const [status, setStatus] = useState("Normal");
//     const [view, setView] = useState("list");
//     const router = useRouter();
//     const months : string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//     const searchParams = useSearchParams();
//     const subjectId = searchParams.get('subjectId');

//     useEffect(() => {
//         Fetcher.get('/subject/getSubjectInfo', {
//             params: {
//                 "subjectId": subjectId
//             }
//         }).then((response) => {
//             setSubject(response.name);
//         }).catch((error) => {

//         })
//         Fetcher.get<any, DocumentInfo[]>('/document/getDocumentOfSubject', {
//             params: {
//                 "subjectId": subjectId
//             }
//         })
//         .then((response) => {
//             console.log(response);
//             setList((response.map(DocInfo => {
//                 console.log(DocInfo);
//                 if(DocInfo.link[DocInfo.link.length - 1] === "f" || DocInfo.link[DocInfo.link.length - 1] === "F")
//                     DocInfo.type = "PDF";
//                 if(DocInfo.link[DocInfo.link.length - 1] === "g" || DocInfo.link[DocInfo.link.length - 1] === "G")
//                     DocInfo.type = "PNG";
//                 //DocInfo.name = "Đề thi thử học kỳ I năm học 2022-2023"
//                 return DocInfo;
//             })));
//         }).catch((error) => {

//         })
//     }, [subjectId]);

//     function handleName() {
//         if(status === "AZ") setStatus("ZA");
//         else setStatus("AZ");
//     }

//     function handleDate() {
//         if(status === "OldNew") setStatus("NewOld");
//         else setStatus("OldNew");
//     }

//     function handleType() {
//         if(status === "PDFtoPNG") setStatus("PNGtoPDF");
//         else setStatus("PDFtoPNG");
//     }

//     function getTime(x : Date) {
//         console.log(x);
//         return months[x.getMonth()] + ' ' + x.getDate() + ', ' + x.getFullYear() + ' at ' + x.getHours() + ':' + x.getMinutes() + ':' + x.getSeconds();
//     }

//     function LoadList() {
//         if(status === "AZ") {
//             listfile.sort((a, b) => a.name.localeCompare(b.name));
//         }
//         if(status === "ZA") {
//             listfile.sort((a, b) => b.name.localeCompare(a.name));
//         }
//         if(status === "OldNew") {
//             listfile.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
//         }
//         if(status === "NewOld") {
//             listfile.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
//         }
//         if(status === "PDFtoPNG") {
//             listfile.sort((a, b) => a.type.localeCompare(b.type));
//         }
//         if(status === "PNGtoPDF") {
//             listfile.sort((a, b) => b.type.localeCompare(a.type));
//         }

//         let cnt = 0;
//         return listfile.map(DocInfo => {
//             cnt++;
//             return (<>
//                 <div className = {`flex bg-white hover:bg-slate-100 max-h-fit max-w-fit cursor-pointer font-semibold p-1 rounded-lg`} onClick={ () => {
//                     router.push('/all-subjects/documents/details?documentId=' + DocInfo.id);
//                     console.log(listfile[0].id);
//                 }}>
//                     <div className = {`w-[85px] my-[40px]`}>{cnt}</div>
//                     <div className = {`flex w-[410px]`}>
//                         {DocInfo.type === "PDF" &&(
//                             <FaFilePdf className = {`text-slate-500`} style={{fontSize : '100px'}}/>
//                         )}
//                         {DocInfo.type === "PNG" &&(
//                             <FaRegFileImage className = {`text-green-400`} style={{fontSize : '100px'}}/>
//                         )}
//                         <div className = {`ml-[10px] max-w-[250px] space-y-[12px]`}>
//                             <div className = {`text-2xl text-black hover:text-blue-400`}>{DocInfo.name}</div>
//                             <div className = {`text-slate-400 truncate`}>{DocInfo.link}</div>
//                         </div>
//                     </div>
//                     <div className = {`w-[300px] my-[40px]`}>
//                         <div className = {`text-black max-w-fit rounded p-[5px] bg-emerald-400`}>
//                             {getTime(new Date(DocInfo.createdAt))}
//                         </div>
//                     </div>
//                     <div>
//                         <div className = {`my-[40px] w-[100px]`}>
//                             <div className = {`bg-cyan-500 text-black max-w-fit rounded p-[5px]`}>
//                                 {DocInfo.type}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <hr className = {`my-[20px]`} />
//             </>)
//         })
//     }


//     return(<>
//         <Main title={'Tài liệu môn học'}>
//             <TitleWithBox title={subject} />
//             <br />
//             <div className = {`ml-[10px] my-[10px] text-base text-slate-500 font-semibold`}>
//                 <div className = {`flex`}>
//                     <div className = {`w-[100px]`}>STT</div>
//                     <div className = {`w-[400px]`}>
//                         <button className = {``} onClick = {handleName}>Name</button>
//                     </div>
//                     <div className = {`w-[300px]`} onClick={handleDate}>
//                         <button>Date modified</button>
//                     </div>
//                     <div className = {`w-[100px]`} onClick={handleType}>
//                         <button>Type</button>
//                     </div>
//                 </div>
//                 <hr />
//                 <br />
//                 <div className = {``}>
//                     {LoadList()}
//                 </div>
//             </div>
//         </Main>
//     </>)
// }

type AllSubjectsDocumentsPageProps = PageProps<{
    subjectId: string
}>

const { Text, Paragraph } = Typography;

type ColKey = 'order' | 'name' | 'createdAt' | 'author' | 'stat' | 'category'
const fetchKey = genId();
const fetchKey2 = genId();

export default function AllSubjectsDocumentsPage({
    searchParams: {
        subjectId
    }
}: AllSubjectsDocumentsPageProps) {
    const { data: docs, isLoading: loadingDocs, mutate: mutateDocs } = useSWR([fetchKey, subjectId], ([_, subjectId]) => DocumentAPI.getAllDocumentsOfSubject(subjectId))
    const { data: subject, isLoading: loadingSubject } = useSWR([fetchKey2, subjectId], ([_, subjectId]) => SubjectAllAPI.getSubjectById(subjectId))
    const [searchValue, setSearchValue] = useState('')

    const handleSearch = useDebouncedCallback((newSearchValue: string) => {
        setSearchValue(newSearchValue)
    }, 300);

    const filteredDoc = useMemo<typeof docs>((): typeof docs => {
        return docs ? search(searchValue, docs, ['name', 'category', 'userName', 'link']) : []
    }, [docs, searchValue])

    const cols = useMemo<ColumnType<DocumentInfo>[]>(() => {
        return [
            getOrderCol('order'),
            getNameCol('name'),
            getAuthorCol('author'),
            getStatCol('stat'),
            getCreatedAtCol('createdAt')
            // getCategoryCol('category')
        ]
    }, [])
    return (
        <Main title='Tài liệu môn học'>
            <Space direction='vertical' className="w-full" size={'large'}>
                <div className="flex gap-5 items-center sm:max-lg:flex-col sm:max-lg:items-start">
                    <TitleWithBox title={subject?.name} />
                    <div className="flex-1">
                        <SearchBar
                            placeholder="Tìm kiếm tài liệu"
                            className="h-[40px] w-[25vw]"
                            onChange={(e) => handleSearch(e.target.value)}

                        />
                    </div>
                    {
                        !isUndefined(subject) && !isUndefined(docs) &&
                        <UserUpload
                            subjectId={subjectId}
                            subjectName={subject.name}
                            categories={docs.map((doc) => doc.category)}
                            onEndUpload={() => mutateDocs()}
                        >
                            <div className="bg-primary hover:bg-dark-primary px-3 py-2 rounded-lg flex gap-2 items-center">
                                <FaPlus className={'fill-secondary'} size={'1.1em'}/>
                                <Text strong className="text-secondary text-fs-inherit">Tải lên</Text>
                            </div>
                        </UserUpload>
                    }
                </div>
                <ConfigProvider
                    theme={{
                        components: {
                            Table: {
                                rowHoverBg: lightenDarkenColor('gray', 80),
                                bodySortBg: lightenDarkenColor('gray', 80)
                            }
                        }
                    }}
                >
                    <Table
                        dataSource={filteredDoc}
                        loading={loadingDocs}
                        rowKey={(doc) => doc.id}
                        pagination={false}
                        columns={cols}
                        className="w-full"
                        onRow={() => ({
                            className: 'hover:bg-gray-200'
                        })}
                    />
                </ConfigProvider>
            </Space>
        </Main>
    )
}

function getOrderCol(key: ColKey): ColumnType<DocumentInfo> {
    return {
        key,
        title: <CellContent>STT</CellContent>,
        render(_, data, rowIdx) {
            return {
                children: <CellContent>{rowIdx + 1}</CellContent>
            }
        }
    }
}

function getNameCol(key: ColKey): ColumnType<DocumentInfo> {
    return {
        key,
        title: <CellContent>Tên tệp</CellContent>,
        render(_, file, rowIdx) {
            return {
                children:
                    <Link href={getURL('/all-subjects/documents/details', {
                        documentId: file.id
                    })}>
                        <ClickableText>
                            <Space className="pr-8 w-full max-w-[30vw]">
                                <div className="w-[40px]">
                                    <DocumentImage ext={getExtOfFile(file.link).ext} />
                                </div>
                                <p>
                                    <Text strong className="text-inherit">{getExtOfFile(file.link).ext.toLocaleUpperCase()}</Text> <br />
                                    <Text strong className="text-inherit">{file.name}</Text>
                                </p>
                            </Space>
                        </ClickableText>
                    </Link>
            }
        }
    }
}

function getAuthorCol(key: ColKey): ColumnType<DocumentInfo> {
    return {
        key,
        title: <CellContent>Người đăng tải</CellContent>,
        render(_, file, rowIdx) {
            return {
                children:
                    <CellContent>{file.userName}</CellContent>
            }
        }
    }
}

function getStatCol(key: ColKey): ColumnType<DocumentInfo> {
    return {
        key,
        title: <CellContent>Thông tin</CellContent>,
        render(_, file, rowIdx) {
            return {
                children:
                    <CellContent>{`${file.download} lượt tải, ${file.like} lượt thích`}</CellContent>
            }
        },
        sorter(a, b) {
            if (a.download !== b.download)
                return a.download - b.download;
            return a.like - b.like
        },
        showSorterTooltip: false
    }
}

function getCreatedAtCol(key: ColKey): ColumnType<DocumentInfo> {
    return {
        key,
        title: <CellContent>Ngày đăng tải</CellContent>,
        render(_, file, rowIdx) {
            return {
                children:
                    <CellContent>{file.createdAt.toLocaleString()}</CellContent>
            }
        },
        sorter(a, b) {
            return a.createdAt.getTime() - b.createdAt.getTime();
        },
        showSorterTooltip: false
    }
}

function getCategoryCol(key: ColKey): ColumnType<DocumentInfo> {
    return {
        key,
        title: <CellContent>Thẻ</CellContent>,
        render(_, file, rowIdx) {
            return {
                children:
                    <DecorBox className="w-fit">
                        <div className="max-w-[100px] px-3 py-1">
                            <Text ellipsis>{file.category}</Text>
                        </div>
                    </DecorBox>
            }
        }
    }
}
