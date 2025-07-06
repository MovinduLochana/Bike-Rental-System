type BikeType = "ALL" | "SPORT" | "NAKED" | "CRUISER" | "STREET";
type Availability = "ALL" | "AVAILABLE" | "RENTED" | "UNAVAILABLE" | "MAINTENANCE";
type SortOption = "price-low" | "price-high" | "rating" | "popularity";

// change engineCapacity to number and add CC in component
type Bike = {
    id: number;
    name: string;
    model: string;
    image: string;
    pricePerDay: number;
    availability: Availability;
    engineCapacity?: string;
    bikeType: BikeType;
    rating: number;
    reviewCount: number;
    fuelCapacity?: string;
    description?: string;
    specifications?: Record<string, string>;
    features?: string[];
}

type BikeCardProps = {
    id: number;
    name: string;
    model: string;
    image: string;
    pricePerDay: number;
    availability: Availability;
    engineCapacity: string;
    bikeType: BikeType;
    reviewCount: number;
    rating: number;
}

type BikeData = {
    id: number;
    name: string;
    model: string;
    image: string;
    pricePerDay: number;
    availability: Availability;
    engineCapacity: string;
    bikeType: BikeType;
    reviewCount: number;
    rating: number;
    
}

export type { Bike, BikeType, Availability, SortOption, BikeCardProps, BikeData };