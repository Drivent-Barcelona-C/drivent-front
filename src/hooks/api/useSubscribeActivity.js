import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activityApi from '../../services/activityApi';

export default function useSubscribeActivity() {
  const token = useToken();

  const {
    data: activity,
    loading: activityLoading,
    error: activityError,
    act: postActivity,
  } = useAsync((data) => activityApi.postActivity(data, token), false);

  return {
    activity,
    activityLoading,
    activityError,
    postActivity,
  };
}
