import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { Image, Video, Link as LinkIcon, Eye, EyeOff } from "lucide-react";

import { CarFormData } from "../../../../lib/validations/car";

export default function FinalizeStep() {
  const { watch, setValue } = useFormContext<CarFormData>();
  const { make, model, year, title, status, description, mods, mediaUrls, youtubeUrls, isPublic, mainImageUrl } = watch();
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mb-4">Review & Publish</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Preview panel */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 order-2 md:order-1">
          <h3 className="text-lg font-medium mb-3">Preview</h3>
          
          {/* Main image */}
          {mainImageUrl ? (
            <div 
              className="w-full h-48 rounded-md bg-center bg-cover mb-4"
              style={{ backgroundImage: `url(${mainImageUrl})` }}
            />
          ) : (
            <div className="w-full h-48 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4">
              <Image className="text-gray-400" size={32} />
              <span className="text-gray-400 ml-2">No main image selected</span>
            </div>
          )}
          
          {/* Basic details */}
          <h4 className="text-xl font-medium">{title || "Untitled Car"}</h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {year} {make} {model}
          </p>
          
          {status && (
            <span className="inline-block mt-1 px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
              {status}
            </span>
          )}
          
          {description && (
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}
          
          {/* Media count */}
          <div className="flex items-center mt-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center mr-4">
              <Image size={16} className="mr-1" />
              <span>{mediaUrls.length} photos</span>
            </div>
            <div className="flex items-center">
              <Video size={16} className="mr-1" />
              <span>{youtubeUrls.length} videos</span>
            </div>
          </div>
          
          {/* Mods summary */}
          {mods.length > 0 && (
            <div className="mt-4">
              <h5 className="text-sm font-medium mb-2">Modifications ({mods.length})</h5>
              <div className="space-y-1">
                {mods.slice(0, 3).map((mod, index) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <span className="text-gray-700 dark:text-gray-300">
                      {mod.name || "Unnamed mod"}
                    </span>
                    {mod.productLink && (
                      <LinkIcon size={12} className="text-blue-500" />
                    )}
                  </div>
                ))}
                {mods.length > 3 && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    +{mods.length - 3} more modifications
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Settings panel */}
        <div className="order-1 md:order-2">
          <h3 className="text-lg font-medium mb-4">Publishing Options</h3>
          
          {/* Visibility */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">Visibility</h4>
            <div className="flex space-x-4">
              <label className={`
                flex items-center p-3 rounded-md cursor-pointer transition
                ${isPublic 
                  ? 'bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-500' 
                  : 'bg-gray-100 dark:bg-gray-800 border-2 border-transparent'
                }
              `}>
                <input
                  type="radio"
                  checked={isPublic}
                  onChange={() => setValue("isPublic", true)}
                  className="sr-only"
                />
                <Eye 
                  size={18} 
                  className={isPublic ? 'text-primary-500' : 'text-gray-500 dark:text-gray-400'} 
                />
                <div className="ml-2">
                  <div className={`text-sm font-medium ${isPublic ? 'text-primary-500' : ''}`}>Public</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Visible to everyone on your profile
                  </div>
                </div>
              </label>
              
              <label className={`
                flex items-center p-3 rounded-md cursor-pointer transition
                ${!isPublic 
                  ? 'bg-gray-50 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700' 
                  : 'bg-gray-100 dark:bg-gray-800 border-2 border-transparent'
                }
              `}>
                <input
                  type="radio"
                  checked={!isPublic}
                  onChange={() => setValue("isPublic", false)}
                  className="sr-only"
                />
                <EyeOff 
                  size={18} 
                  className="text-gray-500 dark:text-gray-400" 
                />
                <div className="ml-2">
                  <div className="text-sm font-medium">Private</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Only visible to you
                  </div>
                </div>
              </label>
            </div>
          </div>
          
          {/* Summary list */}
          <div>
            <h4 className="text-sm font-medium mb-2">Your Build Summary</h4>
            
            <ul className="bg-gray-50 dark:bg-gray-800 rounded-md p-4 space-y-3">
              <li className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Make & Model</span>
                <span className="font-medium text-right">{make} {model}</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Year</span>
                <span className="font-medium">{year}</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Title/Nickname</span>
                <span className="font-medium">{title || "—"}</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Status</span>
                <span className="font-medium">{status}</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Media</span>
                <span className="font-medium">{mediaUrls.length} photos, {youtubeUrls.length} videos</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Modifications</span>
                <span className="font-medium">{mods.length} items</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Visibility</span>
                <span className="font-medium">{isPublic ? "Public" : "Private"}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md text-blue-800 dark:text-blue-200"
      >
        <h4 className="font-medium mb-1">Ready to publish your car!</h4>
        <p className="text-sm">
          Review the details above, then click "Save Car" to publish your build.
        </p>
      </motion.div>
    </div>
  );
}
