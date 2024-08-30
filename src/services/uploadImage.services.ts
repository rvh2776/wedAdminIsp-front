import axios from "axios";
const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const fetchImageUpload = async (userId: string, token: string, selectedFile: File) => {
    const formData = new FormData();
    formData.append('image', selectedFile);

  try {
    const response = await axios.post(`${apiURL}/users/uploadImage/${userId}`, formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });

  if (response.status === 201) return response.data.imgUrl;
    else throw new Error (response?.data?.error || 'Error desconocido en la respuesta'); 

  } catch (error) {
    console.error('Error en la carga de imagen:', error);
    throw new Error('Error desconocido en la carga de imagen');
  }
};

