"use client";
import React, { useEffect, useState } from "react";
import { Persona1 } from "./Persona1";
import { TextoPromo1 } from "./TextoPromo1";
import { Franja } from "../FranjaDivision/page";

export const Promo1: React.FC = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    handleResize(); // Verificar el tamaño de la pantalla al cargar

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-center mt-20 lg:h-auto">
        {isLargeScreen && <Persona1 />}
        <TextoPromo1 />
      </div>

      <div className="flex justify-center mt-8">
        <Franja texto="UltraNet Velocidad que Conecta" />
      </div>
    </>
  );
};
