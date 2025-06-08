import Solu from '@/shared/ui/solu';
import { Button } from '@/shared/ui/button';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useChatMeta } from '@/shared/model/ChatMetaProvider';
import CircleCheckbox from './circle-check-box';

interface ChatRequestCardProps {
  solutionName: string;
  solutionCategory: string;
  solutionPrice: number;
}

const formatPrice = (num: number) => {
  return `${num.toLocaleString('ko-KR')}원(VAT 별도)`;
};

function ChatUserRequestCard({
  solutionName,
  solutionCategory,
  solutionPrice,
}: ChatRequestCardProps) {
  const [checked, setChecked] = useState(false);
  const { consumerSeq, vendorSeq } = useChatMeta();
  const router = useRouter();

  return (
    <div className="flex w-[360px] flex-col items-center justify-center space-y-4 rounded-xl border bg-[#F5F5F5] p-6 shadow-md">
      <span className="flex items-center gap-1 font-bold">
        <Solu /> 결제 요청
      </span>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="font-semibold">계약명(솔루션명)</span>
          <span>{solutionName}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">솔루션 카테고리</span>
          <span>{solutionCategory}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">결제 요청 금액</span>
          <span className="text-lg font-bold">
            {formatPrice(solutionPrice)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold">계약 확인서</span>
          <Button
            variant="textBlue"
            className="h-auto w-[180px] text-sm shadow-md"
            asChild={false}
          >
            PDF 파일 확인 완료
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold">환불 정책</span>
          <Button
            variant="textBlue"
            className="h-auto w-[180px] text-sm shadow-md"
            asChild={false}
          >
            PDF 파일 확인 완료
          </Button>
        </div>
        <CircleCheckbox checked={checked} onCheckedChange={setChecked} />
      </div>
      <Button
        disabled={!checked}
        asChild={false}
        variant="bgBlueGradient"
        className="mt-3 h-[45px] w-full font-bold text-white"
        onClick={() =>
          router.push(
            `/payment?consumerSeq=${consumerSeq}&vendorSeq=${vendorSeq}`,
          )
        }
      >
        결제하기
      </Button>
    </div>
  );
}

export default ChatUserRequestCard;
