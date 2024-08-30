import { RelevamientoData } from "@/types/relevamiento.types";
import axios from "axios";
const apiURL = process.env.NEXT_PUBLIC_API_URL;


  export const fetchAllUsers = async (token: string) => {
    try {
      const response = await axios.get(`${apiURL}/users?page=${1}&limit=${99}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error al obtener los datos del endpoint', error);
      throw error;
    }
  };

