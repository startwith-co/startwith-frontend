import { Avatar, AvatarImage } from '@/shared/ui/avatar';

export default function OrderDetailsWidget({
  paymentEventName,
  category,
  amount,
}: {
  paymentEventName: string;
  category: string;
  amount: number;
}) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-lg font-semibold">주문 내역</h2>
      <div className="flex w-full flex-col rounded-md bg-white p-6 shadow-md">
        <div className="flex gap-8">
          <div className="h-40 w-2xs rounded-md bg-gray-300" />
          <div className="flex flex-col justify-between gap-3">
            <div>
              <span className="font-semibold">{paymentEventName}</span>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
                <span className="text-[rgba(167,167,167,1)]">더비즈온</span>
              </div>
            </div>
            <div className="flex w-[250px] flex-col">
              <div className="flex justify-between">
                <span className="text-[#7A7A7A]">솔루션 카테고리</span>
                <span>{category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A7A7A]">가격</span>
                <span>{amount}원(VAT제외)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
