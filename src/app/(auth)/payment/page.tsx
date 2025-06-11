import PaymentPage from '@/views/payment/ui/payment-page';
import getPaymentInfo from '@/views/payment/api/getPaymentInfo';

export const dynamic = 'force-dynamic';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { paymentEventSeq } = await searchParams;
  const paymentInfo = await getPaymentInfo({
    paymentEventSeq: paymentEventSeq as string,
  });

  return <PaymentPage paymentInfo={paymentInfo} />;
}
