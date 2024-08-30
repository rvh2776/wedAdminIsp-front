"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext"; // Asegúrate de importar el contexto de autenticación
import { sendAssistanceRequest } from "@/services/Soporte.services";
import Swal from "sweetalert2";

export const OtherIssuesForm: React.FC = () => {
  const [subject, setSubject] = useState("");
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
          problema: subject,
          observaciones: description,
        };
        const response = await sendAssistanceRequest(token, userId, data);
        Swal.fire({
          title: "¡Envío exitoso!",
          text: "Tu problema ha sido reportado correctamente.",
          icon: "success",
          confirmButtonText: "OK",
        });
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
        <label className="block text-gray-700">Descripción del problema</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Información Extra</label>
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
