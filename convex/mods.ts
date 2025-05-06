import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUser } from "./users";
import { Id } from "./_generated/dataModel";

/**
 * Get all mods for a specific car
 */
export const getCarMods = query({
  args: { carId: v.id("cars") },
  handler: async (ctx, args) => {
    const car = await ctx.db.get(args.carId);
    
    if (!car) {
      throw new Error("Car not found");
    }
    
    // If the car is not public, check if the user is the owner
    if (!car.isPublic) {
      const user = await getUser(ctx);
      
      if (car.userId !== user._id) {
        throw new Error("Not authorized to view this car's mods");
      }
    }
    
    const mods = await ctx.db
      .query("mods")
      .withIndex("by_car", (q) => q.eq("carId", args.carId))
      .collect();
    
    return mods;
  },
});

/**
 * Create a new mod for a car
 */
export const createMod = mutation({
  args: {
    carId: v.id("cars"),
    title: v.string(),
    brand: v.optional(v.string()),
    category: v.string(),
    description: v.optional(v.string()),
    link: v.optional(v.string()),
    price: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);
    
    // Get the car to check ownership
    const car = await ctx.db.get(args.carId);
    
    if (!car) {
      throw new Error("Car not found");
    }
    
    if (car.userId !== user._id) {
      throw new Error("Not authorized to add mods to this car");
    }
    
    const now = Date.now();
    
    const modId = await ctx.db.insert("mods", {
      carId: args.carId,
      title: args.title,
      brand: args.brand,
      category: args.category,
      description: args.description,
      link: args.link,
      price: args.price,
      clicks: 0,
      createdAt: now,
      updatedAt: now,
    });
    
    return modId;
  },
});

/**
 * Update an existing mod
 */
export const updateMod = mutation({
  args: {
    modId: v.id("mods"),
    title: v.optional(v.string()),
    brand: v.optional(v.string()),
    category: v.optional(v.string()),
    description: v.optional(v.string()),
    link: v.optional(v.string()),
    price: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);
    
    const mod = await ctx.db.get(args.modId);
    
    if (!mod) {
      throw new Error("Mod not found");
    }
    
    // Get the car to check ownership
    const car = await ctx.db.get(mod.carId);
    
    if (!car) {
      throw new Error("Car not found");
    }
    
    if (car.userId !== user._id) {
      throw new Error("Not authorized to update this mod");
    }
    
    await ctx.db.patch(args.modId, {
      ...(args.title !== undefined && { title: args.title }),
      ...(args.brand !== undefined && { brand: args.brand }),
      ...(args.category !== undefined && { category: args.category }),
      ...(args.description !== undefined && { description: args.description }),
      ...(args.link !== undefined && { link: args.link }),
      ...(args.price !== undefined && { price: args.price }),
      updatedAt: Date.now(),
    });
    
    return args.modId;
  },
});

/**
 * Delete a mod
 */
export const deleteMod = mutation({
  args: {
    modId: v.id("mods"),
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);
    
    const mod = await ctx.db.get(args.modId);
    
    if (!mod) {
      throw new Error("Mod not found");
    }
    
    // Get the car to check ownership
    const car = await ctx.db.get(mod.carId);
    
    if (!car) {
      throw new Error("Car not found");
    }
    
    if (car.userId !== user._id) {
      throw new Error("Not authorized to delete this mod");
    }
    
    await ctx.db.delete(args.modId);
    
    return args.modId;
  },
});

/**
 * Track a mod click for analytics
 */
export const trackModClick = mutation({
  args: {
    modId: v.id("mods"),
  },
  handler: async (ctx, args) => {
    const mod = await ctx.db.get(args.modId);
    
    if (!mod) {
      throw new Error("Mod not found");
    }
    
    // Increment the clicks counter
    await ctx.db.patch(args.modId, {
      clicks: (mod.clicks || 0) + 1,
    });
    
    // Get the car to record analytics
    const car = await ctx.db.get(mod.carId);
    
    if (!car) {
      throw new Error("Car not found");
    }
    
    // Record the analytics event
    await ctx.db.insert("analytics", {
      userId: car.userId as Id<"users">,
      metric: "mod_clicks",
      value: 1,
      timestamp: Date.now(),
      carId: car._id,
      modId: mod._id,
    });
    
    return true;
  },
});
