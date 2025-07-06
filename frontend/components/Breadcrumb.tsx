"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumb() {
  const pathname = usePathname();
  
  // Don't show breadcrumbs on landing page
  if (pathname === "/") {
    return null;
  }
  
  // Create breadcrumb items array from pathname
  const paths = pathname.split("/").filter(path => path);
  
  // Map path segments to more readable names
  const getReadableName = (path: string) => {
    // Map common paths to more readable names
    const pathMap: Record<string, string> = {
      "profile": "Profile",
      "dashboard": "Dashboard",
      "rides": "Rides",
      "book": "Book Ride",
      "payments": "Payments",
      "reviews": "Reviews",
    };
    
    // If path is in the map, return the readable name
    if (path in pathMap) {
      return pathMap[path];
    }
    
    // Otherwise, capitalize first letter
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-4 py-3 flex items-center overflow-x-auto whitespace-nowrap">
        <Link 
          href="/dashboard" 
          className="text-gray-600 hover:text-blue-600 flex items-center"
        >
          <Home size={16} />
          <span className="ml-1 hidden sm:inline">Dashboard</span>
        </Link>
        
        {paths.map((path, index) => {
          // Build the href for this breadcrumb
          const href = `/${paths.slice(0, index + 1).join("/")}`;
          const isLast = index === paths.length - 1;
          
          return (
            <div key={path} className="flex items-center">
              <ChevronRight size={16} className="mx-2 text-gray-400" />
              {isLast ? (
                <span className="text-gray-800 font-medium">{getReadableName(path)}</span>
              ) : (
                <Link 
                  href={href}
                  className="text-gray-600 hover:text-blue-600"
                >
                  {getReadableName(path)}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}