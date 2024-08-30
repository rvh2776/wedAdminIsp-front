"use client";
//import { useAuth } from "@/context/AuthContext";
import Factura from "@/types/factura.types";
import React from "react";

interface FacturaDetailModalProps {
  factura: Factura;
  isOpen: boolean;
  onClose: () => void;
  onPay: () => void;
  onDownload: () => void;
}

const FacturaDetailModal: React.FC<FacturaDetailModalProps> = ({
  factura,
  isOpen,
  onClose,
  onPay,
  onDownload,
}) => {
  if (!isOpen) return null;

  // const { userData } = useAuth();

  // console.log(userData);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl mx-auto dark:bg-gray-600">
        <h2 className="text-xl font-bold mb-4 text-center">
          Detalles de la Factura
        </h2>
        <div>
          <p>
            <strong>Fecha de Generación:</strong>{" "}
            {new Date(factura.fechaGen).toLocaleDateString()}
          </p>
          <p>
            <strong>Concepto:</strong> {factura.concepto}
          </p>
          <p>
            <strong>Observaciones:</strong> {factura.observaciones}
          </p>
          <p>
            <strong>Número de Factura:</strong> {factura.numFactura}
          </p>
          <p>
            <strong>Tipo de Pago:</strong> {factura.tipoPago}
          </p>
          <p>
            <strong>Fecha de Vencimiento:</strong>{" "}
            {new Date(factura.fechaVencimiento).toLocaleDateString()}
          </p>
          <p>
            <strong>Importe:</strong> {factura.importe}
          </p>
        </div>
        <div className="mt-4 text-center">
          <button
            onClick={onClose}
            className="shadow-md px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 mx-2"
          >
            Cerrar
          </button>

          {!factura.pagado && (
            <button
              onClick={onPay}
              className="shadow-md px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 mx-2"
            >
              Pagar
            </button>
          )}

          <button
            onClick={onDownload}
            className="shadow-md px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 mx-2"
          >
            Descargar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacturaDetailModal;
