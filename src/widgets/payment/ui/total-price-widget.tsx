import { Button } from '@/shared/ui/button';

export default function TotalPriceWidget() {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-lg font-semibold">총 결제 금액</h2>
      <div className="flex w-full flex-1 flex-col justify-between gap-8 rounded-md bg-white p-6 shadow-md">
        <ul className="flex w-full flex-col gap-6 *:flex *:flex-1 *:flex-row *:items-center *:justify-between">
          <li>
            <span>주문 금액</span>
            <span>10,000원</span>
          </li>
          <li>
            <span>부가세</span>
            <span>10,000원</span>
          </li>
          <li>
            <span>할인 금액</span>
            <span>10,000원</span>
          </li>
          <li>
            <span>SOLU 포인트</span>
            <span>0원</span>
          </li>
        </ul>
        <div className="flex flex-col gap-5">
          <div className="text-primary flex items-center justify-between font-bold">
            <span>총 결제 금액</span>
            <span>10,000원</span>
          </div>
          <Button asChild={false} className="h-12 w-full">
            결제하기
          </Button>
        </div>
      </div>
    </div>
  );
}
