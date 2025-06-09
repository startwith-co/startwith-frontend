import paymentRequest from '../api/paymentRequest';

export default async function SuccessPage({
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
  const response = await paymentRequest({
    paymentKey,
    orderId,
    paymentEventSeq,
    amount,
  });
  console.log(response);

  return <div>success</div>;
}
