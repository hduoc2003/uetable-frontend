import CommentInfo from "./CommentInfo"

export function CommentList({ comments }: { comments: any[] }) {
  return comments.map(comment => (
    // <div key={comment.id} className="comment-stack" style={marginTop}>
      <CommentInfo {...comment} />
    // </div>
  )) 
}