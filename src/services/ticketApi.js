import api from './api';

export async function getTicketTypes(token) {
  const response = await api.get('/tickets/types', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export async function postTicketTypes(token, body) {
  const response = await api.post('/tickets', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
