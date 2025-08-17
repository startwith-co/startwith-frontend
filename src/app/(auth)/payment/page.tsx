import PaymentPage from '@/views/payment/ui/payment-page';
import getPaymentInfo from '@/views/payment/api/getPaymentInfo';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { paymentEventSeq, vendorSeq } = await searchParams;
  const session = await auth();
  const paymentInfo = await getPaymentInfo({
    paymentEventSeq: paymentEventSeq as string,
  });

  // if (
  //   !session?.consumerSeq ||
  //   session?.consumerSeq !== paymentInfo.consumerSeq
  // ) {
  //   return redirect('/');
  // }

  return (
    <PaymentPage paymentInfo={paymentInfo} vendorSeq={vendorSeq as string} />
  );
}
