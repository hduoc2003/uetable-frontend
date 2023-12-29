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
    


export default function Comment({
    pageId,
    pageType,
    offset = 0,
    limit = 4,
}: any) {
    // const {
    //     data: commentData,
    //     isLoading
    //   } = useSWR(CommentAPI.getCommentByPage(pageId, pageType, 0, 10));
    
    const authState = useSelector(authSelector);
    const [data, setData] = useState<CommentInfoType[]>();
    const [newState, setNewState] = useState(0);
    const [cnt, setCnt] = useState(0);
    const [isSending, setIsSending] = useState(-1);
    const [inputReply, setReply] = useState("");
    const [avtURL, setAvtURL] = useState<string>('https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj')

    useEffect(() => {
        if (authState?.signedIn) {
          Fetcher.get<any, UserInfoResponse>('/users/' + authState?.username)
          .then((response) => {
              setAvtURL(response.avatar);
          });
        }
      }, []);

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
            setNewState(newState + 1)
          }
          console.log(response)
        }).catch((error) => {
          console.log(error)
        })
      }

    const setNew = (newState: number) => () => {
        setNewState(newState)
    }

    useEffect(() => {
        console.log(newState)
        const uri = `/page/comment-count/${pageType}/${pageId}/`
        Fetcher.get<any, any>(uri).then((response) => {
            let newData = response.count;
            setCnt(newData)
            console.log(newData)
        }).catch((error) => {

        });
    }, [newState])

    useEffect(() => {
        const uri = `/page/comment/${pageType}/${pageId}/${offset}/${limit}`
        Fetcher.get<any, CommentInfoType[]>(uri).then((response) => {
            let newData = response;
            console.log(newData)
            setData([...newData])
            setReply('')
            setIsSending(1)
        }).catch((error) => {

        });
    }, [newState, offset, limit]);
    // console.log(commentData)

    return (
        <div className="flex flex-col">
            <TitleWithBox title={'Bình luận'} boxContent={cnt} size="middle" />
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
                            <div className={isSending===0?"flex items-center": "hidden flex items-center"}>
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
            </div>
        </div>
    )
}