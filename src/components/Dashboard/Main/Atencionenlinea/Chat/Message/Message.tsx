'use client'
import { useAuth } from "@/context/AuthContext";
import React from "react";

interface MessageData {
  isAdmin: boolean;
  roomId: string;
  userId: string;
  message: string;
  name: string;
  time: string; // Añade este campo para mostrar la hora de la conversación
}

interface MessageProps {
  data: MessageData;
}

const Message: React.FC<MessageProps> = ({ data }) => {
  const { userData }  = useAuth();
  const { userId, message, name, time } = data;
  const currentUserId = userData?.tokenData.user.id || "";
  const isCurrentUser = userId === currentUserId;

  const letterColors: { [key: string]: string } = {
    A: 'bg-red-500', B: 'bg-blue-500', C: 'bg-green-500', D: 'bg-yellow-500',
    E: 'bg-purple-500', F: 'bg-pink-500', G: 'bg-indigo-500', H: 'bg-teal-500',
    I: 'bg-orange-500', J: 'bg-cyan-500', K: 'bg-lime-500', L: 'bg-amber-500',
    M: 'bg-emerald-500', N: 'bg-violet-500', O: 'bg-fuchsia-500', P: 'bg-rose-500',
    Q: 'bg-sky-500', R: 'bg-blue-600', S: 'bg-red-600', T: 'bg-green-600',
    U: 'bg-yellow-600', V: 'bg-purple-600', W: 'bg-pink-600', X: 'bg-indigo-600',
    Y: 'bg-teal-600', Z: 'bg-orange-600'
};


const getColorByFirstLetter = (firstLetter: string) => {
    return letterColors[firstLetter] || 'bg-gray-500'; // color por defecto si no coincide 
};

  return (
    <div className={`flex items-start mb-4 ${isCurrentUser ? "justify-end" : "justify-start"}`}>
      {!isCurrentUser && (
        <div className="flex-shrink-0 mr-3">
          <div className={`h-8 w-8 rounded-full ${getColorByFirstLetter(name.charAt(0).toUpperCase())} text-white flex items-center justify-center`}>
            {name.charAt(0).toUpperCase()}
          </div>
        </div>
      )}
     <div 
  className={`max-w-md px-6 py-2 rounded-lg text-white ${isCurrentUser ? "bg-blue-700" : "bg-gray-700"} ${isCurrentUser ? "text-right" : "text-left"}`}
  style={{ wordWrap: 'break-word' }} 
>
  <small className="block text-xs mb-1">{isCurrentUser ? "Yo" : name}</small>
  <p className="break-words text-sm">{message}</p>
  <span className={`text-[0.7rem] ${isCurrentUser ? "text-left" : "text-right"} mt-1 block`}>
        {time}
      </span>
</div>

      {isCurrentUser && (
        <div className="flex-shrink-0 ml-3">
          <div className={`h-8 w-8 rounded-full ${userData && getColorByFirstLetter(userData.userData.nombre.charAt(0).toUpperCase())} text-white flex items-center justify-center`}>
            {userData && userData.userData.nombre.charAt(0).toUpperCase()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;

