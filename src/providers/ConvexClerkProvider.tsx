import { ReactNode, useEffect, useState } from "react";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

// We'll initialize Convex client properly later
// For now, we're using a mock implementation

interface ConvexClerkProviderProps {
  children: ReactNode;
}

// Initialize the Convex client
const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

export function ConvexClerkProvider({ children }: ConvexClerkProviderProps) {
  const [mounted, setMounted] = useState(false);
  
  // Ensure we only mount once on the client side
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a loading state or null during SSR
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-900 text-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;

  if (!publishableKey) {
    throw new Error("Missing Clerk Publishable Key");
  }

  // Check if Convex URL is configured
  if (!import.meta.env.VITE_CONVEX_URL) {
    throw new Error("Missing Convex URL");
  }

  return (
    <ClerkProvider publishableKey={publishableKey} afterSignOutUrl="/">
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
