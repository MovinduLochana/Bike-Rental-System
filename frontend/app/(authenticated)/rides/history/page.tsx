"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Bike, 
  Search, 
  Download,
} from "lucide-react";
import Link from "next/link";
import { getUserRides } from "@/lib/rideService";
import { Ride } from "@/types/rides";

import {  differenceInDays } from "date-fns"
import RideHistoryData from "@/components/history/RideHistoryData";
import RideHistoryCard from "@/components/history/RideHistoryCard";
import RideHistoryTable from "@/components/history/RideHistoryTable";

const imgBaseURL = process.env.NEXT_PUBLIC_API_URL;

export default function RideHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [rides, setRides] = useState<Ride[]>([]);
  const [activeView, setActiveView] = useState<string>("card");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const fetchRides = async () => {
      setIsLoading(true);
      
      const res = await getUserRides(user?.id ?? 0);

      console.log("Fetched rides: ", res);
      setRides(res);

      setIsLoading(false)
    };
    fetchRides();
    
  },[user?.id]);

  // Filter rides based on search term
  const filteredRides = rides.filter(
    (ride) =>
      ride.bike.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRides = rides.length;
  const totalDistance = 10 * rides.reduce((sum, ride) => sum + parseInt(differenceInDays(ride.endTime, ride.startTime).toFixed(0)), 0);
  //const totalCost = rides.reduce((sum, ride) => sum + ride.payment.amount, 0);
  // const averageRating = 4.5

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Please log in to view your ride history</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">

        {/* Header and Stats Cards */}
        <div>

          <div className="flex flex-wrap justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Your Ride History</h1>
            <div className="flex space-x-2 mt-4 sm:mt-0">
              <Button variant="outline" size="sm" asChild>
                <Link href="/rides/book">
                  <Bike className="mr-2 h-4 w-4" />
                  Book New Ride
                </Link>
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          
          <RideHistoryData 
            totalRides={totalRides}
            totalDistance={totalDistance}
           />

        </div>

        {/* Search and View Toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search rides..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Tabs defaultValue="card" value={activeView} onValueChange={setActiveView} className="w-full sm:w-auto">
            <TabsList className="grid w-full sm:w-[200px] grid-cols-2">
              <TabsTrigger value="card">Card View</TabsTrigger>
              <TabsTrigger value="table">Table View</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Ride History List */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <p className="text-gray-500">Loading rides...</p>
          </div>
        ) : filteredRides.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No rides found matching your search.</p>
          </div>
        ) : (
          <div>
            {/* Card View */}
            <Tabs defaultValue="card">
              <TabsList>
              <TabsTrigger value="card">Card View</TabsTrigger>
              <TabsTrigger value="table">Card View</TabsTrigger>
              </TabsList>

            <TabsContent value="card" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {filteredRides.map((ride) => (
                  <RideHistoryCard 
                  key={ride.id}
                  bikeImage={`${imgBaseURL}/images${ride.bike.image}`}
                  bikeName={ride.bike.name}
                  rideStatus={ride.status}
                  rideId={ride.id}
                  startTime={ride.startTime}
                  endTime={ride.endTime}
                  />
                ))}

              </div>
            </TabsContent>
            
            {/* Table View */}
            <TabsContent value="table" className="m-0">
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bike</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Distance</TableHead>
                      <TableHead className="hidden md:table-cell">Route</TableHead>
                      <TableHead>Cost</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRides.map((ride) => (
                      <RideHistoryTable
                      key={ride.id}
                      bikeImage={`${imgBaseURL}/images${ride.bike.image}`}
                      bikeName={ride.bike.name}
                      rideStatus={ride.status}
                      rideId={ride.id}
                      startTime={ride.startTime}
                      endTime={ride.endTime}
                      />
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}