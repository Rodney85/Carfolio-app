import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AddCarForm from "./AddCarForm";
import { fadeIn } from "../../lib/utils";

export default function AddCarPage() {
  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="enter"
      exit="exit"
      className="max-w-5xl mx-auto px-4 py-6"
    >
      <div className="mb-6">
        <Link 
          to="/dashboard" 
          className="flex items-center text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to Dashboard
        </Link>
      </div>
      
      <AddCarForm />
    </motion.div>
  );
} 