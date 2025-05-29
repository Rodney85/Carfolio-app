import { internalMutation, internalQuery } from "./utils";
import { v } from "convex/values";

/**
 * Get a user by their Clerk ID
 */
export const getUserByClerkId = internalQuery({
  args: { clerkId: v.string() },
  handler: async (ctx, { clerkId }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
      .first();
    return user;
  },
});
