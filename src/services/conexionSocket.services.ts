import { io, Socket } from "socket.io-client";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

let socket: Socket | null = null;

export const createSocket = (token: string, userName: string) => {
  if (!socket) {
    socket = io(`${apiURL}`, {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
      auth: {
        name: userName,
      },
    });

    socket.on("connect", () => {
      console.log("Service: Socket conectado");
    });

    socket.on("connect_error", (err) => {
      console.error("Service: Error al conectar al socket:", err);
    });
  }

  return socket;
};

export const getSocket = () => {
  if (!socket) {
    throw new Error("Socket no está conectado. Asegúrate de crear una conexión primero.");
  }
  return socket;
};



