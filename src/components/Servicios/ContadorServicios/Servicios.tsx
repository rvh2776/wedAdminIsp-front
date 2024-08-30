"use client";
import React, { useEffect, useState } from "react";
import { Contador } from "./Contador";
import { TituloPlanesInternet } from "@/components/LandinPage/PlanesDeInternet/Titulo";
import { fetchServicios } from "@/services/Planes.services";

export const ServiciosVista: React.FC = () => {
  const [servicios, setServicios] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadServicios = async () => {
      try {
        const data = await fetchServicios();
        setServicios(data);
        setLoading(false);
      } catch (error) {
        setError("No se pudieron cargar los servicios.");
        setLoading(false);
      }
    };

    loadServicios();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {servicios.map((servicio) => (
          <div
            key={servicio.id}
            className="flex flex-col items-center justify-center animate__animated animate__fadeInUp p-4"
          >
            <Contador
              endValue={parseInt(servicio.velocidadBajada)}
              name={servicio.nombre}
              gradiente="bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600"
              subida={servicio.velocidadSubida}
              bajada={servicio.velocidadBajada}
              //   costoConexion={servicio.costoConexion}
              //   abono={servicio.abono}
              //   agente={servicio.agente}
              //   isUserLoggedIn={true}
            />
          </div>
        ))}
      </div>
      <br />
      <br />
    </>
  );
};
