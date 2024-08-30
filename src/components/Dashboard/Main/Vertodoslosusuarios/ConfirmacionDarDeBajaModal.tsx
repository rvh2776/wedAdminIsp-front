"use client";
import React from "react";

interface ConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-4/5 md:w-1/3 max-h-screen overflow-y-auto dark:bg-gray-600">
        <h2 className="text-xl font-bold mb-4">Confirmación</h2>
        <p>¿Estás seguro de que deseas dar de baja a este usuario?</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Confirmar
          </button>
          <button
            onClick={onCancel}
            className="bg-teal-400 text-white px-4 py-2 rounded hover:bg-teal-500"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
