// Vertodoslosusuarios.tsx
"use client";
import { useAuth } from "@/context/AuthContext";
import { useSidebarContext } from "@/context/SidebarContext";
import { fetchAllUsers } from "@/services/allUsers.services";
import { allUsers } from "@/types/allUsers.types";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UserDetailModal from "./ModalVertodoslosUsuarios";
import useIsMobile from "@/hooks/HookIsMobile";

const Vertodoslosusuarios = () => {
  const { btnFixed } = useSidebarContext();
  const [users, setUsers] = React.useState<allUsers[]>([]);
  const [selectedUser, setSelectedUser] = useState<allUsers | null>(null);
  const { userData } = useAuth();
  const isMobile = useIsMobile(); // Usa el hook para detectar si es móvil
  const divClasses = `p-3 mt-10 transition-all duration-1000 ${
    isMobile ? "" : btnFixed ? "ml-[270px]" : "ml-24"
  }`;

  useEffect(() => {
    const fetchData = async () => {
      if (!userData || !userData.tokenData || !userData.tokenData.token) {
        console.error("Token no disponible");
        return;
      }
      const token = userData.tokenData.token;
      try {
        const dataUsersAPI = await fetchAllUsers(token);
        console.log("dataUsersAPI: ", dataUsersAPI);
        setUsers(dataUsersAPI);

        if (dataUsersAPI.length === 0) {
          Swal.fire({
            title: "No hay Usuarios en la Base de Datos",
            icon: "warning",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Ok",
          });
        }
      } catch (error) {
        console.error("Error al obtener los datos del endpoint", error);
      }
    };

    if (userData && userData.tokenData && userData.tokenData.token) {
      fetchData();
    }
  }, [userData]);

  const handleUserClick = (user: allUsers) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const handleDeleteUser = () => {
    // Aquí puedes agregar la lógica para dar de baja al usuario
    console.log("Eliminar usuario", selectedUser?.id);
    handleCloseModal();
  };

  const firstLetterName = (name: string | undefined): string => {
    if (name && name.trim() !== "")
      return name
        .trim()
        .charAt(0)
        .toUpperCase();
    else return `<i className="lni lni-user"></i>`;
  };

  const letterColors: { [key: string]: string } = {
    A: "bg-red-500",
    B: "bg-blue-500",
    C: "bg-green-500",
    D: "bg-yellow-500",
    E: "bg-purple-500",
    F: "bg-pink-500",
    G: "bg-indigo-500",
    H: "bg-teal-500",
    I: "bg-orange-500",
    J: "bg-cyan-500",
    K: "bg-lime-500",
    L: "bg-amber-500",
    M: "bg-emerald-500",
    N: "bg-violet-500",
    O: "bg-fuchsia-500",
    P: "bg-rose-500",
    Q: "bg-sky-500",
    R: "bg-blue-600",
    S: "bg-red-600",
    T: "bg-green-600",
    U: "bg-yellow-600",
    V: "bg-purple-600",
    W: "bg-pink-600",
    X: "bg-indigo-600",
    Y: "bg-teal-600",
    Z: "bg-orange-600",
  };

  const getColorByFirstLetter = (name: string) => {
    const firstLetter = firstLetterName(name);
    return letterColors[firstLetter] || "bg-gray-500";
  };

  return (
    <div className={divClasses}>
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mt-8">Usuarios</h2>
        <div className="flex flex-wrap gap-4">
          {users
            .filter((user) => !user.isAdmin)
            .map((user) => (
              <div
                key={user.id}
                className="bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer p-4 w-full sm:w-80 md:w-96  dark:bg-gray-600 dark:opacity-60"
                onClick={() => handleUserClick(user)}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {user.imgUrl !== "https://exmple-image.webp" ? (
                      <img
                        src={user.imgUrl}
                        alt={user.nombre}
                        className="w-16 h-16 rounded-full"
                      />
                    ) : (
                      <button
                        className={`rounded-full w-16 h-16 flex items-center justify-center text-center font-bold ${getColorByFirstLetter(
                          user.nombre
                        )} text-white`}
                      >
                        <p className="text-2xl ">
                          {firstLetterName(user.nombre)}
                        </p>
                      </button>
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-orange-300">
                      {user.nombre}
                    </h2>
                    <p className="text-gray-600 dark:text-blue-300">{user.email}</p>
                    <p className="text-gray-500 dark:text-gray-100">
                      <strong>Teléfono:</strong> {user.telefono}
                    </p>
                    <p className="text-gray-500 dark:text-gray-100">
                      <strong>Dirección:</strong> {user.direccion}
                    </p>
                    <p className="text-gray-500 dark:text-gray-100">
                      <strong>Razón Social:</strong> {user.razonSocial}
                    </p>
                    <p className="text-gray-500 dark:text-gray-100">
                      <strong>Documento:</strong> {user.documento}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-700">Administradores</h2>
        <div className="flex flex-wrap gap-4">
          {users
            .filter((user) => user.isAdmin)
            .map((user) => (
              <div
                key={user.id}
                className="bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer p-4 w-full sm:w-80 md:w-96 dark:bg-gray-600 dark:opacity-60"
                onClick={() => handleUserClick(user)}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {user.imgUrl !== "https://exmple-image.webp" ? (
                      <img
                        src={user.imgUrl}
                        alt={user.nombre}
                        className="w-16 h-16 rounded-full"
                      />
                    ) : (
                      <button
                        className={`rounded-full w-16 h-16 flex items-center justify-center text-center font-bold ${getColorByFirstLetter(
                          user.nombre
                        )} text-white`}
                      >
                        <p className="text-2xl">
                          {firstLetterName(user.nombre)}
                        </p>
                      </button>
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-orange-300">
                      {user.nombre}
                    </h2>
                    <p className="text-gray-600 dark:text-blue-300">{user.email}</p>
                    <p className="text-gray-500 dark:text-gray-100">
                      <strong>Teléfono:</strong> {user.telefono}
                    </p>
                    <p className="text-gray-500 dark:text-gray-100">
                      <strong>Dirección:</strong> {user.direccion}
                    </p>
                    <p className="text-gray-500 dark:text-gray-100">
                      <strong>Razón Social:</strong> {user.razonSocial}
                    </p>
                    <p className="text-gray-500 dark:text-gray-100">
                      <strong>Documento:</strong> {user.documento}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={handleCloseModal}
          onDelete={handleDeleteUser}
        />
      )}
    </div>
  );
};

export default Vertodoslosusuarios;
