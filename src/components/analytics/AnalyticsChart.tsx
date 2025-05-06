import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { cn } from "../../lib/utils";

// Chart colors for consistent styling
const CHART_COLORS = [
  "#4f46e5", // primary-600
  "#8b5cf6", // purple-500
  "#ec4899", // pink-500
  "#f59e0b", // amber-500
  "#14b8a6", // teal-500
  "#ef4444", // red-500
  "#3b82f6", // blue-500
  "#84cc16", // lime-500
];

// Pie chart colors
const PIE_COLORS = {
  "instagram": "#E1306C",
  "tiktok": "#000000",
  "youtube": "#FF0000",
  "twitter": "#1DA1F2",
  "facebook": "#4267B2",
  "direct": "#4f46e5",
  "other": "#94a3b8",
};

type ChartType = "line" | "bar" | "pie";

interface ChartProps {
  type: ChartType;
  data: any[];
  xKey?: string;
  yKey?: string;
  nameKey?: string;
  valueKey?: string;
  dataKey?: string;
  height?: number;
  title?: string;
  subtitle?: string;
  isLoading?: boolean;
  className?: string;
}

export function AnalyticsChart({
  type,
  data,
  xKey = "date",
  yKey = "value",
  nameKey = "name",
  valueKey = "value",
  dataKey = "value",
  height = 300,
  title,
  subtitle,
  isLoading = false,
  className,
}: ChartProps) {
  // Create a loading skeleton state
  if (isLoading) {
    return (
      <div className={cn("rounded-lg p-5 bg-white dark:bg-gray-800 shadow-md", className)}>
        {title && (
          <div className="mb-4">
            <div className="h-6 w-1/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            {subtitle && <div className="h-4 w-1/2 mt-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />}
          </div>
        )}
        <div className={`h-${height} w-full bg-gray-100 dark:bg-gray-700 rounded animate-pulse`} />
      </div>
    );
  }

  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
              <XAxis dataKey={xKey} stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151", color: "#f9fafb" }} />
              <Legend />
              <Line
                type="monotone"
                dataKey={yKey}
                stroke={CHART_COLORS[0]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case "bar":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
              <XAxis dataKey={xKey} stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151", color: "#f9fafb" }} />
              <Legend />
              <Bar dataKey={dataKey} fill={CHART_COLORS[0]} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey={valueKey}
                nameKey={nameKey}
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  name,
                  value,
                  percent,
                }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = 25 + innerRadius + (outerRadius - innerRadius);
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      textAnchor={x > cx ? "start" : "end"}
                      dominantBaseline="central"
                      className="text-xs"
                      fill="#94a3b8"
                    >
                      {`${name} (${(percent * 100).toFixed(0)}%)`}
                    </text>
                  );
                }}
              >
                {data.map((entry, index) => {
                  // Try to use a named color for known sources
                  const colorKey = entry[nameKey]?.toLowerCase();
                  const color = PIE_COLORS[colorKey as keyof typeof PIE_COLORS] || 
                                CHART_COLORS[index % CHART_COLORS.length];
                  
                  return <Cell key={`cell-${index}`} fill={color} />;
                })}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151", color: "#f9fafb" }}
                formatter={(value: number) => [value, "Views"]}
              />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className={cn("rounded-lg p-5 bg-white dark:bg-gray-800 shadow-md", className)}>
      {title && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
        </div>
      )}
      {renderChart()}
    </div>
  );
}
