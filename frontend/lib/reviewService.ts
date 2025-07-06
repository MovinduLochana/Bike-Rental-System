import { Review, ReviewBike, ReviewData } from "@/types/reviews";
import { headers } from "./configs/apiConfig";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function getBikeReviews(bikeId: number): Promise<ReviewBike[]> {
  const response = await fetch(`${API_URL}/reviews/bike/${bikeId}`, {
    method: "GET",
    headers,
    credentials: "include",
  });

  

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Failed to fetch reviews" }));
    throw new Error(errorData.message || "Failed to fetch reviews");
  }

  return response.json();
}

export async function getUserReviews(userId: number): Promise<Review[]> {
  const response = await fetch(`${API_URL}/reviews/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Failed to fetch reviews" }));
    throw new Error(errorData.message || "Failed to fetch reviews");
  }

  return response.json();
}

export async function getAllReviews(): Promise<Review[]> {
  const response = await fetch(`${API_URL}/reviews`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Failed to fetch review" }));
    throw new Error(errorData.message || "Failed to fetch review");
  }

  return response.json();
}

// export async function createReview(reviewData: ReviewData): Promise<Review> {
//   // Create a FormData object to handle file uploads
//   const formData = new FormData();
//   formData.append('bike', reviewData.bike);
//   formData.append('user', reviewData.user);
//   formData.append('rating', reviewData.rating.toString());
//   formData.append('title', reviewData.title);
//   formData.append('content', reviewData.content);
  
//   // Add images if any
//   if (reviewData.images && reviewData.images.length > 0) {
//     reviewData.images.forEach((image, _) => {
//       formData.append(`images`, image);
//     });
//   }

//   console.log("FormData:", formData);
  
//   const response = await fetch(`${API_URL}/reviews`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//     credentials: "include",
//     body: formData
//   });

//   if (!response.ok) {
//     const errorData = await response.json().catch(() => ({ message: "Failed to create review" }));
//     throw new Error(errorData.message || "Failed to create review");
//   }

//   return response.json();
// }

export async function createReviewWithoutImage(reviewData: ReviewData): Promise<Review> {
  
  const response = await fetch(`${API_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(reviewData)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Failed to create review" }));
    throw new Error(errorData.message || "Failed to create review");
  }

  return response.json();
}