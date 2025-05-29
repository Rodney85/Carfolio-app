import { z } from "zod";
import { ModCategory } from "../../types/car";

// Basic car information validation schema
export const carBasicInfoSchema = z.object({
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.number().int().min(1885, "Year must be after 1885").max(new Date().getFullYear() + 1, "Year cannot be in the future"),
  title: z.string().min(1, "Title/nickname is required"),
  status: z.enum(["Building", "Completed", "For Sale"]),
  description: z.string().optional(),
});

// Mod item validation schema
export const modItemSchema = z.object({
  category: z.string() as z.ZodType<ModCategory>,
  name: z.string().min(1, "Mod name is required"),
  brand: z.string().optional(),
  description: z.string().optional(),
  price: z.number().nonnegative().optional(),
  productLink: z.string().url().optional().or(z.literal("")),
});

// Media validation schema
export const mediaSchema = z.object({
  mediaUrls: z.array(z.string().url()),
  youtubeUrls: z.array(
    z.string()
      .url()
      .refine(
        (url) => url.includes("youtube.com") || url.includes("youtu.be"),
        "Must be a valid YouTube URL"
      )
  ),
  mainImageUrl: z.string().url().optional(),
});

// Complete car form validation schema
export const carFormSchema = carBasicInfoSchema.extend({
  mods: z.array(modItemSchema).optional().default([]),
  ...mediaSchema.shape,
  isPublic: z.boolean().default(true),
});

// Type definitions
export type CarBasicInfo = z.infer<typeof carBasicInfoSchema>;
export type ModItem = z.infer<typeof modItemSchema>;
export type CarMedia = z.infer<typeof mediaSchema>;
export type CarFormData = z.infer<typeof carFormSchema>;
