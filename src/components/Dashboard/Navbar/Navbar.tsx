"use client";
import React from "react";
import ButtonAvatar from "./ButtonAvatar/ButtonAvatar";
import ButtonDarkMode from "./ButtonDarkMode/ButtonDarkMode";
import ButtonNotification from "./ButtonNotification/ButtonNotification";
import { useAuth } from "@/context/AuthContext";
import ButtonOnline from "./ButtonOnline/ButtonOnline";
import { useConnect } from "@/context/SocketContext";
import useIsMobile from "@/hooks/HookIsMobile"; // Asegúrate de tener el hook importado

const Navbar = () => {
  const { userData } = useAuth();
  const { online } = useConnect();
  const isMobile = useIsMobile(); // Usa el hook para detectar si es móvil

  return (
    <nav className="fixed w-full h-16 bg-gradient-to-r from-[#0b2542] via-blue-950/90 to-blue-950/70 z-10 dark:border-b dark:border-gray-600 dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800/90 dark:to-gray-600/70">
      <div
        className={`mx-auto h-16 flex items-center ${
          isMobile ? "justify-center px-4" : "justify-between"
        }`}
      >
        <div
          className={`flex space-x-4 items-center text-center ${
            isMobile ? "space-x-2" : "ml-auto mr-4"
          }`}
        >
          {userData?.tokenData.user.roles.includes("admin") && <ButtonOnline />}
          {userData?.tokenData.user.roles.includes("admin") && (
            <div
              className={`${
                online
                  ? "transition-opacity duration-300 ease-out"
                  : "transition-opacity duration-300 ease-out opacity-0 pointer-events-none"
              }`}
            >
              <ButtonNotification />
            </div>
          )}
          <ButtonDarkMode />
          <ButtonAvatar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
