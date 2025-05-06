import React from "react";
import { cn } from "../../lib/utils";
import { ChevronRight } from "lucide-react";

interface TableColumn<T> {
  header: string;
  accessorKey: keyof T;
  cell?: (data: T) => React.ReactNode;
  className?: string;
}

interface AnalyticsTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  isLoading?: boolean;
  title?: string;
  subtitle?: string;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
  className?: string;
}

export function AnalyticsTable<T>({
  data,
  columns,
  isLoading = false,
  title,
  subtitle,
  emptyMessage = "No data to display",
  onRowClick,
  className,
}: AnalyticsTableProps<T>) {
  // Create loading skeleton
  if (isLoading) {
    return (
      <div className={cn("rounded-lg p-5 bg-white dark:bg-gray-800 shadow-md", className)}>
        {title && (
          <div className="mb-4">
            <div className="h-6 w-1/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            {subtitle && <div className="h-4 w-1/2 mt-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />}
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 dark:border-gray-700">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className={cn(
                      "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                      column.className
                    )}
                  >
                    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {Array.from({ length: 5 }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((_, colIndex) => (
                    <td key={colIndex} className="px-4 py-3">
                      <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Empty state
  if (data.length === 0) {
    return (
      <div className={cn("rounded-lg p-5 bg-white dark:bg-gray-800 shadow-md", className)}>
        {title && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
          </div>
        )}
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("rounded-lg p-5 bg-white dark:bg-gray-800 shadow-md", className)}>
      {title && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-200 dark:border-gray-700">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={cn(
                    "px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider",
                    column.className
                  )}
                >
                  {column.header}
                </th>
              ))}
              {onRowClick && <th className="w-10"></th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((item, rowIndex) => (
              <tr 
                key={rowIndex} 
                className={cn(
                  onRowClick && "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                )}
                onClick={onRowClick ? () => onRowClick(item) : undefined}
              >
                {columns.map((column, colIndex) => (
                  <td 
                    key={colIndex} 
                    className={cn("px-4 py-3 whitespace-nowrap", column.className)}
                  >
                    {column.cell ? column.cell(item) : String(item[column.accessorKey] ?? '')}
                  </td>
                ))}
                {onRowClick && (
                  <td className="px-4 py-3 text-right">
                    <ChevronRight size={16} className="text-gray-400" />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
