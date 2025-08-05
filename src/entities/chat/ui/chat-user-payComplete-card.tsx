import Solu from '@/shared/ui/solu';
import { Button } from '@/shared/ui/button';
import React, { useState } from 'react';
import { useSolution } from '@/shared/model/SolutionProvider';
import { categoryToKo } from '@/shared/model/categoryMap';
import ChatUserCancelModal from './chat-user-cancel-modal';

interface ChatCompleteCardProps {
  solutionName: string;
  solutionCategory: string;
  solutionPrice: number;
}

const formatPrice = (num: number) => {
  return `${num.toLocaleString('ko-KR')}(VAT 포함)`;
};

function ChatUserPayCompleteCard({
  solutionName,
  solutionCategory,
  solutionPrice,
}: ChatCompleteCardProps) {
  const [open, setOpen] = useState(false);
  const { setSolution } = useSolution();
  return (
    <div className="w-[360px] space-y-4 rounded-xl border bg-[#F5F5F5] p-6">
      <div className="flex items-center justify-center gap-2 font-bold">
        <Solu /> 결제 완료
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="font-bold">계약명(솔루션명)</span>
          <span>{solutionName}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">솔루션 카테고리</span>
          <span>{categoryToKo[solutionCategory]}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">결제 금액</span>
          <span className="text-base font-bold">
            {formatPrice(solutionPrice)}
          </span>
        </div>
        <p className="text-xs leading-5 text-[#7A7A7A]">
          결제일로부터 24시간 이내에 결제 취소 및 전액 환불이 가능합니다.
          <br />
          <br />
          단, 24시간 경과 후 발생하는 환불 요청에 대해서는 계약 당사자 간의 개별
          협의에 따라 처리되며,
          <b className="font-bold">
            {' '}
            SOLU는 해당 환불 절차 및 결과에 대하여 일체 관여하지 않습니다.
          </b>
        </p>

        <p className="text-xs leading-5 text-[#7A7A7A]">
          <b className="font-bold">결제 수단에 따른 구매 확정 시점</b>은 다음과
          같습니다.
          <br />
          • 무통장 입금 : 결제 완료와 동시에 구매가 확정됩니다.
          <br />• 신용카드 결제 : 결제일 기준 7일 후 자동으로 구매가 확정됩니다.
        </p>

        <p className="text-xs leading-5 text-[#7A7A7A]">
          구매 확정 이후 제기되는 환불 요청 또한 계약 당사자 간 협의에 따라 개별
          처리되며,
          <b className="font-bold">
            {' '}
            SOLU는 이와 관련한 책임 또는 개입 의무를 지지 않습니다.
          </b>
        </p>
      </div>

      <Button
        asChild={false}
        onClick={() => {
          setOpen(true);
          setSolution({
            solutionName,
            solutionCategory,
            solutionPrice,
          });
        }}
        variant="bgBlueGradient"
        className="mt-4 h-[40px] w-full text-sm text-white"
      >
        결제 취소하기
      </Button>

      <ChatUserCancelModal open={open} setOpen={setOpen} />
    </div>
  );
}

export default ChatUserPayCompleteCard;
