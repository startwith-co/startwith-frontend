import { Button } from '@/shared/ui/button';
import Solu from '@/shared/ui/solu';
import { useState, useEffect } from 'react';
import cn from '@/shared/lib/utils';
import { useSolution } from '@/shared/model/SolutionProvider';
import { Timestamp } from 'firebase/firestore';
import formatVATPrice from '@/shared/lib/formatVATPrice';
import ChatVendorCancelModal from './chat-vendor-cancel-modal';

interface ChatVendorCancelRequestCardProps {
  solutionName: string;
  solutionCategory: string;
  solutionPrice: number;
  createdAt: Timestamp;
  isMine: boolean;
}

function ChatVendorCancelRequestCard({
  solutionName,
  solutionCategory,
  solutionPrice,
  createdAt,
  isMine,
}: ChatVendorCancelRequestCardProps) {
  const [open, setOpen] = useState(false);
  const { setSolution } = useSolution();

  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const now = Date.now();
    const created = createdAt.toDate().getTime();
    const diff = now - created;

    if (diff > 86400000) {
      setIsExpired(true);
    }
  }, [createdAt]);

  return (
    <div
      className={cn(
        'h-auto w-[300px] rounded-xl p-4 shadow-md',
        isMine ? 'bg-[#DBE8FF]' : 'bg-[#F1F1F1]',
      )}
    >
      <div className="mb-3 text-center text-lg font-bold">
        <Solu /> 결제 취소 요청
      </div>
      <div className="space-y-2 text-sm text-black">
        <div className="flex justify-between">
          <span className="font-bold">계약명(솔루션명)</span>
          <span>{solutionName}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">솔루션 카테고리</span>
          <span>{solutionCategory}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">결제 금액</span>
          <span>{formatVATPrice(solutionPrice)}</span>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button
          asChild={false}
          variant="bgBlueGradient"
          className="h-[44px] w-full font-bold text-white"
          onClick={() => {
            setOpen(true);
            setSolution({ solutionName, solutionCategory, solutionPrice });
          }}
          disabled={isExpired}
        >
          {isExpired ? '취소 불가 (24시간 초과)' : '결제 취소하기'}
        </Button>
      </div>
      <ChatVendorCancelModal open={open} setOpen={setOpen} />
    </div>
  );
}

export default ChatVendorCancelRequestCard;
