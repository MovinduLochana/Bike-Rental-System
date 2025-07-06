"use client";

import { createContext, useState, useContext, ReactNode } from "react";
import { BikeCardProps } from "@/types/bikes";

interface BikeContextType {
  filteredBikes: BikeCardProps[];
  setFilteredBikes: (bikes: BikeCardProps[]) => void;
}

const BikeContext = createContext<BikeContextType | undefined>(undefined);

export function BikeProvider({ children, initialBikes }: { children: ReactNode, initialBikes: BikeCardProps[] }) {
  const [filteredBikes, setFilteredBikes] = useState<BikeCardProps[]>(initialBikes);
  
  return (
    <BikeContext.Provider value={{ filteredBikes, setFilteredBikes }}>
      {children}
    </BikeContext.Provider>
  );
}

export function useBikeContext() {
  const context = useContext(BikeContext);
  if (context === undefined) {
    throw new Error("useBikeContext must be used within a BikeProvider");
  }
  return context;
}