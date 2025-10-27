import Solu from '@/shared/ui/solu';
import cn from '@/shared/lib/utils';
import { solutionCategoryToLabel } from '@/shared/model/getCategoryList';

interface ChatVendorCancelCompleteCardProps {
  solutionName: string;
  solutionCategory: string;
  solutionPrice: number;
  isMine: boolean;
}

const formatPrice = (num: number) => {
  return `${num.toLocaleString('ko-KR')}(VAT 별도)`;
};

function ChatUserCancelCompleteCard({
  solutionName,
  solutionCategory,
  solutionPrice,
  isMine,
}: ChatVendorCancelCompleteCardProps) {
  return (
    <div
      className={cn(
        'h-auto w-[300px] rounded-xl p-4 shadow-md',
        isMine ? 'bg-[#DBE8FF]' : 'bg-[#F1F1F1]',
      )}
    >
      <div className="mb-3 text-center text-lg font-bold">
        <Solu /> 결제 취소 완료
      </div>
      <div className="space-y-2 text-sm text-black">
        <div className="flex justify-between">
          <span className="font-bold">계약명(솔루션명)</span>
          <span>{solutionName}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">솔루션 카테고리</span>
          <span>{solutionCategoryToLabel[solutionCategory]}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">결제 금액</span>
          <span>{formatPrice(solutionPrice)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">환불 금액</span>
          <span className="font-bold">{formatPrice(solutionPrice)}</span>
        </div>
      </div>
    </div>
  );
}

export default ChatUserCancelCompleteCard;
