import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL

const changePasswordService = async (oldPassword: string, newPassword: string, token: string) => {
  try {
    const response = await axios.post(
      `${apiUrl}/auths/change-password`,
      {
        oldPassword,
        newPassword,
        confirmNewPassword: newPassword, // Enviar confirmNewPassword como nuevo password
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Si el error es de Axios, puedes acceder a error.response
      throw new Error(error.response?.data?.message || 'Error changing password');
    } else {
      // Si no es un error de Axios, maneja el error genérico
      throw new Error('An unknown error occurred');
    }
  }
};

export default changePasswordService;
