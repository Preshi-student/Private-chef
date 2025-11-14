// MenuContext.tsx
import React, { createContext, useContext, useState } from 'react';

type Dish = {
  id: string;
  name: string;
  price: number;
  course: string;
  description: string;
};

type MenuContextType = {
  menu: Dish[];
  addItem: (item: Omit<Dish, 'id'>) => void;
  updateItem: (item: Dish) => void;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menu, setMenu] = useState<Dish[]>([]);

  const addItem = (item: Omit<Dish, 'id'>) => {
    setMenu(prev => [...prev, { ...item, id: Date.now().toString() }]);
  };

  const updateItem = (updated: Dish) => {
    setMenu(prev => prev.map(d => (d.id === updated.id ? updated : d)));
  };

  return (
    <MenuContext.Provider value={{ menu, addItem, updateItem }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error('useMenu must be used within MenuProvider');
  return context;
};