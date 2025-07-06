import { User } from '@/types/users';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getServerSession(): Promise<{ user: User | null, isAuthenticated: boolean }> {
  
  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      cache: 'no-store',
      credentials: 'include',
    });
    
    if (response.ok) {
      const userData = await response.json();
      return {
        user: userData,
        isAuthenticated: true
      };
    }
    
    return {
      user: null,
      isAuthenticated: false
    };
  } catch (error) {
    console.error('Failed to get server session', error);
    return {
      user: null,
      isAuthenticated: false
    };
  }
}

/**
 * Server-side redirect for unauthenticated users
 * Use in server components or server actions that require authentication
 */
export async function requireAuth(redirectPath = '/login') {
  const { isAuthenticated } = await getServerSession();
  
  if (!isAuthenticated) {
    throw new Error(`REDIRECT:${redirectPath}`);
  }
}