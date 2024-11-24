"use server";
/* THIRD PARTY */
import { cookies } from "next/headers";
import { z } from "zod";
/* TYPES */
import { Subscription } from "@prisma/client";
import { ChannelData } from "./types";

async function getChannelData(username: string): Promise<ChannelData | undefined> {
  try {
    const cleanUsername = z.string().regex(/^[a-zA-Z0-9_]+$/).parse(username);
    const res = await fetch(`http://localhost:3000/api/user/${cleanUsername}/channel`);
    const data = await res.json();
    if (!data.success) throw Error('Channel not found');
    return data.channel;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

const isUserSubscribedToChannel = async(channelSubscribers: Subscription[] | null, userId: number | undefined): Promise<boolean> => {
  if (!channelSubscribers) return false;
  return channelSubscribers.some((subscriber: Subscription) => subscriber.subscriberId === userId);
};

async function executeChannelSubscription(channelData: Pick<ChannelData, 'id' | 'username'>) {
  try {
  const sessionToken = cookies().get('session')?.value;
  if (!sessionToken) throw Error('Session token required');

  const res = await fetch(`http://localhost:3000/api/user/${channelData.username}/subscribe`, {
    method: 'POST',
    body: JSON.stringify({
      sessionToken: sessionToken,
      channelId: channelData.id,
    }),
  });
  const data = await res.json();
  if (!data.success) throw Error('Subscription unsuccessful');
  return data;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export { getChannelData, isUserSubscribedToChannel, executeChannelSubscription };