"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronRight, Shield, Clock, Star, MapPin, Bike, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useAuth } from "@/lib/AuthContext";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import HeroSection from "@/components/home/HeroSection";

export default function Home() {
  const router = useRouter();
  const [bikeName, setBikeName] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const { isAuthenticated, user } = useAuth();

  // Track scroll position for parallax and animation effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (bikeName.trim()) {
      router.push(`/results?search?name=${encodeURIComponent(bikeName)}`);
    }
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerItems = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed w-full z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Bike className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">BikeRent</span>
              </Link>
              <nav className="hidden md:ml-10 md:flex space-x-8">
                <Link href="/rides" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  Find Bikes
                </Link>
                <Link href="/rides/history" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  My Rides
                </Link>
                <Link href="/about" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  About Us
                </Link>
                <Link href="/contact" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  Contact
                </Link>
              </nav>
            </div>
            {!isAuthenticated ? (
            <div className="flex items-center">
              <Link href="/login">
                <Button variant="ghost" className="mr-2">Log in</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign up</Button>
              </Link>
            </div>
            ) : (
              <Avatar 
                
                className="h-10 w-10"
                onClick={() => router.push("/profile")}
              >
                <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name ?? "default" )}&size=192`} />
              </Avatar>
              )}
          </div>
        </div>
      </header>

      {/* Hero Section with Animation */}
      <section className="relative h-[90vh] overflow-hidden pt-16">
        <div 
          className="absolute inset-0 z-0"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`
          }}
        >
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
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.3 }
              }
            }}
            className="max-w-2xl"
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-bold text-white leading-tight"
            >
              Explore The City <br/>
              <span className="text-blue-300">On Two Wheels</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="mt-6 text-xl text-gray-200 max-w-lg"
            >
              Rent premium motorbikes and experience the thrill of the ride. 
              Affordable rates, flexible booking, unforgettable journeys.
            </motion.p>
            
            <motion.form 
              variants={fadeInUp}
              onSubmit={handleSearch}
              className="mt-8 sm:flex max-w-md bg-white/10 backdrop-blur-md p-1 rounded-lg"
            >
              <div className="flex-1">
                <Input
                  value={bikeName}
                  onChange={(e) => setBikeName(e.target.value)}
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
            </motion.form>
            
            <motion.div
              variants={fadeInUp} 
              className="mt-8 flex items-center"
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
            </motion.div>
          </motion.div>
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
      {/* <HeroSection /> */}

      {/* Bike Showcase */}
      <section className="py-16 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerItems}
            className="text-center mb-12"
          >
            <motion.span variants={fadeInUp} className="block text-blue-600 font-medium mb-2">PREMIUM SELECTION</motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-gray-900">
              Explore Our Top Bikes
            </motion.h2>
            <motion.div variants={fadeInUp} className="h-1 w-20 bg-blue-600 mx-auto mt-4"></motion.div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerItems}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                name: "Honda CBR 500R",
                image: "/storage/bike/CBR.jpg",
                price: 2500,
                rating: 4.8,
                type: "Sport"
              },
              {
                name: "KTM Duke 390",
                image: "/storage/bike/KTM.jpg",
                price: 2200,
                rating: 4.7,
                type: "Naked"
              },
              {
                name: "Royal Enfield Classic 350",
                image: "/storage/bike/royal-enfield.jpg",
                price: 1800,
                rating: 4.6,
                type: "Cruiser"
              }
            ].map((bike, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={bike.image}
                    alt={bike.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold">
                    {bike.type}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900">{bike.name}</h3>
                  <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 text-sm text-gray-600">{bike.rating} (120+ rides)</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-lg font-bold text-gray-900">
                      LKR {bike.price}
                      <span className="text-sm font-normal text-gray-500">/day</span>
                    </p>
                    <Link href="/rides">
                      <Button size="sm" variant="outline">View Details</Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link href="/rides">
              <Button size="lg" variant="outline" className="group">
                Browse All Bikes
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerItems}
            className="text-center mb-12"
          >
            <motion.span variants={fadeInUp} className="block text-blue-600 font-medium mb-2">WHY CHOOSE US</motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-gray-900">
              The Perfect Ride Experience
            </motion.h2>
            <motion.div variants={fadeInUp} className="h-1 w-20 bg-blue-600 mx-auto mt-4"></motion.div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerItems}
            className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12"
          >
            <motion.div variants={fadeInUp} className="relative">
              <div className="absolute -left-4 -top-4 bg-blue-100 rounded-full p-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div className="pl-12">
                <h3 className="text-xl font-semibold mb-3">Safe & Reliable</h3>
                <p className="text-gray-600">
                  All our bikes are regularly maintained and come with full insurance coverage for your peace of mind.
                </p>
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="relative">
              <div className="absolute -left-4 -top-4 bg-green-100 rounded-full p-4">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div className="pl-12">
                <h3 className="text-xl font-semibold mb-3">Flexible Rentals</h3>
                <p className="text-gray-600">
                  Choose hourly, daily, or weekly rentals with easy pickup and drop-off at multiple locations.
                </p>
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="relative">
              <div className="absolute -left-4 -top-4 bg-amber-100 rounded-full p-4">
                <MapPin className="h-6 w-6 text-amber-600" />
              </div>
              <div className="pl-12">
                <h3 className="text-xl font-semibold mb-3">Island-Wide Network</h3>
                <p className="text-gray-600">
                  Find our bikes across Sri Lanka with convenient pickup locations in every major city.
                </p>
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="relative">
              <div className="absolute -left-4 -top-4 bg-purple-100 rounded-full p-4">
                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="pl-12">
                <h3 className="text-xl font-semibold mb-3">Affordable Pricing</h3>
                <p className="text-gray-600">
                  Competitive rates with no hidden fees. Get the best value for your money with our transparent pricing.
                </p>
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="relative">
              <div className="absolute -left-4 -top-4 bg-red-100 rounded-full p-4">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="pl-12">
                <h3 className="text-xl font-semibold mb-3">24/7 Support</h3>
                <p className="text-gray-600">
                  Our customer support team is always available to assist you with any questions or emergencies.
                </p>
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="relative">
              <div className="absolute -left-4 -top-4 bg-teal-100 rounded-full p-4">
                <Users className="h-6 w-6 text-teal-600" />
              </div>
              <div className="pl-12">
                <h3 className="text-xl font-semibold mb-3">Community Rides</h3>
                <p className="text-gray-600">
                  Join our growing community of riders for group trips and special events across Sri Lanka.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerItems}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="block text-blue-600 font-medium mb-2">SIMPLE PROCESS</motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-gray-900">
              How It Works
            </motion.h2>
            <motion.div variants={fadeInUp} className="h-1 w-20 bg-blue-600 mx-auto mt-4"></motion.div>
          </motion.div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-24 left-0 w-full h-0.5 bg-gray-200 hidden md:block"></div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerItems}
              className="grid grid-cols-1 md:grid-cols-4 gap-8"
            >
              <motion.div 
                variants={fadeInUp}
                className="text-center relative"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 text-xl font-bold mb-4 relative z-10">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2">Browse Bikes</h3>
                <p className="text-gray-600">
                  Explore our collection of premium bikes and find your perfect ride.
                </p>
              </motion.div>
              
              <motion.div 
                variants={fadeInUp}
                className="text-center relative"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 text-xl font-bold mb-4 relative z-10">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2">Book Online</h3>
                <p className="text-gray-600">
                  Select your dates and complete the reservation with secure payment.
                </p>
              </motion.div>
              
              <motion.div 
                variants={fadeInUp}
                className="text-center relative"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 text-xl font-bold mb-4 relative z-10">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2">Pick Up</h3>
                <p className="text-gray-600">
                  Collect your bike from the nearest location with a simple verification process.
                </p>
              </motion.div>
              
              <motion.div 
                variants={fadeInUp}
                className="text-center relative"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 text-xl font-bold mb-4 relative z-10">
                  4
                </div>
                <h3 className="text-lg font-semibold mb-2">Enjoy the Ride</h3>
                <p className="text-gray-600">
                  Hit the road and experience the freedom of two wheels.
                </p>
              </motion.div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link href="/rides">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Your Journey
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Customer Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerItems}
            className="text-center mb-12"
          >
            <motion.span variants={fadeInUp} className="block text-blue-600 font-medium mb-2">TESTIMONIALS</motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-gray-900">
              What Our Riders Say
            </motion.h2>
            <motion.div variants={fadeInUp} className="h-1 w-20 bg-blue-600 mx-auto mt-4"></motion.div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerItems}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                name: "Amal Perera",
                location: "Colombo",
                image: "/storage/bike/kawsaki.jpg",
                text: "The bike was in perfect condition, and the rental process was incredibly smooth. Will definitely be using BikeRent for all my future trips!",
                rating: 5
              },
              {
                name: "Nimal Silva",
                location: "Kandy",
                image: "/storage/bike/KTM_Orange.webp",
                text: "Great experience riding the KTM Duke around Kandy. The team was professional and helpful throughout my rental period.",
                rating: 4
              },
              {
                name: "Chamari Jayawardene",
                location: "Galle",
                image: "/storage/bike/HarleyDvidson.webp",
                text: "As a beginner rider, I appreciated the helpful guidance from the staff. The bike was perfect for my skill level, and I felt safe the entire time.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white p-6 rounded-lg shadow-md relative"
              >
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                  ))}
                </div>
                <p className="text-gray-600">&ldquo;{testimonial.text}&ldquo;</p>
                <svg className="absolute bottom-2 right-2 h-16 w-16 text-gray-100" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8c-2.209 0-4 1.791-4 4v12h12v-8h-8v-4c0-2.209 1.791-4 4-4v-4c-4.418 0-8 3.582-8 8zM22 8c-2.209 0-4 1.791-4 4v12h12v-8h-8v-4c0-2.209 1.791-4 4-4v-4c-4.418 0-8 3.582-8 8z"></path>
                </svg>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Link href="/reviews">
              <Button variant="link" className="text-blue-600 hover:text-blue-800">
                Read all reviews
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Download App CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-10">
          <Image
            src="/storage/bike/royal-enfield.jpg"
            alt="Mobile app"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Download Our Mobile App</h2>
              <p className="text-blue-100 text-lg mb-8">
                Get the BikeRent app for easier bookings, real-time bike tracking, and exclusive mobile discounts.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Image
                  src="/storage/user/app-store.jpg"
                  alt="Download on App Store"
                  width={180}
                  height={60}
                  className="h-12 w-auto"
                />
                <Image
                  src="/storage/user/google-play.png"
                  alt="Get it on Google Play"
                  width={180}
                  height={60}
                  className="h-12 w-auto"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center md:justify-end"
            >
              <div className="relative">
                <Image
                  src="/storage/bike/app-bg.jpg"
                  alt="BikeRent mobile app"
                  width={300}
                  height={600}
                  className="rounded-2xl shadow-2xl border-8 border-white/10"
                />
                <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 rounded-full px-4 py-2 font-bold text-sm transform rotate-12">
                  4.9 ★ Rating
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center mb-6">
                <Bike className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold">BikeRent</span>
              </div>
              <p className="text-gray-400 mb-6">
                Premium motorbike rental service in Sri Lanka. Experience the joy of riding with our well-maintained fleet.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link href="/rides" className="text-gray-400 hover:text-white">Browse Bikes</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-3">
                <li><Link href="/help" className="text-gray-400 hover:text-white">Help Center</Link></li>
                <li><Link href="/safety" className="text-gray-400 hover:text-white">Safety Information</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-gray-400 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-400">123 Galle Road, Colombo 03, Sri Lanka</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-gray-400 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-400">+94 11 234 5678</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-gray-400 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-400">info@bikerent.lk</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} BikeRent. All rights reserved.
              </p>
              <div className="mt-4 md:mt-0 flex items-center">
                <p className="text-gray-400 text-sm mr-4">Payment Methods:</p>
                <div className="flex space-x-4">
                  <Image src="/storage/assets/visa.webp" alt="Visa" width={40} height={25} />
                  <Image src="/storage/assets/MasterCardpng.png" alt="Mastercard" width={40} height={25} />
                  <Image src="/storage/assets/paypal.jpg" alt="PayPal" width={40} height={25} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}