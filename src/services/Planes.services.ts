import { useAuth } from "@/context/AuthContext";
import axios from "axios";
const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const fetchServicios = async () => {
  try {
    const response = await axios.get(`${apiURL}/servicios?page=1&limit=99`);
    return response.data; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error en la solicitud Axios:', error.message);
    } else {
      console.error('Error desconocido:', error);
    }
    throw error; 
  }
};




interface PlanDetails {
  velocidadBajada: string;
  velocidadSubida: string;
  costoConexion: string;
  abono: string;
  nombre: string;
}

export const assignPlanToUser = async (planId: string, userId: string, token: string) => {
  try {
    // Log para verificar los datos que se están enviando
    console.log("Datos enviados a la API:");
    console.log("Plan ID:", planId);
    console.log("User ID:", userId);
    console.log("Token:", token);

    // Obtener los detalles del plan
    const planResponse = await axios.get(`${apiURL}/servicios/${planId}`);
    const plan: PlanDetails = planResponse.data;

    // Enviar la solicitud PUT para actualizar el servicio
    const response = await axios.put(
      `${apiURL}/servicios/${planId}`,
      {
        velocidadBajada: plan.velocidadBajada,
        velocidadSubida: plan.velocidadSubida,
        costoConexion: plan.costoConexion,
        abono: plan.abono,
        nombre: plan.nombre,
        userId: userId
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log("Respuesta de la API:", response.data);

  } catch (error) {
    console.error('Error al asignar el plan:', error);
    throw error;
  }
};