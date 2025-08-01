'use client';

import Solu from '@/shared/ui/solu';
import { Button } from '@/shared/ui/button';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import formatVATPrice from '@/shared/lib/formatVATPrice';
import { categoryToKo } from '@/shared/model/categoryMap';
import CircleCheckbox from './circle-check-box';
import usePaymentRequest from '../model/usePaymentRequest';
import getPaymentRequest from '../api/getPaymentRequest';

interface ChatRequestCardProps {
  uuid: string;
}

function ChatUserRequestCard({ uuid }: ChatRequestCardProps) {
  const [checked, setChecked] = useState(false);
  const [fileChecked, setFileChecked] = useState({
    first: false,
    second: false,
  });
  const router = useRouter();
  const paymentRequestData = usePaymentRequest(uuid);

  const handleFileClick = async (type: 'contract' | 'refund') => {
    try {
      const data = await getPaymentRequest({
        paymentUniqueType: uuid,
      });
      if (type === 'contract') {
        window.open(data?.contractConfirmationUrl, '_blank');
      }
      if (type === 'refund') {
        window.open(data?.refundPolicyUrl, '_blank');
      }
      setFileChecked((prev) => ({
        ...prev,
        [type === 'contract' ? 'first' : 'second']: true,
      }));
    } catch (err) {
      console.error('파일 링크를 가져오는 데 실패했습니다.', err);
    }
  };

  return (
    <div className="flex w-[360px] flex-col items-center justify-center space-y-4 rounded-xl border bg-[#F5F5F5] p-6 shadow-md">
      <span className="flex items-center gap-1 font-bold">
        <Solu /> 결제 요청
      </span>

      <div className="w-full space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="font-semibold">계약명(솔루션명)</span>
          <span>{paymentRequestData?.paymentEventName}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">솔루션 카테고리</span>
          <span>
            {paymentRequestData?.category &&
              categoryToKo[paymentRequestData.category]}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">결제 요청 금액</span>
          <span className="text-lg font-bold">
            {formatVATPrice(paymentRequestData?.amount ?? 0)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-semibold">계약 확인서</span>
          <Button
            asChild={false}
            variant="textBlue"
            className={`h-auto w-[180px] text-sm shadow-md ${
              fileChecked.first ? 'bg-[#5B76FF] text-white' : ''
            }`}
            onClick={() => handleFileClick('contract')}
          >
            PDF 파일 확인 완료
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-semibold">환불 정책</span>
          <Button
            asChild={false}
            variant="textBlue"
            className={`h-auto w-[180px] text-sm shadow-md ${
              fileChecked.second ? 'bg-[#5B76FF] text-white' : ''
            }`}
            onClick={() => handleFileClick('refund')}
          >
            PDF 파일 확인 완료
          </Button>
        </div>

        <CircleCheckbox checked={checked} onCheckedChange={setChecked} />
      </div>

      <Button
        disabled={
          !checked ||
          !!paymentRequestData?.orderId ||
          !fileChecked.first ||
          !fileChecked.second
        }
        asChild={false}
        variant="bgBlueGradient"
        className="mt-3 h-[45px] w-full font-bold text-white"
        onClick={() => {
          if (paymentRequestData?.orderId) return;
          router.push(
            `/payment?paymentEventSeq=${paymentRequestData?.paymentEventSeq}`,
          );
        }}
      >
        {paymentRequestData?.orderId ? '결제 완료' : '결제하기'}
      </Button>
    </div>
  );
}

export default ChatUserRequestCard;
