import serverApi from '@/shared/api/server-api';
import { ApiResponse } from '@/shared/model/apiType';
import PaymentInfoProps from '../model/type';

export default async function getPaymentInfo({
  paymentEventSeq,
}: {
  paymentEventSeq: string;
}) {
  const response = await serverApi
    .get<
      ApiResponse<PaymentInfoProps>
    >(`api/payment-service/payment-event/order?paymentEventSeq=${paymentEventSeq}`)
    .json();

  return response.data;
}
