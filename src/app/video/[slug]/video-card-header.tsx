"use client";
/* COMPONENTS */
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
/* REACT */
import { useState } from "react";
/* UTILS */
import { cn } from "@/lib/utils";
import { updateVideo } from "../actions";
/* TYPES */
import { CompactVideo } from "../types";

const VideoCardHeader: React.FC<{
  video: CompactVideo,
  isVideoAuthor: boolean,
}> = ({ video, isVideoAuthor }) => {

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(video.title);
  const [description, setDescription] = useState<string | null>(video.description);

  return (
    <CardHeader>
      <form action={(formData: FormData) => updateVideo(formData, video)}>
        <CardTitle className="flex flex-row justify-between gap-3">
            <Input 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              name="title" 
              className={cn(isEditing ? 'mb-3' : 'hidden')}
            />
          <span className={cn(isEditing ? 'hidden' : '')}>{title}</span>
          {isVideoAuthor && (
            <Button 
              type={isEditing ? 'button' : 'submit'}
              onClick={() => setIsEditing(prevValue => !prevValue)}
              variant="red" 
            >
              {isEditing ? 'Save' : 'Edit'}
            </Button>
          )}
        </CardTitle>
        <CardDescription>
            <Textarea
              value={description ? description : ''}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={description ? '' : 'Video description...'} 
              name="description" 
              className={cn(isEditing ? '' : 'hidden')}
            />
            <span className={cn(isEditing ? 'hidden' : '')}>{description}</span>
        </CardDescription>
      </form>
    </CardHeader>
  );
};

export default VideoCardHeader;