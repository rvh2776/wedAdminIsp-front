"use client";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
import imagenUsers from "../../../../../../public/images/imageUsers.jpg";
import imagenFact from "../../../../../../public/images/imageFact.jpg";
import imagenRelev from "../../../../../../public/images/imageRelevamientos.jpg";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { fetchAllUsers } from "@/services/allUsers.services";
import { fetchRelevamientos } from "@/services/relevamientos.services";
import { fetchAsistencias } from "@/services/Soporte.services";
import { Maps } from "./Maps";
import { allUsers } from "@/types/allUsers.types";
import { RelevamientoData } from "@/types/relevamiento.types";

const GarphicBarsAdmin = dynamic(() => import("./GarphicBarsAdmin"), {
  ssr: false,
});

interface Asistencia {
  id: string;
  createdAt: string;
  agente: string;
  userId: string;
  diaCliente: string;
  horarios: string;
  problema: string;
  observaciones: string;
}

const PanelDeControl = () => {
  const { userData } = useAuth();
  const [userId, setUserId] = useState<string | undefined>();
  const [asistenciaId, setAsistenciaId] = useState<string | undefined>();
  const [users, setUsers] = React.useState<allUsers[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalRelevamientos, setTotalRelevamientos] = useState<number>(0);
  const token = userData ? userData.tokenData.token : "";
  const [asistencias, setAsistencias] = useState<Asistencia[]>([]);

  let i = 1;

  const firstLetterName = (name: string | undefined): string => {
    if (name && name.trim() !== "")
      return name
        .trim()
        .charAt(0)
        .toUpperCase();
    else return `<i className="lni lni-user"></i>`;
  };

  const letterColors: { [key: string]: string } = {
    A: "bg-red-500",
    B: "bg-blue-500",
    C: "bg-green-500",
    D: "bg-yellow-500",
    E: "bg-purple-500",
    F: "bg-pink-500",
    G: "bg-indigo-500",
    H: "bg-teal-500",
    I: "bg-orange-500",
    J: "bg-cyan-500",
    K: "bg-lime-500",
    L: "bg-amber-500",
    M: "bg-emerald-500",
    N: "bg-violet-500",
    O: "bg-fuchsia-500",
    P: "bg-rose-500",
    Q: "bg-sky-500",
    R: "bg-blue-600",
    S: "bg-red-600",
    T: "bg-green-600",
    U: "bg-yellow-600",
    V: "bg-purple-600",
    W: "bg-pink-600",
    X: "bg-indigo-600",
    Y: "bg-teal-600",
    Z: "bg-orange-600",
  };

  const getColorByFirstLetter = (name: string) => {
    const firstLetter = firstLetterName(name);
    return letterColors[firstLetter] || "bg-gray-500"; // color por defecto si no coincide
  };

 
  useEffect(() => {
    const getData = async () => {
      try {
        // Llamadas API en paralelo
        const [users, relevamientos]: [users: allUsers[], relevamientos: RelevamientoData[]] = await Promise.all([
          fetchAllUsers(token),
          fetchRelevamientos(1, 999)
        ]);
        
        setUsers(users);
        setTotalUsers(users.length);
  
        const filteredRelevamientos = relevamientos.filter(relevamiento =>
          !users.some(user => user.email === relevamiento.email)
        );
        setTotalRelevamientos(filteredRelevamientos.length);

      } catch (error) {
        console.error('Error al obtener los datos', error);
      }
    };
  
    getData();
  }, [token]);
     
  useEffect(() => {
    const getRelevamientos = async () => {
      if (userData) {
        try {
          const data = await fetchAsistencias(userData.tokenData.token);
          setAsistencias(data);
          console.log("asistencias: ", data);
        } catch (error) {
          console.error("Error al cargar las asistencias");
        }
      }
    };
    getRelevamientos();
  }, [userData]);

  return (
    <div>
      {/* Primer Bloque: Datos del Usuario y Foto de Perfil */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href={"/dashboard/miperfil"}>
          <div className="mb-6 p-4 bg-gray-100 border rounded-lg dark:bg-gray-600 dark:opacity-60">
            <h2 className="text-lg font-bold mb-2">DATOS DE USUARIO:</h2>
            <div className="grid grid-cols-3">
              <div className="flex justify-center items-center rounded-lg p-4">
                {userData?.userData.imgUrl !== "https://exmple-image.webp" ? (
                  <img
                    src={userData?.userData.imgUrl}
                    alt="Foto de Perfil"
                    className="w-24 h-24 object-cover rounded-full"
                  />
                ) : (
                  <button
                    className={`rounded-full w-24 h-24 flex items-center justify-center text-center font-[530] ${getColorByFirstLetter(
                      userData?.userData.nombre
                    )} text-white`}
                  >
                    <p className="text-[50px] pr-[1px]">
                      {firstLetterName(userData?.userData.nombre)}
                    </p>
                  </button>
                )}
              </div>
              <div className="col-span-2">
                <p className=" font-semibold ">
                  <span className="text-blue-900 font-bold dark:text-orange-300">Nombre: </span>{" "}
                  &nbsp; {userData?.userData.nombre}
                </p>
                <p className="font-semibold ">
                  <span className="text-blue-900 font-bold dark:text-orange-300">Email: </span>{" "}
                  &nbsp; {userData?.userData.email}
                </p>
                <p className="font-semibold ">
                  <span className="text-blue-900 font-bold dark:text-orange-300">Teléfono: </span>{" "}
                  &nbsp; {userData?.userData.telefono}
                </p>
                <p className="font-semibold ">
                  <span className="text-blue-900 font-bold dark:text-orange-300">Dirección: </span>{" "}
                  &nbsp; {userData?.userData.direccion}
                </p>
              </div>
            </div>
          </div>
        </Link>
        <Link href={"/dashboard/vertodoslosusuarios"}>
          <div className="mb-6 h-[198px] p-4 bg-gray-100 border rounded-lg dark:bg-gray-600 dark:opacity-60">
            <h2 className="text-lg font-bold mb-2">TOTAL DE USUARIOS:</h2>
            <div className="grid grid-cols-2 ">
              <div className="flex justify-center items-center rounded-lg p-4 ">
                <Image
                  src={imagenUsers}
                  alt="Foto de Perfil"
                  className="w-auto z-50 h-22 object-cover"
                  style={{ filter: "brightness(1.1)", mixBlendMode: "multiply" }}
                />
              </div>
              <div>
                <p className=" font-semibold text-center text-[60px]">
                  {totalUsers}
                </p>
              </div>
            </div>
          </div>
        </Link>
        <Link href={"/dashboard/relevamientos"}>
          <div className="mb-6 p-4 bg-gray-100 border rounded-lg dark:bg-gray-600 dark:opacity-60">
            <h2 className="text-lg font-bold mb-2">TOTAL DE RELEVAMIENTOS:</h2>
            <div className="grid grid-cols-2 ">
              <div className="flex justify-center items-center rounded-lg p-4 ">
                <Image
                  src={imagenRelev}
                  alt="Foto de Perfil"
                  className="w-24 h-24 object-cover "
                  style={{ filter: "brightness(1.1)", mixBlendMode: "multiply" }}
                />
              </div>
              <div>
                <p className=" font-semibold text-center text-[60px]">
                  {totalRelevamientos}
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Segundo Bloque: Gráfico y Total de Factura */}
      <div className="grid md:grid-cols-1  xl:grid-cols-2 gap-4">
        {/* Grid Izquierdo: Gráfico */}
        <div className="h-[420px]  bg-gray-100 border rounded-lg p-4 dark:bg-gray-600 dark:opacity-60">
          <h2 className="text-lg font-semibold mb-2">
            HISTORIAL DE ASISTENCIAS
          </h2>

          <GarphicBarsAdmin
            handleUserId={setUserId}
            handleAsistenciaId={setAsistenciaId}
          />
        </div>
        {/* Grid Derecho: Total de Factura */}

        <div className="h-[420px]  mb-6 p-4 bg-gray-100 border rounded-lg dark:bg-gray-600 dark:opacity-60">
          <h2 className="text-lg font-bold mb-2">DETALLES DE UBICACIÓN</h2>
          <br />
          <Maps userId={userId} />
        </div>
      </div>

      {/* Tercer Bloque: HISTORIAL DE FACTURAS */}
      <div className="mb-6 p-4 bg-gray-100 border rounded-lg hidden md:block dark:bg-gray-600 dark:opacity-60">
        <h2 className="text-lg font-bold mb-2">
          DETALLES DEL HISTORIAL DE ASISTENCIAS:
        </h2>
        <br />

        {/* Tabla de facturas */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2 dark:text-orange-300 dark:bg-gray-800">N°</th>
              <th className="border px-4 py-2 dark:text-orange-300 dark:bg-gray-800">Fecha de Solicitud</th>
              <th className="border px-4 py-2 dark:text-orange-300 dark:bg-gray-800">Agente</th>
              <th className="border px-4 py-2 dark:text-orange-300 dark:bg-gray-800">Cliente</th>
              <th className="border px-4 py-2 dark:text-orange-300 dark:bg-gray-800">Problema</th>
              <th className="border px-4 py-2 dark:text-orange-300 dark:bg-gray-800">Observaciones</th>
            </tr>
          </thead>
          <tbody>
            {asistencias?.map((asistencia, index) => (
              <tr
                key={asistencia.id}
                className={asistenciaId === asistencia.id ? "bg-blue-200" : ""}
              >
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">
                  {new Date(asistencia.createdAt).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">{asistencia.agente}</td>
                <td className="border px-4 py-2">{asistencia.userId}</td>
                <td className="border px-4 py-2">{asistencia.problema}</td>
                <td className="border px-4 py-2">{asistencia.observaciones}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PanelDeControl;
