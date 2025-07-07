import { createContext, useContext, useState, type ReactNode } from "react";

type User = "client" | "coach";

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>({
  user: "client",
  setUser: () => {},
});

export const UserPrvoider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>("client");

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
