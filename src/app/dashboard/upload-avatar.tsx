"use client";
import { ChangeEvent, useActionState, useEffect, useRef, useState } from "react";
import { isValidImage } from "./lib";
import { uploadAction } from "./actions";
import Avatar from "@/app/components/user/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { User } from "@/types";
import { UploadIcon } from "../components/icons/upload-icon";
import Image from "next/image";

const UploadAvatar = ({ user }: {user: User}) => {

  const [data, action] = useActionState(uploadAction, {
    success: false,
    errors: new Map(),
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async(e: ChangeEvent<HTMLInputElement>) => {
    setPreviewImage(null);
    if (!e.target.files) return;
    if (e.target.files[0]) {
      const file = e.target.files[0];
      if (await isValidImage(file)) {
        setPreviewImage(URL.createObjectURL(file)); 
        return;
      }
      e.target.value = '';
      return;
    }
  }

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  useEffect(() => {
    if(data.success) {
      setPreviewImage(null);
    }
  }, [data]);

  return (
    <Card>
      <form action={action}>
      <CardHeader>
        <CardTitle>Update your avatar</CardTitle>
        <CardDescription>Valid image types: PNG, JPG, JPEG, WEBP</CardDescription>
      </CardHeader>
      <CardContent className={cn('flex flex-col gap-1')}>
        <div className="flex flex-row gap-4 justify-center *:w-[100px] *:h-[100px] *:rounded-full">
          <Avatar 
            user={user} 
            width={100} 
            height={100} 
            className="text-4xl"
          />
          <div>
            {previewImage ? (
              <img src={previewImage} className="w-full h-full rounded-full" />
            ) : (
              <Image 
                src="/avatars/placeholder-user.jpg" 
                width={100} height={100} 
                alt="New avatar placeholder" 
                className="rounded-full opacity-40"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="image">Upload avatar</Label>
          <Input
            type="file" 
            accept="image/*" 
            name="image" 
            id="image" 
            onChange={(e) => handleFile(e)}
            className="hidden" 
            ref={fileInputRef}
          />
        </div>
      </CardContent>
      <CardFooter>
        {previewImage ? (
          <Button 
            type="submit" 
            className={cn('w-full dark:bg-[#FF0E48] dark:hover:brightness-95 text-white')}
          >
            <UploadIcon className="mr-2 h-5 w-5" />
            Upload
          </Button>
        ) : (
          <Button 
            type="button" 
            className={cn('w-full dark:bg-[#FF0E48] dark:hover:brightness-95 text-white')}
            onClick={handleClick}
          >
            <UploadIcon className="mr-2 h-5 w-5" />
            Choose a file
         </Button>
        )}
      </CardFooter>
      </form>
    </Card>
  );
};

export default UploadAvatar;