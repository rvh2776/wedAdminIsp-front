"use client";
import { useAuth } from "@/context/AuthContext";
import { useSidebarContext } from "@/context/SidebarContext";
import useIsMobile from "@/hooks/HookIsMobile";
import { sendAssistanceRequest } from "@/services/Soporte.services";
import React, { useState } from "react";

const BajaServicio = () => {
  const { userData } = useAuth();
  const { btnFixed } = useSidebarContext();
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [razonBaja, setRazonBaja] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = userData?.tokenData?.token;
  const isMobile = useIsMobile(); // Usa el hook para detectar si es móvil
  const divClasses = `p-3 mt-10 transition-all duration-1000 ${
    isMobile ? "" : btnFixed ? "ml-[40%]" : "ml-[36%]"
  }`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Definir el problema que se enviará
      const problema = `Dar de baja por: ${
        reason === "Otro" ? razonBaja : reason
      }`;

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
    <div className={divClasses}>
      <div className="max-w-lg p-8 bg-white rounded-md shadow-md mt-20  dark:bg-gray-600 dark:opacity-60">
        <h2 className="text-2xl font-bold mb-4 dark:text-orange-300">Dar de Baja Servicio</h2>
        {confirmation ? (
          <p className="text-green-300">
            La solicitud de baja se ha realizado exitosamente
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="serviceId"
                className="block text-sm font-medium text-gray-700 dark:text-blue-300"
              >
                ID del Cliente
              </label>
              <input
                type="text"
                id="serviceId"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-blue-800"
                value={userData?.userData.id}
                readOnly
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="reason"
                className="block text-sm font-medium text-gray-700 dark:text-blue-300"
              >
                Razón para Dar de Baja
              </label>
              <select
                id="reason"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-blue-800"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              >
                <option value="" disabled>
                  Selecciona una opción
                </option>
                <option value="Costo">Costo</option>
                <option value="Servicio Insatisfactorio">
                  Servicio Insatisfactorio
                </option>
                <option value="Cambio de Proveedor">Cambio de Proveedor</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            {reason === "Otro" && (
              <div className="mb-4">
                <label
                  htmlFor="razonBaja"
                  className="block text-sm font-medium text-gray-700 dark:text-blue-300"
                >
                  Menciona otra razón de la baja
                </label>
                <input
                  type="text"
                  id="razonBaja"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-blue-800"
                  value={razonBaja}
                  onChange={(e) => setRazonBaja(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="details"
                className="block text-sm font-medium text-gray-700 dark:text-blue-300"
              >
                Detalles Adicionales
              </label>
              <textarea
                id="details"
                className="mt-1 block w-full h-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-blue-800"
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
              {isSubmitting ? "Procesando..." : "Dar de Baja"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BajaServicio;
