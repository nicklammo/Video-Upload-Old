import Image from "next/image";
import type { Video } from "@prisma/client";
import type { User as PrismaUser } from "@prisma/client";

type User = { username: PrismaUser['username']; avatar: PrismaUser['avatar']; videos: Video[]; }

const Avatar: React.FC<{
  user: User,
}> = ({ user }) => {
  return (
    <div>
      {user.avatar ? (
        <Image 
          src={user.avatar} 
          width={100} 
          height={100} 
          alt={`${user.username}'s avatar`} 
          className="rounded-full" 
        />
      ) : (
      <div className="w-[100px] h-[100px] bg-red-500 rounded-full flex justify-center items-center text-4xl font-semibold text-white leading-none">
        {user.username.charAt(0)}
      </div>
      )}
  </div>
  );
};

export default Avatar;