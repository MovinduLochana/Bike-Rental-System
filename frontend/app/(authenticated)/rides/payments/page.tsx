"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { 
  CreditCard,
  Lock, 
  ArrowLeft, 
  ShieldCheck,
} from "lucide-react";

// Shadcn UI components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/AuthContext";
import { processPayment } from "@/lib/paymentService";
import { Bike } from "@/types/bikes";
import { getBikeById } from "@/lib/bikeService";
import PaymentSuccess from "@/components/payment/PaymentSuccess";


// Mock data for pickup locations

const imageBaseUrl = process.env.NEXT_PUBLIC_API_URL;

const locations = {
  "loc1": { id: "loc1", name: "Colombo City Center" },
  "loc2": { id: "loc2", name: "Kandy City" },
  "loc3": { id: "loc3", name: "Galle Fort" },
  "loc4": { id: "loc4", name: "Negombo Beach" },
};

export default function PaymentPage(){
  return(
    <Suspense fallback={<div>Loading...</div>}>
      <Payment />
    </Suspense>
  );
}

function Payment() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  
  // Get booking details from search params
  const bikeId = parseInt(searchParams.get("bikeId") || "0");
  
  const rideId = parseInt(searchParams.get("rideId") || "0");

  const startDateStr = searchParams.get("start") || "";
  const endDateStr = searchParams.get("end") || "";
  const pickupLocationId = searchParams.get("pickup") || "";
  const dropoffLocationId = searchParams.get("dropoff") || "";
  const totalAmount = parseInt(searchParams.get("amount") || "0");
  
  const startDate = startDateStr ? parseISO(startDateStr) : null;
  const endDate = endDateStr ? parseISO(endDateStr) : null;
  
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Form state
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const [bike, setBike] = useState<Bike>({} as Bike);

  useEffect(() => {
    async function fetchBike() {
      
      const res = await getBikeById(bikeId);
      
      if (res) {
        setBike(res);
      } else {
        console.error("Bike not found");
        router.push("/rides/book");
      }
    }

    fetchBike();
  }, [bikeId, router]);
  
  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    if (!value) return value;
    
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, "");
    // Limit to 16 digits
    // const limited = cleaned.substring(0, 16);
    // Add space after every 4 digits
    //  const formatted = limited.replace(/(\d{4})(?=\d)/g, "$1 ");
    
    return cleaned;
  };
  
  // Format expiry date as MM/YY
  const formatExpiryDate = (value: string) => {
    if (!value) return value;
    
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, "");
    // Limit to 4 digits
    const limited = cleaned.substring(0, 4);
    
    // Add slash after first 2 digits if there are more than 2
    if (limited.length > 2) {
      return `${limited.substring(0, 2)}/${limited.substring(2)}`;
    }
    
    return limited;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {

      const res = await processPayment({
        ride:{
          id: rideId,
        },
        cardNumber: parseInt(cardNumber.replace(/\s/g, "")),
        cardExpiry: expiryDate,
        cardCvv: cvv,
        amount: totalAmount,
        paymentMethod,
      });
      
      // Mock successful payment
      setIsSuccess(res.status === "COMPLETED");
    } catch (error) {
      console.error("Payment failed:", error);
      // Handle payment error
    } finally {
      setIsProcessing(false);
    }
  };
  
  // If necessary data is missing, return to booking page
  if (!bikeId || !startDate || !endDate || !pickupLocationId || !dropoffLocationId || !totalAmount) {
    router.push("/rides/book");
    return null;
  }
  
  // Get bike and location details
  const pickupLocation = locations[pickupLocationId as keyof typeof locations];
  const dropoffLocation = locations[dropoffLocationId as keyof typeof locations];
  
  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-lg">
        <PaymentSuccess
          bikeName={bike.name}
          pickupLocation={pickupLocation.name}
          startDate={startDate}
          endDate={endDate}
          email={user?.email || ""}
          totalAmount={totalAmount}
        />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Button 
        variant="ghost" 
        onClick={() => router.back()}
        className="mb-6 pl-0 hover:bg-transparent hover:text-blue-600"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Booking
      </Button>
      
      <h1 className="text-3xl font-bold mb-8">Complete Your Payment</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Payment methods */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Select your preferred payment method</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={paymentMethod} onValueChange={setPaymentMethod} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="card" className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Credit/Debit Card
                  </TabsTrigger>
                  <TabsTrigger value="paypal" disabled className="flex items-center">
                    <span className="mr-2">
                      <svg width="14" height="14" viewBox="0 0 24 24">
                        <path fill="#253B80" d="M7.076 21.337H2.308a.641.641 0 0 1-.633-.74L4.964 1.86A.64.64 0 0 1 5.597 1.3h4.768c3.534 0 5.981 1.865 5.712 5.289-.269 3.424-2.123 5.29-5.657 5.29H7.988L7.076 21.336z" />
                        <path fill="#179BD7" d="M23.209 7.313c-.24 3.477-2.312 5.367-5.932 5.367h-1.73l-.853 5.414c-.052.326-.328.568-.656.568h-3.783c-.374 0-.632-.346-.578-.71l1.944-12.317c.051-.326.327-.568.656-.568h4.847c3.422 0 5.683 1.773 5.084 5.369v-3.123z" />
                      </svg>
                    </span>
                    PayPal
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="card" className="mt-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <div className="relative">
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                            required
                            maxLength={19}
                            className="pr-10"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <Image 
                              src="/storage/assets/visa.webp" 
                              alt="Card logos" 
                              width={40} 
                              height={24} 
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input
                          id="cardName"
                          placeholder="John Doe"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                            required
                            maxLength={5}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            type="password"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").substring(0, 3))}
                            required
                            maxLength={3}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                      <Lock className="h-3.5 w-3.5" />
                      <span>Your payment information is encrypted and secure</span>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full text-base" 
                      size="lg"
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : `Pay LKR ${totalAmount.toLocaleString()}`}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="paypal">
                  <div className="py-8 text-center text-gray-500">
                    PayPal payment option coming soon.
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        {/* Right column - Booking summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Bike details */}
              <div className="flex items-center space-x-4">
                <div className="relative h-16 w-24 rounded overflow-hidden">
                  <Image 
                    src={`${imageBaseUrl}/images${bike.image || "/default-bike.jpg"}`}
                    alt={bike.name} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{bike.name}</h3>
                  <p className="text-sm text-gray-500">
                    {format(startDate, "MMM dd")} - {format(endDate, "MMM dd, yyyy")}
                  </p>
                </div>
              </div>
              
              <Separator />
              
              {/* Location details */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Pickup Location</span>
                  <span className="font-medium">{pickupLocation.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Dropoff Location</span>
                  <span className="font-medium">{dropoffLocation.name}</span>
                </div>
              </div>
              
              <Separator />
              
              {/* Payment details */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Amount</span>
                  <span className="font-bold">LKR {totalAmount.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-500">
                  Includes rental fee and refundable security deposit
                </p>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex items-start">
                <ShieldCheck className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <div className="text-xs text-blue-800">
                  <p className="font-medium">Safe & Secure</p>
                  <p className="mt-1">Your personal and payment information is protected with industry-standard encryption.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}