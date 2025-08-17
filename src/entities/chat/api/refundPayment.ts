import api from '@/shared/api/index-api';

export default async function refundPayment({
  orderId,
  paymentEventSeq,
}: {
  orderId: string;
  paymentEventSeq: string;
}) {
  const res = await api.post('api/payment-service/payment/refund', {
    json: {
      orderId,
      paymentEventSeq,
    },
  });
  return res;
}
