'use client'
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

// Define el tipo del contexto
interface RoomContextType {
  roomIDs: string[];
  updateRooms: (ids: string[]) => void;
}

// Valor por defecto del contexto
const RoomContext = createContext<RoomContextType | undefined>(undefined);

// Proveedor del contexto
export const RoomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [roomIDs, setRoomIDs] = useState<string[]>([]);

  const updateRooms = (newRoomIDs: string[]) => {
    setRoomIDs(newRoomIDs);
  };
 

  return (
    <RoomContext.Provider value={{ roomIDs, updateRooms }}>
      {children}
    </RoomContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useRoom = (): RoomContextType => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('useRoom debe ser usado dentro de un RoomProvider');
  }
  return context;
};







