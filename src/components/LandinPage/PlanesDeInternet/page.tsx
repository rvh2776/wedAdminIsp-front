import React from "react";
import { TituloPlanesInternet } from "./Titulo";
import { TarjetasPlanesInternet } from "./TarjetasPlanesInternet";

export const PlanesInternet: React.FC = () => {
  return (
    <>
      <TituloPlanesInternet title="Planes de Internet" />
      <TarjetasPlanesInternet />
    </>
  );
};
