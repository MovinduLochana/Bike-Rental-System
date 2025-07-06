import { ReactNode } from "react";
import SideNav from "@/components/SideNav";
import Breadcrumb from "@/components/Breadcrumb";
import { Toaster } from "@/components/ui/toaster";

export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  
  return (
      <div className="flex min-h-screen bg-gray-50">
        <SideNav />
        <div className="flex-1">
          <Breadcrumb />
          <main className="p-4 md:p-6">{children}</main>
          <Toaster />
        </div>
      </div>
  );
}
