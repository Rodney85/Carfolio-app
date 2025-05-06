// Clerk integration with Convex
// This file provides the server-side utilities for Clerk authentication

import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Define types that will be used when we install the Clerk SDK
type WebhookEvent = {
  type: string;
  data: any;
};

type ClerkUser = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  username?: string;
};

// Helper functions for Clerk integration
// These will be properly implemented when we install the Clerk SDK

/**
 * Verify a Clerk JWT token and return the user ID
 * This will be used when we implement proper Convex authentication
 */
export async function verifyToken(token: string): Promise<string | null> {
  try {
    // This is a placeholder - we'll implement proper JWT verification
    // when Convex is fully set up
    console.log("Verifying token:", token.substring(0, 10) + "...");
    return "user_123"; // Placeholder user ID
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}

/**
 * Get user data from Clerk
 * This will be used when we implement proper Convex authentication
 */
export async function getClerkUser(userId: string): Promise<ClerkUser | null> {
  try {
    // This is a placeholder - we'll implement proper Clerk API calls
    // when Convex is fully set up
    console.log("Getting user data for:", userId);
    return {
      id: userId,
      email: "user@example.com",
      firstName: "Example",
      lastName: "User",
      imageUrl: "https://example.com/avatar.png",
    };
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
}

/**
 * Handle Clerk webhook events
 * This will be used to sync user data between Clerk and Convex
 */
export const handleClerkWebhook = mutation({
  args: {
    type: v.string(),
    data: v.any(),
  },
  handler: async (ctx, { type, data }) => {
    try {
      console.log("Handling Clerk webhook event:", type);
      
      // Handle different event types
      switch (type) {
        case "user.created":
          // Create user in Convex if they don't exist
          await createOrUpdateUser(ctx, data);
          break;
        case "user.updated":
          // Update user in Convex with latest data from Clerk
          await createOrUpdateUser(ctx, data);
          break;
        case "user.deleted":
          // Delete user from Convex
          await deleteUser(ctx, data);
          break;
        default:
          console.log("Unhandled event type:", type);
      }
      
      return { success: true };
    } catch (error) {
      console.error("Error handling webhook:", error);
      return { success: false, error: String(error) };
    }
  },
});

/**
 * Create or update a user in Convex based on Clerk data
 */
async function createOrUpdateUser(ctx: any, data: any): Promise<void> {
  const clerkId = data.id;
  if (!clerkId) {
    throw new Error("No clerk ID provided");
  }
  
  // Check if user exists in Convex
  const existingUser = await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q: any) => q.eq("clerkId", clerkId))
    .first();
  
  // Extract user data from Clerk webhook payload
  const userData = {
    clerkId,
    email: data.email_addresses?.[0]?.email_address || "",
    name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
    username: data.username || "",
    imageUrl: data.image_url || "",
    updatedAt: Date.now(),
  };
  
  if (existingUser) {
    // Update existing user
    await ctx.db.patch(existingUser._id, userData);
    console.log("Updated user in Convex:", clerkId);
  } else {
    // Create new user
    const userId = await ctx.db.insert("users", {
      ...userData,
      plan: "free",
      createdAt: Date.now(),
    });
    console.log("Created user in Convex:", clerkId, userId);
  }
}

/**
 * Delete a user from Convex
 */
async function deleteUser(ctx: any, data: any): Promise<void> {
  const clerkId = data.id;
  if (!clerkId) {
    throw new Error("No clerk ID provided");
  }
  
  // Find user in Convex
  const user = await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q: any) => q.eq("clerkId", clerkId))
    .first();
  
  if (user) {
    // Delete user from Convex
    await ctx.db.delete(user._id);
    console.log("Deleted user from Convex:", clerkId);
  } else {
    console.log("User not found in Convex:", clerkId);
  }
}
