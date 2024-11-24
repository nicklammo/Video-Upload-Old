"use client";
import { createContext, ReactNode, useState, useContext, useEffect } from "react";
import { UserSession } from "@/types";

const SessionContext = createContext({
   session: undefined as UserSession | undefined, 
   isLoading: true,
  });

const SessionProvider: React.FC<{
  serverSession: UserSession | undefined,
  children: ReactNode,
}> = ({ serverSession, children }) => {
  const [session, setSession] = useState<UserSession | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    setSession(serverSession);
    setIsLoading(false);
  }, [serverSession]);


  return (
    <SessionContext.Provider value={{session, isLoading}}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);

export { SessionProvider, useContext };