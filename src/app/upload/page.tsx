"use client";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { useState } from "react";

const Upload: React.FC = ()  => {

  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <div className="w-full max-w-3xl mx-auto py-12 px-4 md:px-6">
      <div className="grid gap-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <Button size="lg" className="w-full max-w-md">
            <UploadIcon className="mr-2 h-5 w-5" />
            Upload Video
          </Button>
          <input type="file" className="sr-only" />
        </div>
          <div className="rounded-lg overflow-hidden aspect-video">
            <video className="w-full h-full object-cover" controls poster="/placeholder.svg">
              <source
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                type="video/mp4"
              />
            </video>
          </div>

          <div className="grid gap-2">
            <Input placeholder="Video Title" />
            <Textarea placeholder="Video Description" rows={3} />
            <Input placeholder="Tags (separated by commas)" />
          </div>
        
        <Button type="submit" size="lg" className="w-full max-w-md">
          Submit
        </Button>
      </div>
    </div>
  )
}

export default Upload ;

const UploadIcon = (props: React.SVGAttributes<SVGElement>) => {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}


function XIcon(props: React.SVGAttributes<SVGElement>) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}