import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketApi from '../../services/ticketApi';

export default function useProcessReservation() {
  const token = useToken();

  const {
    data: reservationData,
    loading: reservationLoading,
    error: reservationError,
    act: postReservation,
  } = useAsync((data) => ticketApi.postTicketTypes(token, data), false);

  return {
    reservationData,
    reservationLoading,
    reservationError,
    postReservation,
  };
};
