"use server";
import { UserSession } from "@/types";
/* COMPONENTS*/
import CommentCard from "./comments/comment-card";
import CommentForm from "./comments/comment-form";
/* TYPES */
import { ExtendedComment } from "./types";
/* REACT */

const Comments: React.FC<Readonly<{
  comments: ExtendedComment[] | undefined,
  videoId: number,
  user: UserSession['user'] | undefined,
}>> = async({ comments, videoId, user }) => {

  if (comments) return (
    <div className="flex flex-col gap-3">
      <CommentForm videoId={videoId} user={user} />
      {comments.map(comment => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default Comments;