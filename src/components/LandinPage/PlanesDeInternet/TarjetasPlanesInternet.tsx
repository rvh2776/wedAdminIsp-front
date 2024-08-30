import React from "react";
import imagenHogar from "../../../../pics/imagenHogar.svg";
import imagenEmpresas from "../../../../pics/imagenEmpresa.svg";
import { FlipBox } from "./flipbox";
import HogarIcono from "../../../../pics/iconoCasa.svg";
import EmpresaIcono from "../../../../pics/iconoEmpresas.svg";

export const TarjetasPlanesInternet: React.FC = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen justify-center items-center space-y-10 lg:space-y-0 lg:space-x-10 p-4 mb-10">
        <div className="w-full lg:w-1/3 flex flex-col items-center">
          <img
            src={imagenHogar.src}
            alt="Imagen 1"
            className="w-full lg:w-auto shadow-md mb-4 lg:mb-0"
          />
          <FlipBox
            frontTitle="Hogar"
            backTitle="Internet por fibra óptica
para tu hogar "
            imgSrc={HogarIcono.src}
            imgAlt="Imagen de icono de casa"
          />
        </div>
        <div className="w-full lg:w-1/3 flex flex-col items-center">
          <img
            src={imagenEmpresas.src}
            alt="Imagen 2"
            className="w-full lg:w-auto shadow-md mb-4 lg:mb-0"
          />
          <FlipBox
            frontTitle="Empresas"
            backTitle="Internet por fibra óptica
para tu negocio"
            imgSrc={EmpresaIcono.src}
            imgAlt="Icono de una empresa"
          />
        </div>
      </div>
    </>
  );
};
