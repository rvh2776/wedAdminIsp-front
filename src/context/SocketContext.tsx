"use client";
import { createSocket } from "@/services/conexionSocket.services";
import { IProviderProps } from "@/types/context.types";
import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";


interface Message {
  isAdmin: boolean;
  roomId: string;
  userId: string;
  message: string;
  name: string;
  time: string; // Añadimos una propiedad para almacenar la hora del mensaje
}

interface Room {
  room: string;
  hall: string;
}

// Define el tipo del contexto
interface SocketContextType {
  online: boolean;
  changeOnline: () => void;
  rooms: string[];
  isConnected: boolean;
  messages: Message[];
  roomId: string | undefined;  
  warningMessages: string[];
  handleMyChats:(value: Room ) => void;
  handleDeleteChat:(value: Room ) => void;
  myChats: Room[];
}

// Valor por defecto del contexto
const SocketContext = createContext<SocketContextType | undefined>(undefined);

// Proveedor del contexto
export const SocketProvider: React.FC<IProviderProps> = ({ children }) => {
  const { userData } = useAuth();
  const [online, setOnline] = useState<boolean>(false);
  const [rooms, setRooms] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [roomId, setRoomId] = useState<string | undefined>('');
  const [warningMessages, setWarningMessages] = useState<string[]>([]);
  const [myChats, setMyChats] = useState<Room[]>([]);

    const handleMyChats = (value: Room) => {
    setMyChats(prevValue => {
      // Verifica si el room ya existe en el estado
      const isRoomExist = prevValue.some(chat => chat.room === value.room);
      if (isRoomExist) {
        // Si ya existe, no hace nada
        return prevValue;
      } else {
        // Si no existe, añade el nuevo room
        return [...prevValue, value];
      }
    });
    console.log('handleSelectRomm: ', value);
  };

  const handleDeleteChat = (value: Room) => {
     // Quitar el room correspondiente de myChats basado en message.room
     setMyChats((prevChats) =>
      prevChats.filter(chat => chat.room !== value.room)
    );
    console.log('handleDeleteChat: ', value);
  }

  const changeOnline = () => {
    setOnline((prevState) => !prevState);
  };

  useEffect(() => {
    let socket: any;
    if (userData && online) {
      const token = userData.tokenData.token;
      const userName = userData.userData.nombre;
      socket = createSocket(token, userName);

      socket.on("connect", () => {
        console.log("Socket connected");
      });

      socket.on("pending-rooms", (message: string[]) => {
        console.log("Received pending-rooms:", message);
        setRooms(message);
      });

      socket.on("room-created", (data: any) => {
        setRoomId(data.roomId);
        console.log("room-created: ", data);
      });

      socket.on("user-joined", (data: any) => {
        console.log("Un agente de atencion se unio a tu chat", data);
      });

      socket.on("room-joined", (data: any) => {
        console.log("room-joined, rommID: ", data);
        setRoomId(data.roomId);
        setIsConnected(true);
      });

      socket.on("new-message", (message: Message) => {
        const messageWithTime = {
          ...message,
          time: new Date().toLocaleTimeString(), // Añade la hora actual al mensaje
        };
        setMessages((prevMessages) => [...prevMessages, messageWithTime]);
        console.log("message :", messageWithTime);
      });

      socket.on("inactivity-warning", (message: any) => {
        setWarningMessages((prevWarnings) => [
          ...prevWarnings,
          `Advertencia de desconexión: ${message}`,
        ]);
        console.log("inactivity-warning: ", message);
      });

      socket.on("idle-timeout", (message: any) => {
        setWarningMessages((prevWarnings) => [
          ...prevWarnings,
          `Desconexión por inactividad: ${message}`,
        ]);
        console.log("idle-timeout: ", message);
      });

      socket.on("user-disconnected", (message: any) => {
        setWarningMessages((prevWarnings) => [
          ...prevWarnings,
          `Chat cerrado: ${message}`,
        ]);
        setIsConnected(false);
        //cerrar chat quitar message.name   myChats
        console.log("user-disconnected :", message);
      });

      socket.on("disconnect", (message: any) => {
        console.log("disconnect: ", message);
        setIsConnected(false);
      });
    }

    return () => {
      if (socket) {
        console.log("4: ", online);
        socket.off("connect");
        socket.off("pending-rooms");
        socket.off("create-room");
        socket.off("room-created");
        socket.off("new-message");
        socket.off("user-disconnected");
        socket.off("disconnect");
        socket.off("room-joined");
        socket.off("inactivity-warning");
        socket.off("idle-timeout");
        socket.disconnect();
        console.log("Socket disconnected and cleaned up");
        const url = new URL(window.location.href);
        url.searchParams.delete('room');
        url.searchParams.delete('hall');
        window.history.replaceState({}, '', url.toString());
        window.location.reload();
      }
    };
  }, [online]);

  return (
    <SocketContext.Provider value={{ online, changeOnline, rooms, isConnected, messages, roomId, warningMessages, handleMyChats, handleDeleteChat, myChats}}>
      {children}
    </SocketContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useConnect = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useConnect debe ser usado dentro de un SocketProvider");
  }
  return context;
};
