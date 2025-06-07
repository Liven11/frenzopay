import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
};

type UserContextType = {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => Promise<void>;
};

const defaultUserData: UserData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1 234 567 8900',
  address: '123 Main St, City, Country',
};

const UserContext = createContext<UserContextType | undefined>(undefined);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<UserData>(defaultUserData);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('userData');
      if (savedData) {
        setUserData(JSON.parse(savedData));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const updateUserData = async (newData: Partial<UserData>) => {
    try {
      const updatedData = { ...userData, ...newData };
      await AsyncStorage.setItem('userData', JSON.stringify(updatedData));
      setUserData(updatedData);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export { useUser };
export default UserProvider; 