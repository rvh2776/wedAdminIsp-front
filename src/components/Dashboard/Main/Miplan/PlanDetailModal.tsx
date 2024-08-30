"use client";
import React from "react";

interface PlanDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  nombre: string;
  velocidadBajada: string;
  velocidadSubida: string;
  costoConexion: string;
  abono: string;
  agente: string;
}

export const PlanDetailModal: React.FC<PlanDetailModalProps> = ({
  isOpen,
  onClose,
  nombre,
  velocidadBajada,
  velocidadSubida,
  costoConexion,
  abono,
  agente,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 md:w-1/3">
        <h2 className="text-2xl font-bold mb-4">Detalles del Plan</h2>
        <div className="mb-4">
          <p className="text-lg mb-2">
            <strong>Nombre:</strong> {nombre}
          </p>
          <p className="text-lg mb-2">
            <strong>Agente:</strong> {agente}
          </p>
          <p className="text-lg mb-2">
            <strong>Velocidad de Subida:</strong> {velocidadSubida}
          </p>
          <p className="text-lg mb-2">
            <strong>Velocidad de Bajada:</strong> {velocidadBajada}
          </p>
          <p className="text-lg mb-2">
            <strong>Costo de Conexión:</strong> {costoConexion}
          </p>
          <p className="text-lg mb-4">
            <strong>Abono:</strong> {abono}
          </p>
        </div>
        <button
          onClick={onClose}
          className="bg-teal-400 text-white px-4 py-2 rounded hover:bg-teal-500"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
