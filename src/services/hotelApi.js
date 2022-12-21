import api from './api';

export async function getHotel(token) {
  const response = await api.get('/hotels/resume', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
