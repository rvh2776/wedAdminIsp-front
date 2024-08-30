"use client";
import { useAuth } from "@/context/AuthContext";
import { useSidebarContext } from "@/context/SidebarContext";
import { sendAssistanceRequest } from "@/services/Soporte.services";
import React, { useState } from "react";

const BajaServicio = () => {
  const { userData } = useAuth();
  const { btnFixed } = useSidebarContext();
  const [reason, setReason] = useState("Actualizacion de datos");
  const [details, setDetails] = useState("Solicito actualizar mis datos...");
  const [confirmation, setConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = userData?.tokenData?.token;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Definir el problema que se enviará
      const problema = `Solicitud de: ${reason}`;

      // Definir los datos que se enviarán en la solicitud
      const requestData = {
        diaCliente: new Date().toISOString(), // Puedes ajustar esto según tus necesidades
        horarios: "", // Esto puede ser personalizado
        problema,
        observaciones: details,
      };

      if (token) {
        await sendAssistanceRequest(token, userData?.userData.id, requestData);
      }

      setConfirmation(true);
    } catch (error) {
      console.error("Error al enviar la solicitud de baja:", error);
      // Manejo del error, si lo deseas, podrías mostrar un mensaje al usuario
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`p-3 mt-36 transition-all duration-1000 ${
        btnFixed ? "ml-[40%]" : "ml-[33%]"
      }`}
    >
      <div className="max-w-lg p-8 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Actualizacion de datos</h2>
        {confirmation ? (
          <p className="text-green-600">
            La solicitud de actualizacion de datos se a enviado correctamente
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="serviceId"
                className="block text-sm font-medium text-gray-700"
              >
                ID del Cliente
              </label>
              <input
                type="text"
                id="serviceId"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={userData?.userData.id}
                readOnly
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="reason"
                className="block text-sm font-medium text-gray-700"
              >
                Razón
              </label>

              <input
                type="text"
                id="razon"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={reason}
                readOnly
                required
              />

            </div>
             <div className="mb-4">
              <label
                htmlFor="details"
                className="block text-sm font-medium text-gray-700"
              >
                Comentarios
              </label>
              <textarea
                id="details"
                className="mt-1 block w-full h-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className={`w-full px-4 py-2 text-white bg-red-600 rounded-md ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-red-700"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Procesando..." : "Enviar solicitud"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BajaServicio;
