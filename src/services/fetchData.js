import axios from 'axios';

export const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/todos`);
    if (response.status === 200) {
      return response.data.slice(0, 10);
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};
