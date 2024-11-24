import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/auth";
import { ChannelSession, UserSession } from "@/types";
import prisma from "@/app/db/prisma";
import { z } from "zod";

async function userIsSubscribedToChannel(subscriberId: number, subscribedToId: number) {
  const subscription = await prisma.subscription.findFirst({
    where: {
      subscriberId: subscriberId,
      subscribedToId: subscribedToId,
    }
  });

  if (subscription) return true;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const parsed = await decrypt(data.sessionToken) as UserSession;
    const subscriberId = z.number().parse(parsed.user.id);
    const subscribedToId = z.number().parse(data.channelId);
    const isSubscribed = await userIsSubscribedToChannel(subscriberId, subscribedToId);
    let newSubscriptionStatus;

    if (isSubscribed) {
      const subscription = await prisma.subscription.findFirstOrThrow({
        where: {
          subscriberId: subscriberId,
          subscribedToId: subscribedToId,
        }
      });
      if (subscription) {
        await prisma.subscription.delete({
          where: {
            id: subscription.id,
          }
        });
        newSubscriptionStatus = false;
      }
    } else {
      const subscription = await prisma.subscription.create({
        data: {
          subscriberId: subscriberId,
          subscribedToId: subscribedToId,
        }
      });
      if (!subscription) throw Error('Failed to create subscription');
      newSubscriptionStatus = true;
    }

    return NextResponse.json({ success: true, subscribed: newSubscriptionStatus });
    
  } catch (e) {
    if(e instanceof Error) {
      console.log('ERROR: ' + e.message);
    }
    return NextResponse.json({success: false});
  }
}