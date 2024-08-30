"use client";
import React, { useEffect, useState } from "react";
import Equipos from "@/types/Equipos.types";
import { fetchAllUsers } from "@/services/allUsers.services";
import {
  EditarEquipo,
  desasignarUsuarioEquipo,
} from "@/services/Equipos.services";
import EquiposEditModal from "./EditarEquiposModa";
import { useAuth } from "@/context/AuthContext";
import { getUserById } from "@/services/user.services";

interface EquiposModalProps {
  equipo: Equipos | null;
  onClose: () => void;
}

const EquiposModal: React.FC<EquiposModalProps> = ({ equipo, onClose }) => {
  const { userData } = useAuth();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [users, setUsers] = useState<Array<{ id: string; nombre: string }>>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [assignedUser, setAssignedUser] = useState<any>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      if (userData?.tokenData?.token) {
        try {
          const data = await fetchAllUsers(userData.tokenData.token);
          if (Array.isArray(data)) {
            setUsers(data);
          } else if (data && Array.isArray(data.users)) {
            setUsers(data.users);
          }
        } catch (error) {
          console.error("Error al obtener los usuarios:", error);
        }
      }
    };

    fetchUsers();
  }, [userData]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (equipo?.user?.id && userData?.tokenData?.token) {
        try {
          const userDetails = await getUserById(
            equipo.user.id,
            userData.tokenData.token
          );
          setAssignedUser(userDetails);
        } catch (error) {
          console.error("Error al obtener detalles del usuario:", error);
        }
      }
    };

    fetchUserDetails();
  }, [equipo?.user?.id, userData]);

  const handleAssignUser = async () => {
    if (equipo && selectedUser && userData?.tokenData?.token) {
      if (!equipo.id) {
        console.error("El equipo no tiene un ID válido.");
        return;
      }

      const userIdToAssign = selectedUser;

      const updatedEquipo = {
        ...equipo,
        userId: userIdToAssign,
        isInstalled: true,
        isAvailable: false,
      };

      try {
        const result = await EditarEquipo(
          equipo.id,
          updatedEquipo,
          userData.tokenData.token
        );
        console.log("Equipo actualizado:", result);
        setAssignedUser(result.user || null);
        setIsEditModalOpen(false);
        onClose();
      } catch (error) {
        console.error("Error al asignar usuario al equipo:", error);
      }
    }
  };

  const handleUnassignUser = async () => {
    if (equipo && userData?.tokenData?.token) {
      if (!equipo.id) {
        console.error("El equipo no tiene un ID válido.");
        return;
      }

      try {
        // Llamada al servicio para desasignar el usuario del equipo
        const result = await desasignarUsuarioEquipo(
          equipo.id,
          userData.tokenData.token
        );
        console.log("Usuario desasignado del equipo:", result);
        setAssignedUser(null); // Limpia los detalles del usuario asignado
        setIsEditModalOpen(false);
        onClose();
      } catch (error) {
        console.error("Error al desasignar usuario del equipo:", error);
      }
    }
  };

  if (!equipo) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full dark:bg-gray-600 ">
          <h2 className="text-xl font-bold mb-4">{equipo.nombre}</h2>

          {/* Mostrar información del equipo según la interfaz */}
          <p>
            <strong>Agente:</strong> {equipo.agente}
          </p>
          <p>
            <strong>IP del PC:</strong> {equipo.ipPc}
          </p>
          <p>
            <strong>IP del AP:</strong> {equipo.ipAp}
          </p>
          <p>
            <strong>Máscara de Subred:</strong> {equipo.mascaraSubRed}
          </p>
          <p>
            <strong>Puerta de Enlace:</strong> {equipo.puertaEnlace}
          </p>
          <p>
            <strong>DNS1:</strong> {equipo.dns1}
          </p>
          <p>
            <strong>DNS2:</strong> {equipo.dns2}
          </p>
          <p>
            <strong>MAC del Equipo:</strong> {equipo.macEquipo}
          </p>
          <p>
            <strong>Antena:</strong> {equipo.antena}
          </p>
          <p>
            <strong>Nodo:</strong> {equipo.nodo}
          </p>
          <p>
            <strong>Cable (metros):</strong> {equipo.cableMts}
          </p>
          <p>
            <strong>Disponible:</strong> {equipo.isAvailable ? "Sí" : "No"}
          </p>
          <p>
            <strong>Instalado:</strong> {equipo.isInstalled ? "Sí" : "No"}
          </p>

          <div className="mt-4">
            <p>
              <strong>Asignado a:</strong>{" "}
              {assignedUser ? assignedUser.nombre : "Ninguno"}
            </p>
            <p>
              <strong>ID del usuario asignado:</strong>{" "}
              {equipo.user?.id || "Ninguno"}
            </p>
            {assignedUser && (
              <div className="mt-2">
                <p>
                  <strong>Email del usuario:</strong> {assignedUser.email}
                </p>
                <p>
                  <strong>Teléfono:</strong> {assignedUser.telefono}
                </p>
                {/* Otros detalles del usuario si es necesario */}
              </div>
            )}
          </div>

          <div className="mt-4">
            {equipo.isAvailable ? (
              <>
                <label className="block text-sm font-medium text-gray-700">
                  Asignar a usuario:
                </label>
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:text-blue-800"
                >
                  <option value="">Selecciona un usuario</option>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.nombre}
                      </option>
                    ))
                  ) : (
                    <option value="">No hay usuarios disponibles</option>
                  )}
                </select>
              </>
            ) : (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleUnassignUser}
              >
                Desasignar Usuario
              </button>
            )}
          </div>

          <div className="mt-4">
            <button
              onClick={onClose}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Cerrar
            </button>
            {equipo.isAvailable && (
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleAssignUser}
                disabled={!selectedUser}
              >
                Asignar Usuario
              </button>
            )}
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => setIsEditModalOpen(true)}
            >
              Editar
            </button>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <EquiposEditModal
          equipo={equipo}
          onClose={() => setIsEditModalOpen(false)}
          onSave={(updatedEquipo) => {
            console.log("Equipo actualizado:", updatedEquipo);
            setIsEditModalOpen(false);
            onClose();
          }}
        />
      )}
    </>
  );
};

export default EquiposModal;
