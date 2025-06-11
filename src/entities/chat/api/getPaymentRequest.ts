import api from '@/shared/api/index-api';
import { ApiResponse } from '@/shared/model/apiType';
import PaymentRequestProps from '../model/type';

export default async function getPaymentRequest({
  paymentUniqueType,
}: {
  paymentUniqueType: string;
}) {
  const res = await api
    .get<
      ApiResponse<PaymentRequestProps>
    >(`api/payment-service/payment-event?paymentUniqueType=${paymentUniqueType}`)
    .json();

  return res.data;
}
