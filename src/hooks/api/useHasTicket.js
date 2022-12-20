import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentApi from '../../services/paymentApi';

export default function useHasTicket() {
  const token = useToken();
  const {
    data: ticket,
    loading: ticketLoading,
    error: ticketError,
    act: getTicket,
  } = useAsync(() => paymentApi.getUserTicket(token));

  return {
    ticket,
    ticketLoading,
    ticketError,
    getTicket,
  };
}
