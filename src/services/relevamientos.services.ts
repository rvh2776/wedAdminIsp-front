import { RelevamientoData } from "@/types/relevamiento.types";
import axios from "axios";
const apiURL = process.env.NEXT_PUBLIC_API_URL;

export async function enviarRelevamiento(data: RelevamientoData): Promise<any> {
    try {
      const response = await axios.post(`${apiURL}/relevamientos`, data);
      console.log('Datos enviados con éxito:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error enviando los datos:', error);
      throw error;
    }
  }

  export const fetchRelevamientos = async (page: number, limit: number) => {
    try {
      const response = await axios.get(`${apiURL}/relevamientos?page=${page}&limit=${99}`);
      return response.data.relevamientos;
    } catch (error) {
      console.error('Error al obtener los datos del endpoint', error);
      throw error;
    }
  };

  export async function actualizarRelevamiento(id: string, data: Partial<RelevamientoData>): Promise<any> {
    try {
      const response = await axios.put(`${apiURL}/relevamientos/${id}`, data);
      console.log('Datos actualizados con éxito:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error actualizando los datos:', error);
      throw error;
    }
  }
  
 
  export async function crearUsuario(data: { nombre: string; email: string; password: string; }): Promise<any> {
    try {
      const response = await axios.post(`${apiURL}/auths/signup`, data);
      console.log('Usuario creado con éxito:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creando el usuario:', error);
      throw error;
    }
  }