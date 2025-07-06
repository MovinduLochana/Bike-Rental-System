"use client";

import { Bike } from "@/types/bikes";
import BikeTable from "./BikeTable";
import AddBikeForm from "./AddBikeForm";
import EditBikeForm from "./EditBikeForm";
import { Button } from "@/components/ui/button";
import { useState, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// This needs to be a client component since we're using useState
export default function BikeManagement({ bikes }: { bikes: Bike[] }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBike, setEditingBike] = useState<Bike | null>(null);

  // Show add form or edit form based on state
  const renderForm = () => {
    if (showAddForm) {
      return (
        <AddBikeForm 
          onCancel={() => setShowAddForm(false)}
          onSuccess={() => setShowAddForm(false)}
        />
      );
    }
    
    if (editingBike) {
      return (
        <EditBikeForm 
          bike={editingBike} 
          onCancel={() => setEditingBike(null)}
          onSuccess={() => setEditingBike(null)}
        />
      );
    }
    
    return null;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Bike Management</CardTitle>
        {!showAddForm && !editingBike && (
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            Add New Bike
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {renderForm()}
        
        {!showAddForm && !editingBike && (
          <Suspense fallback={<div>Loading bikes...</div>}>
            <BikeTable 
              bikes={bikes} 
              onEdit={setEditingBike} 
            />
          </Suspense>
        )}
      </CardContent>
    </Card>
  );
}