"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format, addDays, differenceInDays } from "date-fns";
import {
  Calendar as CalendarIcon,
  Info,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

// Shadcn UI components
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getBikeById } from "@/lib/bikeService";

import { Bike } from "@/types/bikes";
import { useAuth } from "@/lib/AuthContext";
import { createRide } from "@/lib/rideService";
import BikeDataCard from "@/components/bike/BikeDataCard";

// Available pickup locations
const pickupLocations = [
  {
    id: "loc1",
    name: "Colombo City Center",
    address: "137 Sir James Pieris Mawatha, Colombo",
  },
  { id: "loc2", name: "Kandy City", address: "D.S. Senanayake Street, Kandy" },
  { id: "loc3", name: "Galle Fort", address: "Church Street, Galle Fort" },
  { id: "loc4", name: "Negombo Beach", address: "Lewis Place, Negombo" },
];

const imgBaseURL = process.env.NEXT_PUBLIC_API_URL;

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center">Loading...</div>}>
      <BookRidePage />
    </Suspense>
  )
}

function BookRidePage() {

  const router = useRouter();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(addDays(new Date(), 3));

  const { user } = useAuth();

  const [pickupLocation, setPickupLocation] = useState(pickupLocations[0].id);
  const [dropoffLocation, setDropoffLocation] = useState(pickupLocations[0].id);
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedBike, setSelectedBike] = useState<Bike>({
    id: 0,
    name: "",
    model: "",
    image: "",
    pricePerDay: 0,
    availability: "AVAILABLE",
    engineCapacity: "",
    bikeType: "ALL",
    rating: 0,
    reviewCount: 0,
    fuelCapacity: "",
    description: "",
    specifications: {},
    features: [],
  });

  const searchParams = useSearchParams();
  const bikeId = searchParams.get("bikeId")

  const rentalDays =
    startDate && endDate ? differenceInDays(endDate, startDate) + 1 : 0;
  const subtotal = selectedBike.pricePerDay * rentalDays;
  const securityDeposit = 5000; // Fixed security deposit
  const total = subtotal + securityDeposit;

  useEffect(() => {
    async function fetchBike() {
      setLoading(true);
      const res = await getBikeById(
        parseInt(bikeId ?? "0")
      );

      if (res) {
        setSelectedBike(res);
        setLoading(false);
      } else {
        console.error("Bike not found");
        setLoading(false);
        router.push("/404");
      }
    }

    fetchBike();
  }, [bikeId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const rideId = await createRide({
      bike: {
        id: selectedBike.id,
      },
      user: {
        id: user?.id ?? 0,
      },
      startTime: startDate.toISOString(),
      endTime: endDate.toISOString(),
    });

    router.push(
      `/rides/payments?bikeId=${
        selectedBike.id
      }&start=${startDate?.toISOString()}&end=${endDate?.toISOString()}&pickup=${pickupLocation}&dropoff=${dropoffLocation}&amount=${total}&rideId=${rideId}`
    );
  };

  

  const selectedPickupLocation = pickupLocations.find(
    (loc) => loc.id === pickupLocation
  );
  const selectedDropoffLocation = pickupLocations.find(
    (loc) => loc.id === dropoffLocation
  );

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Bike details */}
        <div className="lg:col-span-1">
          <h1 className="text-3xl font-bold mb-6">Complete Your Booking</h1>
          <BikeDataCard
            id={selectedBike.id}
            name={selectedBike.name}
            model={selectedBike.model}
            image={`${imgBaseURL}/images${selectedBike.image}`}
            pricePerDay={selectedBike.pricePerDay}
            availability={selectedBike.availability}
            engineCapacity={selectedBike?.engineCapacity ?? "0"}
            bikeType={selectedBike.bikeType}
            reviewCount={selectedBike.reviewCount}
            rating={selectedBike.rating}
          />
        </div>

        {/* Right column - Booking form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Rental Details</CardTitle>
                <CardDescription>
                  Select your rental dates and locations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Start Date */}
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="startDate"
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={(date) => {
                            setStartDate(date ?? new Date());
                            if (date && endDate && date > endDate) {
                              setEndDate(addDays(date, 1));
                            }
                          }}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* End Date */}
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="endDate"
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={(days) => setEndDate(days ?? new Date())}
                          disabled={(date) =>
                            date < new Date() ||
                            (startDate ? date < startDate : false)
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Pick-up Location */}
                  <div className="space-y-2">
                    <Label htmlFor="pickupLocation">Pick-up Location</Label>
                    <Select
                      value={pickupLocation}
                      onValueChange={setPickupLocation}
                    >
                      <SelectTrigger id="pickupLocation">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {pickupLocations.map((location) => (
                          <SelectItem key={location.id} value={location.id}>
                            {location.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedPickupLocation && (
                      <p className="text-xs text-gray-500 mt-1">
                        {selectedPickupLocation.address}
                      </p>
                    )}
                  </div>

                  {/* Drop-off Location */}
                  <div className="space-y-2">
                    <Label htmlFor="dropoffLocation">Drop-off Location</Label>
                    <Select
                      value={dropoffLocation}
                      onValueChange={setDropoffLocation}
                    >
                      <SelectTrigger id="dropoffLocation">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {pickupLocations.map((location) => (
                          <SelectItem key={location.id} value={location.id}>
                            {location.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedDropoffLocation && (
                      <p className="text-xs text-gray-500 mt-1">
                        {selectedDropoffLocation.address}
                      </p>
                    )}
                  </div>
                </div>

                {/* Additional notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Input
                    id="notes"
                    placeholder="Any special requirements or questions?"
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Summary and Payment Button */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="text-sm">Rental Period</div>
                  <div className="font-medium">
                    {rentalDays} {rentalDays === 1 ? "day" : "days"}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm">Price per Day</div>
                  <div className="font-medium">
                    LKR {selectedBike.pricePerDay.toLocaleString()}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm">Rental Subtotal</div>
                  <div className="font-medium">
                    LKR {subtotal.toLocaleString()}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm flex items-center">
                    Security Deposit
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-3.5 w-3.5 ml-1 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-[200px] text-xs">
                            This deposit is refundable after the bike is
                            returned in good condition.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="font-medium">
                    LKR {securityDeposit.toLocaleString()}
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between items-center font-bold">
                  <div>Total Amount</div>
                  <div className="text-xl">LKR {total.toLocaleString()}</div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full text-base" size="lg">
                  <span>Continue to Payment</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}
