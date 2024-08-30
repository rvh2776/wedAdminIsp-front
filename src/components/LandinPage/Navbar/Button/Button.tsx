"use client";
import Link from "next/link";
import React from "react";

import botonPago from "../../../../../pics/boton Pagos.svg";
import botonPlataform from "../../../../../pics/boton_Plataform.svg";
import { useAuth } from "@/context/AuthContext";
import { BotonPagos } from "../../Boton/page";
import ButtonAvatar from "./ButtonAvatar/ButtonAvatar";

const Button = () => {
  const { userData } = useAuth();
  const token = userData?.tokenData?.token;

  return (
    <>
      {token ? (
        <Link href="/dashboard/home">
          <div className="ml-auto flex  items-center  w-60">
            <BotonPagos Imagen={botonPlataform} />
            <ButtonAvatar />
          </div>
        </Link>
      ) : (
        <Link href="/login/1">
          <div className="ml-auto flex  items-center  w-60">
            <BotonPagos Imagen={botonPago} />
          </div>
        </Link>
      )}
    </>
  );
};

export default Button;
