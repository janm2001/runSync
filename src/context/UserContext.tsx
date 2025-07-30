import type { Athlete } from "@/data/dummyData";
import { createContext, useContext, useState, type ReactNode } from "react";

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

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
