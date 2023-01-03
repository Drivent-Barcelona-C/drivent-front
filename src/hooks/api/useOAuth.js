import useAsync from '../useAsync';

import * as OAuth from '../../services/oauthApi';

export default function useOAuth() {
  const {
    loading: singInOAuthLoading,
    error: singInOAuthError,
    act: singInOAuth
  } = useAsync(OAuth.singInOAuth, false);

  return {
    singInOAuthLoading,
    singInOAuthError,
    singInOAuth
  };
}
