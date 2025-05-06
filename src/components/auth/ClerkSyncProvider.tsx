import { useUser } from "@clerk/clerk-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useEffect } from "react";

/**
 * ClerkSyncProvider
 * 
 * This component syncs the Clerk username to Convex in the background.
 * It should be placed high in the component tree where authentication is available.
 */
export function ClerkSyncProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const syncUsername = useMutation(api.users.syncClerkUsername);
  const userProfile = useQuery(api.users.getUserProfile);

  // Sync Clerk username to Convex when user data changes
  useEffect(() => {
    if (isLoaded && user && user.username) {
      // Check if we need to sync (either no profile or username mismatch)
      if (!userProfile || userProfile.username !== user.username) {
        console.log("Syncing Clerk username to Convex:", user.username);
        syncUsername()
          .then((result) => {
            console.log("Username sync result:", result);
          })
          .catch((error) => {
            console.error("Error syncing username:", error);
          });
      }
    }
  }, [isLoaded, user?.username, userProfile?.username, syncUsername]);

  return <>{children}</>;
}

export default ClerkSyncProvider;
