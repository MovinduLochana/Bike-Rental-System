"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter, ChevronDown } from "lucide-react";

// Types
import {
  BikeType,
  Availability,
  SortOption,
  BikeCardProps,
} from "@/types/bikes";

// Shadcn components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBikeContext } from "@/context/BikeContext";

interface BikeSearchProps {
  initialBikes: BikeCardProps[];
}

export default function BikeSearch({ initialBikes }: BikeSearchProps) {

  const { setFilteredBikes } = useBikeContext();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");
  const [selectedType, setSelectedType] = useState<BikeType>(
    (searchParams.get("bikeType") as BikeType) || "ALL"
  );
  const [selectedAvailability, setSelectedAvailability] =
    useState<Availability>(
      (searchParams.get("availability") as Availability) || "ALL"
    );
  const [sortBy, setSortBy] = useState<SortOption>(
    (searchParams.get("sort") as SortOption) || "price-low"
  );

  // Apply filters locally and update URL
  const handleSearch = () => {
    // Build the query params
    const params = new URLSearchParams();
    if (searchTerm) params.set("query", searchTerm);
    if (selectedType !== "ALL") params.set("bikeType", selectedType);
    if (selectedAvailability !== "ALL")
      params.set("availability", selectedAvailability);
    if (sortBy !== "price-low") params.set("sort", sortBy);

    // Update URL without refreshing page
    router.push(`/rides${params.toString() ? `?${params.toString()}` : ""}`);

    // Filter bikes locally
    const filteredBikes = initialBikes.filter((bike) => {
      const matchesSearch =
        searchTerm === "" ||
        bike.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType =
        selectedType === "ALL" || bike.bikeType === selectedType;
      const matchesAvailability =
        selectedAvailability === "ALL" ||
        bike.availability === selectedAvailability;

      return matchesSearch && matchesType && matchesAvailability;
    }); // can get filtered data from server if needed

    // Sort bikes based on selected option
    const sortedBikes = [...filteredBikes].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.pricePerDay - b.pricePerDay;
        case "price-high":
          return b.pricePerDay - a.pricePerDay;
        case "rating":
          return b.rating - a.rating;
        case "popularity":
          return b.reviewCount - a.reviewCount;
        default:
          return 0;
      }
    });

    setFilteredBikes(sortedBikes);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search bikes..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>

        <div className="flex gap-2">
          <Select
            value={selectedType}
            onValueChange={(value) => {
              setSelectedType(value as BikeType);
              handleSearch();
            }}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Bike Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Types</SelectItem>
              <SelectItem value="SPORT">Sport</SelectItem>
              <SelectItem value="NAKED">Naked</SelectItem>
              <SelectItem value="CRUISER">Cruiser</SelectItem>
              <SelectItem value="STREET">Street</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <div className="p-2">
                <p className="text-sm font-medium mb-2">Availability</p>
                <DropdownMenuCheckboxItem
                  checked={selectedAvailability === "ALL"}
                  onCheckedChange={() => {
                    setSelectedAvailability("ALL");
                    handleSearch();
                  }}
                >
                  All bikes
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedAvailability === "AVAILABLE"}
                  onCheckedChange={() => {
                    setSelectedAvailability("AVAILABLE");
                    handleSearch();
                  }}
                >
                  Available now
                </DropdownMenuCheckboxItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Select
            value={sortBy}
            onValueChange={(value) => {
              setSortBy(value as SortOption);
              handleSearch();
            }}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rating</SelectItem>
              <SelectItem value="popularity">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
}
