

import { Bike } from "@/types/bikes";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DeleteBikeButton } from "./DeleteBikeButton";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";

// This component renders the bikes table
// It's a client component because of the interactive buttons

export default function BikeTable({ 
  bikes, 
  onEdit 
}: { 
  bikes: Bike[], 
  onEdit: (bike: Bike) => void 
}) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>A list of all bikes in your inventory.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Engine</TableHead>
            <TableHead>Price/Day</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bikes.map((bike) => (
            <TableRow key={bike.id}>
              <TableCell className="font-medium">{bike.name} {bike.model}</TableCell>
              <TableCell>{bike.bikeType}</TableCell>
              <TableCell>{bike.engineCapacity}</TableCell>
              <TableCell>${bike.pricePerDay.toFixed(2)}</TableCell>
              <TableCell>
                <Badge variant={getBadgeVariant(bike.availability)}>
                  {bike.availability}
                </Badge>
              </TableCell>
              <TableCell>
                {bike.rating.toFixed(1)} ({bike.reviewCount})
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onEdit(bike)}
                  className="mr-2"
                >
                  <PencilIcon className="h-4 w-4 mr-1" /> Edit
                </Button>
                <DeleteBikeButton bikeId={bike.id} bikeName={bike.name} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// Helper to get the right badge style based on availability
function getBadgeVariant(availability: string) {
  switch (availability) {
    case 'AVAILABLE':
      return 'default';
    case 'RENTED':
      return 'secondary';
    case 'MAINTENANCE':
      return 'destructive';
    case 'UNAVAILABLE':
      return 'outline';
    default:
      return 'outline';
  }
}