import { Phone, Mail } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";

import { Badge } from "../ui/badge";

import Image from "next/image";
import { BikeCardProps } from "@/types/bikes";

export default function BikeDataCard({image, name, bikeType, pricePerDay, engineCapacity, model}: BikeCardProps) {
  

    return (
    <>
      <Card className="overflow-hidden mb-6">
        <div className="relative h-48">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
          <Badge className="absolute top-2 right-2 bg-blue-600">
            {bikeType}
          </Badge>
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">{name}</CardTitle>
          <CardDescription>
            <span className="font-medium text-blue-600">
              LKR {pricePerDay}
            </span>{" "}
            per day
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-gray-500">Engine</p>
              <p className="font-medium">{engineCapacity}</p>
            </div>
            <div>
              <p className="text-gray-500">Year</p>
              <p className="font-medium">{model}</p>
            </div>
            <div>
              <p className="text-gray-500">Engine Capacity</p>
              <p className="font-medium">{engineCapacity}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Need Help?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <Phone className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Call us</p>
              <p className="text-sm text-gray-500">+94 11 234 5678</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <Mail className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Email us</p>
              <p className="text-sm text-gray-500">support@bikerental.lk</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
