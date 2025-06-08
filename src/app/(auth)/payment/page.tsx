import PaymentPage from '@/pages/payment/ui/payment-page';
import getPaymentInfo from '@/pages/payment/api/getPaymentInfo';

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { vendorSeq, consumerSeq } = await searchParams;
  const paymentInfo = await getPaymentInfo({
    vendorSeq: vendorSeq as string,
    consumerSeq: consumerSeq as string,
  });

  return <PaymentPage paymentInfo={paymentInfo[0]} />;
}
