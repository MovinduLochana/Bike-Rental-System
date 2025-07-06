import { Bike, CreditCard, MapPin, Star } from "lucide-react";
import { Card, CardContent } from "../ui/card";

type RideHistoryDataProps = {
    totalRides: number;
    totalDistance: number;
};

export default function RideHistoryData( {totalRides, totalDistance}: RideHistoryDataProps) {
  const averageRating = 4.5;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Rides Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardContent className="p-4 flex items-center">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <Bike className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-blue-800">Total Rides</p>
            <h3 className="text-2xl font-bold text-blue-900">{totalRides}</h3>
          </div>
        </CardContent>
      </Card>

      {/* Total Distance Card */}
      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <CardContent className="p-4 flex items-center">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <MapPin className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-green-800">Total Distance</p>
            <h3 className="text-2xl font-bold text-green-900">
              {totalDistance} km
            </h3>
          </div>
        </CardContent>
      </Card>

      {/* Total Cost Card */}
      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <CardContent className="p-4 flex items-center">
          <div className="bg-purple-100 p-3 rounded-full mr-4">
            <CreditCard className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-purple-800">Total Spent</p>
            <h3 className="text-2xl font-bold text-purple-900">LKR 100,000</h3>
          </div>
        </CardContent>
      </Card>

      {/* Average Rating Card */}
      <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
        <CardContent className="p-4 flex items-center">
          <div className="bg-amber-100 p-3 rounded-full mr-4">
            <Star className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-amber-800">Average Rating</p>
            <h3 className="text-2xl font-bold text-amber-900">
              {averageRating.toFixed(1)}/5
            </h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
