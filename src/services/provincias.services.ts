import axios from 'axios';
const apiURL = process.env.NEXT_PUBLIC_API_URL;

interface Localidad {
    id: string;
    nombre: string;
  }
  
  interface Provincia {
    id: string;
    nombre: string;
    localidades: Localidad[];
  }
  
export async function fetchProvincias(): Promise<Provincia[]> {
  try {
    const response = await axios.get<Provincia[]>(`${apiURL}/provincias`);
   
    return response.data;
  } catch (error) {
    console.error('Error al obtener las provincias:', error);
    if (axios.isAxiosError(error)) {
      console.error('Error al obtener las provincias:', error.message);
    } else {
      console.error('Error inesperado:', error);
    }
    return [];
  }
}

  