import { useState } from "react";
import { motion } from "framer-motion";
import { Car, Plus, X, ChevronRight, ChevronLeft, Upload, Check } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { ModCategory } from "../../types/car";

// Form data type definition
interface CarFormData {
  year: number;
  make: string;
  model: string;
  nickname: string;
  status: "Building" | "Completed";
  mainImageUrl: string;
  mods: Array<{
    category: ModCategory;
    name: string;
    brand: string;
    description: string;
    price: number;
    productLink?: string;
  }>;
  mediaUrls: string[];
  youtubeUrls: string[];
  isPublic: boolean;
}

// List of mod categories
const modCategories: ModCategory[] = [
  "Engine", "Suspension", "Wheels", "Exterior", "Interior", "Electronics", "Other"
];

export default function AddCarForm() {
  // Current step state
  const [currentStep, setCurrentStep] = useState(1);
  // Overall form data state
  const [formData, setFormData] = useState<CarFormData>({
    year: new Date().getFullYear(),
    make: "",
    model: "",
    nickname: "",
    status: "Building",
    mainImageUrl: "",
    mods: [{ category: "Engine", name: "", brand: "", description: "", price: 0, productLink: "" }],
    mediaUrls: [],
    youtubeUrls: [],
    isPublic: true
  });
  
  // Upload states
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Form validation states
  const [errors, setErrors] = useState<Partial<Record<keyof CarFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Convex mutations
  const createCar = useMutation(api.cars.createCar);
  
  // Calculate completion percentage for progress bar
  const progressPercentage = (currentStep / 3) * 100;

  // Handle input changes for basic fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear any error for this field
    if (errors[name as keyof CarFormData]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  // Handle mod list changes
  const handleModChange = (index: number, field: string, value: string) => {
    const updatedMods = [...formData.mods];
    updatedMods[index] = {
      ...updatedMods[index],
      [field]: value
    };
    
    setFormData({
      ...formData,
      mods: updatedMods
    });
  };

  // Add a new mod to the list
  const addMod = () => {
    setFormData({
      ...formData,
      mods: [
        ...formData.mods,
        { category: "Engine", name: "", brand: "", description: "", price: 0, productLink: "" }
      ]
    });
  };

  // Remove a mod from the list
  const removeMod = (index: number) => {
    const updatedMods = formData.mods.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      mods: updatedMods
    });
  };

  // Handle file uploads (will integrate with Backblaze)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    
    try {
      // Mock upload progress for now
      // In a real implementation, we'd generate a signed URL with Convex,
      // upload to Backblaze, and get back the CDN URL
      const timer = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(() => {
              setIsUploading(false);
              setUploadProgress(0);
              
              // Once "uploaded", add URLs to state (using mock URLs for now)
              const newMediaUrls = [...formData.mediaUrls];
              Array.from(files).forEach((_, index) => {
                newMediaUrls.push(`https://example.com/media/car-${Date.now()}-${index}.jpg`);
              });
              
              setFormData(prevFormData => ({
                ...prevFormData,
                mediaUrls: newMediaUrls
              }));
              setErrors({
                ...errors,
                year: "Please complete all required fields."
              });
              
            }, 500);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    } catch (error) {
      console.error('Error uploading file:', error);
      setIsUploading(false);
      setUploadProgress(0);
      setErrors({
        ...errors,
        mainImageUrl: 'Failed to upload image. Please try again.'
      });
    }
  };

  // Handle YouTube URL input
  const addYoutubeUrl = (url: string) => {
    // Basic YouTube URL validation
    if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
      setErrors({
        ...errors,
        youtubeUrls: "Please enter a valid YouTube URL"
      });
      return;
    }
    
    setFormData({
      ...formData,
      youtubeUrls: [...formData.youtubeUrls, url]
    });
    
    // Clear the input
    const input = document.getElementById("youtube-url") as HTMLInputElement;
    if (input) input.value = "";
  };

  // Remove a YouTube URL
  const removeYoutubeUrl = (index: number) => {
    const updatedUrls = formData.youtubeUrls.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      youtubeUrls: updatedUrls
    });
  };

  // Navigate to the next step
  const goToNextStep = () => {
    // Validate current step
    if (currentStep === 1) {
      // Basic info validation
      const stepErrors: Record<string, string> = {};
      
      if (!formData.make) stepErrors.make = "Make is required";
      if (!formData.model) stepErrors.model = "Model is required";
      if (!formData.year || formData.year < 1900 || formData.year > new Date().getFullYear() + 1) {
        stepErrors.year = "Please enter a valid year";
      }
      
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        return;
      }
    }
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Navigate to the previous step
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Submit the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const validationErrors: Record<string, string> = {};
    
    if (!formData.make) validationErrors.make = "Make is required";
    if (!formData.model) validationErrors.model = "Model is required";
    if (!formData.year || formData.year < 1900 || formData.year > new Date().getFullYear() + 1) {
      validationErrors.year = "Please enter a valid year";
    }
    if (!formData.mainImageUrl) validationErrors.mainImageUrl = "Main image is required";
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real implementation, we'd send the data to Convex
      const result = await createCar({
        make: formData.make,
        model: formData.model,
        year: formData.year,
        title: formData.nickname || `${formData.year} ${formData.make} ${formData.model}`,
        description: "",
        mainImageUrl: formData.mainImageUrl,
        isPublic: formData.isPublic
      });
      
      console.log("Car created successfully:", result);
      
      // TODO: Add mods and media in a separate mutation
      
      // Reset form and go back to step 1
      setFormData({
        year: new Date().getFullYear(),
        make: "",
        model: "",
        nickname: "",
        status: "Building",
        mainImageUrl: "",
        mods: [{ category: "Engine", name: "", brand: "", description: "", price: 0, productLink: "" }],
        mediaUrls: [],
        youtubeUrls: [],
        isPublic: true
      });
      setCurrentStep(1);
      
      // Show success message or redirect
      alert("Car added successfully!");
    } catch (error) {
      console.error("Error adding car:", error);
      // Instead of using 'form' which doesn't exist in the type, use a generic error message on a valid field
      setErrors({
        ...errors,
        year: "Failed to add car. Please try again.",
        ...validationErrors
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white border border-gray-200 dark:bg-dark-800 dark:border-dark-700 rounded-xl p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Add Your Car</h1>
      
      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 dark:bg-dark-700 rounded-full mb-8">
        <div 
          className="h-2 bg-primary-500 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      {/* Step indicators */}
      <div className="flex justify-between mb-8">
        <div className={`flex flex-col items-center ${currentStep >= 1 ? 'text-primary-500' : 'text-gray-500'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${currentStep >= 1 ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-dark-700'}`}>
            1
          </div>
          <span className="text-sm">Basic Info</span>
        </div>
        <div className={`flex flex-col items-center ${currentStep >= 2 ? 'text-primary-500' : 'text-gray-500'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${currentStep >= 2 ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-dark-700'}`}>
            2
          </div>
          <span className="text-sm">Mod List</span>
        </div>
        <div className={`flex flex-col items-center ${currentStep >= 3 ? 'text-primary-500' : 'text-gray-500'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${currentStep >= 3 ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-dark-700'}`}>
            3
          </div>
          <span className="text-sm">Media</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold mb-4">Car Details</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Year*</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  className="w-full bg-gray-100 border border-gray-300 dark:bg-dark-700 dark:border-dark-600 rounded-md px-3 py-2"
                  required
                />
                {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Make*</label>
                <input
                  type="text"
                  name="make"
                  value={formData.make}
                  onChange={handleInputChange}
                  className="w-full bg-gray-100 border border-gray-300 dark:bg-dark-700 dark:border-dark-600 rounded-md px-3 py-2"
                  placeholder="e.g., BMW, Toyota, Honda"
                  required
                />
                {errors.make && <p className="text-red-500 text-sm mt-1">{errors.make}</p>}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Model*</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                className="w-full bg-gray-100 border border-gray-300 dark:bg-dark-700 dark:border-dark-600 rounded-md px-3 py-2"
                placeholder="e.g., Supra, 911, Skyline"
                required
              />
              {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Nickname (Optional)</label>
              <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleInputChange}
                className="w-full bg-gray-100 border border-gray-300 dark:bg-dark-700 dark:border-dark-600 rounded-md px-3 py-2"
                placeholder="e.g., Project Midnight, Track Beast"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="Building"
                    checked={formData.status === "Building"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Building
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="Completed"
                    checked={formData.status === "Completed"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Completed
                </label>
              </div>
            </div>
            

            
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="isPublic"
                name="isPublic"
                checked={formData.isPublic}
                onChange={(e) => setFormData({...formData, isPublic: e.target.checked})}
                className="mr-2"
              />
              <label htmlFor="isPublic" className="text-sm">
                Make this car public (visible on your profile)
              </label>
            </div>
          </motion.div>
        )}
        
        {/* Step 2: Mod List */}
        {currentStep === 2 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Modifications</h2>
              <button
                type="button"
                onClick={addMod}
                className="flex items-center text-sm bg-gray-200 hover:bg-gray-300 dark:bg-dark-700 dark:hover:bg-dark-600 px-3 py-1.5 rounded-md transition"
              >
                <Plus size={16} className="mr-1" />
                Add Mod
              </button>
            </div>
            
            {formData.mods.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-gray-300 dark:border-dark-600 rounded-lg">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-200 dark:bg-dark-700 flex items-center justify-center">
                  <Car className="h-6 w-6 text-gray-500" />
                </div>
                <p className="text-gray-500 dark:text-gray-400 mb-3">No mods added yet</p>
                <button
                  type="button"
                  onClick={addMod}
                  className="flex items-center mx-auto text-sm bg-gray-200 hover:bg-gray-300 dark:bg-dark-700 dark:hover:bg-dark-600 px-3 py-1.5 rounded-md transition"
                >
                  <Plus size={16} className="mr-1" />
                  Add Your First Mod
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {formData.mods.map((mod, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-100 dark:bg-dark-700 rounded-lg p-4 border border-gray-300 dark:border-dark-600 relative"
                  >
                    <button
                      type="button"
                      onClick={() => removeMod(index)}
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      <X size={16} />
                    </button>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <select
                          value={mod.category}
                          onChange={(e) => handleModChange(index, 'category', e.target.value)}
                          className="w-full bg-white dark:bg-dark-800 border border-gray-300 dark:border-dark-600 rounded-md px-3 py-2"
                        >
                          {modCategories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>

                    </div>
                    
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Part Name</label>
                      <input
                        type="text"
                        value={mod.name}
                        onChange={(e) => handleModChange(index, 'name', e.target.value)}
                        className="w-full bg-white dark:bg-dark-800 border border-gray-300 dark:border-dark-600 rounded-md px-3 py-2"
                        placeholder="e.g., GTX3584RS Turbo, Coilovers V3"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Product Link (Optional)</label>
                      <input
                        type="text"
                        value={mod.productLink}
                        onChange={(e) => handleModChange(index, 'productLink', e.target.value)}
                        className="w-full bg-white dark:bg-dark-800 border border-gray-300 dark:border-dark-600 rounded-md px-3 py-2"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
        
        {/* Step 3: Media Gallery */}
        {currentStep === 3 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold mb-4">Media Gallery</h2>
            
            <div>
              <label className="block text-sm font-medium mb-2">Main Image*</label>
              <div className="border-2 border-dashed border-dark-600 rounded-lg p-6 text-center mb-6">
                <input
                  type="file"
                  id="main-image"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                
                {formData.mainImageUrl ? (
                  <div className="relative">
                    <img 
                      src={formData.mainImageUrl} 
                      alt="Car preview" 
                      className="max-h-40 mx-auto rounded"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, mainImageUrl: ""})}
                      className="absolute top-2 right-2 bg-dark-900 bg-opacity-70 rounded-full p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <label 
                    htmlFor="main-image" 
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <Upload size={24} className="mb-2 text-gray-400" />
                    <span className="text-sm text-gray-400">Click to upload main image</span>
                    <span className="text-xs text-gray-500 mt-1">(Max 5MB - JPG, PNG)</span>
                  </label>
                )}
              </div>

              <label className="block text-sm font-medium mb-2">Additional Images & Videos</label>
              <div className="border-2 border-dashed border-dark-600 rounded-lg p-8 text-center">
                {isUploading ? (
                  <div className="space-y-3">
                    <div className="w-full bg-dark-700 rounded-full h-2.5">
                      <div 
                        className="bg-primary-500 h-2.5 rounded-full" 
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-400">Uploading... {uploadProgress}%</p>
                  </div>
                ) : (
                  <>
                    <input
                      type="file"
                      id="media-upload"
                      accept="image/*,video/*"
                      multiple
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <label 
                      htmlFor="media-upload" 
                      className="flex flex-col items-center cursor-pointer"
                    >
                      <Upload size={32} className="mb-3 text-gray-400" />
                      <span className="text-gray-400">Drag and drop or click to upload</span>
                      <span className="text-xs text-gray-500 mt-1">
                        JPG, PNG, MP4 (Max 20MB)
                      </span>
                    </label>
                  </>
                )}
              </div>
            </div>
            
            {formData.mediaUrls.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2">Uploaded Media ({formData.mediaUrls.length})</h3>
                <div className="grid grid-cols-3 gap-3">
                  {formData.mediaUrls.map((url, index) => (
                    <div 
                      key={index} 
                      className="relative aspect-video bg-dark-700 rounded overflow-hidden"
                    >
                      <img 
                        src={url} 
                        alt={`Media ${index}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updatedUrls = formData.mediaUrls.filter((_, i) => i !== index);
                          setFormData({...formData, mediaUrls: updatedUrls});
                        }}
                        className="absolute top-1 right-1 bg-dark-900 bg-opacity-70 rounded-full p-1"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium mb-2">YouTube Videos (Optional)</label>
              <div className="flex space-x-2 mb-3">
                <input
                  type="text"
                  id="youtube-url"
                  placeholder="https://youtube.com/watch?v=..."
                  className="flex-grow bg-gray-100 border border-gray-300 dark:bg-dark-700 dark:border-dark-600 rounded-md px-3 py-2"
                />
                <button
                  type="button"
                  onClick={() => {
                    const input = document.getElementById("youtube-url") as HTMLInputElement;
                    if (input.value) addYoutubeUrl(input.value);
                  }}
                  className="bg-gray-300 hover:bg-gray-400 dark:bg-dark-700 dark:hover:bg-dark-600 px-3 py-2 rounded-md transition"
                >
                  Add
                </button>
              </div>
              {errors.youtubeUrls && <p className="text-red-500 text-sm mb-3">{errors.youtubeUrls}</p>}
              
              {formData.youtubeUrls.length > 0 && (
                <div className="space-y-2">
                  {formData.youtubeUrls.map((url, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between items-center bg-gray-100 dark:bg-dark-700 rounded-md px-3 py-2"
                    >
                      <span className="text-sm truncate flex-grow">{url}</span>
                      <button
                        type="button"
                        onClick={() => removeYoutubeUrl(index)}
                        className="text-gray-400 hover:text-gray-200 ml-2"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
        
        {/* Navigation and Submit buttons */}
        <div className="flex justify-between mt-8">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={goToPreviousStep}
              className="flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-dark-700 dark:hover:bg-dark-600 rounded-md transition"
            >
              <ChevronLeft size={16} className="mr-1" />
              Back
            </button>
          ) : (
            <div></div> // Empty div for spacing
          )}
          
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={goToNextStep}
              className="flex items-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md transition"
            >
              Next
              <ChevronRight size={16} className="ml-1" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Check size={16} className="mr-1" />
                  Save Car
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}