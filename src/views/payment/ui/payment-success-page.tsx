'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import requestPost from '@/shared/api/request-post';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/shared/ui/button';
import useCurrentSession from '@/shared/model/useCurrentSession';
import paymentRequest from '../api/paymentRequest';
import { PaymentSuccessProps } from '../model/type';

export default function SuccessPage({
  paymentKey,
  orderId,
  paymentEventSeq,
  amount,
  vendorSeq,
}: {
  paymentKey: string;
  orderId: string;
  paymentEventSeq: string;
  amount: string;
  vendorSeq: string;
}) {
  const router = useRouter();
  const { session } = useCurrentSession();

  const [isSuccess, setIsSuccess] = useState(true);
  const [paymentData, setPaymentData] = useState<PaymentSuccessProps>();

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const res = await paymentRequest({
          paymentKey,
          orderId,
          paymentEventSeq,
          amount,
        });
        setPaymentData(res.data);
      } catch (error) {
        setIsSuccess(false);
      }
    };

    fetchPayment();
  }, [paymentKey, orderId, paymentEventSeq, amount]);

  useEffect(() => {
    if (!session || !paymentData) return;

    const chatMeta = sessionStorage.getItem('chatMeta');
    const { vendorId, consumerId, vendorName, consumerName } = JSON.parse(
      chatMeta || '{}',
    );

    const sendRequestPost = async () => {
      try {
        await requestPost({
          type: 'pay-complete-card',
          uuid: uuidv4(),
          solutionInfo: {
            name: paymentData.orderName,
            price: amount,
            category: paymentData.category,
          },
          messageInfo: {
            id: session.consumerSeq?.toString() || '',
            name: session.consumerSeq ? consumerName : vendorName,
            consumerName,
            vendorName,
            vendorSeq,
            consumerSeq: session.consumerSeq?.toString() || '',
            role: 'consumer',
          },
          orderId,
          paymentEventSeq,
        });

        router.push(`/chat?vendorId=${vendorId}&consumerId=${consumerId}`);
      } catch (error) {
        setIsSuccess(false);
      }
    };

    sendRequestPost();
  }, [
    session,
    paymentData,
    amount,
    orderId,
    paymentEventSeq,
    vendorSeq,
    router,
  ]);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {isSuccess ? (
        <>
          <p className="text-xl font-semibold">결제 진행중입니다...</p>
          <div className="mt-4 h-10 w-10 animate-spin rounded-full border-t-2 border-b-2 border-blue-500" />
        </>
      ) : (
        <>
          <p className="text-xl font-semibold">결제 실패</p>
          <Link href="/" className="mt-4">
            <Button asChild={false}>홈으로 돌아가기</Button>
          </Link>
        </>
      )}
    </div>
  );
}
