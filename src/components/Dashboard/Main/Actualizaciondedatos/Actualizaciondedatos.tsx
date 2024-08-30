"use client";
import { useAuth } from "@/context/AuthContext";
import { useSidebarContext } from "@/context/SidebarContext";
import { sendAssistanceRequest } from "@/services/Soporte.services";
import React, { useState } from "react";

type FormField = 'nombre' | 'email' | 'telefono' | 'direccion' | 'razonSocial' | 'documento';

const BajaServicio = () => {
  const { userData } = useAuth();
  const { btnFixed } = useSidebarContext();
  const [reason, setReason] = useState("Actualizacion de datos");
  const [details, setDetails] = useState("Solicito actualizar mis datos...");
  const [confirmation, setConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFields, setSelectedFields] = useState<FormField[]>([]);
  const [formData, setFormData] = useState<{
    nombre: string;
    email: string;
    telefono: string;
    direccion: string;
    razonSocial: string;
    documento: string | number;
  }>({
    nombre: userData?.userData.nombre || "",
    email: userData?.userData.email || "",
    telefono: userData?.userData.telefono || "",
    direccion: userData?.userData.direccion || "",
    razonSocial: userData?.userData.razonSocial || "",
    documento: userData?.userData.documento || "",
  });

  const token = userData?.tokenData?.token;

  const handleFieldSelection = (field: FormField) => {
    setSelectedFields((prev) => {
      const newSelectedFields = prev.includes(field)
        ? prev.filter((f) => f !== field)
        : [...prev, field];

      // Actualizar las observaciones al seleccionar o deseleccionar un campo
      setDetails((prevDetails) => {
        const regex = new RegExp(`${field.charAt(0).toUpperCase() + field.slice(1)}: .*`, 'i');
        if (newSelectedFields.includes(field)) {
          return prevDetails.match(regex)
            ? prevDetails
            : `${prevDetails}\n${field.charAt(0).toUpperCase() + field.slice(1)}: ${formData[field]}`;
        } else {
          return prevDetails.replace(regex, "").trim();
        }
      });

      return newSelectedFields;
    });
  };

  const handleInputChange = (field: FormField, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });

    // Actualizar las observaciones cuando se cambia el valor del campo seleccionado
    setDetails((prevDetails) => {
      const regex = new RegExp(`${field.charAt(0).toUpperCase() + field.slice(1)}: .*`, 'i');
      if (prevDetails.match(regex)) {
        return prevDetails.replace(regex, `${field.charAt(0).toUpperCase() + field.slice(1)}: ${value}`);
      } else {
        return `${prevDetails}\n${field.charAt(0).toUpperCase() + field.slice(1)}: ${value}`;
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const selectedData = selectedFields.reduce((acc, field) => {
        acc[field] = String(formData[field]); // Convertir a string explícitamente
        return acc;
      }, {} as Record<FormField, string>);

      const problema = `Solicitud de: ${reason}`;

      const requestData = {
        diaCliente: new Date().toISOString(),
        horarios: "",
        problema,
        observaciones: details,
        ...selectedData,
      };

      if (token) {
        await sendAssistanceRequest(token, userData?.userData.id, requestData);
      }

      setConfirmation(true);
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
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
      <div className="max-w-lg p-8 bg-white rounded-md shadow-md dark:bg-gray-600 dark:opacity-90 ">
        <h2 className="text-2xl font-bold mb-4">Actualizacion de datos</h2>
        {confirmation ? (
          <p className="text-green-600">
            La solicitud de actualizacion de datos se ha enviado correctamente
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="serviceId"
                className="block text-sm font-medium text-gray-700 dark:text-gray-400"
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
                className="block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Razón
              </label>
              <input
                type="text"
                id="reason"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-blue-800"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="details"
                className="block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Comentarios
              </label>
              <textarea
                id="details"
                className="mt-1 block w-full h-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-blue-800"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>

            {Object.keys(formData).map((field) => (
              <div key={field} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                  <input
                    type="checkbox"
                    checked={selectedFields.includes(field as FormField)}
                    onChange={() => handleFieldSelection(field as FormField)}
                    className="mr-2"
                  />
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                {selectedFields.includes(field as FormField) && (
                  <input
                    type="text"
                    value={formData[field as FormField]}
                    onChange={(e) =>
                      handleInputChange(field as FormField, e.target.value)
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-blue-800"
                  />
                )}
              </div>
            ))}

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
