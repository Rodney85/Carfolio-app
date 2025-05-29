import { useState, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Image, Video, Loader2, ExternalLink } from "lucide-react";
import { useAction } from "convex/react";

import { api } from "../../../../../convex/_generated/api";
import { CarFormData } from "../../../../lib/validations/car";

// Helper to convert bytes to readable format
function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}

// Image preview with upload control
interface MediaPreviewProps {
  url: string;
  type: "image" | "video";
  onRemove: () => void;
  onSetAsMain: () => void;
  isMain: boolean;
}

function MediaPreview({ url, type, onRemove, onSetAsMain, isMain }: MediaPreviewProps) {
  return (
    <div className="relative group rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Media content */}
      {type === "image" ? (
        <div 
          className="h-40 bg-center bg-cover"
          style={{ backgroundImage: `url(${url})` }}
        />
      ) : (
        <div className="h-40 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <Video className="text-gray-400" size={32} />
        </div>
      )}
      
      {/* Controls overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={onRemove}
            className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
            title="Remove"
          >
            <X size={16} />
          </button>
          
          {type === "image" && !isMain && (
            <button
              type="button"
              onClick={onSetAsMain}
              className="p-1 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition"
              title="Set as main image"
            >
              <Image size={16} />
            </button>
          )}
        </div>
      </div>
      
      {/* Main indicator */}
      {isMain && (
        <div className="absolute top-2 left-2 bg-primary-500 text-white text-xs py-1 px-2 rounded">
          Main Image
        </div>
      )}
    </div>
  );
}

// YouTube preview with remove control
interface YouTubePreviewProps {
  url: string;
  onRemove: () => void;
}

