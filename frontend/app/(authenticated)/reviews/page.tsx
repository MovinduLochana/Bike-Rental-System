"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { format } from "date-fns";
// import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ThumbsUp,
  MessageCircle,
  Filter,
  Search,
  ChevronDown,
  Flag,
  Edit,
  Trash2,
  // X,
  Plus,
  // Camera,
  AlertCircle,
} from "lucide-react";

// Shadcn components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Review } from "@/types/reviews";
import { getUserRides } from "@/lib/rideService";
import { createReviewWithoutImage, getAllReviews } from "@/lib/reviewService";
import { Ride } from "@/types/rides";

// Mock data for reviews
// const mockReviews = [
//   {
//     id: 1,
//     userName: "Amal Perera",
//     userAvatar: "/avatars/amal.jpg",
//     bikeName: "Honda CBR 500R",
//     bikeImage: "/storage/bike/CBR.jpg",
//     rating: 5,
//     title: "Amazing riding experience!",
//     content:
//       "The Honda CBR 500R was in excellent condition and performed flawlessly during my trip to Kandy. The bike handled the mountain roads with ease, and the power was perfect for both highway cruising and city traffic. Highly recommend!",
//     pros: "Great power, comfortable seat, reliable brakes",
//     cons: "None really, maybe just a bit heavy for beginners",
//     images: [
//       "/storage/reviews/cbr-review-1.jpg",
//       "/storage/reviews/cbr-review-2.jpg",
//     ],
//     helpfulCount: 12,
//     commentCount: 3,
//     createdAt: "2025-03-28T14:23:00",
//     rideDate: "2025-03-25T10:00:00",
//   },
//   {
//     id: 2,
//     userName: "Nimal Silva",
//     userAvatar: "/avatars/nimal.jpg",
//     bikeName: "KTM Duke 390",
//     bikeImage: "/storage/bike/KTM.jpg",
//     rating: 4,
//     title: "Great for city rides, but had minor issues",
//     content:
//       "The Duke 390 was fun to ride around Colombo. Very nimble and quick in traffic. The only issue I had was that the seat became uncomfortable after about an hour of riding. Otherwise, great bike for short to medium trips.",
//     pros: "Agile handling, quick acceleration, eye-catching design",
//     cons: "Uncomfortable seat for long rides, gets hot in traffic",
//     images: ["/storage/reviews/ktm-review-1.jpg"],
//     helpfulCount: 8,
//     commentCount: 2,
//     createdAt: "2025-03-20T09:15:00",
//     rideDate: "2025-03-18T09:30:00",
//   },
//   {
//     id: 3,
//     userName: "Chamari Jayawardene",
//     userAvatar: "/avatars/chamari.jpg",
//     bikeName: "Yamaha MT-15",
//     bikeImage: "/storage/bike/MT15.jpg",
//     rating: 5,
//     title: "Perfect for beginner riders!",
//     content:
//       "As a relatively new rider, I was looking for something manageable but still fun. The MT-15 was perfect! Easy to handle with enough power to be exciting without being intimidating. The rental process was smooth and the bike was in great condition.",
//     pros: "Lightweight, easy to handle, stylish design",
//     cons: "Could use a bit more power for highway riding",
//     images: [],
//     helpfulCount: 5,
//     commentCount: 1,
//     createdAt: "2025-03-15T16:45:00",
//     rideDate: "2025-03-12T11:00:00",
//   },
//   {
//     id: 4,
//     userName: "Kasun Fernando",
//     userAvatar: "/avatars/kasun.jpg",
//     bikeName: "Suzuki Gixxer SF",
//     bikeImage: "/storage/bike/Gixxer.jpg",
//     rating: 3,
//     title: "Decent bike, but cleanliness could be improved",
//     content:
//       "The Gixxer SF performed well mechanically, but it wasn't as clean as I expected when I picked it up. There were some mud stains on the fairings and the chain needed lubrication. The ride itself was comfortable once I got going.",
//     pros: "Good handling, decent power, comfortable riding position",
//     cons: "Wasn't properly cleaned, chain needed maintenance",
//     images: [],
//     helpfulCount: 3,
//     commentCount: 4,
//     createdAt: "2025-03-10T11:20:00",
//     rideDate: "2025-03-07T13:15:00",
//   },
// ];

