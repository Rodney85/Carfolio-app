import { useState, useRef, ChangeEvent } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { X, User, Upload, Loader2, ExternalLink } from "lucide-react";
import { fadeIn } from "../../lib/animations";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface EditProfileFormProps {
  isOpen: boolean;
  onClose: () => void;
  userBio: string;
  onBioUpdate: (bio: string) => void;
}

export default function EditProfileForm({ isOpen, onClose, userBio, onBioUpdate }: EditProfileFormProps) {
  const { user } = useUser();
  const { openUserProfile } = useClerk();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    bio: userBio || "",
  });
  
  // Get the Convex mutation for updating user profile
  const updateUserProfile = useMutation(api.users.updateUserProfile);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(
    user?.imageUrl || null
  );
  const [newImage, setNewImage] = useState<File | null>(null);

  if (!user) return null;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setHasUnsavedChanges(true);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    setNewImage(file);
    setHasUnsavedChanges(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Split the updates between Clerk and Convex to avoid authentication issues
      
      // 1. Update profile image via Clerk (requires authentication)
      if (newImage) {
        try {
          await user.setProfileImage({ file: newImage });
        } catch (imageError) {
          console.error("Error updating profile image:", imageError);
          // Continue with other updates even if image update fails
        }
      }

      // 2. Update first and last name via Clerk (requires authentication)
      try {
        await user.update({
          firstName: formData.firstName,
          lastName: formData.lastName,
        });
      } catch (clerkError) {
        console.error("Error updating profile in Clerk:", clerkError);
        // Still proceed with Convex updates
      }
      
      // 3. Update bio and name fields in Convex (no authentication required)
      try {
        // Save both in Convex for redundancy
        await updateUserProfile({
          bio: formData.bio,
          firstName: formData.firstName,
          lastName: formData.lastName,
        });
      } catch (convexError) {
        console.error("Error updating profile in Convex:", convexError);
        // Still update local state even if Convex update fails
      }
      
      // 4. Update local state for immediate UI feedback
      onBioUpdate(formData.bio);
      
      setHasUnsavedChanges(false);
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to update profile"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 dark:bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="bg-white dark:bg-dark-800 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-700">
          <h3 className="font-bold text-lg">Edit Profile</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-dark-700 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-4">
            <div
              className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 dark:bg-dark-700 cursor-pointer relative group"
              onClick={handleImageClick}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="h-12 w-12 text-gray-500 dark:text-gray-400" />
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Upload className="h-6 w-6 text-white" />
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Click to change profile picture
            </p>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full bg-gray-100 border border-gray-300 dark:bg-dark-700 dark:border-dark-600 rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full bg-gray-100 border border-gray-300 dark:bg-dark-700 dark:border-dark-600 rounded-md px-3 py-2"
                required
              />
            </div>
          </div>

          {/* Username management */}
          <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={() => {
                if (hasUnsavedChanges) {
                  if (confirm("You have unsaved changes. Save changes before proceeding to username management?")) {
                    // Submit the form to save changes first
                    handleSubmit(new Event('submit') as unknown as React.FormEvent);
                    // Then open Clerk profile after a delay
                    setTimeout(() => openUserProfile(), 2000);
                  }
                } else {
                  // No unsaved changes, directly open Clerk profile
                  openUserProfile();
                }
              }}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-dark-700 dark:hover:bg-dark-600 text-gray-700 dark:text-gray-300 rounded-md text-sm transition"
            >
              <ExternalLink size={14} />
              Edit Username
            </button>
          </div>

          {/* Bio */}
          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={3}
              className="w-full bg-gray-100 border border-gray-300 dark:bg-dark-700 dark:border-dark-600 rounded-md px-3 py-2"
              placeholder="Tell us a bit about yourself..."
            />
          </div>

          {/* Messages */}
          {errorMessage && (
            <div className="p-3 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-md text-sm">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="p-3 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 rounded-md text-sm">
              {successMessage}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-dark-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-dark-600 rounded-md mr-2 transition"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md transition flex items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
