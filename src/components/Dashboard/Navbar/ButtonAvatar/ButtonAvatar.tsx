"use client";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import DropdownMenu from "../DropdownMenu/DropdownMenu";

const ButtonAvatar: React.FC = () => {
  const { userData } = useAuth();
  const [firstLetter, setFirstLetter] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const firstLetterName = (name: string | undefined): string => {
    if (name && name.trim() !== "") return name.trim().charAt(0).toUpperCase();
    else return `<i className="lni lni-user"></i>`;
  };

  useEffect(() => {
    if (userData?.userData) {
      const letter = firstLetterName(userData?.userData.nombre);
      setFirstLetter(letter);
    }
  }, [userData]);

  const toggleDropdown = (): void => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent): void => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const letterColors: { [key: string]: string } = {
    A: 'bg-red-500', B: 'bg-blue-500', C: 'bg-green-500', D: 'bg-yellow-500',
    E: 'bg-purple-500', F: 'bg-pink-500', G: 'bg-indigo-500', H: 'bg-teal-500',
    I: 'bg-orange-500', J: 'bg-cyan-500', K: 'bg-lime-500', L: 'bg-amber-500',
    M: 'bg-emerald-500', N: 'bg-violet-500', O: 'bg-fuchsia-500', P: 'bg-rose-500',
    Q: 'bg-sky-500', R: 'bg-blue-600', S: 'bg-red-600', T: 'bg-green-600',
    U: 'bg-yellow-600', V: 'bg-purple-600', W: 'bg-pink-600', X: 'bg-indigo-600',
    Y: 'bg-teal-600', Z: 'bg-orange-600'
};


const getColorByFirstLetter = (name: string) => {
    const firstLetter = firstLetterName(name);
    return letterColors[firstLetter] || 'bg-gray-500'; // color por defecto si no coincide 
};

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center justify-center text-center space-x-4 cursor-pointer">
        <div className="flex flex-col text-end ">
            <p className="text-gray-200">¡Hola, {userData?.userData.nombre}!</p>
        </div>
        {userData && userData.userData.imgUrl !== "https://exmple-image.webp" 
        ?
            <img
            src={userData.userData.imgUrl}
            alt={userData.userData.nombre}
            className="w-12 h-12 rounded-full"
            onClick={toggleDropdown}
            />
        :
        <button
          id="dropdownNavbarLink"
          onClick={toggleDropdown}
          className={`rounded-full w-12 h-12 flex items-center justify-center text-center font-[530] ${userData && getColorByFirstLetter(userData.userData.nombre)} text-white`}
        > 
          <p className="text-3xl pr-[1px]">{firstLetter}</p>
        </button>
        
      }
      </div>
      {isDropdownOpen && (
        <DropdownMenu />
      )}
    </div>
  );
};

export default ButtonAvatar;