"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import MessageBox from "../components/message-box";

const MessageButton: React.FC<{
  recipient: any,
}> = ({ recipient }) => {

  const [showMessageBox, setShowMessageBox] = useState(false);

  const handleClick = () => {
    setShowMessageBox(true);
  }

  return (
    <>
      <Button variant="red" onClick={handleClick}>Message</Button>
      {showMessageBox && <MessageBox recipient={recipient} />}
    </>
  )
}

export default MessageButton;