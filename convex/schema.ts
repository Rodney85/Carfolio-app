import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Define the schema for the database
export default defineSchema({
  // Users table for storing user data
  users: defineTable({
    // Clerk user ID
    clerkId: v.string(),
    // User's email address
    email: v.string(),
    // User's name (optional)
    name: v.optional(v.string()),
    // User's profile image URL (optional)
    imageUrl: v.optional(v.string()),
    // User's username (optional)
    username: v.optional(v.string()),
    // Timestamp for when the user was created
    createdAt: v.number(),
  })
  .index("by_clerk_id", ["clerkId"]),
  
  // Cars table for storing car data
  cars: defineTable({
    // User ID who owns this car
    userId: v.string(),
    // Car title/name
    title: v.string(),
    // Car make
    make: v.string(),
    // Car model
    model: v.string(),
    // Car year
    year: v.number(),
    // Car description
    description: v.optional(v.string()),
    // Main image URL
    mainImageUrl: v.optional(v.string()),
    // Is the car profile public?
    isPublic: v.boolean(),
    // Timestamp for when the car was created
    createdAt: v.number(),
    // Timestamp for when the car was last updated
    updatedAt: v.number(),
    // View count
    views: v.optional(v.number()),
  })
  .index("by_user", ["userId"]),
});
