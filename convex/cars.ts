import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUser } from "./users";

/**
 * Get all cars belonging to the authenticated user
 */
export const getUserCars = query({
  args: {},
  handler: async (ctx) => {
    const user = await getUser(ctx, {});
    
    const cars = await ctx.db
      .query("cars")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .collect();
    
    return cars;
  },
});

/**
 * Get a specific car by ID
 */
export const getCarById = query({
  args: { carId: v.id("cars") },
  handler: async (ctx, args) => {
    const car = await ctx.db.get(args.carId);
    
    if (!car) {
      throw new Error("Car not found");
    }
    
    // If the car is not public, check if the user is the owner
    if (!car.isPublic) {
      const user = await getUser(ctx, {});
      
      if (car.userId !== user._id) {
        throw new Error("Not authorized to view this car");
      }
    }
    
    return car;
  },
});

/**
 * Create a new car
 */
export const createCar = mutation({
  args: {
    make: v.string(),
    model: v.string(),
    year: v.number(),
    title: v.string(),
    description: v.optional(v.string()),
    mainImageUrl: v.optional(v.string()),
    isPublic: v.boolean(),
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx, {});
    
    const now = Date.now();
    
    const carId = await ctx.db.insert("cars", {
      userId: user._id,
      make: args.make,
      model: args.model,
      year: args.year,
      title: args.title,
      description: args.description,
      mainImageUrl: args.mainImageUrl,
      createdAt: now,
      updatedAt: now,
      isPublic: args.isPublic,
      views: 0,
    });
    
    return carId;
  },
});

/**
 * Update an existing car
 */
export const updateCar = mutation({
  args: {
    carId: v.id("cars"),
    make: v.optional(v.string()),
    model: v.optional(v.string()),
    year: v.optional(v.number()),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    mainImageUrl: v.optional(v.string()),
    isPublic: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx, {});
    
    const car = await ctx.db.get(args.carId);
    
    if (!car) {
      throw new Error("Car not found");
    }
    
    if (car.userId !== user._id) {
      throw new Error("Not authorized to update this car");
    }
    
    await ctx.db.patch(args.carId, {
      ...(args.make !== undefined && { make: args.make }),
      ...(args.model !== undefined && { model: args.model }),
      ...(args.year !== undefined && { year: args.year }),
      ...(args.title !== undefined && { title: args.title }),
      ...(args.description !== undefined && { description: args.description }),
      ...(args.mainImageUrl !== undefined && { mainImageUrl: args.mainImageUrl }),
      ...(args.isPublic !== undefined && { isPublic: args.isPublic }),
      updatedAt: Date.now(),
    });
    
    return args.carId;
  },
});

/**
 * Delete a car
 */
export const deleteCar = mutation({
  args: {
    carId: v.id("cars"),
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx, {});
    
    const car = await ctx.db.get(args.carId);
    
    if (!car) {
      throw new Error("Car not found");
    }
    
    if (car.userId !== user._id) {
      throw new Error("Not authorized to delete this car");
    }
    
    await ctx.db.delete(args.carId);
    
    // TODO: Delete associated mods and media
    
    return args.carId;
  },
});
