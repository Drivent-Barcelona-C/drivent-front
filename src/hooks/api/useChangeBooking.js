import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export default function useChangeBooking() {
  const token = useToken();

  const {
    data: booking,
    loading: bookingLoading,
    error: bookingError,
    act: putBooking,
  } = useAsync((data) => bookingApi.putBooking(data, token), false);

  return {
    booking,
    bookingLoading,
    bookingError,
    putBooking,
  };
}
