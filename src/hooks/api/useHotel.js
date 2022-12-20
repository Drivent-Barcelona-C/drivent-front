import useAsync from '../useAsync';
import useToken from '../useToken';

import * as hotelApi from '../../services/hotelApi';

export default function useHotel() {
  const token = useToken();

  const {
    data: hotels,
    loading: hotelsLoading,
    error: hotelsError,
    act: getHotel,
  } = useAsync(() => hotelApi.getHotel(token), false);

  return {
    hotels,
    hotelsLoading,
    hotelsError,
    getHotel
  };
}
