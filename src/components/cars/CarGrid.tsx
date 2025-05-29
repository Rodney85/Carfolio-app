import { motion } from "framer-motion";
import { Car, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Car as CarType } from "../../types/car";
import { staggerChildren } from "../../lib/animations";
import CarCard from "./CarCard";
import GradientCard from "../ui/GradientCard";

interface CarGridProps {
  cars: CarType[];
  limit?: number;
  showAddButton?: boolean;
}

export default function CarGrid({ cars, limit, showAddButton = true }: CarGridProps) {
  // If limit is provided, only show that many cars
  const displayCars = limit ? cars.slice(0, limit) : cars;
  
  return (
    <div className="w-full">
      {displayCars.length === 0 ? (
        <GradientCard
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          color="brand"
          glassEffect
          className="text-center py-8 border-dashed"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-dark-700 flex items-center justify-center">
            <Car className="h-8 w-8 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium mb-2">No cars yet</h3>
          <p className="text-gray-400 mb-4 max-w-md mx-auto">Add your first car to start showcasing your builds and mods</p>
          {showAddButton && (
            <Link 
              to="/cars/new" 
              className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition inline-block"
            >
              <span className="flex items-center gap-2">
                <Plus size={16} />
                Add Your First Car
              </span>
            </Link>
          )}
        </GradientCard>
      ) : (
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {displayCars.map((car, index) => (
            <CarCard key={car.id} car={car} delay={0.05 * index} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
