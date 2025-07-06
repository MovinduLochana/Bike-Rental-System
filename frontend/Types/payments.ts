// import { Availability } from "./bikes";

export type Payment = {
  ride: number;
  amount: number;
  paymentMethod: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  transactionId: number;
  timestamp: string;
};

export type PaymentData = {
    ride: {
      id: number;
    },
    amount: number;
    paymentMethod: string;
    cardNumber: number;
    cardExpiry: string;
    cardCvv: string;
}