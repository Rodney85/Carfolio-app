import { ModCategory } from "./car";

export interface Mod {
  id: string;
  carId: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  category: ModCategory;
  affiliateLink?: string;
  image?: string;
  clicks: number;
  createdAt: string;
  updatedAt: string;
} 