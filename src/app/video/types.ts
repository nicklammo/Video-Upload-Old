/* THIRD PARTY */
import type { User, Video, Comment } from "@prisma/client"

type ExtendedVideo = Video & {
  author: Pick<User,'username' | 'avatar'>;
};

type CompactVideo = Pick<Video, 'id' | 'title' | 'description'>;

type ExtendedComment = Comment & {
  author: Pick<User, 'username' | 'avatar'>;
};

type PostCommentState = { message: string; success: boolean; };

export type { ExtendedVideo, CompactVideo, ExtendedComment, PostCommentState };