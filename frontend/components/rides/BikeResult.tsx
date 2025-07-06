"use client";

import BikeCard from "@/components/bike/BikeCard";
import { AlertTriangle } from "lucide-react";
import { useBikeContext } from "@/context/BikeContext";

export default function BikeResults() {
  const { filteredBikes: bikes } = useBikeContext();

  return (
    <>
      {/* Results count */}
      <p className="text-gray-500">
        Showing {bikes.length} {bikes.length === 1 ? "bike" : "bikes"}
      </p>

      {/* Bike grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {bikes.map((bike) => (
          <BikeCard key={bike.id} {...bike} />
        ))}
      </div>

      {/* Empty state */}
      {bikes.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
            <AlertTriangle className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No bikes found
          </h3>
          <p className="text-gray-500">
            Try adjusting your filters or search terms
          </p>
        </div>
      )}
    </>
  );
}
