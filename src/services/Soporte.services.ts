import axios from "axios";
const apiURL = process.env.NEXT_PUBLIC_API_URL;

// Esta es la función que realiza la solicitud POST a la API
export const sendAssistanceRequest = async (
  token: string,       // El token de autenticación
  userId: string,      // El ID del usuario
  data: {              // Los datos que se enviarán en el cuerpo de la solicitud
    diaCliente: string;
    horarios: string;
    problema: string;
    observaciones: string;
  }
) => {
  try {
    // Realiza la solicitud POST a la API
    const response = await axios.post(
      `${apiURL}/asistencias`, // La URL de la API
      {
        userId,       // Incluye el userId en el cuerpo de la solicitud
        ...data,      // Incluye el resto de los datos (diaCliente, horarios, problema, observaciones)
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Añade el token de autenticación en el encabezado
        },
      }
    );
    
    // Devuelve la respuesta de la API
    return response.data;
  } catch (error) {
    // Manejo de errores
    console.error("Error al enviar la solicitud de asistencia:", error);
    throw error; // Lanza el error para que pueda ser manejado por la función que llamó a esta
  }
};






export const fetchAsistencias = async (token: string, page: number = 1, limit: number = 99) => {
  try {
    const response = await axios.get(`${apiURL}/asistencias`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener las asistencias:', error);
    throw error;
  }
};


export const deleteAsistencia = async (id: string, token: string) => {
  try {
    await axios.delete(`${apiURL}/asistencias/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error en la solicitud Axios:", error.message);
      throw new Error(error.response?.data?.message || "Error al borrar la asistencia");
    } else {
      console.error("Error desconocido:", error);
      throw new Error("Error desconocido al borrar la asistencia");
    }
  }
};