"use client";
import React, { useEffect, useState } from "react";
import { fetchAsistencias } from "@/services/Soporte.services";
import AsistenciaModal from "./modalDetallesSolicitudesServicios";
import { useAuth } from "@/context/AuthContext";

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

export const AsistenciasList: React.FC = () => {
  const { userData } = useAuth();
  const [asistencias, setAsistencias] = useState<Asistencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [
    selectedAsistencia,
    setSelectedAsistencia,
  ] = useState<Asistencia | null>(null);

  useEffect(() => {
    const loadAsistencias = async () => {
      if (!userData?.tokenData?.token) {
        setError("No se pudo obtener el token de autenticación.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await fetchAsistencias(userData.tokenData.token);
        setAsistencias(data);
        setError(null); // Resetea cualquier error previo
      } catch (error) {
        setError("Error al cargar las asistencias");
      } finally {
        setLoading(false);
      }
    };

    loadAsistencias();
  }, [userData]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Lista de Asistencias</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {asistencias.map((asistencia) => (
          <div
            key={asistencia.id}
            className="p-4 border border-gray-300 rounded-lg shadow-lg cursor-pointer transition duration-300 ease-in-out transform hover:bg-gray-100 hover:shadow-xl hover:scale-105"
            onClick={() => setSelectedAsistencia(asistencia)}
          >
            <h3 className="text-lg font-semibold">{asistencia.problema}</h3>
            <p>
              <strong>Agente:</strong> {asistencia.agente}
            </p>
            <p>
              <strong>Fecha:</strong>{" "}
              {new Date(asistencia.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
      {selectedAsistencia && (
        <AsistenciaModal
          asistencia={selectedAsistencia}
          onClose={() => setSelectedAsistencia(null)}
          onDelete={() => {
            setAsistencias(
              asistencias.filter((a) => a.id !== selectedAsistencia.id)
            );
            setSelectedAsistencia(null);
          }}
        />
      )}
    </div>
  );
};
