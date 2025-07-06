import Image from "next/image";
import Link from "next/link";
import { Availability, BikeCardProps } from "@/types/bikes";
import { SmartphoneCharging } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

const formatAvailability = (availability: Availability) => {
  switch (availability) {
    case "AVAILABLE":
      return {
        label: "Available Now",
        color: "bg-green-100 text-green-800 border-green-200",
      };
    case "RENTED":
      return {
        label: "Currently Booked",
        color: "bg-red-100 text-red-800 border-red-200",
      };
    case "MAINTENANCE":
      return {
        label: "In Service",
        color: "bg-amber-100 text-amber-800 border-amber-200",
      };
    default:
      return {
        label: "Unknown",
        color: "bg-gray-100 text-gray-800 border-gray-200",
      };
  }
};

const imgBaseURL = process.env.NEXT_PUBLIC_API_URL;

export default function BikeCard(bike: BikeCardProps) {

  const availabilityInfo = formatAvailability(bike.availability);

  return (
    <Card
      className="overflow-hidden transition-shadow hover:shadow-md"
    >
      <div className="relative h-48">
        <Link href={`/rides/${bike.id}`}>
          <Image
            src={`${imgBaseURL}/images${bike.image}`}
            alt={bike.name}
            fill
            className="object-cover"
            // priority={bike.id <= 4 }
          />
        </Link>
        <Badge className={`absolute top-2 right-2 ${availabilityInfo.color}`}>
          {availabilityInfo.label}
        </Badge>
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/rides/${bike.id}`} className="group">
            <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
              {bike.name}
            </h3>
            <p className="text-sm text-gray-500">{bike.model}</p>
          </Link>
          <Badge variant="outline" className="capitalize">
            {bike.bikeType}
          </Badge>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-3">
          <div className="flex items-center mr-4">
            <SmartphoneCharging className="h-3.5 w-3.5 mr-1" />
            <span>{bike.engineCapacity}</span>
          </div>
          <div className="flex items-center">
            <svg
              className="h-3.5 w-3.5 mr-1 text-yellow-400 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            <span>
              {bike.rating.toFixed(1)} ({bike.reviewCount})
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-lg font-bold">
            LKR {bike.pricePerDay}
            <span className="text-xs font-normal text-gray-500"> / day</span>
          </div>

          <Button
            size="sm"
            disabled={bike.availability !== "AVAILABLE"}
          >
            <Link href={`/rides/book?bikeId=${bike.id}`} className="flex items-center">
              Book Now
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
