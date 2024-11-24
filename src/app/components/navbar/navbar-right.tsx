import { Button } from "@/components/ui/button";
import Link from "next/link";
import Unauthenticated from "../auth/unauthenticated";
import Authenticated from "../auth/authenticated";
import { useSession } from "@/app/session-context";
import UserInfo from "./user-info";
import Image from "next/image";

const NavBarRight: React.FC = () => {
  const {session, isLoading} = useSession();

  if (isLoading) return <Image src="/images/Loader.svg" height={40} width={40} alt="" />;

  return (
    <div className="flex flex-row gap-2 items-center">

      <Authenticated session={session}>
        {(user) => (
          <UserInfo user={user} />
        )}
      </Authenticated>

      <Unauthenticated session={session}>
        <Button asChild variant="red">
          <Link href="/sign-up">Sign Up</Link>
        </Button>
        <Button asChild variant="red">
          <Link href="/sign-in">Sign In</Link>
        </Button>
      </Unauthenticated>

    </div>
  );
};

export default NavBarRight;