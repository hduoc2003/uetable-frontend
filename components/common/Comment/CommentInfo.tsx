import { Typography } from 'antd';
import React, {useState, useEffect, use, useRef, useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '@/redux/auth/authSlice'
import { twMerge } from 'tailwind-merge';
import './comment.css';
import HeartIcon from "../(Icons)/HeartIcon";
import ReplyIcon from "../(Icons)/ReplyIcon";
import MoreHoriIcon from "../(Icons)/MoreHoriIcon";
import Cookies from 'universal-cookie';
const {Text} = Typography;
import Fetcher from '@/api/Fetcher'
import EditIcon from '../(Icons)/EditIcon';
import RepeatIcon from '../(Icons)/RepeatIcon';
import ReportIcon from '../(Icons)/ReportIcon';
import LikeIcon from '../(Icons)/LikeIcon';
import LikedIcon from '../(Icons)/LikedIcon';
import DisLikeIcon from '../(Icons)/DisLikeIcon';
import DisLikedIcon from '../(Icons)/DisLikedIcon';
import { set } from 'lodash';
import ReportForm from '../Report/Report';
import { ClipLoader } from 'react-spinners';
import { Avatar, Badge, Divider, Select, Popover } from "antd";
import { authSelector } from "@/redux/auth/authSelector";
import { UserInfoResponse } from "@/api/userAPI";
import { CommentInfoType }  from "@/types/comment";
import { CommentReplyList } from './CommentReplyList';
import MessageIcon from '../(Icons)/MessageIcon';

interface Props {
    className?: string;
    editable?: boolean;
    children?: React.ReactNode;
}

export function CommentInfo({
    Id,
    pageId,
    pageType,
    author,
    content,
    parent,
    children,
    usersLiked,
    usersDisLiked,
    timestamp,
    hasLiked,
    hasDisLiked,
    editable = false,
}: any) {
  // console.log(Id, pageId, pageType, author, content, parent, usersLiked, usersDisLiked, timestamp, hasLiked, hasDisLiked, editable)
  const authState = useSelector(authSelector);
  const [likeCnt, setLikeCnt] = useState(usersLiked)
  const [disLikeCnt, setDisLikeCnt] = useState(usersDisLiked)
  const [isOpen, setOpen] = useState(false);
  const [openReportForm, setOpenReportForm] = useState(false);
  const [isOpenNav, setOpenNav] = useState(false);
  const inputReference = useRef(null);
  const [isSending, setIsSending] = useState(-1);
  const [isLiking, setIsLiking] = useState(-1)
  const dispatch = useDispatch();
  const [inputReply, setReply] = useState("");
  const [isSubmit, setSubmit] = React.useState(false);
  const [submitError, setSubmitError] = useState("");
  const [textareaHeight, setTextareaHeight] = useState('auto');
  const [isLike, setLike] = useState(hasLiked);
  const [isDisLike, setDisLike] = useState(hasDisLiked);
  const cookies = new Cookies();
  const [avtURL, setAvtURL] = useState<string>('https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj')
  const [newState, setNewState] = useState(0);
  const [newStateLike, setNewStateLike] = useState(0);
  const [isSeeReply, setIsSeeReply] = useState(false);
  useEffect(() => {
    if (authState?.signedIn) {
      Fetcher.get<any, UserInfoResponse>('/users/' + authState?.studentId)
      .then((response) => {
          setAvtURL(response.avatar);
      });
    }
    // setLikeCnt(usersLiked)
    // setLike(hasLiked)
  }, [authState?.signedIn, authState?.studentId]);

  const toggleReportForm = () => setOpenReportForm(!openReportForm);
  const toggleMenu = useCallback(() => setOpen((open) => !open), []);
  const toggleSubmit = () => setSubmit(!isSubmit);
  const likeReq = (score: any) => {
    // console.log(score)
    setIsLiking(0)
    Fetcher.post<any, any>('page/like/', {
      "pageId": Id,
      "pageType": 'C',
      "score": score
    }).then((response : any) => {
      if (response.message === 'Successfully like!') {
        // router.reload();
        // setReply('')
        // setIsSending(1)
        setIsLiking(1)
        setNewStateLike(newStateLike + 1)
      }
      // console.log(response)
    }).catch((error) => {
      // console.log(error)
    })
  }
  const toggleLike = () => {
    // console.log(isLike)
    if (isLike) {
      likeReq(0)
    } else {
      likeReq(1)
    }
    // setLike(!isLike);
    // setDisLike(false);
  }

  useEffect(() => {
      console.log(Id, newStateLike)
      const uri = `page/like/C/${Id}/`
      Fetcher.get<any, any>(uri).then((response) => {
          // let newData = response.count;
          console.log(response)
          setLikeCnt(response.likes)
          setDisLikeCnt(response.dislikes)
          if (response.userLike === -1) {
            setLike(false)
            setDisLike(true)
          } else if (response.userLike === 1) {
            setLike(true)
            setDisLike(false)
          } else {
            setLike(false)
            setDisLike(false)
          }

      }).catch((error) => {

      });
  }, [Id, newStateLike]);


  const toggleNav = () => setOpenNav(!isOpenNav);
  const toggleDisLike = () => {
    if (isDisLike) {
      likeReq(0)
    } else {
      likeReq(-1)
    }
  }

  async function onSubmit() {
    setIsSending(0)

    Fetcher.post<any, any>('/comment/', {
      "content": inputReply,
      "pageType": pageType,
      "pageId": pageId,
      "parentId": Id,
      "preCommentId": 0
    }).then((response : any) => {
      if (response.message === "Comment successfully created") {
        // router.reload();
        setNewState(response.CommentId)
        setIsSending(1)
        setIsSeeReply(true)
      }
      // console.log(response)
    }).catch((error) => {
      // console.log(error)
    })
  }

  useEffect(() => {
    if (isSending === 1) {
      setReply("@" + author.name + " ");
      setTextareaHeight(`auto`);
      toggleMenu();
    }
  }, [author.name, isSending, toggleMenu]);


  const className=parent===0?'comments__item': 'comments__answer'
  const date = new Date(timestamp);
  const now = Date.now();
  const diff = now - timestamp;
  let commentDate = '';
  if (diff <= 1000 * 5) {
    commentDate = 'Vừa xong'
  } else if (diff < 1000 * 60) {
    commentDate = `${Math.floor(diff / 1000)} giây trước`
  } else if (diff < 1000 * 60 * 60) {
    commentDate = `${Math.floor(diff / (1000 * 60))} phút trước`
  } else if (diff < 1000 * 60 * 60 * 24) {
    commentDate = `${Math.floor(diff / (1000 * 60 * 60))} giờ trước`
  } else if (diff < 1000 * 60 * 60 * 24 * 365) {
    commentDate = `${Math.floor(diff / (1000 * 60 * 60 * 24))} ngày trước`
  } else if (diff < 1000 * 60 * 60 * 24 * 365) {
    commentDate = date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    })
  } else {
    commentDate = date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  const [data, setData] = useState<CommentInfoType[]>();

  const toggleReply = () => {
    const uri = `comment/getchildren/${Id}`
    setIsLiking(0)
    Fetcher.get<any, CommentInfoType[]>(uri).then((response) => {
        let newData = response;
        console.log(newData)
        setData([...newData])
        setIsLiking(-1)
        setIsSeeReply(true)

    }).catch((error) => {

    });
  }

  // useEffect(() => {

  // }, []);

  useEffect(() => {
    const uri = `/comment/${newState}`
    Fetcher.get<any, CommentInfoType>(uri).then((response) => {
        let newData = data ? [...data] : []
        newData?.unshift(response);
        console.log(newData)
        setData(newData ? [...newData] : [])
        setReply('')
        setIsSending(1)
    }).catch((error) => {

    });
  }, [data, newState]);

  return (
    <div>

    <div className={twMerge("flex", className)}>
      <div className='comment__avatar' style={{width:'56px', height: '56px'}}>
        <Avatar className="" src={author.avatar} size={56}></Avatar>
        {/* <img src={author.avatar} alt='Avatar' style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}}></img> */}
      </div>
      <div className='comment__details' style={{flex: '0 0 calc(100% - 48px)', width: 'calc(100% - 48px)', paddingLeft: '16px'}}>
        <div className={'flex'} style={{alignItems: 'center'}}>
          <div style={{marginRight: 'auto', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
            <Text strong style={{fontSize: '18px'}}>
            {author.name}
            </Text>
          </div>
          <div style={{marginLeft: '8px', whiteSpace: 'nowrap', fontSize: '12px', fontWeight: '500', color: '#9A9FA5'}}>
            {commentDate}
          </div>
          <div className={twMerge("actions actions_small", isOpenNav===true?"active":"")}>
                  <button className="actions__button" onClick={toggleNav}>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><MoreHoriIcon size='20px'/></div>
                  </button>
                  <div className="actions__body">
                    <button className="actions__option">
                    <EditIcon size='20px' className='icon'/>
                    <div style={{ color: '#1A1D1F'}}>Chỉnh sửa</div>
                    </button>
                    <button className="actions__option">
                      <RepeatIcon size='20px' className='icon'/>
                      <div style={{ color: '#1A1D1F'}}>Xem lịch sử chỉnh sửa</div>
                    </button>
                    <hr style={{marginTop: '8px', marginBottom: '8px'}}></hr>
                    <button className="actions__option" style={{alignItems: 'start'}} onClick={toggleReportForm}>
                      <div><ReportIcon size='20px' className='icon'/></div>
                      <div className="flex" style={{ flexDirection: 'column'}}>
                        <Text style={{textAlign: 'left'}}> Báo cáo bình luận</Text>
                        <div style={{wordWrap: 'break-word', textAlign: 'left', fontSize: '12px'}}> Chúng tôi sẽ không cho {author.name} biết ai đã báo cáo.</div>
                        {/* <Text></Text> */}
                      </div>
                    </button>
                  </div>
                </div>
        </div>
        <div className='comment__login' style={{marginTop: '4px', fontSize: '14px', fontWeight: '500', color: '#6F767E'}}>
        @{author.studentId}
        </div>
        <div className='comment__content' style={{marginTop: '12px', fontSize: '16px', fontWeight: '500', color: '#33383F'}}>
          {/* <Text> */}
          {content}
          {/* </Text> */}
        </div>
        <div className="comments__control">
          <button className="comments__favorite" onClick={toggleLike}>
           {!isLike && (<LikeIcon size='20px' solidOnHover className='icon'/>)}
           {isLike && (<LikedIcon size='20px' solidOnHover solid className='icon' color='blue'/>)}
           {likeCnt}
          </button>
          <button className="comments__favorite" onClick={toggleDisLike}>
           {!isDisLike && (<DisLikeIcon size='20px' solidOnHover className='icon'/>)}
           {isDisLike && (<DisLikedIcon size='20px' solidOnHover solid className='icon' color='red'/>)}
           {disLikeCnt}
          </button>
          <button className="comments__reply" onClick={toggleMenu}>
              <ReplyIcon size='20px' className='icon'/>
              Reply
          </button>
          {
            children?.length > 0 && isSeeReply === false && (
              <button className="comments__reply" onClick={toggleReply}>
                    <MessageIcon size='20px' className='icon'/>
                    Xem tất cả {children?.length} phản hồi
              </button>
            )
          }
          <div className={isLiking===0?"flex items-center": "hidden items-center"}>
            <ClipLoader
            color="#2A85FF"
            size={12}
            cssOverride={{
                'borderWidth': '3px'
            }}
            />
          </div>
        </div>
        {isOpen && (
        <div className="answer">
          <div className="answer__avatar" style={{width:'48px', height: '48px'}}>
            <Avatar className="" src={avtURL} size={48}></Avatar>
          {/* <img src='https://ui8-core.herokuapp.com/img/content/avatar-2.jpg' alt='Avatar' style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}}></img> */}
          </div>
          <div className="answer__details">
            <div className="answer__message">
              <textarea id='reply__textarea' className="answer__textarea" name="answer" placeholder="Leave something to reply" value={inputReply}  onChange={e => {setReply(e.target.value); setTextareaHeight(`0px`); setTextareaHeight(`${e.target.scrollHeight}px`)}} style={{height: textareaHeight}}>
              </textarea>
            </div>
            <div className="answer__btns">
              <button className={inputReply===""?"button button-small answer__button disabled": "button button-small answer__button"} onClick={onSubmit}>Reply</button>
              <button className="button-stroke button-small answer__button" onClick={toggleMenu}>Cancel</button>
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
        </div>)}
      </div>

      <ReportForm
      // key={(editingSubject?.id ?? '') + editingSubject?.getFinalScore?.()}
      // key={editingSubject.current?.id ?? ''}
      reportInfo = {
        {
          pageId: Id,
          pageType: "C"
        }
      }
      onSave= {(newSubject) => {
        // console.log(newSubject)
        Fetcher.post('/report/', {
          "content": newSubject?.content,
          "pageType": newSubject?.pageType,
          "pageId": newSubject?.pageId,
          "type": newSubject?.type,
        }).then((response) => {
          console.log(response)
          setOpenReportForm(false);
        }).catch((error) => {
          console.log(error)
        });
      }}
      open={openReportForm}
      onCancel={() => setOpenReportForm(false)}
      />
    </div>

    <div className="comment_reply_container">
        <CommentReplyList comments={data ?? []} />
    </div>

  </div>
  )
}
