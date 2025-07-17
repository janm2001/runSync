import { createContext, useContext, useState, type ReactNode } from "react";

type User = "client" | "coach";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>({
  user: "client",
  setUser: () => {},
});

export const UserPrvoider = ({ children }: { children: ReactNode }) => {
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
    throw new Error("UseUser must be used within a LanguageProvider");
  }
  return context;
};
