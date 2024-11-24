/* COMPONENTS*/
import Avatar from "@/app/components/user/avatar";
import { Card, CardContent } from "@/components/ui/card";
import Timeago from "@/app/components/time-ago";
/* TYPES */
import type { ExtendedComment } from "../types";
/* THIRD PARTY */
import Link from "next/link";

const CommentCard: React.FC<Readonly<{
  comment: ExtendedComment
}>> = ({ comment }) => {
  return (
    <Card>
      <CardContent className="flex flex-row gap-2 px-3 py-2">
        <div>
          <Link href={`/channel/${comment.author.username}`}>
            <Avatar user={comment.author} width={40} height={40} />
          </Link>
        </div>
        <div className="flex flex-col gap-1">
          <div>
            <strong className="font-semibold">
              <Link href={`/channel/${comment.author.username}`}>
                {comment.author.username}
              </Link>
              <span aria-hidden="true"> • </span>
            </strong>
            <span className="dark:text-slate-400">
              <Timeago date={new Date(comment.createdAt)} />
            </span>
          </div>
          <div>
            {comment.body}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CommentCard;