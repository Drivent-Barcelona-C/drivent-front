import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketApi from '../../services/ticketApi';

export default function useTicketTypes() {
  const token = useToken();
  const {
    data: ticketType,
    finish: ticketTypeFinish,
    loading: ticketTypeLoading,
    error: ticketTypeError,
    act: getTicketType,
  } = useAsync(() => ticketApi.getTicketTypes(token));

  return {
    ticketType,
    ticketTypeFinish,
    ticketTypeLoading,
    ticketTypeError,
    getTicketType,
  };
}
