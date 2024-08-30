'use client'
import React, { useEffect, useState } from "react";
import { getSocket } from "@/services/conexionSocket.services";

const JoinRoom = ({room} : {room: string}) => {
  
useEffect(() => {
  const socket = getSocket();
  if (socket) {
    socket.emit("join-room", room);  // Emitir evento con el roomId correcto
    socket.on("user-joined", () => { console.log("Conectado a la sala " + room); });
    socket.on("room-created", () => { console.log("Admin conectado a la sala " + room); });
    socket.on("join-failed", (error) => { console.log("No se pudo unir a la sala:", error); });
  }
}, [room]);

  return (
  <>
  </>
  );
};

export default JoinRoom;
