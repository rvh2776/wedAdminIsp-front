import React from "react";
import SoporteTecnico from "./TarjetasSoporte";
import { TituloPlanesInternet } from "@/components/LandinPage/PlanesDeInternet/Titulo";

const Serviciotecnico: React.FC = () => {
  return (
    <>
      <div
        className={`p-3 mt-20 transition-all duration-1000  
        }`}
      >
        <TituloPlanesInternet title="Bienvenido cual es su problema" />
        <br />
        <SoporteTecnico />
      </div>
    </>
  );
};

export default Serviciotecnico;
