import serverApi from '@/shared/api/server-api';

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
  const response = await serverApi
    .post(`api/payment-service/payment`, {
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
