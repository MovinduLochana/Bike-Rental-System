import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  ChevronRight,
  Clock,
  CreditCard,
  Download,
  FileText,
  MapPin,
  MoreVertical,
  Share2,
  Star,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns/format";
import { differenceInDays } from "date-fns";

const statusStyles = {
  COMPLETED: "bg-green-100 text-green-800 border-green-200",
  PAYMENT_PENDING: "bg-red-100 text-red-800 border-red-200",
  ONGOING: "bg-blue-100 text-blue-800 border-blue-200",
};

type RideHistoryCardProps = {
  bikeImage: string;
  bikeName: string;
  rideStatus: string;
  rideId: number;
  startTime: Date;
  endTime: Date;
};

export default function RideHistoryCard({
  bikeImage,
  bikeName,
  rideStatus,
  rideId,
  startTime,
  endTime,
}: RideHistoryCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48">
        <Image src={bikeImage} alt={bikeName} fill className="object-cover" />
        <Badge
          className={`absolute top-2 right-2 ${
            statusStyles[rideStatus as keyof typeof statusStyles]
          }`}
        >
          {rideStatus.charAt(0).toUpperCase() + rideStatus.slice(1)}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">{bikeName}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/rides/${rideId}`}>
                  <FileText className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/reviews/new?rideId=${rideId}`}>
                  <Star className="mr-2 h-4 w-4" />
                  Add Review
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Download Receipt
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription>{format(startTime, "MMM dd, yyyy")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-start">
            <Clock className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
            <div>
              <p className="text-sm font-medium">Duration</p>
              <p className="text-sm text-gray-500">
                {differenceInDays(startTime, endTime).toFixed()}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <MapPin className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
            <div>
              <p className="text-sm font-medium">Route</p>
              <p className="text-sm text-gray-500 truncate">Colombo → Galle</p>
            </div>
          </div>
          <div className="flex items-start">
            <CreditCard className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
            <div>
              <p className="text-sm font-medium">Cost</p>
              <p className="text-sm text-gray-500">LKR 100000</p>
            </div>
          </div>
        </div>
        <Button variant="outline" className="w-full mt-4" asChild>
          <Link href={`/rides/${rideId}`}>
            View Details
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
