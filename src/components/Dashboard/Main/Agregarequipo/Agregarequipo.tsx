"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Equipos from "@/types/Equipos.types";
import { useAuth } from "@/context/AuthContext";
import { AddEquipo } from "@/services/Equipos.services";
import { useSidebarContext } from "@/context/SidebarContext";

const Agregarequipo: React.FC = () => {
  const { userData } = useAuth();
  const { btnFixed } = useSidebarContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Equipos>();

  const onSubmit = async (data: Equipos) => {
    if (!userData || !userData.tokenData || !userData.tokenData.token) {
      console.error("Token no disponible");
      return;
    }

    const token = userData.tokenData.token;

    // Eliminar campos vacíos
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== "")
    );

    // Asignamos isAvailable y isInstalled
    const equipoData = {
      ...filteredData,
      isAvailable: true,
      isInstalled: false,
    };

    try {
      await AddEquipo(token, equipoData);
      alert("Equipo creado exitosamente");
      console.log(equipoData);
    } catch (error) {
      console.error("Error al crear el equipo:", error);
    }
  };

  return (
    <div
      className={`p-3 mt-20 transition-all duration-1000 ${
        btnFixed ? "ml-[270px]" : "ml-24"
      }`}
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-black text-center mb-6">
          Agregar nuevo equipo
        </h1>
        <p className="text-black text-center mb-4">
          Por favor ingrese los datos del equipo
        </p>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="col-span-1">
            <label htmlFor="nombre" className="block text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register("nombre", { required: true, maxLength: 50 })}
            />
            {errors.nombre && (
              <p className="text-red-500">
                Nombre es requerido y debe tener menos de 50 caracteres
              </p>
            )}
          </div>
          <div className="col-span-1">
            <label htmlFor="equipo" className="block text-gray-700">
              Equipo
            </label>
            <input
              type="text"
              id="equipo"
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register("equipo", { required: true })}
            />
            {errors.equipo && (
              <p className="text-red-500">Equipo es requerido</p>
            )}
          </div>
          <div className="col-span-1">
            <label htmlFor="macEquipo" className="block text-gray-700">
              MAC del Equipo
            </label>
            <input
              type="text"
              id="macEquipo"
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register("macEquipo", { required: true })}
            />
            {errors.macEquipo && (
              <p className="text-red-500">MAC del Equipo es requerida</p>
            )}
          </div>
          {/* Los campos restantes no son obligatorios */}
          <div className="col-span-1">
            <label htmlFor="agente" className="block text-gray-700">
              Agente
            </label>
            <input
              type="text"
              id="agente"
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register("agente")}
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="ipPc" className="block text-gray-700">
              IP del PC
            </label>
            <input
              type="text"
              id="ipPc"
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register("ipPc", {
                pattern: /^\d{1,3}(\.\d{1,3}){3}$/,
              })}
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="ipAp" className="block text-gray-700">
              IP del AP
            </label>
            <input
              type="text"
              id="ipAp"
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register("ipAp", {
                pattern: /^\d{1,3}(\.\d{1,3}){3}$/,
              })}
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="mascaraSubRed" className="block text-gray-700">
              Máscara de Subred
            </label>
            <input
              type="text"
              id="mascaraSubRed"
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register("mascaraSubRed")}
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="puertaEnlace" className="block text-gray-700">
              Puerta de Enlace
            </label>
            <input
              type="text"
              id="puertaEnlace"
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register("puertaEnlace")}
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="dns1" className="block text-gray-700">
              DNS 1
            </label>
            <input
              type="text"
              id="dns1"
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register("dns1")}
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="dns2" className="block text-gray-700">
              DNS 2
            </label>
            <input
              type="text"
              id="dns2"
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register("dns2")}
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="nodo" className="block text-gray-700">
              Nodo
            </label>
            <input
              type="text"
              id="nodo"
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register("nodo")}
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="cableMts" className="block text-gray-700">
              Cable (mts)
            </label>
            <input
              type="text"
              id="cableMts"
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register("cableMts")}
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="antena" className="block text-gray-700">
              Antena
            </label>
            <input
              type="text"
              id="antena"
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register("antena")}
            />
          </div>
          <div className="col-span-2 text-center">
            <button
              type="submit"
              className="shadow-md px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Agregarequipo;
