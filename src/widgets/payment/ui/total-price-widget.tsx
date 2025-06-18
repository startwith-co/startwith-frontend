import { Button } from '@/shared/ui/button';
import Link from 'next/link';

export default function TotalPriceWidget({
  totalPrice,
  actualAmount,
  tax,
}: {
  totalPrice: number;
  actualAmount: number;
  tax: number;
}) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-lg font-semibold">총 결제 금액</h2>
      <div className="flex w-full flex-1 flex-col gap-5 rounded-md bg-white p-6 shadow-md">
        <ul className="flex w-full flex-col *:flex *:flex-1 *:flex-row *:items-center *:justify-between">
          <li>
            <span>주문 금액</span>
            <span>{totalPrice}원</span>
          </li>
          <li>
            <span>부가세(10%)</span>
            <span>{tax}원</span>
          </li>
        </ul>
        <div className="flex flex-col gap-5">
          <div className="text-primary flex items-center justify-between font-bold">
            <span>총 결제 금액</span>
            <span>{actualAmount}원</span>
          </div>
          <Link href="#pay">
            <Button asChild={false} className="h-12 w-full">
              결제하기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
