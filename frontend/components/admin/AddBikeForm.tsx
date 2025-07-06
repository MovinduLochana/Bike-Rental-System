"use client";

import { useState, FormEvent, ChangeEvent, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { BikeType, Availability } from "@/types/bikes";
import Image from "next/image";

interface BikeFormData {
  name: string;
  model: string;
  image: string | File;
  pricePerDay: number;
  bikeType: BikeType;
  availability: Availability;
  engineCapacity: string;
  fuelCapacity: string;
  description: string;
  features: string[];
}

export default function AddBikeForm({
  onCancel,
  onSuccess,
}: {
  onCancel: () => void;
  onSuccess: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<BikeFormData>({
    name: "",
    model: "",
    image: "",
    pricePerDay: 1,
    bikeType: "SPORT",
    availability: "AVAILABLE",
    engineCapacity: "",
    fuelCapacity: "",
    description: "",
    features: [],
  });

  // Keep track of specifications
  const [specs, setSpecs] = useState<{ key: string; value: string }[]>([
    { key: "", value: "" },
  ]);

  // Handle feature input (comma separated string)
  const [featureInput, setFeatureInput] = useState("");

  // Handle basic input changes
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    // Handle number inputs
    if (type === "number") {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Update form data with file
      setFormData({
        ...formData,
        image: file,
      });

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const clearSelectedImage = () => {
    setFormData({
      ...formData,
      image: "",
    });
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle features input
  const handleFeaturesChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFeatureInput(e.target.value);
    // Convert comma-separated string to array
    const featuresArray = e.target.value
      .split(",")
      .map((feature) => feature.trim())
      .filter((feature) => feature);

    setFormData({
      ...formData,
      features: featuresArray,
    });
  };

  // Add a new specification field
  const addSpecification = () => {
    setSpecs([...specs, { key: "", value: "" }]);
  };

  // Handle specification changes
  const handleSpecChange = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const newSpecs = [...specs];
    newSpecs[index][field] = value;
    setSpecs(newSpecs);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formDataObj = new FormData();

      formDataObj.append("name", formData.name);
      formDataObj.append("model", formData.model);
      formDataObj.append("pricePerDay", formData.pricePerDay.toString());
      formDataObj.append("bikeType", formData.bikeType);
      formDataObj.append("availability", formData.availability);
      formDataObj.append("engineCapacity", formData.engineCapacity);
      formDataObj.append("fuelCapacity", formData.fuelCapacity);
      formDataObj.append("description", formData.description);

      formDataObj.append("features", JSON.stringify(formData.features));

      const specificationsObj = specs
        .filter((spec) => spec.key && spec.value) // Only include complete specs
        .reduce((acc, spec) => {
          acc[spec.key] = spec.value;
          return acc;
        }, {} as Record<string, string>);

      formDataObj.append("specifications", JSON.stringify(specificationsObj));

      if (formData.image instanceof File) {
        formDataObj.append("image", formData.image);
      }

      console.log("formDataObj", formDataObj);

      const response = await fetch("http://localhost:8080/bikes", {
        method: "POST",
        body: formDataObj,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || `Failed to add bike: ${response.status}`
        );
      }

      onSuccess();
    } catch (error) {
      console.error("Error adding bike:", error);
      setError("Failed to add bike. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Bike</CardTitle>
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
                placeholder="Enter bike name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            {/* Model */}
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                name="model"
                placeholder="Enter model"
                value={formData.model}
                onChange={handleInputChange}
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
                onValueChange={(value) => handleSelectChange("bikeType", value)}
                defaultValue={formData.bikeType}
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
                onValueChange={(value) =>
                  handleSelectChange("availability", value)
                }
                defaultValue={formData.availability}
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
                placeholder="e.g. 600cc"
                value={formData.engineCapacity}
                onChange={handleInputChange}
              />
            </div>

            {/* Fuel Capacity */}
            <div className="space-y-2">
              <Label htmlFor="fuelCapacity">Fuel Capacity</Label>
              <Input
                id="fuelCapacity"
                name="fuelCapacity"
                placeholder="e.g. 16L"
                value={formData.fuelCapacity}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Bike Image</Label>
            <div className="space-y-2">
              <Input
                id="image"
                name="image"
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <div className="relative mt-2">
                  <Image
                    src={imagePreview}
                    alt="Bike preview"
                    width={200}
                    height={200}
                    className="h-40 object-contain rounded-md border"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={clearSelectedImage}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter bike description"
              className="min-h-[100px]"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          {/* Features */}
          <div className="space-y-2">
            <Label htmlFor="features">Features (comma-separated)</Label>
            <Textarea
              id="features"
              placeholder="ABS, LED Lights, Digital Display"
              className="min-h-[100px]"
              value={featureInput}
              onChange={handleFeaturesChange}
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
                <div
                  key={index}
                  className="grid grid-cols-2 gap-2"
                  data-spec-row
                >
                  <Input
                    placeholder="Specification name"
                    value={spec.key}
                    onChange={(e) =>
                      handleSpecChange(index, "key", e.target.value)
                    }
                    data-spec-key
                  />
                  <Input
                    placeholder="Value"
                    value={spec.value}
                    onChange={(e) =>
                      handleSpecChange(index, "value", e.target.value)
                    }
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
              {isSubmitting ? "Saving..." : "Add Bike"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
