'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import requestPost from '@/shared/api/request-post';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/shared/ui/button';
import paymentRequest from '../api/paymentRequest';

export default function SuccessPage({
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
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    const chatMeta = sessionStorage.getItem('chatMeta');
    const { vendorId, consumerId, vendorName, consumerName } = JSON.parse(
      chatMeta || '{}',
    );
    const fetchData = async () => {
      try {
        const res = await paymentRequest({
          paymentKey,
          orderId,
          paymentEventSeq,
          amount,
        });
        await requestPost(
          res.data.orderName,
          amount,
          res.data.category,
          consumerId,
          consumerName,
          consumerId,
          consumerName,
          vendorId,
          vendorName,
          'pay-complete-card',
          uuidv4(),
          orderId,
          paymentEventSeq,
        );
        router.push(`/chat?vendorId=${vendorId}&consumerId=${consumerId}`);
      } catch (error: any) {
        setIsSuccess(false);
      }
    };

    fetchData();
  }, []);

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
