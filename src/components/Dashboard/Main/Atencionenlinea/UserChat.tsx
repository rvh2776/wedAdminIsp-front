'use client'
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { createSocket, getSocket } from "@/services/conexionSocket.services";
import StatusIndicator from "./StatusIndicador/StatusIndicador";
import Chat from "./Chat/Chat";
import { useSidebarContext } from "@/context/SidebarContext";
import JoinRoom from "./JoinRoom/JoinRoom";
import { useRouter, useSearchParams } from "next/navigation";

interface User {
  id: string;
  name: string;
}

interface Message {
    isAdmin: boolean;
  roomId: string;  
  userId: string;
  message: string;
  name: string;
  time: string; // Añadimos una propiedad para almacenar la hora del mensaje
}

function UserChat() {
  const { btnFixed } = useSidebarContext();
  const { userData } = useAuth();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [roomId, setRoomId] = useState<string | undefined>('');
  const [adminJoined, setAdminJoined] = useState<boolean>(false);
  const [warningMessages, setWarningMessages] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const room = searchParams.get('room');
  const router = useRouter();

  useEffect(() => {
    if (!userData) return;
    const token = userData.tokenData.token;
    const userName = userData.userData.nombre;
    const socket = createSocket(token, userName);
    setIsAdmin(userData.tokenData.user.roles.includes('admin'));

    socket.on("connect", () => {
      setIsConnected(true);
      console.log("en linea")
    });

    if (!userData.tokenData.user.roles.includes('admin')){socket.emit("create-room")}

    socket.on("room-created", (data) => {setRoomId(data.roomId); console.log("room-created: ",data)});

    socket.on("new-message", (message: Message) => {
      const messageWithTime = {
        ...message,
        time: new Date().toLocaleTimeString(), // Añade la hora actual al mensaje
      };
      setMessages((prevMessages) => [...prevMessages, messageWithTime]);
      console.log("message :", messageWithTime);
    });



    socket.on("user-disconnected", (message) => {
        setWarningMessages((prevWarnings) => [...prevWarnings, `Agente de atención desconectado: ${message}`]);
        setIsConnected(false);
        console.log("user-disconnected");
      });

    socket.on("disconnect", () => {
        console.log("disconnect");
       setIsConnected(false);

    });

    socket.on("user-joined", () => {
        setAdminJoined(true);
        console.log("Un agente de atencion se unio a tu chat")
      });

      socket.on("room-joined", (data: { roomId: string }) => {
        console.log("room-joined, rommID: ", data.roomId)
        setRoomId(data.roomId);
      });


      socket.on("inactivity-warning", (message) => {
        setWarningMessages((prevWarnings) => [...prevWarnings, `Advertencia de desconexión: ${message}`]);
        console.log("inactivity-warning: ", message);
      });
  
      socket.on("idle-timeout", (message) => {
        setWarningMessages((prevWarnings) => [...prevWarnings, `Desconexión por inactividad: ${message}`]);
        console.log("idle-timeout: ", message);
      });

      

    return () => {
      if (socket) {
        socket.off("connect");
        socket.off("create-room");
        socket.off("room-created");
        socket.off("new-message");
        socket.off("user-disconnected");
        socket.off("disconnect");
        socket.off("room-joined");
        socket.off("inactivity-warning");
        socket.off("idle-timeout");
        socket.disconnect(); // Asegúrate de cerrar la conexión cuando el componente se desmonte
      }
    };
  }, [userData]);

  const handleClose = () => {
    const socket = getSocket();
    socket.disconnect()
    router.push(`/dashboard/home`);
  }

  return (
    <div
      className={`p-3 mt-36 transition-all duration-1000 ${
        btnFixed ? "ml-[30%]" : "ml-[25%]"
      }`}
    >
      {!isAdmin && !adminJoined ? (
        <div>
          <p className="bg-gray-500 ml-28 text-gray-100 w-2/4 p-4 rounded-tr-2xl rounded-bl-2xl text-lg ">Esperando a que un agente de atención se una a la sala...</p>
        </div>
      ) : (
        <>
           {isAdmin && room && <JoinRoom room={room}/>}
           <div className="w-2/3 h-[40rem] border border-gray-300 shadow-xl rounded-2xl bg-gray-300 flex flex-col">
  <div className="bg-gray-800 rounded-t-2xl flex justify-between items-center p-2">
    <div className="flex flex-col">
      <p className="px-4 pt-2 text-gray-400">{userData && userData.userData.nombre}</p>
      <StatusIndicator isConnected={isConnected} />
    </div>
    <button
      onClick={handleClose}
      className="font-semibold text-gray-400 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 transition-all duration-200 rounded-full w-8 h-8 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gray-400"
    >
      x
    </button>
  </div>
  <Chat messages={messages} roomId={roomId} isConnected={isConnected} warningMessages={warningMessages} />
</div>
        </>
      )}
    </div>
  );
}

export default UserChat;