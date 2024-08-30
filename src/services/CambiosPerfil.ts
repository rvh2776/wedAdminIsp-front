import axios from 'axios';
const apiURL = process.env.NEXT_PUBLIC_API_URL;
export const updateUserProfile = async (userId: string, data: any, token: string) => {
  try {
    const response = await axios.put(
      `$${apiURL}/users/${userId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el perfil del usuario:", error);
    throw error;
  }
};

export const getProfileChangeRequests = async (token: string, userId: string) => {
  try {
    const response = await axios.get(
      `$${apiURL}/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener las solicitudes de cambio de perfil:", error);
    throw error;
  }
};
