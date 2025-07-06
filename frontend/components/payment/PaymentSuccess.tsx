import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Button } from "../ui/button";
import { Check, BikeIcon } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns/format";

type PaymentSuccessProps = {
  bikeName: string;
  pickupLocation: string;
  startDate: Date;
  endDate: Date;
  email: string;
  totalAmount: number;
};

export default function PaymentSuccess({
  bikeName,
  pickupLocation,
  startDate,
  endDate,
  email,
  totalAmount
}: PaymentSuccessProps) {
  return (
    <Card className="border-green-100">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <CardTitle className="text-2xl text-green-700">
          Payment Successful!
        </CardTitle>
        <CardDescription>Your booking has been confirmed</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-4">
            <BikeIcon className="h-5 w-5 text-gray-600 mr-2" />
            <h3 className="text-lg font-medium">Booking Details</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Booking ID</span>
              <span className="font-medium">
                BK-{Math.floor(100000 + Math.random() * 900000)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Bike</span>
              <span className="font-medium">{bikeName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Pickup</span>
              <span className="font-medium">{pickupLocation}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Start Date</span>
              <span className="font-medium">
                {format(startDate, "MMM dd, yyyy")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">End Date</span>
              <span className="font-medium">
                {format(endDate, "MMM dd, yyyy")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Amount Paid</span>
              <span className="font-medium">
                LKR {totalAmount.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>
              A confirmation email has been sent to{" "}
              {email || "your email address"}.
            </p>
            <p className="mt-1">
              You can view your booking details in your account.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-3">
        <Button className="w-full" asChild>
          <Link href="/rides">View My Rides</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/dashboard">Return to Dashboard</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
