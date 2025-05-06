
import { motion } from "framer-motion";
import { Car, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function GaragePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Garage</h1>
          <p className="text-gray-500 dark:text-gray-400">
            View and manage all your cars
          </p>
        </div>
        <Link
          to="/cars/add"
          className="inline-flex items-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md transition"
        >
          <Plus size={16} className="mr-2" />
          Add Car
        </Link>
      </header>

      {/* If no cars exist yet */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-500 mb-4">
          <Car size={32} />
        </div>
        <h2 className="text-xl font-semibold mb-2">No Cars Yet</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
          Your garage is empty. Add your first car to get started with tracking your builds and mods.
        </p>
        <Link
          to="/cars/add"
          className="inline-flex items-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md transition"
        >
          Add Your First Car
        </Link>
      </div>
    </motion.div>
  );
}
