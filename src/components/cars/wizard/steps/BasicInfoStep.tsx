import { useFormContext } from "react-hook-form";
import { CarFormData } from "../../../../lib/validations/car";

export default function BasicInfoStep() {
  const { register, formState: { errors } } = useFormContext<CarFormData>();
  
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: currentYear - 1885 + 2 }, (_, i) => currentYear - i + 1).reverse();
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mb-4">Car Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Make */}
        <div>
          <label htmlFor="make" className="block text-sm font-medium mb-2">
            Make <span className="text-red-500">*</span>
          </label>
          <input
            id="make"
            {...register("make")}
            placeholder="e.g., Toyota, Honda, Ford"
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
          />
          {errors.make && (
            <p className="text-red-500 text-xs mt-1">{errors.make.message}</p>
          )}
        </div>
        
        {/* Model */}
        <div>
          <label htmlFor="model" className="block text-sm font-medium mb-2">
            Model <span className="text-red-500">*</span>
          </label>
          <input
            id="model"
            {...register("model")}
            placeholder="e.g., Supra, Civic, Mustang"
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
          />
          {errors.model && (
            <p className="text-red-500 text-xs mt-1">{errors.model.message}</p>
          )}
        </div>
        
        {/* Year */}
        <div>
          <label htmlFor="year" className="block text-sm font-medium mb-2">
            Year <span className="text-red-500">*</span>
          </label>
          <select
            id="year"
            {...register("year", { 
              setValueAs: (value) => parseInt(value, 10) 
            })}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
          >
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          {errors.year && (
            <p className="text-red-500 text-xs mt-1">{errors.year.message}</p>
          )}
        </div>
        
        {/* Title / Nickname */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Car Nickname <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            {...register("title")}
            placeholder="e.g., Project Z, Weekend Warrior"
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>
      </div>
      
      {/* Status */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Build Status <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-3">
          {["Building", "Completed", "For Sale"].map((status) => (
            <label
              key={status}
              className="flex items-center justify-center cursor-pointer border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <input
                type="radio"
                value={status}
                {...register("status")}
                className="sr-only"
              />
              <div className="relative w-full">
                <span 
                  className={`block text-center ${
                    register("status").name === status
                      ? "text-primary-600 font-medium"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {status}
                </span>
              </div>
            </label>
          ))}
        </div>
        {errors.status && (
          <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>
        )}
      </div>
      
      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-2">
          Description (Optional)
        </label>
        <textarea
          id="description"
          {...register("description")}
          rows={4}
          placeholder="Tell us about your car, its history, purpose, etc."
          className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
        )}
      </div>
    </div>
  );
}
