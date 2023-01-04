import useAsync from '../useAsync';

import * as authApi from '../../services/authApi';

export default function useOAuth() {
  const { loading: OAuthLoading, error: OAuthError, act: OAuth } = useAsync(authApi.OAuth, false);

  return {
    OAuthLoading,
    OAuthError,
    OAuth,
  };
}
