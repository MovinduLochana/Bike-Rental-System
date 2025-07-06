import { Bike, BikeCardProps } from "@/types/bikes";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllBikes(): Promise<BikeCardProps[]> {
  const response = await fetch(`${API_URL}/bikes`, {
    method: "GET",
    headers: {
          "Content-Type": "application/json",
    },
    //cache: "force-cache",
    //next: { revalidate: 30 },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Failed to fetch bikes" }));
    throw new Error(errorData.message || "Failed to fetch bikes");
  }

  return response.json();
}

export async function getAllBikesWithData(): Promise<Bike[]> {
  const response = await fetch(`${API_URL}/bikes/all`, {
    method: "GET",
    headers: {
          "Content-Type": "application/json",
    },
    cache: "force-cache",
    next: { revalidate: 120 },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Failed to fetch bikes" }));
    throw new Error(errorData.message || "Failed to fetch bikes");
  }

  return response.json();
}

export async function getBikeById(id: number): Promise<Bike> {
  const response = await fetch(`${API_URL}/bikes/${id}`, {
    method: "GET",
    headers: {
          "Content-Type": "application/json",
      },
      credentials: "include",
      cache: "force-cache",
      next: { revalidate: 3600 }, // 1 hour revalidation tags: id possile
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Failed to fetch bike" }));
    throw new Error(errorData.message || "Failed to fetch bike");
  }

  return response.json();
}

export async function searchBikes(params: Record<string, string>): Promise<BikeCardProps[]> {
  const queryString = new URLSearchParams(params).toString();
  
  const response = await fetch(`${API_URL}/bikes/search?${queryString}`, {
    method: "GET",
    headers: {
          "Content-Type": "application/json",
    },
    credentials: "include"
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Failed to search bikes" }));
    throw new Error(errorData.message || "Failed to search bikes");
  }

  return response.json();
}

export async function searchBikesByName(name: string) : Promise<Bike[]> {
  const queryParam = new URLSearchParams({ name }).toString();
  
  const response = await fetch(`${API_URL}/bikes/search?${queryParam}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
  },
    credentials: "include"
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Failed to search bikes" }));
    throw new Error(errorData.message || "Failed to search bikes");
  }

  return response.json();
}