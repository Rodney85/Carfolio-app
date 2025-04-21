export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  bio: string;
  socialLinks: SocialLink[];
  theme: "dark" | "light";
  isPro: boolean;
  profileViews: number;
  createdAt: string;
  updatedAt: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface Analytics {
  profileViews: number;
  carClicks: Record<string, number>; // carId: clicks
  modClicks: Record<string, number>; // modId: clicks
} 