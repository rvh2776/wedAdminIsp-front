"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { deleteUserById, getUserById } from "@/services/user.services";
import ConfirmationModal from "./ConfirmacionDarDeBajaModal";
import ModalEdicionDeDatos from "./ModalEdicionDeDatos";
import { fetchServicios } from "@/services/Planes.services";
import AssignPlanModal from "./ModalAsignarPlan";

interface UserDetailModalProps {
  user: any;
  onClose: () => void;
  onDelete: () => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({
  user,
  onClose,
  onDelete,
}) => {
  const { userData } = useAuth();
  const token = userData?.tokenData?.token;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showConfirmationEdit, setShowConfirmationEdit] = useState(false);
  const [showAssignPlanModal, setShowAssignPlanModal] = useState(false);
  const [planes, setPlanes] = useState<any[]>([]);
  const [currentServices, setCurrentServices] = useState<any[]>([]);
  const [equipos, setEquipos] = useState<any[]>([]);
  const [userDetails, setUserDetails] = useState<any>(user); // Definir el estado del usuario

  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const servicios = await fetchServicios();
        setPlanes(servicios.data);
      } catch (error) {
        console.error("Error al obtener los planes:", error);
      }
    };

    fetchPlanes();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && token) {
        try {
          const userDetails = await getUserById(user.id, token);
          setCurrentServices(userDetails.servicios);
          setEquipos(userDetails.equipos); // Actualiza el estado de equipos
        } catch (error) {
          console.error("Error al obtener los detalles del usuario:", error);
        }
      }
    };

    fetchUserData();
  }, [user, token]);

  const handleDelete = async () => {
    if (user && token) {
      try {
        await deleteUserById(user.id, token);
        onDelete();
        onClose();
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
      }
    }
  };

  const handleConfirmDelete = () => {
    handleDelete();
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handlePlanAssigned = () => {
    // Aquí puedes manejar lo que debe ocurrir después de que un plan sea asignado
    setShowAssignPlanModal(false);
  };

  if (!user) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg w-4/5 md:w-1/3 max-h-screen overflow-y-auto dark:bg-gray-600">
          <h2 className="text-2xl font-bold mb-4">Detalles del Usuario</h2>
          <p>
            <strong>ID:</strong> {user.id}
          </p>
          <p>
            <strong>Nombre:</strong> {user.nombre}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Teléfono:</strong> {user.telefono}
          </p>
          <p>
            <strong>Dirección:</strong> {user.direccion}
          </p>
          <p>
            <strong>Razón Social:</strong> {user.razonSocial}
          </p>
          <p>
            <strong>Documento:</strong> {user.documento}
          </p>
          <p>
            <strong>Observaciones:</strong> {user.observaciones}
          </p>
          <p>
            <strong>Señal de Conexión:</strong> {user.senalConexion}
          </p>
          <p>
            <strong>Creado el:</strong>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
          {/* Mostrar información del servicio actual */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Servicios del Usuario</h3>
            {currentServices.length > 0 ? (
              <ul>
                {currentServices.map((service) => (
                  <li key={service.id} className="mt-2">
                    <p>
                      <strong>Nombre:</strong> {service.nombre}
                    </p>
                    <p>
                      <strong>Velocidad de bajada:</strong>{" "}
                      {service.velocidadBajada}
                    </p>
                    <p>
                      <strong>Velocidad de subida:</strong>{" "}
                      {service.velocidadSubida}
                    </p>
                    <p>
                      <strong>Costo de conexión:</strong>{" "}
                      {service.costoConexion}
                    </p>
                    <p>
                      <strong>Abono:</strong> {service.abono}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay servicios asignados.</p>
            )}
          </div>
          {/* Información de Equipos */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Equipos Asignados</h3>
            {equipos.length > 0 ? (
              <ul>
                {equipos.map((equipo: any) => (
                  <li key={equipo.id} className="border-b py-2">
                    <p>
                      <strong>id del equipo:</strong> {equipo.id}
                    </p>
                    <p>
                      <strong>Nombre:</strong> {equipo.nombre}
                    </p>
                    <p>
                      <strong>Agente:</strong> {equipo.agente}
                    </p>
                    <p>
                      <strong>IP del AP:</strong> {equipo.ipAP}
                    </p>
                    <p>
                      <strong>Mac del equipo:</strong> {equipo.mac}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay equipos asignados.</p>
            )}
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="bg-teal-400 text-white px-4 py-2 rounded hover:bg-teal-500"
            >
              Cerrar
            </button>
            <button
              onClick={() => setShowConfirmation(true)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Dar de baja
            </button>
            <button
              onClick={() => setShowConfirmationEdit(true)}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Editar datos
            </button>
            <button
              onClick={() => setShowAssignPlanModal(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Asignar Plan
            </button>
          </div>
        </div>
      </div>
      {showConfirmation && (
        <ConfirmationModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
      {showAssignPlanModal && (
        <AssignPlanModal
          isOpen={showAssignPlanModal}
          onClose={() => setShowAssignPlanModal(false)}
          userId={user.id}
          onPlanAssigned={handlePlanAssigned}
        />
      )}
      {showConfirmationEdit && (
        <ModalEdicionDeDatos
          isOpen={showConfirmationEdit}
          onClose={() => setShowConfirmationEdit(false)}
          user={user}
        />
      )}
    </>
  );
};

export default UserDetailModal;
