type User = {
  id: number;
  email: string;
  name: string;
  phone: string;
  address: string;
  avatar?: string;
} | null;

type AuthContextType = {
  user: User;
  setUser: (user: User) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  clearError: () => void;
}

export type { User, AuthContextType };
