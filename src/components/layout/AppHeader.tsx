import React from "react";
import { motion } from "framer-motion";
import { fadeIn, slowSpin } from "../../lib/animations";
import { ThemeToggle } from "../shared/ThemeToggle";
import { MdOutlineHub } from "react-icons/md";

export const AppHeader: React.FC = () => {
  return (
    <motion.header
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="hidden md:flex items-center justify-between py-3 px-6 border-b border-gray-200 dark:border-dark-800 bg-light-300 dark:bg-dark-900"
    >
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <h1 
            className="text-2xl text-primary-500 dark:text-primary-400 atma-regular" 
            data-component-name="MotionComponent"
            style={{ fontFamily: '"Atma", system-ui', fontWeight: 400 }}
          >Carfolio</h1>
          <motion.div
            animate="animate"
            variants={slowSpin}
            className="flex items-center justify-center ml-0.5"
            style={{ marginTop: '2px' }}
          >
            <MdOutlineHub size={24} className="text-primary-500 dark:text-primary-400" />
          </motion.div>
        </div>
      </div>
      
      <ThemeToggle />
    </motion.header>
  );
};

export default AppHeader;
