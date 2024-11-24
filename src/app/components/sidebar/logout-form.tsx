"use client";
import { logout } from "@/auth";
import { useRouter } from "next/navigation";

const LogoutForm: React.FC = () => {
  const router = useRouter();
  return (
  <form action={logout}>
    <button 
      className="w-full text-sm flex flex-row gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground dark:hover:bg-[#FF0E48]"
      onClick={() => {setTimeout(() => router.refresh(), 500)}}
    >
      <LogOutIcon className="h-5 w-5" />
      <span className="text-sm font-medium sm:block">Logout</span>
    </button>
  </form>
  )
}

export default LogoutForm;

function LogOutIcon(props: React.SVGAttributes<SVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  )
}
