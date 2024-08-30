"use client";
import React from "react";
import { PaymentIssueForm } from "./PagosProblemasForm";

interface PaymentIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PaymentIssueModal: React.FC<PaymentIssueModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-4">
        <h2 className="text-xl mb-4">Reportar Problema con Pagos</h2>
        <PaymentIssueForm />
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
