import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMutation } from "convex/react";

import { api } from "../../../../convex/_generated/api";
import { carFormSchema, type CarFormData } from "../../../lib/validations/car";
// Not using ModCategory directly in this file
// import { ModCategory } from "../../../types/car";
import BasicInfoStep from "./steps/BasicInfoStep";
import ModsStep from "./steps/ModsStep";
import MediaStep from "./steps/MediaStep";
import FinalizeStep from "./steps/FinalizeStep";
import ProgressIndicator from "./ProgressIndicator";
import { fadeIn } from "../../../lib/animations";

// Default form values
const defaultValues: Partial<CarFormData> = {
  make: "",
  model: "",
  year: new Date().getFullYear(),
  title: "",
  status: "Building",
  description: "",
  mods: [{ category: "Engine", name: "", brand: "", description: "", price: 0, productLink: "" }],
  mediaUrls: [],
  youtubeUrls: [],
  mainImageUrl: "",
  isPublic: true,
};

const steps = [
  { id: "basic-info", title: "Basic Info" },
  { id: "mods", title: "Modifications" },
  { id: "media", title: "Media" },
  { id: "finalize", title: "Review & Publish" },
];

export default function AddCarWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const createCar = useMutation(api.cars.createCar);
  
  // Setup form with react-hook-form + zod validation
  const methods = useForm<CarFormData>({
    resolver: zodResolver(carFormSchema) as any, // Using any to bypass TypeScript resolver mismatch
    defaultValues: defaultValues as CarFormData,
    mode: "onChange",
  });
  
  const { handleSubmit, formState } = methods;
  const { isSubmitting } = formState;
  
  const goToNextStep = () => {
    // Only proceed if the current step is valid
    methods.trigger().then((isValid) => {
      if (isValid && currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      }
    });
  };
  
  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const onSubmit = async (data: CarFormData) => {
    try {
      // First create the car with basic info
      // Create the car in the database
      await createCar({
        make: data.make,
        model: data.model,
        year: data.year,
        title: data.title,
        description: data.description,
        mainImageUrl: data.mainImageUrl || (data.mediaUrls.length > 0 ? data.mediaUrls[0] : ""),
        mediaUrls: data.mediaUrls,
        youtubeUrls: data.youtubeUrls,
        isPublic: data.isPublic,
      });
      
      // TODO: Add mods separately in a separate step
      
      // Navigate to the dashboard or car detail page
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  
  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="enter"
      exit="exit"
      className="max-w-5xl mx-auto px-4 py-6"
    >
      <div className="mb-6">
        <Link 
          to="/dashboard" 
          className="flex items-center text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to Dashboard
        </Link>
      </div>
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Add a New Car</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Showcase your build with details, modifications, and media
        </p>
      </div>
      
      {/* Progress indicator */}
      <ProgressIndicator 
        steps={steps} 
        currentStep={currentStep} 
        onStepClick={(index) => {
          // Only allow clicking on previous steps or the current one
          if (index <= currentStep) {
            setCurrentStep(index);
          }
        }} 
      />
      
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          {/* Dynamic step content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
            {currentStep === 0 && <BasicInfoStep />}
            {currentStep === 1 && <ModsStep />}
            {currentStep === 2 && <MediaStep />}
            {currentStep === 3 && <FinalizeStep />}
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            {currentStep > 0 ? (
              <button
                type="button"
                onClick={goToPreviousStep}
                className="flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition"
              >
                <ChevronLeft size={16} className="mr-1" />
                Back
              </button>
            ) : (
              <div></div> // Empty div for spacing
            )}
            
            {currentStep < steps.length - 1 ? (
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
                    Save Car
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </motion.div>
  );
}
