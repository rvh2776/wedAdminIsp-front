"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { assignPlanToUser, fetchServicios } from "@/services/Planes.services";
import Swal from "sweetalert2";

interface Plan {
  id: string;
  velocidadBajada: string;
  velocidadSubida: string;
  costoConexion: string;
  abono: string;
  nombre: string;
}

interface AssignPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onPlanAssigned: () => void;
}

const AssignPlanModal: React.FC<AssignPlanModalProps> = ({
  isOpen,
  onClose,
  userId,
  onPlanAssigned,
}) => {
  const { userData } = useAuth();

  
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [planes, setPlanes] = useState<Plan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    if (isOpen) {
      const loadPlanes = async () => {
        setLoading(true);
        try {
          const data = await fetchServicios();
          setPlanes(data); // Asegúrate de que la estructura de data sea correcta
        } catch (error) {
          if (axios.isAxiosError(error)) {
            setError("Error en la solicitud Axios.");
          } else {
            setError("Error desconocido.");
          }
        } finally {
          setLoading(false);
        }
      };

      loadPlanes();
    }
  }, [isOpen]);


  if (!userData || !userData.tokenData || !userData.tokenData.token) {
    console.error("Token no disponible");
    return null;
  }
  const token = userData.tokenData.token;
  

  const handleAssignPlan = async () => {
    if (selectedPlan && userData?.tokenData?.token) {
      try {
        // Log para verificar los datos que se están enviando
        console.log("Enviando datos a assignPlanToUser:");
        console.log("User ID:", userId);
        console.log("Plan seleccionado:", selectedPlan);
        console.log("Token:", token);

        await assignPlanToUser(selectedPlan.id, userId, token);

        Swal.fire({
          title: "Éxito!",
          text: "El plan se ha asignado correctamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        onPlanAssigned();
        onClose();
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Hubo un problema al asignar el plan. Intenta de nuevo.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        console.error("Error al asignar el plan:", error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-4/5 md:w-1/3 max-h-screen overflow-y-auto dark:bg-gray-600">
        <h2 className="text-2xl font-bold mb-4">Seleccionar Plan</h2>
        {loading ? (
          <p>Cargando planes...</p>
        ) : error ? (
          <p>{error}</p>
        ) : planes.length > 0 ? (
          planes.map((plan) => (
            <div
              key={plan.id}
              className={`p-2 border dark:border-gray-600 ${
                selectedPlan && selectedPlan.id === plan.id ? "bg-gray-200 dark:text-blue-900" : " dark:bg-gray-400 dark:text-blue-900"
              } cursor-pointer`}
              onClick={() => setSelectedPlan(plan)}
            >
              <h3>{plan.nombre}</h3>
              <p>Velocidad de Subida: {plan.velocidadSubida}</p>
              <p>Velocidad de Bajada: {plan.velocidadBajada}</p>
              <p>Costo de Conexión: {plan.costoConexion}</p>
            </div>
          ))
        ) : (
          <p>No hay planes disponibles</p>
        )}
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cancelar
          </button>
          <button
            onClick={handleAssignPlan}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-4"
            disabled={!selectedPlan}
          >
            Asignar Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignPlanModal;
