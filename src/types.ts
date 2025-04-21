// We'll define our own Id type until Convex generates the proper types
type Id<T extends string> = { __brand: T; id: string };

export interface Car {
  _id: Id<"cars">;
  userId: Id<"users">;
  make: string;
  model: string;
  year: number;
  title: string;
  description?: string;
  mainImageUrl?: string;
  createdAt: number;
  updatedAt: number;
  isPublic: boolean;
  views: number;
}

export interface User {
  _id: Id<"users">;
  clerkId: string;
  email: string;
  name?: string;
  imageUrl?: string;
  username?: string;
  createdAt: number;
}

export interface Mod {
  _id: Id<"mods">;
  carId: Id<"cars">;
  userId: Id<"users">;
  title: string;
  description?: string;
  category: string;
  cost?: number;
  installDate?: number;
  imageUrl?: string;
  affiliateUrl?: string;
  createdAt: number;
  updatedAt: number;
}

export interface Media {
  _id: Id<"media">;
  userId: Id<"users">;
  carId?: Id<"cars">;
  modId?: Id<"mods">;
  type: string;
  url: string;
  thumbnailUrl?: string;
  caption?: string;
  createdAt: number;
}
