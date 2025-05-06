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
    // User's bio or description (optional)
    bio: v.optional(v.string()),
    // User's plan (free or pro)
    plan: v.optional(v.string()),
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
    // Additional media URLs (photos and videos)
    mediaUrls: v.optional(v.array(v.string())),
    // YouTube video URLs
    youtubeUrls: v.optional(v.array(v.string())),
    // Is the car profile public?
    isPublic: v.boolean(),
    // Timestamp for when the car was created
    createdAt: v.number(),
    // Timestamp for when the car was last updated
    updatedAt: v.number(),
    // View count
    views: v.optional(v.number()),
    // Car status (e.g., "Project", "Completed", "For Sale")
    status: v.optional(v.string()),
  })
  .index("by_user", ["userId"]),

  // Mods table for storing car modifications
  mods: defineTable({
    // Car ID this mod belongs to
    carId: v.id("cars"),
    // Mod title/name
    title: v.string(),
    // Mod brand
    brand: v.optional(v.string()),
    // Mod category (e.g., "Engine", "Suspension", "Wheels")
    category: v.string(),
    // Mod description
    description: v.optional(v.string()),
    // Affiliate link for the mod
    link: v.optional(v.string()),
    // Price of the mod
    price: v.optional(v.number()),
    // Click count for analytics
    clicks: v.optional(v.number()),
    // Timestamp for when the mod was created
    createdAt: v.number(),
    // Timestamp for when the mod was last updated
    updatedAt: v.optional(v.number()),
  })
  .index("by_car", ["carId"]),

  // Media table for storing car images and videos
  media: defineTable({
    // Car ID this media belongs to
    carId: v.id("cars"),
    // Media URL (from Backblaze B2)
    url: v.string(),
    // Media type ("image" or "video")
    type: v.string(),
    // Timestamp for when the media was uploaded
    uploadedAt: v.number(),
  })
  .index("by_car", ["carId"]),

  // Analytics table for storing user and car analytics
  analytics: defineTable({
    // User ID this analytic belongs to
    userId: v.id("users"),
    // Metric name (e.g., "profile_views", "car_clicks", "mod_clicks")
    metric: v.string(),
    // Metric value
    value: v.number(),
    // Timestamp for when the analytic was recorded
    timestamp: v.number(),
    // Optional car ID if the analytic is related to a specific car
    carId: v.optional(v.id("cars")),
    // Optional mod ID if the analytic is related to a specific mod
    modId: v.optional(v.id("mods")),
  })
  .index("by_user", ["userId"])
  .index("by_user_and_metric", ["userId", "metric"])
  .index("by_car", ["carId"]),

  // Events table for raw event logging before aggregation
  events: defineTable({
    // User ID this event belongs to
    userId: v.id("users"),
    // Event type ("profile_view", "car_view", "link_click")
    eventType: v.string(),
    // Timestamp for when the event occurred
    timestamp: v.number(),
    // Optional car ID if the event is related to a specific car
    carId: v.optional(v.id("cars")),
    // Optional mod ID if the event is related to a specific mod
    modId: v.optional(v.id("mods")),
    // Optional referrer source (e.g., "instagram", "tiktok", "direct")
    referrer: v.optional(v.string()),
    // Optional user agent for device tracking
    userAgent: v.optional(v.string()),
  })
  .index("by_user", ["userId"])
  .index("by_event_type", ["eventType"])
  .index("by_timestamp", ["timestamp"])
  .index("by_user_and_event", ["userId", "eventType"]),
});
