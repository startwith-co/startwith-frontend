import formatVATPrice from '@/shared/lib/formatVATPrice';
import Solu from '@/shared/ui/solu';
import cn from '@/shared/lib/utils';
import { categoryToKo } from '@/shared/model/categoryMap';

interface ChatUserCancelRequestCardProps {
  solutionName: string;
  solutionCategory: string;
  solutionPrice: number;
  isMine: boolean;
}

function ChatUserCancelRequestCard({
  solutionName,
  solutionCategory,
  solutionPrice,
  isMine,
}: ChatUserCancelRequestCardProps) {
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
          <span>{categoryToKo[solutionCategory]}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">결제 금액</span>
          <span>{formatVATPrice(solutionPrice)}</span>
        </div>
      </div>
    </div>
  );
}

export default ChatUserCancelRequestCard;
