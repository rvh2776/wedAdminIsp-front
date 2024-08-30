import { useAuth } from "@/context/AuthContext";
import { ILoginProps } from "@/types/login.types";
import CrearUsuarioRequest from "@/types/user.types";
import axios from "axios";

export const apiURL = process.env.NEXT_PUBLIC_API_URL;
export const pathAuth0: string = `/users/auth0/callback`

export async function loginSesion(data: ILoginProps) {
    try { 
        console.log("formData", JSON.stringify(data));	
        const res = await fetch(`${apiURL}/auths/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
            body: JSON.stringify(data),
            });
        const user = await res.json()
        if (res.status === 200) return user;
        else throw new Error (user?.message);      
    }
    catch (error: any){
        throw new Error (error)
    }
}

export async function loginSesionGoogle() {
  try { 
      const res = await fetch(`${apiURL}/users/auth0/callback`, {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
            },
          });
      const user = await res.json()
      if (res.ok) return user;
      else throw new Error (user?.message);      
  }
  catch (error: any){
      throw new Error (error)
  }
}

export async function loginUser(id: string|null, token: string|null) {
    try { 
        const res = await fetch(`${apiURL}/users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            });
        const user = await res.json()
        if (res.status === 200) return user;
        else throw new Error (user?.message);    
    }
    catch (error: any){
        throw new Error (error)
    }
}

export const getUserById = async (userId: string, token: string) => {
  try {
    const response = await axios.get(`${apiURL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error en la solicitud Axios:", error.message);
      throw new Error(error.response?.data?.message || "Error al obtener los datos del usuario");
    } else {
      console.error("Error desconocido:", error);
      throw new Error("Error desconocido al obtener los datos del usuario");
    }
  }
};

export const deleteUserById = async (userId: string, token: string) => {
  try {
    const response = await axios.delete(`${apiURL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Puedes ajustar esto según la respuesta de tu API
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error en la solicitud Axios:", error.message);
      throw new Error(error.response?.data?.message || "Error al eliminar el usuario");
    } else {
      console.error("Error desconocido:", error);
      throw new Error("Error desconocido al eliminar el usuario");
    }
  }
};

export const crearUsuario = async (userPayload: any, token: string) => {
  try {
    const response = await axios.post(
      `${apiURL}/auths/signup`,
      userPayload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error en la creación del usuario:", error.response?.data || error.message);
    } else {
      console.error("Error inesperado:", error);
    }
    throw error;
  }
};


