import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export default function useCreateBooking() {
  const token = useToken();

  const {
    data: booking,
    loading: bookingLoading,
    error: bookingError,
    act: postBooking,
  } = useAsync((data) => bookingApi.postBooking(data, token), false);

  return {
    booking,
    bookingLoading,
    bookingError,
    postBooking,
  };
}
