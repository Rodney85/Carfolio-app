import { v } from "convex/values";
import { mutation, query, action } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { internalQuery } from "./util";
import { api } from "./_generated/api";

// Interface for the user returned from getUserQuery
interface User {
  _id: Id<"users">;
  clerkId: string;
  email: string;
  name?: string;
  createdAt: number;
}

// Type for the upload URL response
interface UploadUrlResponse {
  uploadUrl: string;
  fileKey: string;
}

/**
 * Get all media for a car
 */
export const getCarMedia = query({
  args: {
    carId: v.id("cars"),
  },
  handler: async (ctx, args) => {
    const media = await ctx.db
      .query("media")
      .withIndex("by_car", (q) => q.eq("carId", args.carId))
      .collect();
    
    return media;
  },
});

/**
 * Helper query to get car by ID (internal use)
 */
export const getCarById = query({
  args: {
    carId: v.id("cars"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.carId);
  },
});

/**
 * Generate a signed upload URL for Backblaze B2
 */
export const generateUploadUrl = action({
  args: {
    carId: v.id("cars"),
    fileName: v.string(),
    fileType: v.string(),
  },
  handler: async (ctx, args): Promise<UploadUrlResponse> => {
    // Since we can't directly access the database in an action,
    // we need to use a separate query for auth checks
    
    // In a real implementation, we would need to use registered actions/queries
    // For now, we'll simplify this to avoid TypeScript errors
    
    // Mock car data for development
    const car = {
      _id: args.carId,
      userId: "user_123" as Id<"users">,
      title: "Test Car"
    };
    
    if (!car) {
      throw new Error("Car not found or access denied");
    }
    
    // Generate a unique file key
    const fileKey: string = `${car.userId}/${args.carId}/${Date.now()}-${args.fileName}`;
    
    // TODO: Implement Backblaze B2 integration
    // For now, return a mock URL
    return {
      uploadUrl: "https://backblaze-mock-upload-url.com",
      fileKey,
    };
  },
});

/**
 * Save media metadata after upload
 */
export const saveMedia = mutation({
  args: {
    carId: v.id("cars"),
    url: v.string(),
    type: v.string(),
    isMain: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // Check if user has permission to add media to this car
    const car = await ctx.db.get(args.carId);
    
    if (!car) {
      throw new Error("Car not found");
    }
    
    // TODO: Add proper auth check here
    
    // Create the media record
    const mediaId = await ctx.db.insert("media", {
      carId: args.carId,
      url: args.url,
      type: args.type,
      uploadedAt: Date.now(),
    });
    
    // If this is the main image, update the car
    if (args.isMain) {
      await ctx.db.patch(args.carId, {
        mainImageUrl: args.url,
      });
    }
    
    return mediaId;
  },
});

/**
 * Delete media
 */
export const deleteMedia = mutation({
  args: {
    mediaId: v.id("media"),
  },
  handler: async (ctx, args) => {
    // Get the media
    const media = await ctx.db.get(args.mediaId);
    
    if (!media) {
      throw new Error("Media not found");
    }
    
    // Get the car to check ownership
    const car = await ctx.db.get(media.carId);
    
    if (!car) {
      throw new Error("Car not found");
    }
    
    // TODO: Add proper auth check here
    
    // Delete the media record
    await ctx.db.delete(args.mediaId);
    
    // If this was the car's main image, update the car
    if (car.mainImageUrl === media.url) {
      // Find another image to use as main image, or set to empty string
      const otherMedia = await ctx.db
        .query("media")
        .withIndex("by_car", (q) => q.eq("carId", car._id))
        .filter((q) => q.neq(q.field("_id"), args.mediaId))
        .first();
      
      await ctx.db.patch(car._id, {
        mainImageUrl: otherMedia ? otherMedia.url : "",
      });
    }
    
    return true;
  },
});

/**
 * Set a media as the main image for a car
 */
export const setAsMainImage = mutation({
  args: {
    mediaId: v.id("media"),
  },
  handler: async (ctx, args) => {
    // Get the media
    const media = await ctx.db.get(args.mediaId);
    
    if (!media) {
      throw new Error("Media not found");
    }
    
    // Get the car to check ownership
    const car = await ctx.db.get(media.carId);
    
    if (!car) {
      throw new Error("Car not found");
    }
    
    // TODO: Add proper auth check here
    
    // Update the car's main image
    await ctx.db.patch(car._id, {
      mainImageUrl: media.url,
    });
    
    return true;
  },
});
