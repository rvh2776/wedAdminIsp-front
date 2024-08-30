"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { fetchProvincias } from "@/services/provincias.services";
import { RelevamientoData } from "@/types/relevamiento.types";
import Swal from "sweetalert2";
import { enviarRelevamiento } from "@/services/relevamientos.services";

interface Localidad {
  id: string;
  nombre: string;
}

interface Provincia {
  id: string;
  nombre: string;
  localidades: Localidad[];
}

interface FormServicioProps {
  initialCoordinates: { lat: number; lng: number } | null;
}

export const FormServicio: React.FC<FormServicioProps> = ({
  initialCoordinates,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    trigger,
    setValue,
  } = useForm();

  const [provincias, setProvincias] = useState<Provincia[]>([]);
  const [selectedProvincia, setSelectedProvincia] = useState<string>("");
  const [selectedLocalidad, setSelectedLocalidad] = useState<string>("");
  const [localidadesDisponibles, setLocalidadesDisponibles] = useState<
    Localidad[]
  >([]);
  const [showErrors, setShowErrors] = useState<{ [key: string]: boolean }>({});

  const [latitud, setLatitud] = useState<string>(
    initialCoordinates?.lat.toString() || ""
  );
  const [longitud, setLongitud] = useState<string>(
    initialCoordinates?.lng.toString() || ""
  );

  const nombre = watch("nombre");
  const correo = watch("correo");
  const telefono = watch("telefono");
  const direccion = watch("direccion");
  const razon = watch("razon");

  useEffect(() => {
    async function loadProvincias() {
      const data = await fetchProvincias();
      setProvincias(data);
    }
    loadProvincias();
  }, []);

  useEffect(() => {
    const provincia = provincias.find((p) => p.id === selectedProvincia);
    if (provincia) {
      setLocalidadesDisponibles(provincia.localidades);
    } else {
      setLocalidadesDisponibles([]);
    }
  }, [selectedProvincia, provincias]);

  useEffect(() => {
    if (initialCoordinates) {
      setLatitud(initialCoordinates.lat.toString());
      setLongitud(initialCoordinates.lng.toString());
    }
  }, [initialCoordinates]);

  const handleInputChange = async (field: string) => {
    setShowErrors((prev) => ({ ...prev, [field]: true }));
    await trigger(field); // Dispara la validación para el campo especificado
  };

  const onSubmit = async (data: any) => {
    try {
      const provincia = provincias.find((p) => p.id === selectedProvincia);
      const localidad = localidadesDisponibles.find(
        (l) => l.id === selectedLocalidad
      );

      const relevamientoData: RelevamientoData = {
        nombre: data.nombre,
        email: data.correo,
        telefono: data.telefono,
        razon: data.razon,
        direccion: data.direccion,
        provincia: provincia ? provincia.nombre : "",
        localidad: localidad ? localidad.nombre : "",
        latitud: parseFloat(latitud),
        longitud: parseFloat(longitud),
      };
      console.log(latitud);
      console.log(longitud);

      const response = await enviarRelevamiento(relevamientoData);

      Swal.fire({
        title: "¡Datos enviados con éxito!",
        icon: "success",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      });

      reset();
      setSelectedProvincia("");
      setSelectedLocalidad("");
      setShowErrors({});
      setLatitud("");
      setLongitud("");
    } catch (error) {
      console.error("Error enviando los datos:", error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg mx-auto lg:ml-auto lg:w-1/3">
      <h1 className="text-2xl font-bold text-black text-center mb-6">
        Envia tus datos para solicitar un servicio
      </h1>
      <p className="text-black text-center mb-4">Por favor ingrese sus datos</p>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="nombre" className="block text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            className="w-full p-2 border border-gray-300 rounded-md"
            {...register("nombre", {
              required: true,
              maxLength: 50,
              pattern: /^[a-zA-Z\s]*$/,
            })}
            onInput={() => handleInputChange("nombre")}
          />
          {showErrors.nombre && errors.nombre && (
            <p className="text-red-500">
              Nombre es requerido y debe tener menos de 50 caracteres
            </p>
          )}
        </div>
        <div>
          <label htmlFor="correo" className="block text-gray-700">
            Correo electrónico
          </label>
          <input
            type="email"
            id="correo"
            className="w-full p-2 border border-gray-300 rounded-md"
            {...register("correo", {
              required: true,
              maxLength: 50,
              pattern: /^\S+@\S+$/i,
            })}
            onInput={() => handleInputChange("correo")}
          />
          {showErrors.correo && errors.correo && (
            <p className="text-red-500">
              Correo electrónico es requerido y debe ser válido
            </p>
          )}
        </div>
        <div>
          <label htmlFor="telefono" className="block text-gray-700">
            Teléfono
          </label>
          <input
            type="tel"
            id="telefono"
            className="w-full p-2 border border-gray-300 rounded-md"
            {...register("telefono", {
              required: true,
              maxLength: 15,
              minLength: 7,
              pattern: {
                value: /^\d+$/,
                message: "El valor debe ser un número válido",
              },
            })}
            onInput={() => handleInputChange("telefono")}
          />
          {showErrors.telefono && errors.telefono && (
            <p className="text-red-500">
              Teléfono es requerido y debe tener al menos 7 digitos y ser solo
              numeros
            </p>
          )}
        </div>
        <div>
          <label htmlFor="direccion" className="block text-gray-700">
            Dirección
          </label>
          <input
            type="text"
            id="direccion"
            className="w-full p-2 border border-gray-300 rounded-md"
            {...register("direccion", { required: true })}
            onInput={() => handleInputChange("direccion")}
          />
          {showErrors.direccion && errors.direccion && (
            <p className="text-red-500">Dirección es requerida</p>
          )}
        </div>
        <div>
          <label htmlFor="provincia" className="block text-gray-700">
            Provincia
          </label>
          <select
            id="provincia"
            className="w-full p-2 border border-gray-300 rounded-md"
            {...register("provincia", { required: true })}
            value={selectedProvincia}
            onChange={(e) => {
              setSelectedProvincia(e.target.value);
              setValue("provincia", e.target.value);
            }}
          >
            <option value="">Seleccione una provincia</option>
            {provincias.map((provincia) => (
              <option key={provincia.id} value={provincia.id}>
                {provincia.nombre}
              </option>
            ))}
          </select>
          {showErrors.provincia && errors.provincia && (
            <p className="text-red-500">Provincia es requerida</p>
          )}
        </div>
        <div>
          <label htmlFor="localidad" className="block text-gray-700">
            Localidad
          </label>
          <select
            id="localidad"
            className="w-full p-2 border border-gray-300 rounded-md"
            {...register("localidad", { required: true })}
            value={selectedLocalidad}
            onChange={(e) => {
              setSelectedLocalidad(e.target.value);
              setValue("localidad", e.target.value);
            }}
          >
            <option value="">Seleccione una localidad</option>
            {localidadesDisponibles.map((localidad) => (
              <option key={localidad.id} value={localidad.id}>
                {localidad.nombre}
              </option>
            ))}
          </select>
          {showErrors.localidad && errors.localidad && (
            <p className="text-red-500">Localidad es requerida</p>
          )}
        </div>
        <div>
          <label htmlFor="latitud" className="block text-gray-700">
            Latitud
          </label>
          <input
            type="text"
            id="latitud"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={latitud}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="longitud" className="block text-gray-700">
            Longitud
          </label>
          <input
            type="text"
            id="longitud"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={longitud}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="razon" className="block text-gray-700">
            Comentarios
          </label>
          <textarea
            id="razon"
            className="w-full p-2 border border-gray-300 rounded-md h-32 resize-none"
            {...register("razon", { required: true })}
            onInput={() => handleInputChange("razon")}
          />
          {showErrors.razon && errors.razon && (
            <p className="text-red-500">Comentarios es requerido</p>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Enviar solicitud
          </button>
        </div>
      </form>
    </div>
  );
};
