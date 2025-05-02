import ComboboxDemo from '@/features/use-coupon/combobox';
import { Button } from '@/shared/ui/button';
import Input from '@/shared/ui/input';

export default function CouponPointWidget() {
  return (
    <div className="grid grid-cols-[2fr_1fr] gap-8">
      <div className="flex flex-col gap-5">
        <h2 className="text-lg font-semibold">SOLU 포인트/쿠폰</h2>
        <div className="flex w-full flex-col gap-3.5 rounded-md bg-white p-6 shadow-md">
          <div className="grid grid-cols-[120px_347px] items-center">
            <span>사용 가능한 쿠폰</span>
            <ComboboxDemo />
          </div>
          <div className="grid grid-cols-[120px_347px] items-center">
            <span>포인트 사용</span>
            <div className="flex w-full items-center justify-between">
              <Input
                type="number"
                className="w-[266px]"
                placeholder="250,000P"
              />
              <Button asChild={false} className="h-9">
                사용
              </Button>
            </div>
            <p className="col-start-2 mt-2.5 text-sm font-light text-[rgba(122,122,122,1)]">
              사용가능한 포인트: 250,000P
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
