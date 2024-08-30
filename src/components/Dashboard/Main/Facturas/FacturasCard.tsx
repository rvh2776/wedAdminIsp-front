"use client";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  DescargarFactura,
  fetchFacturasId,
} from "@/services/Facturas.services";
import Factura from "@/types/factura.types";
import FacturaDetailModal from "./FacturaDetalles";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const FacturasList: React.FC = () => {
  const { userData } = useAuth();
  const router = useRouter();

  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [selectedFactura, setSelectedFactura] = useState<Factura | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getFacturas = async () => {
      if (!userData || !userData.tokenData || !userData.tokenData.token) {
        console.error("Token no disponible");
        setIsLoading(false);
        return;
      }

      const token = userData.tokenData.token;
      const id = userData.userData.id;
      try {
        const data: any = await fetchFacturasId(token, id);
        if (data && data.facturas) {
          // Ordenar las facturas: las no pagadas primero
          const sortedFacturas = data.facturas.sort(
            (a: Factura, b: Factura) => {
              return a.pagado === b.pagado ? 0 : a.pagado ? 1 : -1;
            }
          );
          setFacturas(sortedFacturas);
          console.log(sortedFacturas);
        } else {
          setFacturas([]);
        }
      } catch (error) {
        console.error("Error al obtener las facturas:", error);
        setFacturas([]);
      } finally {
        setIsLoading(false);
      }
    };

    getFacturas();
  }, [userData]);

  const handleOpenModal = (factura: Factura) => {
    setSelectedFactura(factura);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedFactura(null);
    setIsModalOpen(false);
  };

  const handlePay = () => {
    // console.log("Pagar factura", selectedFactura);
    router.push(`/dashboard/pagos?id=${selectedFactura?.id}&userId=${userData?.userData.id}&amount=${selectedFactura?.importe}`);
    // router.push("/dashboard/pagos");
    // console.log(selectedFactura?.observaciones);
  };

  const handleDownload = async () => {
    if (selectedFactura) {
      try {
        if (userData && userData.tokenData && userData.tokenData.token) {
          const token = userData.tokenData.token;
          const response = await DescargarFactura(token, selectedFactura.id);

          const blob = new Blob([response], { type: "application/pdf" });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `Factura-${selectedFactura.id}.pdf`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
          console.log(selectedFactura?.id);
        } else {
          console.error("Token no disponible");
        }
      } catch (error) {
        console.error("Error al descargar la factura:", error);
      }
    }
  };

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="flex justify-center">
      <div className="w-auto">
        {facturas.length === 0 ? (
          <h1 className="text-4xl">No tiene facturas</h1>
        ) : (
          <>
            {/* Títulos de las columnas */}
            <div className="grid grid-cols-4 gap-4 p-4 font-bold text-center border-b-2">
              <p>Fecha de Generación</p>
              <p>Número de Factura</p>
              <p>Importe</p>
              <p>Estado</p>
            </div>

            {/* Listado de facturas */}
            {facturas.map((factura) => (
              <div
                key={factura.id}
                className={`grid grid-cols-4 gap-4 p-4 mb-2 border rounded-md cursor-pointer hover:bg-gray-100 ${
                  factura.pagado ? "bg-green-100 dark:bg-gray-600 dark:opacity-60  dark:text-green-300" : "bg-red-100 dark:bg-gray-600 dark:opacity-60 dark:text-red-300"
                }`}
                onClick={() => handleOpenModal(factura)}
              >
                <p className="text-center">
                  {new Date(factura.fechaGen).toLocaleDateString()}
                </p>
                <p className="text-center">{factura.numFactura}</p>
                <p className="text-center">{factura.importe}</p>
                <p className="text-center">
                  {factura.pagado ? "Pagado" : "Pendiente"}
                </p>
              </div>
            ))}
          </>
        )}
        {selectedFactura && (
          <FacturaDetailModal
            factura={selectedFactura}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onPay={handlePay}
            onDownload={handleDownload}
          />
        )}
      </div>
    </div>
  );
};

export default FacturasList;
