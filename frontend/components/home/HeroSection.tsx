
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function HeroSection() {

  const handleSearch = async (e: FormData) => {
    // "use server";
    const search = e.get("search") as string;
    if (search.trim()) {
        redirect(`/results?search?name=${encodeURIComponent(search)}`);
    }
  };

  return (
    <section className="relative h-[90vh] overflow-hidden pt-16">
      {/* The background container with fixed positioning for parallax effect */}
      <div className="bg-parallax">
        <Image
          src="/storage/bike/bikehero.jpg" 
          alt="City biking"
          fill
          priority
          quality={90}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/70 mix-blend-multiply" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight animate-fade-up">
            Explore The City <br/>
            <span className="text-blue-300">On Two Wheels</span>
          </h1>
          
          <p className="mt-6 text-xl text-gray-200 max-w-lg animate-fade-up" style={{ animationDelay: "200ms" }}>
            Rent premium motorbikes and experience the thrill of the ride. 
            Affordable rates, flexible booking, unforgettable journeys.
          </p>
          
          <form 
            action={handleSearch}
            className="mt-8 sm:flex max-w-md bg-white/10 backdrop-blur-md p-1 rounded-lg animate-fade-up"
            style={{ animationDelay: "400ms" }}
          >
            <div className="flex-1">
              <Input
                type="text"
                name="search"
                placeholder="Search Bikes By Name"
                className="h-12 border-0 bg-white/80 backdrop-blur-sm text-gray-900 placeholder-gray-500 rounded-l-lg"
              />
            </div>
            <Button 
              type="submit" 
              size="lg"
              className="w-full sm:w-auto sm:ml-1 mt-2 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Search className="mr-2 h-5 w-5" />
              Find Bikes
            </Button>
          </form>
          
          <div 
            className="mt-8 flex items-center animate-fade-up"
            style={{ animationDelay: "600ms" }}
          >
            <div className="flex -space-x-2 mr-4">
              <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-xs font-medium">JD</div>
              <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-white flex items-center justify-center text-white text-xs font-medium">AK</div>
              <div className="w-8 h-8 rounded-full bg-yellow-500 border-2 border-white flex items-center justify-center text-white text-xs font-medium">SR</div>
              <div className="w-8 h-8 rounded-full bg-red-500 border-2 border-white flex items-center justify-center text-white text-xs font-medium">+</div>
            </div>
            <p className="text-sm text-white">
              Join <span className="font-semibold">2,000+</span> riders who trust us
            </p>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200" className="w-full">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,64L48,80C96,96,192,128,288,138.7C384,149,480,139,576,112C672,85,768,43,864,42.7C960,43,1056,85,1152,96C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}