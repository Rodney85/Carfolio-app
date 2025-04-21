import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import Sidebar from "./components/layout/Sidebar";
import MobileNav from "./components/layout/MobileNav";
import AppHeader from "./components/layout/AppHeader";
import { pageTransition } from "./lib/animations";
import LandingPage from "./landing/LandingPage";
import { SignInPage, SignUpPage, ProtectedRoute, ProfilePage } from "./components/auth";
import { Dashboard } from "./components/dashboard";
import { useAuth } from "@clerk/clerk-react";

// We'll create placeholder components for now
const Home = () => (
  <motion.div
    variants={pageTransition}
    initial="initial"
    animate="enter"
    exit="exit"
    className="mx-auto max-w-7xl px-4 py-12"
  >
    <h1 className="mb-8 text-4xl font-bold">Welcome to Carfolio</h1>
    <p className="mb-6 text-lg">
      The Linktree for car builds - showcase your mods, monetize with affiliate links, and build your audience.
    </p>
  </motion.div>
);

const Pricing = () => (
  <motion.div
    variants={pageTransition}
    initial="initial"
    animate="enter"
    exit="exit"
    className="mx-auto max-w-7xl px-4 py-12"
  >
    <h1 className="mb-8 text-4xl font-bold">Pricing</h1>
    <div className="grid gap-8 md:grid-cols-2">
      <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
        <h2 className="mb-4 text-2xl font-bold">Free</h2>
        <ul className="mb-6 space-y-2">
          <li>1-2 cars</li>
          <li>Basic analytics</li>
          <li>Standard profile customization</li>
        </ul>
        <p className="text-2xl font-bold">$0/month</p>
      </div>
      <div className="rounded-lg border-2 border-primary bg-primary/5 p-6">
        <h2 className="mb-4 text-2xl font-bold">Pro</h2>
        <ul className="mb-6 space-y-2">
          <li>Unlimited cars</li>
          <li>Advanced analytics</li>
          <li>Custom domain</li>
          <li>Priority support</li>
        </ul>
        <p className="text-2xl font-bold">$10/month</p>
      </div>
    </div>
  </motion.div>
);

const Creators = () => (
  <motion.div
    variants={pageTransition}
    initial="initial"
    animate="enter"
    exit="exit"
    className="mx-auto max-w-7xl px-4 py-12"
  >
    <h1 className="mb-8 text-4xl font-bold">Featured Creators</h1>
    <p className="mb-6">
      Discover car enthusiasts showcasing their builds on Carfolio.
    </p>
    <div className="grid gap-6 md:grid-cols-3">
      {/* This will be populated with actual creators */}
      <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
        <div className="mb-4 h-40 rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <h3 className="mb-2 text-xl font-bold">Creator Name</h3>
        <p className="text-gray-600 dark:text-gray-400">Car Enthusiast</p>
      </div>
    </div>
  </motion.div>
);

// Redirect component based on auth state
function AuthRedirect({ children, redirectTo }: { children: React.ReactNode, redirectTo: string }) {
  const { isSignedIn, isLoaded } = useAuth();
  
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-900 text-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  if (isSignedIn) {
    return <Navigate to={redirectTo} replace />;
  }
  
  return <>{children}</>;
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  
  // Layout wrapper for authenticated pages with sidebar
  const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="flex min-h-screen bg-light-300 text-gray-900 dark:bg-dark-900 dark:text-gray-100">
        {/* Sidebar (desktop) */}
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        
        {/* Main content */}
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-16'}`}>
          {/* Desktop Header */}
          <AppHeader />
          
          <main className="flex-1 px-4 py-6 pb-20 md:pb-6">
            {children}
          </main>
          
          {/* Mobile Navigation */}
          <MobileNav />
        </div>
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        {/* Landing page route - no Header/Footer as they're included in LandingPage */}
        <Route path="/" element={
          <AuthRedirect redirectTo="/dashboard">
            <LandingPage />
          </AuthRedirect>
        } />

        {/* Public app routes with Header/Footer */}
        <Route path="/app/*" element={
          <div className="flex min-h-screen flex-col bg-light-300 text-gray-900 dark:bg-dark-900 dark:text-gray-100">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/creators" element={<Creators />} />
                {/* Other app routes will be added as we develop */}
              </Routes>
            </main>
            <Footer />
          </div>
        } />

        {/* Auth routes */}
        <Route path="/sign-in" element={
          <AuthRedirect redirectTo="/dashboard">
            <SignInPage />
          </AuthRedirect>
        } />
        <Route path="/sign-up" element={
          <AuthRedirect redirectTo="/dashboard">
            <SignUpPage />
          </AuthRedirect>
        } />
        
        {/* SSO Callback routes - these are essential for Clerk authentication */}
        <Route path="/sign-in/*" element={<SignInPage />} />
        <Route path="/sign-up/*" element={<SignUpPage />} />
        
        {/* Protected routes with sidebar layout */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <ProfilePage />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <Dashboard />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/app/cars/*" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Cars Page</h1>
                <p>This is a placeholder for the cars page.</p>
      </div>
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/app/analytics" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Analytics</h1>
                <p>This is a placeholder for the analytics page.</p>
      </div>
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
