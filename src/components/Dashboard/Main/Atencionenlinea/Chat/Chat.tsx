'use client'
import React, { useEffect, useRef } from "react";
import Message from "./Message/Message";
import MessageInput from "./MessageInput/MessageInput";

interface MessageData {
  isAdmin: boolean;
  roomId: string;
  userId: string;
  message: string;
  name: string;
  time: string;
}

interface ChatProps {
  messages: MessageData[];
  roomId: string | undefined;
  isConnected: boolean; // Propiedad para verificar si hay conexión con el socket.io
  warningMessages: string[];
}

const Chat: React.FC<ChatProps> = ({ messages, roomId, isConnected, warningMessages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);


  const filteredMessages = messages.filter(msg => msg.roomId === roomId);


  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [filteredMessages]);


  return (
    <>
      <div className="mt-2 p-4 messages flex-1 overflow-auto">
      {warningMessages.map((warning, index) => (
        <div key={`warning-${index}`} className="bg-yellow-100 text-yellow-800 p-2 mb-2 rounded">
          <small className="block text-xs">SYSTEM</small>
          <p>{warning}</p>
        </div>
      ))}
      {filteredMessages.map((msg, index) => (
        <Message key={index} data={msg} />
      ))}
      <div ref={messagesEndRef} /> {/* Referencia al final del contenedor */}
    </div>
      {roomId && <MessageInput roomId={roomId} isConnected={isConnected}/>}
    </>

  );
};

export default Chat;




