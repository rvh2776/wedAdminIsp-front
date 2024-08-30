"use client";
import Image from "next/image";
import React from "react";
import logo_01 from "../../../../../public/images/Logo01.png";
import { useSidebarContext } from "@/context/SidebarContext";

const ButtonLogo = () => {
  const { btnFixed, sidebarFixed, isExpanded } = useSidebarContext();

  const handleClick = () => {
    sidebarFixed(!btnFixed);
  };

  return (
    <div className="flex items-center justify-between p-1">
      <button
        className="inline-flex items-center p-2 text-gray-200 "
        onClick={handleClick}
      >
        <Image
          src={logo_01}
          alt="Icono"
          className={`logoIns h-auto w-12 fixed mt-12 transition-all duration-700 delay-200 ${
            isExpanded ? "opacity-0" : "opacity-100"
          }`}
        />
        <Image
          src={logo_01}
          alt="Logo"
          className={`h-auto w-32 fixed mt-28 ml-[17%] transition-all duration-700 delay-200 rotate-[-1.5deg] ${
            isExpanded ? "opacity-100" : "opacity-0"
          }`}
        />
      </button>
    </div>
  );
};

export default ButtonLogo;
