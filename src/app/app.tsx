"use client";
import { SessionProvider } from "./session-context";
import NavBar from "./components/navbar/navbar";
import { UserSession } from "@/types";
import { Sidebar } from "./components/sidebar/sidebar";

const App: React.FC<{
  session: UserSession | undefined,
  children: React.ReactNode,
}> = ({ session, children }) => {
  return (
    <SessionProvider serverSession={session}>
      <NavBar />
      <main className="my-3">
        <Sidebar />
        <div className="pl-64 w-full absolute">
        {children}
        </div>
      </main>         
    </SessionProvider>
  );
};

export default App;