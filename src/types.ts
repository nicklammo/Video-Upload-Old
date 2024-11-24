import { JWTPayload } from "jose";
import { User as PrismaUser } from "@prisma/client";

export type User = Pick<PrismaUser, 'id' | 'email' | 'username' | 'avatar'>;

export interface UserSession extends JWTPayload {
  user: User,
}

export interface ChannelSession extends JWTPayload {
  channel: {
    owner: string;
  }
}