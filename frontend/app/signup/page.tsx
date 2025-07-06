"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Check, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Loader2, 
  UserPlus,
  Phone,
  MapPin
} from "lucide-react";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";

import { register } from "@/lib/userService";

// Define validation schema using zod
const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .regex(/^\d+$/, { message: "Phone must contain only digits" }),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignUp() {
  // Form values
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  
  // Form state
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [emailCheckDebounce, setEmailCheckDebounce] = useState<NodeJS.Timeout | null>(null);
  
  const { setUser, setIsAuthenticated } = useAuth();
  const router = useRouter();

  // Update form data
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: "" }));
    }
    
    // Check email availability with debounce
    if (name === "email" && value.includes("@")) {
      setIsCheckingEmail(true);
      
      // Clear previous timeout
      if (emailCheckDebounce) clearTimeout(emailCheckDebounce);
      
      // Set new timeout
      const timeout = setTimeout(() => {
        checkEmailExists(value);
      }, 300);
      
      setEmailCheckDebounce(timeout);
    }
  };
  
  // Check if email already exists
  const checkEmailExists = async (email: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/check-email?email=${encodeURIComponent(email)}`);
      const data = await response.json();
      
      setEmailExists(data.exists);
      if (data.exists) {
        setValidationErrors(prev => ({ ...prev, email: "Email already in use" }));
      }
    } catch (error) {
      console.error("Error checking email:", error);
    } finally {
      setIsCheckingEmail(false);
    }
  };
  
  // Validate single field
  const validateField = (name: keyof SignupFormData, value: string) => {
    try {
      const fieldSchema = signupSchema._def.schema.shape[name];
      fieldSchema.parse(value);
      setValidationErrors(prev => ({ ...prev, [name]: "" }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const message = error.errors[0]?.message || `Invalid ${String(name)}`;
        setValidationErrors(prev => ({ ...prev, [name]: message }));
        return false;
      }
      return false;
    }
  };
  
  // Validate all fields
  const validateForm = () => {
    try {
      signupSchema.parse(formData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message;
          }
        });
        setValidationErrors(errors);
      }
      return false;
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setError("");
    
    // Check for email existence
    if (emailExists) {
      setError("Email already exists. Please use a different email address.");
      return;
    }
    
    // Validate all fields
    if (!validateForm()) {
      setError("Please fix the errors in the form.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { confirmPassword, ...userData } = formData;
      
      const data = await register(userData);
    
      if (!data) {
        setError("Failed to create account. Please try again.");
        return;
      }

      setUser(data);
      setIsAuthenticated(true);

      router.push("/login?registered=true");
      
    } catch (err) {
      setError((err as Error).message || "An error occurred during sign up");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Clean up debounce timeout on unmount
  useEffect(() => {
    return () => {
      if (emailCheckDebounce) clearTimeout(emailCheckDebounce);
    };
  }, [emailCheckDebounce]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create an Account</h1>
          <p className="mt-2 text-sm text-gray-600">
            Join BikeRent to start your riding adventure
          </p>
        </div>
        
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-blue-600 p-4">
            <div className="flex items-center text-white">
              <UserPlus className="h-6 w-6 mr-2" />
              <h2 className="text-xl font-semibold">Sign Up</h2>
            </div>
          </div>
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 m-4">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Name field */}
            <div className="space-y-1">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                onBlur={() => validateField("name", formData.name)}
                placeholder="John Doe"
                className={validationErrors.name ? "border-red-500" : ""}
              />
              {validationErrors.name && (
                <p className="text-xs text-red-500 mt-1">{validationErrors.name}</p>
              )}
            </div>
            
            {/* Email field */}
            <div className="space-y-1">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => validateField("email", formData.email)}
                  placeholder="you@example.com"
                  className={`${validationErrors.email || emailExists ? "border-red-500" : ""} pr-10`}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  {isCheckingEmail ? (
                    <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />
                  ) : formData.email && !validationErrors.email && !emailExists ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : null}
                </div>
              </div>
              {validationErrors.email && (
                <p className="text-xs text-red-500 mt-1">{validationErrors.email}</p>
              )}
              {emailExists && !validationErrors.email && (
                <p className="text-xs text-red-500 mt-1">Email already in use</p>
              )}
            </div>
            
            {/* Phone field */}
            <div className="space-y-1">
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone Number
              </Label>
              <div className="relative">
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={() => validateField("phone", formData.phone)}
                  placeholder="+94 XX XXX XXXX"
                  className={validationErrors.phone ? "border-red-500" : ""}
                />
                <Phone className="h-4 w-4 text-gray-400 absolute top-3 right-3" />
              </div>
              {validationErrors.phone && (
                <p className="text-xs text-red-500 mt-1">{validationErrors.phone}</p>
              )}
            </div>
            
            {/* Address field */}
            <div className="space-y-1">
              <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                Address
              </Label>
              <div className="relative">
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  onBlur={() => validateField("address", formData.address)}
                  placeholder="Your full address"
                  className={`min-h-20 ${validationErrors.address ? "border-red-500" : ""}`}
                />
                <MapPin className="h-4 w-4 text-gray-400 absolute top-3 right-3" />
              </div>
              {validationErrors.address && (
                <p className="text-xs text-red-500 mt-1">{validationErrors.address}</p>
              )}
            </div>
            
            {/* Password field */}
            <div className="space-y-1">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={() => validateField("password", formData.password)}
                  placeholder="••••••••"
                  className={validationErrors.password ? "border-red-500 pr-10" : "pr-10"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              {validationErrors.password ? (
                <p className="text-xs text-red-500 mt-1">{validationErrors.password}</p>
              ) : (
                formData.password && (
                  <div className="mt-1">
                    <div className="flex items-center text-xs">
                      <div className={`h-1 flex-1 rounded-full ${formData.password.length >= 8 ? "bg-green-500" : "bg-gray-300"}`}></div>
                      <div className="mx-1"></div>
                      <div className={`h-1 flex-1 rounded-full ${/[A-Z]/.test(formData.password) ? "bg-green-500" : "bg-gray-300"}`}></div>
                      <div className="mx-1"></div>
                      <div className={`h-1 flex-1 rounded-full ${/[a-z]/.test(formData.password) ? "bg-green-500" : "bg-gray-300"}`}></div>
                      <div className="mx-1"></div>
                      <div className={`h-1 flex-1 rounded-full ${/[0-9]/.test(formData.password) ? "bg-green-500" : "bg-gray-300"}`}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters with uppercase, lowercase and numbers</p>
                  </div>
                )
              )}
            </div>
            
            {/* Confirm Password field */}
            <div className="space-y-1">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={() => {
                    if (formData.password !== formData.confirmPassword) {
                      setValidationErrors(prev => ({ ...prev, confirmPassword: "Passwords don't match" }));
                    } else {
                      setValidationErrors(prev => ({ ...prev, confirmPassword: "" }));
                    }
                  }}
                  placeholder="••••••••"
                  className={validationErrors.confirmPassword ? "border-red-500 pr-10" : "pr-10"}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              {validationErrors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">{validationErrors.confirmPassword}</p>
              )}
            </div>

            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isSubmitting || emailExists}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>
          </form>
          
          <div className="px-6 pb-6">
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in
              </Link>
            </p>
            
            <div className="mt-6 border-t border-gray-200 pt-4">
              <p className="text-xs text-center text-gray-500">
                By signing up, you agree to our{" "}
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
      </div>
    </div>
  );
}


