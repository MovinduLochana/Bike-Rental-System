import { User } from "@/types/users";
// import { headers } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export async function register(userData: {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    avatar?: string;
  }): Promise<User> {
    try {
      const response = await fetch(`${API_URL}/users/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to register user");
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

export async function checkEmailExists(email: string): Promise<boolean> {
    try {
      const response = await fetch(
        `${API_URL}/users/checker?email=${encodeURIComponent(email)}`, {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error("Error checking email:", error);
      throw error;
    }
  }

export async function getUserProfile(token: string): Promise<User> {
    try {
      const response = await fetch(`${API_URL}/users/me`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch user profile");
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

export async function updateUserProfile(
    userData: User
  ): Promise<string> {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update user profile");
      }

      return data;
    } catch (e) {
      return (e as Error).message || "Failed to update user profile";
    }
  }

export async function changePassword(
    id: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${API_URL}/users/change-password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          id,
          oldPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to change password");
      }

      return data;
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message || "Failed to change password",
      };
    }
  }
