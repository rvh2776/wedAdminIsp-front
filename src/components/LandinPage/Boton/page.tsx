import React from "react";
import { BotonProps } from "./type";
import Image from "next/image";

export const BotonPagos: React.FC<any> = ({ Imagen }) => {
  return (
    <Image
      src={Imagen.src}
      alt="Boton de Pagos"
      className=" px-4 py-2 rounded transition-transform transform duration-200 hover:scale-105 max-w-80"
      width={250} // Especifica el ancho según sea necesario
      height={100} // Especifica la altura según sea necesario
    />
  );
};
