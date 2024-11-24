"use client";
import { useReducer } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadIcon } from "../components/icons/upload-icon";
import Dropzone from "react-dropzone";
import ErrorIcon from "../components/icons/error-icon";
import { checkIfMP4, uploadVideoFile, uploadVideoReducer } from "./client-utils";
import type { UploadState } from "./client-utils";
import { useRouter } from "next/navigation";
import SuccessIcon from "../components/icons/success-icon";

const UploadVideo: React.FC = () => {

  const initialUploadState: UploadState = {
    isUploading: false,
    uploadProgress: 0,
    hasUploaded: false,
    hasError: false,
    errorMessage: undefined,
  };

  const [upload, dispatch] = useReducer(uploadVideoReducer, initialUploadState);
  const router = useRouter();

  const handleOnDrop = async(acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const isValidMP4 = await checkIfMP4(file);
    if (isValidMP4) {
      dispatch({ type: 'startUploading' });
      await uploadVideoFile({
        file: file, 
        onProgress: (percentage) => {
          dispatch({ type: 'progress', progress: percentage });
      }, onSuccess: (videoId) => {
        dispatch({ type: 'uploadSuccess' });
        router.prefetch(`/video/${videoId}`);
        setTimeout(() => {
          router.push(`/video/${videoId}`);
        }, 1000);
      }, onError: (error) => {
        dispatch({ type: 'uploadError', message: error });
      }});
    } else {
      dispatch({ type: 'uploadError', message: 'Only MP4 files are supported' });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload a video</CardTitle>
        <CardDescription>Share your work with the community</CardDescription>
      </CardHeader>
      <CardContent>
          <Dropzone onDrop={acceptedFiles => handleOnDrop(acceptedFiles)} disabled={upload.isUploading}>
            {({getRootProps, getInputProps}) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="group relative flex h-48 items-center justify-center rounded-lg border-2 border-dashed border-muted dark:border-gray-600 dark:hover:border-gray-400 transition-colors hover:border-primary">
                  <div className="text-center space-y-1 px-4">
                    {upload.hasUploaded ? (
                      <section>
                        <SuccessIcon className="mx-auto h-8 w-8 text-muted-foreground" />
                        <p className="text-sm font-medium text-muted-foreground">Upload successful</p>
                      </section>
                    ) : upload.isUploading ? (
                      <section>
                        <UploadIcon className="mx-auto h-8 w-8 text-muted-foreground" />
                        <p className="text-sm font-medium text-muted-foreground">Uploading...</p>
                        <progress value={upload.uploadProgress} />
                      </section>
                    ) : upload.hasError ? (
                      <section>
                        <ErrorIcon className="mx-auto h-8 w-8 text-muted-foreground" />
                        <p className="text-sm font-medium text-muted-foreground">{upload.errorMessage}</p>
                      </section>
                    ) : (
                      <section>
                        <UploadIcon className="mx-auto h-8 w-8 text-muted-foreground" />
                        <p className="text-sm font-medium text-muted-foreground">Drop your MP4 video or click here</p>
                      </section>
                    )}
                  </div>
                </div>
              </div>
            )}
          </Dropzone>
      </CardContent>
    </Card>
  );
};

export default UploadVideo;