import { ApiResponse } from '@/shared/model/apiType';
import api from '@/shared/api/client-api';
import { PaymentSuccessProps } from '../model/type';

export default async function paymentRequest({
  paymentKey,
  orderId,
  paymentEventSeq,
  amount,
}: {
  paymentKey: string;
  orderId: string;
  paymentEventSeq: string;
  amount: string;
}) {
  const response = await api
    .post<ApiResponse<PaymentSuccessProps>>(`api/payment-service/payment`, {
      json: {
        paymentEventSeq: Number(paymentEventSeq),
        paymentKey,
        orderId,
        amount: Number(amount),
      },
    })
    .json();

  return response;
}
