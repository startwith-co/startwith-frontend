import PaymentPage from '@/pages/payment/ui/payment-page';
import getPaymentInfo from '@/pages/payment/api/getPaymentInfo';

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { paymentEventSeq } = await searchParams;
  const paymentInfo = await getPaymentInfo({
    paymentEventSeq: paymentEventSeq as string,
  });

  return <PaymentPage paymentInfo={paymentInfo} />;
}
