import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "../../lib/animations";

export const Footer: React.FC = () => {
  return (
    <motion.footer
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="border-t border-gray-200 bg-white py-12 dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">🚗</span>
              <span className="text-xl font-bold">CarMods</span>
            </Link>
            <p className="mt-4 max-w-xs text-gray-600 dark:text-gray-400">
              The Linktree for car builds. Showcase your mods and earn from affiliate links.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/pricing" className="text-gray-600 hover:text-primary dark:text-gray-400">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/creators" className="text-gray-600 hover:text-primary dark:text-gray-400">
                    Creators
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-gray-600 hover:text-primary dark:text-gray-400">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-600 hover:text-primary dark:text-gray-400">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy" className="text-gray-600 hover:text-primary dark:text-gray-400">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-600 hover:text-primary dark:text-gray-400">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-6 dark:border-gray-800">
          <p className="text-center text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} CarMods. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}; 