"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { RelevamientoData } from "@/types/relevamiento.types";
import { fetchRelevamientos } from "@/services/relevamientos.services";
import Swal from "sweetalert2";
import ModalRelevamientos from "./ModalRelevamientos/ModalRelevamientos";
import { useSidebarContext } from "@/context/SidebarContext";
import { useAuth } from "@/context/AuthContext";
import { fetchAllUsers } from "@/services/allUsers.services";
import { allUsers } from "@/types/allUsers.types";
import useIsMobile from "@/hooks/HookIsMobile";

interface Localidad {
  id: string;
  nombre: string;
}

interface Provincia {
  id: string;
  nombre: string;
}

interface Relevamiento {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  provincia: Provincia;
  localidad: Localidad;
  razon: string;
  latitud: number;
  longitud: number;
}

const Relevamientos: React.FC = () => {
  const { userData } = useAuth();
  const [users, setUsers] = React.useState<allUsers[]>([]);
  const [relevamientos, setRelevamientos] = React.useState<Relevamiento[]>([]);
  const [
    selectedRelevamiento,
    setSelectedRelevamiento,
  ] = React.useState<Relevamiento | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const { btnFixed } = useSidebarContext();
  const isMobile = useIsMobile(); // Usa el hook para detectar si es móvil
  const divClasses = `p-3 mt-10 transition-all duration-1000 ${
    isMobile ? "" : btnFixed ? "ml-[270px]" : "ml-24"
  }`;

  useEffect(() => {
    const fetchData = async () => {
      if (userData?.tokenData.token) {
        const token = userData.tokenData.token;
        try {
          const dataUsersAPI = await fetchAllUsers(token);
          console.log("dataUsersAPI: ", dataUsersAPI);
          setUsers(dataUsersAPI);
        } catch (error) {
          console.error("Error al obtener los datos del endpoint", error);
        }
      }
    };
    fetchData();
  }, [userData]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const dataFromAPI = await fetchRelevamientos(1, 10);
        console.log(dataFromAPI); // verifico los datos que recibo
        setRelevamientos(dataFromAPI);

        if (dataFromAPI.length === 0) {
          Swal.fire({
            title: "No hay Solicitudes de Relevamientos",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Ok",
          });
        }
      } catch (error) {
        console.error("Error al obtener los datos del endpoint", error);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (relevamiento: Relevamiento) => {
    setSelectedRelevamiento(relevamiento);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRelevamiento(null);
  };

  return (
    <>
      <div className={divClasses}>
        <div className="p-8 max-w-7xl mx-auto mt-4">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-1  lg:grid-cols-3 sm:ml-4 md:ml-4 lg:ml-12">
            {relevamientos &&
              relevamientos.map(
                (relevamiento) =>
                  !users
                    .map((user) => user.email)
                    .includes(relevamiento.email) && (
                    <div
                      key={relevamiento.id}
                      className="bg-white shadow-lg rounded-lg p-6 mb-6 cursor-pointer dark:bg-gray-600 dark:opacity-60"
                      onClick={() => handleCardClick(relevamiento)}
                    >
                      <h1 className="text-2xl font-bold mb-4 text-center dark:text-orange-300">
                        Solicitud de Servicios de {relevamiento.nombre}
                      </h1>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <span className="font-semibold w-1/3">Nombre:</span>
                          <span className="text-blue-700 dark:text-blue-200">
                            {relevamiento.nombre}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-semibold w-1/3">Correo:</span>
                          <span className="text-blue-700 dark:text-blue-200">
                            {relevamiento.email}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-semibold w-1/3">Teléfono:</span>
                          <span className="text-blue-700 dark:text-blue-200">
                            {relevamiento.telefono}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-semibold w-1/3">
                            Dirección:
                          </span>
                          <span className="text-blue-700 dark:text-blue-200">
                            {relevamiento.direccion}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-semibold w-1/3">
                            Provincia:
                          </span>
                          <span className="text-blue-700 dark:text-blue-200">
                            {relevamiento.provincia.nombre}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-semibold w-1/3">
                            Localidad:
                          </span>
                          <span className="text-blue-700 dark:text-blue-200">
                            {relevamiento.localidad.nombre}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-semibold w-1/3">Mensaje:</span>
                          <span className="text-blue-700 dark:text-blue-200">
                            {relevamiento.razon}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-semibold w-1/3">Latitud</span>
                          <span className="text-blue-700 dark:text-blue-200">
                            {relevamiento.latitud}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-semibold w-1/3">Longitud</span>
                          <span className="text-blue-700 dark:text-blue-200">
                            {relevamiento.longitud}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
              )}
          </div>
        </div>
        {isModalOpen && selectedRelevamiento && (
          <ModalRelevamientos
            relevamiento={selectedRelevamiento}
            closeModal={closeModal}
          />
        )}
      </div>
    </>
  );
};

export default Relevamientos;
