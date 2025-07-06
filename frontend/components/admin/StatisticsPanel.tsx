"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bike } from "@/types/bikes";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

type Props = {
  statistics: {
    availableBikes: number;
    rentedBikes: number;
    maintenanceBikes: number;
  };
  bikes: Bike[];
};


export default function StatisticsPanel({ statistics, bikes }: Props) {
  
  const bikeTypesMap: Record<string, number> = {
    NAKED: 0,
    SPORT: 0,
    STREET: 0
  };
  
  bikes.forEach(bike => {
    bikeTypesMap[bike.bikeType] = (bikeTypesMap[bike.bikeType] + 1);
    console.log(bike, bikeTypesMap)
  });
  
  const bikeTypeData = Object.entries(bikeTypesMap).map(([name, value]) => ({
    name,
    value
  }));
  
  // Status data
  const statusData = [
    { name: 'Available', value: statistics.availableBikes },
    { name: 'Rented', value: statistics.rentedBikes },
    { name: 'Maintenance', value: statistics.maintenanceBikes },
  ];
  
  // Colors for the charts
  const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Analytics Dashboard</CardTitle>
          <CardDescription>
            Overview of your bike fleet and rental statistics
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Bike Fleet Composition</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={bikeTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {bikeTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value} bikes`, 'Count']}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Current Bike Status</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value} bikes`, 'Count']}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}