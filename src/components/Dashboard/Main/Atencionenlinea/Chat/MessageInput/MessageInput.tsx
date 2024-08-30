'use client'
import { getSocket } from "@/services/conexionSocket.services";
import React, { useState } from "react";

interface MessageInputProps {
  roomId: string;
  isConnected: boolean; // Agregar esta propiedad para habilitar/deshabilitar el botón de enviar mensaje
}

const MessageInput: React.FC<MessageInputProps> = ({ roomId, isConnected }) => {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const socket = getSocket();
    if (socket) {
      socket.emit("send-message", { roomId, message });
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center p-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe tu mensaje aquí"
        className="flex-1 p-2 bg-gray-700 text-gray-100 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={!isConnected} 
      />
      <button 
        className="ml-4 px-3 py-2 rounded-full text-2xl text-white bg-gray-700 hover:text-gray-100 transition-colors duration-300" 
        type="submit"
      disabled={!isConnected}  
        >
        
            ➤
      </button>
    </form>
  );
};

export default MessageInput;



