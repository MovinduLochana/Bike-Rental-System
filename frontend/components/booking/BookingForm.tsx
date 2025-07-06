import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addDays, differenceInDays, format } from "date-fns";
import { ArrowRight, CalendarIcon, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Separator } from "../ui/separator";

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


interface BookingFormProps {
  startDate: Date;
  endDate: Date;
  pickupLocation: string;
  dropoffLocation: string;
  pricePerDay: number;
  additionalNotes: string;
  handleSubmit: (e: React.FormEvent) => void;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  setPickupLocation: (locationId: string) => void;
  setDropoffLocation: (locationId: string) => void;
  setAdditionalNotes: (notes: string) => void;
}

export default function BookingForm({
  startDate,
  endDate,
  pickupLocation,
  dropoffLocation,
  additionalNotes,
  pricePerDay,
  handleSubmit,
  setStartDate,
  setEndDate,
  setPickupLocation,
  setDropoffLocation,
  setAdditionalNotes
} : BookingFormProps) {

  const selectedPickupLocation = pickupLocations.find(
    (loc) => loc.id === pickupLocation
  );
  const selectedDropoffLocation = pickupLocations.find(
    (loc) => loc.id === dropoffLocation
  );

   const rentalDays = startDate && endDate ? differenceInDays(endDate, startDate) + 1 : 0;
    const subtotal = pricePerDay * rentalDays;
    const securityDeposit = 5000; // Fixed security deposit
    const total = subtotal + securityDeposit;
  return (
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
              <Select value={pickupLocation} onValueChange={setPickupLocation}>
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
              LKR {pricePerDay.toLocaleString()}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm">Rental Subtotal</div>
            <div className="font-medium">LKR {subtotal.toLocaleString()}</div>
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
                      This deposit is refundable after the bike is returned in
                      good condition.
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
  );
}
