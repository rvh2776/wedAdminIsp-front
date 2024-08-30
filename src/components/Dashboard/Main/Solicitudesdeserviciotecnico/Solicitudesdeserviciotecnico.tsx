import React from "react";
import { AsistenciasList } from "./TarjetasSolicitudServicioTecnico";

const Solicitudesdeserviciotecnico: React.FC = () => {
  return (
    <>
      <div
        className={`p-3 mt-20 transition-all duration-1000  
        }`}
      >
        <br />
        <div className="flex justify-center">
          <AsistenciasList />
        </div>
      </div>
    </>
  );
};

export default Solicitudesdeserviciotecnico;
