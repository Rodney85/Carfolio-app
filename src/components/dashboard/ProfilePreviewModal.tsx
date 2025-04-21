import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { fadeIn } from "../../lib/animations";

interface ProfilePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfilePreviewModal: React.FC<ProfilePreviewModalProps> = ({ isOpen, onClose }) => {
  const { user } = useUser();
  
  if (!user) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Modal Content */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="bg-light-300 dark:bg-dark-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-800">
              <div className="flex items-center gap-2">
                <Eye size={18} className="text-primary-500" />
                <h3 className="font-bold text-lg">Profile Preview</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-dark-800 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Preview Content */}
            <div className="p-4">
              {/* Profile Header */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-dark-800 mb-4">
                  {user.imageUrl && (
                    <img 
                      src={user.imageUrl} 
                      alt={user.fullName || "User"} 
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <h1 className="text-2xl font-bold mb-1">{user.fullName}</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">@{user.username || user.id?.substring(0, 8)}</p>
                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm">
                    Car Enthusiast
                  </span>
                </div>
              </div>
              
              {/* No Cars State */}
              <div className="text-center py-8 border border-dashed border-gray-300 dark:border-dark-600 rounded-lg mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-200 dark:bg-dark-700 flex items-center justify-center">
                  <span className="text-gray-500 text-3xl">🚗</span>
                </div>
                <h3 className="text-lg font-medium mb-2">No cars to display</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-md mx-auto">
                  This is how visitors will see your profile when you haven't added any cars yet.
                </p>
              </div>
              
              {/* Preview Footer */}
              <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
                <p>This is a preview of how visitors will see your public profile.</p>
                <p className="mt-2">Add cars and mods to make your profile more interesting!</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfilePreviewModal;
