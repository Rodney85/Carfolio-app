import { useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { CarFormData } from "../../../../lib/validations/car";
import { ModCategory } from "../../../../types/car";

// List of modification categories
const modCategories: ModCategory[] = [
  "Engine", "Suspension", "Wheels", "Exterior", "Interior", "Electronics", "Other"
];

export default function ModsStep() {
  const { control, register, formState: { errors } } = useFormContext<CarFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "mods",
  });
  
  // State to track expanded mod items
  const [expandedMods, setExpandedMods] = useState<Record<number, boolean>>({
    0: true, // First mod expanded by default
  });
  
  const toggleExpand = (index: number) => {
    setExpandedMods(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">Car Modifications</h2>
        <button
          type="button"
          onClick={() => append({
            category: "Engine",
            name: "",
            brand: "",
            description: "",
            price: 0,
            productLink: "",
          })}
          className="flex items-center px-3 py-1 bg-primary-500 hover:bg-primary-600 text-white text-sm rounded-md transition"
        >
          <Plus size={16} className="mr-1" />
          Add Mod
        </button>
      </div>
      
      {fields.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-gray-300 dark:border-gray-700 rounded-md">
          <p className="text-gray-500 dark:text-gray-400">
            No mods added yet. Click "Add Mod" to get started.
          </p>
        </div>
      ) : (
        <AnimatePresence>
          {fields.map((field, index) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, overflow: "hidden" }}
              transition={{ duration: 0.2 }}
              className="border border-gray-200 dark:border-gray-700 rounded-md mb-4 overflow-hidden"
            >
              <div 
                className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-3 cursor-pointer"
                onClick={() => toggleExpand(index)}
              >
                <div className="flex items-center">
                  <span className="font-medium mr-2">
                    {index + 1}. {field.name || "New Modification"}
                  </span>
                  {field.category && (
                    <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                      {field.category}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      remove(index);
                    }}
                    className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                  {expandedMods[index] ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </div>
              </div>
              
              {expandedMods[index] && (
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register(`mods.${index}.category` as const)}
                      className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
                    >
                      {modCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {errors.mods?.[index]?.category && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.mods[index]?.category?.message}
                      </p>
                    )}
                  </div>
                  
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Mod Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register(`mods.${index}.name` as const)}
                      placeholder="e.g., Turbo Kit, Coilovers"
                      className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
                    />
                    {errors.mods?.[index]?.name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.mods[index]?.name?.message}
                      </p>
                    )}
                  </div>
                  
                  {/* Brand */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Brand
                    </label>
                    <input
                      {...register(`mods.${index}.brand` as const)}
                      placeholder="e.g., HKS, KW, Enkei"
                      className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
                    />
                  </div>
                  
                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Price
                    </label>
                    <input
                      type="number"
                      {...register(`mods.${index}.price` as const, {
                        valueAsNumber: true,
                      })}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
                    />
                  </div>
                  
                  {/* Product Link */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      Affiliate/Product Link
                    </label>
                    <input
                      {...register(`mods.${index}.productLink` as const)}
                      placeholder="https://..."
                      className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
                    />
                    {errors.mods?.[index]?.productLink && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.mods[index]?.productLink?.message}
                      </p>
                    )}
                  </div>
                  
                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      Description
                    </label>
                    <textarea
                      {...register(`mods.${index}.description` as const)}
                      rows={3}
                      placeholder="Details about this modification..."
                      className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      )}
      
      {fields.length > 0 && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => append({
              category: "Engine",
              name: "",
              brand: "",
              description: "",
              price: 0,
              productLink: "",
            })}
            className="flex items-center px-4 py-2 border border-dashed border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <Plus size={16} className="mr-1" />
            Add Another Modification
          </button>
        </div>
      )}
    </div>
  );
}
