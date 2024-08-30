'use client'
import { IProviderProps, ISidebarContextProps } from '@/types/context.types';
import React, { createContext, useContext, useState } from 'react';

const SidebarContext = createContext<ISidebarContextProps>({
    btnFixed: false,
    sidebarFixed: () => {},
    isExpanded: false,
    sidebarExpand: () => {},
    isDropdown: null,
    menuDropdown: () => {},
    isDropdownSub: null,
    subMenuDropdown: () => {},
});

export const SidebarProvider: React.FC<IProviderProps> = ({ children }) => {
    const [btnFixed, setBtnFixed] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDropdown, setIsDropdown] = useState<string | null>(null);
    const [isDropdownSub, setIsDropdownSub] = useState<string | null>(null);

    const sidebarFixed = (newState: boolean) => {
        setBtnFixed(newState);
    };

    const sidebarExpand = (newState: boolean) => {
        setIsExpanded(newState);
    };

    const menuDropdown = (newState: string | null) => {
        setIsDropdown(newState);
    };

    const subMenuDropdown = (newState: string | null) => {
        setIsDropdownSub(newState);
    };

  return (
    <SidebarContext.Provider 
            value={{ 
                btnFixed,
                sidebarFixed, 
                isExpanded,
                sidebarExpand,
                isDropdown,
                menuDropdown,
                isDropdownSub,
                subMenuDropdown
            }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);
