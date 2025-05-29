import { Car } from '../types/car';

export const mockCars: Car[] = [
  {
    id: '1',
    userId: 'user-1',
    year: 2020,
    make: 'Toyota',
    model: 'Supra MK5',
    horsepower: 500,
    description: 'Built for track days and weekend spirited driving. Light modifications focused on handling and power balance.',
    images: ['https://images.unsplash.com/photo-1621135802920-933968d97c4e?q=80&w=800&auto=format&fit=crop'],
    videoUrls: [],
    mods: [
      { id: 'mod-1', carId: '1', category: 'Engine', name: 'Downpipe', brand: 'HKS', description: 'High-flow downpipe for increased exhaust flow', affiliateLink: 'https://example.com/1', price: 799, clicks: 32, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'mod-2', carId: '1', category: 'Suspension', name: 'Coilovers', brand: 'KW', description: 'Height adjustable suspension for improved handling', affiliateLink: 'https://example.com/2', price: 2499, clicks: 45, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'mod-3', carId: '1', category: 'Wheels', name: 'Forged Wheels', brand: 'Volk Racing', description: 'Lightweight forged wheels for reduced unsprung weight', affiliateLink: 'https://example.com/3', price: 3800, clicks: 67, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
    ],
    clicks: 420,
    createdAt: new Date(2024, 8, 15).toISOString(),
    updatedAt: new Date(2025, 3, 20).toISOString()
  },
  {
    id: '2',
    userId: 'user-1',
    year: 2022, 
    make: 'BMW',
    model: 'M4 Competition',
    horsepower: 650,
    description: 'Daily driver with extensive cosmetic mods and moderate performance upgrades for balanced street performance.',
    images: ['https://images.unsplash.com/photo-1607853554439-0069ec0f29b6?q=80&w=800&auto=format&fit=crop'],
    videoUrls: [],
    mods: [
      { id: 'mod-4', carId: '2', category: 'Engine', name: 'Intake System', brand: 'Eventuri', description: 'Carbon fiber intake system for improved air flow', affiliateLink: 'https://example.com/4', price: 1200, clicks: 28, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'mod-5', carId: '2', category: 'Exterior', name: 'Carbon Fiber Hood', brand: 'Seibon', description: 'Lightweight carbon hood for weight reduction', affiliateLink: 'https://example.com/5', price: 1800, clicks: 54, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'mod-6', carId: '2', category: 'Electronics', name: 'ECU Tune', brand: 'Bootmod3', description: 'Performance tune for increased power', affiliateLink: 'https://example.com/6', price: 650, clicks: 72, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
    ],
    clicks: 315,
    createdAt: new Date(2024, 10, 5).toISOString(),
    updatedAt: new Date(2025, 4, 10).toISOString()
  },
  {
    id: '3',
    userId: 'user-1',
    year: 2014,
    make: 'Subaru',
    model: 'WRX STI',
    horsepower: 420,
    description: 'Rally-inspired all-weather build. Built for weekend mountain runs and occasional track days.',
    images: ['https://images.unsplash.com/photo-1600706432502-77a0e2e5ae30?q=80&w=800&auto=format&fit=crop'],
    videoUrls: [],
    mods: [
      { id: 'mod-7', carId: '3', category: 'Engine', name: 'Turbo Upgrade', brand: 'Blouch', description: 'Larger turbocharger for increased boost and power', affiliateLink: 'https://example.com/7', price: 1600, clicks: 41, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'mod-8', carId: '3', category: 'Suspension', name: 'Coilovers', brand: 'Fortune Auto', description: 'Height and damping adjustable suspension', affiliateLink: 'https://example.com/8', price: 1899, clicks: 38, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'mod-9', carId: '3', category: 'Wheels', name: 'Wheels', brand: 'Method Race', description: 'Durable rally-inspired wheels', affiliateLink: 'https://example.com/9', price: 1400, clicks: 47, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
    ],
    clicks: 580,
    createdAt: new Date(2024, 7, 22).toISOString(),
    updatedAt: new Date(2025, 2, 15).toISOString()
  }
];

export const getCarById = (id: string): Car | undefined => {
  return mockCars.find(car => car.id === id);
};

export const getCarsByUserId = (userId: string): Car[] => {
  return mockCars.filter(car => car.userId === userId);
};
