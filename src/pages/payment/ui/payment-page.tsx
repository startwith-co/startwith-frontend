import { Avatar, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import ComboboxDemo from '@/features/payment/combobox';
import Input from '@/shared/ui/input';
import Switch from '@/shared/ui/switch';

export default function PaymentPage() {
  return (
    <div className="mt-20 mb-68 flex flex-col gap-12">
      <div className="grid grid-cols-[2fr_1fr] items-stretch gap-8">
        {/* 주문 내역 */}
        <div className="flex flex-col">
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
            <table className="w-full text-left">
              <thead className="border-b border-black">
                <tr className="text-[rgba(167,167,167,1)]">
                  <th className="px-3 py-2">상세 항목</th>
                  <th className="px-3 py-2">작업일</th>
                  <th className="px-3 py-2">가격</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-3 py-2">더비즈온 중견기업 전용 ERP 구축</td>
                  <td className="px-3 py-2">60일</td>
                  <td className="px-3 py-2">10,000원</td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td className="px-3 py-2">더비즈온 중견기업 전용 ERP 구축</td>
                  <td className="px-3 py-2">60일</td>
                  <td className="px-3 py-2">10,000원</td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td className="px-3 py-2">더비즈온 중견기업 전용 ERP 구축</td>
                  <td className="px-3 py-2">60일</td>
                  <td className="px-3 py-2">10,000원</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 총 결제 금액 */}
        <div className="flex flex-col">
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
      </div>

      {/* SOLU 포인트/쿠폰 */}
      <div className="grid grid-cols-[2fr_1fr] gap-8">
        <div>
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
      {/* 결제 방법 */}
      <div className="grid grid-cols-[2fr_1fr] gap-8">
        <div>
          <h2 className="text-lg font-semibold">결제 방법</h2>
          <div className="flex flex-col gap-4 rounded-md bg-white p-6 text-sm shadow-md">
            <div className="flex flex-wrap gap-3.5">
              <button className="hover:text-primary flex w-[166px] items-center justify-center rounded-md bg-[rgba(245,245,245,1)] py-5 hover:bg-white hover:font-bold hover:shadow-md">
                실시간 계좌이체
              </button>
              <button className="hover:text-primary flex w-[166px] items-center justify-center rounded-md bg-[rgba(245,245,245,1)] py-5 hover:bg-white hover:font-bold hover:shadow-md">
                실시간 계좌이체
              </button>
              <button className="hover:text-primary flex w-[166px] items-center justify-center rounded-md bg-[rgba(245,245,245,1)] py-5 hover:bg-white hover:font-bold hover:shadow-md">
                실시간 계좌이체
              </button>
              <button className="hover:text-primary flex w-[166px] items-center justify-center rounded-md bg-[rgba(245,245,245,1)] py-5 hover:bg-white hover:font-bold hover:shadow-md">
                실시간 계좌이체
              </button>
              <button className="hover:text-primary flex w-[166px] items-center justify-center rounded-md bg-[rgba(245,245,245,1)] py-5 hover:bg-white hover:font-bold hover:shadow-md">
                실시간 계좌이체
              </button>
              <button className="hover:text-primary flex w-[166px] items-center justify-center rounded-md bg-[rgba(245,245,245,1)] py-5 hover:bg-white hover:font-bold hover:shadow-md">
                실시간 계좌이체
              </button>
            </div>
            <div className="flex items-center gap-2.5">
              <span>세금 계산서 발행 요청</span>
              <Switch />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
