"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/AuthContext";
import { CalendarDays, Bike, CreditCard, Clock, MapPin, Star, Bell } from "lucide-react";
import { formatDistance } from 'date-fns';

// Shadcn components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Types
import { Bike as BikeType } from "@/types/bikes"; 

type Booking = {
  id: number;
  bikeId: string;
  bikeName: string;
  bikeImage?: string;
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalAmount?: number;
  createdAt?: string;
  updatedAt?: string;
} ;

type notfy = {
  id: string;
  read: boolean,
  message: string;
  title: string;
  timestamp: Date;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [activeBookings, setActiveBookings] = useState<Booking[]>([]);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [recommendedBikes, setRecommendedBikes] = useState<BikeType[]>([]);
  const [notifications, setNotifications] = useState<notfy[]>([]);
  const [stats, setStats] = useState({
    totalRides: 0,
    activeRides: 0,
    totalSpent: 0,
    favoriteLocation: "",
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>();
  
  useEffect(() => {
    async function fetchDashboardData() {

      // if(!isAuthenticated) {
      //   setError("You are not authenticated. Please log in.");
      //   return;
      // }

      try {
        setIsLoading(true);
        

        // const bookingsResponse = await fetch('/api/bookings/active', { credentials: 'include' });
        // const recentResponse = await fetch('/api/bookings/recent', { credentials: 'include' });
        // const recommendedResponse = await fetch('/api/bikes/recommended', { credentials: 'include' });
        // const notificationsResponse = await fetch('/api/notifications', { credentials: 'include' });
        // const statsResponse = await fetch('/api/user/stats', { credentials: 'include' });
        
        // if (!bookingsResponse.ok || !recentResponse.ok || !recommendedResponse.ok || 
        //     !notificationsResponse.ok || !statsResponse.ok) {
        //   throw new Error("Failed to fetch dashboard data");
        // }
        
        // Mock data for demo purposes
        // In production, you'd use the actual API responses
        setActiveBookings([
          {
            id: 1,
            bikeId: "bike1",
            bikeName: "Yamaha MT-07",
            bikeImage: "/images/bikes/mt07.jpg",
            startDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
            endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            status: "pending",
          }
        ]);
        
        setRecentBookings([
          {
            id: 2,
            bikeId: "bike2",
            bikeName: "Kawasaki Ninja 650",
            bikeImage: "/images/bikes/ninja.jpg",
            startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            endDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            status: "completed"
          }
        ]);
        
        setRecommendedBikes([
          {
            id: 1,
            name: "Honda CB650R",
            model: "203",
            bikeType: "NAKED",
            image: "/images/bikes/cb650r.jpg",
            pricePerDay: 3500,
            rating: 4.8,
            reviewCount: 24,
            availability: "AVAILABLE"
          },
          {
            id: 2,
            name: "Royal Enfield Classic 350",
            model: "2652",
            bikeType: "CRUISER",
            image: "/images/bikes/royal-enfield.jpg",
            pricePerDay: 2500,
            rating: 4.5,
            reviewCount: 36,
            availability: "AVAILABLE"
          }
        ]);
        
        setNotifications([
          {
            id: "n1",
            title: "Booking Confirmed",
            message: "Your booking for Yamaha MT-07 has been confirmed.",
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            read: false
          },
          {
            id: "n2",
            title: "Special Offer",
            message: "Get 10% off on weekend bookings!",
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
            read: true
          }
        ]);
        
        setStats({
          totalRides: 8,
          activeRides: 1,
          totalSpent: 25000,
          favoriteLocation: "Colombo Central"
        });
        
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchDashboardData();
  }, []);
  
  if ( isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
        <p className="text-gray-600">{error}</p>
        <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.name || 'Rider'}!</h1>
          <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your rides</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <div className="relative">
            <Button variant="outline" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </Button>
          </div>
          <Avatar className="h-9 w-9">
            <AvatarImage src="/images/avatar.png" />
            <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Rides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRides}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeRides}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs. {stats.totalSpent.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Favorite Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.favoriteLocation}</div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="bookings" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="bookings">Current Bookings</TabsTrigger>
          <TabsTrigger value="history">Recent History</TabsTrigger>
          <TabsTrigger value="recommendations">Recommended for You</TabsTrigger>
        </TabsList>
        
        <TabsContent value="bookings">
          <div className="grid grid-cols-1 gap-4">
            {activeBookings.length > 0 ? (
              activeBookings.map(booking => (
                <Card key={booking.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative h-48 md:h-auto md:w-1/3">
                      <Image 
                        src={booking.bikeImage || "/images/bike-placeholder.jpg"}
                        alt={booking.bikeName}
                        className="object-cover"
                        fill
                      />
                    </div>
                    <div className="p-6 md:w-2/3">
                      <CardTitle className="text-xl mb-2">{booking.bikeName}</CardTitle>
                      <CardDescription className="mb-4">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200 mb-2">
                          {booking.status}
                        </Badge>
                      </CardDescription>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center">
                          <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>Pickup: {booking.startDate.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>Return: {booking.endDate.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>
                            {formatDistance(booking.startDate, new Date(), { addSuffix: true })}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>PickUp location</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        <Button asChild>
                          <Link href={`/bookings/${booking.id}`}>View Details</Link>
                        </Button>
                        <Button variant="outline">Modify Booking</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <Bike className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No Active Bookings</h3>
                <p className="text-muted-foreground mb-4">You don&apos;t have any upcoming bike rentals.</p>
                <Button asChild>
                  <Link href="/rides">Explore Available Bikes</Link>
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentBookings.map(booking => (
              <Card key={booking.id}>
                <CardHeader>
                  <CardTitle>{booking.bikeName}</CardTitle>
                  <CardDescription>
                    {booking.startDate.toLocaleDateString()} - {booking.endDate.toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center">
                    <Badge variant={booking.status === "completed" ? "outline" : "secondary"}>
                      {booking.status}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/bookings/${booking.id}`}>View Details</Link>
                  </Button>
                  {booking.status === "completed" && (
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/reviews/add?bikeId=${booking.bikeId}`}>
                        <Star className="mr-1 h-4 w-4" /> Leave Review
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="recommendations">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedBikes.map((bike) => (
              <Card key={bike.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image 
                    src={bike.image || "/images/bike-placeholder.jpg"}
                    alt={bike.name}
                    className="object-cover"
                    fill
                  />
                </div>
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span>{bike.name}</span>
                    <Badge>{bike.bikeType}</Badge>
                  </CardTitle>
                  <CardDescription className="flex justify-between items-center">
                    <span className="flex items-center">
                      <Star className="fill-yellow-400 stroke-yellow-400 h-4 w-4 mr-1" />
                      {bike.rating} ({bike.reviewCount} reviews)
                    </span>
                    <span className="font-medium">Rs. {bike.pricePerDay}/day</span>
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/rides/${bike.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="cursor-pointer hover:bg-accent transition-colors">
            <CardContent className="flex flex-col items-center justify-center py-6">
              <Bike className="h-8 w-8 mb-2" />
              <span className="text-sm font-medium text-center">Book a Bike</span>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:bg-accent transition-colors">
            <CardContent className="flex flex-col items-center justify-center py-6">
              <Clock className="h-8 w-8 mb-2" />
              <span className="text-sm font-medium text-center">View History</span>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:bg-accent transition-colors">
            <CardContent className="flex flex-col items-center justify-center py-6">
              <CreditCard className="h-8 w-8 mb-2" />
              <span className="text-sm font-medium text-center">Payment Methods</span>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:bg-accent transition-colors">
            <CardContent className="flex flex-col items-center justify-center py-6">
              <MapPin className="h-8 w-8 mb-2" />
              <span className="text-sm font-medium text-center">Find Locations</span>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Notifications */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Recent Notifications</h2>
          <Button variant="ghost" size="sm">Mark All as Read</Button>
        </div>
        
        <div className="space-y-2">
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <Card key={notification.id} className={`${notification.read ? 'bg-card' : 'bg-accent'}`}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium">{notification.title}</h4>
                    <span className="text-xs text-muted-foreground">
                      {formatDistance(notification.timestamp, new Date(), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p>No new notifications</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}