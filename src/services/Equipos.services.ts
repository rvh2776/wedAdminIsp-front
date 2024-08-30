// src/services/equiposService.ts

import axios from "axios";
import Equipos from "@/types/Equipos.types";
const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const fetchEquipos = async (token: string): Promise<Equipos[]> => {
  try {
    const response = await axios.get(
      `${apiURL}/equipos?page=1&limit=99`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
    
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    throw error;
  }
};


export const AddEquipo = async (token: string, data: Equipos) => {
  try {
    const response = await axios.post(`${apiURL}/equipos`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear el equipo:", error);
    throw error;
  }
};

export const EditarEquipo = async (id: string, data: Equipos, token: string) => {
  try {
    const response = await axios.put(`${apiURL}/equipos/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token en los encabezados
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al editar el equipo:", error);
    throw error; 
  }
};

export const desasignarUsuarioEquipo = async (equipoId: string, token: string) => {
  try {
    const response = await axios.patch(
      `$${apiURL}/equipos/${equipoId}/desasignar`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error al desasignar el usuario del equipo:', error);
    throw error;
  }
};
