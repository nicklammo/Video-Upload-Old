import { v4 as uuidv4 } from "uuid";

interface UploadParams {
  file: File;
  onProgress: (percentage: number) => void;
  onSuccess?: (videoId: number) => void;
  onError?: (error: string) => void;
}

const uploadVideoFile = async({file, onProgress, onSuccess, onError}: UploadParams): Promise<void> => {
  const chunkSize = (1 * 1024 * 1024);
  const chunkCount = Math.ceil(file.size / chunkSize);

  const fileChunks = [];
  const sessionId = uuidv4();

  for (let i = 0; i < chunkCount; i++) {
    const chunkStart = i * chunkSize;
    const chunkEnd = Math.min(file.size, chunkStart + chunkSize);
    const chunk = file.slice(chunkStart, chunkEnd);
    fileChunks.push(chunk);
  }

  let response: {message: string, videoId?: number, success: boolean} = {message: '', success: false};

  for (let i = 0; i < fileChunks.length; i++) {

    const progressPercentage = ((i + 1) / chunkCount);

    await new Promise(resolve => {
      setTimeout(() => {
        resolve(onProgress(progressPercentage));
      }, 50);
    });

    const formData = new FormData();
    formData.append('chunk', fileChunks[i], file.name);
    formData.append('chunkNumber', (i + 1).toString());
    formData.append('totalChunks', chunkCount.toString());
    formData.append('totalSize', file.size.toString());
    formData.append('sessionId', sessionId);

    try {
      const res = await fetch('http://localhost:3000/api/video/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      console.log(data);
      if (data.message) response = data;
      if (!data.success) {
        break;
      }
    } catch (e) {
      console.error(e);
    }
  }
  console.log(response.message);
  if (response.success && response.videoId) {
    onSuccess && onSuccess(response.videoId);
  }
  if (!response.success) {
    onError && onError(response.message);
  }
}

const checkIfMP4 = (file: File): Promise<boolean> => {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const uint8Array = new Uint8Array(e.target?.result as ArrayBuffer);
      const isMP4 = uint8Array.length >= 12 && 
        uint8Array[4] === 102 && 
        uint8Array[5] === 116 && 
        uint8Array[6] === 121 && 
        uint8Array[7] === 112; 
      resolve(isMP4);
    };
    reader.onerror = () => resolve(false);
    reader.readAsArrayBuffer(file.slice(0, 12));
  });
}

type UploadState = {
  file?: File;
  thumbnail?: Blob;
  isUploading: boolean;
  uploadProgress: number;
  hasUploaded: boolean;
  hasError: boolean;
  errorMessage?: string;
};

type UploadAction =
  | { type: 'startUploading' }
  | { type: 'progress', progress: number }
  | { type: 'uploadSuccess' }
  | { type: 'uploadError', message: string }

const uploadVideoReducer = (state: UploadState, action: UploadAction): UploadState => {
  switch (action.type) {
    case 'startUploading':
      return { ...state, isUploading: true, hasError: false, errorMessage: undefined };
    case 'progress':
      return { ...state, uploadProgress: action.progress };
    case 'uploadSuccess':
      return { ...state, isUploading: false, hasUploaded: true, hasError: false, errorMessage: undefined };
    case 'uploadError':
      return { ...state, isUploading: false, hasError: true, errorMessage: action.message };
    default:
      return state;
  }
}

export { uploadVideoFile, uploadVideoReducer, type UploadState, checkIfMP4 };