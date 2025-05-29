import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../shared/LoadingSpinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoaded, isSignedIn } = useAuth();

  // Show loading state while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-900 text-gray-100">
        <LoadingSpinner size={60} />
      </div>
    );
  }

  // If not signed in, redirect to sign-in page
  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  // If signed in, render children
  return <>{children}</>;
}
