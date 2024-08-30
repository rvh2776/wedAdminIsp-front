import React from "react";
import { franjaDivisoriaProps } from "./Type";

export const Franja: React.FC<franjaDivisoriaProps> = ({ texto }) => {
  return (
    <div className="w-full h-28 bg-gradient-to-r from-[#0279F0] to-[#00478F] ">
      <h1 className="text-2xl md:text-5xl sm:text-3xl text-white text-center font-bold mb-10 mt-10 ml-1  ">
        {texto}
      </h1>
    </div>
  );
};
