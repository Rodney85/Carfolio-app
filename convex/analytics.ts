import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUser } from "./users";
import { Doc, Id } from "./_generated/dataModel";

type AnalyticsMetric = "profile_views" | "car_views" | "link_clicks";
type TimeSeriesData = { date: string; value: number }[];
type TrafficSource = { source: string; count: number }[];

/**
 * Track a profile view
 */
export const trackProfileView = mutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, { userId }) => {
    const user = await ctx.db.get(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Track the profile view in the analytics table
    await ctx.db.insert("analytics", {
      userId,
      metric: "profile_views",
      value: 1,
      timestamp: Date.now(),
    });

    return { success: true };
  },
});

/**
 * Track a car view
 */
export const trackCarView = mutation({
  args: {
    carId: v.id("cars"),
  },
  handler: async (ctx, args) => {
    const car = await ctx.db.get(args.carId);
    
    if (!car) {
      throw new Error("Car not found");
    }
    
    // Increment the car's view count
    await ctx.db.patch(args.carId, {
      views: (car.views || 0) + 1,
    });
    
    // Record the analytics event
    await ctx.db.insert("analytics", {
      userId: car.userId as Id<"users">,
      metric: "car_views",
      value: 1,
      timestamp: Date.now(),
      carId: car._id,
    });
    
    return true;
  },
});

/**
 * Get traffic sources
 */
export const getTrafficSources = query({
  args: {
    startDate: v.number(),
    endDate: v.number(),
  },
  handler: async (ctx, { startDate, endDate }) => {
    // Get the authenticated user
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const user = await getUser(ctx);

    // This is just a placeholder implementation since the schema might not
    // actually track referrers yet
    const sources: TrafficSource = [
      { source: "Direct", count: 45 },
      { source: "Google", count: 30 },
      { source: "Social Media", count: 15 },
      { source: "Other", count: 10 },
    ];

    return sources;
  },
});

/**
 * Get time series data for a specific metric
 */
export const getMetricTimeSeries = query({
  args: {
    metric: v.string(),
    carId: v.optional(v.id("cars")),
    modId: v.optional(v.id("mods")),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
    interval: v.optional(v.string()), // "daily", "weekly", "monthly"
  },
  handler: async (ctx, { metric, carId, modId, startDate, endDate, interval }) => {
    const user = await getUser(ctx);
    
    // Default to last 30 days
    const now = Date.now();
    const start = startDate ?? now - 30 * 24 * 60 * 60 * 1000;
    const end = endDate ?? now;
    
    // Get analytics data
    let query = ctx.db
      .query("analytics")
      .withIndex("by_user_and_metric", (q) => 
        q.eq("userId", user._id as Id<"users">).eq("metric", metric)
      )
      .filter((q) => 
        q.and(
          q.gte(q.field("timestamp"), start),
          q.lte(q.field("timestamp"), end)
        )
      );
    
    // Filter by car if provided
    if (carId) {
      query = query.filter((q) => q.eq(q.field("carId"), carId));
    }
    
    // Filter by mod if provided
    if (modId) {
      query = query.filter((q) => q.eq(q.field("modId"), modId));
    }
    
    const analytics = await query.collect();
    
    // Group by date
    const groupedByDate: Record<string, number> = {};
    
    for (const entry of analytics) {
      const date = new Date(entry.timestamp);
      const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD
      groupedByDate[dateStr] = (groupedByDate[dateStr] || 0) + entry.value;
    }
    
    // Convert to time series format
    const timeSeries: TimeSeriesData = Object.entries(groupedByDate)
      .map(([date, value]) => ({ date, value }))
      .sort((a, b) => a.date.localeCompare(b.date));
    
    return timeSeries;
  },
});

/**
 * Get dashboard analytics
          totalViews += analytic.value;
        }
      }
    }
    
    // Calculate percentages and CTR
    for (const carId in carAnalytics) {
      if (totalViews > 0) {
        carAnalytics[carId].percentageOfTotal = (carAnalytics[carId].views / totalViews) * 100;
      }
      
      if (totalProfileViews > 0) {
        carAnalytics[carId].ctr = (carAnalytics[carId].views / totalProfileViews) * 100;
      }
    }
    
    return Object.values(carAnalytics).sort((a, b) => b.views - a.views);
  },
});

/**
 * Get affiliate link analytics
 */
