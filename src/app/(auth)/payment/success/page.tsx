import SuccessPage from '@/pages/payment/ui/payment-success-page';

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { paymentKey, orderId, paymentEventSeq, amount } = await searchParams;

  return (
    <SuccessPage
      paymentKey={paymentKey as string}
      orderId={orderId as string}
      paymentEventSeq={paymentEventSeq as string}
      amount={amount as string}
    />
  );
}
