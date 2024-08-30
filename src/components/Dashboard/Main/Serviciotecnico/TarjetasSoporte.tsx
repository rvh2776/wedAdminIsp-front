"use client";
import React, { useState } from "react";
import {
  FaExchangeAlt,
  FaCreditCard,
  FaTools,
  FaExclamationCircle,
} from "react-icons/fa";
import { ChangePlanModal } from "../Miplan/CambiodePlanModal";
import { PaymentIssueModal } from "./ModalPagosProblemas";

import { OtherIssuesModal } from "./ModalOtrosProblemas";
import { EquipmentIssueModal } from "./ModalProblemasConMiEquipo";

const SoporteTecnico = () => {
  const [isChangePlanModalOpen, setIsChangePlanModalOpen] = useState(false);
  const [isPaymentIssueModalOpen, setIsPaymentIssueModalOpen] = useState(false);
  const [isEquipmentIssueModalOpen, setIsEquipmentIssueModalOpen] = useState(
    false
  );
  const [isOtherIssuesModalOpen, setIsOtherIssuesModalOpen] = useState(false);

  const tarjetas = [
    {
      icon: <FaExchangeAlt size={30} />,
      title: "Quiero cambiar de plan",
      onClick: () => setIsChangePlanModalOpen(true),
    },
    {
      icon: <FaCreditCard size={30} />,
      title: "Problemas con pagos",
      onClick: () => setIsPaymentIssueModalOpen(true),
    },
    {
      icon: <FaTools size={30} />,
      title: "Problemas con mi equipo",
      onClick: () => setIsEquipmentIssueModalOpen(true),
    },
    {
      icon: <FaExclamationCircle size={30} />,
      title: "Otros problemas",
      onClick: () => setIsOtherIssuesModalOpen(true),
    },
  ];

  return (
    <div className="flex justify-center w-full mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tarjetas.map((tarjeta, index) => (
          <div
            key={index}
            className="flex items-center p-4 border rounded shadow-lg hover:bg-gray-100 cursor-pointer"
            onClick={tarjeta.onClick}
          >
            <div className="mr-4">{tarjeta.icon}</div>
            <div className="text-lg font-semibold">{tarjeta.title}</div>
          </div>
        ))}
      </div>

      {isChangePlanModalOpen && (
        <ChangePlanModal
          isOpen={isChangePlanModalOpen}
          onClose={() => setIsChangePlanModalOpen(false)}
        />
      )}

      {isPaymentIssueModalOpen && (
        <PaymentIssueModal
          isOpen={isPaymentIssueModalOpen}
          onClose={() => setIsPaymentIssueModalOpen(false)}
        />
      )}

      {isEquipmentIssueModalOpen && (
        <EquipmentIssueModal
          isOpen={isEquipmentIssueModalOpen}
          onClose={() => setIsEquipmentIssueModalOpen(false)}
        />
      )}

      {isOtherIssuesModalOpen && (
        <OtherIssuesModal
          isOpen={isOtherIssuesModalOpen}
          onClose={() => setIsOtherIssuesModalOpen(false)}
        />
      )}
    </div>
  );
};

export default SoporteTecnico;