export const getAffiliateLinkAnalytics = query({
  args: {
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
    carId: v.optional(v.id("cars")),
  },
  handler: async (ctx, { startDate, endDate, carId }) => {
    const user = await getUser(ctx);
    
    // Default to last 30 days
    const now = Date.now();
    const start = startDate ?? now - 30 * 24 * 60 * 60 * 1000;
    const end = endDate ?? now;
    
    // Get link click analytics
    let query = ctx.db
      .query("analytics")
      .withIndex("by_user_and_metric", (q) => 
        q.eq("userId", user._id as Id<"users">).eq("metric", "link_click")
      )
      .filter((q) => 
        q.and(
          q.gte(q.field("timestamp"), start),
          q.lte(q.field("timestamp"), end)
        )
      );
    
    // Filter by car if provided
    if (carId) {
      query = query.filter((q) => q.eq(q.field("carId"), carId));
    }
    
    const linkClickAnalytics = await query.collect();
    
    // Fetch all necessary mods
    const modIds = [...new Set(linkClickAnalytics
      .map(a => a.modId)
      .filter((id): id is Id<"mods"> => id !== undefined))];
    
    const mods = await Promise.all(
      modIds.map(id => ctx.db.get(id))
    );
    
    const modsById = mods.reduce<Record<string, Doc<"mods">>>((acc, mod) => {
      if (mod) acc[mod._id.toString()] = mod;
      return acc;
    }, {});
    
    // Fetch all necessary cars
    const carIds = [...new Set(linkClickAnalytics
      .map(a => a.carId)
      .filter((id): id is Id<"cars"> => id !== undefined))];
    
    const carsData = await Promise.all(
      carIds.map(id => ctx.db.get(id))
    );
    
    const carsById = carsData.reduce<Record<string, Doc<"cars">>>((acc, car) => {
      if (car) acc[car._id.toString()] = car;
      return acc;
    }, {});
    
    // Group click data by mod
    const linkAnalytics: Record<string, {
      modId: Id<"mods">,
      title: string,
      brand: string,
      category: string,
      link: string,
      carId: Id<"cars">,
      carTitle: string,
      clicks: number,
      price?: number,
      potentialRevenue?: number,
    }> = {};
    
    // Group analytics by mod
    for (const analytic of linkClickAnalytics) {
      if (analytic.modId) {
        const modIdStr = analytic.modId.toString();
        const mod = modsById[modIdStr];
        const car = analytic.carId ? carsById[analytic.carId.toString()] : undefined;
        
        if (mod) {
          if (!linkAnalytics[modIdStr]) {
            linkAnalytics[modIdStr] = {
              modId: mod._id,
              title: mod.title,
              brand: mod.brand || 'Unknown',
              category: mod.category,
              link: mod.link || '#',
              carId: mod.carId,
              carTitle: car?.title || 'Unknown Car',
              clicks: 0,
              price: mod.price,
              // Assuming 5% affiliate commission if price is available
              potentialRevenue: mod.price ? mod.price * 0.05 : undefined,
            };
          }
          
          linkAnalytics[modIdStr].clicks += analytic.value;
          
          // Update potential revenue based on clicks
          if (mod.price) {
            linkAnalytics[modIdStr].potentialRevenue = 
              (mod.price * 0.05) * linkAnalytics[modIdStr].clicks;
          }
        }
      }
    }
    
    return Object.values(linkAnalytics).sort((a, b) => b.clicks - a.clicks);
  },
});

/**
 * Get summary analytics for the dashboard
 */
export const getDashboardAnalytics = query({
  args: {
    days: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);
    
    // Default to 7 days if not specified
    const days = args.days || 7;
    const startDate = Date.now() - (days * 24 * 60 * 60 * 1000);
    
    // Get all analytics for the user in the specified time range
    const analytics = await ctx.db
      .query("analytics")
      .withIndex("by_user", (q) => q.eq("userId", user._id as Id<"users">))
      .filter((q) => q.gte(q.field("timestamp"), startDate))
      .collect();
    
    // Get all cars for the user
    const cars = await ctx.db
      .query("cars")
      .withIndex("by_user", (q) => q.eq("userId", user._id as Id<"users">))
      .collect();
    
    // Calculate summary metrics
    const summary: {
      profileViews: number;
      carViews: number;
      modClicks: number;
      totalCars: number;
      growth: {
        profileViews: number;
        carViews: number;
        modClicks: number;
      };
    } = {
      profileViews: 0,
      carViews: 0,
      modClicks: 0,
      totalCars: cars.length,
      // Calculate growth compared to previous period
      growth: {
        profileViews: 0,
        carViews: 0,
        modClicks: 0,
      },
    };
    
    // Group analytics by metric
    analytics.forEach((analytic) => {
      if (analytic.metric === "profile_views") {
        summary.profileViews += analytic.value;
      } else if (analytic.metric === "car_views") {
        summary.carViews += analytic.value;
      } else if (analytic.metric === "mod_clicks") {
        summary.modClicks += analytic.value;
      }
    });
    
    // Get previous period analytics for growth calculation
    const previousStartDate = startDate - (days * 24 * 60 * 60 * 1000);
    const previousAnalytics = await ctx.db
      .query("analytics")
      .withIndex("by_user", (q) => q.eq("userId", user._id as Id<"users">))
      .filter((q) => 
        q.and(
          q.gte(q.field("timestamp"), previousStartDate),
          q.lt(q.field("timestamp"), startDate)
        )
      )
      .collect();
    
    // Calculate previous period metrics
    const previousSummary: {
      profileViews: number;
      carViews: number;
      modClicks: number;
    } = {
      profileViews: 0,
      carViews: 0,
      modClicks: 0,
    };
    
    previousAnalytics.forEach((analytic) => {
      if (analytic.metric === "profile_views") {
        previousSummary.profileViews += analytic.value;
      } else if (analytic.metric === "car_views") {
        previousSummary.carViews += analytic.value;
      } else if (analytic.metric === "mod_clicks") {
        previousSummary.modClicks += analytic.value;
      }
    });
    
    // Calculate growth percentages
    if (previousSummary.profileViews > 0) {
      summary.growth.profileViews = ((summary.profileViews - previousSummary.profileViews) / previousSummary.profileViews) * 100;
    }
    
    if (previousSummary.carViews > 0) {
      summary.growth.carViews = ((summary.carViews - previousSummary.carViews) / previousSummary.carViews) * 100;
    }
    
    if (previousSummary.modClicks > 0) {
      summary.growth.modClicks = ((summary.modClicks - previousSummary.modClicks) / previousSummary.modClicks) * 100;
    }
    
    return summary;
  },
});
