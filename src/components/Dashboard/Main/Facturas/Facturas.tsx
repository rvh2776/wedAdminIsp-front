"use client";
import React from "react";
import FacturasList from "./FacturasCard";
import { useSidebarContext } from "@/context/SidebarContext";
import { TituloPlanesInternet } from "@/components/LandinPage/PlanesDeInternet/Titulo";
import useIsMobile from "@/hooks/HookIsMobile";

const Facturas: React.FC = () => {
  const { btnFixed } = useSidebarContext();
  const isMobile = useIsMobile(); // Usa el hook para detectar si es móvil
  const divClasses = `p-3 mt-10 transition-all duration-1000 ${
    isMobile ? "" : btnFixed ? "ml-[270px]" : "ml-24"
  }`;
  return (
    <>
      <div className={divClasses}>
        <TituloPlanesInternet title="Facturas" />
        <FacturasList />
      </div>
    </>
  );
};

export default Facturas;
