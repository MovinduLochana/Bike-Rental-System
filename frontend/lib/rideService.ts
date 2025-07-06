import { Ride, Booking, RideData } from "@/types/rides";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUserRides(userId: number): Promise<Ride[]> {
  const response = await fetch(`${API_URL}/rides/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Failed to fetch rides" }));
    throw new Error(errorData.message || "Failed to fetch rides");
  }

  return response.json();
}

export async function getRideById(
  rideId: string,
  token: string
): Promise<Ride> {
  const response = await fetch(`${API_URL}/rides/${rideId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Failed to fetch ride" }));
    throw new Error(errorData.message || "Failed to fetch ride");
  }

  return response.json();
}

export async function startRide(rideId: string, token: string): Promise<Ride> {
  const response = await fetch(`${API_URL}/rides/${rideId}/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Failed to start ride" }));
    throw new Error(errorData.message || "Failed to start ride");
  }

  return response.json();
}

export async function endRide(rideId: string, token: string): Promise<Ride> {
  const response = await fetch(`${API_URL}/rides/${rideId}/end`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Failed to end ride" }));
    throw new Error(errorData.message || "Failed to end ride");
  }

  return response.json();
}

export async function getAllRides(): Promise<Ride[]> {
  const response = await fetch(`${API_URL}/rides`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Failed to fetch rides" }));
    throw new Error(errorData.message || "Failed to fetch rides");
  }

  return response.json();
}

export async function complete(rideId: number): Promise<boolean> {
  const res = await fetch(`${API_URL}/rides/complete/${rideId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) return true;
  
  return false;
}

// export async function createBooking(bookingData: BookingData): Promise<Booking> {
//   const response = await fetch(`${API_URL}/bookings`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     credentials: "include",
//     body: JSON.stringify(bookingData)
//   });

//   if (!response.ok) {
//     const errorData = await response.json().catch(() => ({ message: "Failed to create booking" }));
//     throw new Error(errorData.message || "Failed to create booking");
//   }

//   return response.json();
// }

export async function createRide(rideData: RideData): Promise<number> {
  const response = await fetch(`${API_URL}/rides/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(rideData),
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Failed to create booking" }));
    throw new Error(errorData.message || "Failed to create booking");
  }

  return response.json();
}

export async function getUserBookings(
  userId: string,
  token: string
): Promise<Booking[]> {
  const response = await fetch(`${API_URL}/rides/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Failed to fetch bookings" }));
    throw new Error(errorData.message || "Failed to fetch bookings");
  }

  return response.json();
}
