import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bike } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/users";

export default function Navigation({
  isAuthenticated,
  user,
}: {
  isAuthenticated: boolean;
  user: User;
}) {
  return (
    <header className="fixed w-full z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Bike className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                BikeRent
              </span>
            </Link>
            <nav className="hidden md:ml-10 md:flex space-x-8">
              <Link
                href="/rides"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                Find Bikes
              </Link>
              <Link
                href="/rides/history"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                My Rides
              </Link>
              <Link
                href="/about"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                Contact
              </Link>
            </nav>
          </div>
          {!isAuthenticated ? (
            <div className="flex items-center">
              <Link href="/login">
                <Button variant="ghost" className="mr-2">
                  Log in
                </Button>
              </Link>
              <Link href="/signup">
                <Button>Sign up</Button>
              </Link>
            </div>
          ) : (
            <Link href="/profile" className="flex items-center">
              <Avatar className="h-10 w-10 cursor-pointer">
                <AvatarImage
                  src={
                    user?.avatar ??
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user?.name ?? "default"
                    )}`
                  }
                />
              </Avatar>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
