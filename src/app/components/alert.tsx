import React from "react";
import { cn } from "@/lib/utils";

interface Alert extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode,
  type: 'error' | 'success',
}

const Alert: React.FC<Alert> = ({ children, type, className, ...props }): React.ReactElement => {
  let svg;
  if (type === 'error') {
    svg = (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
        <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd"></path>
      </svg>
    );
  }
  else if (type === 'success') {
    svg = (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
        <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z" clipRule="evenodd" />
      </svg>
    );
  }
  return (
  <div className={cn(className, 'flex flex-row items-center gap-1')} {...props} >
    {svg}
    {children}
  </div>
  );
};

export default Alert;