// Rating summary calculated from mock data

export default function ReviewsPage() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState<string>("all");
  const [filterBike, setFilterBike] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("all-reviews");
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);

  const [selectedRide, setSelectedRide] = useState<string>("0");
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [reviewPros, setReviewPros] = useState("");
  const [reviewCons, setReviewCons] = useState("");
  const [reviewRating, setReviewRating] = useState<number>(5);
  // const [reviewImages, setReviewImages] = useState<File[]>([]);
  // const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);

  const [rides, setRides] = useState<Ride[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const fetchedReviews = await getAllReviews();
      const allRides = await getUserRides(user?.id ?? 0);

      console.log(fetchedReviews);

      setRides(allRides);
      setReviews(fetchedReviews);
    };
    fetchReviews();
  }, [user?.id]);

  const ratingSummary = {
    average: reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length,
    total: reviews.length,
    distribution: [
      { rating: 5, count: 2, percentage: 50 },
      { rating: 4, count: 1, percentage: 25 },
      { rating: 3, count: 1, percentage: 25 },
      { rating: 2, count: 0, percentage: 0 },
      { rating: 1, count: 0, percentage: 0 },
    ],
  };

  // Mock user's rides for review selection
  // const userRides = [
  //   { id: "ride-1234", bikeName: "Honda CBR 500R", date: "2025-03-25" },
  //   { id: "ride-2345", bikeName: "KTM Duke 390", date: "2025-02-18" },
  //   { id: "ride-3456", bikeName: "Yamaha MT-15", date: "2025-01-12" },
  // ];

  // Filter reviews based on search and filters
  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.bike.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRating =
      filterRating === "all" || review.rating === parseInt(filterRating);

    const matchesBike = filterBike === "all";

    const matchesTab = activeTab === "all-reviews";

    return matchesSearch && matchesRating && matchesBike && matchesTab;
  });

  // Handle file upload for review images
  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     const filesArray = Array.from(e.target.files);

  //     // Limit to 3 images total
  //     const newImages = [...reviewImages, ...filesArray].slice(0, 3);
  //     setReviewImages(newImages);

  //     // Generate preview URLs
  //     const newImagePreviewUrls = newImages.map(file => URL.createObjectURL(file));
  //     setImagePreviewUrls(newImagePreviewUrls);
  //   }
  // };

  // Remove an image from the preview
  // const removeImage = (indexToRemove: number) => {
  //   const updatedImages = [...reviewImages];
  //   updatedImages.splice(indexToRemove, 1);
  //   setReviewImages(updatedImages);

  //   const updatedPreviewUrls = [...imagePreviewUrls];
  //   URL.revokeObjectURL(updatedPreviewUrls[indexToRemove]);
  //   updatedPreviewUrls.splice(indexToRemove, 1);
  //   setImagePreviewUrls(updatedPreviewUrls);
  // };

  // Submit new review
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newReview = {
      user: {
        id: user?.id ?? 0,
      },
      bike: {
        id: parseInt(selectedRide),
      },
      rating: reviewRating,
      pros: reviewPros,
      cons: reviewCons,
      title: reviewTitle,
      content: reviewContent,
    };

    const review = await createReviewWithoutImage(newReview);

    if (!review) console.error("Failed to create review");

    setReviews([review, ...reviews]);

    setIsWriteReviewOpen(false);
    setSelectedRide("");
    setReviewTitle("");
    setReviewContent("");
    setReviewPros("");
    setReviewCons("");
    setReviewRating(5);
    // setReviewImages([]);
    // setImagePreviewUrls([]);
  };

  // Cleanup image preview URLs when component unmounts
  // useEffect(() => {
  //   return () => {
  //     imagePreviewUrls.forEach((url) => URL.revokeObjectURL(url));
  //   };
  // }, [imagePreviewUrls]);

  // Get unique bikes from reviews for filter
  const uniqueBikes = Array.from(
    new Set(reviews.map((review) => review.bike.name))
  ).map((bikeId) => {
    const review = reviews.find((r) => r.bike.name === bikeId);
    return {
      id: bikeId,
      name: review?.bike.name || "",
    };
  });

  // Helper function to render star ratings
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        {/* Header section */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Bike Reviews</h1>
          <p className="text-gray-500">
            Read what our customers have to say about their riding experiences
          </p>
        </div>

        {/* Review summary and write review button */}
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  <span className="text-4xl font-bold mr-2">
                    {ratingSummary.average.toFixed(1)}
                  </span>
                  <div className="flex flex-col">
                    {renderStars(Math.round(ratingSummary.average))}
                    <span className="text-sm text-gray-500 mt-1">
                      Based on {ratingSummary.total} reviews
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {ratingSummary.distribution.map((dist) => (
                  <div key={dist.rating} className="flex items-center">
                    <div className="w-20 text-sm font-medium">
                      {dist.rating} {dist.rating === 1 ? "star" : "stars"}
                    </div>
                    <div className="w-full ml-2 mr-4">
                      <Progress value={dist.percentage} className="h-2" />
                    </div>
                    <div className="text-sm text-gray-500 w-10">
                      {dist.count}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 flex flex-col justify-center items-center text-center border-t md:border-l md:border-t-0 border-gray-100">
              <h3 className="text-xl font-semibold mb-2">
                Share Your Experience
              </h3>
              <p className="text-gray-600 mb-6 max-w-sm">
                Have you rented one of our bikes recently? Tell others about
                your experience!
              </p>
              <Dialog
                open={isWriteReviewOpen}
                onOpenChange={setIsWriteReviewOpen}
              >
                <DialogTrigger asChild>
                  <Button size="lg" className="px-8">
                    <Plus className="mr-2 h-4 w-4" />
                    Write a Review
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-xl">
                  <DialogHeader>
                    <DialogTitle>Write a Review</DialogTitle>
                    <DialogDescription>
                      Share your experience to help other riders make informed
                      decisions.
                    </DialogDescription>
                  </DialogHeader>

                  <form
                    onSubmit={handleReviewSubmit}
                    className="space-y-4 mt-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="ride">Select your ride</Label>
                      <Select
                        value={selectedRide}
                        onValueChange={setSelectedRide}
                        required
                      >
                        <SelectTrigger id="ride">
                          <SelectValue placeholder="Select a ride to review" />
                        </SelectTrigger>
                        <SelectContent>
                          {rides.map((ride) => (
                            <SelectItem
                              key={ride.id}
                              value={ride.id.toString()}
                            >
                              {ride.bike.name}
                              {/* ({ride.startTime.toISOString() }) */}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Your Rating</Label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewRating(star)}
                            className="rounded-md hover:bg-gray-100 p-1"
                          >
                            <Star
                              className={`h-6 w-6 ${
                                star <= reviewRating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="title">Review Title</Label>
                      <Input
                        id="title"
                        value={reviewTitle}
                        onChange={(e) => setReviewTitle(e.target.value)}
                        placeholder="Summarize your experience"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content">Your Review</Label>
                      <Textarea
                        id="content"
                        value={reviewContent}
                        onChange={(e) => setReviewContent(e.target.value)}
                        placeholder="Tell us about your experience with the bike..."
                        className="min-h-[100px]"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="pros">Pros (Optional)</Label>
                        <Input
                          id="pros"
                          value={reviewPros}
                          onChange={(e) => setReviewPros(e.target.value)}
                          placeholder="What did you like most?"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cons">Cons (Optional)</Label>
                        <Input
                          id="cons"
                          value={reviewCons}
                          onChange={(e) => setReviewCons(e.target.value)}
                          placeholder="Any areas for improvement?"
                        />
                      </div>
                    </div>

                    {/* <div className="space-y-2 disabled:true">
                      <Label>Photos (Upcoming feature)</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {imagePreviewUrls.map((url, index) => (
                          <div
                            key={index}
                            className="disabled:true relative h-24 rounded-md overflow-hidden border border-gray-200"
                          >
                            <Image
                              src={url}
                              fill
                              alt={`Review image ${index + 1}`}
                              className="object-cover"
                            />
                            <button
                              disabled={true}
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-white rounded-full p-0.5 shadow-sm"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                        {imagePreviewUrls.length < 3 && (
                          <Label
                            aria-disabled={true}
                            htmlFor="image-upload"
                            className="border-2 border-dashed border-gray-200 rounded-md h-24 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                          >
                            <Camera className="h-5 w-5 text-gray-400 disabled:true" />
                            <span className="text-xs text-gray-500 mt-1 disabled:true">
                              Add photo | coming soon
                            </span>
                            <input
                              disabled={true}
                              id="image-upload"
                              type="file"
                              accept="image/*"
                              // onChange={handleImageUpload}
                              className="sr-only"
                              multiple
                            />
                          </Label>
                        )}
                      </div>
                      <p className="text-xs text-gray-500" aria-disabled={true}>
                        Add up to 3 photos. Max 5MB each.
                      </p>
                    </div> */}

                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsWriteReviewOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Submit Review</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </Card>

        {/* Tabs and filters */}
        <div>
          <Tabs
            defaultValue="all-reviews"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <TabsList className="mb-4 sm:mb-0">
                <TabsTrigger value="all-reviews">All Reviews</TabsTrigger>
                <TabsTrigger value="my-reviews">My Reviews</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none sm:w-64">
                  <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search reviews..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-1">
                      <Filter className="h-4 w-4" />
                      <span className="hidden sm:inline">Filter</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="p-2">
                      <p className="text-sm font-medium mb-2">Rating</p>
                      <Select
                        value={filterRating}
                        onValueChange={setFilterRating}
                      >
                        <SelectTrigger className="h-8">
                          <SelectValue placeholder="Filter by rating" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All ratings</SelectItem>
                          <SelectItem value="5">5 stars</SelectItem>
                          <SelectItem value="4">4 stars</SelectItem>
                          <SelectItem value="3">3 stars</SelectItem>
                          <SelectItem value="2">2 stars</SelectItem>
                          <SelectItem value="1">1 star</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <DropdownMenuSeparator />
                    <div className="p-2">
                      <p className="text-sm font-medium mb-2">Bike Model</p>
                      <Select value={filterBike} onValueChange={setFilterBike}>
                        <SelectTrigger className="h-8">
                          <SelectValue placeholder="Filter by bike" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all" key={0}>
                            All bikes
                          </SelectItem>
                          {uniqueBikes.map((bike) => (
                            <SelectItem key={bike.id} value={bike.id}>
                              {bike.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <TabsContent value="all-reviews" className="m-0">
              {filteredReviews.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                    <AlertCircle className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    No reviews found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your filters or search terms
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredReviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="my-reviews" className="m-0">
              {filteredReviews.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                    <AlertCircle className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    You haven&apos;t written any reviews yet
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Share your experience with our bikes
                  </p>
                  <Button onClick={() => setIsWriteReviewOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Write Your First Review
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredReviews.map((review) => (
                    <ReviewCard
                      key={review.id}
                      review={review}
                      isOwnReview={review.user.id == user?.id}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

// Review Card Component
interface ReviewCardProps {
  review: Review;
  isOwnReview?: boolean;
}

function ReviewCard({ review, isOwnReview = false }: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const isLongReview = review.content.length > 300;
  const displayContent =
    isExpanded || !isLongReview
      ? review.content
      : review.content.substring(0, 300) + "...";

  const handleHelpfulClick = () => {
    if (!hasVoted) {
      setHasVoted(true);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          {/* Review header - user info, date, rating */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage
                  src={`https://ui-avatars.com/api/?name=${review.user.name}`}
                  alt={review.user.name}
                />
                {/* <AvatarFallback>{review.userName}</AvatarFallback> */}
              </Avatar>
              <div>
                <div className="flex items-center">
                  <p className="font-semibold text-sm">{review.user.name}</p>(
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge
                          variant="outline"
                          className="ml-2 text-xs bg-green-50 text-green-700 border-green-200"
                        >
                          Verified Rental
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs w-52">
                          This review is from a verified customer who rented
                          this bike
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  )
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-0.5">
                  <span>
                    {format(new Date(review.createdTime), "MMM dd, yyyy")}
                  </span>
                  <span className="mx-2">·</span>
                  <Link
                    href={`/rides/${review.bike.id}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {review.bike.name}
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              {/* {renderStars(review.rating)} */}

              {isOwnReview && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <svg
                        width="15"
                        height="3"
                        viewBox="0 0 15 3"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.5 3C2.32843 3 3 2.32843 3 1.5C3 0.671573 2.32843 0 1.5 0C0.671573 0 0 0.671573 0 1.5C0 2.32843 0.671573 3 1.5 3Z"
                          fill="currentColor"
                        />
                        <path
                          d="M7.5 3C8.32843 3 9 2.32843 9 1.5C9 0.671573 8.32843 0 7.5 0C6.67157 0 6 0.671573 6 1.5C6 2.32843 6.67157 3 7.5 3Z"
                          fill="currentColor"
                        />
                        <path
                          d="M13.5 0C12.6716 0 12 0.671573 12 1.5C12 2.32843 12.6716 3 13.5 3C14.3284 3 15 2.32843 15 1.5C15 0.671573 14.3284 0 13.5 0Z"
                          fill="currentColor"
                        />
                      </svg>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="cursor-pointer">
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit Review</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete Review</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>

          {/* Review title and content */}
          <h3 className="text-lg font-semibold mb-2">{review.title}</h3>
          <p className="text-gray-700 mb-4">{displayContent}</p>

          {isLongReview && (
            <Button
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              className="mb-3 h-8 px-2 text-sm text-blue-600 hover:text-blue-700"
            >
              {isExpanded ? "Show less" : "Read more"}
            </Button>
          )}

          {/* Pros and Cons */}
          {(review.pros || review.cons) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {review.pros && (
                <div className="bg-green-50 rounded-md p-3">
                  <p className="text-sm font-medium text-green-800 mb-1">
                    Pros
                  </p>
                  <p className="text-sm text-green-700">{review.pros}</p>
                </div>
              )}
              {review.cons && (
                <div className="bg-amber-50 rounded-md p-3">
                  <p className="text-sm font-medium text-amber-800 mb-1">
                    Cons
                  </p>
                  <p className="text-sm text-amber-700">{review.cons}</p>
                </div>
              )}
            </div>
          )}

          {/* Review images */}
          {/* {review.images && review.images.length > 0 && (
            <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
              {review.images.map((image: string, index: number) => (
                <div
                  key={index}
                  className="h-24 w-24 flex-shrink-0 rounded-md overflow-hidden"
                >
                  <Image
                    src={image}
                    alt={`Review image ${index + 1}`}
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )} */}
        </div>

        <Separator />

        {/* Review footer - helpful button, comments */}
        <div className="px-6 py-3 bg-gray-50 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center space-x-2 ${
                hasVoted ? "text-blue-600" : "text-gray-600"
              }`}
              onClick={handleHelpfulClick}
              disabled={hasVoted}
            >
              <ThumbsUp className="h-4 w-4" />
              {/* <span>Helpful ({helpfulCount})</span> */}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2 text-gray-600"
            >
              <MessageCircle className="h-4 w-4" />
              {/* <span>Comment ({review.commentCount})</span> */}
              <span>count</span>
            </Button>
          </div>

          {!isOwnReview && (
            <Button variant="ghost" size="sm" className="text-gray-600">
              <Flag className="h-4 w-4" />
              <span className="sr-only">Report</span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
