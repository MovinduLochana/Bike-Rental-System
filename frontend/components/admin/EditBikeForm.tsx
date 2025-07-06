"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Bike } from "@/types/bikes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EditBikeForm({
  bike, 
  onCancel, 
  onSuccess 
}: { 
  bike: Bike, 
  onCancel: () => void, 
  onSuccess: () => void 
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simple form state initialized with bike data
  const [formData, setFormData] = useState({
    name: bike.name,
    model: bike.model,
    image: bike.image,
    pricePerDay: bike.pricePerDay,
    bikeType: bike.bikeType,
    availability: bike.availability,
    engineCapacity: bike.engineCapacity,
    fuelCapacity: bike.fuelCapacity,
    description: bike.description,
    features: bike.features
  });

  // Initialize specifications state
  const [specs, setSpecs] = useState<{key: string, value: string}[]>([]);

  // Initialize features input
  const [featureInput, setFeatureInput] = useState(bike.features?.join(", ") || "");

  // Load specifications when component mounts
  useEffect(() => {
    if (bike.specifications) {
      const initialSpecs = Object.entries(bike.specifications).map(
        ([key, value]) => ({ key, value })
      );
      setSpecs(initialSpecs.length ? initialSpecs : [{ key: "", value: "" }]);
    } else {
      setSpecs([{ key: "", value: "" }]);
    }
  }, [bike]);


  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    // Handle number inputs
    if (type === 'number') {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle features input
  const handleFeaturesChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFeatureInput(e.target.value);
    // Convert comma-separated string to array
    const featuresArray = e.target.value
      .split(",")
      .map(feature => feature.trim())
      .filter(feature => feature);
    
    setFormData({
      ...formData,
      features: featuresArray
    });
  };

  // Add a new specification field
  const addSpecification = () => {
    setSpecs([...specs, { key: "", value: "" }]);
  };

  // Handle specification changes
  const handleSpecChange = (index: number, field: 'key' | 'value', value: string) => {
    const newSpecs = [...specs];
    newSpecs[index][field] = value;
    setSpecs(newSpecs);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Build specifications object from the specs array
      const specifications: Record<string, string> = {};
      specs.forEach(spec => {
        if (spec.key && spec.value) {
          specifications[spec.key] = spec.value;
        }
      });
      
      // Prepare submission data
      const submissionData = {
        ...formData,
        specifications,
        id: bike.id
      };

      const response = await fetch(`http://localhost:8080/bikes/${bike.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update bike: ${response.status}`);
      }
      
      router.refresh();
      onSuccess();
    } catch (error) {
      console.error("Error updating bike:", error);
      setError("Failed to update bike. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Bike: {bike.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Bike Name</Label>
              <Input 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter bike name"
              />
            </div>
            
            {/* Model */}
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Input 
                id="model"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                placeholder="Enter model"
              />
            </div>
            
            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="pricePerDay">Price Per Day (USD)</Label>
              <Input 
                id="pricePerDay"
                name="pricePerDay"
                type="number"
                min="0"
                step="0.01"
                value={formData.pricePerDay}
                onChange={handleInputChange}
              />
            </div>
            
            {/* Bike Type */}
            <div className="space-y-2">
              <Label htmlFor="bikeType">Bike Type</Label>
              <Select
                defaultValue={formData.bikeType}
                onValueChange={(value) => handleSelectChange("bikeType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select bike type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SPORT">Sport</SelectItem>
                  <SelectItem value="NAKED">Naked</SelectItem>
                  <SelectItem value="CRUISER">Cruiser</SelectItem>
                  <SelectItem value="STREET">Street</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Availability */}
            <div className="space-y-2">
              <Label htmlFor="availability">Availability</Label>
              <Select
                defaultValue={formData.availability}
                onValueChange={(value) => handleSelectChange("availability", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AVAILABLE">Available</SelectItem>
                  <SelectItem value="RENTED">Rented</SelectItem>
                  <SelectItem value="UNAVAILABLE">Unavailable</SelectItem>
                  <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Engine Capacity */}
            <div className="space-y-2">
              <Label htmlFor="engineCapacity">Engine Capacity</Label>
              <Input 
                id="engineCapacity"
                name="engineCapacity"
                value={formData.engineCapacity}
                onChange={handleInputChange}
                placeholder="e.g. 600cc"
              />
            </div>
            
            {/* Fuel Capacity */}
            <div className="space-y-2">
              <Label htmlFor="fuelCapacity">Fuel Capacity</Label>
              <Input 
                id="fuelCapacity"
                name="fuelCapacity"
                value={formData.fuelCapacity}
                onChange={handleInputChange}
                placeholder="e.g. 16L"
              />
            </div>
            
            
          </div>
          
          {/* Image URL */}
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input 
              id="image"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="https://example.com/bike.jpg"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter bike description"
              className="min-h-[100px]"
            />
          </div>

          {/* Features */}
          <div className="space-y-2">
            <Label htmlFor="features">Features (comma-separated)</Label>
            <Textarea 
              id="features"
              value={featureInput}
              onChange={handleFeaturesChange}
              placeholder="ABS, LED Lights, Digital Display"
              className="min-h-[100px]"
            />
            <p className="text-sm text-muted-foreground">
              Enter features separated by commas
            </p>
          </div>

          {/* Specifications */}
          <div className="space-y-2">
            <Label>Specifications</Label>
            <div className="space-y-2">
              {specs.map((spec, index) => (
                <div key={index} className="grid grid-cols-2 gap-2" data-spec-row>
                  <Input
                    placeholder="Specification name"
                    value={spec.key}
                    onChange={(e) => handleSpecChange(index, 'key', e.target.value)}
                    data-spec-key
                  />
                  <Input
                    placeholder="Value"
                    value={spec.value}
                    onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                    data-spec-value
                  />
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline"
                onClick={addSpecification}
              >
                Add Specification
              </Button>
            </div>
          </div>

          {/* Error display */}
          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-md">
              {error}
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Update Bike"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}