import { User, UserSession } from "@/types";

const Authenticated: React.FC<{
  children: (user: User) => React.ReactNode,
  session: UserSession | undefined,
}> = ({ children, session }) => {
  if (session) return <>{children(session.user)}</>;
  return null;
};

export default Authenticated;