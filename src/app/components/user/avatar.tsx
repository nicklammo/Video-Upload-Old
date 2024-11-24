import type { User } from "@/types";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Avatar: React.FC<Readonly<{
  user: Pick<User, 'username' | 'avatar'> | User,
  width: number,
  height: number,
  className?: string,
}>> = ({
  user,
  width,
  height,
  className,
}) => {
  return (
    <>
      {user.avatar ? (
        <Image 
          src={user.avatar} 
          width={width} height={height} 
          alt={`${user.username}'s avatar`} 
          className="rounded-full" 
        />
      ) : (
        <div 
          style={{ width: width, height: height }}
          className="bg-red-500 rounded-full flex justify-center items-center"
        >
          <span className={cn(className + ' text-white font-semibold leading-none')}>{user.username.charAt(0).toUpperCase()}</span>
        </div>
      )}
    </>
  );
};

export default Avatar;