"use client";
/* COMPONENTS */
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
/* ACTIONS */
import { postComment } from "../actions";
/* TYPES */
import type { PostCommentState } from "../types";
/* THIRD PARTY */
import { useRouter } from "next/navigation";
/* REACT */
import { useActionState, useEffect } from "react";
import { UserSession } from "@/types";
import Alert from "@/app/components/alert";


const CommentForm: React.FC<{
  videoId: number,
  user: UserSession['user'] | undefined,
}> = ({ videoId, user }) => {

  const [commentStatus, formAction, isPending] = useActionState(
    (previousState: PostCommentState, formData: FormData) => 
      postComment(previousState, formData, videoId), 
    {
      message: '',
      success: false,
    }
  );

  const router = useRouter();

  useEffect(() => {
    if (commentStatus.success) router.refresh();
  }, [commentStatus]);

  if (user) return (
    <form 
      action={formAction}
      className="flex flex-col gap-3 w-full"
    >
      {commentStatus.message && (
        commentStatus.success ? (
         <Alert type="success">{commentStatus.message}</Alert>
        ) : (
          <Alert type="error" className="dark:text-[#FF0E48] text-sm">{commentStatus.message}</Alert>
        )
      )}
      <Textarea 
        name="comment" 
        placeholder="Share your thoughts..." 
        className="bg-transparent border-gray-600"
      />
      <Button
        disabled={isPending} 
        variant="red" 
      >
        Post
      </Button>
    </form>
  );
}

export default CommentForm;