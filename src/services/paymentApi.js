import api from './api';

export async function getUserTicket(token) {
  const response = await api.get('/tickets', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function postPayment(token, body) {
  const response = await api.post('/payments/process', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
