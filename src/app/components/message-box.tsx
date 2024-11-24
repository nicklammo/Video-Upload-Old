"use client";

import { Input } from "@/components/ui/input";

const MessageBox: React.FC<{
  recipient: any,
}> = ({ recipient }) => {
  return (
    <div className="fixed bottom-0 right-0 dark:bg-white dark:bg-opacity-20 w-[400px]">
      <div>
        {recipient.username}
      </div>
      <form>
        <Input type="text" className="bg-transparent"/>
      </form>
    </div>
  );
};

export default MessageBox;