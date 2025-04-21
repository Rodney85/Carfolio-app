import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeToggle } from "../shared/ThemeToggle";
import { Button } from "../shared/Button";
import { motion } from "framer-motion";
import { Menu, X, User } from "lucide-react";
import { fadeIn, slideUp } from "../../lib/animations";
import { useAuth, UserButton } from "@clerk/clerk-react";

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <header className="border-b border-gray-200 bg-white px-4 py-4 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <motion.div 
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-primary"
          >
            🚗
          </motion.div>
          <span className="text-xl font-bold">Carfolio</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <nav className="flex items-center gap-6">
            <Link to="/" className="font-medium hover:text-primary">
              Home
            </Link>
            <Link to="/pricing" className="font-medium hover:text-primary">
              Pricing
            </Link>
            <Link to="/creators" className="font-medium hover:text-primary">
              Creators
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            {isSignedIn ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="font-medium hover:text-primary flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </Link>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <Button size="sm" onClick={() => navigate("/sign-in")}>
                Sign In
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="block md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="mt-4 border-t border-gray-200 py-4 md:hidden dark:border-gray-800"
        >
          <motion.nav
            variants={slideUp}
            className="flex flex-col gap-4"
          >
            <Link
              to="/"
              className="px-4 py-2 font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/pricing"
              className="px-4 py-2 font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="/creators"
              className="px-4 py-2 font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Creators
            </Link>
            <div className="mt-4 flex flex-col gap-4 px-4">
              {isSignedIn ? (
                <>
                  <Link 
                    to="/profile" 
                    className="flex items-center justify-center gap-2 font-medium hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                  <div className="flex justify-center">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </>
              ) : (
                <Button size="sm" onClick={() => {
                  navigate("/sign-in");
                  setIsMenuOpen(false);
                }}>
                  Sign In
                </Button>
              )}
              <div className="flex justify-center">
                <ThemeToggle />
              </div>
            </div>
          </motion.nav>
        </motion.div>
      )}
    </header>
  );
}; 