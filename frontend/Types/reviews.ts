export type Review = {
  id: number;
  bike: {
    id: number;
    name: string;
    image: string;
  }
  user: {
    id: number;
    name: string;
    avatar: string;
  }
  rating: number;
  title: string;
  content: string;
  pros?: string;
  cons?: string;
  createdTime: string;
};

export type ReviewData = {
  bike: {
    id: number;
  };
  user: {
    id: number;
  };
  rating: number;
  pros: string;
  cons: string;
  title: string;
  content: string;
}

export type ReviewBike = {
  id: number;
  rating: number;
  title: string;
  content: string;
  bikeId: number;
  bikeName: string;
  bikeModel: string
  userName: string;
  userAvatar: string;
}