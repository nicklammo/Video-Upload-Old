"use client";
import { useActionState } from "react";
import { subscribeToChannel } from "./actions";
import type { ChannelData, SubscribeToChannelState } from "./types";

const SubscribeButton: React.FC<Readonly<{
  channelData: Pick<ChannelData, 'id' | 'username'>,
  isSubscribed: boolean,
}>> = ({ channelData, isSubscribed }) => {

  const [subStatus, action, isPending] = useActionState(
    (previousState: SubscribeToChannelState) => 
      subscribeToChannel(previousState, channelData), 
    {
      success: false,
      subscribed: isSubscribed,
    }
  );
  
  return (
    <form action={action}>
      <button 
        type="submit" 
        className={`${isPending ? 'bg-gray-500 dark:bg-[#FF0E48] dark:bg-opacity-50' : 'bg-blue-500 dark:bg-[#FF0E48]'} hover:bg-blue-400 px-4 py-2 rounded text-white font-semibold `}
        disabled={isPending} 
      >
        {subStatus.subscribed ? 'Unsubscribe' : 'Subscribe'}
      </button>
    </form>
  );
};

export default SubscribeButton;