"use client";

import { useAuth } from "@/lib/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { 
  Home, 
  User, 
  Bike, 
  History, 
  // CreditCard, 
  Star, 
  LogOut,
  Menu
} from "lucide-react";

export default function SideNav() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Navigation items with icons
  const navItems = [
    { href: "/dashboard", icon: <Home size={20} />, label: "Dashboard" },
    { href: "/profile", icon: <User size={20} />, label: "Profile" },
    { href: "/rides", icon: <Bike size={20} />, label: "Book Ride" },
    { href: "/rides/history", icon: <History size={20} />, label: "Ride History" },
    // { href: "/payments", icon: <CreditCard size={20} />, label: "Payments" },
    { href: "/reviews", icon: <Star size={20} />, label: "Reviews" },
  ];

  const isActive = (path: string) => pathname === path;
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button 
        onClick={toggleMobileMenu} 
        className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-md shadow-md"
      >
        <Menu size={20} />
      </button>
      
      {/* Sidebar - hidden on mobile unless toggled */}
      <nav 
        className={`${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:sticky top-0 left-0 w-16 bg-white border-r border-gray-200 
        flex flex-col items-center py-6 h-screen z-40 transition-transform duration-300 ease-in-out`}
      >
        {/* Avatar at the top */}
        <div className="mb-8 relative">
          {user ? (
            <div className="relative rounded-full overflow-hidden w-10 h-10">
              <Image
                src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}?format=png`}
                alt={user.name}
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User size={20} className="text-gray-500" />
            </div>
          )}
        </div>

        {/* Navigation links */}
        <div className="flex flex-col items-center space-y-6 flex-grow">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 group relative ${
                isActive(item.href) ? "bg-gray-100 text-blue-600" : "text-gray-600"
              }`}
              aria-label={item.label}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div>{item.icon}</div>
              
              {/* Tooltip */}
              <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {item.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Logout at the bottom */}
        <button
          onClick={logout}
          className="p-2 mt-auto rounded-lg hover:bg-gray-100 text-gray-600 transition-colors duration-200 group relative"
          aria-label="Logout"
        >
          <LogOut size={20} />
          
          {/* Tooltip */}
          <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            Logout
          </span>
        </button>
      </nav>
      
      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}