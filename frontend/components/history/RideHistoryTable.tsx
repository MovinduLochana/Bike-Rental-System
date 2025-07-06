import { TableCell, TableRow } from "@/components/ui/table";
import { differenceInDays } from "date-fns";
import { format } from "date-fns/format";

import Image from "next/image";
import { Badge } from "../ui/badge";

import { FileText, Star, MoreVertical, Share2, Download } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "../ui/button";

type RideHistoryTableProps = {
  bikeImage: string;
  bikeName: string;
  rideStatus: string;
  rideId: number;
  startTime: Date;
  endTime: Date;
};

const statusStyles = {
  COMPLETED: "bg-green-100 text-green-800 border-green-200",
  PAYMENT_PENDING: "bg-red-100 text-red-800 border-red-200",
  ONGOING: "bg-blue-100 text-blue-800 border-blue-200",
};

export default function RideHistoryTable({
  bikeImage,
  bikeName,
  rideStatus,
  rideId,
  startTime,
  endTime,
}: RideHistoryTableProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="flex items-center">
          <div className="h-10 w-10 mr-3 relative rounded overflow-hidden">
            <Image
              src={bikeImage}
              alt={bikeName}
              fill
              className="object-cover"
            />
          </div>
          {bikeName}
        </div>
      </TableCell>
      <TableCell>{format(startTime, "MMM dd, yyyy")}</TableCell>
      <TableCell>{differenceInDays(startTime, endTime).toFixed()}</TableCell>
      <TableCell>
        {10 * parseInt(differenceInDays(startTime, endTime).toFixed())} km
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <span className="truncate max-w-[150px] block">Colombo → Galle</span>
      </TableCell>
      <TableCell>LKR 100000</TableCell>
      <TableCell>
        <Badge
          className={statusStyles[rideStatus as keyof typeof statusStyles]}
        >
          {rideStatus.charAt(0).toUpperCase() + rideStatus.slice(1)}
        </Badge>
      </TableCell>
      <TableCell>
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
      </TableCell>
    </TableRow>
  );
}
