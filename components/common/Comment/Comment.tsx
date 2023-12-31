'use client'

import Editor from "@/components/common/Editor/Editor";
import TitleWithBox from "../TitleWithBox"
import { CommentList } from "./CommentList"
import { CommentAPI } from "@/api/commentAPI";
import useSWR from "swr";
import Fetcher from '@/api/Fetcher';
import { CommentInfoType } from "@/types/comment";
import { use, useEffect, useState } from "react";
import { set } from "lodash";
import { ClipLoader } from 'react-spinners';
import { authSelector } from "@/redux/auth/authSelector";
import { useDispatch, useSelector } from "react-redux";
import { UserInfoResponse } from "@/api/userAPI";
import { Avatar, Badge, Divider, Select, Popover } from "antd";
import { ToastContainer } from "react-toastify";
import ReplyIcon from "../(Icons)/ReplyIcon";


export default function Comment({
    pageId,
    pageType,
    offset = 0,
    limit = 5,
}: any) {
    // const {
    //     data: commentData,
    //     isLoading
    //   } = useSWR(CommentAPI.getCommentByPage(pageId, pageType, 0, 10));

    const authState = useSelector(authSelector);
    const [data, setData] = useState<CommentInfoType[]>();
    const [newState, setNewState] = useState(0);
    const [isLoadMore, setIsLoadMore] = useState(-1);
    const [cnt, setCnt] = useState(0);
    const [isSending, setIsSending] = useState(-1);
    const [offsetNow, setOffsetNow] = useState(0);
    const [cntMore, setCntMore] = useState(0);
    const [inputReply, setReply] = useState("");
    const [cntAdd, setCntAdd] = useState(0);
    const [avtURL, setAvtURL] = useState<string>('https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj')

    useEffect(() => {
        if (authState?.signedIn) {
          Fetcher.get<any, UserInfoResponse>('/users/' + authState?.studentId)
          .then((response) => {
              setAvtURL(response.avatar);
          });
        }
      }, [authState?.signedIn, authState?.studentId]);

    async function onSubmit() {
        setIsSending(0)

        Fetcher.post<any, any>('/comment/', {
          "content": inputReply,
          "pageType": pageType,
          "pageId": pageId,
          "parentId": 0,
          "preCommentId": 0
        }).then((response : any) => {
          if (response.message === "Comment successfully created") {
            // router.reload();
            // setReply('')
            // setIsSending(1)
            setNewState(response.CommentId)
            setCntAdd(cntAdd + 1)
          }
        //   console.log(response)
        }).catch((error) => {
        //   console.log(error)
        })
      }

    const setNew = (newState: number) => () => {
        setNewState(newState)
    }

    useEffect(() => {
        // console.log(newState)
        const uri = `/page/comment-count/${pageType}/${pageId}/`
        Fetcher.get<any, any>(uri).then((response) => {
            let newData = response.count;
            setCnt(newData)
            // console.log(newData)
        }).catch((error) => {

        });
    }, [pageId, pageType])

    // useEffect(() => {
    //     const uri = `/page/comment/${pageType}/${pageId}/0/5`
    //     Fetcher.get<any, CommentInfoType[]>(uri).then((response) => {
    //         // let newData = data ? [...data] : []
    //         // for (let i = 0; i < response.length; i++) {
    //         //     newData?.push(response[i])
    //         // }
    //         // // newData?.append(response);
    //         // console.log("new data", newData)
    //         // setData(newData ? [...newData] : [])
    //         setData(response ?? [])
    //         setReply('')
    //         setIsSending(1)
    //     }).catch((error) => {

    //     });
    // },[pageId, pageType])

    useEffect(() => {
        setIsLoadMore(0)
        // if (offsetNow === 0) return
        // console.log("cc", offsetNow, pageId, pageType)
        // console.log("offsetNow", offsetNow)
        const uri = `/page/comment/${pageType}/${pageId}/0/5`
        Fetcher.get<any, CommentInfoType[]>(uri).then((response) => {
            console.log(response)
            // console.log("data", data)
            console.log(response.length)
            // for (let i = 0; i < response.length; i++) {
            //     setData((oldData) => [...(oldData ?? []), response[i]])
            // }
            // console.log("new aeppend data", data)
            setData(response?? [])
            // console.log("data", data)
            setReply('')
            setIsSending(1)
            setIsLoadMore(1)
        }).catch((error) => {

        });
    }, [pageId, pageType]);

    useEffect(() => {
        setIsLoadMore(0)
        if (offsetNow === 0) return
        console.log("cc", offsetNow, pageId, pageType)
        // console.log("offsetNow", offsetNow)
        const uri = `/page/comment/${pageType}/${pageId}/${offsetNow}/5`
        Fetcher.get<any, CommentInfoType[]>(uri).then((response) => {
            console.log(response)
            // console.log("data", data)
            console.log(response.length)
            // for (let i = 0; i < response.length; i++) {
            //     setData((oldData) => [...(oldData ?? []), response[i]])
            // }
            // console.log("new aeppend data", data)
            setData((oldData) => [...(oldData ?? []), ...response])
            // console.log("data", data)
            setReply('')
            setIsSending(1)
            setIsLoadMore(1)
        }).catch((error) => {

        });
    }, [offsetNow, pageId, pageType]);
    // useEffect(() => {
    //     const uri = `/page/comment/${pageType}/${pageId}/0/5`
    //     Fetcher.get<any, CommentInfoType[]>(uri).then((response) => {
    //         let newData = data ? [...data] : []
    //         for (let i = 0; i < response.length; i++) {
    //             newData?.push(response[i])
    //         }
    //         // newData?.append(response);
    //         console.log("new data", newData)
    //         setData(newData ? [...newData] : [])
    //         setReply('')
    //         setIsSending(1)
    //     }).catch((error) => {

    //     });
    // },[pageId, pageType])

    // useEffect(() => {
    //     setIsLoadMore(0)
    //     const uri = `/page/comment/${pageType}/${pageId}/${offsetNow + cntAdd}/${limit}`
    //     Fetcher.get<any, CommentInfoType[]>(uri).then((response) => {
    //         let newData = data ? [...data] : []
    //         for (let i = 0; i < response.length; i++) {
    //             newData?.push(response[i])
    //         }
    //         // newData?.append(response);
    //         console.log("new data", newData)
    //         setCntMore(cnt - offsetNow - limit - cntAdd)
    //         setData(newData ? [...newData] : [])
    //         setReply('')
    //         setIsSending(1)
    //         setIsLoadMore(1)
    //     }).catch((error) => {

    //     });
    // }, [offsetNow]);

    useEffect(() => {
        // console.log("This state", newState)
        if (newState === 0) return 
        const uri = `/comment/${newState}`
        Fetcher.get<any, CommentInfoType>(uri).then((response) => {
            // let newData = data ? [...data] : []
            // newData?.unshift(response);
            // console.log(newData)
            // setData(newData ? [...newData] : [])
            setData((oldData) => [response, ...(oldData ?? [])])
            // console.log(data)
            setReply('')
            setIsSending(1)
        }).catch((error) => {

        });
    }, [newState]);

    const seeMoreComment = () => {
        setOffsetNow(offsetNow + limit + cntAdd)
        setCntAdd(0)
    }
    console.log(data)
    
    return (
        <div className="flex flex-col">
            <TitleWithBox title={'Bình luận'} boxContent={cnt} size="middle" boxClassName="px-2"/>
            {/* <button onClick={() => setNew(4)}>Click me</button> */}
            <div style={{ marginTop: '40px', padding: '4px' }} >
                {/* <Editor />  */}
                <div className="editor__label"> Để lại một bình luận?
                  </div>
                <div className="answer_main">

                    <div className="answer__avatar" style={{width:'48px', height: '48px'}}>
                        <Avatar className="" src={avtURL} size={48}></Avatar>
                    </div>
                    <div className="answer__details">
                        {/* <div className="answer__message"> */}
                            <textarea rows={4} className="mainText" name="answer" placeholder="Hãy để lại một bình luận (Lưu ý không spam, bình luận nhảm, thảo luận chính trị, công kích cá nhân/tập thể, ..." value={inputReply}  onChange={e => {setReply(e.target.value); }} >
                            </textarea>
                        {/* </div> */}
                        <div className="answer__btns">
                            <button className={inputReply===""?"button button-small answer__button disabled": "button button-small answer__button"} onClick={onSubmit}>Bình luận</button>
                            {/* <button className="button-stroke button-small answer__button" onClick={}>Cancel</button> */}
                            <div className={isSending===0?"flex items-center": "hidden items-center"}>
                                <ClipLoader
                                color="#2A85FF"
                                size={24}
                                cssOverride={{
                                    'borderWidth': '4px'
                                }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <CommentList comments={data ?? []} />
                {
                    (cnt - offsetNow - limit - cntAdd) > 0 && (
                    <div className="flex justify-center mt-8">
                        <button className="button message__button button-stroke" onClick={seeMoreComment}>
                            {/* <ReplyIcon size='20px' className='icon'/> */}
                            Xem thêm {cnt - offsetNow - limit - cntAdd} phản hồi
                            <div className={isLoadMore===0?"flex items-center ml-2": "hidden items-center ml-2"}>
                                <ClipLoader
                                color="#2A85FF"
                                size={12}
                                cssOverride={{
                                    'borderWidth': '3px'
                                }}
                                />
                            </div>
                        </button>
                        </div>
                    )
                }

            </div>
        </div>
    )
}
