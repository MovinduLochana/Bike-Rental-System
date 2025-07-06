"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Star, Clock, Calendar, ChevronRight, Shield, MapPin, HistoryIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getBikeById } from "@/lib/bikeService";
import { Availability, Bike } from "@/types/bikes";
import { ReviewBike } from "@/types/reviews";
import { getBikeReviews } from "@/lib/reviewService";
import { useParams } from "next/navigation";

// Calculate overall rating from reviews
const calculateOverallRating = (reviews: ReviewBike[] | null) => {
  if (!reviews) return 0;
  const sum = reviews.reduce((total, review) => total + review.rating, 0);
  return sum / reviews.length;
};

const imgBaseURL = process.env.NEXT_PUBLIC_API_URL;

export default function BikeDetailsPage() {
  const router = useRouter();
  const [bike, setBike] = useState<Bike | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [bikeReviews, setBikeReviews] = useState<ReviewBike[]>([]);
  
  const params = useParams();
  const bikeId = Number(params.bikeId); // Convert bikeId to a number

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        setLoading(true);

        const data = await getBikeById(bikeId);
        const reviews = await getBikeReviews(bikeId);

        console.log(reviews)

        setBikeReviews(reviews);
        setBike(data);

      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchBikes();
    
  }, [bikeId]);
  
  // Calculate the overall rating
  const overallRating = calculateOverallRating(bikeReviews);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Loading bike details...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Error</h1>
        <p className="text-gray-600 mb-8">{error}</p>
      </div>
    );
  }
  // If bike not found, show error
  if (!bike) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Bike Not Found</h1>
        <p className="text-gray-600 mb-8">The bike you are looking for does not exist or has been removed.</p>
        <Button onClick={() => router.push('/rides')}>
          Browse All Bikes
        </Button>
      </div>
    );
  }
  
  // Format bike availability for display
  const formatAvailability = (availability: Availability) => {
    switch (availability) {
      case "AVAILABLE":
        return { label: "Available Now", color: "bg-green-100 text-green-800 border-green-200" };
      case "RENTED":
        return { label: "Currently Booked", color: "bg-red-100 text-red-800 border-red-200" };
      case "MAINTENANCE":
        return { label: "In Service", color: "bg-amber-100 text-amber-800 border-amber-200" };
      default:
        return { label: "Unknown", color: "bg-gray-100 text-gray-800 border-gray-200" };
    }
  };
  
  const availabilityInfo = formatAvailability(bike.availability);
  
  // Helper function to render star ratings
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        {/* Header with navigation and history button */}
        <div className="flex justify-between items-center">
          <div>
            <Link href="/rides" className="text-sm text-blue-600 hover:text-blue-800 flex items-center mb-2">
              <ChevronRight className="h-4 w-4 rotate-180 mr-1" />
              Back to all bikes
            </Link>
            <h1 className="text-3xl font-bold">{bike.name}</h1>
            <p className="text-gray-500">{bike.model} • {bike.engineCapacity} • {bike.bikeType}</p>
          </div>
          
          <Button 
            size="sm" 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => router.push('/rides/history')}
          >
            <HistoryIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Rental History</span>
          </Button>
        </div>
        
        {/* Bike details grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column with image */}
          <div className="lg:col-span-2">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={`${imgBaseURL}/images${bike.image}`}
                alt={bike.name}
                fill
                className="object-cover"
              />
              <Badge 
                className={`absolute top-4 right-4 ${availabilityInfo.color}`}
              >
                {availabilityInfo.label}
              </Badge>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              
              <Card>
                <CardContent className="p-4 flex items-center">
                  <Clock className="h-5 w-5 mr-3 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">Engine</p>
                    <p className="text-sm text-gray-500">{bike.engineCapacity}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex items-center">
                  <Shield className="h-5 w-5 mr-3 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">Safety</p>
                    <p className="text-sm text-gray-500">ABS Equipped</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-3 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">Model Year</p>
                    <p className="text-sm text-gray-500">{bike.model}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Right column with booking info */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Book This Bike</CardTitle>
                <CardDescription>Check availability and reserve now</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold">
                    LKR {bike.pricePerDay}
                    <span className="text-sm font-normal text-gray-500"> / day</span>
                  </div>
                  <div className="flex items-center">
                    {renderStars(bike.rating)}
                    <span className="ml-2 text-sm text-gray-600">{bike.reviewCount} reviews</span>
                  </div>
                </div>
                
                <div className="p-3 rounded-md bg-blue-50 border border-blue-100 flex items-start">
                  <MapPin className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium">Pickup Locations</p>
                    <p className="mt-1">Available for pickup at Colombo City Center, Kandy City, and Negombo Beach</p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">What&apos;s included:</h3>
                  <ul className="space-y-1">
                    <li className="flex items-center text-sm">
                      <svg className="h-4 w-4 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Helmet included
                    </li>
                    <li className="flex items-center text-sm">
                      <svg className="h-4 w-4 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Basic insurance
                    </li>
                    <li className="flex items-center text-sm">
                      <svg className="h-4 w-4 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      24/7 roadside assistance
                    </li>
                    <li className="flex items-center text-sm">
                      <svg className="h-4 w-4 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Regular maintenance
                    </li>
                  </ul>
                </div>
              </CardContent>
              <div className="px-6 pb-6">
                <Button 
                  className="w-full" 
                  size="lg"
                  disabled={bike.availability !== "AVAILABLE"}
                  onClick={() => router.push(`/rides/book?bikeId=${bike.id}`)}
                >
                  {bike.availability === "AVAILABLE" ? "Book Now" : "Currently Unavailable"}
                </Button>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Tabs for details and reviews */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="specs">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">
              Reviews ({bikeReviews?.length ?? 0})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-4">About this bike</h2>
                <p className="text-gray-700">{bike.description}</p>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-4">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {bike.features && bike.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <svg className="h-4 w-4 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-4">Safety & Requirements</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <div>
                        <p className="font-medium">Valid Motorcycle License Required</p>
                        <p className="text-sm text-gray-600">You must have a valid license specifically for motorcycles to rent this bike.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <div>
                        <p className="font-medium">Age Requirement</p>
                        <p className="text-sm text-gray-600">You must be at least 21 years old to rent this motorcycle.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                      </svg>
                      <div>
                        <p className="font-medium">Deposit Required</p>
                        <p className="text-sm text-gray-600">A security deposit of LKR 5,000 is required, refundable upon return.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="specs" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Technical Specifications</CardTitle>
                <CardDescription>Detailed specifications for the {bike.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                  {bike.specifications && Object.entries(bike.specifications).map(([key, value]) => (
                    <div key={key} className="border-b pb-2">
                      <div className="text-sm text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                      <div className="font-medium">{value}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-3xl font-bold mr-3">{overallRating.toFixed(1)}</div>
                  <div>
                    {renderStars(overallRating)}
                    <p className="text-sm text-gray-500 mt-1">Based on {bikeReviews?.length} reviews</p>
                  </div>
                </div>
                
                <Button onClick={() => router.push(`/reviews/new?bikeId=${bike.id}`)}>
                  Write a Review
                </Button>
              </div>
              
              <Separator />
              
              {bikeReviews?.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No reviews yet. Be the first to review this bike!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {bikeReviews?.map((review) => (
                    <div key={review.id} className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                            <Image
                              src={`https://ui-avatars.com/api/?name=${review.userName}&size=256`}
                              alt={review.userName}
                              width={40}
                              height={40}
                            />
                          </div>
                          <div>
                            <p className="font-semibold">{review.userName}</p>
                            <p className="text-xs text-gray-500">{new Date().toLocaleDateString()}</p>
                          </div>
                        </div>
                        {renderStars(review.rating)}
                      </div>
                      
                      <div>
                        <h4 className="font-medium">{review.title}</h4>
                        <p className="text-gray-700 mt-1">{review.content}</p>
                      </div>
                      
                      <Separator />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}