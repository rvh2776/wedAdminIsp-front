"use client";
import React from "react";
import EquiposCard from "./EquiposCard";
import { useSidebarContext } from "@/context/SidebarContext";
import useIsMobile from "@/hooks/HookIsMobile";

const Equipos: React.FC = () => {
  const { btnFixed } = useSidebarContext();
  const isMobile = useIsMobile(); // Usa el hook para detectar si es móvil
  const divClasses = `p-3 mt-10 transition-all duration-1000 ${
    isMobile ? "" : btnFixed ? "ml-[270px]" : "ml-24"
  }`;

  return (
    <>
      <div className={divClasses}>
        <EquiposCard />
      </div>
    </>
  );
};

export default Equipos;
