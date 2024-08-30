"use client";
import { useAuth } from "@/context/AuthContext";
import { deleteAsistencia } from "@/services/Soporte.services";
import { getUserById } from "@/services/user.services";

import React, { useEffect, useState } from "react";

interface AsistenciaModalProps {
  asistencia: Asistencia | null;
  onClose: () => void;
  onDelete: () => void;
}

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

const AsistenciaModal: React.FC<AsistenciaModalProps> = ({
  asistencia,
  onClose,
  onDelete,
}) => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userData } = useAuth();
  const token = userData?.tokenData?.token;

  useEffect(() => {
    const fetchUser = async () => {
      if (asistencia?.userId && token) {
        try {
          const user = await getUserById(asistencia.userId, token);
          setUser(user);
        } catch (error) {
          setError("Error al obtener los datos del usuario");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUser();
  }, [asistencia, token]);

  const handleDelete = async () => {
    if (asistencia && token) {
      try {
        await deleteAsistencia(asistencia.id, token);
        console.log(asistencia.id);

        onDelete();
        onClose();
      } catch (error) {
        console.log(error);

        setError("Error al borrar la asistencia");
      }
    }
  };

  if (!asistencia) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-4/5 md:w-1/3 max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Detalles de la Solicitud</h2>
        <p>
          <strong>Problema:</strong> {asistencia.problema}
        </p>
        <p>
          <strong>Agente:</strong> {asistencia.agente}
        </p>
        <p>
          <strong>Fecha:</strong>{" "}
          {new Date(asistencia.createdAt).toLocaleDateString()}
        </p>
        <p>
          <strong>Observaciones:</strong> {asistencia.observaciones}
        </p>
        <p>
          <strong>Usuario:</strong>{" "}
          {loading
            ? "Cargando..."
            : error
            ? error
            : (user as any)?.nombre || asistencia.userId}
        </p>
        <p>
          <strong>Id del Usuario:</strong>{" "}
          {loading ? "Cargando..." : error ? error : asistencia.userId}
        </p>

        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4 mr-2"
        >
          Borrar
        </button>
        <button
          onClick={onClose}
          className="bg-teal-400 text-white px-4 py-2 rounded hover:bg-teal-500 mt-4"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default AsistenciaModal;
