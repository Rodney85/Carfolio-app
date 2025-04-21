export interface Car {
  id: string;
  userId: string;
  year: number;
  make: string;
  model: string;
  horsepower: number;
  description: string;
  images: string[];
  videoUrls: string[];
  mods: Mod[];
  clicks: number;
  createdAt: string;
  updatedAt: string;
}

export type ModCategory = 
  | "Engine"
  | "Suspension"
  | "Wheels"
  | "Exterior"
  | "Interior"
  | "Electronics"
  | "Other"; 