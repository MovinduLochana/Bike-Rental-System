import { Payment, PaymentData } from "@/types/payments";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function processPayment(paymentData: PaymentData): Promise<Payment> {
  console.log(paymentData)
  const response = await fetch(`${API_URL}/payments/process`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(paymentData)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Payment failed" }));
    throw new Error(errorData.message || "Payment failed");
  }

  return response.json();
}

export async function getUserPayments(userId: string): Promise<Payment[]> {
  const response = await fetch(`${API_URL}/payments/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Failed to fetch payments" }));
    throw new Error(errorData.message || "Failed to fetch payments");
  }

  return response.json();
}

export async function getPaymentById(paymentId: string): Promise<Payment> {
  const response = await fetch(`${API_URL}/payments/${paymentId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Failed to fetch payment" }));
    throw new Error(errorData.message || "Failed to fetch payment");
  }

  return response.json();
}