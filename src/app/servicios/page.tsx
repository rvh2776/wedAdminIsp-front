import { Navbar } from "@/components/LandinPage/Navbar";
import { TituloPlanesInternet } from "@/components/LandinPage/PlanesDeInternet/Titulo";
import { Contador } from "@/components/Servicios/ContadorServicios/Contador";
import React from "react";
import "animate.css";
import { ServiciosVista } from "@/components/Servicios/ContadorServicios/Servicios";

const page = () => {
  return (
    <>
      <Navbar />

      <br />
      <br />
      <br />
      <br />

      <TituloPlanesInternet title="Conoce Nuestros Planes de Internet" />

      <ServiciosVista />
    </>
  );
};

export default page;
