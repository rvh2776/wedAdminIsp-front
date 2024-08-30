"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { deleteUserById } from "@/services/user.services";
import ConfirmationModal from "./ConfirmacionDarDeBajaModal";
import { sendProfileChangeRequest } from "@/services/profileApi";
import Swal from "sweetalert2";

interface UserDetailModalProps {
  user: UserDetail;
  onClose: () => void;
  isOpen: any;
  userId: string;
}

interface UserDetail {
  id?: string | undefined;
  nombre: string;
  telefono: string;
  direccion: string;
  documento: number;
  email: string;
  codigoPostal: string;
  observaciones?: string;
  senalConexion?: string;
  createdAt?: string | number | Date | undefined;
  isAdmin?: string;
}

const ModalEdicionDeDatos: React.FC<any> = ({
  userId,
  isOpen,
  user,
  onClose,
}) => {
  const { userData } = useAuth();
  const token = userData?.tokenData?.token;

  const [formData, setFormData] = useState({
    nombre: user.nombre || "",
    email: user.email || "",
    telefono: user.telefono || "",
    direccion: user.direccion || "",
    documento:user.documento || "",
    codigoPostal: user.codigoPostal || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "documento" ? Number(value) : value, // Convertir a número si es el documento
    }));
  };
  

  const handleConfirmChange = async () => {
    try {
      if (token) {
        const dataToSend = {
          ...formData,
          documento: Number(formData.documento), // Convertir documento a número
        };
  
        console.log("Datos que se van a enviar:", dataToSend);
        await sendProfileChangeRequest(token, user.id, dataToSend);
  
        Swal.fire({
          title: "¡Datos actualizados correctamente!",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            window.location.reload();
          }
        });
        onClose();
      }
    } catch (error: any) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message} / ${error.response.data.alert}`,
      });
    }
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
            <strong>Nombre:</strong>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              className="ml-6 border px-2 w-[50%] border-gray-300 rounded-md shadow-sm dark:text-blue-800"
            />
          </p>
          <p>
            <strong>Email:</strong>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="ml-6 border px-2 w-[50%] border-gray-300 rounded-md shadow-sm dark:text-blue-800"
            />
          </p>
          <p>
            <strong>Teléfono:</strong>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              className="ml-6 border px-2 w-[50%] border-gray-300 rounded-md shadow-sm  dark:text-blue-800"
            />
          </p>
          <p>
            <strong>Dirección:</strong>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleInputChange}
              className="ml-6 border px-2 w-[50%] border-gray-300 rounded-md shadow-sm dark:text-blue-800"
            />
          </p>

          <p>
            <strong>Documento:</strong>
            <input
              type="text"
              name="documento"
              value={formData.documento}
              onChange={handleInputChange}
              className="ml-6 border px-2 w-[50%] border-gray-300 rounded-md shadow-sm dark:text-blue-800"
            />
          </p>
          <p>
            <strong>Observaciones:</strong>
            <input
              type="text"
              name="observaciones"
              value={user.observaciones}
              className="ml-6 px-2 w-[50%] rounded-md shadow-sm dark:text-blue-800"
            />
          </p>
          <p>
            <strong>Señal de Conexión:</strong> {user.senalConexion}
          </p>
          <p>
            <strong>Creado el:</strong>{" "}   {user.createdAt && new Date(user.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Es Administrador:</strong> {user.isAdmin ? "Sí" : "No"}
          </p>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Cerrar
            </button>
            <button
              onClick={() => handleConfirmChange()}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalEdicionDeDatos;
