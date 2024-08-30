"use client";
import { useAuth } from "@/context/AuthContext";
import { sendAssistanceRequest } from "@/services/Soporte.services";
import React, { useState } from "react";
import Swal from "sweetalert2";

export const EquipmentIssueForm: React.FC = () => {
  const [equipment, setEquipment] = useState("");
  const [description, setDescription] = useState("");
  const { userData } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userData && userData.tokenData && userData.userData) {
      const token = userData.tokenData.token;
      const userId = userData.userData.id;
      console.log(token);
      console.log(userId);

      try {
        const response = await sendAssistanceRequest(token, userId, {
          diaCliente: "",
          horarios: "",
          problema: equipment,
          observaciones: description,
        });

        Swal.fire({
          title: "¡Envío exitoso!",
          text: "Tu problema ha sido reportado correctamente.",
          icon: "success",
          confirmButtonText: "OK",
        });

        console.log("Respuesta de la API:", response);
        console.log(token);
        console.log(userId);
      } catch (error) {
        Swal.fire("Error", "No se pudo enviar la solicitud", "error");
        console.error("Error al enviar la solicitud:", error);
        console.log(token);
        console.log(userId);
      }
    } else {
      console.error(
        "No se pudo obtener el token o userId del contexto de autenticación"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">Problema del equipo:</label>
        <input
          type="text"
          value={equipment}
          onChange={(e) => setEquipment(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Informacion Extra</label>
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
