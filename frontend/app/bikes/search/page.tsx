"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { searchBikesByName, getAllBikes } from "@/lib/bikeService";
import { Bike } from "@/types/bikes";
import BikeCard from "@/components/bike/BikeCard";
import { Loader2 } from "lucide-react";

export default function SearchResults() {
  // const searchParams = useSearchParams();
  // const bikeName = searchParams.get("name") || "";
  
  // const [bikes, setBikes] = useState<Bike[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState("");
  
  
  // useEffect(() => {
  //   const fetchBikes = async () => {
  //     try {
  //       setLoading(true);
  //       // Clear previous error
  //       setError("");
        
  //       if (bikeName) {
  //         const searchResults = await searchBikesByName(bikeName, token);
  //         setBikes(searchResults);
  //       } else {
  //         // If no search term, get all bikes
  //         const allBikes = await getAllBikes(token);
  //         setBikes(allBikes);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch bikes:", error);
  //       setError("Failed to load bikes. Please try again.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
    
  //   fetchBikes();
  // }, [bikeName, token]);
  
  // return (
  //   <div className="container mx-auto py-8 px-4">
  //     <div className="mb-8">
  //       <h1 className="text-3xl font-bold text-gray-900">
  //         {bikeName ? `Search Results for "${bikeName}"` : "All Bikes"}
  //       </h1>
  //       <p className="text-gray-600 mt-2">
  //         {bikes.length} {bikes.length === 1 ? "bike" : "bikes"} found
  //       </p>
  //     </div>
      
  //     {loading ? (
  //       <div className="flex justify-center items-center py-20">
  //         <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
  //         <span className="ml-2 text-gray-600">Loading bikes...</span>
  //       </div>
  //     ) : error ? (
  //       <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
  //         <p className="text-red-700">{error}</p>
  //       </div>
  //     ) : bikes.length === 0 ? (
  //       <div className="text-center py-20">
  //         <h2 className="text-xl font-medium text-gray-900">No bikes found</h2>
  //         <p className="text-gray-600 mt-1">
  //           Try searching with a different name or browse all available bikes.
  //         </p>
  //       </div>
  //     ) : (
  //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  //         {bikes.map((bike) => (
  //           <BikeCard key={bike.id} bike={bike} />
  //         ))}
  //       </div>
  //     )}
  //   </div>
  // );
}