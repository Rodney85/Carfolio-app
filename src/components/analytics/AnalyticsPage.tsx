import { motion } from "framer-motion";
import { BarChart2, BarChart, TrendingUp, Eye, Calendar } from "lucide-react";

export default function AnalyticsPage() {
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Track engagement and insights for your car builds
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Views</p>
              <h3 className="text-2xl font-bold mt-1">0</h3>
            </div>
            <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-md text-primary-500">
              <Eye size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Car Builds</p>
              <h3 className="text-2xl font-bold mt-1">0</h3>
            </div>
            <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-md text-orange-500">
              <BarChart size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Growth Trend</p>
              <h3 className="text-2xl font-bold mt-1">0%</h3>
            </div>
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-md text-green-500">
              <TrendingUp size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Days Active</p>
              <h3 className="text-2xl font-bold mt-1">1</h3>
            </div>
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-md text-purple-500">
              <Calendar size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Empty state for analytics */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-500 mb-4">
          <BarChart2 size={32} />
        </div>
        <h2 className="text-xl font-semibold mb-2">Enhanced Analytics Coming Soon</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
          We're building a comprehensive analytics dashboard with detailed insights about your car builds,
          including traffic sources, engagement metrics, and affiliate link performance. Check back soon!
        </p>
      </div>
    </motion.div>
  );
}
