"use client";

import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { updateUserProfile } from "@/lib/userService";
import Link from "next/link";
import Preferance from "@/components/profile/Preferance";
import UserData from "@/components/profile/UserData";
import UserInfoForm from "@/components/profile/UserInfoForm";
import RecentActivities from "@/components/profile/RecentActivities";

export default function ProfilePage() {

  const { user, setUser, loading } = useAuth();
  
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    address: user?.address ?? "",
  });

  const [isLoading, setIsLoading] = useState(false);
  
  const userStats = {
    ridesCompleted: 24,
    totalDistance: 487, // km
    totalSpent: 12600, // LKR
    memberSince: "January 2023",
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {

      const res = await updateUserProfile({ id: user?.id ?? 0, ...formData});

      // const message = res as {data: User, message: string}

      if (res == "error") {
        throw new Error(res || "Failed to update profile");
      }      

      setUser({
        id: user?.id || 1,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address
      });
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });

    } catch (error) {
      toast({
        title: "Update failed",
        description: (error as Error).message || "An error occurred while updating your profile.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsEditing(false);
    }
  };


  if(loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin">Loading</div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Please log in to view your profile</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <UserData user={user} userStats={userStats} isEditing={isEditing} setIsEditing={setIsEditing} />

        
        <div className="col-span-1 lg:col-span-2">
          <Tabs defaultValue="information" className="w-full">

            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="information">Information</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>
            
            
            <TabsContent value="information">
              <UserInfoForm isEditing={isEditing} formData={formData} user={user} isLoading={isLoading} handleSubmit={handleSubmit} handleInputChange={handleInputChange} />
            </TabsContent>
            
            
            <TabsContent value="activity">
              <RecentActivities />
            </TabsContent>
            
            
            <TabsContent value="preferences">
              <Preferance />
            </TabsContent>

          </Tabs>
        </div>
      </div>
    </div>
  );
}