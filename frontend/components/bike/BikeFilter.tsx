"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { FilterX, Search } from "lucide-react";

interface FilterProps {
  onFilter: (filters: BikeFilters) => void;
  onNameSearch: (name: string) => void;
  initialFilters?: BikeFilters;
}

export interface BikeFilters {
  priceRange: [number, number];
  bikeTypes: string[];
  engineCapacities: string[];
}

export default function BikeFilter({ onFilter, onNameSearch, initialFilters }: FilterProps) {
  const [nameSearch, setNameSearch] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>(
    initialFilters?.priceRange || [0, 10000]
  );
  
  const [bikeTypes, setBikeTypes] = useState<string[]>(
    initialFilters?.bikeTypes || []
  );
  
  const [engineCapacities, setEngineCapacities] = useState<string[]>(
    initialFilters?.engineCapacities || []
  );
  
  const bikeTypeOptions = [
    { id: "sport", label: "Sport" },
    { id: "cruiser", label: "Cruiser" },
    { id: "scooter", label: "Scooter" },
    { id: "adventure", label: "Adventure" },
    { id: "touring", label: "Touring" },
  ];
  
  const engineCapacityOptions = [
    { id: "upto125", label: "Up to 125cc" },
    { id: "126to250", label: "126cc - 250cc" },
    { id: "251to500", label: "251cc - 500cc" },
    { id: "501to750", label: "501cc - 750cc" },
    { id: "above750", label: "Above 750cc" },
  ];
  
  const handleBikeTypeChange = (checked: boolean, value: string) => {
    if (checked) {
      setBikeTypes([...bikeTypes, value]);
    } else {
      setBikeTypes(bikeTypes.filter(type => type !== value));
    }
  };
  
  const handleEngineCapacityChange = (checked: boolean, value: string) => {
    if (checked) {
      setEngineCapacities([...engineCapacities, value]);
    } else {
      setEngineCapacities(engineCapacities.filter(capacity => capacity !== value));
    }
  };
  
  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };
  
  const applyFilters = () => {
    onFilter({
      priceRange,
      bikeTypes,
      engineCapacities
    });
  };
  
  const resetFilters = () => {
    setPriceRange([0, 10000]);
    setBikeTypes([]);
    setEngineCapacities([]);
    onFilter({
      priceRange: [0, 10000],
      bikeTypes: [],
      engineCapacities: []
    });
  };
  
  const handleNameSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNameSearch(nameSearch);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Search Bikes</h3>
        <form onSubmit={handleNameSearchSubmit} className="flex gap-2">
          <Input
            placeholder="Search by bike name"
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        
        <div className="space-y-5">
          {/* Price Range */}
          <div>
            <Label className="text-sm font-medium mb-3 block">
              Price Range (LKR {priceRange[0]} - {priceRange[1]})
            </Label>
            <Slider
              defaultValue={priceRange}
              min={0}
              max={10000}
              step={100}
              value={priceRange}
              onValueChange={handlePriceRangeChange}
              className="my-4"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>LKR 0</span>
              <span>LKR 10,000</span>
            </div>
          </div>
          
          {/* Bike Types */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Bike Type</Label>
            <div className="space-y-2">
              {bikeTypeOptions.map((option) => (
                <div key={option.id} className="flex items-center">
                  <Checkbox 
                    id={`type-${option.id}`}
                    checked={bikeTypes.includes(option.id)}
                    onCheckedChange={(checked) => 
                      handleBikeTypeChange(checked === true, option.id)
                    }
                  />
                  <label 
                    htmlFor={`type-${option.id}`}
                    className="ml-2 text-sm cursor-pointer"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Engine Capacity */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Engine Capacity</Label>
            <div className="space-y-2">
              {engineCapacityOptions.map((option) => (
                <div key={option.id} className="flex items-center">
                  <Checkbox 
                    id={`capacity-${option.id}`}
                    checked={engineCapacities.includes(option.id)}
                    onCheckedChange={(checked) => 
                      handleEngineCapacityChange(checked === true, option.id)
                    }
                  />
                  <label 
                    htmlFor={`capacity-${option.id}`}
                    className="ml-2 text-sm cursor-pointer"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button 
              type="button" 
              onClick={applyFilters}
              className="flex-1"
            >
              Apply Filters
            </Button>
            <Button 
              type="button" 
              onClick={resetFilters}
              variant="outline"
              className="flex items-center"
            >
              <FilterX className="h-4 w-4 mr-1" />
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}