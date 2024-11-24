"use server";
/* UTILITIES */
import { postVideoComment } from "./utils";
/* THIRD PARTY */
import { z } from "zod";
/* TYPES */
import type { PostCommentState } from "./types";
import { cookies } from "next/headers";

type Video = {
  id: number;
  title: string;
  description: string | null;
}

const updateVideo = async(formData: FormData, video: Video) => {
  try {
    const title = z.string().parse(formData.get('title'));
    const description = z.string().parse(formData.get('description'));
    if (video.title === title && video.description === description) return;
    const res = await fetch(`http://localhost:3000/api/video/${video.id}/edit`, {
      method: 'POST',
      body: JSON.stringify({
        videoId: video.id,
        title: title,
        description: description,
        token: cookies().get('session')?.value,
      }),
    });
    if (!res.ok) throw Error('API error');
  } catch (e) {
    console.error(e);
  }
}

const postComment = async (previousState: PostCommentState, formData: FormData, videoId: number) => {
  const comment = formData.get('comment') as string;
  try {
    const commentStatus = await postVideoComment(videoId, comment);
    if (!commentStatus.success) throw Error('Failed to post comment');
    return {
      message: 'Comment posted',
      success: true,
    }
  } catch (e) {
    console.error(e);
    return { 
      message: 'Failed to post your comment',
      success: false,
    }
  }
}

export { postComment, updateVideo };