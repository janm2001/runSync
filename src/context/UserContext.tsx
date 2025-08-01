import type { Athlete } from "@/data/dummyData";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: number;
  clientInfo: Athlete | null;
  coachInfo: Athlete | null;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user_data");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse stored user data:", error);
        localStorage.removeItem("user_data");
      }
    }
  }, []);

  // Enhanced setUser function that also saves to localStorage
  const setUserWithPersistence = (newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem("user_data", JSON.stringify(newUser));
      localStorage.setItem("user_authenticated", "true");
    } else {
      localStorage.removeItem("user_data");
      localStorage.removeItem("user_authenticated");
      // Also clear Strava data when user logs out
      localStorage.removeItem("strava_access_token");
      localStorage.removeItem("strava_refresh_token");
      localStorage.removeItem("strava_token_expiry");
      localStorage.removeItem("strava_athlete");
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser: setUserWithPersistence }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
