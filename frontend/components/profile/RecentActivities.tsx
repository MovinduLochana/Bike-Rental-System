import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bike, CreditCard, Star, CheckCircle, AlertCircle } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";
// import { getRecentActivity } from "@/lib/configs/recentActivityUtil";

type Activity = {
  id: number;
  type: "ride" | "payment" | "review";
  description: string;
  date: string;
  status: "completed" | "pending";
};

export default function RecentActivities() {
    
  // const recentActivities: Activity[] = getRecentActivity();
  const recentActivities: Activity[] = [
    { id: 1, type: "ride", date: "2025-04-01", description: "Completed ride with Honda CBR 500R", status: "completed" },
    { id: 2, type: "payment", date: "2025-03-28", description: "Payment for ride #12453", status: "completed" },
    { id: 3, type: "review", date: "2025-03-25", description: "Left a 5-star review for Yamaha MT-15", status: "completed" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Your recent rides, payments, and reviews
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-4 p-3 rounded-md border"
            >
              <div className="bg-gray-100 p-2 rounded-full">
                {activity.type === "ride" && (
                  <Bike className="h-4 w-4 text-blue-500" />
                )}
                {activity.type === "payment" && (
                  <CreditCard className="h-4 w-4 text-green-500" />
                )}
                {activity.type === "review" && (
                  <Star className="h-4 w-4 text-yellow-500" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.description}</p>
                <p className="text-xs text-gray-500">
                  {new Date(activity.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div>
                {activity.status === "completed" ? (
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    <CheckCircle className="h-3 w-3 mr-1" /> Completed
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="bg-yellow-50 text-yellow-700 border-yellow-200"
                  >
                    <AlertCircle className="h-3 w-3 mr-1" /> Pending
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="outline" asChild>
          <Link href="/rides">View All Rides</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
