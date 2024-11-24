import { Subscription, User, Video } from "@prisma/client";

type SubscribeToChannelState = {
  success: boolean,
  subscribed: boolean,
}

type ChannelData = {
  id: User['id'],
  username: User['username'],
  avatar: User['avatar'],
  videos: Video[] | null,
  subscribers: Subscription[] | null,
}

export type { ChannelData, SubscribeToChannelState };