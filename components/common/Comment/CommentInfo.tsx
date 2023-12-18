import { Typography } from 'antd';
import React, {useState, useEffect, use, useRef} from 'react'
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

interface Props {
    className?: string;
    editable?: boolean;
    children?: React.ReactNode;
}

export default function CommentInfo({
    Id,
    pageId,
    pageType,
    author,
    content,
    parent,
    usersLiked,
    usersDisLiked,
    timestamp,
    hasLiked,
    hasDisLiked,
    editable = false, 
}: any) {
  const [isOpen, setOpen] = useState(false);
  const [openReportForm, setOpenReportForm] = useState(false);
  const [isOpenNav, setOpenNav] = useState(false);
  const inputReference = useRef(null);
  const [isSending, setIsSending] = useState(-1);
  const dispatch = useDispatch();
  const [inputReply, setReply] = useState("@" + author.name + " ");
  const [isSubmit, setSubmit] = React.useState(false);
  const [submitError, setSubmitError] = useState("");
  const [textareaHeight, setTextareaHeight] = useState('auto');
  const [isLike, setLike] = useState(hasLiked);
  const [isDisLike, setDisLike] = useState(hasDisLiked);
  const cookies = new Cookies();

  const toggleReportForm = () => setOpenReportForm(!openReportForm);
  const toggleMenu = () => setOpen(!isOpen);
  const toggleSubmit = () => setSubmit(!isSubmit);
  const toggleLike = () => {setLike(!isLike); setDisLike(false);}
  const toggleNav = () => setOpenNav(!isOpenNav);
  const toggleDisLike = () => {setDisLike(!isDisLike); setLike(false);}

  async function onSubmit() {
    setIsSending(0)

    Fetcher.post<any, any>('/comment/', {
      "content": inputReply,
      "pageType": pageType,
      "pageId": pageId,
      "parentId": Id,
      "preCommentId": 0
    }).then((response : any) => {
      console.log(response)
      setIsSending(1)
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    if (isSending === 1) {
      setReply("@" + author.name + " ");
      setTextareaHeight(`auto`);
      toggleMenu();
    }
  }, [isSending]);


  const className=parent===0?'comments__item': 'comments__answer' 
  const date = new Date(timestamp);
  const now = Date.now();
  const diff = now - timestamp;
  let commentDate = '';
  if (diff < 60) {
    commentDate = 'Just now'
  } else if (diff < 1000 * 60) {
    commentDate = `${Math.floor(diff / 1000)} seconds ago`
  } else if (diff < 1000 * 60 * 60) {
    commentDate = `${Math.floor(diff / (1000 * 60))} minutes ago`
  } else if (diff < 1000 * 60 * 60 * 24) {
    commentDate = `${Math.floor(diff / (1000 * 60 * 60))} hours ago`
  } else if (diff < 1000 * 60 * 60 * 24 * 365) {
    commentDate = `${Math.floor(diff / (1000 * 60 * 60 * 24))} days ago`
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
  return (
    <div className={twMerge("flex", className)}>
      <div className='comment__avatar' style={{width:'48px', height: '48px'}}>
        <img src={author.avatar} alt='Avatar' style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}}></img>
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
        <div className='comment__content' style={{marginTop: '12px', fontWeight: '500', color: '#33383F'}}>
          <Text>
          {content}
          </Text>
        </div>
        <div className="comments__control">
          <button className="comments__favorite" onClick={toggleLike}>
           {!isLike && (<LikeIcon size='20px' solidOnHover className='icon'/>)}
           {isLike && (<LikedIcon size='20px' solidOnHover solid className='icon' color='blue'/>)}
           {usersLiked}
          </button>
          <button className="comments__favorite" onClick={toggleDisLike}>
           {!isDisLike && (<DisLikeIcon size='20px' solidOnHover className='icon'/>)}
           {isDisLike && (<DisLikedIcon size='20px' solidOnHover solid className='icon' color='red'/>)}
           {usersDisLiked}
          </button>
          <button className="comments__reply" onClick={toggleMenu}>
              <ReplyIcon size='20px' className='icon'/>
              Reply
          </button>
        </div>
        {isOpen && (
        <div className="answer">
          <div className="answer__avatar" style={{width:'48px', height: '48px'}}>
          <img src='https://ui8-core.herokuapp.com/img/content/avatar-2.jpg' alt='Avatar' style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}}></img>
          </div>
          <div className="answer__details">
            <div className="answer__message">
              <textarea id='reply__textarea' className="answer__textarea" name="answer" placeholder="Leave something to reply" value={inputReply}  onChange={e => {setReply(e.target.value); setTextareaHeight(`0px`); setTextareaHeight(`${e.target.scrollHeight}px`)}} style={{height: textareaHeight}}>
              </textarea>
            </div>
          <div className="answer__btns">
            <button className={inputReply===""?"button button-small answer__button disabled": "button button-small answer__button"} onClick={onSubmit}>Reply</button>
              <button className="button-stroke button-small answer__button" onClick={toggleMenu}>Cancel</button>
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
        setOpenReportForm(false);
      }}
      open={openReportForm}
      onCancel={() => setOpenReportForm(false)}
      />
    </div>
  )
}