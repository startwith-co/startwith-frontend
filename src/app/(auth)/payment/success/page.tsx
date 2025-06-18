import SuccessPage from '@/views/payment/ui/payment-success-page';
import { redirect } from 'next/navigation';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { paymentKey, orderId, paymentEventSeq, amount } = await searchParams;
  if (!paymentKey || !orderId || !paymentEventSeq || !amount) {
    return redirect('/');
  }

  return (
    <SuccessPage
      paymentKey={paymentKey as string}
      orderId={orderId as string}
      paymentEventSeq={paymentEventSeq as string}
      amount={amount as string}
    />
  );
}
