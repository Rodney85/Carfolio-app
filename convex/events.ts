import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

/**
 * Log an event (profile view, car view, link click, etc.)
 */
export const logEvent = mutation({
  args: {
    eventType: v.string(),
    carId: v.optional(v.id("cars")),
    modId: v.optional(v.id("mods")),
    referrer: v.optional(v.string()),
    userAgent: v.optional(v.string()),
  },
  handler: async (
    ctx,
    { eventType, carId, modId, referrer, userAgent }
  ) => {
    // Get the authenticated user
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), identity.subject))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    // Store event data in the analytics table
    return await ctx.db.insert("analytics", {
      userId: user._id,
      metric: eventType,
      carId,
      modId,
      value: 1,
      timestamp: Date.now(),
    });
  },
});

/**
 * Public event logging for unauthenticated users
 */
export const logPublicEvent = mutation({
  args: {
    username: v.string(),
    eventType: v.string(),
    referrer: v.optional(v.string()),
    userAgent: v.optional(v.string()),
  },
  handler: async (
    ctx,
    { username, eventType, referrer, userAgent }
  ) => {
    // Find the user by username
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("username"), username))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    // Log the event
    return await ctx.db.insert("analytics", {
      userId: user._id,
      metric: eventType,
      timestamp: Date.now(),
      value: 1,
    });
  },
});

/**
 * Get analytics summary for the last 30 days
 */
export const getAnalyticsSummary = query({
  handler: async (ctx) => {
    // Get the authenticated user
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), identity.subject))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    const now = Date.now();
    const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
    
    // Get profile views
    const profileViews = await ctx.db
      .query("analytics")
      .filter((q) => 
        q.and(
          q.eq(q.field("userId"), user._id),
          q.eq(q.field("metric"), "profile_views"),
          q.gte(q.field("timestamp"), thirtyDaysAgo)
        )
      )
      .collect()
      .then(items => items.reduce((sum: number, item: any) => sum + (item.value || 0), 0));

    // Get car views
    const carViews = await ctx.db
      .query("analytics")
      .filter((q) => 
        q.and(
          q.eq(q.field("userId"), user._id),
          q.eq(q.field("metric"), "car_views"),
          q.gte(q.field("timestamp"), thirtyDaysAgo)
        )
      )
      .collect()
      .then(items => items.reduce((sum: number, item: any) => sum + (item.value || 0), 0));
      
    // Get link clicks
    const linkClicks = await ctx.db
      .query("analytics")
      .filter((q) => 
        q.and(
          q.eq(q.field("userId"), user._id),
          q.eq(q.field("metric"), "link_clicks"),
          q.gte(q.field("timestamp"), thirtyDaysAgo)
        )
      )
      .collect()
      .then(items => items.reduce((sum: number, item: any) => sum + (item.value || 0), 0));
      
    return {
      profileViews,
      carViews,
      linkClicks,
      period: "last30days"
    };
  },
});
