import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// Define the structure of a User object.
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roleName?: string; // roleName is optional as it might not always be present or needed.
}

// Define the shape of the UserContext, including the user object and a function to set it.
interface UserContextType {
  user: User | null; // The current user, or null if no user is logged in.
  setUser: (user: User | null) => void; // Function to update the user state.
}

// Create the UserContext with an initial undefined value.
// This context will be used to share user data across components.
const UserContext = createContext<UserContextType | undefined>(undefined);

// UserProvider component that wraps the application and provides user context to its children.
export function UserProvider({ children }: { children: ReactNode }) {
  // useState hook to manage the user state. It can be a User object or null.
  const [user, setUser] = useState<User | null>(null);

  // useEffect hook to load user data from localStorage when the component mounts.
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      // If user data is found in localStorage, parse it and set the user state.
      setUser(JSON.parse(storedUser));
    }
  }, []); // The empty dependency array ensures this effect runs only once after the initial render.

  // Custom handler for setting the user, which also updates localStorage.
  const handleSetUser = (newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      // If a new user is provided, store it in localStorage.
      localStorage.setItem('user', JSON.stringify(newUser));
    } else {
      // If newUser is null (logout), remove user data from localStorage.
      localStorage.removeItem('user');
    }
  };

  return (
    // Provide the user object and the handleSetUser function to all children components.
    <UserContext.Provider value={{ user, setUser: handleSetUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to easily consume the UserContext in functional components.
export function useUser() {
  const context = useContext(UserContext);
  // Throw an error if useUser is called outside of a UserProvider, ensuring correct usage.
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
} 