function YouTubePreview({ url, onRemove }: YouTubePreviewProps) {
  // Extract video ID from YouTube URL
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  
  const videoId = getYouTubeId(url);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : '';
  
  return (
    <div className="relative group rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Thumbnail */}
      <div 
        className="h-40 bg-center bg-cover flex items-center justify-center relative"
        style={{ backgroundImage: `url(${thumbnailUrl})` }}
      >
        {!thumbnailUrl && (
          <div className="bg-gray-100 dark:bg-gray-800 absolute inset-0 flex items-center justify-center">
            <Video className="text-gray-400" size={32} />
          </div>
        )}
        
        {/* YouTube icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
          <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
            <div className="w-0 h-0 border-t-6 border-t-transparent border-l-10 border-l-white border-b-6 border-b-transparent ml-1"></div>
          </div>
        </div>
      </div>
      
      {/* YouTube label */}
      <div className="absolute bottom-0 left-0 right-0 py-1 px-2 text-xs bg-black bg-opacity-70 text-white flex items-center justify-between">
        <span>YouTube</span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-primary-300"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink size={12} />
        </a>
      </div>
      
      {/* Controls overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
        <button
          type="button"
          onClick={onRemove}
          className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
          title="Remove"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

// File upload status component
interface UploadProgressProps {
  fileName: string;
  progress: number;
  size: number;
}

function UploadProgress({ fileName, progress, size }: UploadProgressProps) {
  return (
    <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Loader2 className="animate-spin mr-2 text-primary-500" size={16} />
          <span className="text-sm truncate max-w-[200px]">{fileName}</span>
        </div>
        <span className="text-xs text-gray-500">{formatBytes(size)}</span>
      </div>
      
      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary-500 transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-xs text-gray-500 mt-1">{progress.toFixed(0)}%</span>
    </div>
  );
}

export default function MediaStep() {
  const { setValue, watch, formState: { errors } } = useFormContext<CarFormData>();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [mainImageUrl, mediaUrls, youtubeUrls] = watch(["mainImageUrl", "mediaUrls", "youtubeUrls"]);
  
  // Access the media generation API action
  const generateUploadUrl = useAction(api.media.generateUploadUrl);
  const [youtubeInput, setYoutubeInput] = useState("");
  
  // Handle file uploads
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    setUploading(true);
    const fileIds = acceptedFiles.map(file => file.name + file.size); // Simple ID for progress tracking
    
    // Initialize progress for each file
    const initialProgress: Record<string, number> = {};
    fileIds.forEach(id => {
      initialProgress[id] = 0;
    });
    setUploadProgress(initialProgress);
    
    try {
      // Process files sequentially
      const newMediaUrls = [...mediaUrls];
      
      for (const file of acceptedFiles) {
        const fileId = file.name + file.size;
        
        // Use a temporary car ID for development purposes
        // In a production app, this would be the actual car ID
        const tempCarId = "cars:temporary";
        
        // Setup progress tracking
        let progress = 0;
        const interval = setInterval(() => {
          progress += 5;
          setUploadProgress(prev => ({
            ...prev,
            [fileId]: Math.min(progress, 99), // Keep at 99% until complete
          }));
          
          if (progress >= 100) {
            clearInterval(interval);
          }
        }, 100);
        
        try {
          // Generate upload URL from Backblaze
          const response = await generateUploadUrl({
            carId: tempCarId as any, // Using 'as any' to bypass TypeScript errors
            fileName: file.name,
            fileType: file.type,
          });
          
          if (!response || !response.uploadUrl) {
            throw new Error("Failed to get upload URL");
          }
          
          // Upload the file to Backblaze
          const formData = new FormData();
          
          // Add all required fields for Backblaze B2
          if (response && response.fields) {
            Object.entries(response.fields).forEach(([key, value]) => {
              // Ensure value is a string to satisfy type requirements
              formData.append(key, String(value));
            });
          }
          
          // Add the file as the last field
          formData.append('file', file);
          
          // Upload to Backblaze
          const uploadResponse = await fetch(response.uploadUrl, {
            method: 'POST',
            body: formData,
          });
          
          if (!uploadResponse.ok) {
            throw new Error(`Upload failed: ${uploadResponse.statusText}`);
          }
          
          // Get the uploaded file URL
          const uploadedUrl = response.fileUrl || `https://example.com/${Date.now()}-${file.name}`;
          newMediaUrls.push(uploadedUrl);
          
          // Complete progress
          setUploadProgress(prev => ({
            ...prev,
            [fileId]: 100,
          }));
          
          // Set the first uploaded image as the main image if not already set
          if (!mainImageUrl && newMediaUrls.length === 1) {
            setValue("mainImageUrl", uploadedUrl);
          }
        } catch (uploadError) {
          console.error("Error in file upload:", uploadError);
          // Show a partial progress to indicate failure
          setUploadProgress(prev => ({
            ...prev,
            [fileId]: -1, // Use negative value to indicate error
          }));
        } finally {
          // Clear interval
          clearInterval(interval);
        }
      }
      
      // Update form values
      setValue("mediaUrls", newMediaUrls);
      
      // Clear progress after a delay
      setTimeout(() => {
        setUploadProgress({});
        setUploading(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error uploading files:", error);
      setUploading(false);
    }
  }, [generateUploadUrl, setValue, mainImageUrl, mediaUrls]);
  
  // Setup dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'video/*': ['.mp4', '.webm', '.mov']
    },
    disabled: uploading,
  });
  
  // Add YouTube URL
  const addYoutubeUrl = () => {
    if (!youtubeInput) return;
    
    // Simple validation for YouTube URLs
    const isYoutubeUrl = youtubeInput.includes('youtube.com') || youtubeInput.includes('youtu.be');
    if (!isYoutubeUrl) {
      alert('Please enter a valid YouTube URL');
      return;
    }
    
    setValue("youtubeUrls", [...youtubeUrls, youtubeInput]);
    setYoutubeInput("");
  };
  
  // Remove media
  const removeMedia = (index: number) => {
    const newMediaUrls = [...mediaUrls];
    const removedUrl = newMediaUrls.splice(index, 1)[0];
    
    // If we're removing the main image, set a new one or clear it
    if (mainImageUrl === removedUrl) {
      setValue("mainImageUrl", newMediaUrls.length > 0 ? newMediaUrls[0] : "");
    }
    
    setValue("mediaUrls", newMediaUrls);
  };
  
  // Set as main image
  const setAsMainImage = (url: string) => {
    setValue("mainImageUrl", url);
  };
  
  // Remove YouTube URL
  const removeYoutubeUrl = (index: number) => {
    const newYoutubeUrls = [...youtubeUrls];
    newYoutubeUrls.splice(index, 1);
    setValue("youtubeUrls", newYoutubeUrls);
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mb-4">Media Gallery</h2>
      
      {/* File dropzone */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors
          ${isDragActive 
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
            : 'border-gray-300 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-600'
          }
          ${uploading ? 'opacity-50 pointer-events-none' : ''}
        `}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto text-gray-400 mb-2" size={32} />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {isDragActive
            ? "Drop your images or videos here"
            : "Drag & drop photos or videos here, or click to browse"}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Supported formats: JPEG, PNG, GIF, MP4, WEBM, MOV
        </p>
      </div>
      
      {/* Upload progress */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="my-4">
          <h3 className="text-sm font-medium mb-2">Uploading files...</h3>
          {Object.entries(uploadProgress).map(([fileId, progress]) => (
            <UploadProgress
              key={fileId}
              fileName={fileId.replace(/\d+$/, '')} // Extract filename part
              progress={progress}
              size={100000} // Placeholder size
            />
          ))}
        </div>
      )}
      
      {/* YouTube URL input */}
      <div>
        <label className="block text-sm font-medium mb-2">
          YouTube Videos (Optional)
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={youtubeInput}
            onChange={e => setYoutubeInput(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
            className="flex-grow rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addYoutubeUrl();
              }
            }}
          />
          <button
            type="button"
            onClick={addYoutubeUrl}
            className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md transition"
            disabled={!youtubeInput}
          >
            Add
          </button>
        </div>
      </div>
      
      {/* Media gallery */}
      <div>
        <h3 className="text-sm font-medium mb-2">Media Gallery</h3>
        
        {mediaUrls.length === 0 && youtubeUrls.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-gray-300 dark:border-gray-700 rounded-md">
            <p className="text-gray-500 dark:text-gray-400">
              No media added yet. Upload images or add YouTube videos.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {/* Images */}
            <AnimatePresence>
              {mediaUrls.map((url, index) => (
                <motion.div
                  key={`media-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <MediaPreview
                    url={url}
                    type="image" // For now, all uploads are treated as images
                    onRemove={() => removeMedia(index)}
                    onSetAsMain={() => setAsMainImage(url)}
                    isMain={mainImageUrl === url}
                  />
                </motion.div>
              ))}
              
              {/* YouTube videos */}
              {youtubeUrls.map((url, index) => (
                <motion.div
                  key={`youtube-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <YouTubePreview
                    url={url}
                    onRemove={() => removeYoutubeUrl(index)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
        
        {errors.mediaUrls && (
          <p className="text-red-500 text-xs mt-1">{errors.mediaUrls.message}</p>
        )}
      </div>
    </div>
  );
}
