import { motion } from "framer-motion";
import { Car, ChevronRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Car as CarType } from "../../types/car";
import { fadeIn, listItem, staggerChildren } from "../../lib/animations";

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
        <motion.div
          variants={fadeIn}
          className="text-center py-8 border border-dashed border-dark-600 rounded-lg"
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
        </motion.div>
      ) : (
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {displayCars.map((car) => (
            <motion.div
              key={car.id}
              variants={listItem}
              className="bg-dark-800 border border-dark-700 rounded-xl overflow-hidden hover:border-primary-500 transition-all"
            >
              <div className="aspect-video bg-dark-700 relative">
                {car.images && car.images.length > 0 ? (
                  <img 
                    src={car.images[0]} 
                    alt={`${car.year} ${car.make} ${car.model}`} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-1">{car.year} {car.make} {car.model}</h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{car.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-primary-400 font-medium">{car.horsepower} HP</span>
                    <span className="mx-2 text-gray-500">•</span>
                    <span className="text-gray-400">{car.mods.length} mods</span>
                  </div>
                  <Link 
                    to={`/cars/${car.id}`}
                    className="text-primary-400 hover:text-primary-300 flex items-center"
                  >
                    View <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
