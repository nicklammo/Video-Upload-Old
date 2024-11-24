"use server";
/* COMPONENTS */
import Authenticated from "@/app/components/auth/authenticated";
import Avatar from "@/app/components/user/avatar";
import SubscribeButton from "../subscribe-button";
/* UTILITIES */
import { isUserSubscribedToChannel } from "../utils";
/* TYPES */
import type { UserSession } from "@/types";
import { ChannelData } from "../types";
import MessageButton from "../message-button";

const Header: React.FC<{
  channel: ChannelData,
  session: UserSession | undefined,
}> = async({ channel, session }) => {

  const isSubscribed = await isUserSubscribedToChannel(channel.subscribers, session?.user.id);

  return (
    <div className="flex flex-row gap-3 bg-gray-100 dark:bg-transparent p-3 rounded-xl">
      <Avatar 
        user={{
          username: channel.username,
          avatar: channel.avatar,
        }} 
        width={100} 
        height={100} 
        className="text-4xl" 
      />
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-semibold leading-none">
          {channel.username}
        </div>
        <div className="flex flex-row gap-3">
          <div>@{channel.username}</div>
          <div>{channel.videos?.length} videos</div>
          <div>{channel.subscribers?.length} subscriber{channel.subscribers?.length !== 1 && 's'}</div>
        </div>
          <Authenticated session={session}>
            {(user) =>
              user.id !== channel.id && (
              <div className="flex flex-row gap-3">
                <SubscribeButton 
                  channelData={{
                    id: channel.id, 
                    username: channel.username,
                  }} 
                  isSubscribed={isSubscribed} 
                />
                <MessageButton recipient={{ id: channel.id, username: channel.username, avatar: channel.avatar }}/>
              </div>
              )
            }
          </Authenticated>
      </div>
    </div>
  );
};

export default Header;
