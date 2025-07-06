import { getAllBikesWithData } from "@/lib/bikeService";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminDashboard from "@/components/admin/AdminDashboard";
import BikeManagement from "@/components/admin/BikeManagement";
import StatisticsPanel from "@/components/admin/StatisticsPanel";
import RentalRequestReview from "@/components/admin/RentalRequestReview";
import { getAllRides } from "@/lib/rideService";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

export default async function AdminPage() {
  
  const authHeader = (await cookies()).get("admin_auth")?.value;

  if (!authHeader) {
    return <AdminLogin error={"noheader"} />;
  }
  
  try {
    const [username, password] = Buffer.from(authHeader, "base64").toString("utf-8").split(":");
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      console.error("Invalid credentials");
      // redirect("/admin?error=Invalid credentials");
    }
  } catch (e) {
    console.error("Error decoding auth header:", e);
    // redirect("/admin?error=Authentication failed");
  }
  
  
  const bikes = await getAllBikesWithData();
  const rides = await getAllRides();
  
  const statistics = {
    totalBikes: bikes.length,
    availableBikes: bikes.filter(bike => bike.availability === "AVAILABLE").length,
    rentedBikes: bikes.filter(bike => bike.availability === "RENTED").length,
    maintenanceBikes: bikes.filter(bike => bike.availability === "MAINTENANCE").length,
    avgRating: bikes.reduce((sum, bike) => sum + (bike.rating || 0), 0) / bikes.length || 0
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <AdminDashboard statistics={statistics} />
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <div className="xl:col-span-3">
          <BikeManagement bikes={bikes} />
        </div>
        <div className="xl:col-span-2">
          <StatisticsPanel statistics={statistics} bikes={bikes} />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Review Rental Request</h2>
        <RentalRequestReview rides={rides} />
      </div>
    </div>
  );
}

// Simple login form component
function AdminLogin({ error } : { error: string }) {

  const submitAction = async (formData: FormData) => {
    "use server";

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const authHeader = Buffer.from(`${username}:${password}`).toString("base64");
      
      // (await cookies()).set("admin_auth", authHeader)

      (await cookies()).set({
        name: "admin_auth",
        value: authHeader,
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60, // 1 hour
      })

      redirect("/admin");
    } else {
      console.error("Invalid credentials");
    }
  };


  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form action={submitAction}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

// const data: BikeCardProps[] = [
//   {
//     "id": 1,
//     "name": "Yamaha MT-07",
//     "model": "2023",
//     "image": "https://example.com/images/yamaha_mt07.jpg",
//     "pricePerDay": 75,
//     "availability": "AVAILABLE",
//     "engineCapacity": "689cc",
//     "bikeType": "NAKED",
//     "reviewCount": 120,
//     "rating": 4.8
//   },
//   {
//     "id": 2,
//     "name": "Honda CB500F",
//     "model": "2022",
//     "image": "https://example.com/images/honda_cb500f.jpg",
//     "pricePerDay": 60,
//     "availability": "RENTED",
//     "engineCapacity": "471cc",
//     "bikeType": "NAKED",
//     "reviewCount": 85,
//     "rating": 4.5
//   },
//   {
//     "id": 3,
//     "name": "Kawasaki Ninja 650",
//     "model": "2024",
//     "image": "https://example.com/images/kawasaki_ninja650.jpg",
//     "pricePerDay": 90,
//     "availability": "AVAILABLE",
//     "engineCapacity": "649cc",
//     "bikeType": "SPORT",
//     "reviewCount": 95,
//     "rating": 4.7
//   },
//   {
//     "id": 4,
//     "name": "BMW R 1250 GS",
//     "model": "2023",
//     "image": "https://example.com/images/bmw_r1250gs.jpg",
//     "pricePerDay": 120,
//     "availability": "AVAILABLE",
//     "engineCapacity": "1254cc",
//     "bikeType": "STREET",
//     "reviewCount": 150,
//     "rating": 4.9
//   },
//   {
//     "id": 5,
//     "name": "Ducati Monster 821",
//     "model": "2022",
//     "image": "https://example.com/images/ducati_monster821.jpg",
//     "pricePerDay": 100,
//     "availability": "AVAILABLE",
//     "engineCapacity": "821cc",
//     "bikeType": "NAKED",
//     "reviewCount": 70,
//     "rating": 4.6
//   }
// ]