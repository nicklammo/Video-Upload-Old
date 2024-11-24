"use server";
/* ENV */
import { baseUrl } from "@/env";
/* THIRD PARTY */
import { cookies } from "next/headers";
import { z } from "zod";
import { ExtendedComment, ExtendedVideo } from "./types";

const getVideoInfo = async(videoIdSlug: string): Promise<ExtendedVideo | undefined> => {
  try {
    const videoId = z.number().parse(parseInt(videoIdSlug));
    const res = await fetch(`${baseUrl}/api/video/${videoId}`);
    const data = await res.json();
    if (data.success) { 
      return (data.video);
    } else {
      throw Error('Failed to fetch video');
    }
  } catch (e) {
    console.error(e);
    return undefined;
  }
}


const getVideoComments = async(videoIdSlug: string): Promise<ExtendedComment[] | undefined> => {
  try {
    const videoId = z.number().parse(parseInt(videoIdSlug));
    const res = await fetch(`${baseUrl}/api/video/${videoId}/comments`);
    if (!res.ok) throw Error('API error');
    const data = await res.json();
    if (data.success) {
      return data.comments;
    } else {
      throw Error('Failed to fetch comments');
    }
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

const postVideoComment = async(videoId: number, commentBody: string): Promise<{success: boolean}> => {
  try {
    const sessionToken = cookies().get('session')?.value;
    if (!sessionToken) throw Error('Invalid session data');
    if (!commentBody) throw Error('Empty comment');
    const body = z.string().parse(commentBody);
    const cleanVideoId = z.number().parse(videoId);
    const res = await fetch(`${baseUrl}/api/video/${cleanVideoId}/comment`, {
      method: 'POST',
      body: JSON.stringify({
        body: body,
        videoId: videoId,
        sessionToken: sessionToken,
      }),
    });
    const data = await res.json();
    return {
      success: data.success,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
    };
  }
}

const userIsVideoAuthor = async(sessionUsername: string | undefined, videoAuthorUsername: string ) => {
  if (sessionUsername === undefined) return false;
  let isVideoAuthor = false;
  sessionUsername === videoAuthorUsername ? isVideoAuthor = true : isVideoAuthor = false;
  return isVideoAuthor;
}

export { getVideoInfo, getVideoComments, postVideoComment, userIsVideoAuthor }; 