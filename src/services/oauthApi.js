import api from './api';

export async function singInOAuth({ code }) {
  const response = {
    data: {
      token: '123'
    }
  }; /* back end deve retornar objeto neste formato,
descomentar linha 10, em seguida deletar linhas 4 até 9 */
  //const response = await api.post('/oauth/github/login', { code });
  return response.data;
}
//
