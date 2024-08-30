'use client'
import { IDarkContextProps, IProviderProps } from '@/types/context.types';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const DarkContext = createContext<IDarkContextProps>({
    darkMode: false,
    handleDarkMode: () => {},
});

export const DarkProvider: React.FC<IProviderProps> = ({ children }) => {
    const { userData } = useAuth();
    const [darkMode, setDarkMode] = useState<boolean>(false);

    // Cargar la preferencia de modo oscuro del localStorage al montar el componente
    useEffect(() => {
        if(userData){
            const savedMode = localStorage.getItem('darkMode');
            if (savedMode) {
                setDarkMode(JSON.parse(savedMode));
                if (JSON.parse(savedMode)) {
                    document.documentElement.classList.add('dark');
                }
            }
        }
    }, [userData]);
  
    // Manejar el cambio de modo oscuro y guardarlo en localStorage
    const handleDarkMode = () => {
      setDarkMode(!darkMode);
      if (!darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
        console.log("modo dark activado");
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
        console.log("modo dark desactivado");
      }
    };

  return (
    <DarkContext.Provider 
            value={{ 
                darkMode,
                handleDarkMode
            }}>
      {children}
    </DarkContext.Provider>
  );
};

export const useDarkContext = () => useContext(DarkContext);

