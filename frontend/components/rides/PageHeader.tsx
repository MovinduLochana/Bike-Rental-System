import { HistoryIcon } from "lucide-react";
import Link from "next/link";

// can be a server component, if we use Link instead of router.push
export default function PageHeader() {
  
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">Available Bikes</h1>
      <Link 
        className="flex items-center gap-2"
        href="/rides/history"
      >
        <HistoryIcon className="h-4 w-4" />
        <span className="hidden sm:inline">Rental History</span>
      </Link>
    </div>
  );
}
