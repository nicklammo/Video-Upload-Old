import type { User } from "@/types"
import Avatar from "../user/avatar";

const UserInfo: React.FC<{
  user: User | undefined,
}> = ({ user }) => {

  if (!user) return null;

  return (
    <div className="flex flex-row gap-3 items-center">
      <span className="font-semibold">{user.username}</span>
      <Avatar user={user} width={40} height={40} />
    </div>
  );
};

export default UserInfo;