"use client";
import React, { useEffect, useState, useRef } from "react";
import Home from "./Home/Home";
import styles from "./Sidebar.module.css";
import SignOff from "./SignOff/SignOff";
import ButtonResponsive from "./ButtonResponsive/ButtonResponsive";
import ButtonLogo from "./ButtonLogo/ButtonLogo";
import { useSidebarContext } from "@/context/SidebarContext";
import { useAuth } from "@/context/AuthContext";
import Role from "./Role/Role";
import { useDarkContext } from "@/context/DarkContext";
import {
  sidebarOptionsAdmin,
  sidebarOptionsUser,
} from "@/helpers/sidebarOptions";
import useIsMobile from "@/hooks/HookIsMobile";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar la visibilidad
  const { userData } = useAuth();
  const { btnFixed, isExpanded, sidebarExpand } = useSidebarContext();
  const roles = userData?.tokenData.user.roles;
  const { darkMode } = useDarkContext();
  const isMobile = useIsMobile(); // Usa el hook para detectar si es móvil
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleMouseOver = () => {
    if (!btnFixed && !isMobile) sidebarExpand(true);
  };

  const handleMouseOut = () => {
    if (!btnFixed && !isMobile) sidebarExpand(false);
  };

  const handleSidebarToggle = () => {
    if (!btnFixed) {
      setIsOpen(!isOpen);
      sidebarExpand(!isExpanded);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      isExpanded &&
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
      sidebarExpand(false);
    }
  };

  useEffect(() => {
    if (isMobile) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMobile, isExpanded]);

  return (
    <>
      <ButtonResponsive onClick={handleSidebarToggle} />

      {/* Fondo oscuro en móvil cuando el sidebar está abierto */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50"
          onClick={() => {
            setIsOpen(false);
            sidebarExpand(false);
          }}
        ></div>
      )}

      <aside
        ref={sidebarRef}
        className={`bg-cover fixed top-0 left-0 z-40 h-screen transition-all duration-700 ${
          isExpanded ? "translate-x-0 w-[250px]" : "-translate-x-full w-[70px]"
        } sm:translate-x-0 bg-gradient-to-b from-blue-950 via-blue-950/95 to-blue-400/90  ${
          darkMode ? styles.darkBackground : styles.background
        } dark:border-r dark:border-gray-600`}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <ButtonLogo />
        <ul className="mt-28">
          <Home />
          {roles?.includes("admin")
            ? sidebarOptionsAdmin.map((role, roleIndex) => (
                <Role key={roleIndex} role={role} />
              ))
            : sidebarOptionsUser.map((role, roleIndex) => (
                <Role key={roleIndex} role={role} />
              ))}
        </ul>
        <SignOff />
      </aside>
    </>
  );
};

export default SideBar;
