import React from "react";
import TextoParrafoProps from "./type";

export const TextoCentral: React.FC<TextoParrafoProps> = ({ texto }) => {
  return (
    <>
      <div className="flex justify-center">
        <p className="text-textBlue text-xl text-center">{texto}</p>
      </div>
    </>
  );
};
