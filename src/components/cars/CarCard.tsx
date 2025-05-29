import React from 'react';
import { ChevronRight, Car as CarIcon, Calendar, Gauge } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Car } from '../../types/car';
import GradientCard from '../ui/GradientCard';

interface CarCardProps {
  car: Car;
  delay?: number;
}

const CarCard: React.FC<CarCardProps> = ({ car, delay = 0 }) => {
  return (
    <GradientCard
      color="brand"
      className="overflow-hidden flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <div className="aspect-video bg-dark-700 relative -mx-4 -mt-4 mb-3 overflow-hidden">
        {car.images && car.images.length > 0 ? (
          <img 
            src={car.images[0]} 
            alt={`${car.year} ${car.make} ${car.model}`} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <CarIcon size={48} className="text-brand-300 opacity-40" />
          </div>
        )}
        {/* We can add status badges if needed in the future */}
      </div>
      
      <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">
        {car.year} {car.make} {car.model}
      </h3>
      
      {car.description && (
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {car.description}
        </p>
      )}
      
      <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800/30">
        <div className="flex flex-wrap justify-between gap-y-2">
          <div className="flex gap-4">
            {car.horsepower && (
              <div className="flex items-center gap-1.5 text-sm">
                <Gauge size={14} className="text-brand-500" />
                <span className="font-medium">{car.horsepower} HP</span>
              </div>
            )}
            
            <div className="flex items-center gap-1.5 text-sm">
              <Calendar size={14} className="text-primary-500" />
              <span>{car.year}</span>
            </div>
          </div>
          
          <Link 
            to={`/cars/${car.id}`}
            className="text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300 text-sm font-medium flex items-center gap-1 transition-colors"
          >
            Details <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </GradientCard>
  );
};

export default CarCard;
