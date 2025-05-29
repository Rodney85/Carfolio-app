import { internalMutation, internalQuery } from "./utils";
import { v } from "convex/values";

/**
 * Get a car by its ID
 */
export const getCarById = internalQuery({
  args: { carId: v.id("cars") },
  handler: async (ctx, { carId }) => {
    const car = await ctx.db.get(carId);
    return car;
  },
});
