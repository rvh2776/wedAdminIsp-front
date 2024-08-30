"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import StatusIndicator from "./StatusIndicador/StatusIndicador";
import Chat from "./Chat/Chat";
import { useSidebarContext } from "@/context/SidebarContext";
import JoinRoom from "./JoinRoom/JoinRoom";
import { useRouter, useSearchParams } from "next/navigation";
import { useConnect } from "@/context/SocketContext";

interface Room {
  room: string;
  hall: string;
}

interface Message {
  isAdmin: boolean;
  roomId: string;
  userId: string;
  message: string;
  name: string;
  time: string; // Añadimos una propiedad para almacenar la hora del mensaje
}

function AdminChat() {
  const { btnFixed } = useSidebarContext();
  const { userData } = useAuth();
  const [selectRoomId, setSelectRoomId] = useState<Room | null>(null);
  const { isConnected, messages, warningMessages, handleMyChats, myChats, handleDeleteChat } = useConnect();

  const searchParams = useSearchParams();
  const room = searchParams.get("room");
  const hall = searchParams.get("hall");

  useEffect(() => {
    if (room && hall) {
      handleMyChats({ room: room, hall: hall });
    }
  }, [room]);

  const handleSelectRomm = (value: Room | null) => {
    setSelectRoomId(value);
  };

  const router = useRouter();

  const handleClose = () => {
    router.push(`/dashboard/home`);
  };

  // Filtrar mensajes por roomId y isAdmin: false
  const filteredMessages = messages.filter(
    (msg: Message) => msg.roomId === selectRoomId?.room && !msg.isAdmin
  );

  // Obtener el primer nombre del mensaje filtrado
  const firstName = filteredMessages.length > 0 ? filteredMessages[0].name : null;

  return (
    <div
      className={`p-3 mt-36 transition-all duration-1000 ${
        btnFixed ? "ml-[30%]" : "ml-[20%]"
      }`}
    >
      {selectRoomId?.room && <JoinRoom room={selectRoomId.room} />}
      <div className="w-[78%] grid grid-cols-5 gap-0">
        <div className="col-span-4 h-[40rem] border border-gray-300 shadow-xl rounded-2xl bg-gray-300 flex flex-col">
          <div className="bg-gray-800 h-[12%] rounded-t-2xl flex justify-between items-center p-2">
            <div className="flex flex-col">
              <p className="px-4 pt-2 text-gray-400">
                {userData && userData.userData.nombre} - SALA N° {selectRoomId?.hall} - Chat con usuario: {firstName || "No disponible"}
              </p>
              <StatusIndicator isConnected={isConnected} />
            </div>
            <button
              onClick={handleClose}
              className="font-semibold text-gray-400 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 transition-all duration-200 rounded-full w-8 h-8 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              x
            </button>
          </div>
          <Chat
            messages={messages}
            roomId={selectRoomId?.room}
            isConnected={isConnected}
            warningMessages={warningMessages}
          />
        </div>

        <div className="h-[40rem] border border-gray-300 shadow-xl rounded-2xl bg-gray-300 flex flex-col">
          <div className="bg-gray-800 rounded-t-2xl h-[12%] flex justify-between items-center p-2">
            <div className="flex flex-col">
              <p className="px-4 pt-2 text-gray-400">
                Chats
              </p>
            </div>
          </div>
          {myChats.map((chat, index) => {
            // Filtrar mensajes para el chat actual
            const filteredMessages = messages.filter(
              (msg: Message) => msg.roomId === chat.room && !msg.isAdmin
            );
            // Obtener el primer nombre del chat actual
            const firstName = filteredMessages.length > 0 ? filteredMessages[0].name : null;

            return (
              <ul
                key={chat.room}
                className="relative flex border-t hover:bg-gray-200 pointer-events-auto dark:hover:bg-gray-700"
                onClick={() => handleSelectRomm(chat)}
              >
                <a className="block px-4 py-3" href="#">
                  <p className="text-lg text-gray-500 dark:text-gray-300">Sala N°{chat.hall}</p>
                  Usuario: {firstName || "No disponible"}
                </a>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Evita que el click en el botón también active el onClick del ul
                    handleDeleteChat(chat);
                  }}
                  className="absolute top-1 right-1 font-semibold text-gray-400 bg-gray-200 hover:bg-gray-300 active:bg-gray-500 transition-all duration-200 rounded-full w-8 h-8 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  x
                </button>
              </ul>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AdminChat;

