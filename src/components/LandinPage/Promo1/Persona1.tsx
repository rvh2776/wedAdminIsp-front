import React from "react";
import Persona from "../../../../pics/persona1.svg";

export const Persona1: React.FC = () => {
  return (
    <>
      <img
        src={Persona.src}
        alt="persona con una laptop en las piernas"
        className="w-1/3 ml-2 mt-5"
      />
    </>
  );
};
