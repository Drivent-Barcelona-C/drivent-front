import api from './api';
import useToken from '../hooks/useToken';

export async function getTicket() {
  const token = useToken();
  const response = await api.get('/tickets', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
//
