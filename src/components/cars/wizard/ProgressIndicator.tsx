import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Step {
  id: string;
  title: string;
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (index: number) => void;
}

export default function ProgressIndicator({ 
  steps, 
  currentStep, 
  onStepClick 
}: ProgressIndicatorProps) {
  return (
    <div className="relative">
      {/* Progress bar background */}
      <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 bg-gray-200 dark:bg-gray-700" />
      
      {/* Active progress bar */}
      <motion.div 
        className="absolute top-1/2 left-0 h-1 -translate-y-1/2 bg-primary-500"
        style={{ 
          width: `${(currentStep / (steps.length - 1)) * 100}%` 
        }}
        initial={{ width: 0 }}
        animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Step indicators */}
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          
          return (
            <div 
              key={step.id}
              className="flex flex-col items-center"
              onClick={() => onStepClick?.(index)}
            >
              {/* Step circle */}
              <motion.div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center cursor-pointer
                  ${isCompleted 
                    ? "bg-primary-500 text-white" 
                    : isActive 
                      ? "bg-primary-100 border-2 border-primary-500 text-primary-500" 
                      : "bg-gray-100 border-2 border-gray-300 text-gray-400 dark:bg-gray-700 dark:border-gray-600"}
                `}
                initial={{ scale: 1 }}
                animate={{ scale: isActive ? 1.2 : 1 }}
                transition={{ duration: 0.2 }}
              >
                {isCompleted ? (
                  <Check size={16} />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </motion.div>
              
              {/* Step title */}
              <span 
                className={`
                  mt-2 text-xs font-medium
                  ${isActive || isCompleted 
                    ? "text-primary-500" 
                    : "text-gray-500 dark:text-gray-400"}
                `}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
