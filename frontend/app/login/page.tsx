"use client";

import { useState, useEffect, Suspense } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, AlertCircle, Loader2, LockKeyhole, User } from "lucide-react";

// import { motion } from "motion/react";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const { login, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check for query params on mount
  useEffect(() => {
    // Check if user just registered
    const registered = searchParams.get("registered");
    if (registered === "true") {
      setSuccessMessage("Account created successfully! Please log in.");
    }
    
    // Check for redirected login attempts
    const redirectFrom = searchParams.get("from");
    if (redirectFrom) {
      setError(`Please log in to access ${redirectFrom}`);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setError("");
    setSuccessMessage("");
    
    if (!username.trim()) {
      setError("Username is required");
      return;
    }
    
    if (!password) {
      setError("Password is required");
      return;
    }
    
    
    try {
      const res = await login(username, password);

      if (!res) {
        setError("Invalid username or password");
        return;
      }

      setSuccessMessage("Login successful! Redirecting...");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      const redirectTo = searchParams.get("redirectTo") || "/profile";
      router.push(redirectTo);
      
    } catch (err) {
      console.error("Login error:", err);
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      
    }
  };

  // Animations
  // const fadeIn = {
  //   hidden: { opacity: 0, y: 20 },
  //   visible: { 
  //     opacity: 1, 
  //     y: 0,
  //     transition: { duration: 0.4 }
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
      {/* <motion.div 
        className="max-w-md w-full space-y-8"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      > */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account to continue
          </p>
        </div>
        
        {/* Success Message */}
        {successMessage && (
          <Alert className="bg-green-50 border-green-200">
            <div className="flex items-center">
              <div className="bg-green-100 p-1 rounded-full">
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <AlertTitle className="ml-3 text-green-800 font-medium">Success</AlertTitle>
            </div>
            <AlertDescription className="ml-9 text-green-700">
              {successMessage}
            </AlertDescription>
          </Alert>
        )}
        
        {/* Error Message */}
        {error && (
          <Alert className="border-red-200 bg-red-50">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <AlertTitle className="ml-3 text-red-800 font-medium">Error</AlertTitle>
            </div>
            <AlertDescription className="ml-9 text-red-700">
              {error}
            </AlertDescription>
          </Alert>
        )}
        
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-blue-600 p-4">
            <div className="flex items-center text-white">
              <LockKeyhole className="h-6 w-6 mr-2" />
              <h2 className="text-xl font-semibold">Login</h2>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                Username
              </Label>
              <div className="relative">
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10"
                  disabled={loading}
                />
                <User className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <Link href="/forgot-password" className="text-xs text-blue-600 hover:text-blue-500">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  disabled={loading}
                />
                <LockKeyhole className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="flex items-center">
                <Checkbox
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />
                <Label 
                  htmlFor="remember-me" 
                  className="ml-2 text-sm text-gray-600 cursor-pointer"
                >
                  Remember me
                </Label>
              </div>
            </div>
            
            <div>
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </div>
          </form>
          
          <div className="px-6 pb-6 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                Sign up
              </Link>
            </p>
            
            <div className="mt-6 border-t border-gray-200 pt-4">
              <p className="text-xs text-gray-500">
                By signing in, you agree to our{" "}
                <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
        {/* motion div here */}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<Loader2 className="h-8 w-8 text-blue-500 animate-spin" />}>
      <Login />
    </Suspense>
  );
}