import React from 'react';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({ 
  value, 
  max = 100, 
  className = '',
  ...props 
}) => {
  // Ensure value is between 0 and max
  const clampedValue = Math.max(0, Math.min(value, max));
  const percentage = (clampedValue / max) * 100;

  return (
    <div
      className={`w-full bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700 ${className}`}
      {...props}
    >
      <div
        className="bg-primary h-full transition-all duration-300 ease-in-out"
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={max}
      />
    </div>
  );
};
