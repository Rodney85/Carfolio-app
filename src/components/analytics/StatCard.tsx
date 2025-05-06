import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

// Define card variants using class-variance-authority
const cardVariants = cva(
  "rounded-lg shadow-md p-5 transition-all",
  {
    variants: {
      variant: {
        default: "bg-white dark:bg-gray-800",
        purple: "bg-purple-50 dark:bg-purple-900/10 border-l-4 border-purple-500",
        blue: "bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500",
        green: "bg-green-50 dark:bg-green-900/10 border-l-4 border-green-500",
        amber: "bg-amber-50 dark:bg-amber-900/10 border-l-4 border-amber-500",
        red: "bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Define icon variants
const iconVariants = cva(
  "p-2 rounded-md",
  {
    variants: {
      variant: {
        default: "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300",
        purple: "bg-purple-100 dark:bg-purple-900/20 text-purple-500",
        blue: "bg-blue-100 dark:bg-blue-900/20 text-blue-500",
        green: "bg-green-100 dark:bg-green-900/20 text-green-500",
        amber: "bg-amber-100 dark:bg-amber-900/20 text-amber-500",
        red: "bg-red-100 dark:bg-red-900/20 text-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface StatCardProps extends VariantProps<typeof cardVariants> {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  percentChange?: number;
  isLoading?: boolean;
  onClick?: () => void;
  footer?: React.ReactNode;
}

export function StatCard({ 
  title, 
  value, 
  icon, 
  percentChange, 
  variant = "default",
  isLoading = false,
  onClick,
  footer
}: StatCardProps) {
  return (
    <div 
      className={cn(
        cardVariants({ variant }),
        onClick && "cursor-pointer hover:shadow-lg",
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">{title}</p>
          {isLoading ? (
            <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          ) : (
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
          )}
          
          {percentChange !== undefined && !isLoading && (
            <div className={cn(
              "flex items-center text-xs mt-2",
              percentChange >= 0 ? "text-green-500" : "text-red-500"
            )}>
              {percentChange >= 0 ? (
                <TrendingUp size={14} className="mr-1" />
              ) : (
                <TrendingDown size={14} className="mr-1" />
              )}
              <span>{Math.abs(percentChange).toFixed(1)}% {percentChange >= 0 ? "increase" : "decrease"}</span>
            </div>
          )}
        </div>
        <div className={iconVariants({ variant })}>
          {icon}
        </div>
      </div>
      
      {footer && (
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
          {footer}
        </div>
      )}
    </div>
  );
}
