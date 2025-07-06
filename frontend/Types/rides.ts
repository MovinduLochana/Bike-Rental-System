
type RideStatus = 'PENDING_PAYMENT' | 'ONGOING' | 'COMPLETED' | 'CANCELLED'

type Booking = {
  id: number;
  bikeId: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  bikeName: string;
  bikeImage?: string;
} | null;

type Ride = {
  id: number;
  bike: {
    id: number;
    name: string;
    image: string;
  };
  startTime: Date; // check date works
  endTime: Date;
  status: RideStatus;
};

type RideData = {
  bike: {
    id: number;
  };
  user: {
    id:number;
  };
  startTime: string;
  endTime: string;
}

export type { Booking, Ride, RideData };