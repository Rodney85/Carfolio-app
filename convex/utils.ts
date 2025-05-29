import { query, action, mutation } from "./_generated/server";
import { v } from "convex/values";

// Export standard Convex functions
export { query, action, mutation, v };

// Add internal function variants for internal files
// These are just aliases to the standard functions
export const internalQuery = query;
export const internalMutation = mutation;
