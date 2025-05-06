import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { v } from "convex/values";

// User functions for Clerk integration

/**
 * Get a user by their Clerk ID
 */
export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, { clerkId }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q: any) => q.eq("clerkId", clerkId))
      .first();
    return user;
  },
});

/**
 * Create a new user from Clerk data
 */
export const createUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    username: v.optional(v.string()),
    bio: v.optional(v.string()),
  },
  handler: async (ctx, { clerkId, email, name, imageUrl, username, bio }) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q: any) => q.eq("clerkId", clerkId))
      .first();

    if (existingUser) {
      return existingUser._id;
    }

    // Create new user
    const userId = await ctx.db.insert("users", {
      clerkId,
      email,
      name,
      imageUrl,
      username,
      bio,
      plan: "free",
      createdAt: Date.now(),
    });

    return userId;
  },
});

/**
 * Update an existing user profile
 */
export const updateUserProfile = mutation({
  args: {
    username: v.optional(v.string()),
    bio: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
  },
  handler: async (ctx, { username, bio, imageUrl, firstName, lastName }) => {
    // Get the authenticated user's ID from the auth context
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const clerkId = identity.subject;

    // Find the user in our database
    let user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q: any) => q.eq("clerkId", clerkId))
      .first();

    if (!user) {
      // Create the user if they don't exist
      const userId = await ctx.db.insert("users", {
        clerkId,
        email: identity.email || "",
        name: firstName ? (firstName + (lastName ? " " + lastName : "")) : (identity.name || ""),
        imageUrl: identity.pictureUrl,
        username: username || "",
        bio: bio || "",
        plan: "free",
        createdAt: Date.now(),
      });
      
      user = await ctx.db.get(userId);
      return { success: true, created: true };
    }

    // Update only the fields that were provided
    const updates: any = {};
    if (username !== undefined) updates.username = username;
    if (bio !== undefined) updates.bio = bio;
    if (imageUrl !== undefined) updates.imageUrl = imageUrl;
    if (firstName !== undefined) updates.name = firstName + (user.name?.includes(' ') ? (' ' + (lastName || '')) : '');
    if (lastName !== undefined && firstName === undefined && user.name) {
      // If only updating last name, preserve first name
      const currentFirstName = user.name.split(' ')[0];
      updates.name = currentFirstName + ' ' + lastName;
    }

    // Update the user record
    await ctx.db.patch(user._id, updates);

    return { success: true };
  },
});

/**
 * Get the current authenticated user's profile
 * Also syncs Clerk username to Convex in the background
 */
export const getUserProfile = query({
  args: {},
  handler: async (ctx) => {
    // Get the authenticated user's ID from the auth context
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }
    const clerkId = identity.subject;

    // Find the user in our database
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q: any) => q.eq("clerkId", clerkId))
      .first();

    if (!user) {
      return null;
    }
    
    // If Clerk username differs from Convex username, schedule a background sync
    if (identity.username && user.username !== identity.username) {
      // We can't directly mutate in a query, so we'll just log this for now
      // In a production app, you would use a task or a separate mutation for this
      console.log(`Username mismatch detected: Clerk=${identity.username}, Convex=${user.username}`);
      // This would be handled by the webhook or a separate sync process
    }

    return user;
  },
});

/**
 * Sync the current user's Clerk username to Convex
 */
export const syncClerkUsername = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const clerkId = identity.subject;
    const clerkUsername = identity.username;
    
    if (!clerkUsername) {
      return { success: false, message: "No username in Clerk identity" };
    }
    
    // Find the user in our database
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q: any) => q.eq("clerkId", clerkId))
      .first();
    
    if (!user) {
      // Create user if they don't exist
      await ctx.db.insert("users", {
        clerkId,
        email: identity.email || "",
        name: identity.name || "",
        username: String(clerkUsername), // Ensure it's a string
        imageUrl: identity.pictureUrl ? String(identity.pictureUrl) : undefined,
        plan: "free",
        createdAt: Date.now(), // This is already a number (milliseconds since epoch)
      });
      return { success: true, message: "User created with Clerk username" };
    }
    
    // Update username if it's different
    if (user.username !== clerkUsername) {
      await ctx.db.patch(user._id, { 
        username: String(clerkUsername), // Ensure it's a string
      });
      return { success: true, message: "Username synced from Clerk to Convex" };
    }
    
    return { success: true, message: "Username already in sync" };
  },
});

/**
 * Simplified getUser function for use within other Convex functions
 */
export async function getUser(ctx: any) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    return null;
  }
  const clerkId = identity.subject;

  // Find the user in our database
  const user = await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q: any) => q.eq("clerkId", clerkId))
    .first();

  return user;
}
