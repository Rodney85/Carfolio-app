import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from 'convex/react';
import { toast } from 'sonner';
import { Upload, X, Image as ImageIcon, FileVideo } from 'lucide-react';
import { Button } from '../shared/Button';
import { motion, AnimatePresence } from 'framer-motion';

// Create a local Progress component to avoid import errors
const Progress: React.FC<{value: number; className?: string}> = ({ value, className = '' }) => {
  return (
    <div className={`w-full bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700 ${className}`}>
      <div 
        className="bg-primary h-full transition-all duration-300 ease-in-out"
        style={{ width: `${value}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
};

// Try to import from generated files if available, or use fallbacks
// This fallback pattern helps development when Convex server isn't running
let api: any;

// Define a fallback Id type for use when Convex types aren't available
type Id<T extends string> = { __tableName: T };

try {
  // Import the API
  const apiModule = require("../../convex/_generated/api");
  api = apiModule.api;
  
  // No need to redefine Id type - we'll use the fallback for development
  // In production with Convex running, the actual type will be used
} catch (e) {
  // Fallback api definition when Convex types aren't generated
  console.log("Using fallback API definitions - run 'npx convex dev' to generate types");
  api = {
    media: {
      generateUploadUrl: "media:generateUploadUrl",
      saveMedia: "media:saveMedia"
    }
  };
}

interface MediaUploaderProps {
  carId: Id<'cars'>;
  onUploadComplete?: () => void;
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({ 
  carId, 
  onUploadComplete 
}) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadQueue, setUploadQueue] = useState<File[]>([]);

  const generateUploadUrl = useMutation(api.media.generateUploadUrl);
  const saveMedia = useMutation(api.media.saveMedia);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadQueue(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
      'video/*': ['.mp4', '.mov']
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    maxFiles: 10
  });

  const uploadFile = async (file: File) => {
    try {
      setUploading(true);
      
      // Get the file type (image or video)
      const fileType = file.type.startsWith('image/') ? 'image' : 'video';
      
      // Generate a unique filename to prevent collisions
      const timestamp = Date.now();
      const uniqueFileName = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      
      // Get a signed upload URL from Convex
      const uploadInfo = await generateUploadUrl({ 
        carId, 
        fileName: uniqueFileName,
        fileType: file.type
      });
      
      // Upload the file directly to Backblaze B2
      const xhr = new XMLHttpRequest();
      
      // Track upload progress
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setProgress(percentComplete);
        }
      });
      
      // Handle upload completion
      xhr.addEventListener('load', async () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          // Save the media information in Convex
          await saveMedia({
            carId,
            url: uploadInfo.publicUrl,
            type: fileType
          });
          
          toast.success(`${fileType === 'image' ? 'Image' : 'Video'} uploaded successfully`);
          
          // Process next file in queue or finish
          setUploadQueue(prev => {
            const newQueue = [...prev];
            newQueue.shift();
            return newQueue;
          });
        } else {
          toast.error(`Upload failed: ${xhr.statusText}`);
          setUploading(false);
        }
      });
      
      // Handle upload errors
      xhr.addEventListener('error', () => {
        toast.error('Upload failed. Please try again.');
        setUploading(false);
      });
      
      // Start the upload
      xhr.open('PUT', uploadInfo.uploadUrl);
      xhr.setRequestHeader('Authorization', uploadInfo.uploadAuthToken);
      xhr.setRequestHeader('Content-Type', file.type);
      xhr.setRequestHeader('X-Bz-File-Name', encodeURIComponent(uniqueFileName));
      xhr.send(file);
      
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to initiate upload');
      setUploading(false);
    }
  };

  // Process the upload queue
  React.useEffect(() => {
    const processQueue = async () => {
      if (uploadQueue.length > 0 && !uploading) {
        const nextFile = uploadQueue[0];
        await uploadFile(nextFile);
      } else if (uploadQueue.length === 0 && uploading) {
        setUploading(false);
        setProgress(0);
        if (onUploadComplete) {
          onUploadComplete();
        }
      }
    };
    
    processQueue();
  }, [uploadQueue, uploading, onUploadComplete]);

  const cancelUpload = () => {
    setUploadQueue([]);
    setUploading(false);
    setProgress(0);
  };

  return (
    <div className="w-full bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragActive 
            ? 'border-primary bg-primary/5' 
            : 'border-gray-300 dark:border-gray-700 hover:border-primary/50'
        } ${uploading ? 'pointer-events-none opacity-50' : 'cursor-pointer'} bg-gray-50 dark:bg-gray-800`}
      >
        <input {...getInputProps()} disabled={uploading} />
        
        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload className="h-10 w-10 text-gray-400 dark:text-gray-500" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isDragActive
              ? 'Drop the files here...'
              : 'Drag & drop images or videos here, or click to select files'}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Supports JPG, PNG, WEBP, MP4, MOV (max 50MB)
          </p>
        </div>
      </div>

      {/* Upload Progress */}
      <AnimatePresence>
        {uploading && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                {uploadQueue[0]?.type.startsWith('image/') ? (
                  <ImageIcon className="h-4 w-4 mr-2 text-primary" />
                ) : (
                  <FileVideo className="h-4 w-4 mr-2 text-primary" />
                )}
                <span className="text-sm truncate max-w-[200px]">
                  {uploadQueue[0]?.name}
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={cancelUpload}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <Progress value={progress} className="h-2" />
            
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{progress}%</span>
              <span>
                {uploadQueue.length > 1 && `${uploadQueue.length} files in queue`}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
