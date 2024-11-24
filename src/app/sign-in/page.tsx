"use client";
import { useActionState, useEffect, useState } from "react";
import { signInAction } from "./actions";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Alert from "../components/alert";

const SignInPage = () => {

  const [data, action] = useActionState(signInAction, {
    errors: {},
    success: false,
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hasRefreshed, setHasRefreshed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (data.success && !hasRefreshed) {
      router.refresh();
      setHasRefreshed(true);
    }
  }, [data.success, hasRefreshed, router])

  return (
    <div className="w-[600px] border dark:border-none rounded-lg shadow-lg p-3 mx-auto grid grid-cols-1 gap-4">
      <div className="font-bold text-3xl">
        Sign In
      </div>
      <form className="flex flex-col gap-3 *:flex *:flex-col *:gap-1" action={action}>
        <div>
          <Label htmlFor="username" className="font-semibold">Username</Label>
          <Input
            type="text"
            name="username"
            id="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={cn('dark:bg-transparent dark:ring-0', data.errors.username ? 'dark:border-[#FF0E48]' : 'dark:border-gray-600')}
          />
          {data.errors.username && (
            <Alert type="error" className="dark:text-[#FF0E48] dark:text-sm">
              {data.errors.username}
            </Alert>
          )}
        </div>
        <div>
          <Label htmlFor="password" className="font-semibold">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={cn('dark:bg-transparent dark:ring-0', data.errors.password ? 'dark:border-[#FF0E48]' : 'dark:border-gray-600 ')}
          />
          {data.errors.password && (
            <Alert type="error" className="dark:text-[#FF0E48] dark:text-sm">
              {data.errors.password}
            </Alert>
          )}
        </div>
        <div>
          <Button type="submit" variant="red">
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;