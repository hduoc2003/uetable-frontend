import { CommentInfo } from "./CommentInfo"
import { CommentInfoType } from "@/types/comment";


export function CommentList({ comments }: { comments: CommentInfoType[] }) {
  // console.log("commentLIST", comments)
  return comments.map(comment => (
    <div key={comment.Id} className="comments__item">
      <CommentInfo {...comment} />
    </div>
  )) 
}