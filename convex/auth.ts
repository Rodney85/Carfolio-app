// Auth helper for Clerk authentication with Convex
// Provides both client-side hooks and server-side utilities

// Client-side imports
import { useAuth, useUser } from "@clerk/clerk-react";

// Server-side imports - these will be used once Convex is properly set up
// For now, we're keeping the client-side implementation working

/**
 * Custom hook to get the current authenticated user's data
 * Use this in React components that need user information
 */
export function useAuthUser() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  
  return {
    isLoaded,
    isSignedIn,
    user,
    userId: user?.id,
    userEmail: user?.primaryEmailAddress?.emailAddress,
    userName: user?.fullName,
    userImage: user?.imageUrl,
  };
}

/**
 * Helper function to check if a user is authenticated
 * Returns a boolean indicating if the user is signed in
 */
export function isAuthenticated(isSignedIn: boolean | undefined, isLoaded: boolean | undefined) {
  return isLoaded && isSignedIn;
}
