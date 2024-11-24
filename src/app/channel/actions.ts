"use server";
/* TYPES */
import { ChannelData, SubscribeToChannelState } from "./types";
/* UTILITIES */
import { executeChannelSubscription } from "./utils";

const subscribeToChannel = async(
  previousState: SubscribeToChannelState,
  channelData: Pick<ChannelData, 'id' | 'username'>,
) => {
  try {
    const res = await executeChannelSubscription(channelData);
    if (!res.ok) throw Error('API error');
    if (!res.success) throw Error('Subscription failed');
    return { 
      success: res.success,
      subscribed: res.subscribed,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      subscribed: previousState.subscribed,
    }
  }

}

export { subscribeToChannel };