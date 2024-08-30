// services/roomService.ts
import axios from 'axios';
const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const getPendingRooms = async (token: string) => {
  try {
    const response = await axios.get(`${apiURL}/chat/pending-rooms`, { 
        headers:  {
        Authorization: `Bearer ${token}`, 
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching pending rooms:', error);
    return [];
  }
};
