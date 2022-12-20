import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentApi from '../../services/paymentApi';

export default function useProcessPayment() {
  const token = useToken();

  const {
    data: paymentData,
    loading: paymentLoading,
    error: paymentError,
    act: postPayment,
  } = useAsync((data) => paymentApi.postPayment(token, data), false);

  return {
    paymentData,
    paymentLoading,
    paymentError,
    postPayment,
  };
}
