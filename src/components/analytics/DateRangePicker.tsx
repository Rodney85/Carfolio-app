import React, { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

interface DateRange {
  startDate: Date;
  endDate: Date;
}

interface DateRangePickerProps {
  onChange: (range: { startDate: number; endDate: number }) => void;
  className?: string;
}

export function DateRangePicker({ onChange, className }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activePreset, setActivePreset] = useState<string>("last30Days");
  
  // Calculate preset date ranges
  const getPresetRanges = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    return {
      last7Days: {
        label: "Last 7 days",
        startDate: new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000),
        endDate: today
      },
      last30Days: {
        label: "Last 30 days",
        startDate: new Date(today.getTime() - 29 * 24 * 60 * 60 * 1000),
        endDate: today
      },
      lastMonth: {
        label: "Last month",
        startDate: new Date(today.getFullYear(), today.getMonth() - 1, 1),
        endDate: new Date(today.getFullYear(), today.getMonth(), 0)
      },
      thisMonth: {
        label: "This month",
        startDate: new Date(today.getFullYear(), today.getMonth(), 1),
        endDate: today
      },
      allTime: {
        label: "All time",
        startDate: new Date(2020, 0, 1), // Arbitary start date far in the past
        endDate: today
      }
    };
  };
  
  const presets = getPresetRanges();
  
  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };
  
  // Handle preset selection
  const handlePresetSelect = (presetKey: string) => {
    const preset = presets[presetKey as keyof typeof presets];
    setActivePreset(presetKey);
    
    onChange({
      startDate: preset.startDate.getTime(),
      endDate: preset.endDate.getTime()
    });
    
    setIsOpen(false);
  };
  
  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
      >
        <Calendar size={16} />
        <span>
          {formatDate(presets[activePreset as keyof typeof presets].startDate)} - {formatDate(presets[activePreset as keyof typeof presets].endDate)}
        </span>
        <ChevronDown size={16} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-1 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10">
          <div className="p-2">
            {Object.entries(presets).map(([key, { label }]) => (
              <button
                key={key}
                type="button"
                onClick={() => handlePresetSelect(key)}
                className={cn(
                  "w-full text-left px-3 py-2 text-sm rounded-md",
                  activePreset === key
                    ? "bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
