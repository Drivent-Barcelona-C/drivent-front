import api from './api';

export async function signIn(email, password) {
  const response = await api.post('/auth/sign-in', { email, password });
  return response.data;
}
//

export async function OAuth(token, user) {
  const response = await api.post('/auth/OAuth', { OauthToken: token, dataUser: user });
  return response.data;
}
//
