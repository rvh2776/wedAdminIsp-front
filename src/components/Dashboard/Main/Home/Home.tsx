"use client";
import { useSidebarContext } from "@/context/SidebarContext";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import Estadodecuenta from "./Estadodecuenta/Estadodecuenta";
import PanelDeControl from "./PanelDeControl/PanelDeControl";
import useIsMobile from "@/hooks/HookIsMobile";

const Home = () => {
  const { btnFixed } = useSidebarContext();
  const { userData } = useAuth();
  const roles = userData?.tokenData.user.roles;
  const isMobile = useIsMobile(); // Usa el hook para detectar si es móvil

  const divClasses = `p-3 mt-10 transition-all duration-1000 ${
    isMobile ? "" : btnFixed ? "ml-[270px]" : "ml-24"
  }`;

  return (
    <>
      <div className={divClasses}>
        <h1 className="text-2xl font-bold text-blue-900 mt-10 dark:text-blue-400/70">
          {roles?.includes("admin")
            ? "Bienvenido a tu plataforma de Administración!"
            : "Bienvenido a tu plataforma de Personal!"}
        </h1>
        <h2 className="text-3xl text-gray-400 dark:text-orange-300/80">
          {roles?.includes("admin")
            ? "Dashboard Administrativo"
            : "Dashboard de Usuario"}
        </h2>
        <br />
        <div className="flex justify-center">
          {roles?.includes("admin") ? (
            <PanelDeControl />
          ) : roles?.includes("user") ? (
            <Estadodecuenta />
          ) : null}
        </div>
        <br />
      </div>
    </>
  );
};

export default Home;
