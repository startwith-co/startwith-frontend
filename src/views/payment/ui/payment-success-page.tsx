'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import requestPost from '@/shared/api/request-post';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
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
        );
        router.push(`/chat?vendorId=${vendorId}&consumerId=${consumerId}`);
      } catch (error: any) {
        if (error.name === 'HTTPError') {
          const errorData = await error.response.json();
          toast.error(errorData.message || '오류가 발생했습니다.');
        } else {
          toast.error(error.message || '알 수 없는 오류가 발생했습니다.');
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <p className="text-xl font-semibold">결제 진행중입니다...</p>
      <div className="mt-4 h-10 w-10 animate-spin rounded-full border-t-2 border-b-2 border-blue-500" />
    </div>
  );
}
