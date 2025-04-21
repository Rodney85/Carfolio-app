// This is a temporary mock implementation for development
// Replace this with actual Convex integration later

// No imports needed for mock implementation

// Mock API implementation
export const api = {
  users: {
    getUser: "users:getUser",
    createOrUpdateUser: "users:createOrUpdateUser",
    internal: {
      getUserByClerkId: "users:internal.getUserByClerkId",
      createUser: "users:internal.createUser",
      updateUser: "users:internal.updateUser",
    }
  },
  cars: {
    getUserCars: "cars:getUserCars",
    getCarById: "cars:getCarById",
    createCar: "cars:createCar",
    updateCar: "cars:updateCar",
    deleteCar: "cars:deleteCar",
  }
};

// Mock implementation of useQuery
export function useQuery(queryName: string) {
  if (queryName === api.cars.getUserCars) {
    // Return empty array for car list
    return [];
  }
  return undefined;
}

// Mock implementation of useAction
export function useAction(actionName: string) {
  return async () => {
    console.log(`Action ${actionName} called`);
    return null;
  };
}
