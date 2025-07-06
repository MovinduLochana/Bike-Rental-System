import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { Shield } from "lucide-react";
import { User } from "@/types/users";

type UserInfoFormProps = {
  isEditing: boolean;
  formData: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  user: User;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function UserInfoForm({
  isEditing,
  formData,
  user,
  isLoading,
  handleSubmit,
  handleInputChange,
}: UserInfoFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          {isEditing
            ? "Update your personal information below"
            : "View and manage your personal details"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <form id="profile-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="bio">About</Label>
                <Input
                  id="bio"
                  name="bio"
                  value={"bio"}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                <p>{user?.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p>{user?.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Phone Number
                </h3>
                <p>{user?.phone || "Not provided"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Address</h3>
                <p>{user?.address || "Not provided"}</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium text-gray-500">About</h3>
                <p>bio</p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Account Security
              </h3>
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-green-500" />
                <span className="text-sm">Your account is secure</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      {isEditing && (
        <CardFooter>
          <Button
            type="submit"
            form="profile-form"
            disabled={isLoading}
            className="ml-auto"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
