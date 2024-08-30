"use client";
import React, { useState, useContext, ErrorInfo } from "react";
import { MapaRelevamiento } from "./MapaRelevamiento"; // Asegúrate de que la ruta sea la correcta

import { useAuth } from "@/context/AuthContext";
import { crearUsuario } from "@/services/user.services";
import Swal from "sweetalert2";
import { validateFormRelevamiento } from "@/helpers/validateFormRelevamiento";

interface Localidad {
  id: string;
  nombre: string;
}

interface Provincia {
  id: string;
  nombre: string;
}

interface Relevamiento {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  provincia: Provincia;
  localidad: Localidad;
  razon: string;
  latitud: number;
  longitud: number;
}

interface ModalRelevamientosProps {
  relevamiento: Relevamiento;
  closeModal: () => void;
}

const ModalRelevamientos: React.FC<ModalRelevamientosProps> = ({
  relevamiento,
  closeModal,
}) => {
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({
    nombre: false,
    telefono: false,
    direccion: false,
    latitud: false,
    longitud: false,
    tipoDocum: false,
    documento: false,
    email: false,
    password: false,
    provinciaId: false,
    localidadId: false,
    codigoPostal: false,
  });

  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: relevamiento.latitud,
    lng: relevamiento.longitud,
  });

  const [formData, setFormData] = useState({
    nombre: relevamiento.nombre,
    codArea: relevamiento.telefono.substring(0, 4), // Ejemplo para extraer código de área
    telefono: relevamiento.telefono,
    direccion: relevamiento.direccion,
    latitud: relevamiento.latitud,
    longitud: relevamiento.longitud,
    tipoDocum: "DNI", // Ajusta según los datos disponibles
    documento: "", // Ajusta según los datos disponibles
    email: relevamiento.email,
    password: "", // Asegúrate de manejar contraseñas de manera segura
    provinciaId: relevamiento.provincia.id,
    localidadId: relevamiento.localidad.id,
    codigoPostal: "", // Ajusta según los datos disponibles
    imgUrl: "https://exmple-image.webp", // Valor por defecto para imgUrl
    // domicilioInstalacion: "",
    // localidadInstalacion: "",
    // telefonoInstalacion: "",
    // emailInstalacion: "",
  });
  const { userData } = useAuth();
  const token = userData?.tokenData?.token;
  const [isLoadin, setIsLoading ] = useState<Boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});

  if (!token) {
    console.error("Token no disponible");
    return null; // Asegúrate de que no continúes con la lógica si el token no está disponible
  }
  const handleLocationChange = (newCoords: { lat: number; lng: number }) => {
    setLocation(newCoords);
    // Si necesitas actualizar las coordenadas en el relevamiento, puedes hacerlo aquí.
  };

  const handleEditClick = (field: string) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {

    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    const fieldErrors = validateFormRelevamiento({ ...formData, [name]: value });
		setErrors({ ...errors, [name]: fieldErrors[name] });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (token) {
        setIsLoading(true);
        await crearUsuario(formData, token); // Pasa el formData y el token como argumentos
        closeModal();
          Swal.fire({
            title: "Usuario creado con éxito",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Ok",
          });
      } else {
        console.error("Token no disponible");
      }
    } catch (error: any) {
      setIsLoading(false);
      console.error("Error al crear el usuario:", error.response.data.message);
      Swal.fire({
        title: "Oops! ",
        text: `Error al crear el usuario: ${error.response.data.message} / ${error.response.data.alert}`,
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      });
    }
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg max-w-full sm:max-w-lg md:max-w-xl lg:max-w-7xl w-full h-5/6 overflow-y-auto dark:bg-gray-600 ">
        <h1 className="text-2xl font-bold mb-4">Detalles del Relevamiento</h1>
        <div className="space-y-4 mb-8">
          {Object.keys(formData).map((key) => (
            <div className="flex items-center" key={key}>
              <span className="font-semibold w-1/3 capitalize">{key}:</span>
              <div className="w-full">
              <input
                type={key === "password" ? "password" : "text"}
                name={key}
                value={(formData as any)[key]}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:text-blue-800"
              />
               {errors[key] && (
                <p className="text-red-500 text-sm ml-2">{errors[key]}</p>
              )}
               </div>
            </div>
            
          ))}
        </div>

        <div className="flex flex-col gap-4 h-auto ">
          <div className="flex items-center justify-center ">
            <MapaRelevamiento
              coordinates={location}
              onLocationChange={handleLocationChange}
            />
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>

            <div className="flex justify-center gap-10 px-72">
              {isLoadin ?
              <h1 className="text-2xl font-bold mb-4 mt-6">Creando usuario . . . </h1>
              :
              <>
              <button
                disabled={Object.values(errors).some(error =>  error !== undefined)}
                type="submit"
                className={Object.values(errors).some(error =>  error !== undefined) ? "w-full sm:w-2/3 bg-gray-400 text-gray-100 py-2 px-4 rounded-md ease-in cursor-not-allowed" : "w-full sm:w-2/3 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 "}
                >
                Guardar Cambios
              </button>

             

              <button
              className="w-full sm:w-2/3 bg-gray-500 text-white px-4 py-2 rounded-md"
              onClick={closeModal}
              >
            Cerrar
          </button>
                </>
          }
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalRelevamientos;
