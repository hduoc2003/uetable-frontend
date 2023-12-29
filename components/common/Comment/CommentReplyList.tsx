import { CommentReply } from "./CommentReply"
import { CommentInfoType } from "@/types/comment";


export function CommentReplyList({ comments }: { comments: CommentInfoType[] }) {
  // console.log("commentLIST", comments)
  return comments.map(comment => (
    <div key={comment.Id} className="comments__answer">
      <CommentReply {...comment} />
    </div>
  )) 
}