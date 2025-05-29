import React from 'react';
import { motion } from 'framer-motion';
import { MdOutlineHub } from 'react-icons/md';
import { slowSpin } from '../../lib/animations';

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 48,
  className = '',
}) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        animate="animate"
        variants={slowSpin}
        className="text-primary-500 dark:text-primary-400"
      >
        <MdOutlineHub size={size} />
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
