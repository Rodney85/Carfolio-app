import { query } from "./_generated/server";
import { GenericQueryCtx, GenericActionCtx } from "convex/server";
import * as v from "convex/values";
import { FunctionReference } from "convex/server";

/**
 * Helper to define internal queries (not exposed to clients)
 * These can be called from other Convex functions but not from the client
 */
export function internalQuery<Args extends { [k: string]: v.Value }, Output>(
  queryConfig: {
    args: v.Validator<Args>;
    handler: (
      ctx: GenericQueryCtx<any>,
      args: Args
    ) => Promise<Output> | Output;
  }
) {
  // Use the imported query function to define an internal query
  return query({
    ...queryConfig,
    handler: queryConfig.handler,
  });
}

// No need for this type definition as it's now imported from convex/server
