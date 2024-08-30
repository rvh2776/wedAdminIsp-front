"use client";
import { TituloPlanesInternet } from "@/components/LandinPage/PlanesDeInternet/Titulo";
import { Contador } from "@/components/Servicios/ContadorServicios/Contador";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserById } from "@/services/user.services";
import { PlanDetailModal } from "./PlanDetailModal";
import { ChangePlanModal } from "./CambiodePlanModal";

export const PlanActual: React.FC = () => {
  const [valorFinal, setValorFinal] = useState<number>(0);
  const [nombre, setNombre] = useState<string>("");
  const [velosubida, setVelosubida] = useState<string>("");
  const [bajada, setBajada] = useState<string>("");
  const [costoConexion, setCostoConexion] = useState<string>("");
  const [abono, setAbono] = useState<string>("");
  const [agente, setAgente] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isChangePlanModalOpen, setIsChangePlanModalOpen] =
    useState<boolean>(false); // Estado para el nuevo modal
  const [hasPlans, setHasPlans] = useState<boolean>(false); // Estado para verificar si hay planes

  const { userData } = useAuth();

  useEffect(() => {
    const fetchUser = async (userId: string, token: string) => {
      try {
        const user = await getUserById(userId, token);
        console.log("ID del usuario:", user.id);

        if (user.servicios && user.servicios.length > 0) {
          const servicio = user.servicios[0];
          const velocidadBajada = servicio.velocidadBajada;
          const nombreServicio = servicio.nombre;
          const velocidadSubida = servicio.velocidadSubida;
          const costo = servicio.costoConexion;
          const abono = servicio.abono;
          const agente = user.agente;

          const velocidadNum = parseInt(velocidadBajada.match(/\d+/)[0]);

          setValorFinal(velocidadNum);
          setNombre(nombreServicio);
          setVelosubida(velocidadSubida);
          setBajada(velocidadBajada);
          setCostoConexion(costo);
          setAbono(abono);
          setAgente(agente);

          setHasPlans(true);
        } else {
          setHasPlans(false);
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        setHasPlans(false);
      }
    };

    if (userData && userData.userData.id && userData.tokenData.token) {
      fetchUser(userData.userData.id, userData.tokenData.token);
    } else {
      setHasPlans(false);
    }
  }, [userData]);

  return (
    <>
      <TituloPlanesInternet title="Actualmente ud posee el plan de" />

      {hasPlans ? (
        <>
          <Contador
            endValue={valorFinal}
            name={nombre}
            gradiente="bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600"
            subida={velosubida}
            bajada={bajada}
            costoConexion={costoConexion}
            abono={abono}
          />
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-teal-400 text-white px-4 py-2 rounded hover:bg-teal-500"
            >
              Ver detalles
            </button>
            <button
              onClick={() => setIsChangePlanModalOpen(true)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-300 ml-5"
            >
              Cambiar de plan
            </button>
          </div>
          <PlanDetailModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            nombre={nombre}
            velocidadBajada={bajada}
            velocidadSubida={velosubida}
            costoConexion={costoConexion}
            abono={abono}
            agente={agente}
          />
          <ChangePlanModal
            isOpen={isChangePlanModalOpen}
            onClose={() => setIsChangePlanModalOpen(false)}
          />
        </>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-gray-700">No tiene planes actuales.</p>
        </div>
      )}
    </>
  );
};
