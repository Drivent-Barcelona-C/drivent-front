import { useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import qs from 'query-string';

import UserContext from '../../contexts/UserContext';

import useOAuth from '../../hooks/api/useOAuth';

export default async function submitGitHub(event) {
  event.preventDefault();

  const { signInOAuth } = useOAuth();

  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  const GITHUB_URL = 'https://github.com/login/oauth/authorize';

  const params = {
    response_type: 'code',
    scope: 'user public_repo',
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.REDIRECT_URL,
  };

  const queryStrings = qs.stringify(params);
  const authorizationUrl = `${GITHUB_URL}?${queryStrings}`;
  window.location.href = authorizationUrl;

  const { code } = qs.parseUrl(window.location.href).query;
  if (code) {
    try {
      const userData = await signInOAuth({ code });
      //setUserData(userData); descomentar qaundo o retorno tiver o token e dados do usuário
      console.log(userData);
      toast('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      toast('Não foi possível fazer o login!');
      console.log(err);
    }
  }
}
