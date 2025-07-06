import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "../ui/badge";
import { Mail, PenLine, Phone, MapPin, Calendar } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

type UserDataProps = {
  user: {
    name: string;
    email: string;
    phone: string;
    address: string;
    avatar?: string;
  };
  userStats: {
    ridesCompleted: number;
    totalDistance: number;
    memberSince: string;
  };
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
};

const getInitials = (name_: string) => {
  return name_.split(" ")[0].toUpperCase();
};

export default function UserData({
  user,
  userStats,
  isEditing,
  setIsEditing,
}: UserDataProps) {
  return (
    <Card className="col-span-1">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src={
                user.avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.name
                )}&size=192`
              }
              alt={user.name}
            />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-2xl">{user.name}</CardTitle>
        <CardDescription>
          <Badge variant="outline" className="mt-2">
            Premium Member
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center">
            <Mail className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-sm">{user.email}</span>
          </div>
          {user.phone && (
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2 text-gray-400" />
              <span className="text-sm">{user.phone}</span>
            </div>
          )}
          {user.address && (
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-gray-400" />
              <span className="text-sm">{user.address}</span>
            </div>
          )}
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-sm">
              Member since {userStats.memberSince}
            </span>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold">{userStats.ridesCompleted}</p>
            <p className="text-sm text-gray-500">Rides</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{userStats.totalDistance} km</p>
            <p className="text-sm text-gray-500">Distance</p>
          </div>
        </div>

        <Separator className="my-4" />

        <div>
          <h3 className="text-sm font-medium mb-2">About</h3>
          <p className="text-sm text-gray-600">bio</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setIsEditing(!isEditing)}
        >
          <PenLine className="w-4 h-4 mr-2" />
          {isEditing ? "Cancel Edit" : "Edit Profile"}
        </Button>
      </CardFooter>
    </Card>
  );
}
