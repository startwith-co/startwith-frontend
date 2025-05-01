import { Avatar, AvatarImage } from '@/shared/ui/avatar';
import OrderDetailsTable from '@/entities/payment/ui/order-details-table';

export default function OrderDetailsWidget() {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-lg font-semibold">주문 내역</h2>
      <div className="flex w-full flex-1 flex-col rounded-md bg-white p-6 shadow-md">
        <div className="mb-8 flex gap-8">
          <div className="h-40 w-2xs rounded-md bg-gray-300" />
          <div className="flex flex-col gap-3">
            <span className="font-semibold">
              더비즈온 중견기업 전용 ERP 구축
            </span>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
              <span className="text-[rgba(167,167,167,1)]">더비즈온</span>
            </div>
          </div>
        </div>
        <OrderDetailsTable />
      </div>
    </div>
  );
}
