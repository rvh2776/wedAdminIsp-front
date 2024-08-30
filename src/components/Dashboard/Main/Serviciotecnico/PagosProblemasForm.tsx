"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { sendAssistanceRequest } from "@/services/Soporte.services";
import Swal from "sweetalert2";

export const PaymentIssueForm: React.FC = () => {
  const [description, setDescription] = useState("");

  const { userData } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userData) {
      try {
        const token = userData.tokenData.token;
        const userId = userData.userData.id;

        const data = {
          diaCliente: "",
          horarios: "",
          problema: "Problema con el pago",
          observaciones: description,
        };

        const response = await sendAssistanceRequest(token, userId, data);
        Swal.fire({
          title: "¡Envío exitoso!",
          text: "Tu problema ha sido reportado correctamente.",
          icon: "success",
          confirmButtonText: "OK",
        });

        console.log("Respuesta de la API:", response);
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
      }
    } else {
      Swal.fire("Error", "No se pudo enviar la solicitud", "error");
      console.error("No se pudo obtener la información del usuario.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">Descripción del problema:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
      >
        Enviar
      </button>
    </form>
  );
};
