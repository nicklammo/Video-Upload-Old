"use server";
/* COMPONENTS */
import Header from "../layout/header";
import Videos from "../layout/videos";
/* UTILITIES */
import { getChannelData } from "../utils";
import { getSession } from "@/auth";
/* THIRD PARTY */
import { notFound } from "next/navigation";

const ChannelPage: React.FC<{
  params: {
    slug: string,
  }
}> = async({ params }) => {

  const channel = await getChannelData(params.slug);
  if (!channel) return notFound();
  const session = await getSession();

  if (channel) return (
    <div className="container mx-auto">
      <Header channel={channel} session={session} />
      <Videos videos={channel.videos} />
    </div>
  );
}

export default ChannelPage;