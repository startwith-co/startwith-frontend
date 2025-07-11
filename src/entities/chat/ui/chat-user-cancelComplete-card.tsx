import Solu from '@/shared/ui/solu';

interface ChatVendorCancelCompleteCardProps {
  solutionName: string;
  solutionCategory: string;
  solutionPrice: number;
}

const formatPrice = (num: number) => {
  return `${num.toLocaleString('ko-KR')}(VAT 별도)`;
};

function ChatUserCancelCompleteCard({
  solutionName,
  solutionCategory,
  solutionPrice,
}: ChatVendorCancelCompleteCardProps) {
  return (
    <div className="h-auto w-[300px] rounded-xl bg-[#F5F5F5] p-4 shadow-md">
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
          <span>{solutionCategory}</span>
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
