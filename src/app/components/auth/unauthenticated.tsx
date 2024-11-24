import { UserSession } from "@/types";

const Unauthenticated: React.FC<{
  children: React.ReactNode,
  session: UserSession | undefined,
}> = ({ children, session }) => {

  if (!session) return <>{children}</>;
  return null;
};

export default Unauthenticated;